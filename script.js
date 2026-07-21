//==============================
// AOS
//==============================

AOS.init({
    duration: 900,
    once: true,
    offset: 80
});

//==============================
// ELEMENTS
//==============================

const body = document.body;
const nav = document.getElementById("navMenu");
const menuBtn = document.getElementById("menuBtn");
const themeBtn = document.getElementById("themeToggle");
const progressBar = document.getElementById("progressBar");

//==============================
// MOBILE MENU
//==============================

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

    body.classList.toggle("menu-open");

    menuBtn.innerHTML = nav.classList.contains("active")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

});

//==============================
// CLOSE MENU
//==============================

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        body.classList.remove("menu-open");

        menuBtn.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    });

});

//==============================
// CLICK OUTSIDE MENU
//==============================

document.addEventListener("click", e => {

    if (
        !nav.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {

        nav.classList.remove("active");

        body.classList.remove("menu-open");

        menuBtn.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    }

});

//==============================
// THEME
//==============================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    body.classList.add("dark");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}

themeBtn.addEventListener("click", () => {

    body.classList.toggle("dark");

    const dark = body.classList.contains("dark");

    localStorage.setItem(
        "theme",
        dark ? "dark" : "light"
    );

    themeBtn.innerHTML = dark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

});

//==============================
// SCROLL PROGRESS
//==============================

window.addEventListener("scroll", () => {

    const winScroll =
        document.documentElement.scrollTop;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (winScroll / height) * 100;

    progressBar.style.width = progress + "%";

});

//==============================
// STICKY HEADER
//==============================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.style.boxShadow =
            "0 12px 30px rgba(0,0,0,.08)";

    } else {

        header.style.boxShadow = "none";

    }

});

//==============================
// ACTIVE NAV
//==============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        if (pageYOffset >= top) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});

//==============================
// SMOOTH BUTTON HOVER
//==============================

document.querySelectorAll(".btn").forEach(btn => {

    btn.addEventListener("mousemove", e => {

        const rect = btn.getBoundingClientRect();

        btn.style.setProperty(
            "--x",
            `${e.clientX - rect.left}px`
        );

        btn.style.setProperty(
            "--y",
            `${e.clientY - rect.top}px`
        );

    });

});

//==============================
// PRELOADER
//==============================

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    preloader.style.opacity = "0";

    preloader.style.pointerEvents = "none";

    setTimeout(() => {

        preloader.remove();

    }, 500);

});

//==============================
// SKILL BAR ANIMATION
//==============================

const skillBars = document.querySelectorAll(".progress-fill");

const skillObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const bar = entry.target;

        bar.style.width = bar.dataset.width + "%";

        skillObserver.unobserve(bar);

    });

}, {
    threshold: .4
});

skillBars.forEach(bar => skillObserver.observe(bar));

//==============================
// HERO COUNTERS
//==============================

const counters = document.querySelectorAll(".hero-stats h2");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        animateCounter(entry.target);

        counterObserver.unobserve(entry.target);

    });

}, {
    threshold: .6
});

counters.forEach(counter => {

    counterObserver.observe(counter);

});

function animateCounter(element) {

    const text = element.innerText;

    const number = parseInt(text.replace(/\D/g, ""));

    const suffix = text.replace(/[0-9]/g, "");

    let current = 0;

    const step = Math.max(1, Math.ceil(number / 80));

    const timer = setInterval(() => {

        current += step;

        if (current >= number) {

            current = number;

            clearInterval(timer);

        }

        element.innerText = current + suffix;

    }, 20);

}

//==============================
// SCROLL TO TOP BUTTON
//==============================

const topBtn = document.createElement("button");

topBtn.innerHTML =
'<i class="fa-solid fa-arrow-up"></i>';

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

Object.assign(topBtn.style, {

    position: "fixed",
    right: "25px",
    bottom: "25px",
    width: "55px",
    height: "55px",
    border: "none",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
    opacity: "0",
    visibility: "hidden",
    transition: ".3s",
    zIndex: "999"

});

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.style.opacity = "1";

        topBtn.style.visibility = "visible";

    } else {

        topBtn.style.opacity = "0";

        topBtn.style.visibility = "hidden";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

//==============================
// ACTIVE NAV STYLE
//==============================

const style = document.createElement("style");

style.innerHTML = `

.nav a.active{

color:var(--primary);

}

.nav a.active::after{

width:100%;

}

#topBtn:hover{

transform:translateY(-6px);

box-shadow:0 12px 25px rgba(37,99,235,.35);

}

`;

document.head.appendChild(style);

//==============================
// CURRENT YEAR
//==============================

const copy = document.querySelector(".copyright");

if(copy){

    copy.innerHTML =
    `© ${new Date().getFullYear()} Charles Spencer | Chartered Accountant | All Rights Reserved.`;

}

//==============================
// SIMPLE PARALLAX
//==============================

const heroImage = document.querySelector(".image-card");

window.addEventListener("scroll", () => {

    if (!heroImage) return;

    heroImage.style.transform =
    `translateY(${window.scrollY * 0.05}px)`;

});

//==============================
// RIPPLE EFFECT
//==============================

document.querySelectorAll(".btn").forEach(btn => {

    btn.addEventListener("click", function(e){

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        ripple.style.left = e.clientX - rect.left + "px";
        ripple.style.top = e.clientY - rect.top + "px";

        ripple.style.position = "absolute";
        ripple.style.width = "15px";
        ripple.style.height = "15px";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255,255,255,.5)";
        ripple.style.transform = "translate(-50%,-50%)";
        ripple.style.animation = "ripple .7s ease-out";

        this.style.position = "relative";
        this.style.overflow = "hidden";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 700);

    });

});

const rippleStyle = document.createElement("style");

rippleStyle.innerHTML = `

@keyframes ripple{

0%{
transform:translate(-50%,-50%) scale(0);
opacity:1;
}

100%{
transform:translate(-50%,-50%) scale(18);
opacity:0;
}

}

`;

document.querySelectorAll("img").forEach(img=>{

img.draggable=false;

});

document.head.appendChild(rippleStyle);