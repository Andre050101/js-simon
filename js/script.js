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

/*2) Countdown per nascondere numeri*/
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