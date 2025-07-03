const courses = [
    { name: "WDD 130", subject: "WDD", credits: 3, completed: true },
    { name: "WDD 131", subject: "WDD", credits: 3, completed: true },
    { name: "WDD 231", subject: "WDD", credits: 3, completed: false },
    { name: "CSE 111", subject: "CSE", credits: 3, completed: true },
    { name: "CSE 210", subject: "CSE", credits: 3, completed: true },
    { name: "CSE 220", subject: "CSE", credits: 3, completed: false }
];

const courseList = document.getElementById("courseList");
const totalCourses = document.getElementById("totalCourses");
const filterButtons = document.querySelectorAll("#filters button");

function renderCourses(subject = "All") {
    courseList.innerHTML = ""; // clear

    const filtered = subject === "All"
        ? courses
        : courses.filter(c => c.subject === subject);

    totalCourses.textContent = `The total number of courses listed below is ${filtered.length}`;

    filtered.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course");

        if (course.completed) {
            div.classList.add("completed");
            div.textContent = `✓ ${course.name} (${course.credits} credits)`;
        } else {
            div.classList.add("not-completed");
            div.textContent = `${course.name} (${course.credits} credits)`;
        }

        courseList.appendChild(div);
    });
}

// initial render
renderCourses();

// add event listeners to buttons
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        renderCourses(btn.dataset.subject);
    });
});
