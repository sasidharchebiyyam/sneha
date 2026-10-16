
(() => {
    "use strict";

    const TOTAL_PHOTOS = 35;
    const PHOTO_PREFIX = "sneha";
    const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

    const $ = (id) => document.getElementById(id);
    const photoCache = new Map();

    let noCount = 0;
    let loaderFinished = false;
    let letterStarted = false;
    let heartTimer = null;
    let revealObserver = null;
    let fireworksFrame = null;
    let fireworks = [];
    let ctx = null;
    let canvasWidth = 0;
    let canvasHeight = 0;

    const noMessages = [
        "Mooskoni Yes Nokku 😏❤️",
        "Yadava Extaralu Cheyaku 😂💕",
        "Nokkuatava Ellipona 😤💖"
    ];

    const captions = [
        "మనం ఇద్దరు కాదు ఒక్కరే అని తెలుసుకున్న రోజు",
        "నీ అమాయకాన్ని నేను చూసిన రోజు",
        "భయం భయంతో ఇద్దరు ప్రేమించుకుంటున్న రోజు",
        "పూర్తిగా ప్రపంచాన్ని వదిలేసిన రోజు",
        "చిన్నపిల్లలు ప్రేమించుకుంటున్న రోజులు ✨",
        "నేను అంటే నువ్వు అని నాకు తెలిసిన రోజు 🫶",
        "నువ్వు నేను వేరు కాదు అని మనకు అర్ధం అయిన రోజు💗",
        "నాకంటె నీకు ఎవ్వరు ఎక్కువ కాదు అని నాకు అర్ధమైన రోజు 🌹",
        "నీకంటె అందమైన అమ్మాయిని ఇంకా నేను చూడను అని నాకు అర్ధమైన రోజు 💞",
        "My heart is happiest with you ❤️",
        "The beginning of something beautiful ❤️",
        "One of my favourite moments with you 💕",
        "Your smile makes everything better 🥹",
        "A memory I will always treasure 💖",
        "Every moment with you feels special ✨",
        "My favourite person, always 🫶",
        "A little moment, a lot of love 💗",
        "You make ordinary days extraordinary 🌹",
        "Another reason to love you more 💞",
        "My heart is happiest with you ❤️"
    ];
    

    const loveLetterText = `నీ నవ్వుకు నన్ను బానిసను చేసిన రోజు
    నీ మనసుకు నేను దాసోహమైన రోజు
    
    ప్రియమైన నువ్వు అనే నేనుకి...

ఏం రాయాలో అని ఆలోచిస్తుంటే, నీ గురించి రాయడానికి మాటలు సరిపోవట్లేదు. అదేంటో తెలుసా… నీతో మాట్లాడేటప్పుడు గంటలు నిమిషాల్లా గడిచిపోతాయి, కానీ నీతో మాట్లాడకుండా ఉండే ఒక్క నిమిషం మాత్రం గంటలా అనిపిస్తుంది.

నిజం చెప్పాలంటే, నిన్ను ఇష్టపడటానికి నేను పెద్ద పెద్ద కారణాలు వెతకలేదు. నీ నవ్వు నచ్చింది, నీ మాటలు నచ్చాయి, నువ్వు చిన్న చిన్న విషయాలకి సంతోషపడే విధానం నచ్చింది. అన్నిటికంటే ముఖ్యంగా, నువ్వు నువ్వులా ఉండటం నచ్చింది.

కొంతమంది మన జీవితంలోకి వచ్చి సంతోషాన్ని ఇస్తారు… ఇంకొంతమంది మనం సంతోషంగా ఉండటానికి అసలు కారణమేంటో నేర్పిస్తారు. నువ్వు నాకు రెండో రకం.


నిన్ను చూసిన ప్రతిసారీ ఏదో సినిమా బ్యాక్‌గ్రౌండ్ మ్యూజిక్ వినిపించదు. పూల వర్షాలు కురవవు. గాలి కూడా స్లో మోషన్‌లో వీయదు. కానీ నువ్వు వెళ్లిపోయాక మాత్రం నా మనసులో ఏదో సీన్ రిపీట్ అవుతూనే ఉంటుంది. అదే నీ నవ్వు. అదే నీ మాట. అదే నువ్వు.

ప్రేమంటే రోజూ “I love you” చెప్పడమే అనుకునేవాడిని. కానీ నిన్ను ఇష్టపడ్డాక అర్థమైంది… ప్రేమంటే ఒకరు మాట్లాడుతుంటే వాళ్ల మాటల్లోని సంతోషాన్ని గుర్తించడం. వాళ్లు మౌనంగా ఉంటే ఆ మౌనానికి కారణమేంటో తెలుసుకోవాలనుకోవడం. వాళ్ల రోజు ఎలా గడిచిందో అడగడం. వాళ్లు బాగున్నారని తెలిసినా, ఇంకోసారి “జాగ్రత్త” అని చెప్పాలనిపించడం.

నువ్వు తిన్నావా అని అడిగే ప్రశ్న వెనుక ఆకలి గురించి మాత్రమే కాదు, నీ గురించి ఆలోచించే ఒక మనసు కూడా ఉంటుందని నాకు అర్థమైంది.

నువ్వు బాధలో ఉన్నప్పుడు నీ సమస్యలన్నీ ఒక్క క్షణంలో తీర్చేయగలనని చెప్పను. కానీ ఆ సమస్యల మధ్యలో నువ్వు ఒంటరిగా అనిపించుకోకుండా నీ పక్కన ఉండాలని మాత్రం అనుకుంటాను.

ఎందుకంటే…

నీ సంతోషంలో నవ్వే పెదవిగా మాత్రమే కాదు,
నీ బాధలో ధైర్యం చెప్పే మాటగా కూడా ఉండాలనుంది.
నీ జీవితంలో ఒక అందమైన జ్ఞాపకంగా మాత్రమే కాదు,
నువ్వు అలసిపోయినప్పుడు గుర్తొచ్చే ప్రశాంతతగా ఉండాలనుంది.`;

    // =====================================
    // FLOATING HEART BACKGROUND
    // =====================================

    function buildHeartBackground() {
        const background = $("heartBackground");
        if (!background || background.dataset.built === "true") return;

        background.dataset.built = "true";

        const symbols = ["❤️", "💕", "💖", "💗", "💞", "♡", "✨"];

        for (let i = 0; i < 24; i++) {
            const heart = document.createElement("span");

            heart.className = "bg-love";
            heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDuration = `${10 + Math.random() * 12}s`;
            heart.style.animationDelay = `${-Math.random() * 20}s`;
            heart.style.fontSize = `${15 + Math.random() * 18}px`;

            background.appendChild(heart);
        }
    }

    // =====================================
    // PAGE NAVIGATION
    // =====================================

    function showPage(target, scroll = true) {
        if (!target) {
            console.error("Page element not found. Check index.html IDs.");
            return;
        }

        document.querySelectorAll(".page").forEach((page) => {
            page.classList.remove("active");
            page.hidden = true;
            page.style.display = "none";
        });

        target.hidden = false;
        target.style.removeProperty("display");
        target.classList.add("active");

        if (scroll) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        stopFireworks();

        if (target.id === "memoriesPage") {
            setupScrollReveal();
        }

        if (target.id === "finalePage") {
            startFireworks();
        }

        if (target.id !== "letterPage" && target.id !== "finalePage") {
            stopFloatingHearts();
        }
    }

    // =====================================
    // LOADING SCREEN
    // =====================================

    function startLoading() {
        const bar = $("progressBar");
        const text = $("progressText");
        let progress = 0;

        if (bar) bar.style.width = "0%";
        if (text) text.textContent = "0%";

        const timer = setInterval(() => {
            progress = Math.min(progress + 2, 100);

            if (bar) bar.style.width = `${progress}%`;
            if (text) text.textContent = `${progress}%`;

            if (progress >= 100) {
                clearInterval(timer);
                setTimeout(finishLoading, 350);
            }
        }, 30);
    }

    function finishLoading() {
        if (loaderFinished) return;
        loaderFinished = true;

        const loader = $("loader");

        if (loader) {
            loader.style.transition = "opacity 0.7s ease";
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
                loader.hidden = true;
            }, 750);
        }

        showPage($("openingPage"), false);
    }

    // =====================================
    // PHOTO DETECTION WITH CACHED RESULTS
    // =====================================

    function findPhoto(number) {
        if (photoCache.has(number)) return photoCache.get(number);

        const promise = new Promise((resolve) => {
            let index = 0;

            function tryNext() {
                if (index >= EXTENSIONS.length) {
                    resolve(null);
                    return;
                }

                const path = `${PHOTO_PREFIX}${number}.${EXTENSIONS[index++]}`;
                const image = new Image();

                image.onload = () => resolve(path);
                image.onerror = tryNext;
                image.src = path;
            }

            tryNext();
        });

        photoCache.set(number, promise);
        return promise;
    }

    function createPhoto(number, className, altText) {
        const image = document.createElement("img");

        image.className = className;
        image.alt = altText || `Memory ${number}`;
        image.decoding = "async";
        image.loading = className === "opening-photo" ? "eager" : "lazy";

        findPhoto(number).then((path) => {
            if (path) {
                image.src = path;
            } else {
                image.alt = `Photo ${number} not found. Check the filename and extension.`;
                image.classList.add("photo-missing");
            }
        });

        return image;
    }

    // =====================================
    // OPENING PAGE: MOVING PHOTO WALL
    // =====================================

    function buildOpeningWall() {
        const wall = $("photoWall");
        if (!wall || wall.dataset.built === "true") return;

        wall.dataset.built = "true";
        wall.innerHTML = "";

        for (let row = 0; row < 4; row++) {
            const ribbon = document.createElement("div");
            ribbon.className = "photo-ribbon";

            ribbon.style.animationDuration = `${50 + row * 8}s`;
            ribbon.style.animationDirection = row % 2 === 0 ? "normal" : "reverse";

            // Two copies create a seamless moving strip.
            for (let copy = 0; copy < 2; copy++) {
                for (let number = 1; number <= TOTAL_PHOTOS; number++) {
                    ribbon.appendChild(
                        createPhoto(number, "opening-photo", `Love memory ${number}`)
                    );
                }
            }

            wall.appendChild(ribbon);
        }
    }

    // =====================================
    // MEMORIES: SMALL VERTICAL PHOTOS
    // =====================================

    function buildMemoryGallery() {
        const gallery = $("memoryGallery");
        if (!gallery || gallery.dataset.built === "true") return;

        gallery.dataset.built = "true";
        gallery.innerHTML = "";

        for (let number = 1; number <= TOTAL_PHOTOS; number++) {
            const card = document.createElement("article");
            card.className = "memory-card reveal-ready";
            card.dataset.photoNumber = String(number);

            const image = createPhoto(
                number,
                "memory-photo",
                `Surya and Sneha memory ${number}`
            );

            const caption = document.createElement("p");
            caption.className = "memory-caption";
            caption.textContent = `${number}. ${captions[(number - 1) % captions.length]}`;

            card.append(image, caption);
            gallery.appendChild(card);
        }

        setupScrollReveal();
    }

    // =====================================
    // REVEAL EACH PHOTO + CAPTION ON SCROLL
    // =====================================

    function setupScrollReveal() {
        if (revealObserver) revealObserver.disconnect();

        const cards = document.querySelectorAll(
            "#memoryGallery .memory-card"
        );

        if (!("IntersectionObserver" in window)) {
            cards.forEach((card) => {
                card.classList.add("is-visible");
            });
            return;
        }

        revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: "0px 0px -30px 0px",
                threshold: 0.08
            }
        );

        cards.forEach((card) => revealObserver.observe(card));
    }

    // =====================================
    // FLOATING HEARTS
    // =====================================

    function createFloatingHeart() {
        const heart = document.createElement("span");
        

        heart.className = "floating-heart";
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.left = `${Math.random() * 95}%`;
        heart.style.animationDuration = `${4 + Math.random() * 4}s`;
        heart.style.fontSize = `${17 + Math.random() * 19}px`;

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 8500);
    }

    function startFloatingHearts() {
        if (heartTimer) return;
        createFloatingHeart();
        heartTimer = setInterval(createFloatingHeart, 650);
    }

    function stopFloatingHearts() {
        if (heartTimer) {
            clearInterval(heartTimer);
            heartTimer = null;
        }

        document.querySelectorAll(".floating-heart").forEach((heart) => heart.remove());
    }

    // =====================================
    // MUSIC
    // =====================================

    async function startMusic() {
        const audio = $("backgroundMusic");
        if (!audio) return;

        audio.volume = 0.65;

        try {
            await audio.play();
        } catch (error) {
            console.info("If music doesn't start automatically, use the music button.");
        }

        updateMusicButton();
    }

    async function toggleMusic() {
        const audio = $("backgroundMusic");
        if (!audio) return;

        if (audio.paused) {
            await startMusic();
        } else {
            audio.pause();
            updateMusicButton();
        }
    }

    function updateMusicButton() {
        const button = $("musicButton");
        const audio = $("backgroundMusic");

        if (button && audio) {
            button.textContent = audio.paused ? "🎵 Play Music" : "⏸ Pause Music";
        }
    }

    // =====================================
    // BUTTON FLOW
    // =====================================

    function openMyWish() {
        showPage($("memoriesPage"));
        startMusic();
    }

    function openQuestion() {
        showPage($("questionPage"));
    }

    function handleNoClick() {
        const message = $("noMessage");
        const button = $("noButton");

        if (!message) return;

        if (noCount < noMessages.length) {
            message.textContent = noMessages[noCount];
            noCount++;
        }

        if (noCount >= noMessages.length) {
            if (button) button.disabled = true;

            setTimeout(() => {
                noCount = 0;
                if (button) button.disabled = false;
                message.textContent = "";
                showPage($("openingPage"));
            }, 2200);
        }
    }

    function handleYesClick() {
        showPage($("letterPage"));
        startMusic();
        startFloatingHearts();

        if (!letterStarted) {
            letterStarted = true;
            typeLoveLetter();
        }
    }

    // =====================================
    // TYPEWRITER LETTER
    // =====================================

    function typeLoveLetter() {
        const letter = $("loveLetter");
        if (!letter) return;

        letter.textContent = "";

        let index = 0;
        const speed = 28;

        function typeNext() {
            if (!letter.isConnected) return;

            if (index < loveLetterText.length) {
                letter.textContent += loveLetterText.charAt(index++);
                setTimeout(typeNext, speed);
            }
        }

        typeNext();
    }

    // =====================================
    // FIREWORKS
    // =====================================

    function resizeFireworksCanvas() {
        const canvas = $("fireworksCanvas");
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvasWidth = rect.width;
        canvasHeight = rect.height;
        canvas.width = Math.max(1, Math.floor(canvasWidth * dpr));
        canvas.height = Math.max(1, Math.floor(canvasHeight * dpr));

        ctx = canvas.getContext("2d");

        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createFirework() {
        if (!canvasWidth || !canvasHeight) return;

        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight * 0.65;
        const hue = Math.floor(Math.random() * 360);
        const count = 40 + Math.floor(Math.random() * 20);

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 1 + Math.random() * 3;

            fireworks.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.009 + Math.random() * 0.014,
                hue,
                size: 1.5 + Math.random() * 2
            });
        }
    }

    function animateFireworks() {
        if (!ctx) {
            fireworksFrame = null;
            return;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        for (let i = fireworks.length - 1; i >= 0; i--) {
            const particle = fireworks[i];

            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.025;
            particle.life -= particle.decay;

            if (particle.life <= 0) {
                fireworks.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${particle.hue},100%,70%,${particle.life})`;
            ctx.shadowBlur = 9;
            ctx.shadowColor = `hsl(${particle.hue},100%,65%)`;
            ctx.fill();
        }

        ctx.shadowBlur = 0;

        if (Math.random() < 0.045) createFirework();

        fireworksFrame = requestAnimationFrame(animateFireworks);
    }

    function startFireworks() {
        if (fireworksFrame !== null) return;

        resizeFireworksCanvas();
        createFirework();
        createFirework();
        animateFireworks();
    }

    function stopFireworks() {
        if (fireworksFrame !== null) {
            cancelAnimationFrame(fireworksFrame);
            fireworksFrame = null;
        }

        fireworks = [];

        if (ctx) ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    // =====================================
    // FINALE + RESTART
    // =====================================

    function showFinale() {
        showPage($("finalePage"));
        startFloatingHearts();
        startMusic();
        startFireworks();
    }

    function restartStory() {
        noCount = 0;
        letterStarted = false;

        if ($("noMessage")) $("noMessage").textContent = "";
        if ($("noButton")) $("noButton").disabled = false;
        if ($("loveLetter")) $("loveLetter").textContent = loveLetterText;

        stopFireworks();
        stopFloatingHearts();
        showPage($("openingPage"));
    }

    // =====================================
    // CONNECT BUTTONS
    // =====================================

    function setupButtons() {
        const actions = [
            ["openWishButton", openMyWish],
            ["continueButton", openQuestion],
            ["yesButton", handleYesClick],
            ["noButton", handleNoClick],
            ["finaleButton", showFinale],
            ["musicButton", toggleMusic],
            ["restartButton", restartStory]
        ];

        actions.forEach(([id, action]) => {
            const button = $(id);

            if (button) {
                button.addEventListener("click", action);
            } else {
                console.warn(`Missing button: ${id}`);
            }
        });
    }

    // =====================================
    // INITIALIZE
    // =====================================

    function initialize() {
        buildHeartBackground();
        buildOpeningWall();
        buildMemoryGallery();
        setupButtons();

        const audio = $("backgroundMusic");

        if (audio) {
            audio.addEventListener("play", updateMusicButton);
            audio.addEventListener("pause", updateMusicButton);
        }

        startLoading();

        window.addEventListener("resize", () => {
            if ($("finalePage")?.classList.contains("active")) {
                resizeFireworksCanvas();
            }
        });

        window.anniversaryWebsite = {
            showPage,
            startMusic,
            toggleMusic,
            restartStory
        };
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, { once: true });
    } else {
        initialize();
    }
})();

const loveLetterElement = document.getElementById("loveLetter");

// Save the original letter from your HTML
const originalLoveLetter = loveLetterElement.textContent.trim();

let letterTypingTimer = null;
let letterHasStarted = false;

function startLoveLetterTyping() {
    if (letterHasStarted) return;

    letterHasStarted = true;
    clearTimeout(letterTypingTimer);

    // Clear the letter before typing
    loveLetterElement.textContent = "";

    // Preserve line breaks and paragraph spacing
    loveLetterElement.style.whiteSpace = "pre-wrap";

    let index = 0;

    function typeNextCharacter() {
        if (index < originalLoveLetter.length) {
            loveLetterElement.textContent += originalLoveLetter[index];
            index++;

            // Smooth, romantic typing speed
            letterTypingTimer = setTimeout(typeNextCharacter, 45);
        }
    }

    typeNextCharacter();
}

// Start typing when the letter page becomes visible
const letterPage = document.getElementById("letterPage");

const letterObserver = new MutationObserver(() => {
    if (
        letterPage.classList.contains("active") ||
        letterPage.classList.contains("visible")
    ) {
        startLoveLetterTyping();
    }
});

letterObserver.observe(letterPage, {
    attributes: true,
    attributeFilter: ["class"]
});

// If the letter page is already visible
if (
    letterPage.classList.contains("active") ||
    letterPage.classList.contains("visible")
) {
    startLoveLetterTyping();
}

