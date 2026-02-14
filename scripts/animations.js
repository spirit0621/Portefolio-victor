/**
 * Gère les animations au scroll pour la page de présentation
 * Utilise IntersectionObserver pour de meilleures performances
 */
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Animation des barres de compétences
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  
  const skillObserverOptions = {
    threshold: 0.2, // Déclenche quand 20% de l'élément est visible
    rootMargin: "0px 0px -50px 0px"
  };
  
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        
        // Petite pause pour effet visuel
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
        
        // On arrête d'observer une fois animé
        observer.unobserve(bar);
      }
    });
  }, skillObserverOptions);
  
  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });
  
  
  // 2. Animation d'apparition des éléments (Fate In Up)
  // On cible les éléments qu'on veut animer
  const fadeElements = document.querySelectorAll('.skill-item, .software-item, .advanced-skill-card');
  
  // On ajoute un style initial pour les préparer à l'animation
  // Note: On le fait en JS pour ne pas cacher le contenu si JS est désactivé
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });
  
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        
        // Délai en cascade basé sur l'index (si possible) ou aléatoire léger
        // Ici on utilise un délai simple
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 100);
        
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(el => {
    fadeObserver.observe(el);
  });
  
});
