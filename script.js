const modal = document.getElementById('demoModal');
const openDemo = document.getElementById('playDemo');
const closeButtons = document.querySelectorAll('.close-modal, .close-demo');

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

openDemo.addEventListener('click', () => {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
});

closeButtons.forEach((button) => button.addEventListener('click', closeModal));
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

document.querySelectorAll('.side-link[data-panel]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.side-link[data-panel]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});
