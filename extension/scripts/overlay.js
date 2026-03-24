function injectWarning(reason) {

    console.log("🚨 Overlay triggered");

    if (document.getElementById("safesurf-overlay")) return;

    // Blur
    const wrapper = document.createElement("div");

    while (document.body.firstChild) {
        wrapper.appendChild(document.body.firstChild);
    }

    wrapper.style.filter = "blur(6px)";
    wrapper.style.pointerEvents = "none";

    document.body.appendChild(wrapper);

    // Overlay
    const overlay = document.createElement("div");
    overlay.id = "safesurf-overlay";

    overlay.style = `
        position: fixed;
        top:0; left:0;
        width:100%; height:100%;
        background: rgba(0,0,0,0.85);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:999999;
    `;

    overlay.innerHTML = `
        <div style="
            background:#111;
            padding:25px;
            border-radius:10px;
            text-align:center;
            max-width:400px;
            color:white;
        ">
            <h2 style="color:red;">🚨 Threat Detected</h2>

            <p>${reason}</p>

            <button id="backBtn">⬅ Go Back</button>
            <button id="continueBtn">Continue</button>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("backBtn").onclick = () => {
        window.history.back();
    };

    document.getElementById("continueBtn").onclick = () => {
        wrapper.style.filter = "none";
        wrapper.style.pointerEvents = "auto";
        overlay.remove();
    };
}