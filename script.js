document.addEventListener('DOMContentLoaded', function () {

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;

            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Modal Handling
    const modal = document.querySelector('#lead-modal');
    const closeBtns = document.querySelectorAll('.close-modal');
    const openBtns = document.querySelectorAll('.btn-open-modal');
    const packageInput = document.querySelector('#package-name');

    // Open Modal Triggers
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pkgName = btn.getAttribute('data-package');
            if (packageInput && pkgName) {
                packageInput.value = pkgName;
            }
            if (modal) modal.classList.add('show');
        });
    });

    // Close Modal Triggers
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(m => m.classList.remove('show'));
        });
    });

    // Close on Outside Click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });

    // Generic Form Handler (for both Exit Modal & Main Form)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.innerText;

        btn.innerText = 'Sending...';
        btn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            alert('Thank you! Your enquiry has been sent successfully. We will contact you within 24 hours.');
            e.target.reset();
            btn.innerText = originalText;
            btn.disabled = false;

            // If it's the modal form, close it
            if (e.target.closest('.modal')) {
                document.querySelector('.modal').classList.remove('show');
            }
        }, 1500);
    };

    // Attach to all forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Review Slider Logic
    const track = document.querySelector('.reviews-track');
    const slides = document.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && slides.length > 0) {
        let currentSlide = 0;
        const slideCount = slides.length;

        const updateSlider = () => {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateSlider();
        };

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });

        // Auto Play
        let slideInterval = setInterval(nextSlide, 5000);

        const resetTimer = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        };
    }

});
