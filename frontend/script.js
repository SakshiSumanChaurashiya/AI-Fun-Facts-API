const generateBtn = document.getElementById("generateBtn");
const topicInput = document.getElementById("topic");
const result = document.getElementById("result");
const loading = document.getElementById("loading");

generateBtn.addEventListener("click", generateFunfact);

async function generateFunfact() {
    const topic = topicInput.value.trim();

    if (topic === "") {
        result.textContent = "Please enter a topic first.";
        return;
    }

    loading.style.display = "block";
    generateBtn.disabled = true;
    result.textContent = "";

    try {
        const response = await fetch("/api/fun-fact", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        topic: topic
    })
});

        const data = await response.json();

        if (data.success) {
            result.textContent = data.message;
        } else {
            result.textContent = "Failed to generate fun fact.";
        }

    } catch (error) {
        console.error(error);
        result.textContent = "Unable to connect to the backend server.";

    } finally {
        loading.style.display = "none";
        generateBtn.disabled = false;
    }
}
