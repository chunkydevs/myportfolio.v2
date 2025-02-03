let xp = 0;
let level = 1;
let achievements = [];
let secretRevealed = false; // Flag to track if the secret has been revealed

// Object to track completed XP actions
let xpActions = {
    secretRevealed: false,
    aboutClicked: false,
    projectsClicked: false,
    skillsClicked: false,
    codeInEditor: false,
    htmlHovered: false,
    cssHovered: false,
    jsHovered: false,
    reactHovered: false,
};

function gainXP(amount, actionName) {
    // Check if the action has already been completed
    if (xpActions[actionName]) return; // If already completed, do nothing

    xp += amount;
    document.getElementById("xp").innerText = xp;
    checkLevelUp();

    // Mark the action as completed
    xpActions[actionName] = true;
}

function checkLevelUp() {
    if (xp >= 50) {
        level++;
        xp = 0; // Reset XP for next level
        document.getElementById("level").innerText = level;
        alert("🎉 Level Up! You're now level " + level);
    }
}

function unlockAchievement(name) {
    if (!achievements.includes(name)) {
        achievements.push(name);
        document.getElementById("achievements").innerText = achievements.join(", ");
        alert("🏆 Achievement Unlocked: " + name);
    }
}

function revealSecret() {
    if (secretRevealed) return; // Prevent further clicks after the first one

    // Display the secret message
    document.getElementById("secret-message").style.display = "block";
    
    // Display a secret message alert
    alert("Welcome to my portfolio!");

    // Award XP for the action (using 'secretRevealed' as the action name)
    gainXP(20, 'secretRevealed');

    // Disable the button after the first click
    document.querySelector("button").disabled = true;

    // Set the flag to indicate the secret has been revealed
    secretRevealed = true;
}

// Function to update the preview
function updatePreview() {
    const htmlCode = document.getElementById("html-code").value;
    const cssCode = document.getElementById("css-code").value;
    const preview = document.getElementById("preview").contentDocument;

    preview.open();
    preview.write(`<style>${cssCode}</style>${htmlCode}`);
    preview.close();

    // Award XP for coding in the live editor, but only once
    gainXP(10, 'codeInEditor');
}

// Function to update the preview
function updatePreview() {
    const htmlCode = document.getElementById("html-code").value;
    const cssCode = document.getElementById("css-code").value;
    const preview = document.getElementById("preview").contentDocument;

    preview.open();
    preview.write(`<style>${cssCode}</style>${htmlCode}`);
    preview.close();
}

// Event Listeners
document.getElementById("html-code").addEventListener("input", updatePreview);
document.getElementById("css-code").addEventListener("input", updatePreview);

// Event Listeners for sections
document.getElementById("about").addEventListener("click", () => {
    gainXP(10, 'aboutClicked');
});

document.getElementById("projects").addEventListener("click", () => {
    gainXP(10, 'projectsClicked');
});

document.getElementById("skills").addEventListener("click", () => {
    gainXP(10, 'skillsClicked');
});

// Event Listeners for skill hover
document.querySelector(".html").addEventListener("mouseenter", () => {
    gainXP(10, 'htmlHovered');
});

document.querySelector(".css").addEventListener("mouseenter", () => {
    gainXP(10, 'cssHovered');
});

document.querySelector(".js").addEventListener("mouseenter", () => {
    gainXP(10, 'jsHovered');
});

document.querySelector(".react").addEventListener("mouseenter", () => {
    gainXP(10, 'reactHovered');
});

// Animate skill bars when the section is visible
document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".progress");

    progressBars.forEach((bar) => {
        let width = bar.classList.contains("html") ? 80 :
                    bar.classList.contains("css") ? 70 :
                    bar.classList.contains("js") ? 40 :
                    bar.classList.contains("react") ? 10 : 10;

        setTimeout(() => {
            bar.style.width = width + "%";
        }, 500);
    });
});