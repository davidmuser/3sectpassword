A Safari Web Extension designed to solve the "third field" problem on login screens (such as an ID number, company code, or institution ID).

Apple's built-in iCloud Keychain handles usernames and passwords seamlessly, but it struggles with forms that require an additional identifier. This extension complements Keychain: it securely saves only the third field locally and auto-fills it, allowing Keychain to continue managing your passwords securely.

Key Features
Auto-Fill: Automatically saves and fills identification fields as soon as the login page loads.
Maximum Privacy (Local Storage): All data is saved locally within your browser's secure sandbox. No information is ever synced to the cloud or sent to external servers.
Security-First: The extension is explicitly programmed to filter out and ignore any fields defined as a password.
Management Interface: Clicking the extension icon opens a popup where you can view saved data per domain and delete it with a single click.
Installation Instructions (macOS)
Since this extension is not distributed via the Mac App Store, it must be compiled and signed locally on your machine. The process takes about a minute:

Step 1: Download the Project
Click the green "Code" button at the top of this repository.
Select "Download ZIP".
Extract the downloaded ZIP file on your Mac.

Step 2: Local Code Signing (via Xcode)
Ensure you have Xcode installed (available for free on the Mac App Store).
Open the extracted folder and double-click the .xcodeproj file to open the project.
Inside Xcode, click the Play button (Run) located at the top left of the window.
Note: A macOS security prompt (Keychain Access) will appear asking for permission to use codesign. Enter your Mac user password and click Always Allow. This is required for your Mac to digitally sign the extension for safe local execution.

Step 3: Enable in Safari
Open the Safari browser.
Enable the Developer menu: Go to Settings > Advanced, and check Show features for web developers at the bottom.
In the top macOS menu bar, click Develop and check the option: Allow Unsigned Extensions.
Go to Settings > Extensions, check the box next to Third Field Saver, and grant it permissions to run on your websites.
Usage Guide
Navigate to a website with a multi-field login form (e.g., academic portals, banking sites).
Enter your credentials and submit the form.
The extension will silently save the additional fields (excluding the password). The next time you visit this page, the third field will be pre-filled, leaving only the password for Safari Autofill.

Data Management: Click the extension icon next to the Safari address bar to view saved fields, delete data for a specific site, or clear the entire storage.
Developed as an internal utility to streamline logins for academic and corporate information systems.
