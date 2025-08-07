document.addEventListener("DOMContentLoaded", () => {
    const cvModal = document.getElementById("cv-modal");
    const openCvBtn = document.getElementById("cvBtn");
  
    if (cvModal && openCvBtn) {
      const modalContent = cvModal.querySelector(".modal-content");
  
      openCvBtn.addEventListener("click", async () => {
        cvModal.style.display = "block";
  
        try {
          const response = await fetch("data/cv.json");
          const data = await response.json();
  
          modalContent.innerHTML = `
            <span class="close">&times;</span>
            <h2>${data.fullName}</h2>
            <blockquote>${data.quote}</blockquote>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <h3>Education</h3>
            <ul>${data.education.map(item => `<li>${item.program}, ${item.institution}</li>`).join('')}</ul>
            <h3>Degrees</h3>
            <ul>${data.degrees.map(degree => `
              <li>${degree.program}, ${degree.institution}
              ${degree.details ? `<ul>${degree.details.map(detail => `<li>${detail}</li>`).join('')}</ul>` : ''}</li>
            `).join('')}</ul>
            <h3>Honors</h3>
            <ul>${data.honors.map(honor => `<li>${honor}</li>`).join('')}</ul>
            <h3>Certificates & Programs</h3>
            <ul>${data.certificates_and_programs.map(cert => `
              <li><strong>${cert.title}</strong> - ${cert.institution || cert.instructor || cert.location || "N/A"}<br>
              ${cert.description}</li>
            `).join('')}</ul>
          `;
  
          modalContent.querySelector(".close").addEventListener("click", () => {
            cvModal.style.display = "none";
          });
  
          window.addEventListener("click", (e) => {
            if (e.target === cvModal) {
              cvModal.style.display = "none";
            }
          });
        } catch (error) {
          modalContent.innerHTML = `<p>Error loading CV data. Please try again later.</p>`;
          console.error("Error fetching CV:", error);
        }
      });
    }

  const consultationModal = document.getElementById("consultationModal");
  const openConsultationBtn = document.getElementById("openConsultationModal");
  const closeConsultationBtn = document.getElementById("closeConsultation");

  if (consultationModal && openConsultationBtn && closeConsultationBtn) {
    openConsultationBtn.addEventListener("click", () => {
      consultationModal.style.display = "block";
    });

    closeConsultationBtn.addEventListener("click", () => {
      consultationModal.style.display = "none";
    });

    const consultationForm = document.getElementById("consultationForm");
    const consultationConfirmation = document.getElementById("consultationConfirmation");

    if (consultationForm && consultationConfirmation) {
      consultationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        consultationForm.style.display = "none";
        consultationConfirmation.style.display = "block";

        setTimeout(() => {
          consultationForm.reset();
        }, 500);
      });
    }

    closeConsultationBtn.addEventListener("click", () => {
      consultationModal.style.display = "none";
      consultationForm.style.display = "block";
      consultationConfirmation.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === consultationModal) {
        consultationModal.style.display = "none";
      }
    });
  } else {
    console.error("❌ Consultation modal setup failed due to missing elements.");
  }

  const lectureModal = document.getElementById("lectureModal");
  const closeLectureBtn = document.getElementById("closeLectureModal");
  const lectureDetailsContainer = document.getElementById("lectureDetailsContainer");
  const exploreLecturesBtn = document.getElementById("exploreLecturesBtn");

  if (exploreLecturesBtn && lectureModal && lectureDetailsContainer) {
    exploreLecturesBtn.addEventListener("click", async () => {
      try {
        const response = await fetch("data/lectures.json");
        const data = await response.json();

        lectureDetailsContainer.innerHTML = data.map(lecture => `
          <div class="lecture-detail-block">
            <h3>${lecture.title}</h3>
            <p><strong>${lecture.description}</strong></p>
            <p><em>Category: ${lecture.category}</em></p>
            ${lecture.details ? `<ul>${lecture.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
            <hr>
          </div>
        `).join('');

        lectureModal.style.display = "block";
      } catch (err) {
        lectureDetailsContainer.innerHTML = `<p>Error loading lecture topics.</p>`;
        console.error(err);
      }
    });

    closeLectureBtn.addEventListener("click", () => {
      lectureModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === lectureModal) {
        lectureModal.style.display = "none";
      }
    });
  }
});

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-open]');
  if (!trigger) return;
  const sel = trigger.dataset.open;
  const modal = document.querySelector(sel);
  if (!modal) return;
  modal.style.display = 'block';
  document.documentElement.classList.add('no-scroll'); // optional
  modal.querySelector('[data-close]')?.focus();
});


document.addEventListener('click', (e) => {
  if (e.target.matches('[data-close]') || e.target.classList.contains('modal')) {
    e.target.closest('.modal').style.display = 'none';
    document.documentElement.classList.remove('no-scroll');
  }
});

