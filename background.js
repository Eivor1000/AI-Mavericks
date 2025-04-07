// Credibility analysis logic
async function analyzeCredibility(content) {
  // 1. Linguistic analysis
  const clickbaitTerms = ["shocking", "you won't believe", "secret"];
  const isClickbait = clickbaitTerms.some(term => 
    content.title.toLowerCase().includes(term)
  );

  // 2. Simple scoring (replace with your API calls)
  const score = Math.floor(Math.random() * 100); // Placeholder
  
  return {
    score,
    flags: {
      clickbait: isClickbait,
      length: content.text.length > 1000 ? "long" : "short"
    }
  };
}

// Message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "contentExtracted" && request.data) {
    analyzeCredibility(request.data).then(result => {
      chrome.storage.local.set({ [request.data.url]: result });
      
      // Update badge
      chrome.action.setBadgeText({
        text: result.score.toString(),
        tabId: sender.tab.id
      });
      chrome.action.setBadgeBackgroundColor({
        color: result.score > 75 ? "green" : result.score > 50 ? "orange" : "red",
        tabId: sender.tab.id
      });
    });
  }
});