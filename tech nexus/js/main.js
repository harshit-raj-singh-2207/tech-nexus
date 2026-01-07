/* =========================
   NAVBAR & SCROLL EFFECTS
========================= */
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        navbar.style.boxShadow = window.scrollY > 20 ? "0 10px 30px rgba(0,0,0,0.08)" : "none";
    }
    revealOnScroll();
});

/* =========================
   SCROLL REVEAL ANIMATION
========================= */
const revealElements = document.querySelectorAll(".feature-card, .hero-text, .hero-card, .cta-box");

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        } else if (!el.style.opacity) {
            // Initial state if not set in CSS
            el.style.opacity = "0";
            el.style.transform = "translateY(40px)";
            el.style.transition = "0.6s ease";
        }
    });
}
revealOnScroll(); // Trigger once on load

/* =========================
   AI CHAT LOGIC
========================= */
const aiBtn = document.querySelector(".ai-btn");
const aiBox = document.querySelector(".ai-box");
const aiInput = document.querySelector(".ai-input input");
const aiSendBtn = document.querySelector(".ai-input button");
const aiMessages = document.querySelector(".ai-messages");

// Toggle Chat Box
if (aiBtn && aiBox) {
    aiBox.style.display = "none"; // Start hidden
    aiBtn.addEventListener("click", () => {
        const isVisible = aiBox.style.display === "flex";
        aiBox.style.display = isVisible ? "none" : "flex";
        if (!isVisible && aiInput) aiInput.focus();
    });
}

// Helper: Format **Bold** text to HTML
function formatText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
}

// Add Message to UI
function addMessage(text, sender) {
    if (!aiMessages) return;

    const msg = document.createElement("div");
    msg.className = `ai-msg ${sender}`;
    msg.innerHTML = formatText(text); // Use innerHTML for formatting
    aiMessages.appendChild(msg);
    aiMessages.scrollTop = aiMessages.scrollHeight; // Auto scroll to bottom
    return msg;
}

// Send Message Function
async function sendMessage() {
    if (!aiInput) return;
    const userText = aiInput.value.trim();
    if (!userText) return;

    // 1. Add User Message
    addMessage(userText, "user");
    aiInput.value = "";

    // 2. Add "Thinking..." Indicator
    const thinkingMsg = addMessage("Thinking... 🤖", "bot");

    // 3. Get Response from Gemini
    const systemPrompt = `You are an intelligent exam assistant for college students. 
    Keep answers concise, encouraging, and easy to read. 
    Use bullet points where necessary.
    
    User Query: ${userText}`;

    const reply = await askGemini(systemPrompt);

    // 4. Remove Thinking & Add Real Response
    thinkingMsg.remove();
    addMessage(reply, "bot");
}

// Event Listeners for Chat
if (aiSendBtn && aiInput) {
    aiSendBtn.addEventListener("click", sendMessage);
    aiInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
}

/* =========================
   ACTIVE NAV LINK
========================= */
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});