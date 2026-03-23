import re

def perform_rule_check(data):
    score = 0
    reasons = []
    
    url = data.get('url', '').lower()
    body_text = data.get('body_text', '').lower()
    domain = data.get('domain', '').lower()

    # --- 1. DLP: Sensitive Data Leaks ---
    if re.search(r'sk-proj-[a-zA-Z0-9]{30,}', body_text):
        score += 90
        reasons.append("CRITICAL: Exposed OpenAI API Key detected.")

    # --- 2. URL Obfuscation ---
    if url.count('.') > 4 or "@" in url:
        score += 40
        reasons.append("SUSPICIOUS: Obfuscated URL structure detected.")

    # --- 3. Raw IP usage ---
    if re.search(r'\d{1,3}(\.\d{1,3}){3}', domain):
        score += 60
        reasons.append("DANGEROUS: Site uses raw IP address.")

    # --- 4. Brand impersonation ---
    brands = ['google', 'microsoft', 'paypal', 'amazon', 'bank', 'tcs', 'deloitte']
    for brand in brands:
        if brand in url and brand not in domain:
            score += 50
            reasons.append(f"WARNING: Possible {brand} impersonation.")

    # --- 5. Social engineering text ---
    keywords = [
        "verify your account", "login immediately",
        "security alert", "suspicious activity",
        "action required"
    ]
    if any(k in body_text for k in keywords):
        score += 30
        reasons.append("HEURISTIC: Social engineering language detected.")

    # --- 6. Suspicious TLDs ---
    suspicious_tlds = ['.xyz', '.top', '.zip', '.icu', '.work']
    if any(url.endswith(tld) for tld in suspicious_tlds):
        score += 20
        reasons.append("INFO: High-risk domain extension.")

    return min(score, 100), reasons