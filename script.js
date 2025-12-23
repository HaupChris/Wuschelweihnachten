// Christmas Gift Website JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const audioModal = document.getElementById('audio-modal');
    const mainContent = document.getElementById('main-content');
    const startButton = document.getElementById('start-experience');
    const christmasMusic = document.getElementById('christmas-music');

    const cardItem = document.getElementById('card');
    const giftSport = document.getElementById('gift-sport');
    const giftDinner = document.getElementById('gift-dinner');
    const giftConcert = document.getElementById('gift-concert');

    const cardModal = document.getElementById('card-modal');
    const sportModal = document.getElementById('sport-modal');
    const dinnerModal = document.getElementById('dinner-modal');
    const concertModal = document.getElementById('concert-modal');

    const cardText = document.getElementById('card-text');

    // Card message - Replace this with your personal message
    const cardMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

    // Start Experience Button Click
    startButton.addEventListener('click', () => {
        // Fade out the modal
        audioModal.style.transition = 'opacity 0.5s ease';
        audioModal.style.opacity = '0';

        setTimeout(() => {
            audioModal.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '0';
            mainContent.style.transition = 'opacity 0.8s ease';

            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 50);

            // Try to play music
            playMusic();

            // Create snowfall effect
            createSnowfall();
        }, 500);
    });

    // Play Music Function
    function playMusic() {
        christmasMusic.volume = 0.5;
        const playPromise = christmasMusic.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Autoplay was prevented. User interaction needed.');
                // Add click listener to start music on first interaction
                document.addEventListener('click', () => {
                    christmasMusic.play().catch(e => console.log('Still cannot play:', e));
                }, { once: true });
            });
        }
    }

    // Create Snowfall Effect
    function createSnowfall() {
        const snowfallContainer = document.getElementById('snowfall');
        const snowflakes = ['❄', '❅', '❆', '✦', '✧', '•'];

        function createSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
            snowflake.style.left = Math.random() * 100 + 'vw';
            snowflake.style.fontSize = (Math.random() * 12 + 8) + 'px';
            snowflake.style.opacity = Math.random() * 0.5 + 0.3;
            snowflake.style.animationDuration = (Math.random() * 6 + 6) + 's';
            snowflake.style.animationDelay = Math.random() * 2 + 's';

            snowfallContainer.appendChild(snowflake);

            // Remove snowflake after animation
            setTimeout(() => {
                snowflake.remove();
            }, 14000);
        }

        // Create initial snowflakes
        for (let i = 0; i < 25; i++) {
            setTimeout(createSnowflake, i * 150);
        }

        // Continue creating snowflakes
        setInterval(createSnowflake, 350);
    }

    // Open Modal Function with animation
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close Modal Function
    function closeModal(modal) {
        const content = modal.querySelector('.gift-modal-content');
        content.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        content.style.transform = 'translateY(30px) scale(0.95)';
        content.style.opacity = '0';

        setTimeout(() => {
            modal.classList.remove('active');
            content.style.transform = '';
            content.style.opacity = '';
            document.body.style.overflow = '';
        }, 300);
    }

    // Card Click - Open and Stream Text
    cardItem.addEventListener('click', () => {
        openModal(cardModal);
        streamText(cardText, cardMessage);
    });

    // Gift Sport Click
    giftSport.addEventListener('click', () => {
        openModal(sportModal);
        animateSportReveal(sportModal);
    });

    // Gift Dinner Click
    giftDinner.addEventListener('click', () => {
        openModal(dinnerModal);
        animateDinnerReveal(dinnerModal);
    });

    // Gift Concert Click
    giftConcert.addEventListener('click', () => {
        openModal(concertModal);
        animateConcertReveal(concertModal);
    });

    // Stream Text Effect (like typing)
    function streamText(element, text) {
        element.innerHTML = '';
        let index = 0;
        const cursor = document.createElement('span');
        cursor.className = 'cursor';

        function typeChar() {
            if (index < text.length) {
                const char = text.charAt(index);
                if (char === '\n') {
                    element.innerHTML += '<br>';
                } else {
                    element.innerHTML += char;
                }
                element.appendChild(cursor);
                index++;

                // Random typing speed for natural effect
                const speed = Math.random() * 25 + 18;
                setTimeout(typeChar, speed);
            } else {
                // Remove cursor after typing is done
                setTimeout(() => {
                    cursor.remove();
                }, 2000);
            }
        }

        // Start typing with a small delay
        setTimeout(typeChar, 600);
    }

    // Animate Sport Modal Reveal
    function animateSportReveal(modal) {
        const badge = modal.querySelector('.sport-badge');
        const title = modal.querySelector('h2');
        const subtitle = modal.querySelector('.sport-subtitle');
        const imageContainer = modal.querySelector('.sport-image-container');
        const details = modal.querySelector('.sport-details');

        const elements = [badge, title, subtitle, imageContainer, details];
        elements.forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(25px)';
                setTimeout(() => {
                    el.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 150 + index * 150);
            }
        });
    }

    // Animate Dinner Modal Reveal (Silver Tray)
    function animateDinnerReveal(modal) {
        const tray = modal.querySelector('.silver-tray');
        const icon = modal.querySelector('.cloche-icon');
        const title = modal.querySelector('h2');
        const imageContainer = modal.querySelector('.dinner-image-container');
        const card = modal.querySelector('.reservation-card');

        // Tray entrance
        if (tray) {
            tray.style.opacity = '0';
            tray.style.transform = 'scale(0.9)';
            setTimeout(() => {
                tray.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                tray.style.opacity = '1';
                tray.style.transform = 'scale(1)';
            }, 100);
        }

        const elements = [icon, title, imageContainer, card];
        elements.forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    el.style.transition = 'all 0.5s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 400 + index * 150);
            }
        });
    }

    // Animate Concert Modal Reveal (Ticket)
    function animateConcertReveal(modal) {
        const ticket = modal.querySelector('.concert-ticket');
        const stub = modal.querySelector('.ticket-stub');
        const header = modal.querySelector('.ticket-header');
        const artist = modal.querySelector('.ticket-artist');
        const imageContainer = modal.querySelector('.ticket-image-container');
        const details = modal.querySelector('.ticket-details');
        const barcode = modal.querySelector('.ticket-barcode');

        // Ticket slide in
        if (ticket) {
            ticket.style.opacity = '0';
            ticket.style.transform = 'translateX(-30px) rotate(-2deg)';
            setTimeout(() => {
                ticket.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                ticket.style.opacity = '1';
                ticket.style.transform = 'translateX(0) rotate(0deg)';
            }, 100);
        }

        const elements = [header, artist, imageContainer, details, barcode];
        elements.forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(15px)';
                setTimeout(() => {
                    el.style.transition = 'all 0.4s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 500 + index * 100);
            }
        });
    }

    // Close Modal Buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.gift-modal');
            closeModal(modal);

            // Reset card text for next time
            if (modal === cardModal) {
                setTimeout(() => {
                    cardText.innerHTML = '';
                }, 300);
            }
        });
    });

    // Close modal on background click
    document.querySelectorAll('.gift-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);

                // Reset card text for next time
                if (modal === cardModal) {
                    setTimeout(() => {
                        cardText.innerHTML = '';
                    }, 300);
                }
            }
        });
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.gift-modal.active').forEach(modal => {
                closeModal(modal);
                if (modal === cardModal) {
                    setTimeout(() => {
                        cardText.innerHTML = '';
                    }, 300);
                }
            });
        }
    });

    // Add touch feedback for mobile
    document.querySelectorAll('.clickable-item').forEach(item => {
        item.addEventListener('touchstart', () => {
            item.style.transform = 'scale(1.08) translateY(-3px)';
        }, { passive: true });

        item.addEventListener('touchend', () => {
            item.style.transform = '';
        }, { passive: true });
    });

    // Prevent context menu on long press (mobile)
    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.clickable-item')) {
            e.preventDefault();
        }
    });
});
