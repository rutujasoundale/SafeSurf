chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "SCAN_PAGE") {

        const fetchScripts = async (urls) => {
            let content = "";

            for (let url of urls) {
                try {
                    const res = await fetch(url);
                    const text = await res.text();
                    content += text + "\n";
                } catch (e) {
                    console.log("⚠️ Failed script:", url);
                }
            }

            return content.slice(0, 5000);
        };

        (async () => {
            try {
                console.log("📡 Sending data to backend...");

                let scriptsContent = await fetchScripts(message.payload.scripts || []);

                const finalPayload = {
                    ...message.payload,
                    scripts: scriptsContent
                };

                const res = await fetch("http://127.0.0.1:5000/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(finalPayload)
                });

                if (!res.ok) {
                    console.error("❌ Backend HTTP error:", res.status);
                    sendResponse({ success: false });
                    return;
                }

                const data = await res.json();

                console.log("🧠 Analysis Result:", data);

                if (!data || data.error) {
                    console.error("❌ Invalid backend response:", data);
                    return;
                }

                const tabId = sender.tab?.id;
                if (!tabId) return;

                const reasonText = (data.threats || []).join(" • ");

                // 🎯 TEMP: FORCE overlay to test
                if (data.risk_score > 30) {

                    console.log("🚨 Injecting overlay...");

                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        files: ['scripts/overlay.js']
                    }, () => {

                        if (chrome.runtime.lastError) {
                            console.error("❌ Injection error:", chrome.runtime.lastError);
                            return;
                        }

                        chrome.scripting.executeScript({
                            target: { tabId: tabId },
                            func: (reason) => {
                                if (typeof injectWarning === "function") {
                                    injectWarning(reason);
                                } else {
                                    console.error("❌ injectWarning not found");
                                }
                            },
                            args: [reasonText || "Suspicious activity detected"]
                        });
                    });
                }

                sendResponse({ success: true });

            } catch (err) {
                console.error("❌ Background crash:", err);
                sendResponse({ success: false });
            }
        })();

        return true;
    }
});