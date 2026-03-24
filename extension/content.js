console.log("✅ SafeSurf: Content script loaded");

const capturePageData = () => {
    return {
        url: window.location.href,
        domain: window.location.hostname,
        title: document.title,
        body_text: document.body.innerText.slice(0, 1000),

        forms: Array.from(document.forms).map(f => ({
            action: f.action,
            inputs: Array.from(f.elements).map(e => e.type)
        })),

        hasPasswordField: !!document.querySelector('input[type="password"]'),

        scripts: Array.from(document.scripts)
            .map(s => s.src)
            .filter(src => src && src.startsWith("http"))
    };
};

// ✅ Prevent multiple scans
const sessionKey = `safesurf_${window.location.href}`;

if (!sessionStorage.getItem(sessionKey)) {
    sessionStorage.setItem(sessionKey, "true");

    chrome.runtime.sendMessage({
        type: "SCAN_PAGE",
        payload: capturePageData()
    });
}