function updatePreview() {
    const code = document.getElementById("codeEditor").value;
    const previewFrame = document.getElementById("preview").contentWindow.document;
    previewFrame.open();
    previewFrame.write(code);
    previewFrame.close();
}

function generateLink() {
    const code = document.getElementById("codeEditor").value;
    const encodedCode = encodeURIComponent(code);
    const generatedURL = `${window.location.href}#code=${encodedCode}`;
    document.getElementById("generatedLink").innerText = generatedURL;
    navigator.clipboard.writeText(generatedURL);
    alert("🔗 Link copied!");
}

function copyLink() {
    const linkText = document.getElementById("generatedLink").innerText;
    if (linkText !== "...") {
        navigator.clipboard.writeText(linkText);
        alert("📋 Link copied!");
    } else {
        alert("⚠ No link generated yet!");
    }
}

function loadFromURL() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const code = params.get("code");
    if (code) {
        document.getElementById("codeEditor").value = decodeURIComponent(code);
        updatePreview();
    }
}

window.onload = loadFromURL;
