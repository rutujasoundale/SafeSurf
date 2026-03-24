import re

def scan_for_leaks(content):
    patterns = {
        "Google_API_Key": r"AIza[0-9A-Za-z\-_]{20,}",
        "AWS_Access_Key": r"AKIA[0-9A-Z]{16}",
        "Stripe_Live_Key": r"sk_live_[0-9a-zA-Z]{20,}",
        "Private_Key": r"-----BEGIN (RSA|DSA|EC) PRIVATE KEY-----",
        "JWT_Token": r"eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+",
        "Generic_Secret": r"(secret|api[_-]?key|token)\s*[:=]\s*['\"][A-Za-z0-9\-_]{6,}"
    }

    found = []

    for name, pattern in patterns.items():
        if re.search(pattern, content):
            found.append(name)

    return found