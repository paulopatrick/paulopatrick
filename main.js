// Remove loader when page is loaded
window.addEventListener('load', function() {
    const loader = document.querySelector('.cyber-loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Terminal typing effect for multiple elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cyber cards
    const cyberCards = document.querySelectorAll('.cyber-card');
    cyberCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const hex = card.querySelector('.hex');
            if (hex) {
                hex.style.textShadow = '0 0 5px var(--neon-pink)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const hex = card.querySelector('.hex');
            if (hex) {
                hex.style.textShadow = 'none';
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = location.pathname.split('/').pop().replace('.html', '');
    const navLinks = document.querySelectorAll('.cyber-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').replace('.html', '');
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index')) {
            link.classList.add('active');
        }
    });
});

// Efeito de digitação para múltiplos elementos
function initTypewriterEffects() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        el.style.borderRight = '3px solid var(--neon-blue)';
        
        let i = 0;
        function type() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                el.style.borderRight = 'none';
            }
        }
        
        // Inicia após um delay aleatório para efeito mais orgânico
        setTimeout(type, Math.random() * 1000);
    });
}

// Ativa cards com efeito de brilho
function activateCardEffects() {
    const cards = document.querySelectorAll('.cyber-card, .blog-post, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x);
            card.style.setProperty('--mouse-y', y);
        });
    });
}

// Scroll suave para seções
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initImageModal() {
    const modal = document.getElementById('image-modal');
    if (!modal) return;

    const modalImage = modal.querySelector('.image-modal-img');
    const caption = modal.querySelector('.image-modal-caption');
    const closeButton = modal.querySelector('.image-modal-close');
    const backdrop = modal.querySelector('.image-modal-backdrop');
    const images = document.querySelectorAll('.project-image');

    function openModal(src, alt) {
        if (!modalImage) return;
        modalImage.src = src;
        modalImage.alt = alt || '';
        caption.textContent = alt || '';
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        setTimeout(() => {
            if (modalImage) {
                modalImage.src = '';
            }
        }, 200);
    }

    images.forEach(img => {
        img.addEventListener('click', () => {
            openModal(img.src, img.alt);
        });
    });

    closeButton.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if ((event.key === 'Escape' || event.key === 'Esc') && modal.classList.contains('open')) {
            closeModal();
        }
    });
}

function initCarousels() {
    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach((carousel) => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        if (!track || slides.length === 0 || !dotsContainer) {
            return;
        }

        let currentIndex = 0;

        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
            dot.addEventListener('click', () => updateCarousel(index));
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));

        function updateCarousel(index) {
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle('active', dotIndex === currentIndex);
            });

            if (prevButton) {
                prevButton.disabled = currentIndex === 0;
            }

            if (nextButton) {
                nextButton.disabled = currentIndex === slides.length - 1;
            }
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    updateCarousel(currentIndex - 1);
                }
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (currentIndex < slides.length - 1) {
                    updateCarousel(currentIndex + 1);
                }
            });
        }

        let startX = 0;
        let endX = 0;

        track.addEventListener('touchstart', (event) => {
            startX = event.changedTouches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;
            const deltaX = endX - startX;

            if (Math.abs(deltaX) < 50) {
                return;
            }

            if (deltaX < 0 && currentIndex < slides.length - 1) {
                updateCarousel(currentIndex + 1);
            }

            if (deltaX > 0 && currentIndex > 0) {
                updateCarousel(currentIndex - 1);
            }
        }, { passive: true });

        updateCarousel(0);
    });
}

function initAccordions() {
    const accordionGroups = document.querySelectorAll('[data-accordion-group]');

    accordionGroups.forEach((group) => {
        const items = Array.from(group.querySelectorAll('.article-accordion-item'));

        items.forEach((item) => {
            item.addEventListener('toggle', () => {
                if (!item.open) {
                    return;
                }

                items.forEach((otherItem) => {
                    if (otherItem !== item) {
                        otherItem.open = false;
                    }
                });
            });
        });
    });
}

// Inicializa todos os efeitos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Remove loader quando a página carrega
    const loader = document.querySelector('.cyber-loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Inicializa efeitos
    initTypewriterEffects();
    activateCardEffects();
    initSmoothScrolling();
    initImageModal();
    initCarousels();
    initAccordions();
    
    // Efeito de terminal no footer
    const terminalLine = document.querySelector('.terminal-line .command');
    const cursor = document.querySelector('.terminal-line .cursor');
    if (terminalLine) {
        const commands = [
            "scanning network...",
            "checking firewall...",
            "analyzing protocols...",
            "system secure.",
            "access granted."
        ];
        
        let currentCommand = 0;
        let currentChar = 0;
        let isDeleting = false;
        
        function typeCommand() {
            const fullCommand = commands[currentCommand];
            
            if (isDeleting) {
                terminalLine.textContent = fullCommand.substring(0, currentChar - 1);
                currentChar--;
                if (cursor) {
                    cursor.classList.add('typing');
                    cursor.style.opacity = '1';
                }
            } else {
                terminalLine.textContent = fullCommand.substring(0, currentChar + 1);
                currentChar++;
                if (cursor) {
                    cursor.classList.add('typing');
                    cursor.style.opacity = '1';
                }
            }
            
            if (!isDeleting && currentChar === fullCommand.length) {
                isDeleting = true;
                if (cursor) {
                    cursor.classList.remove('typing');
                    cursor.style.opacity = '0';
                }
                setTimeout(typeCommand, Math.random() * 1000 + 1500); // Random pause 1.5-2.5s
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentCommand = (currentCommand + 1) % commands.length;
                if (cursor) {
                    cursor.classList.remove('typing');
                    cursor.style.opacity = '0';
                }
                setTimeout(typeCommand, Math.random() * 500 + 300); // Random pause 0.3-0.8s
            } else {
                const baseSpeed = isDeleting ? 30 : 60;
                const typingSpeed = baseSpeed + Math.random() * 40; // Vary speed ±20ms
                setTimeout(typeCommand, typingSpeed);
            }
        }
        
        setTimeout(typeCommand, 1000);
    }
});

// Digital Clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    const day = now.getDate();
    const monthNames = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    const dateString = `${day} de ${month} de ${year}`;
    
    const clockDisplay = document.getElementById('digital-clock');
    const dateDisplay = document.getElementById('digital-date');
    
    if (clockDisplay) {
        clockDisplay.textContent = timeString;
    }
    if (dateDisplay) {
        dateDisplay.textContent = dateString;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setInterval(updateClock, 1000);

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Show/hide back to top button on scroll
    window.addEventListener('scroll', function() {
        const clock = document.querySelector('.cyber-clock');
        if (backToTopBtn) {
            const scrolled = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.body.scrollHeight;
            const nearTop = scrolled > 200;
            const nearBottom = scrolled + windowHeight >= documentHeight - 100; // 100px threshold

            if (nearTop) {
                backToTopBtn.style.display = 'flex';
                if (nearBottom && clock) {
                    clock.classList.add('moved');
                } else if (clock) {
                    clock.classList.remove('moved');
                }
            } else {
                backToTopBtn.style.display = 'none';
                if (clock) clock.classList.remove('moved');
            }
        }
    });
});

// Particle effect for background (to be implemented in particles.js)
// This would create floating binary code or network nodes in the background

