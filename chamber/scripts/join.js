document.addEventListener("DOMContentLoaded", () => {
  // Set timestamp in hidden form field
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    const now = new Date().toISOString();
    timestampInput.value = now;
    console.log("Timestamp set:", now);
  }

  // Membership modal logic
  document.querySelectorAll('.membership-cards a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const modalId = link.getAttribute('href');
      const modal = document.querySelector(modalId);
      const card = link.closest('.card');
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');

      modal.style.display = 'block';
      modal.style.top = `${scrollY + card.offsetTop + card.offsetHeight + 10}px`;
      modal.style.left = `${scrollX + card.offsetLeft}px`;
    });
  });

  document.querySelectorAll('.modal .close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      closeBtn.closest('.modal').style.display = 'none';
    });
  });
});


  
  