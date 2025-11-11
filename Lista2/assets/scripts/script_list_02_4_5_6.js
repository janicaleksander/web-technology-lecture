"use strict";

const info = document.getElementById("info");

// --- 1. Ruch myszy ---
document.addEventListener("mousemove", (event) => {
    info.textContent =
        `Ruch myszy:
clientX=${event.clientX}, clientY=${event.clientY},
screenX=${event.screenX}, screenY=${event.screenY},
Alt=${event.altKey}, Ctrl=${event.ctrlKey}, Shift=${event.shiftKey}`;
});

// --- 2. Klikanie tylko w górnej części (info) ---
info.addEventListener("mousedown", (event) => {
    info.textContent = `Kliknięto w górnej części!
clientX=${event.clientX}, clientY=${event.clientY},
Alt=${event.altKey}, Ctrl=${event.ctrlKey}, Shift=${event.shiftKey}`;
});

// --- 3. Reakcja na najechanie/opuszczenie strony ---
document.addEventListener("mouseover", () => {
    info.style.backgroundColor = "lightyellow";
    info.textContent = "Kursor jest nad stroną!";
});

document.addEventListener("mouseout", () => {
    info.style.backgroundColor = "";
    info.textContent = "Kursor opuścił obszar strony!";
});

// --- 4. Wciśnięcie klawisza ---
document.addEventListener("keydown", (event) => {
    info.textContent = `Naciśnięto klawisz o kodzie: ${event.keyCode}`;
});

// --- 5. Formularz ---
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const helpText = document.getElementById("helpText");
const form = document.getElementById("contactForm");

nameInput.addEventListener("focus", () => {
    helpText.textContent = "Wpisz swoje imię – minimum 2 znaki.";
});
nameInput.addEventListener("blur", () => {
    helpText.textContent = "";
});

emailInput.addEventListener("focus", () => {
    helpText.textContent = "Podaj prawidłowy adres e-mail.";
});
emailInput.addEventListener("blur", () => {
    helpText.textContent = "";
});

form.addEventListener("submit", (event) => {
    if (!confirm("Czy na pewno chcesz wysłać formularz?")) {
        event.preventDefault();
    }
});

form.addEventListener("reset", (event) => {
    if (!confirm("Czy na pewno chcesz wyczyścić formularz?")) {
        event.preventDefault();
    }
});
