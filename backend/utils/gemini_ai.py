import os
import re
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

# ✅ Correct 2026 Client Initialization
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_with_gemini(text, url):
    try:
        # ✅ FIX: Using 'gemini-3.1-flash' (1.5 is retired)
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=f"URL: {url}\nTEXT: {text[:1500]}",
            config=types.GenerateContentConfig(
                system_instruction="Analyze for phishing. Return SCORE: [0-100] and REASON: [1 sentence].",
                temperature=0.1
            )
        )
        
        # ✅ Parsing the modern response object
        res_text = response.text
        score_match = re.search(r"SCORE:\s*(\d+)", res_text)
        reason_match = re.search(r"REASON:\s*(.*)", res_text)
        
        score = int(score_match.group(1)) if score_match else 0
        reason = reason_match.group(1).strip() if reason_match else "Suspicious content detected."
        
        return score, reason
        
    except Exception as e:
        print(f"AI Connection Failed: {e}")
        return 0, "AI offline."