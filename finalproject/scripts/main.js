import { loadCV, loadLectures } from './modules/data.js';
import { save, load } from './modules/storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const cvModal = document.getElementById('cv-modal');
  const openCvBtn = document.getElementById('cvBtn');
  if (!cvModal || !openCvBtn) return;

  const modalContent = cvModal.querySelector('.modal-content');

  openCvBtn.addEventListener('click', async () => {
    cvModal.style.display = 'block';
    try {
      const data = await loadCV();
      modalContent.innerHTML = `
        <button class="close" aria-label="Close">&times;</button>
        <h2>${data.fullName}</h2>
        <blockquote>${data.quote}</blockquote>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <h3>Education</h3>
        <ul>${data.education.map(i => `<li>${i.program}, ${i.institution}</li>`).join('')}</ul>
        <h3>Degrees</h3>
        <ul>${data.degrees.map(d => `<li>${d.program}, ${d.institution}</li>`).join('')}</ul>
      `;
      modalContent.querySelector('.close').addEventListener('click', () => {
        cvModal.style.display = 'none';
      });
    } catch (err) {
      modalContent.innerHTML = `<p>Error loading CV data. Please try again later.</p>`;
      console.error(err);
    }
  });

  const firstSeen = load('firstSeenAt');
  if (!firstSeen) save('firstSeenAt', new Date().toISOString());
});
