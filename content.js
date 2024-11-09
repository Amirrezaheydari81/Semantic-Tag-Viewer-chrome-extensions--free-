const semanticTags = [
    "header", "nav", "main", "section", "article", "aside", "footer",
    "figure", "figcaption", "details", "summary", "mark", "time", "output",
    "progress", "meter", "form", "fieldset", "legend", "label", "input",
    "textarea", "button", "select", "option", "optgroup"
  ];


function highlightSemanticTags() {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    semanticTags.forEach(tag => {
        const elements = document.querySelectorAll(tag);
        elements.forEach((element) => {
            if (!element.classList.contains("highlighted")) { // جلوگیری از تکرار
                element.classList.add("highlighted");
                element.style.position = "relative";
                element.style.border = "2px solid #4CAF50";
                element.style.margin = "5px";
                element.style.padding = "10px";

                const label = document.createElement("div");
                label.innerText = `<${tag}>`;
                label.className = "semantic-label";
                label.style.position = "absolute";
                label.style.top = "0";
                label.style.left = "0";
                label.style.backgroundColor = "rgba(76, 175, 80, 0.9)";
                label.style.color = "white";
                label.style.padding = "2px 5px";
                label.style.fontSize = "12px";
                label.style.zIndex = "1000";
                label.style.borderRadius = "3px";
                element.prepend(label);
            }
        });
    });
}

function removeHighlight() {
    document.querySelectorAll(".highlighted").forEach(element => {
        element.classList.remove("highlighted");
        element.style.border = "";
        element.style.margin = "";
        element.style.padding = "";
        element.querySelector(".semantic-label")?.remove();
    });
    document.documentElement.style.overflowX = "";
    document.body.style.overflowX = "";
}

// تنظیم اولیه بر اساس وضعیت ذخیره شده
chrome.storage.sync.get("highlightEnabled", (data) => {
    if (data.highlightEnabled) {
        highlightSemanticTags();
    }
});

// دریافت پیام‌ها از popup.js برای تغییر وضعیت
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "highlight") {
        highlightSemanticTags();
    } else if (request.action === "remove") {
        removeHighlight();
    }
});
