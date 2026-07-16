    const burgerBtn = document.getElementById('burgerBtn');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarOverlay = document.getElementById('navbarOverlay');

    function toggleMenu() {
        burgerBtn.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        navbarOverlay.classList.toggle('active');
        document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
    }

    burgerBtn.addEventListener('click', toggleMenu);
    navbarOverlay.addEventListener('click', toggleMenu);

    document.querySelectorAll('.navbar__menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15, 
    rootMargin: '0px 0px -50px 0px' 
});

revealElements.forEach(el => revealObserver.observe(el));

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500; // мс
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easing — плавное замедление к концу
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        el.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target + suffix; // финальное точное значение
        }
    }

    requestAnimationFrame(update);
}

const counterElements = document.querySelectorAll('.statistic__value[data-target]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

counterElements.forEach(el => counterObserver.observe(el));

const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const offset = window.scrollY;
    hero.style.backgroundPositionY = `${offset * 0.4}px`;
});
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // показать сообщение "Спасибо, мы свяжемся с вами!"
});
// CONTACT FORM VALIDATION
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const phoneInput = document.getElementById('phoneInput');
const nameError = document.getElementById('nameError');
const phoneError = document.getElementById('phoneError');
const successMessage = document.getElementById('successMessage');

function validatePhone(value) {
    // минимум 10 цифр (без учёта +, скобок, пробелов, тире)
    const digitsOnly = value.replace(/\D/g, '');
    return digitsOnly.length >= 10;
}

function showError(input, errorEl, message) {
    input.classList.add('input-error');
    errorEl.textContent = message;
    errorEl.classList.add('visible');
}

function clearError(input, errorEl) {
    input.classList.remove('input-error');
    errorEl.classList.remove('visible');
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // проверка имени
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, nameError, 'Введите имя (минимум 2 символа)');
        isValid = false;
    } else {
        clearError(nameInput, nameError);
    }

    // проверка телефона
    if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, phoneError, 'Введите корректный номер телефона');
        isValid = false;
    } else {
        clearError(phoneInput, phoneError);
    }

    if (!isValid) return;

    // всё валидно — показываем успех
    contactForm.classList.add('hidden');
    successMessage.classList.add('visible');

    // здесь в будущем можно добавить реальную отправку (fetch на backend/Telegram/EmailJS)
});

// убираем ошибку при вводе, если поле начали исправлять
nameInput.addEventListener('input', () => clearError(nameInput, nameError));
phoneInput.addEventListener('input', () => clearError(phoneInput, phoneError));