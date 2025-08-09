document.addEventListener("DOMContentLoaded", () => {

  const show = (el) => el.setAttribute("aria-hidden", "false");
  const hide = (el) => el.setAttribute("aria-hidden", "true");

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
          <button class="close" aria-label="Close">&times;</button>
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
          if (e.target === cvModal) cvModal.style.display = "none";
        }, { once: true });
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
    const consultationForm = document.getElementById("consultationForm");
    const consultationConfirmation = document.getElementById("consultationConfirmation");

    openConsultationBtn.addEventListener("click", () => {
      consultationModal.style.display = "block";
    });

    closeConsultationBtn.addEventListener("click", () => {
      consultationModal.style.display = "none";
      if (consultationForm && consultationConfirmation) {
        consultationForm.style.display = "block";
        consultationConfirmation.style.display = "none";
      }
    });

    if (consultationForm && consultationConfirmation) {
      consultationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        consultationForm.style.display = "none";
        consultationConfirmation.style.display = "block";
        setTimeout(() => consultationForm.reset(), 500);
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target === consultationModal) consultationModal.style.display = "none";
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
        show(lectureModal);
      } catch (err) {
        lectureDetailsContainer.innerHTML = `<p>Error loading lecture topics.</p>`;
        console.error(err);
      }
    });

    closeLectureBtn.addEventListener("click", () => hide(lectureModal));
    window.addEventListener("click", (e) => { if (e.target === lectureModal) hide(lectureModal); });
  }

  const contactModal   = document.getElementById("contactModal");
  const openContactBtn = document.getElementById("openContact");
  const closeContactBtn= document.getElementById("closeContact");

  if (contactModal && openContactBtn && closeContactBtn) {
    openContactBtn.addEventListener("click", () => show(contactModal));
    closeContactBtn.addEventListener("click", () => hide(contactModal));
    window.addEventListener("click", (e) => { if (e.target === contactModal) hide(contactModal); });
  }
});

(function trackVisits() {
  const lastVisit = localStorage.getItem("lastVisit");
  const visitCount = parseInt(localStorage.getItem("visitCount") || "0", 10) + 1;

  localStorage.setItem("visitCount", String(visitCount));
  localStorage.setItem("lastVisit", new Date().toISOString());

  console.log(`Welcome back! Visit #${visitCount}${lastVisit ? ` — last: ${new Date(lastVisit).toLocaleString()}` : ""}`);
})();

document.addEventListener("DOMContentLoaded", () => {
  const consultForm = document.getElementById("consultationForm");
  const nameEl = document.getElementById("consultName");
  const emailEl = document.getElementById("consultEmail");
  const dateEl = document.getElementById("consultDate");
  const msgEl = document.getElementById("consultMessage");

  try {
    const saved = JSON.parse(localStorage.getItem("consultationData") || "{}");
    if (nameEl && saved.name) nameEl.value = saved.name;
    if (emailEl && saved.email) emailEl.value = saved.email;
    if (dateEl && saved.date) dateEl.value = saved.date;
    if (msgEl && saved.message) msgEl.value = saved.message;
  } catch {}

  if (consultForm) {
    consultForm.addEventListener("submit", () => {
      const data = {
        name: nameEl?.value?.trim() || "",
        email: emailEl?.value?.trim() || "",
        date: dateEl?.value || "",
        message: msgEl?.value?.trim() || ""
      };
      localStorage.setItem("consultationData", JSON.stringify(data));
    });
  }
});
(function showVisitBadge() {
  const el = document.getElementById('visitBadge');
  if (!el) return;

  const count = parseInt(localStorage.getItem('visitCount') || '1', 10);
  const last  = localStorage.getItem('lastVisit');

  let lastText = '';
  if (last) {
    try {
      lastText = ` — last visit: ${new Date(last).toLocaleString()}`;
    } catch {}
  }
  el.textContent = `Welcome! Visit #${count}${lastText}`;
})();
