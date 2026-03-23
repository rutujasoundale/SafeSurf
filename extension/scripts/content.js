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

        links: Array.from(document.querySelectorAll("a")).map(a => ({
            text: a.innerText,
            href: a.href
        })),

        scripts: Array.from(document.scripts)
            .map(s => s.src)
            .filter(src => src && src.startsWith("http")),

        timestamp: new Date().toISOString()
    };
};

// 🔥 ALWAYS RUN (no session block during debug)
const data = capturePageData();

chrome.runtime.sendMessage({
    type: "SCAN_PAGE",
    payload: data
}, (response) => {
    console.log("📩 Background response:", response);
});