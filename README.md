# Copy Link Text Chrome Extension

The **Copy Link Text** Chrome extension allows users to quickly copy the text content of any link (`<a>` tag) or button (`<button>` tag) to the clipboard via a right-click context menu. It also provides optional notifications to confirm successful copying.


## Features

- **Right-Click Context Menu**: Adds a `Copy Link Text` option to the context menu when you right-click a link or button.
- **Clipboard Copying**: Automatically copies the text content to the clipboard.
- **Notifications**: Displays notifications for successful or unsuccessful copy actions. Notifications can be toggled on or off in the extension's settings.
- **Cross-Page Support**: Works on all web pages by injecting a content script.


## Installation

1. **Clone or Download** the repository:
   ```bash
   git clone https://github.com/sumanengbd/copy-link-text.git
   cd copy-link-text
   ```

2. Open **Chrome** and navigate to `chrome://extensions`.

3. Enable **Developer mode** (toggle in the top-right corner).

4. Click **Load unpacked** and select the project folder.

5. The extension should now be installed and ready to use.

## Demo
### Right-Click Context Menu
![Right Menu Contex](https://github.com/user-attachments/assets/146660a2-b2a4-443a-81cc-229229b0a11b)

### Notification
![Notification](https://github.com/user-attachments/assets/29475ff9-711a-4c20-b787-525e86357b65)

### Options
![Basic](https://github.com/user-attachments/assets/2dd30173-7988-472f-a2c5-8def1a99f960)
![Options](https://github.com/user-attachments/assets/581d7f6a-8b41-4712-8cda-20725a5b8ade)

## Usage

1. Right-click on a link (`<a>` tag) or button (`<button>` tag).
2. Select **Copy Link Text** from the context menu.
3. The text will be copied to the clipboard.
4. If notifications are enabled, a small popup will confirm the copied text or inform you if no text was available.


## Code Overview

### 1. `manifest.json`
- Specifies the extension's metadata, permissions, and configuration.
- Includes the content script (`content.js`) and background service worker (`background.js`).

### 2. `background.js`
- Manages the context menu dynamically based on the right-click target.
- Listens for context menu clicks and handles clipboard operations via messages to the content script.
- Displays notifications using the Chrome Notifications API.

### 3. `content.js`
- Detects right-click events to determine if the target is a link or button.
- Communicates with the background script to show or hide the context menu.
- Handles copying the text of the right-clicked element to the clipboard.

## Permissions

The extension requires the following permissions:

- **`storage`**: To save user settings (e.g., notification preferences).
- **`activeTab`**: To access the current tab when interacting with the extension.
- **`contextMenus`**: To add the "Copy Link Text" option to the right-click menu.
- **`notifications`**: To display notifications after a copy action.
- **`clipboardWrite`**: To copy the text to the clipboard.

## Customization

### Enable/Disable Notifications
To toggle notifications:
1. Open the extension settings (to be implemented in a future version).
2. Enable or disable the notification preference.

## Future Improvements

- Add an options page for user preferences (e.g., enabling/disabling notifications).
- Extend functionality to include copying URLs or attributes.
- Support keyboard shortcuts for copying.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contribution

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit your changes and open a pull request.

## Acknowledgments

This extension was built using the Chrome Extensions API. Special thanks to the open-source community for inspiration and resources.

**Happy Copying!** 😊
