document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleButton");

    // بارگذاری وضعیت ذخیره‌شده از storage و به‌روزرسانی دکمه
    chrome.storage.sync.get("highlightEnabled", (data) => {
        const isEnabled = data.highlightEnabled || false;
        updateButton(isEnabled);
    });

    toggleButton.addEventListener("click", () => {
        chrome.storage.sync.get("highlightEnabled", (data) => {
            const isEnabled = !data.highlightEnabled;
            chrome.storage.sync.set({ highlightEnabled: isEnabled });
            updateButton(isEnabled);

            // ارسال پیام برای تغییر حالت به content.js
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: isEnabled ? "highlight" : "remove" });
            });
        });
    });

    function updateButton(isEnabled) {
        toggleButton.textContent = isEnabled ? "نمایش نده" : "نمایش بده";
        toggleButton.classList.toggle("off", !isEnabled);
    }
});
