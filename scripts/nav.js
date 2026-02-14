
// Définition de la Navigation et du Footer
// Utilisation de var pour éviter les erreurs si le script est chargé plusieurs fois
var NAVBAR_HTML = `
  <nav class="navbar">
    <div class="nav-container">
      <a href="./index.html" class="nav-logo">Alves Fernandes</a>
      <ul class="nav-menu">
        <li><a href="./index.html" class="nav-link">Accueil</a></li>
        <li><a href="./presentation.html" class="nav-link">Présentation</a></li>
        <li><a href="./projects.html" class="nav-link">Projets</a></li>
        <li><a href="./monitoring.html" class="nav-link">Veille Technologique</a></li>
        <li><a href="./bts-sio.html" class="nav-link">BTS SIO</a></li>
        <li><a href="./contact.html" class="nav-link">Contact</a></li>
      </ul>
    </div>
  </nav>
`;

var FOOTER_HTML = `
  <footer class="footer">
    <div class="container">
      <p>&copy; 2026 Alves Fernandes. Tous droits réservés.</p>
    </div>
  </footer>
`;

// Fonction d'initialisation
function initGlobalElements() {
  console.log("Initialisation des éléments globaux (Nav & Footer)...");

  // 1. Injection de la Navbar
  var headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = NAVBAR_HTML;
    console.log("Navbar injectée dans #header-placeholder");
  } else {
    // Si pas de placeholder, on cherche une navbar existante ou on l'ajoute au début
    var existingNav = document.querySelector('.navbar');
    if (!existingNav) {
      document.body.insertAdjacentHTML('afterbegin', NAVBAR_HTML);
      console.log("Navbar injectée en haut du body (fallback)");
    }
  }

  // 2. Injection du Footer
  var footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = FOOTER_HTML;
    console.log("Footer injecté dans #footer-placeholder");
  } else {
    var existingFooter = document.querySelector('.footer');
    if (!existingFooter) {
      document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
      console.log("Footer injecté en bas du body (fallback)");
    }
  }

  // 3. Gestion de la classe 'active'
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;

    var cleanHref = href.replace('./', '');

    // Cas spécial pour la page d'accueil
    if (currentPage === '' || currentPage === '/') currentPage = 'index.html';

    if (cleanHref === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Exécuter quand le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobalElements);
} else {
  // Si le script est chargé après DOMContentLoaded (async/defer ou fin de body), on lance direct
  initGlobalElements();
}
