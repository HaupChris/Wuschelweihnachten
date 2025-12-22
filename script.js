// Christmas Gift Website JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const audioModal = document.getElementById('audio-modal');
    const mainContent = document.getElementById('main-content');
    const startButton = document.getElementById('start-experience');
    const christmasMusic = document.getElementById('christmas-music');

    const cardItem = document.getElementById('card');
    const giftDinner = document.getElementById('gift-dinner');
    const giftConcert = document.getElementById('gift-concert');

    const cardModal = document.getElementById('card-modal');
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
        audioModal.style.display = 'none';
        mainContent.classList.remove('hidden');

        // Try to play music (may be blocked by browser autoplay policy)
        playMusic();

        // Create snowfall effect
        createSnowfall();
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
            snowflake.style.fontSize = (Math.random() * 10 + 8) + 'px';
            snowflake.style.opacity = Math.random() * 0.6 + 0.4;
            snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
            snowflake.style.animationDelay = Math.random() * 2 + 's';

            snowfallContainer.appendChild(snowflake);

            // Remove snowflake after animation
            setTimeout(() => {
                snowflake.remove();
            }, 12000);
        }

        // Create initial snowflakes
        for (let i = 0; i < 20; i++) {
            setTimeout(createSnowflake, i * 200);
        }

        // Continue creating snowflakes
        setInterval(createSnowflake, 400);
    }

    // Open Modal Function
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close Modal Function
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Card Click - Open and Stream Text
    cardItem.addEventListener('click', () => {
        openModal(cardModal);
        streamText(cardText, cardMessage);
    });

    // Gift Dinner Click
    giftDinner.addEventListener('click', () => {
        openModal(dinnerModal);
        animateGiftReveal(dinnerModal);
    });

    // Gift Concert Click
    giftConcert.addEventListener('click', () => {
        openModal(concertModal);
        animateGiftReveal(concertModal);
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
                const speed = Math.random() * 30 + 20;
                setTimeout(typeChar, speed);
            } else {
                // Remove cursor after typing is done
                setTimeout(() => {
                    cursor.remove();
                }, 2000);
            }
        }

        // Start typing with a small delay
        setTimeout(typeChar, 500);
    }

    // Animate Gift Reveal
    function animateGiftReveal(modal) {
        const icon = modal.querySelector('.gift-icon');
        const title = modal.querySelector('h2');
        const description = modal.querySelector('.gift-description');
        const imagePlaceholder = modal.querySelector('.gift-image-placeholder');

        // Reset and animate elements
        const elements = [icon, title, description, imagePlaceholder];
        elements.forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    el.style.transition = 'all 0.5s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 200 + index * 200);
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
                cardText.innerHTML = '';
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
                    cardText.innerHTML = '';
                }
            }
        });
    });

    // Prevent scrolling when modal is open
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.gift-modal.active').forEach(modal => {
                closeModal(modal);
                if (modal === cardModal) {
                    cardText.innerHTML = '';
                }
            });
        }
    });

    // Add touch feedback for mobile
    document.querySelectorAll('.clickable-item').forEach(item => {
        item.addEventListener('touchstart', () => {
            item.style.transform = 'scale(1.05)';
        });

        item.addEventListener('touchend', () => {
            item.style.transform = '';
        });
    });
});
