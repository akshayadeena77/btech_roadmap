const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// ===============================
// B.TECH ROADMAP DATA
// ===============================

const roadmap = [
    {
        id: 1,
        title: "Programming Fundamentals",
        description: "Learn programming basics.",
        skills: [
            "C",
            "Java",
            "Python",
            "Variables",
            "Loops",
            "Functions",
            "OOP"
        ]
    },

    {
        id: 2,
        title: "Data Structures & Algorithms",
        description: "Improve problem solving skills.",
        skills: [
            "Arrays",
            "Linked Lists",
            "Stacks",
            "Queues",
            "Trees",
            "Graphs",
            "Algorithms"
        ]
    },

    {
        id: 3,
        title: "Web Development",
        description: "Learn modern web development.",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React"
        ]
    },

    {
        id: 4,
        title: "Database & Backend",
        description: "Learn how applications store data.",
        skills: [
            "SQL",
            "MySQL",
            "MongoDB",
            "Node.js",
            "Express",
            "APIs"
        ]
    },

    {
        id: 5,
        title: "Projects",
        description: "Build real-world projects.",
        skills: [
            "Portfolio",
            "Student Management System",
            "Learning Platform",
            "Expense Tracker"
        ]
    },

    {
        id: 6,
        title: "Career Preparation",
        description: "Prepare for internships and jobs.",
        skills: [
            "Git",
            "GitHub",
            "Resume",
            "Interview",
            "Internships"
        ]
    }
];


// ===============================
// PROJECT DATA
// ===============================

const projects = [
    {
        id: 1,
        name: "Portfolio Website",
        level: "Beginner"
    },

    {
        id: 2,
        name: "Student Management System",
        level: "Intermediate"
    },

    {
        id: 3,
        name: "Learning Platform",
        level: "Intermediate"
    },

    {
        id: 4,
        name: "Expense Tracker",
        level: "Beginner"
    }
];


// ===============================
// PROGRESS
// ===============================

let progress = {};


// ===============================
// HOME API
// ===============================

app.get("/", (req, res) => {

    res.json({
        message: "B.Tech Roadmap Backend is running!",
        status: "success"
    });

});


// ===============================
// GET ROADMAP
// ===============================

app.get("/api/roadmap", (req, res) => {

    res.json(roadmap);

});


// ===============================
// GET ONE ROADMAP STAGE
// ===============================

app.get("/api/roadmap/:id", (req, res) => {

    const id = Number(req.params.id);

    const stage = roadmap.find(item => item.id === id);

    if (!stage) {

        return res.status(404).json({
            message: "Roadmap stage not found"
        });

    }

    res.json(stage);

});


// ===============================
// GET PROJECTS
// ===============================

app.get("/api/projects", (req, res) => {

    res.json(projects);

});


// ===============================
// GET PROGRESS
// ===============================

app.get("/api/progress", (req, res) => {

    res.json(progress);

});


// ===============================
// UPDATE PROGRESS
// ===============================

app.post("/api/progress", (req, res) => {

    const { stageId, completed } = req.body;

    if (!stageId) {

        return res.status(400).json({
            message: "stageId is required"
        });

    }

    progress[stageId] = completed;

    res.json({
        message: "Progress updated successfully",
        progress: progress
    });

});


// ===============================
// SERVER
// ===============================

app.listen(PORT, () => {

    console.log(
        `B.Tech Roadmap backend running on port ${PORT}`
    );

});
