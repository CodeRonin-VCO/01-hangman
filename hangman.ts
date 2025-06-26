// ==== Sélections ====
const elements: Elements = {
    zoneWord: document.querySelector(".zone-word"),
    zoneGuess: document.querySelector(".zone-guess"),
    inputLetter: document.querySelector("#letter"),
    btnCheckLetter: document.querySelector(".btn-check"),
    zoneChosenLetter: document.querySelector(".zone-chosen-letter")
};
// ---- Définition des types pour les éléments ----
type Elements = {
    zoneWord: HTMLElement | null;
    zoneGuess: HTMLElement | null;
    inputLetter: HTMLInputElement | null;
    btnCheckLetter: HTMLElement | null;
    zoneChosenLetter: HTMLElement | null;
};

// ==== Variables ====
const listWord: string[] = ["car", "jazz", "loin", "proche", "bruit", "voix", "noeud", "taupe", "animal", "menthe", "billard", "exemple", "drapeau", "paranoia", "symptome", "accordeon", "bouillotte", "labyrinthe", "abracadabra"];
const listGuessedLetter: string[] = [];

// ==== Class constructor ====
class Hangman {
    private wordToGuess: string;
    private guessedLetters: string[];
    private maxIncorrectGuesses: number;
    private incorrectGuesses: number;

    // listWord[Math.floor(Math.random()*listWord.length)];

    constructor(wordToGuess: string, maxIncorrectGuesses: number = 9) {
        this.wordToGuess           = wordToGuess.toLowerCase();
        this.guessedLetters        = [];
        this.maxIncorrectGuesses   = maxIncorrectGuesses;
        this.incorrectGuesses      = 0
    }
    guessLetter(letter: string): boolean {
        letter = letter.toLowerCase();

        if (!this.wordToGuess.includes(letter)) {
            this.incorrectGuesses++;
            return false;
        } else {
            return true;
        }
    }
    isGameLost(): boolean {
        return this.incorrectGuesses >= this.maxIncorrectGuesses;
    }
    getWordDisplay(): string {
        return this.wordToGuess.split("").map(letter => this.guessedLetters.includes(letter) ? letter : "_").join("");
    }
}

// Exemple d'utilisation
const wordToGuess = listWord[Math.floor(Math.random() * listWord.length)];
const hangmanGame = new Hangman(wordToGuess);