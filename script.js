async function completeStage(stage) {

    const button = document.querySelectorAll(
        ".roadmap-card button"
    )[stage - 1];

    button.textContent = "✓ Completed";

    button.style.background = "#5eead4";
    button.style.color = "#071018";


    try {

        const response = await fetch(
            "YOUR_BACKEND_URL/api/progress",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    stageId: stage,
                    completed: true
                })
            }
        );

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log("Backend connection failed");

    }
}
