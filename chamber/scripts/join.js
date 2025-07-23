document.querySelectorAll('.membership-cards a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
  
      const modalId = link.getAttribute('href');
      const modal = document.querySelector(modalId);
      const card = link.closest('.card');
      const cardRect = card.getBoundingClientRect();
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
  
  
  