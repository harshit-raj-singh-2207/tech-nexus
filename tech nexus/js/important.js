async function generateTopics() {
    const subject = document.getElementById("subjectInput").value;
    const semester = document.getElementById("semesterInput").value;
    const exam = document.getElementById("examInput").value;
    const output = document.getElementById("topicsOutput");

    if (!subject || !semester) {
        output.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: var(--orange);'>Please enter both Subject and Semester!</p>";
        return;
    }

    // Loading State
    output.innerHTML = `
        <div class="dashboard-card" style="grid-column: 1/-1; text-align: center;">
            <h3>Generating Topics... 🤖</h3>
            <p>Analyzing past trends and syllabus...</p>
        </div>
    `;

    const prompt = `
    Act as a university exam expert.
    Subject: ${subject}
    Semester: ${semester}
    Exam Type: ${exam || "University End Semester"}

    Task: List exactly 8 to 10 most important, high-probability topics for this exam.
    Format: Return ONLY the list. Do not write introductory text like "Here are the topics".
    Start every topic with a bullet point (*).
    Example Output:
    * Topic 1
    * Topic 2
    `;

    const response = await askGemini(prompt);

    // Clear loading
    output.innerHTML = "";

    // Parse Response (Split by lines, remove empty ones and clean up stars)
    const lines = response.split("\n");
    let hasTopics = false;

    lines.forEach(line => {
        const cleanLine = line.trim().replace(/^[\*\-\•]\s*/, ""); // Remove bullets
        
        if (cleanLine.length > 3) { // Filter out short garbage text
            hasTopics = true;
            const card = document.createElement("div");
            card.className = "dashboard-card";
            card.innerHTML = `
                <h3 style="font-size: 1.1rem; margin-bottom: 5px;">${cleanLine}</h3>
                <p style="font-size: 0.85rem; color: #666;">High Probability</p>
            `;
            output.appendChild(card);
        }
    });

    if (!hasTopics) {
        output.innerHTML = "<p>Sorry, AI couldn't generate topics. Try a different subject name.</p>";
    }
}