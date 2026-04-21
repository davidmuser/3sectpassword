// background.js

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
    // Handle saving the array of extra fields
    if (message.action === "save_extra_fields") {
        const dataToSave = {};
        // We now save the entire array of fields under the domain
        dataToSave[message.domain] = { fields: message.fields };
        
        browser.storage.local.set(dataToSave).then(() => {
            console.log("Saved extra fields for: " + message.domain);
        });
    }
    
    // Handle retrieving the extra fields
    if (message.action === "get_extra_fields") {
        browser.storage.local.get(message.domain).then((result) => {
            sendResponse(result[message.domain]);
        });
        
        return true;
    }
});
