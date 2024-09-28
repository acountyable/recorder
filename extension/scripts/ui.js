// scripts/ui.js

document.getElementById('save-credentials').addEventListener('click', () => {
  const token = document.getElementById('github-token').value.trim();
  const owner = document.getElementById('repo-owner').value.trim();
  const repo = document.getElementById('repo-name').value.trim();

  if (!token || !owner || !repo) {
    alert('Please fill in all fields.');
    return;
  }

  // Send message to background script to save credentials
  chrome.runtime.sendMessage({
    action: 'setGitHubCredentials',
    data: { token, owner, repo }
  }, (response) => {
    if (response && response.status === 'success') {
      alert('GitHub credentials saved successfully!');
      // Clear the input fields
      document.getElementById('github-token').value = '';
      document.getElementById('repo-owner').value = '';
      document.getElementById('repo-name').value = '';
    } else {
      alert('Failed to save credentials.');
    }
  });
});
