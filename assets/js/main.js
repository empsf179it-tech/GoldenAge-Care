document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Sticky Header & Active Links ---
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {

        // Back to top visibility
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        // Active link highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    mobileToggle.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- 3. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 4. Parallax Effect (Hero & Experience Section) ---
    const parallaxBg = document.querySelector('.parallax-bg img');
    
    window.addEventListener('scroll', () => {
        if(parallaxBg) {
            const scrolled = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    });

    // --- 5. Testimonial Slider ---
    const slides = document.querySelectorAll('.test-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // Auto slide
        setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 6000);
    }

    // --- 6. CTA Popup System ---
    const modal = document.getElementById('ctaModal');
    const closeBtn = document.querySelector('.modal-close');
    const ctaTriggers = document.querySelectorAll('.cta-trigger');

    function openModal(e) {
        if(e) e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Reset form
        document.getElementById('popupSuccess').style.display = 'none';
        document.getElementById('popupForm').reset();
    }

    ctaTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    closeBtn.addEventListener('click', closeModal);

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- 7. Form Validations (Frontend only) ---
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic validation passed (handled by HTML required attrs)
            contactSuccess.style.display = 'block';
            setTimeout(() => {
                contactForm.reset();
                contactSuccess.style.display = 'none';
            }, 4000);
        });
    }

    const popupForm = document.getElementById('popupForm');
    const popupSuccess = document.getElementById('popupSuccess');
    
    if(popupForm) {
        popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            popupSuccess.style.display = 'block';
            setTimeout(() => {
                closeModal();
            }, 3000);
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const btn = newsletterForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Subscribed ✓';
            input.value = '';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 3000);
        });
    }

    // --- 8. Back to Top Action ---
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 9. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Initialize the active item (if any)
    faqItems.forEach(item => {
        if (item.classList.contains('active')) {
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

});
