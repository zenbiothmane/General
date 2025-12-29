// On attend que la page soit totalement chargée
window.onload = function() {
    
    console.log("Le script a démarré"); // Regarde dans la console (F12)

    const checkbox = document.getElementById('show-password');
    const passField = document.getElementById('password');

    // Vérification de sécurité
    if (!checkbox || !passField) {
        console.error("ERREUR : Impossible de trouver les éléments ! Vérifie les ID dans le HTML.");
    } else {
        console.log("Éléments trouvés, ajout de l'événement click");
        
        // On écoute le changement
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                passField.type = 'text';
            } else {
                passField.type = 'password';
            }
        });
    }
};


document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Récupération des éléments du DOM ---
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('show-password');
    const submitButton = loginForm.querySelector('button[type="submit"]');

    // --- 2. Fonctionnalité "Voir le mot de passe" ---
    document.addEventListener('DOMContentLoaded', function() {
    
    // 1. On récupère les éléments
    const passwordInput = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('show-password');

    // Vérification de sécurité (regarde ta console F12 si ça ne marche pas)
    if (!passwordInput || !showPasswordCheckbox) {
        console.error("ERREUR : Impossible de trouver les éléments HTML. Vérifie les IDs 'password' et 'show-password'");
        return;
    }

    // 2. On ajoute l'écouteur d'événement
    showPasswordCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Si coché, on montre le texte
            passwordInput.type = 'text';
            console.log("Mot de passe affiché");
        } else {
            // Sinon, on remet en mode mot de passe
            passwordInput.type = 'password';
            console.log("Mot de passe masqué");
        }
    });

    });

    // --- 3. Gestion de la soumission du formulaire ---
    loginForm.addEventListener('submit', function(e) {
        // Empêche le rechargement immédiat de la page
        e.preventDefault();

        // Réinitialiser les styles d'erreur
        resetErrors();

        // Validation simple
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        let isValid = true;

        if (!isValidEmail(emailValue)) {
            showError(emailInput, "Veuillez entrer une adresse email valide.");
            isValid = false;
        }

        if (passwordValue.length < 6) {
            showError(passwordInput, "Le mot de passe doit contenir au moins 6 caractères.");
            isValid = false;
        }

        // Si tout est valide, on simule la connexion
        if (isValid) {
            simulateLogin();
        }
    });

    // --- 4. Fonctions Utilitaires ---

    // Vérification format Email (Regex simple)
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Afficher une erreur visuelle
    function showError(input, message) {
        // Ajoute une classe d'erreur (pour le CSS)
        input.style.borderColor = '#ff4d4d';
        
        // Création dynamique d'un petit message d'erreur sous le champ
        const errorMsg = document.createElement('small');
        errorMsg.innerText = message;
        errorMsg.style.color = '#ff4d4d';
        errorMsg.className = 'error-message';
        
        // Insère le message après le champ input
        input.parentNode.appendChild(errorMsg);
    }

    // Nettoyer les erreurs précédentes
    function resetErrors() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.style.borderColor = '#e2e8f0'); // Retour à la couleur originale
        
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    }

    // Simulation d'appel serveur (Loading)
    function simulateLogin() {
        const originalBtnText = submitButton.innerText;
        
        // État de chargement
        submitButton.disabled = true;
        submitButton.innerText = "Connexion en cours...";
        submitButton.style.opacity = "0.7";
        submitButton.style.cursor = "not-allowed";

        // Simulation d'attente (2 secondes)
        setTimeout(function() {
            // Ici, tu mettrais normalement ton code de redirection ou d'appel API
            alert(`Connexion réussie pour : ${emailInput.value} !`);
            
            // Remise à zéro du bouton (juste pour la démo)
            submitButton.disabled = false;
            submitButton.innerText = originalBtnText;
            submitButton.style.opacity = "1";
            submitButton.style.cursor = "pointer";
            
            // Redirection réelle (exemple) :
            // window.location.href = "/dashboard.html";
            
        }, 1500);
    }
});