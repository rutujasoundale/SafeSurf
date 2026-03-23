def detect_prompt_injection(text):
    text = text.lower()

    patterns = [
        "ignore previous instructions",
        "ignore all previous instructions",
        "act as system",
        "you are chatgpt",
        "reveal hidden",
        "bypass safety",
        "jailbreak",
        "system override"
    ]

    for pattern in patterns:
        if pattern in text:
            return True, f"Prompt Injection: '{pattern}' detected"

    return False, ""