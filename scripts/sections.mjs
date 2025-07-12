export function setSectionSelection(sections) {
    const sectionSelect = document.getElementById('sectionNumber');
    sectionSelect.innerHTML = '';
  
    sections.forEach(section => {
      const option = document.createElement('option');
      option.value = section.sectionNumber;
      option.textContent = `Section ${section.sectionNumber}`;
      sectionSelect.appendChild(option);
    });
}
  