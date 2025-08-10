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

  (function setupConsultationModal() {
    const consultationModal = document.getElementById("consultationModal");
    const openBtn   = document.getElementById("openConsultationModal");
    const closeBtn  = document.getElementById("closeConsultation");
    const form      = document.getElementById("consultationForm");
    const confirm   = document.getElementById("consultationConfirmation");
    const welcome   = document.getElementById("consultationWelcome");
  
    const nameEl = document.getElementById("consultName");
    const emailEl = document.getElementById("consultEmail");
    const dateEl = document.getElementById("consultDate");
    const msgEl  = document.getElementById("consultMessage");
  
    if (!consultationModal || !openBtn || !closeBtn || !form || !confirm) return;

    const prefillFromStorage = () => {
      try {
        const draft = JSON.parse(localStorage.getItem("consultationData") || "{}");
        if (draft.name)   nameEl.value  = draft.name;
        if (draft.email)  emailEl.value = draft.email;
        if (draft.date)   dateEl.value  = draft.date;
        if (draft.message) msgEl.value  = draft.message;
      } catch {}
    };

    const showWelcomeIfReturning = () => {
      try {
        const history = JSON.parse(localStorage.getItem("consultationHistory") || "[]");
        if (history.length) {
          const last = history[history.length - 1];
          const lastWhen = new Date(last.submittedAt).toLocaleString();
          welcome.style.display = "block";
          welcome.textContent = `Welcome back${last.name ? `, ${last.name}` : ""}! Your last consultation request was submitted on ${lastWhen}. Your info has been prefilled.`;
        } else {
          welcome.style.display = "none";
          welcome.textContent = "";
        }
      } catch {
        welcome.style.display = "none";
      }
    };
  
    openBtn.addEventListener("click", () => {
      consultationModal.style.display = "block";
      consultationModal.setAttribute("aria-hidden", "false");
    
      form.style.display = "block";
      confirm.style.display = "none";
  
      prefillFromStorage();
      showWelcomeIfReturning();
    });
  
    closeBtn.addEventListener("click", () => {
      consultationModal.style.display = "none";
      consultationModal.setAttribute("aria-hidden", "true");
      form.style.display = "block";
      confirm.style.display = "none";
    });
  
    window.addEventListener("click", (e) => {
      if (e.target === consultationModal) {
        consultationModal.style.display = "none";
        consultationModal.setAttribute("aria-hidden", "true");
        form.style.display = "block";
        confirm.style.display = "none";
      }
    });

    const saveDraft = () => {
      const data = {
        name: (nameEl.value || "").trim(),
        email: (emailEl.value || "").trim(),
        date: dateEl.value || "",
        message: (msgEl.value || "").trim()
      };
      localStorage.setItem("consultationData", JSON.stringify(data));
    };
    [nameEl, emailEl, dateEl, msgEl].forEach(el => {
      if (el) el.addEventListener("input", saveDraft);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const data = {
        name: (nameEl.value || "").trim(),
        email: (emailEl.value || "").trim(),
        date: dateEl.value || "",
        message: (msgEl.value || "").trim()
      };

      localStorage.setItem("consultationData", JSON.stringify(data));
  
      const history = JSON.parse(localStorage.getItem("consultationHistory") || "[]");
      const submittedAt = new Date().toISOString();
      history.push({ ...data, submittedAt });
      localStorage.setItem("consultationHistory", JSON.stringify(history));

      const submittedLocal = new Date(submittedAt).toLocaleString();
      confirm.innerHTML = `
        ✅ Thank you${data.name ? `, ${data.name}` : ""}! We received your request on <strong>${submittedLocal}</strong>.<br>
        We'll get back to you within 24 hours.<br>
        📞 If you don't hear from us, please call <strong>720-331-0410</strong>.
      `;
      form.style.display = "none";
      confirm.style.display = "block";
      setTimeout(() => form.reset(), 400);
    });
  })();
  
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
