// Queste sono le proprietà della pallina
let ball = {
	xPosition: 0,
	yPosition: 0,
	radius: 0,
	xDirection: 0,
	yDirection: 0,
	color: '',
	speed: 0
}

// Funzione che viene invocata all'avvio del gioco per creare la pallina
function createBall(xPosition,yPosition,radius,color,difficulty) {
	let speed = difficulty * 100;
	/* Siccome non voglio che la direzione della pallina sia uguale in tutte le partite,
	 creo una funzione per generare una direzione random
	*/
	let [xDirection, yDirection] = generateBallDirection(speed);
	ball = {
		xPosition,
		yPosition,
		radius,
		xDirection,
		yDirection,
		color,
		speed
	}
}

function generateBallDirection(speed) {
	// Imposto dei valori per stabilire un range 
	const min = 1.9;
	const max = 2.6;
	// Seleziono un valore all'interno del range
	const randomAngleValue = Math.random() * (max - min + 0.1) + min;
	// La direzione sull'asse x è data dal rapporto tra la velocità e il valore random
	let xDirection = Math.floor(speed / randomAngleValue);
	// Di conseguenza, la direzione y è quello che resta quando sottraggo alla velocità il movimento sull'asse x
	let yDirection = speed - xDirection;
	return [xDirection, yDirection];
}

function moveBall(timePassedSinceLastFrame){
	// Per muovere la pallina, aggiungo alla sua posizione il valore della direzione, moltiplicato per il tempo trascorso dall'ultima animazione
	ball.xPosition += ball.xDirection * timePassedSinceLastFrame;
	ball.yPosition += ball.yDirection * timePassedSinceLastFrame;
}
	
function renderBall(context){
	// Disegno la pallina, impostando colore, posizione, raggio
	context.fillStyle = ball.color;
	context.beginPath();
	context.arc(ball.xPosition,ball.yPosition,ball.radius,0,Math.PI*2);
	context.fill();
}

/* Qui sotto scriviamo due funzioni get e set:
 per accedere alle proprietà della pallina (get)
 e per aggiornare una proprietà (set)
*/ 
function getBallInfo() {
	return ball
}

function setBallInfo(key, val) {
	ball[key] = val
}

export {moveBall, renderBall, createBall, getBallInfo, setBallInfo}