function updatePreview() {
    const code = document.getElementById("codeEditor").value;
    const previewFrame = document.getElementById("preview").contentWindow.document;
    previewFrame.open();
    previewFrame.write(code);
    previewFrame.close();
}

async function generateLink() {
    const code = encodeURIComponent(document.getElementById("codeEditor").value);
    const baseURL = window.location.href.split('?')[0];
    const previewURL = `${baseURL.replace('index.html', 'preview.html')}?code=${code}`;

    // Shorten the URL using TinyURL
    const shortURL = await shortenURL(previewURL);
    document.getElementById("generatedLink").innerText = shortURL;
    navigator.clipboard.writeText(shortURL);
    alert("🔗 Link copied!");
}

async function shortenURL(url) {
    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        const data = await response.text();
        return data;
    } catch (error) {
        console.error("Error shortening URL:", error);
        return url; // Return original URL if shortening fails
    }
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

function copyCode() {
    const code = document.getElementById("codeEditor").value;
    navigator.clipboard.writeText(code);
    alert("📋 Code copied!");
}

function clearCode() {
    document.getElementById("codeEditor").value = "";
    updatePreview();
    alert("❌ Code cleared!");
}

function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
        document.getElementById("codeEditor").value = decodeURIComponent(code);
        updatePreview();
    }
}

window.onload = loadFromURL;
