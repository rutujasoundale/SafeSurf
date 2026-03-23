import re

def scan_for_leaks(content):
    patterns = {
        "Google_API_Key": r"AIza[0-9A-Za-z-_]{35}",
        "AWS_Access_Key": r"AKIA[0-9A-Z]{16}",
        "Generic_Secret": r"secret[_-]?key"
    }

    found = []

    for name, pattern in patterns.items():
        if re.search(pattern, content):
            found.append(name)

    return found