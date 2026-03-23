// --- 1. AI Scan & Threat Logic ---
chrome.storage.local.get("lastScan", (data) => {
    const scoreCircle = document.getElementById("score-circle");
    const verdictText = document.getElementById("verdict");
    const threatList = document.getElementById("threat-list");

    if (data.lastScan) {
        const result = data.lastScan;
        scoreCircle.innerText = result.risk_score + "%";
        verdictText.innerText = result.verdict;
        
        // Visual feedback based on risk
        scoreCircle.style.color = result.risk_score > 70 ? "#ff4d4d" : "#2ecc71";

        threatList.innerHTML = ""; 
        result.threats.forEach(t => {
            let li = document.createElement("li");
            li.innerText = t;
            threatList.appendChild(li);
        });
    }
});

// --- 2. Cookie Management & Audit Logic ---
const loadCookies = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0]) return;
        const url = new URL(tabs[0].url);

        chrome.cookies.getAll({ domain: url.hostname }, (cookies) => {
            const cookieList = document.getElementById("cookie-list");
            if (!cookieList) return;

            cookieList.innerHTML = `<h3>Cookies Found: ${cookies.length}</h3>`;
            
            // Add the "Nuke" button if cookies exist
            if (cookies.length > 0) {
                const nukeBtn = document.createElement("button");
                nukeBtn.innerText = "🗑️ Clear Site Cookies";
                nukeBtn.className = "nuke-btn";
                nukeBtn.onclick = () => nukeCookies(cookies, url.origin);
                cookieList.appendChild(nukeBtn);
            }

            cookies.forEach(cookie => {
                let div = document.createElement("div");
                div.className = "cookie-item";
                
                const isSafe = cookie.httpOnly && cookie.secure;
                const statusIcon = isSafe ? "🛡️" : "⚠️";
                
                div.style.borderLeft = isSafe ? "4px solid #2ecc71" : "4px solid #f39c12";

                div.innerHTML = `
                    <strong>${statusIcon} ${cookie.name}</strong><br>
                    <small>HttpOnly: ${cookie.httpOnly ? 'Yes' : 'No'}</small> | 
                    <small>Secure: ${cookie.secure ? 'Yes' : 'No'}</small>
                `;
                cookieList.appendChild(div);
            });
        });
    });
};

// --- 3. The "Nuke" Function (Actionable Security) ---
const nukeCookies = (cookies, origin) => {
    cookies.forEach(cookie => {
        const protocol = cookie.secure ? "https://" : "http://";
        const cookieUrl = `${protocol}${cookie.domain.startsWith('.') ? cookie.domain.substring(1) : cookie.domain}${cookie.path}`;
        
        chrome.cookies.remove({
            url: cookieUrl,
            name: cookie.name
        });
    });
    alert("Privacy Scan Complete: Local tracking cookies cleared!");
    loadCookies(); // Refresh the list
};

// Initialize
document.addEventListener('DOMContentLoaded', loadCookies);