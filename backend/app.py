from flask import Flask, request, jsonify
from flask_cors import CORS

from utils.rules import perform_rule_check
from utils.gemini_ai import analyze_with_gemini
from utils.leak_detecor import scan_for_leaks   
from utils.prompt_detector import detect_prompt_injection

app = Flask(__name__)
CORS(app)


@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json or {}

        url = data.get('url', '')
        body_text = data.get('body_text', '')[:2000]   # ⬆️ slightly increased
        scripts_content = data.get('scripts', '')[:8000]

        print(f"\n[🔍 SCAN START] {url}")

        # =========================
        # 🧠 1. RULE ENGINE
        # =========================
        rule_score, rule_reasons = perform_rule_check(data)

        # =========================
        # 🤖 2. AI ANALYSIS (SAFE)
        # =========================
        ai_score = 0
        ai_reason = ""

        try:
            ai_score, ai_reason = analyze_with_gemini(body_text, url)
        except Exception as e:
            print("⚠️ AI Error:", e)

        # =========================
        # 🔐 3. LEAK DETECTION
        # =========================
        leaks = scan_for_leaks(body_text + scripts_content)
        leak_score = 60 if leaks else 0   # 🔥 stronger impact

        # =========================
        # 🚨 4. PROMPT INJECTION
        # =========================
        prompt_flag, prompt_reason = detect_prompt_injection(body_text)
        prompt_score = 50 if prompt_flag else 0

        # =========================
        # 🎯 FINAL SCORE
        # =========================
        final_score = min(
            rule_score +
            ai_score +
            leak_score +
            prompt_score,
            100
        )

        print(f"[⚠️ SCORE] {final_score}")
        print(f"[📌 RULES] {rule_reasons}")
        print(f"[🔐 LEAKS] {leaks}")
        print(f"[🤖 AI] {ai_reason}")
        print(f"[🚨 PROMPT] {prompt_reason}")

        return jsonify({
            "risk_score": final_score,

            # 🔥 structured output (important for UI)
            "breakdown": {
                "rule_score": rule_score,
                "ai_score": ai_score,
                "leak_score": leak_score,
                "prompt_score": prompt_score
            },

            "threats": rule_reasons,
            "ai_reason": ai_reason if ai_reason else None,
            "leaks": leaks,
            "prompt": {
                "detected": prompt_flag,
                "reason": prompt_reason
            }
        })

    except Exception as e:
        print("🔥 SERVER ERROR:", e)
        return jsonify({
            "error": str(e),
            "risk_score": 0
        }), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)