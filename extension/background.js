// background.js

importScripts('scripts/githubSync.js');

// Initialize GitHubSync instance
const githubSync = new GitHubSync();

// Listen for messages from the popup or devtools page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setGitHubCredentials') {
    const { token, owner, repo } = request.data;
    githubSync.setCredentials(token, owner, repo);
    sendResponse({ status: 'success' });
  }
  // Add more actions as needed
});
