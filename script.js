function completeStage(stage) {

    const buttons = document.querySelectorAll(
        ".roadmap-card button"
    );

    const button = buttons[stage - 1];

    button.textContent = "✓ Completed";

    button.style.background = "#5eead4";
    button.style.color = "#071018";

    localStorage.setItem(
        "stage" + stage,
        "completed"
    );
}


window.onload = function () {

    const buttons = document.querySelectorAll(
        ".roadmap-card button"
    );

    for (let i = 1; i <= 6; i++) {

        if (
            localStorage.getItem("stage" + i)
            === "completed"
        ) {

            buttons[i - 1].textContent =
                "✓ Completed";

            buttons[i - 1].style.background =
                "#5eead4";

            buttons[i - 1].style.color =
                "#071018";
        }
    }

};
