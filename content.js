function extractContentWithReadability() {
  try {
    const documentClone = document.cloneNode(true);
    const article = new Readability(documentClone).parse();
    
    return {
      title: article.title,
      text: article.textContent.substring(0, 5000), // Limit to 5000 chars
      url: window.location.href,
      domain: window.location.hostname
    };
  } catch (err) {
    console.error("Readability error:", err);
    return null;
  }
}

// Send extracted content to background script
chrome.runtime.sendMessage({
  type: "contentExtracted",
  data: extractContentWithReadability()
});