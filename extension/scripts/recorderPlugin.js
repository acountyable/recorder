// scripts/recorderPlugin.js

class GitHubSyncPlugin {
  constructor() {
    this.githubSync = new GitHubSync();
  }

  // Converts the entire recording to JSON string
  stringify(recording) {
    return Promise.resolve(JSON.stringify(recording, null, 2));
  }

  // Converts a single step to JSON string
  stringifyStep(step) {
    return Promise.resolve(JSON.stringify(step, null, 2));
  }

  // Custom replay functionality (optional)
  replay(recording) {
    console.log('Replaying recording:', recording);
    // Implement replay logic if needed
  }

  // Hook to handle when a recording is exported
  onExport(recordingJson) {
    // Sync with GitHub
    this.githubSync.syncRecording(recordingJson);
  }
}

// Instantiate and register the plugin
const plugin = new GitHubSyncPlugin();

chrome.devtools.recorder.registerRecorderExtensionPlugin(
  plugin,
  'GitHub Sync Plugin',
  'application/json'
);

// Listen for export events
chrome.devtools.recorder.onExport.addListener((recordingJson) => {
  plugin.onExport(recordingJson);
});
