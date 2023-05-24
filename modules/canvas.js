let canvasElement = document.getElementById('canvas');
let canvasContext = canvasElement.getContext("2d");
let gameScreen = document.getElementById("game-over-screen");

// Creo un oggetto che ospita il canvas, il context e anche la schermata di game over
let canvas = {
	canvasElement,
	canvasContext,
	gameScreen,
}

function clearCanvas() {
	// A ogni frame, puliamo il canvas per poter disegnare nuovamente gli elementi
	canvas.canvasContext.clearRect(
		0, 0, 
		canvas.canvasElement.width, canvas.canvasElement.height
	);
}

// Funzione per resettare la schermata di game over
function resetGameScreen() {
	gameScreen.innerHTML = "";
	gameScreen.style.display = 'none';
}

// Funzione per mostrare la schermata di game over
function showGameOver(winner) {
	canvas.gameScreen.style.display = 'flex';
	if(winner){
		// Se il giocatore ha vinto...
		canvas.gameScreen.innerHTML += "<h2>You won!</h2>";
	} else {
		// Se il giocatore ha perso...
		canvas.gameScreen.innerHTML = "<p>Game over</p>";
	}
	canvas.gameScreen.innerHTML += "<p>Press R to restart</p>";
}

export {canvas, resetGameScreen, clearCanvas, showGameOver}