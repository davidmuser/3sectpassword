// popup.js - Upgraded to show ALL saved domains

document.addEventListener('DOMContentLoaded', () => {
    const dataList = document.getElementById('dataList');
    const clearAllBtn = document.getElementById('clearAllBtn');

    // Fetch everything from storage by passing null
    browser.storage.local.get(null).then(allData => {
        const domains = Object.keys(allData);
        
        if (domains.length > 0) {
            dataList.innerHTML = '';
            
            // Loop through each domain saved in storage
            domains.forEach(domain => {
                const savedData = allData[domain];
                let fieldsHtml = '';
                
                if (savedData && savedData.fields) {
                    savedData.fields.forEach(field => {
                        fieldsHtml += `<div class="field-row"><b>${field.id}:</b> ${field.value}</div>`;
                    });
                }

                // Create a visual block for each domain
                const domainBlock = document.createElement('div');
                domainBlock.className = 'domain-block';
                domainBlock.innerHTML = `
                    <div class="domain-title">${domain}</div>
                    ${fieldsHtml}
                    <button class="btn-clear" data-domain="${domain}">מחק אתר זה</button>
                `;
                dataList.appendChild(domainBlock);
            });
            
            clearAllBtn.style.display = 'block';

            // Add event listeners to individual delete buttons
            document.querySelectorAll('.btn-clear').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const targetDomain = e.target.getAttribute('data-domain');
                    // Remove specific domain from storage
                    browser.storage.local.remove(targetDomain).then(() => {
                        e.target.parentElement.remove();
                        // If list is empty after deletion, show message
                        if (dataList.children.length === 0) {
                            dataList.innerHTML = '<div id="status">אין נתונים שמורים.</div>';
                            clearAllBtn.style.display = 'none';
                        }
                    });
                });
            });

        } else {
            dataList.innerHTML = '<div id="status">אין נתונים שמורים לאף אתר.</div>';
        }
    });

    // Handle Delete All button
    clearAllBtn.addEventListener('click', () => {
        if (confirm('האם אתה בטוח שברצונך למחוק את כל הנתונים מכל האתרים?')) {
            // Clear entire extension storage
            browser.storage.local.clear().then(() => {
                dataList.innerHTML = '<div id="status">כל הנתונים נמחקו בהצלחה!</div>';
                clearAllBtn.style.display = 'none';
            });
        }
    });
});
