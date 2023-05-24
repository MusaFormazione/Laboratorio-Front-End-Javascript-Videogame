// Tutti i mattoni hanno una larghezza e un'altezza che imposto qui
let brickWidth = 50;
let brickHeight = 10;
// Metteremo i mattoni in questo array
let bricks = [];

function renderBricks(context) {
	// Disegno ogni mattone presente nell'array
	bricks.forEach((brick) => {
		renderBrick(context, brick);
	})
}

function renderBrick(context, brick){
	// Il disegno è molto semplice: imposto il colore e creo un rettangolo sfruttando la posizione e le dimensioni
		context.fillStyle = brick.color;
		context.fillRect(brick.xPosition,brick.yPosition,brickWidth,brickHeight);
}

function createBricks(colors){
	// Per caricare i mattoni, svouto l'array e imposto la posizione di partenza
	bricks = [];
  let xPosition = 50;
  let yPosition = 50;
	// Quanti mattoni metto su una riga?
	let bricksPerRow = 6;

  colors.forEach(color => {
		// Per ogni colore, creo una riga di mattoni
		for(let i = 0; i < bricksPerRow; i++) {
			// Aggiungo il mattone all'array
			bricks.push({xPosition, yPosition, color});
			// Sposto la posizione x per fare spazio al mattone successivo
			xPosition += brickWidth + 1;
		}
		// Ok, ora possiamo preparare una nuova riga di mattoni!
		// Torno al punto x di partenza...
		xPosition = 50;
		// ...E mi sposto più sotto per disegnare una nuova riga di mattoni
		yPosition += brickHeight + 1;
  })
}

function removeBrick(pos) {
	// Quando la pallina colpisce un mattone nell'array, individuo la sua posizione e lo elimino dall'array
	bricks.splice(pos, 1)
}

// Funzione per accedere alle informazioni sui mattoncini
function getBricksInfo() {
	// ritorniamo un oggetto che contiene l'array di mattoncini, la larghezza e l'altezza di ogni mattoncino
	return {bricks, brickWidth, brickHeight};
}

export {createBricks, renderBricks, bricks, getBricksInfo, removeBrick}