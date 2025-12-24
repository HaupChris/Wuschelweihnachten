// Christmas Gift Website JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // ====================
    // STATE MANAGEMENT
    // ====================
    const STATE_KEY = 'weihnachten_state';

    // Load state from localStorage
    function loadState() {
        try {
            const saved = localStorage.getItem(STATE_KEY);
            return saved ? JSON.parse(saved) : {
                cardOpened: false,
                giftsOpened: { sport: false, dinner: false, concert: false },
                easterEggsFound: []
            };
        } catch (e) {
            return {
                cardOpened: false,
                giftsOpened: { sport: false, dinner: false, concert: false },
                easterEggsFound: []
            };
        }
    }

    // Save state to localStorage
    function saveState() {
        try {
            localStorage.setItem(STATE_KEY, JSON.stringify(state));
        } catch (e) {
            console.log('Could not save state');
        }
    }

    const state = loadState();

    // ====================
    // ELEMENTS
    // ====================
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
    const cardMessage = `Liiieeebeee Julesia :)

    Es ist so weit!
    Weihnachten ist da,
    das Christkind freut -
    sich über die Maßen dir tolle Geschenke zu bringen.

    Und die erste Überraschung: Das Christkind bin ich!

    Der Haubatz.

    Zwar nicht in Persona, aber dafür ganz im Informatiker Style.

    Also lass uns beginnen, es ist Zeit für die Bescherung!

    Das erste und größte Geschenk? Das bist du! Bzw. ich... also WIR.

    Es ist nämlich so, dass es einfach immer schöner wird. Mit dir. Mit uns. Und deswegen können wir
    uns auch uns immer wieder gegenseitig schenken und es ist jedes mal wieder toll.

    Und wie machen wir das?

    Schaus dir am besten selbst an, was ich (also der Haubolaus) mir da so überlegt habe :)


    Bevor du das machst, hab ich noch ein paar Worte für dich:

    Ich bin unendlich froh, dass du stets an meiner Seite bist. Ich danke dir von ganzem Herzen für den Support, den du mir jeden Tag entgegen bringst.
    Ich weiß, dass ich mich voll und ganz auf dich verlassen kann und du kannst dich auch immer auf mich verlassen.
    Genauso danke ich dir für deine Leichtigkeit, die dazu führt, dass du zu fast jeder Zeit ein Lachen parat hast - und wenn es gerade nicht da ist, hab ich wirklich wenig Mühe es zu dir zurück zu bringen.

    Dankbar bin ich auch noch dafür, dass du so eine kluge und clevere Wuschlerin bist. Dein Interesse immer wieder neue Dinge zu entdecken und zu lernen, inspiriert mich jedes mal aufs neue und die Bücher die du kaufst werd ich weiterhin gern lesen.

    Hoffentlich haben wir noch ganz oft Lust uns uns gegenseitig wieder zu schenken!

    Ich freu mich auf dich!


    Und nun ist es Zeit für die Bescherung!

    Dein Haubi

    PS.: Drei Geschenke liegen unterm Baum! Gibts noch mehr?


   `;

    // ====================
    // INITIALIZE STATE ON LOAD
    // ====================
    function initializeOpenedStates() {
        // Card
        if (state.cardOpened) {
            cardItem.classList.add('opened');
        }

        // Gifts
        if (state.giftsOpened.sport) {
            giftSport.classList.add('opened');
        }
        if (state.giftsOpened.dinner) {
            giftDinner.classList.add('opened');
        }
        if (state.giftsOpened.concert) {
            giftConcert.classList.add('opened');
        }

        // Easter Eggs
        state.easterEggsFound.forEach(eggNum => {
            const egg = document.querySelector(`[data-easter="${eggNum}"]`);
            if (egg) {
                egg.classList.add('found');
            }
        });
    }

    // ====================
    // START EXPERIENCE
    // ====================
    startButton.addEventListener('click', () => {
        audioModal.style.transition = 'opacity 0.5s ease';
        audioModal.style.opacity = '0';

        setTimeout(() => {
            audioModal.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '0';
            mainContent.style.transition = 'opacity 0.8s ease';

            setTimeout(() => {
                mainContent.style.opacity = '1';
                // Initialize opened states after content is visible
                initializeOpenedStates();
            }, 50);

            playMusic();
            createSnowfall();
        }, 500);
    });

    // ====================
    // MUSIC
    // ====================
    function playMusic() {
        christmasMusic.volume = 0.5;
        const playPromise = christmasMusic.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Autoplay was prevented.');
                document.addEventListener('click', () => {
                    christmasMusic.play().catch(e => console.log('Still cannot play:', e));
                }, { once: true });
            });
        }
    }

    // ====================
    // SNOWFALL
    // ====================
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

            setTimeout(() => {
                snowflake.remove();
            }, 14000);
        }

        for (let i = 0; i < 25; i++) {
            setTimeout(createSnowflake, i * 150);
        }

        setInterval(createSnowflake, 350);
    }

    // ====================
    // MODAL FUNCTIONS
    // ====================
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

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

    // ====================
    // CARD HANDLER
    // ====================
    cardItem.addEventListener('click', () => {
        openModal(cardModal);

        if (!state.cardOpened) {
            // First time opening - stream the text
            streamText(cardText, cardMessage);
            state.cardOpened = true;
            cardItem.classList.add('opened');
            saveState();
        } else {
            // Already opened - show full text immediately
            showFullText(cardText, cardMessage);
        }
    });

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

                const speed = Math.random() * 25 + 18;
                setTimeout(typeChar, speed);
            } else {
                setTimeout(() => {
                    cursor.remove();
                }, 2000);
            }
        }

        setTimeout(typeChar, 600);
    }

    function showFullText(element, text) {
        element.innerHTML = text.replace(/\n/g, '<br>');
    }

    // ====================
    // GIFT HANDLERS
    // ====================
    giftSport.addEventListener('click', () => {
        openModal(sportModal);
        animateSportReveal(sportModal);

        if (!state.giftsOpened.sport) {
            state.giftsOpened.sport = true;
            giftSport.classList.add('opened');
            saveState();
        }
    });

    giftDinner.addEventListener('click', () => {
        openModal(dinnerModal);
        animateDinnerReveal(dinnerModal);

        if (!state.giftsOpened.dinner) {
            state.giftsOpened.dinner = true;
            giftDinner.classList.add('opened');
            saveState();
        }
    });

    giftConcert.addEventListener('click', () => {
        openModal(concertModal);
        animateConcertReveal(concertModal);

        if (!state.giftsOpened.concert) {
            state.giftsOpened.concert = true;
            giftConcert.classList.add('opened');
            saveState();
        }
    });

    // ====================
    // ANIMATION FUNCTIONS
    // ====================
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

    function animateDinnerReveal(modal) {
        const tray = modal.querySelector('.silver-tray');
        const icon = modal.querySelector('.cloche-icon');
        const title = modal.querySelector('h2');
        const imageContainer = modal.querySelector('.dinner-image-container');
        const card = modal.querySelector('.reservation-card');

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

    function animateConcertReveal(modal) {
        const ticket = modal.querySelector('.concert-ticket');
        const header = modal.querySelector('.ticket-header');
        const artist = modal.querySelector('.ticket-artist');
        const imageContainer = modal.querySelector('.ticket-image-container');
        const details = modal.querySelector('.ticket-details');
        const barcode = modal.querySelector('.ticket-barcode');

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

    // ====================
    // CLOSE MODAL HANDLERS
    // ====================
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.gift-modal');
            closeModal(modal);
        });
    });

    document.querySelectorAll('.gift-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.gift-modal.active').forEach(modal => {
                closeModal(modal);
            });
        }
    });

    // ====================
    // TOUCH FEEDBACK
    // ====================
    document.querySelectorAll('.clickable-item').forEach(item => {
        item.addEventListener('touchstart', () => {
            item.style.transform = 'scale(1.08) translateY(-3px)';
        }, { passive: true });

        item.addEventListener('touchend', () => {
            item.style.transform = '';
        }, { passive: true });
    });

    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.clickable-item') || e.target.closest('.easter-egg')) {
            e.preventDefault();
        }
    });

    // ====================
    // EASTER EGGS
    // ====================
    const easterEggModal = document.getElementById('easter-egg-modal');
    const easterEggNumber = document.getElementById('ee-number');
    const easterEggImage = document.getElementById('ee-image');

    function handleEasterEggClick(e) {
        const easterEgg = e.target.closest('.easter-egg');
        if (!easterEgg) return;

        const eggNumber = easterEgg.dataset.easter;
        if (!eggNumber) return;

        // Update modal content
        easterEggNumber.textContent = eggNumber;
        easterEggImage.src = `assets/images/easter-eggs/${eggNumber}.jpg`;

        easterEggImage.onerror = function() {
            this.src = `assets/images/easter-eggs/${eggNumber}.png`;
            this.onerror = function() {
                this.src = `assets/images/easter-eggs/${eggNumber}.jpeg`;
                this.onerror = function() {
                    this.src = '';
                };
            };
        };

        openModal(easterEggModal);
        animateEasterEggReveal();

        // Mark as found and transform to snowman
        if (!state.easterEggsFound.includes(eggNumber)) {
            state.easterEggsFound.push(eggNumber);
            saveState();
        }

        // Add found class after modal closes
        setTimeout(() => {
            easterEgg.classList.add('found');
        }, 300);
    }

    function animateEasterEggReveal() {
        const header = easterEggModal.querySelector('.easter-egg-header');
        const title = easterEggModal.querySelector('h2');
        const number = easterEggModal.querySelector('.easter-egg-number');
        const imageContainer = easterEggModal.querySelector('.easter-egg-image-container');
        const footer = easterEggModal.querySelector('.ee-footer-decor');

        const elements = [header, title, number, imageContainer, footer];
        elements.forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(15px) scale(0.95)';
                setTimeout(() => {
                    el.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0) scale(1)';
                }, 80 + index * 100);
            }
        });
    }

    document.querySelectorAll('.easter-egg').forEach(egg => {
        egg.addEventListener('click', handleEasterEggClick);
    });

    document.querySelectorAll('.easter-egg').forEach(item => {
        item.addEventListener('touchstart', () => {
            item.style.transform = 'scale(1.15)';
        }, { passive: true });

        item.addEventListener('touchend', () => {
            item.style.transform = '';
        }, { passive: true });
    });
});
