def detect_prompt_injection(text):
    text = text.lower()

    patterns = [
        "ignore previous instructions",
        "ignore all previous instructions",
        "disregard earlier instructions",
        "act as system",
        "you are chatgpt",
        "reveal hidden",
        "bypass safety",
        "jailbreak",
        "system override",
        "pretend you are",
        "developer mode",
        "do anything now"
    ]

    matches = [p for p in patterns if p in text]

    if matches:
        return True, f"Prompt Injection detected: {', '.join(matches)}"

    return False, ""