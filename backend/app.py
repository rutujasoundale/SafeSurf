from flask import Flask, request, jsonify
from flask_cors import CORS

from utils.rules import perform_rule_check
from utils.gemini_ai import analyze_with_gemini
from utils.leak_detecor import scan_for_leaks   # ✅ FIXED
from utils.prompt_detector import detect_prompt_injection

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json

        url = data.get('url', '')
        body_text = data.get('body_text', '')[:1000]
        scripts_content = data.get('scripts', '')[:5000]

        print(f"[🔍 SCAN] {url}")

        # RULES
        rule_score, rule_reasons = perform_rule_check(data)

        # AI (SAFE)
        try:
            ai_score, ai_reason = analyze_with_gemini(body_text, url)
        except:
            ai_score, ai_reason = 0, "AI skipped"

        # LEAK
        leaks = scan_for_leaks(body_text + scripts_content)
        leak_score = 40 if leaks else 0

        # PROMPT
        prompt_flag, prompt_reason = detect_prompt_injection(body_text)
        prompt_score = 30 if prompt_flag else 0

        final_score = min(rule_score + ai_score + leak_score + prompt_score, 100)

        return jsonify({
            "risk_score": final_score,
            "threats": rule_reasons + [ai_reason],
            "leaks": leaks,
            "prompt": prompt_flag
        })

    except Exception as e:
        print("🔥 ERROR:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)