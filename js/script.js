/*
CONSEGNA:
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce. (Per favorire il lavoro vostro e dei tutor mettete inizialmente un timer di 5-10 sec e non 30)
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
*NOTA*: non è importante l'ordine con cui l'utente inserisce i numeri, basta che ne indovini il più possibile.
*/

/*Divisione compito in parti:
1-Generare e mostrare i numeri casuali;
2-Creazione countdown per nascondere i numeri;
3-Creare campi input e ascoltare risposte;
4-Confronto tra risposte e numeri casuali già generati;
5-Riunire tutto in una funzione principale.
*/

/*Variabili globali:*/
let randomNumbers = []; // Array per i numeri casuali
let timer; // Timer per il countdown
let timeLeft = 5; // Tempo in secondi per il countdown (5 secondi per esempio)
let timerRunning = false; // Stato del timer


/*1.1)Funzione per numeri casuali*/
function numeriCasuali(n, min, max){
    const numeri = [];
    while(numeri.length < n){
        const el = Math.floor(Math.random() * (max - min + 1)) + min;
        if(!numeri.includes(el)){
            numeri.push(el);
        }
    }
    return numeri;
}

/*1.2) Visualizzazione dei numeri generati in pagina*/
function visualizzaN(numeri){
    const listaN = document.getElementById("numbers-list");
    listaN.innerHTML = "";
    for(let i = 0; i <numeri.length; i++){
        const n = numeri[i];
        const li = document.createElement("li");
        li.textContent = n;
        listaN.appendChild(li);
    }
}

/*2.1) Countdown per nascondere numeri*/
function countdown(durata, callback){
    let tempoRim = durata;
    const countdownEl = document.getElementById("countdown");
    countdownEl.textContent = tempoRim;
    const int = setInterval(() => {
        tempoRim--;
        countdownEl.textContent = tempoRim;
        if(tempoRim <= 0){
            clearInterval(int);
            callback();
        }
    }, 1000);
}

/*2.2) Callback per nascondere numeri e mostrare modulo*/
function mostraMod(){
    document.getElementById("numbers-list").innerHTML = "I numeri sono stati nascosti! Inizia il gioco!";
    document.getElementById("answers-form").classList.remove("d-none");
}

/*3) Creare campi di input e ascoltare risposte*/
document.getElementById("answers-form").addEventListener("submit", confrontaRisposte);

/*4) Confronto tra risposte e numeri casuali già generati*/
function confrontaRisposte(evento){
    evento.preventDefault();
    const inputs = document.querySelectorAll("#input-group input");
    const risposte = Array.from(inputs).map(input => parseInt(input.value, 10));
    const risposteCorrette = risposte.filter(numero => randomNumbers.includes(numero));
    const message = document.getElementById("message");
    if(risposteCorrette.length > 0)
        message.textContent = `Hai indovinato ${risposteCorrette.length} numero/i: ${risposteCorrette.join(", ")}`;
    else
    message.textContent = "Non hai indovinato nessun numero.";
}

/*5) Inizializza gioco*/
function iniziaGioco(){
    randomNumbers = numeriCasuali(5, 1, 100);
    visualizzaN(randomNumbers);
    countdown(timeLeft, mostraMod);
}

window.onload = function(){
    iniziaGioco();
};