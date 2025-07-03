const courses = [
    { name: "WDD 130", subject: "WDD", credits: 3, completed: true },
    { name: "WDD 131", subject: "WDD", credits: 3, completed: true },
    { name: "CSE 210", subject: "CSE", credits: 3, completed: true },
    { name: "CSE 220", subject: "CSE", credits: 3, completed: false },
    { name: "WDD 231", subject: "WDD", credits: 3, completed: false }
];
  
const courseList = document.getElementById("courseList");
const totalCredits = document.getElementById("totalCredits");
const filterButtons = document.querySelectorAll("#filters button");
  
function renderCourses(subject = "All") {
    courseList.innerHTML = ""; // clear previous
  
const filtered = subject === "All" 
      ? courses 
      : courses.filter(c => c.subject === subject);
  
let credits = 0;
  
    filtered.forEach(course => {
      const div = document.createElement("div");
      div.textContent = `${course.name} - ${course.credits} credits`;
      if (course.completed) {
        div.style.fontWeight = "bold";
        div.style.color = "green";
        div.textContent += " ✅ Completed";
      }
      courseList.appendChild(div);
      credits += course.credits;
});
  
    totalCredits.textContent = `Total Credits: ${filtered.reduce((sum, c) => sum + c.credits, 0)}`;
}
  
// Initial render
renderCourses();
  
// Add event listeners for filters
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      renderCourses(btn.dataset.subject);
});
});
  