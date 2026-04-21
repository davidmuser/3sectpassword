// content.js - Clean Production Version

function autoFillExtraFields() {
    const domain = window.location.hostname;
    
    browser.runtime.sendMessage({ action: "get_extra_fields", domain: domain }, (response) => {
        if (response && response.fields) {
            response.fields.forEach(fieldData => {
                const el = document.getElementById(fieldData.id) || document.getElementsByName(fieldData.id)[0];
                if (el && !el.value) {
                    el.value = fieldData.value;
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                }
            });
        }
    });
}

function captureLoginData(event) {
    let form = event.target.closest('form');
    let inputs = [];
    
    if (form) {
        inputs = Array.from(form.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"])'));
    } else {
        inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"])'));
    }
    
    const hasPassword = inputs.some(i => i.type === 'password');
    if (!hasPassword || inputs.length < 3) return;

    const fieldsToSave = inputs
        .filter(input => input.type !== 'password' && input.value.trim() !== '')
        .map(input => ({
            id: input.id || input.name,
            value: input.value
        }));

    if (fieldsToSave.length > 0) {
        browser.runtime.sendMessage({
            action: "save_extra_fields",
            domain: window.location.hostname,
            fields: fieldsToSave
        });
    }
}

document.addEventListener('submit', captureLoginData);

document.addEventListener('click', (e) => {
    const isButton = e.target.tagName === 'BUTTON' || e.target.closest('button') ||
                     (e.target.tagName === 'INPUT' && (e.target.type === 'submit' || e.target.type === 'button'));
    if (isButton) {
        captureLoginData(e);
    }
});

autoFillExtraFields();
