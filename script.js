function showAd() {
    show_9117784().then(() => {
        console.log('Ad watched!');
    }).catch(() => {
        console.log('Ad skipped!');
    });
}

function updatePreview() {
    showAd();
    const code = document.getElementById("codeEditor").value;
    const previewFrame = document.getElementById("preview").contentWindow.document;
    previewFrame.open();
    previewFrame.write(code);
    previewFrame.close();
}

function generateLink() {
    showAd();
    const code = encodeURIComponent(document.getElementById("codeEditor").value);
    const baseURL = window.location.href.split('?')[0];
    const generatedURL = `${baseURL}?code=${code}`;

    document.getElementById("generatedLink").innerText = generatedURL;
    navigator.clipboard.writeText(generatedURL);
    alert("🔗 Link copied!");
}

function copyLink() {
    showAd();
    const linkText = document.getElementById("generatedLink").innerText;
    if (linkText !== "...") {
        navigator.clipboard.writeText(linkText);
        alert("📋 Link copied!");
    } else {
        alert("⚠ No link generated yet!");
    }
}

function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
        document.getElementById("codeEditor").value = decodeURIComponent(code);
        updatePreview();
    }
}

window.onload = () => {
    loadFromURL();
    show_9117784({
        type: 'inApp',
        inAppSettings: {
            frequency: 2,
            capping: 0.1,
            interval: 30,
            timeout: 5,
            everyPage: false
        }
    });
};
