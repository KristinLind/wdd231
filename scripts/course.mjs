const byuiCourse = {
    code: 'WDD 231',
    name: 'Dynamic Web Fundamentals',
    sections: [
      { sectionNumber: '1', enrolled: 25, capacity: 30 },
      { sectionNumber: '2', enrolled: 28, capacity: 30 },
      { sectionNumber: '3', enrolled: 30, capacity: 30 }
    ],
    changeEnrollment(sectionNumber, add = true) {
      const section = this.sections.find(s => s.sectionNumber === sectionNumber);
      if (!section) return;
  
      if (add && section.enrolled < section.capacity) {
        section.enrolled++;
      } else if (!add && section.enrolled > 0) {
        section.enrolled--;
      }
    }
};
  
export default byuiCourse;
  