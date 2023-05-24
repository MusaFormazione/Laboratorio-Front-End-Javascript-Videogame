// Informazioni sul giocatore: la velocità di movimento della racchetta (speed), la velocità e direzione (velocity) e altre info su colore, dimensioni e posizione iniziale
let player = {
	speed:350,
	xVelocity: 0,
	color: "MidnightBlue",
	xPosition: 0,
	yPosition: 0,
	width: 0,
	height: 0,
}

// Quando creo un giocatore, imposto la posizione e la dimensione della racchetta
function createPlayer(xPosition,yPosition,width,height) {
	player = {
		...player,
		xPosition,
		yPosition,
		width,
		height
	}
}

// Questa funzione viene invocata quando è stato premuto un pulsante
function movePlayer(direction, amount, timePassedSinceLastFrame) {
	// Facciamo una serie di controlli per vedere se dobbiamo spostarci a destra, sinistra o se dobbiamo fermarci
	if(direction ==='right' && amount === 'increment') {
			player.xVelocity = player.speed;
	}
	if(direction ==='right' && amount === 'decrement') {
		player.xVelocity = 0;
	}
	// Quando vado a sinistra, mi muovo sull'asse x con velocità negativa (devo tornare indietro!)
	if(direction ==='left' && amount === 'increment') {
			player.xVelocity = -player.speed;
	}
	if(direction ==='left' && amount === 'decrement') {
		player.xVelocity = 0;
	}
	// Aggiorniamo la posizione
	player.xPosition+=player.xVelocity * timePassedSinceLastFrame;
}

// Disegno la racchetta
function renderPlayer(context) {
	context.fillStyle = player.color;
	context.fillRect(player.xPosition,player.yPosition,player.width,player.height);
}

// Funzioni getter e setter per ottenere informazioni (get) o aggiornare una proprietà (set)
function getPlayerInfo() {
	return player;
}

function setPlayerInfo(key, val) {
	player[key] = val;
}

export {createPlayer, renderPlayer, movePlayer, getPlayerInfo, setPlayerInfo}