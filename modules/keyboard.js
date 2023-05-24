import { movePlayer } from "./player.js";
import { isGameOver, restart } from "./game.js";

// In questo oggetto salviamo lo stato dei due pulsanti che servono a muovere la racchetta
let keyboard = {
	isDKeyPressed: false,
	isAKeyPressed: false
}

// Creiamo i controlli aggiungendo dei listeners
function createKeyboardControls() {
	// Quando l'utente sta premendo un pulsante
	document.addEventListener('keydown', function(e) {
		// Vediamo quale pulsante ha premuto
		if(e.code === 'KeyA'){
			keyboard.isAKeyPressed = true;
		}
		if(e.code === 'KeyD'){
			keyboard.isDKeyPressed = true;
		}
		if(e.code === 'KeyR'){
			// Se è stato premuto "R" e il gioco è finito, inizio una nuova partita
			if(isGameOver()) {
				restart();
			}
		}
	})
	// Quando l'utente rilascia un pulsante
	document.addEventListener('keyup', function(e) {
		if(e.code === 'KeyA'){
			keyboard.isAKeyPressed = false;
		}
		if(e.code === 'KeyD'){
			keyboard.isDKeyPressed = false;
		}
	})
}

// In base allo stato dei pulsanti (premuto oppure no), muoviamo la racchetta del giocatore
function checkKeyboardStatus(timePassedSinceLastFrame){
	if(keyboard.isDKeyPressed){
		// Se il giocatore preme "D", dobbiamo spostarci a destra
		movePlayer('right', 'increment', timePassedSinceLastFrame)
	} else {
		// Se il giocatore ha rilasciato "D", dobbiamo fermarci!
		movePlayer('right', 'decrement', timePassedSinceLastFrame)

	}
	if(keyboard.isAKeyPressed){
		// Se il giocatore preme "A", dobbiamo spostarci a sinistra
		movePlayer('left', 'increment', timePassedSinceLastFrame)
	} else {
		// Se il giocatore ha rilasciato "A", dobbiamo fermarci!
		movePlayer('left', 'decrement', timePassedSinceLastFrame)
	}

}

export {createKeyboardControls, checkKeyboardStatus}