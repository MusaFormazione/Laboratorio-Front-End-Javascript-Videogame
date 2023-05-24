// Utilizzando i moduli, possiamo mantenere questo file molto pulito.
import {createKeyboardControls} from './modules/keyboard.js'
import {init} from './modules/game.js';

// Inizializziamo i controlli della tastiera per muovere la racchetta del giocatore
createKeyboardControls();

// Inizializziamo il gioco!
init();
