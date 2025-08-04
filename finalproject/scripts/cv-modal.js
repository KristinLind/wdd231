document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("cv-modal");
    const openBtn = document.getElementById("cvBtn");
    if (!modal || !openBtn) return;
    const closeBtn = modal.querySelector(".close");
    const modalContent = modal.querySelector(".modal-content");
  
    openBtn.addEventListener("click", async () => {
      modal.style.display = "block";
  
      try {
        const response = await fetch("data/cv.json");
        const data = await response.json();
  
        modalContent.innerHTML = `
          <span class="close">&times;</span>
          <h2>${data.full_name}</h2>
          <blockquote>${data.quote}</blockquote>
          <p><strong>Bio:</strong> ${data.bio}</p>
          <p><strong>Education:</strong></p>
          <ul>
            ${data.education.map(item => `<li>${item.degree}, ${item.institution} (${item.year})</li>`).join('')}
          </ul>
          <p><strong>Awards:</strong> ${data.awards.join(', ')}</p>
          <p><strong>Certifications:</strong> ${data.certifications.join(', ')}</p>
        `;
  
        // Reattach close button since modalContent was replaced
        modal.querySelector(".close").addEventListener("click", () => {
          modal.style.display = "none";
        });
  
      } catch (error) {
        modalContent.innerHTML = `
          <span class="close">&times;</span>
          <p>Error loading CV data. Please try again later.</p>
        `;
        console.error("Error fetching CV:", error);
      }
    });
  
    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
});
  