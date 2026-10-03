// ==========================================
// BACKEND URL
// ==========================================

const API_URL = "https://btech-roadmap.onrender.com";


// ==========================================
// LOAD ROADMAP
// ==========================================

async function loadRoadmap() {

    try {

        const response = await fetch(
            `${API_URL}/api/roadmap`
        );

        if (!response.ok) {
            throw new Error("Failed to load roadmap");
        }

        const roadmap = await response.json();

        displayRoadmap(roadmap);

    } catch (error) {

        console.error(error);

        document.querySelector(".roadmap").innerHTML = `
            <p class="error">
                Unable to load roadmap.
                Please try again later.
            </p>
        `;
    }
}


// ==========================================
// DISPLAY 6 ROADMAP STAGES
// ==========================================

function displayRoadmap(roadmap) {

    const container = document.querySelector(".roadmap");

    container.innerHTML = "";

    roadmap.forEach((stage) => {

        const card = document.createElement("div");

        card.className = "roadmap-card";

        card.innerHTML = `

            <div class="number">
                ${String(stage.id).padStart(2, "0")}
            </div>

            <h3>
                ${stage.title}
            </h3>

            <p>
                ${stage.description}
            </p>

            <ul>
                ${stage.skills
                    .map(skill => `<li>${skill}</li>`)
                    .join("")}
            </ul>

            <button
                onclick="completeStage(${stage.id})">
                Mark Complete
            </button>

        `;

        container.appendChild(card);

    });

    loadSavedProgress();
}


// ==========================================
// LOAD PROJECTS
// ==========================================

async function loadProjects() {

    try {

        const response = await fetch(
            `${API_URL}/api/projects`
        );

        if (!response.ok) {
            throw new Error("Failed to load projects");
        }

        const projects = await response.json();

        displayProjects(projects);

    } catch (error) {

        console.error(error);

        document.querySelector(".project-grid").innerHTML = `
            <p class="error">
                Unable to load projects.
            </p>
        `;
    }
}


// ==========================================
// DISPLAY PROJECTS
// ==========================================

function displayProjects(projects) {

    const container =
        document.querySelector(".project-grid");

    container.innerHTML = "";

    projects.forEach((project) => {

        const card = document.createElement("div");

        card.className = "project";

        card.innerHTML = `

            <h3>
                💻 ${project.name}
            </h3>

            <p>
                Level:
                <strong>${project.level}</strong>
            </p>

        `;

        container.appendChild(card);

    });
}


// ==========================================
// COMPLETE ROADMAP STAGE
// ==========================================

async function completeStage(stageId) {

    try {

        const response = await fetch(
            `${API_URL}/api/progress`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    stageId: stageId,
                    completed: true
                })
            }
        );

        const data = await response.json();

        console.log(data);

        updateButton(stageId);

    } catch (error) {

        console.error(error);

        alert(
            "Could not save progress. Please try again."
        );
    }
}


// ==========================================
// UPDATE BUTTON
// ==========================================

function updateButton(stageId) {

    const buttons =
        document.querySelectorAll(
            ".roadmap-card button"
        );

    const button = buttons[stageId - 1];

    if (button) {

        button.textContent =
            "✓ Completed";

        button.style.background =
            "#5eead4";

        button.style.color =
            "#071018";

    }
}


// ==========================================
// GET SAVED PROGRESS
// ==========================================

async function loadSavedProgress() {

    try {

        const response = await fetch(
            `${API_URL}/api/progress`
        );

        const progress = await response.json();

        console.log(
            "Current progress:",
            progress
        );

        Object.keys(progress).forEach(stageId => {

            if (progress[stageId] === true) {

                updateButton(
                    Number(stageId)
                );

            }

        });

    } catch (error) {

        console.error(
            "Could not load progress",
            error
        );

    }
}


// ==========================================
// START WEBSITE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadRoadmap();

        loadProjects();

    }
);
