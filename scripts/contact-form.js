const contactFormBtn = document.getElementById('contact-form-btn');
const contactFormBox = document.getElementById('contact-form-box');
const contactFormCloseBtn = document.getElementById('contact-form-close-btn');
const contactForm = document.getElementById('contact-form');

contactFormBtn.addEventListener('click', () => {
    contactFormBox.classList.toggle('hidden');
});

contactFormCloseBtn.addEventListener('click', () => {
    contactFormBox.classList.add('hidden');
});

contactForm.addEventListener('submit', (event) => {
    const name = event.target.sender.value;
    const message = event.target.message.value;

    const subject = encodeURIComponent(`${name} says hello!`);
    const body = encodeURIComponent(message);

    window.location.href = `mailto:i.ivanov@eduiteh.eu?subject=${subject}&body=${body}`;
});
