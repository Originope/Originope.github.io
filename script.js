/* Steins;Gate Themed JavaScript */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all effects
    initDivergenceMeter();
    initTypingEffect();
    initScrollEffects();
    initCRTEffects();
    initEasterEggs();
    
});

// Divergence Meter - displays random worldline
function initDivergenceMeter() {
    const header = document.querySelector('header');
    
    // Create divergence meter element
    const meterDiv = document.createElement('div');
    meterDiv.className = 'divergence-meter';
    meterDiv.id = 'divergence-meter';
    
    // Generate random divergence number
    function generateDivergence() {
        const number = (Math.random() * 2).toFixed(6);
        return number;
    }
    
    // Update meter with animation
    function updateMeter() {
        const current = generateDivergence();
        meterDiv.textContent = current;
        
        // Add glitch effect
        meterDiv.style.animation = 'none';
        setTimeout(() => {
            meterDiv.style.animation = 'glitch 0.3s ease-in-out';
        }, 10);
    }
    
    // Initial update
    updateMeter();
    
    // Insert after title
    const title = header.querySelector('h1');
    if (title && title.nextSibling) {
        header.insertBefore(meterDiv, title.nextSibling);
    } else if (title) {
        header.appendChild(meterDiv);
    }
    
    // Update every 5 seconds
    setInterval(updateMeter, 5000);
}

// Typing effect for page title
function initTypingEffect() {
    const title = document.querySelector('h1');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.visibility = 'visible';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after a brief delay
    setTimeout(typeWriter, 500);
}

// Scroll-based effects
function initScrollEffects() {
    const sections = document.querySelectorAll('hr');
    
    function checkScroll() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.9;
            
            if (isVisible) {
                section.style.opacity = '1';
                section.style.transform = 'scaleX(1)';
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Initialize hr elements
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'scaleX(0)';
        section.style.transition = 'all 0.8s ease-out';
    });
}

// CRT screen effects
function initCRTEffects() {
    // Random screen glitch
    function randomGlitch() {
        const body = document.body;
        body.style.animation = 'glitch 0.2s ease-in-out';
        
        setTimeout(() => {
            body.style.animation = '';
        }, 200);
        
        // Random interval between 10-30 seconds
        const nextGlitch = Math.random() * 20000 + 10000;
        setTimeout(randomGlitch, nextGlitch);
    }
    
    // Start glitch effect
    setTimeout(randomGlitch, 15000);
    
    // Mouse trail effect
    let trail = [];
    const maxTrail = 5;
    
    document.addEventListener('mousemove', function(e) {
        trail.push({x: e.clientX, y: e.clientY});
        
        if (trail.length > maxTrail) {
            trail.shift();
        }
    });
}

// Easter eggs and interactive elements
function initEasterEggs() {
    // Konami code Easter egg
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            activateElPsyKongroo();
            konamiCode = [];
        }
    });
    
    // "El Psy Kongroo" activation
    function activateElPsyKongroo() {
        const body = document.body;
        
        // Create message overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Orbitron', sans-serif;
            font-size: 3em;
            color: #ff6b35;
            text-shadow: 0 0 20px rgba(255, 107, 53, 0.8);
            z-index: 10000;
            pointer-events: none;
            animation: fade-in-out 3s ease-in-out;
        `;
        overlay.textContent = 'El Psy Kongroo';
        
        // Add fade animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fade-in-out {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
            }
        `;
        document.head.appendChild(style);
        
        body.appendChild(overlay);
        
        // Remove after animation
        setTimeout(() => {
            overlay.remove();
            style.remove();
        }, 3000);
        
        // Intense screen glitch
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                body.style.animation = 'glitch 0.1s ease-in-out';
                setTimeout(() => {
                    body.style.animation = '';
                }, 100);
            }, i * 200);
        }
    }
    
    // Double-click on logo for special effect
    const logos = document.querySelectorAll('img[src*="logo"]');
    logos.forEach(logo => {
        logo.addEventListener('dblclick', function() {
            this.style.animation = 'glitch 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
    
    // Click counter on divergence meter
    let clickCount = 0;
    const meter = document.getElementById('divergence-meter');
    
    if (meter) {
        meter.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 1) {
                this.textContent = '1.048596'; // Steins Gate worldline
                this.style.color = '#00ff41';
                this.style.textShadow = '0 0 20px rgba(0, 255, 65, 0.8)';
            } else if (clickCount === 2) {
                this.textContent = '0.000000'; // Alpha worldline
                this.style.color = '#ff6b35';
                this.style.textShadow = '0 0 20px rgba(255, 107, 53, 0.8)';
            } else {
                // Reset
                clickCount = 0;
                this.style.color = '#e63946';
                this.style.textShadow = '0 0 10px rgba(230, 57, 70, 0.8)';
                const number = (Math.random() * 2).toFixed(6);
                this.textContent = number;
            }
        });
        
        meter.style.cursor = 'pointer';
        meter.title = 'Click to change worldline';
    }
}

// Add terminal box styling to resource sections
function enhanceResourceBoxes() {
    const resourceParagraphs = document.querySelectorAll('body > p');
    
    resourceParagraphs.forEach(p => {
        if (p.textContent.includes('Additional resources:')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'terminal-box';
            p.parentNode.insertBefore(wrapper, p);
            
            // Move elements into wrapper
            wrapper.appendChild(p);
            let nextEl = wrapper.nextElementSibling;
            
            while (nextEl && nextEl.tagName === 'LI') {
                const temp = nextEl.nextElementSibling;
                wrapper.appendChild(nextEl);
                nextEl = temp;
            }
        }
    });
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading screen
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0e1a;
        z-index: 99999;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Orbitron', sans-serif;
        font-size: 2em;
        color: #00ff41;
        text-shadow: 0 0 20px rgba(0, 255, 65, 0.8);
        transition: opacity 0.5s ease-out;
    `;
    loader.innerHTML = `
        <div>
            <div>LOADING...</div>
            <div style="font-size: 0.5em; margin-top: 20px; text-align: center;">
                El Psy Kongroo
            </div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});

// Console Easter egg
console.log('%cEl Psy Kongroo', 'font-size: 30px; color: #ff6b35; text-shadow: 0 0 10px rgba(255, 107, 53, 0.8); font-family: Orbitron;');
console.log('%cOrganization detected. Divergence meter active.', 'font-size: 14px; color: #00ff41; font-family: Share Tech Mono;');
console.log('%cTip: Try the Konami code (↑↑↓↓←→←→BA)', 'font-size: 12px; color: #66ff88;');
