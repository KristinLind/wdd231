export function setTitle(course) {
    const titleElement = document.getElementById('courseTitle');
    titleElement.textContent = `${course.code}: ${course.name}`;
}
  
export function renderSections(sections) {
    const list = document.getElementById('sections');
    list.innerHTML = '';
  
    sections.forEach(section => {
      const li = document.createElement('li');
      li.textContent = `Section ${section.sectionNumber}: ${section.enrolled}/${section.capacity} enrolled`;
      list.appendChild(li);
    });
}
  