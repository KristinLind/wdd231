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
    courseList.innerHTML = "";
  
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
  
      
      div.addEventListener("click", () => {
        displayCourseDetails(course);
      });
  
      courseList.appendChild(div);
    });
}
  
function displayCourseDetails(course) {
const courseDetails = document.getElementById("course-details");
    courseDetails.innerHTML = `
      <div class="modal-header">
        <h2>${course.name}</h2>
        <button id="closeCourseModal">Close</button>
      </div>
      <p><strong>Subject:</strong> ${course.subject}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Status:</strong> ${course.completed ? "Completed" : "Not Completed"}</p>
    `;
    courseDetails.showModal();
  
    document.getElementById("closeCourseModal").addEventListener("click", () => {
      courseDetails.close();
    });
}
  
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCourses(btn.dataset.subject);
    });
});
  
renderCourses(); 
  