function injectWarning(reason) {
    console.log("🚨 Overlay triggered with reason:", reason);

    if (document.getElementById("safesurf-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "safesurf-overlay";

    overlay.style = `
        position:fixed;
        top:0; left:0;
        width:100%; height:100%;
        background:rgba(0,0,0,0.7);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:999999;
    `;

    overlay.innerHTML = `
        <div style="background:#111;padding:20px;border-radius:10px;color:white;">
            <h2>🚨 Threat Detected</h2>
            <p>${reason}</p>
            <button onclick="window.history.back()">⬅ Back</button>
            <button onclick="this.parentElement.parentElement.remove()">Continue</button>
        </div>
    `;

    document.body.appendChild(overlay);
}