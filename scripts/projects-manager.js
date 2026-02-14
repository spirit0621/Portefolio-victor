// Données initiales (si localStorage est vide)
const defaultProjects = [];

// Ajout d'une propriété link par défaut si elle n'existe pas
defaultProjects.forEach(p => p.link = p.link || '#');

// Clé localStorage
const STORAGE_KEY = 'portfolio_projects_v1';

// État de l'application
let projects = [];

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    renderProjects();
    setupEventListeners();
});

// Charger les projets depuis le stockage ou utiliser les défauts
function loadProjects() {
    const storedProjects = localStorage.getItem(STORAGE_KEY);
    if (storedProjects) {
        projects = JSON.parse(storedProjects);
    } else {
        projects = [...defaultProjects];
        saveProjects();
    }
}

// Sauvegarder dans localStorage
function saveProjects() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    renderProjects();
}

// Afficher les projets dans la grille
function renderProjects() {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    grid.innerHTML = ''; // Vider la grille

    projects.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });
}

// Créer le HTML d'une carte projet
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" onerror="this.src='https://placehold.co/600x400?text=No+Image'">
        </div>
        <div class="project-info">
            <h3>${project.title}</h3>
            <p class="project-category">${project.category}</p>
            <p>${project.description}</p>
            <div class="project-actions">
                <button class="btn-edit" onclick="openEditModal(${project.id})">Modifier</button>
                <button class="btn-delete" onclick="deleteProject(${project.id})">Supprimer</button>
            </div>
            </div>
            ${getLinkHtml(project)}
        </div>
    `;
    return card;
}

// Générer le bouton approprié selon le type de lien
function getLinkHtml(project) {
    const link = project.link || '#';

    // Cas 1 : Lien vide ou par défaut
    if (!link || link === '#') {
        return `<span class="project-link disabled" style="opacity:0.5; cursor:not-allowed;">Pas de lien</span>`;
    }

    // Cas 2 : Fichier stocké (Data URL)
    if (link.startsWith('data:')) {
        // On essaie de deviner l'extension ou le nom
        const isImage = link.startsWith('data:image');
        const isPdf = link.indexOf('pdf') !== -1;
        const ext = isImage ? 'jpg' : (isPdf ? 'pdf' : 'file');
        const fileName = `projet-${project.id}.${ext}`;

        return `<a href="${link}" download="${fileName}" class="project-link">📥 Télécharger/Voir fichier</a>`;
    }

    // Cas 3 : Lien externe normal
    return `<a href="${link}" target="_blank" rel="noopener noreferrer" class="project-link">Voir le projet →</a>`;
}

// Ouvrir le modal en mode AJOUT
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Ajouter un projet';
    document.getElementById('projectId').value = '';
    document.getElementById('projectForm').reset();
    resetDropZone();
    document.getElementById('projectModal').style.display = 'flex';
}

// Ouvrir le modal en mode ÉDITION
window.openEditModal = function (id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    document.getElementById('modalTitle').textContent = 'Modifier le projet';
    document.getElementById('projectId').value = project.id;
    document.getElementById('title').value = project.title;
    document.getElementById('category').value = project.category;
    document.getElementById('description').value = project.description;

    // Pour l'image, on garde l'URL actuelle
    // (Dans un vrai système, on gérerait l'upload)
    // IMAGE: Soit URL, soit Base64
    const imageField = document.getElementById('image');
    imageField.value = project.image;

    // Prévisualisation Image
    const preview = document.getElementById('imagePreview');
    if (project.image && project.image.startsWith('data:image')) {
        preview.src = project.image;
        preview.style.display = 'block';
    } else if (project.image) {
        preview.src = project.image;
        preview.style.display = 'block';
    } else {
        preview.style.display = 'none';
        preview.src = '';
    }

    // LIEN SCANS
    const linkField = document.getElementById('link');
    linkField.value = project.link || '';

    document.getElementById('projectModal').style.display = 'flex';
};

// Fermer le modal
function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Supprimer un projet
window.deleteProject = function (id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
        projects = projects.filter(p => p.id !== id);
        saveProjects();
    }
};

// Configurer les écouteurs d'événements
function setupEventListeners() {
    // Bouton Ajouter
    const addBtn = document.getElementById('addProjectBtn');
    if (addBtn) addBtn.addEventListener('click', openAddModal);

    // Bouton Fermer Modal
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Clic en dehors du modal pour fermer
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('projectModal');
        if (e.target === modal) closeModal();
    });

    // --- GESTION DRAG & DROP : IMAGE ---
    setupDragAndDrop('dropZone', 'fileInput', (file, base64) => {
        if (!file.type.startsWith('image/')) {
            alert('Veuillez sélectionner une image pour ce champ.');
            return false;
        }
        document.getElementById('image').value = base64;
        const p = document.getElementById('imagePreview');
        p.src = base64;
        p.style.display = 'block';
        return true;
    });

    // Fonction générique Drag & Drop
    function setupDragAndDrop(zoneId, inputId, callback) {
        const zone = document.getElementById(zoneId);
        const input = document.getElementById(inputId);

        if (!zone || !input) return;

        zone.addEventListener('click', () => input.click());

        input.addEventListener('change', (e) => {
            if (e.target.files.length) processFile(e.target.files[0]);
        });

        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('dragover');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('dragover');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('dragover');
            if (e.dataTransfer.files.length) processFile(e.dataTransfer.files[0]);
        });

        function processFile(file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('Fichier trop volumineux (Max 5MB).');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                if (callback(file, e.target.result)) {
                    // Succès
                }
            };
            reader.readAsDataURL(file);
        }
    }

    // Soumission du formulaire
    const form = document.getElementById('projectForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const id = document.getElementById('projectId').value;
            const title = document.getElementById('title').value;
            const category = document.getElementById('category').value;
            const description = document.getElementById('description').value;
            let image = document.getElementById('image').value;

            // Image par défaut si vide
            if (!image) image = 'https://placehold.co/600x400?text=Projet';

            if (id) {
                // Modification
                const index = projects.findIndex(p => p.id === parseInt(id));
                if (index !== -1) {
                    projects[index] = {
                        ...projects[index],
                        title,
                        category,
                        description,
                        image,
                        link: document.getElementById('link').value || '#'
                    };
                }
            } else {
                // Ajout
                const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
                projects.push({
                    id: newId,
                    title,
                    category,
                    description,
                    image,
                    link: document.getElementById('link').value || '#'
                });
            }

            saveProjects();
            closeModal();
        });
    }
}

// Réinitialiser la zone de drop (image vide)
function resetDropZone() {
    const preview = document.getElementById('imagePreview');
    if (preview) {
        preview.src = '';
        preview.style.display = 'none';
    }
}
