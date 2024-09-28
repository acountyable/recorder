# Recorder Sync Extension

This Chrome extension integrates with Chrome DevTools Recorder to capture user interactions and automatically sync them with a GitHub repository. This setup facilitates automated workflows using GitHub Actions based on the recordings.

## Features

- **Automated Syncing:** Automatically push new recordings to a specified GitHub repository.
- **CRUD Operations:** Manage recordings directly from the extension's UI.
- **Integration with GitHub Actions:** Trigger workflows based on changes in recordings.

## Setup Instructions

1. **Load the Extension in Chrome:**

   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode**.
   - Click **"Load unpacked"** and select the `extension` directory.

2. **Configure GitHub Credentials:**

   - Click on the extension icon in the toolbar.
   - Enter your **GitHub Personal Access Token**, **Repository Owner**, and **Repository Name**.
   - Click **"Save Credentials"** to store them securely using Chrome's storage.

3. **Use the Recorder:**

   - Open Chrome DevTools (`F12` or `Ctrl+Shift+I`).
   - Navigate to the **Recorder** tab.
   - Start recording user interactions.
   - Export the recording to automatically sync it with your GitHub repository.

## Permissions

- **devtools:** Integrates with Chrome DevTools.
- **storage:** Stores GitHub credentials securely.
- **scripting:** Executes scripts if needed.

## Security Considerations

- **Personal Access Tokens (PATs):** Ensure your PAT has the minimal required scopes (`repo` is typically needed).
- **Storage:** Tokens are stored using `chrome.storage.sync` and are not exposed in the extension code.

## License

[MIT](LICENSE)

## Acknowledgements

- Utilizes the `chrome.devtools.recorder` API for extending DevTools Recorder functionality.
