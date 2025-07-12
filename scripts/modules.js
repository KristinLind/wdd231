import byuiCourse from './course.mjs';
import { setSectionSelection } from './sections.mjs';
import { setTitle, renderSections } from './output.mjs';

// initial setup
setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);

document.getElementById('enrollStudent').addEventListener('click', function () {
  const sectionNum = document.getElementById('sectionNumber').value;
  byuiCourse.changeEnrollment(sectionNum);
  renderSections(byuiCourse.sections);
});

document.getElementById('dropStudent').addEventListener('click', function () {
  const sectionNum = document.getElementById('sectionNumber').value;
  byuiCourse.changeEnrollment(sectionNum, false);
  renderSections(byuiCourse.sections);
});
