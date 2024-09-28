// scripts/githubSync.js

class GitHubSync {
  constructor() {
    // Retrieve GitHub token and repo details from storage
    chrome.storage.sync.get(['githubToken', 'repoOwner', 'repoName'], (result) => {
      this.githubToken = result.githubToken;
      this.repoOwner = result.repoOwner;
      this.repoName = result.repoName;
    });
  }

  // Function to sync recording to GitHub
  async syncRecording(recordingJson) {
    if (!this.githubToken || !this.repoOwner || !this.repoName) {
      console.error('GitHub credentials not set.');
      return;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = `recordings/recording-${timestamp}.json`;

    try {
      // Create a new file in the repository
      const response = await fetch(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          Authorization: `token ${this.githubToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Add recording ${timestamp}`,
          content: btoa(unescape(encodeURIComponent(recordingJson)))
        })
      });

      if (response.ok) {
        console.log(`Recording synced successfully to ${filePath}`);
      } else {
        const errorData = await response.json();
        console.error('Failed to sync recording:', errorData);
      }
    } catch (error) {
      console.error('Error syncing recording to GitHub:', error);
    }
  }

  // Function to set GitHub credentials
  setCredentials(token, owner, repo) {
    this.githubToken = token;
    this.repoOwner = owner;
    this.repoName = repo;
    chrome.storage.sync.set({
      githubToken: token,
      repoOwner: owner,
      repoName: repo
    }, () => {
      console.log('GitHub credentials saved.');
    });
  }
}
