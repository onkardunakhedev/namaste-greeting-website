/**
 * NAMASTE - Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year in Footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. Header Scroll Effect & Mobile Nav
    const header = document.querySelector('.site-header');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile nav when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 3. Interactive Particle Canvas (Golden/Saffron Ambient Glow)
    initParticleCanvas();

    // 4. Web Audio API - Ambient Drone Synth (Peaceful Tanpura / Sacred Frequency)
    initAmbientSound();

    // 5. Mudra Energy Visualizer Pulse
    initMudraPulse();

    // 6. Wisdom & Quotes Generator
    initQuotesEngine();

    // 7. Mindful Breathing Companion
    initBreathingCompanion();

    // 8. E-Card Live Builder
    initECardBuilder();

    // 9. FAQ Accordion
    initFAQAccordion();
});

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* ==========================================================================
   Background Particle Canvas
   ========================================================================== */
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 25), 50);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedY = -(Math.random() * 0.3 + 0.1);
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.alpha = Math.random() * 0.6 + 0.1;
            this.color = Math.random() > 0.5 ? '#ffd700' : '#ff9933';
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            if (this.y < 0) {
                this.y = height;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   Web Audio API Ambient Tone Generator
   ========================================================================== */
function initAmbientSound() {
    const soundBtn = document.getElementById('soundToggleBtn');
    const soundIcon = document.getElementById('soundIcon');
    const soundText = document.getElementById('soundText');

    let audioCtx = null;
    let isPlaying = false;
    let oscillators = [];
    let gainNode = null;

    soundBtn.addEventListener('click', () => {
        if (!isPlaying) {
            startDroneSound();
        } else {
            stopDroneSound();
        }
    });

    function startDroneSound() {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            gainNode = audioCtx.createGain();
            gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 3);
            gainNode.connect(audioCtx.destination);

            // Frequencies inspired by 432Hz harmonic tanpura drone (A = 432Hz, E = 324Hz, C# = 270Hz)
            const freqs = [108, 162, 216, 270, 432];

            oscillators = freqs.map((freq) => {
                const osc = audioCtx.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

                // Slight detune for natural warmth
                osc.detune.setValueAtTime((Math.random() - 0.5) * 8, audioCtx.currentTime);
                
                const oscGain = audioCtx.createGain();
                oscGain.gain.value = 0.2;
                osc.connect(oscGain);
                oscGain.connect(gainNode);

                osc.start();
                return osc;
            });

            isPlaying = true;
            soundIcon.className = 'fa-solid fa-volume-high';
            soundText.textContent = 'Audio Active';
            soundBtn.style.background = 'rgba(255, 215, 0, 0.3)';
            showToast('🎵 Ambient Harmony Tone Playing (432Hz)');

        } catch (e) {
            console.error('Audio initialization failed', e);
            showToast('Audio not supported on this device');
        }
    }

    function stopDroneSound() {
        if (gainNode && audioCtx) {
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
            setTimeout(() => {
                oscillators.forEach(osc => osc.stop());
                audioCtx.close();
                isPlaying = false;
                soundIcon.className = 'fa-solid fa-volume-xmark';
                soundText.textContent = 'Ambient Sound';
                soundBtn.style.background = 'rgba(212, 175, 55, 0.1)';
            }, 1500);
        }
    }
}

/* ==========================================================================
   Mudra Interactive Energy Visualizer
   ========================================================================== */
function initMudraPulse() {
    const triggerBtn = document.getElementById('triggerPulseBtn');
    const pulseStatus = document.getElementById('pulseStatus');
    const handsIcon = document.getElementById('handsIcon');
    const rings = document.querySelectorAll('.energy-ring');

    if (!triggerBtn) return;

    triggerBtn.addEventListener('click', () => {
        handsIcon.classList.add('active-pulse');
        rings.forEach(r => r.classList.add('pulsing'));
        pulseStatus.textContent = '✨ Harmonizing dual energy currents...';

        setTimeout(() => {
            handsIcon.classList.remove('active-pulse');
            rings.forEach(r => r.classList.remove('pulsing'));
            pulseStatus.textContent = 'Click to align energy balance';
            showToast('✨ Anjali Mudra balance achieved!');
        }, 4000);
    });
}

/* ==========================================================================
   Wisdom Quotes Engine
   ========================================================================== */
const quotesData = [
    {
        sanskrit: "ॐ शान्तिः शान्तिः शान्तिः",
        quote: "My soul honors your soul. I honor the place in you where the entire universe resides. I honor the light, love, truth, beauty & peace within you, because it is also within me.",
        author: "— Sacred Vedic Tradition"
    },
    {
        sanskrit: "अयं बन्धुरयं नेति गणना लघुचेतसाम्",
        quote: "This person is mine and that person is a stranger is the calculation of narrow minds. For noble hearts, the world is one single family.",
        author: "— Maha Upanishad (Vasudhaiva Kutumbakam)"
    },
    {
        sanskrit: "नमो नमस्तेऽस्तु सहस्रकृत्वः",
        quote: "Salutations unto you a thousand times, and again and yet again salutations. I bow to the infinite presence within all living entities.",
        author: "— Bhagavad Gita"
    },
    {
        sanskrit: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः",
        quote: "May all beings be happy, may all beings be healthy, may all see what is good, and may no one suffer.",
        author: "— Ancient Peace Prayer"
    },
    {
        sanskrit: "अहिंसा परमो धर्मः",
        quote: "Non-violence and reverence for all living beings is the supreme truth and universal dharma.",
        author: "— Classical Wisdom"
    }
];

function initQuotesEngine() {
    let currentIndex = 0;

    const sanskritEl = document.getElementById('wisdomSanskrit');
    const quoteEl = document.getElementById('quoteText');
    const authorEl = document.getElementById('quoteAuthor');
    const prevBtn = document.getElementById('prevQuoteBtn');
    const nextBtn = document.getElementById('nextQuoteBtn');
    const copyBtn = document.getElementById('copyQuoteBtn');

    function updateQuote(index) {
        const item = quotesData[index];
        sanskritEl.textContent = item.sanskrit;
        quoteEl.textContent = `"${item.quote}"`;
        authorEl.textContent = item.author;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + quotesData.length) % quotesData.length;
            updateQuote(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % quotesData.length;
            updateQuote(currentIndex);
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = `${quotesData[currentIndex].quote} ${quotesData[currentIndex].author}`;
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast('📋 Quote copied to clipboard!');
            });
        });
    }
}

/* ==========================================================================
   Mindful Breathing Companion
   ========================================================================== */
function initBreathingCompanion() {
    const breathCircle = document.getElementById('breathCircle');
    const breathText = document.getElementById('breathText');
    const breathTimer = document.getElementById('breathTimer');
    const startBtn = document.getElementById('startBreathBtn');
    const stopBtn = document.getElementById('stopBreathBtn');
    const completedCyclesEl = document.getElementById('completedCycles');

    if (!startBtn) return;

    let breathInterval = null;
    let timerInterval = null;
    let isRunning = false;
    let cycleCount = 0;

    startBtn.addEventListener('click', startBreathing);
    stopBtn.addEventListener('click', stopBreathing);

    function startBreathing() {
        if (isRunning) return;
        isRunning = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        
        runCycle();
    }

    function runCycle() {
        if (!isRunning) return;

        // Inhale (4s)
        breathCircle.className = 'breath-circle expand';
        breathText.textContent = 'Inhale Peace...';
        countdown(4, () => {
            if (!isRunning) return;
            // Hold (4s)
            breathCircle.className = 'breath-circle hold';
            breathText.textContent = 'Hold & Center...';
            countdown(4, () => {
                if (!isRunning) return;
                // Exhale (4s)
                breathCircle.className = 'breath-circle shrink';
                breathText.textContent = 'Exhale Tension...';
                countdown(4, () => {
                    if (!isRunning) return;
                    cycleCount++;
                    completedCyclesEl.textContent = cycleCount;
                    runCycle();
                });
            });
        });
    }

    function countdown(seconds, callback) {
        let left = seconds;
        breathTimer.textContent = left.toString().padStart(2, '0');
        
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            left--;
            if (left >= 0) {
                breathTimer.textContent = left.toString().padStart(2, '0');
            }
            if (left <= 0) {
                clearInterval(timerInterval);
                if (callback) callback();
            }
        }, 1000);
    }

    function stopBreathing() {
        isRunning = false;
        clearInterval(timerInterval);
        startBtn.disabled = false;
        stopBtn.disabled = true;
        breathCircle.className = 'breath-circle';
        breathText.textContent = 'Paused';
        breathTimer.textContent = '04';
        showToast('🧘 Breathing session paused');
    }
}

/* ==========================================================================
   Interactive E-Card Builder
   ========================================================================== */
function initECardBuilder() {
    const inputRecipient = document.getElementById('cardRecipient');
    const inputMessage = document.getElementById('cardMessage');
    const inputSender = document.getElementById('cardSender');

    const previewRecipient = document.getElementById('previewRecipient');
    const previewMessage = document.getElementById('previewMessage');
    const previewSender = document.getElementById('previewSender');

    const cardDisplay = document.getElementById('namasteCardDisplay');
    const themeBtns = document.querySelectorAll('.theme-btn');
    const copyCardBtn = document.getElementById('copyCardTextBtn');

    if (!inputRecipient) return;

    inputRecipient.addEventListener('input', (e) => {
        previewRecipient.textContent = e.target.value || 'Dear Friend';
    });

    inputMessage.addEventListener('input', (e) => {
        previewMessage.textContent = e.target.value || 'Wishing you light and peace.';
    });

    inputSender.addEventListener('input', (e) => {
        previewSender.textContent = e.target.value || 'With warmth';
    });

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const theme = btn.dataset.theme;
            cardDisplay.className = `namaste-card-display theme-${theme}`;
        });
    });

    if (copyCardBtn) {
        copyCardBtn.addEventListener('click', () => {
            const cardText = `नमस्ते\n\nTo: ${previewRecipient.textContent}\n\n"${previewMessage.textContent}"\n\n${previewSender.textContent}\n\n(Sent with Namaste Peace & Unity)`;
            navigator.clipboard.writeText(cardText).then(() => {
                showToast('✨ Namaste E-Card text copied to clipboard!');
            });
        });
    }
}

/* ==========================================================================
   FAQ Accordion Logic
   ========================================================================== */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other accordion items
            faqItems.forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}
