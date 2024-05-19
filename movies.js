let darkToggle = false
function toggleContrast() {
    darkToggle = !darkToggle;
    if (darkToggle) {
        document.body.classList += " dark-theme"
    }
    else {
        document.body.classList.remove("dark-theme")
    }
}

