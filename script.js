document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  const landingPage = document.getElementById("landingPage");
  const birthdayExperience = document.getElementById("birthdayExperience");
  const accessForm = document.getElementById("accessForm");
  const loverNameInput = document.getElementById("loverName");
  const hintMessage = document.getElementById("hintMessage");
  const musicToggle = document.getElementById("musicToggle");
  const heartBurstButton = document.getElementById("heartBurstButton");
  const countdownEl = document.getElementById("countdown");
  const typedMessageEl = document.getElementById("typedMessage");
  const confettiLayer = document.getElementById("confettiLayer");
  const balloonLayer = document.getElementById("balloonLayer");
  const petalLayer = document.getElementById("petalLayer");
  const floatingHearts = document.getElementById("floatingHearts");
  const particleCanvas = document.getElementById("particleCanvas");

  const messageText = `Happy Birthday Mine ❤️

Today is a celebration of your beautiful soul, your radiant smile, and the gentle magic you bring into every moment. You are the kind of love that makes life feel softer, brighter, and more meaningful.

Every laugh we share, every memory we make, and every quiet moment together feels like a gift I will always treasure. You are graceful, kind, dazzling, and so deeply loved.

On this special day, I hope your heart is wrapped in joy, your dreams are kissed with success, and your world is filled with the warmth, peace, and beautiful love you so freely give to others.

Thank you for being the wonderful woman you are. Thank you for making my life richer, sweeter, and more beautiful simply by being in it.

I love you more than words can say, today, always, and forever.

Happy Birthday, my love ❤️

Forever Yours,
Eric`;

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      loadingScreen.style.transform = "translateY(-12px)";
      loadingScreen.style.transition = "all 0.6s ease";

      setTimeout(() => {
        loadingScreen.style.display = "none";
        landingPage.style.display = "grid";
        landingPage.style.opacity = "1";
        landingPage.style.transform = "translateY(0)";
      }, 600);
    }, 2200);
  });

  // Access validation.
  accessForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = loverNameInput.value.trim();

    if (nameInput.toLowerCase() === "eric") {
      landingPage.style.opacity = "0";
      landingPage.style.transform = "translateY(-12px)";
      landingPage.style.transition = "all 0.6s ease";

      setTimeout(() => {
        landingPage.style.display = "none";
        birthdayExperience.classList.add("active");
        document.body.classList.add("experience-open");
        createConfetti();
        createBalloons();
        createRosePetals();
        revealOnScroll();
        startTypingEffect();
        startCountdown();
        setTimeout(() => createFloatingHeartsInScene(), 300);
      }, 450);
    } else {
      hintMessage.textContent = "Hint: It's the handsome guy who loves you endlessly ❤️";
      loverNameInput.animate(
        [
          { transform: "translateX(0px)" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(6px)" },
          { transform: "translateX(0px)" },
        ],
        { duration: 300 }
      );
    }
  });

  // Reveal sections as they enter view.
  const revealOnScroll = () => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((element) => observer.observe(element));
  };

  // Floating hearts in the hero background.
  function createFloatingHeartsInScene() {
    const total = 14;
    for (let i = 0; i < total; i += 1) {
      const heart = document.createElement("span");
      heart.className = "float-heart";
      heart.textContent = "♥";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
      heart.style.animationDuration = `${6 + Math.random() * 4}s`;
      floatingHearts.appendChild(heart);
      setTimeout(() => heart.remove(), 12000);
    }
  }

  // Confetti animation.
  function createConfetti() {
    const colors = ["#ff5ea8", "#ffd46b", "#c7a7ff", "#fff"]; 
    for (let i = 0; i < 60; i += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = `${2.4 + Math.random() * 2}s`;
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      confettiLayer.appendChild(piece);
      setTimeout(() => piece.remove(), 5000);
    }
  }

  // Floating balloons.
  function createBalloons() {
    for (let i = 0; i < 6; i += 1) {
      const balloon = document.createElement("span");
      balloon.className = "balloon";
      balloon.style.left = `${8 + Math.random() * 84}%`;
      balloon.style.animationDuration = `${4 + Math.random() * 3}s`;
      balloon.style.opacity = String(0.75 + Math.random() * 0.2);
      balloonLayer.appendChild(balloon);
      setTimeout(() => balloon.remove(), 12000);
    }
  }

  // Falling rose petals.
  function createRosePetals() {
    for (let i = 0; i < 24; i += 1) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.animationDuration = `${4 + Math.random() * 4}s`;
      petal.style.opacity = String(0.7 + Math.random() * 0.2);
      petalLayer.appendChild(petal);
      setTimeout(() => petal.remove(), 9000);
    }
  }

  // Message reveal without layout shifting.
  function startTypingEffect() {
    if (!typedMessageEl) return;
    typedMessageEl.textContent = messageText;
  }

  // Countdown to the day you met.
  function startCountdown() {
    if (!countdownEl) return;

    const startDate = new Date(Date.UTC(2026, 0, 10, 0, 0, 0));

    const updateCountdown = () => {
      const now = new Date();
      const elapsedMs = Math.max(0, now.getTime() - startDate.getTime());

      const totalSeconds = Math.floor(elapsedMs / 1000);
      const years = Math.floor(totalSeconds / (365 * 24 * 60 * 60));
      const remainingAfterYears = totalSeconds % (365 * 24 * 60 * 60);
      const months = Math.floor(remainingAfterYears / (30 * 24 * 60 * 60));
      const remainingAfterMonths = remainingAfterYears % (30 * 24 * 60 * 60);
      const days = Math.floor(remainingAfterMonths / (24 * 60 * 60));
      const remainingAfterDays = remainingAfterMonths % (24 * 60 * 60);
      const hours = Math.floor(remainingAfterDays / (60 * 60));
      const remainingAfterHours = remainingAfterDays % (60 * 60);
      const minutes = Math.floor(remainingAfterHours / 60);
      const seconds = remainingAfterHours % 60;

      countdownEl.innerHTML = `
        <div class="countdown-item"><strong>${years}</strong><span>Years</span></div>
        <div class="countdown-item"><strong>${months}</strong><span>Months</span></div>
        <div class="countdown-item"><strong>${days}</strong><span>Days</span></div>
        <div class="countdown-item"><strong>${hours}</strong><span>Hours</span></div>
        <div class="countdown-item"><strong>${minutes}</strong><span>Minutes</span></div>
        <div class="countdown-item"><strong>${seconds}</strong><span>Seconds</span></div>
      `;
    };

    updateCountdown();
    const countdownTimer = window.setInterval(updateCountdown, 1000);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        updateCountdown();
      }
    });

    return countdownTimer;
  }

  // Interactive heart button.
  const triggerHeartBurst = (clientX, clientY) => {
    const x = clientX ?? heartBurstButton.getBoundingClientRect().left + heartBurstButton.offsetWidth / 2;
    const y = clientY ?? heartBurstButton.getBoundingClientRect().top + heartBurstButton.offsetHeight / 2;

    for (let i = 0; i < 14; i += 1) {
      const heart = document.createElement("span");
      heart.className = "heart-burst";
      heart.textContent = "♥";
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.setProperty("--x", `${(Math.random() - 0.5) * 180}px`);
      heart.style.setProperty("--y", `${-140 - Math.random() * 100}px`);
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1500);
    }
  };

  heartBurstButton.addEventListener("click", (event) => {
    triggerHeartBurst(event.clientX, event.clientY);
  });

  heartBurstButton.addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      const touch = event.touches[0];
      if (touch) {
        triggerHeartBurst(touch.clientX, touch.clientY);
      }
    },
    { passive: false }
  );

  // Background music using the uploaded audio file.
  let audioElement;
  let isMusicPlaying = false;

  function stopMusic() {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }

    isMusicPlaying = false;
    musicToggle.textContent = "▶ Play Those Eyes";
  }

  function startMusic() {
    if (!audioElement) {
      audioElement = new Audio("New_West_-_Those_Eyes_CeeNaija.com_.mp3");
      audioElement.loop = true;
    }

    audioElement.play().then(() => {
      isMusicPlaying = true;
      musicToggle.textContent = "⏸ Pause Those Eyes";
    }).catch(() => {
      musicToggle.textContent = "▶ Play Those Eyes";
    });
  }

  musicToggle.addEventListener("click", () => {
    if (isMusicPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  });

  // Subtle parallax movement.
  const parallaxItems = document.querySelectorAll(".hero-section, .message-section, .gallery-section");
  const updateParallax = () => {
    const scrollY = window.scrollY;
    parallaxItems.forEach((item, index) => {
      item.style.setProperty("--parallax-offset", `${scrollY * (0.02 + index * 0.01)}px`);
      item.style.transform = `translateY(var(--parallax-offset))`;
    });
  };

  window.addEventListener("scroll", updateParallax);
  updateParallax();

  // Simple particle background.
  const ctx = particleCanvas.getContext("2d");
  let width = 0;
  let height = 0;
  const particles = [];

  const resizeCanvas = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    particleCanvas.width = width;
    particleCanvas.height = height;
    particles.length = 0;
    const count = Math.min(80, Math.floor(width / 18));
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        speedY: Math.random() * 0.4 + 0.1,
        speedX: Math.random() * 0.4 - 0.2,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }
  };

  const renderParticles = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((particle) => {
      particle.y -= particle.speedY;
      particle.x += particle.speedX;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${particle.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(renderParticles);
  };

  resizeCanvas();
  renderParticles();
  window.addEventListener("resize", resizeCanvas);
});
