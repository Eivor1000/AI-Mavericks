chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = tabs[0].url;
  chrome.storage.local.get(url, (result) => {
    const data = result[url] || { score: 'N/A' };
    
    document.getElementById('score').textContent = data.score;
    document.getElementById('score').className = 
      `score ${data.score > 75 ? 'high' : data.score > 50 ? 'medium' : 'low'}`;
    
    if (data.flags) {
      let details = '';
      if (data.flags.clickbait) details += '<p>⚠️ Clickbait detected</p>';
      document.getElementById('details').innerHTML = details;
    }
  });
});