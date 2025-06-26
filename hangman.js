"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // ==== Sélections ====
    const elements = {
        zoneWord: document.querySelector(".zone-word"),
        zoneGuess: document.querySelector(".zone-guess"),
        inputLetter: document.querySelector("#letter"),
        btnCheckLetter: document.querySelector(".btn-check"),
        btnReplay: document.querySelector(".btn-reset"),
        zoneChosenLetter: document.querySelector(".zone-chosen-letter"),
        zoneCanvas: document.querySelector(".zone-canvas"),
    };
    // ==== Variables ====
    const listWord = ["car", "jazz", "loin", "proche", "bruit", "voix", "noeud", "taupe", "animal", "menthe", "billard", "exemple", "drapeau", "paranoia", "symptome", "accordeon", "bouillotte", "labyrinthe", "abracadabra"];
    // ==== Dessin du pendu (IA) ====
    // Obtenir le contexte de dessin du canvas
    const canvasContext = elements.zoneCanvas.getContext('2d');
    if (!canvasContext) {
        throw new Error("Impossible de récupérer le contexte de dessin du canvas.");
    }
    // ==== Class constructor ====
    class Hangman {
        wordToGuess;
        guessedLetters;
        maxIncorrectGuesses;
        incorrectGuesses;
        canvasContext;
        // listWord[Math.floor(Math.random()*listWord.length)];
        constructor(wordToGuess, canvasContext, maxIncorrectGuesses = 10) {
            this.wordToGuess = wordToGuess.toLowerCase();
            this.guessedLetters = [];
            this.maxIncorrectGuesses = maxIncorrectGuesses;
            this.incorrectGuesses = 0;
            this.canvasContext = canvasContext;
            this.clearCanvas();
        }
        ;
        guessLetter(letter) {
            letter = letter.toLowerCase();
            if (!this.wordToGuess.includes(letter)) {
                this.incorrectGuesses++;
                this.drawHangman(); // Dessiner le pendu
                return false;
            }
            else {
                if (!this.guessedLetters.includes(letter)) {
                    this.guessedLetters.push(letter);
                }
                return true;
            }
            ;
        }
        ;
        isGameLost() {
            return this.incorrectGuesses >= this.maxIncorrectGuesses;
        }
        ;
        getWordDisplay() {
            return this.wordToGuess.split("").map(letter => this.guessedLetters.includes(letter) ? letter : "_ ").join("");
        }
        ;
        isGameWon() {
            return this.wordToGuess.split("").every(letter => this.guessedLetters.includes(letter));
        }
        ;
        clearCanvas() {
            this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        }
        drawHangman() {
            const ctx = this.canvasContext;
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            switch (this.incorrectGuesses) {
                case 1: // Base
                    ctx.beginPath();
                    ctx.moveTo(50, 300);
                    ctx.lineTo(250, 300);
                    ctx.stroke();
                    break;
                case 2: // Pilier vertical
                    ctx.beginPath();
                    ctx.moveTo(100, 300);
                    ctx.lineTo(100, 50);
                    ctx.stroke();
                    break;
                case 3: // Poutre horizontale
                    ctx.beginPath();
                    ctx.moveTo(100, 50);
                    ctx.lineTo(200, 50);
                    ctx.stroke();
                    break;
                case 4: // Corde
                    ctx.beginPath();
                    ctx.moveTo(200, 50);
                    ctx.lineTo(200, 80);
                    ctx.stroke();
                    break;
                case 5: // Tête
                    ctx.beginPath();
                    ctx.arc(200, 100, 20, 0, Math.PI * 2);
                    ctx.stroke();
                    break;
                case 6: // Corps
                    ctx.beginPath();
                    ctx.moveTo(200, 120);
                    ctx.lineTo(200, 200);
                    ctx.stroke();
                    break;
                case 7: // Bras gauche
                    ctx.beginPath();
                    ctx.moveTo(200, 140);
                    ctx.lineTo(170, 180);
                    ctx.stroke();
                    break;
                case 8: // Bras droit
                    ctx.beginPath();
                    ctx.moveTo(200, 140);
                    ctx.lineTo(230, 180);
                    ctx.stroke();
                    break;
                case 9: // Jambe gauche
                    ctx.beginPath();
                    ctx.moveTo(200, 200);
                    ctx.lineTo(170, 250);
                    ctx.stroke();
                    break;
                case 10:
                    // Jambe droite
                    ctx.beginPath();
                    ctx.moveTo(200, 200);
                    ctx.lineTo(230, 250);
                    ctx.stroke();
                    break;
            }
        }
    }
    // ==== Application ====
    const wordToGuess = listWord[Math.floor(Math.random() * listWord.length)];
    let hangmanGame = new Hangman(wordToGuess, canvasContext);
    elements.zoneWord.innerHTML = hangmanGame.getWordDisplay();
    // ==== Evénements ====
    // ---- Vérifier la lettre ----
    elements.btnCheckLetter?.addEventListener("click", function () {
        const letter = elements.inputLetter.value;
        const result = hangmanGame.guessLetter(letter);
        const letterElement = document.createElement("span");
        letterElement.textContent = letter + ", ";
        letterElement.style.color = result ? "green" : "red";
        elements.zoneChosenLetter.append(letterElement);
        elements.zoneWord.innerHTML = hangmanGame.getWordDisplay();
        if (hangmanGame.isGameLost()) {
            const elementMessage = document.createElement("span");
            elementMessage.style.color = "red";
            elementMessage.textContent = `Vous avez perdu la partie.`;
            elements.zoneGuess.append(elementMessage);
            elements.btnCheckLetter.setAttribute("disabled", "true");
        }
        if (hangmanGame.isGameWon()) {
            const elementMessage = document.createElement("span");
            elementMessage.style.color = "green";
            elementMessage.textContent = `Vous avez gagné la partie.`;
            elements.zoneGuess.append(elementMessage);
            elements.btnCheckLetter.setAttribute("disabled", "true");
        }
        elements.inputLetter.value = "";
        elements.inputLetter.focus();
    });
    // ---- Rejouer ----
    elements.btnReplay.addEventListener("click", function () {
        const wordToGuess = listWord[Math.floor(Math.random() * listWord.length)];
        hangmanGame = new Hangman(wordToGuess, canvasContext);
        elements.zoneWord.innerHTML = hangmanGame.getWordDisplay();
        elements.inputLetter.value = "";
        elements.zoneGuess.innerHTML = "";
        elements.zoneChosenLetter.innerHTML = "";
        elements.btnCheckLetter.removeAttribute("disabled");
        elements.inputLetter.focus();
        // Effacer le canvas
        canvasContext.clearRect(0, 0, elements.zoneCanvas.width, elements.zoneCanvas.height);
    });
});
