import { db, auth } from './firebase-config.js';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Collection Reference
const projectsCollection = collection(db, "projects");

// State
let projects = [];

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    setupEventListeners();
    
    // Auth Listener to update UI when login state changes
    onAuthStateChanged(auth, (user) => {
        updateAdminUI(user);
    });
});

// Load Projects from Firestore
async function loadProjects() {
    try {
        const q = query(projectsCollection, orderBy("category")); // Fallback sort
        const querySnapshot = await getDocs(q);
        
        projects = [];
        querySnapshot.forEach((doc) => {
            projects.push({ id: doc.id, ...doc.data() });
        });
        
        renderProjects();
    } catch (error) {
        console.error("Error loading projects: ", error);
        renderProjects(); 
    }
}

// Render Projects to Grid
function renderProjects() {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    grid.innerHTML = ''; // Clear grid

    if (projects.length === 0) {
        grid.innerHTML = '<p style="text-align: center; width: 100%;">Aucun projet pour le moment.</p>';
        return;
    }

    projects.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });
    
    // Update UI visibility based on current auth state
    updateAdminUI(auth.currentUser);
}

// Create Project Card HTML
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
            <div class="project-actions admin-only" style="display: none;">
                <button class="cta-button" style="padding: 5px 10px; font-size: 0.8rem; background-color: #f39c12;" onclick="window.prepareEdit('${project.id}')">Modifier</button>
                <button class="cta-button" style="padding: 5px 10px; font-size: 0.8rem; background-color: #e74c3c;" onclick="window.deleteProject('${project.id}')">Supprimer</button>
            </div>
            ${getLinkHtml(project)}
        </div>
    `;
    return card;
}

// Generate Link HTML
function getLinkHtml(project) {
    const link = project.link || '#';
    if (!link || link === '#') {
        return `<span class="project-link disabled" style="opacity:0.5; cursor:not-allowed;">Pas de lien</span>`;
    }
    // Check for Data URL (File)
    if (link.startsWith('data:')) {
        const isImage = link.startsWith('data:image');
        const isPdf = link.indexOf('pdf') !== -1;
        const ext = isImage ? 'jpg' : (isPdf ? 'pdf' : 'file');
        const fileName = `projet-${project.id}.${ext}`;
        return `<a href="${link}" download="${fileName}" class="project-link">📥 Télécharger/Voir fichier</a>`;
    }
    // External Link
    return `<a href="${link}" target="_blank" rel="noopener noreferrer" class="project-link">Voir le projet →</a>`;
}

// Update Admin UI Visibility
function updateAdminUI(user) {
    const adminElements = document.querySelectorAll('.admin-only');
    
    if (user) {
        adminElements.forEach(el => el.style.display = 'block');
    } else {
        adminElements.forEach(el => el.style.display = 'none');
    }
}

// Open Add Modal
function openAddModal() {
    if (!auth.currentUser) return alert("Vous devez être connecté !");
    
    document.getElementById('modalTitle').textContent = 'Ajouter un projet';
    document.getElementById('projectId').value = '';
    document.getElementById('projectForm').reset();
    resetDropZone();
    document.getElementById('projectModal').style.display = 'flex';
}

// Prepare Edit (Exposed to Window for inline onclick)
window.prepareEdit = function (id) {
    if (!auth.currentUser) return;

    const project = projects.find(p => p.id === id);
    if (!project) return;

    document.getElementById('modalTitle').textContent = 'Modifier le projet';
    document.getElementById('projectId').value = project.id; // Firestore ID (string)
    document.getElementById('title').value = project.title;
    document.getElementById('category').value = project.category;
    document.getElementById('description').value = project.description;

    const imageField = document.getElementById('image');
    imageField.value = project.image;

    const preview = document.getElementById('imagePreview');
    if (project.image) {
        preview.src = project.image;
        preview.style.display = 'block';
    } else {
        preview.style.display = 'none';
    }

    const linkField = document.getElementById('link');
    linkField.value = project.link || '';

    document.getElementById('projectModal').style.display = 'flex';
};

// Delete Project (Exposed to Window)
window.deleteProject = async function (id) {
    if (!auth.currentUser) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
        try {
            await deleteDoc(doc(db, "projects", id));
            await loadProjects(); // Reload list
        } catch (e) {
            console.error("Error deleting document: ", e);
            alert("Erreur lors de la suppression.");
        }
    }
};

// Close Modal
function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Setup Event Listeners
function setupEventListeners() {
    const addBtn = document.getElementById('addProjectBtn');
    if (addBtn) addBtn.addEventListener('click', openAddModal);

    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        const modal = document.getElementById('projectModal');
        if (e.target === modal) closeModal();
    });

    // Drag & Drop Logic
    setupDragAndDrop('dropZone', 'fileInput', (file, base64) => {
        if (!file.type.startsWith('image/')) {
            alert('Veuillez sélectionner une image.');
            return false;
        }
        document.getElementById('image').value = base64;
        const p = document.getElementById('imagePreview');
        p.src = base64;
        p.style.display = 'block';
        return true;
    });

    // Form Submit
    const form = document.getElementById('projectForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!auth.currentUser) return alert("Non autorisé.");

            const id = document.getElementById('projectId').value;
            const projectData = {
                title: document.getElementById('title').value,
                category: document.getElementById('category').value,
                description: document.getElementById('description').value,
                image: document.getElementById('image').value || 'https://placehold.co/600x400?text=Projet',
                link: document.getElementById('link').value || '#'
            };

            try {
                if (id) {
                    await updateDoc(doc(db, "projects", id), projectData);
                } else {
                    await addDoc(collection(db, "projects"), projectData);
                }
                closeModal();
                loadProjects(); // Refresh list
            } catch (e) {
                console.error("Error saving document: ", e);
                alert("Erreur lors de la sauvegarde.");
            }
        });
    }
}

// Drag & Drop Helper
function setupDragAndDrop(zoneId, inputId, callback) {
    const zone = document.getElementById(zoneId);
    const input = document.getElementById(inputId);
    if (!zone || !input) return;

    zone.addEventListener('click', () => input.click());
    input.addEventListener('change', (e) => {
        if (e.target.files.length) processFile(e.target.files[0]);
    });
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => { zone.classList.remove('dragover'); });
    zone.addEventListener('drop', (e) => {
        e.preventDefault(); zone.classList.remove('dragover');
        if (e.dataTransfer.files.length) processFile(e.dataTransfer.files[0]);
    });

    function processFile(file) {
        if (file.size > 5 * 1024 * 1024) return alert('Fichier trop volumineux (Max 5MB).');
        const reader = new FileReader();
        reader.onload = (e) => { callback(file, e.target.result); };
        reader.readAsDataURL(file);
    }
}

function resetDropZone() {
    const preview = document.getElementById('imagePreview');
    if (preview) {
        preview.src = '';
        preview.style.display = 'none';
    }
}
