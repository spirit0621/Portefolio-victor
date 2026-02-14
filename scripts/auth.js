import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Handle Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Initialisé (redirection ou UI update)
                window.location.href = './projects.html';
            })
            .catch((error) => {
                console.error("Login Error:", error);
                if (errorDiv) {
                    errorDiv.style.display = 'block';
                    errorDiv.textContent = "Erreur : Email ou mot de passe incorrect.";
                }
            });
    });
}

// Handle Auth State & UI
onAuthStateChanged(auth, (user) => {
    const adminToolbar = document.querySelector('.admin-toolbar');
    const adminElements = document.querySelectorAll('.admin-only'); // Generic class for admin elements
    const loginLink = document.getElementById('adminLoginLink'); 

    if (user) {
        // User is signed in
        console.log("Admin connecté:", user.email);
        
        if (adminToolbar) adminToolbar.style.display = 'block';
        adminElements.forEach(el => el.style.display = 'block');

        // Add Logout Button to Nav if not exists
        addLogoutButton();

    } else {
        // User is signed out
        console.log("Visiteur (Non connecté)");

        if (adminToolbar) adminToolbar.style.display = 'none';
        adminElements.forEach(el => el.style.display = 'none');
        
        removeLogoutButton();
    }
});

function addLogoutButton() {
    // Check if button already exists
    if (document.getElementById('logoutBtn')) return;

    // Simplest approach: Add to body or specific container
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logoutBtn';
    logoutBtn.textContent = 'Déconnexion';
    logoutBtn.className = 'cta-button';
    logoutBtn.style.position = 'fixed';
    logoutBtn.style.bottom = '20px';
    logoutBtn.style.right = '20px';
    logoutBtn.style.zIndex = '1000';
    logoutBtn.style.backgroundColor = '#dc3545'; // Red for logout
    
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            alert('Déconnecté avec succès');
            window.location.reload();
        }).catch((error) => {
            console.error('Logout Error:', error);
        });
    });

    document.body.appendChild(logoutBtn);
}

function removeLogoutButton() {
    const btn = document.getElementById('logoutBtn');
    if (btn) btn.remove();
}
