// Sélection des éléments
const ecran = document.querySelector('.Affichage p');
const divHistorique = document.querySelector('.historique');
const boutons = document.querySelectorAll('input[type="button"]');
const boutonAnnuler = document.querySelector('.annuler'); 

let calcul = "";
let historiqueArr = []; // Tableau pour stocker les calculs passés

// Fonction de formatage (limite décimales)
function formaterResultat(nombre) {
    return parseFloat(nombre.toFixed(15));
}

// Fonction pour mettre à jour l'écran et l'historique
function mettreAJourEcran() {
    ecran.innerText = calcul === "" ? "0" : calcul;
    
    // Mise à jour visuelle de l'historique (3 derniers éléments)
    // On prend les 3 derniers et on les joint avec des sauts de ligne
    divHistorique.innerHTML = historiqueArr.slice(-3).join('<br>');
}

// Ajouter un calcul terminé à l'historique
function ajouterHistorique(expression, resultat) {
    // Ex: "5 + 5 = 10"
    historiqueArr.push(`${expression} = ${resultat}`);
    // On garde l'historique propre (max 10 en mémoire)
    if (historiqueArr.length > 10) historiqueArr.shift();
}

boutons.forEach(bouton => {
    bouton.addEventListener('click', (e) => {
        const valeur = e.target.value;
        const classe = e.target.className;

        // Reset (AC)
        if (classe.includes('annuler')) { 
            calcul = "";
            mettreAJourEcran(); // Note: on n'efface pas forcément l'historique ici, choix UX
            return; 
        }

        // Egal (=)
        if (classe.includes('egale')) {
            calculerResultat();
            return;
        }

        // Effacer (Retour arrière)
        if (classe.includes('effacer')) {
            calcul = calcul.slice(0, -1);
            mettreAJourEcran();
            return;
        }

        // --- NOUVELLES FONCTIONS ---

        // Racine carrée (√)
        if (classe.includes('racine')) {
            // Ajoute 'sqrt(' visuellement. L'utilisateur doit taper le nombre ensuite.
            calcul += "√("; 
            mettreAJourEcran();
            return;
        }

        // Inverse (1/x)
        if (classe.includes('inverse')) {
            calcul += "1/(";
            mettreAJourEcran();
            return;
        }

        // Changement de signe (+/-)
        if (classe.includes('signe')) {
            if (calcul === "") return;
            // On enveloppe tout le calcul actuel dans -(...)
            calcul = `-(${calcul})`;
            mettreAJourEcran();
            return;
        }

        // Carré (x²) - Modification pour permettre de continuer le calcul
        if (classe.includes('caree')) {
            calcul += "**2"; // Notation JS pour la puissance
            mettreAJourEcran();
            return;
        }
        
        // Pourcentage (%)
        if (classe.includes('pourcentage')) {
            calcul += "/100";
            mettreAJourEcran();
            return;
        }

        // Gestion standard (chiffres, parenthèses, opérations)
        // Empêcher d'écrire des opérateurs au début
        if (calcul === "" && ['+', '×', '÷', '=', ')'].includes(valeur)) return; 
        
        calcul += valeur;
        mettreAJourEcran();
    });
});

boutonAnnuler.addEventListener('click', () => {
    calcul = "";
    mettreAJourEcran();
});

function calculerResultat() {
    try {
        const expressionOriginale = calcul; // On garde une copie pour l'historique
        
        // Conversion pour JS
        let expressionMathematique = calcul
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/√/g, 'Math.sqrt'); // Remplace le symbole racine par la fonction JS

        // Gestion des parenthèses non fermées (optionnel mais sympa)
        // Si l'utilisateur ouvre une parenthèse sans la fermer, eval() plantera.
        // On pourrait compter les '(' et ajouter des ')' à la fin, mais laissons JS gérer l'erreur pour l'instant.

        let resultat = eval(expressionMathematique);

        if (!isFinite(resultat) || isNaN(resultat)) {
            ecran.innerText = "Erreur";
            calcul = "";
        } else {
            resultat = formaterResultat(resultat);
            
            // AJOUT À L'HISTORIQUE
            ajouterHistorique(expressionOriginale, resultat);
            
            ecran.innerText = resultat;
            calcul = resultat.toString();
            mettreAJourEcran(); // Pour afficher l'historique mis à jour
        }
    } catch (error) {
        ecran.innerText = "Erreur";
        calcul = "";
    }
}

// --- GESTION DU MODE SOMBRE / CLAIR ---
const toggleSwitch = document.querySelector('#theme-toggle');

// Écoute le changement d'état du switch
toggleSwitch.addEventListener('change', function(e) {
    if (e.target.checked) {
        // Active le mode clair
        document.body.classList.add('light-mode');
    } else {
        // Désactive (revient au mode sombre par défaut)
        document.body.classList.remove('light-mode');
    }
});

// Ajoutez ceci à la fin de votre script.js

document.addEventListener('keydown', (event) => {
    const touche = event.key;

    // Mapping des touches vers les valeurs
    if (/[0-9]/.test(touche)) {
        // Simule un clic sur le bouton correspondant (si besoin) ou appelle la fonction
        // Ici on réutilise la logique existante en modifiant la variable calcul
        calcul += touche;
        mettreAJourEcran();
    } else if (['+', '-', '*', '/'].includes(touche)) {
        // Gestion des opérateurs (attention au "/" qui peut déclencher la recherche rapide du navigateur)
        event.preventDefault(); 
        const operateur = touche === '*' ? '×' : (touche === '/' ? '÷' : touche);
        calcul += operateur;
        mettreAJourEcran();
    } else if (touche === 'Enter') {
        event.preventDefault(); // Empêcher de valider un formulaire
        calculerResultat();
    } else if (touche === 'Backspace') {
        calcul = calcul.slice(0, -1);
        mettreAJourEcran();
    } else if (touche === 'Escape') {
        calcul = "";
        mettreAJourEcran();
    } else if (touche === '.') {
         calcul += ".";
         mettreAJourEcran();
    }
});