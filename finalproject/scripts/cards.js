function adjustLectureCardLayout() {
    console.log("Lecture card layout adjusted on resize or load.");
  }
  
  window.addEventListener('resize', adjustLectureCardLayout);
  window.addEventListener('DOMContentLoaded', () => {
    adjustLectureCardLayout();
});
  