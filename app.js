// StudyPro DEV - Main Application JavaScript

class StudyProApp {
    constructor() {
        this.currentUser = null;
        this.userProgress = new Map();
        this.currentSubject = null;
        this.sidebarOpen = false;
        
        // Demo data
        this.users = new Map([
            ['student1', { username: 'student1', password: 'password123' }],
            ['demo', { username: 'demo', password: 'demo' }]
        ]);

        this.syllabus = {
            "12th": {
                "SEM": {
                    "Physics": [
                        {
                            "chapter": "Ch 1: Rotational Dynamics",
                            "tasks": [
                                "Circular Motion (Uniform & Non-uniform)",
                                "Centripetal & Centrifugal forces",
                                "Banking of roads",
                                "Conical pendulum & Vertical circular motion",
                                "Moment of Inertia (Theorems of parallel & perpendicular axes)",
                                "Angular momentum & Torque"
                            ]
                        },
                        {
                            "chapter": "Ch 2: Mechanical Properties of Fluids",
                            "tasks": [
                                "Pressure, Pascal's Law",
                                "Surface Tension & Surface Energy",
                                "Angle of contact & Capillarity",
                                "Viscosity, Stokes' Law, Terminal velocity",
                                "Equation of continuity & Bernoulli's equation"
                            ]
                        },
                        {
                            "chapter": "Ch 3: Kinetic Theory of Gases & Radiation",
                            "tasks": [
                                "Ideal Gas Laws & RMS speed",
                                "Law of equipartition of energy",
                                "Blackbody radiation (Kirchhoff's, Wien's, Stefan-Boltzmann laws)"
                            ]
                        },
                        {
                            "chapter": "Ch 4: Thermodynamics",
                            "tasks": [
                                "Zeroth & First Laws of Thermodynamics",
                                "Thermodynamic processes (Isothermal, Adiabatic, etc.)",
                                "Heat engines & Refrigerators (Carnot cycle)"
                            ]
                        },
                        {
                            "chapter": "Ch 5: Oscillations",
                            "tasks": [
                                "S.H.M. (Differential equation, displacement, velocity, acceleration)",
                                "Energy in S.H.M.",
                                "Simple pendulum",
                                "Damped & Forced oscillations, Resonance"
                            ]
                        },
                        {
                            "chapter": "Ch 6: Superposition of Waves",
                            "tasks": [
                                "Principle of superposition",
                                "Stationary waves",
                                "Vibrations in strings & air columns (pipes)",
                                "Beats"
                            ]
                        },
                        {
                            "chapter": "Ch 8: Electrostatics",
                            "tasks": [
                                "Gauss's Law & its applications",
                                "Electric potential & Potential energy",
                                "Capacitors (Principle, series & parallel combination)"
                            ]
                        },
                        {
                            "chapter": "Ch 9: Current Electricity",
                            "tasks": [
                                "Kirchhoff's Laws",
                                "Wheatstone Bridge",
                                "Potentiometer (Principle & applications)",
                                "Galvanometer (conversion to ammeter & voltmeter)"
                            ]
                        }
                    ],
                    "Information Technology": [
                        {
                            "chapter": "Ch 1: Advanced Web Designing",
                            "tasks": [
                                "HTML5 Form elements & input restrictions",
                                "CSS: Selectors (Id, Class), Positioning, Float property",
                                "Audio, Video & Image Map tags",
                                "iFrame"
                            ]
                        },
                        {
                            "chapter": "Ch 2: Introduction to SEO",
                            "tasks": [
                                "Types of SEO (On-page, Off-page)",
                                "SEO Techniques (White hat, Black hat)",
                                "Keyword research & Image optimization"
                            ]
                        },
                        {
                            "chapter": "Ch 3: Advanced Javascript",
                            "tasks": [
                                "switch case & Looping structures (for, while)",
                                "Built-in objects: String, Math, Date, Array",
                                "DOM & Window objects",
                                "Events (onclick, onload, etc.)"
                            ]
                        }
                    ],
                    "Biology": [
                        {
                            "chapter": "Ch 1: Reproduction in Lower & Higher Plants",
                            "tasks": [
                                "Asexual & Sexual reproduction",
                                "Structure of flower, ovule",
                                "Pollination & its types",
                                "Double fertilization"
                            ]
                        },
                        {
                            "chapter": "Ch 3: Inheritance and Variation",
                            "tasks": [
                                "Mendel's Laws",
                                "Deviations: Incomplete dominance, Co-dominance, Multiple alleles",
                                "Sex determination in humans & birds",
                                "Genetic disorders: Thalassemia, Down's syndrome, Turner's syndrome"
                            ]
                        },
                        {
                            "chapter": "Ch 4: Molecular Basis of Inheritance",
                            "tasks": [
                                "DNA packaging & replication",
                                "Protein synthesis (Transcription, Translation)",
                                "Lac operon",
                                "DNA fingerprinting"
                            ]
                        },
                        {
                            "chapter": "Ch 6: Plant Water Relation",
                            "tasks": [
                                "Osmosis, Diffusion, Water potential",
                                "Apoplast & Symplast pathway",
                                "Cohesion-Tension theory",
                                "Transpiration & Stomatal structure"
                            ]
                        },
                        {
                            "chapter": "Ch 7: Plant Growth and Mineral Nutrition",
                            "tasks": [
                                "Phases of growth",
                                "Plant growth regulators (Auxins, Gibberellins, etc.)",
                                "Photoperiodism & Vernalization"
                            ]
                        },
                        {
                            "chapter": "Ch 8: Respiration and Circulation",
                            "tasks": [
                                "Human respiratory system & mechanism of breathing",
                                "Human heart structure & Cardiac cycle",
                                "Blood composition & Blood groups",
                                "ECG"
                            ]
                        },
                        {
                            "chapter": "Ch 10: Human Health and Diseases",
                            "tasks": [
                                "Immunity (Innate & Acquired)",
                                "Common diseases (Malaria, Typhoid, AIDS, Cancer)",
                                "Vaccination"
                            ]
                        },
                        {
                            "chapter": "Ch 11: Enhancement of Food Production",
                            "tasks": [
                                "Plant breeding & Tissue culture",
                                "Animal husbandry (Dairy, Poultry)",
                                "Microbes in sewage treatment & biogas production"
                            ]
                        },
                        {
                            "chapter": "Ch 12: Biotechnology",
                            "tasks": [
                                "Recombinant DNA technology",
                                "Applications in agriculture (Bt cotton) & medicine (Insulin)",
                                "Bioethics & Biopatent"
                            ]
                        }
                    ],
                    "Chemistry": [
                        {
                            "chapter": "Ch 1: Solid State",
                            "tasks": [
                                "Types of solids (Crystalline, Amorphous)",
                                "Unit cells (sc, bcc, fcc) & Packing efficiency",
                                "Crystal defects (Schottky, Frenkel)"
                            ]
                        },
                        {
                            "chapter": "Ch 2: Solutions",
                            "tasks": [
                                "Henry's Law & Raoult's Law",
                                "Colligative properties (Vapour pressure lowering, Boiling point elevation, etc.)",
                                "van't Hoff factor"
                            ]
                        },
                        {
                            "chapter": "Ch 4: Chemical Thermodynamics",
                            "tasks": [
                                "First Law of Thermodynamics",
                                "Enthalpy & Hess's Law",
                                "Entropy & Gibbs energy"
                            ]
                        },
                        {
                            "chapter": "Ch 5: Electrochemistry",
                            "tasks": [
                                "Molar conductivity & Kohlrausch's Law",
                                "Nernst equation",
                                "Galvanic cells (Dry cell, Lead storage battery)"
                            ]
                        },
                        {
                            "chapter": "Ch 6: Chemical Kinetics",
                            "tasks": [
                                "Rate law, Order & Molecularity",
                                "Integrated rate law (Zeroth & First order)",
                                "Half-life period",
                                "Arrhenius equation"
                            ]
                        },
                        {
                            "chapter": "Ch 10: Halogen Derivatives",
                            "tasks": [
                                "SN1 & SN2 mechanisms",
                                "Elimination reactions (Saytzeff rule)",
                                "Wurtz reaction & Grignard reagent"
                            ]
                        },
                        {
                            "chapter": "Ch 11: Alcohols, Phenols and Ethers",
                            "tasks": [
                                "Preparation of Alcohols, Phenols & Ethers",
                                "Acidity of alcohols & phenols",
                                "Reimer-Tiemann reaction & Kolbe's reaction"
                            ]
                        },
                        {
                            "chapter": "Ch 15: Introduction to Polymer Chemistry",
                            "tasks": [
                                "Classification of polymers",
                                "Addition & Condensation polymerization",
                                "Important polymers (Polythene, Nylon, Bakelite)",
                                "Biodegradable polymers"
                            ]
                        }
                    ],
                    "English": [
                        {
                            "chapter": "Prose",
                            "tasks": [
                                "1.1 An Astrologer's Day: Story, characters, theme of fate",
                                "1.2 On Saying \"Please\": Theme of courtesy & good manners",
                                "1.3 The Cop and the Anthem: Story of Soapy, theme of irony",
                                "1.4 Big Data-Big Insights: Concept & uses of Big Data"
                            ]
                        },
                        {
                            "chapter": "Poetry",
                            "tasks": [
                                "2.1 Song of the Open Road: Theme of freedom & life's journey",
                                "2.2 Indian Weavers: Symbolism of the three stages of life",
                                "2.3 The Inchcape Rock: Theme of \"as you sow, so shall you reap\"",
                                "2.4 Have you Earned your Tomorrow: Theme of kindness & helping others"
                            ]
                        }
                    ]
                }
            }
        };

        // Initialize when DOM is ready
        this.initializeApp();
    }

    initializeApp() {
        // Use multiple methods to ensure initialization happens
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
        
        // Fallback initialization
        setTimeout(() => this.setupEventListeners(), 100);
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Auth form toggles
        this.setupAuthToggles();
        
        // Form submissions  
        this.setupFormSubmissions();
        
        // Dashboard interactions
        this.setupDashboardInteractions();
        
        // Subject navigation
        this.setupSubjectNavigation();
        
        console.log('Event listeners setup complete');
    }

    setupAuthToggles() {
        const showRegisterBtn = document.getElementById('showRegister');
        const showLoginBtn = document.getElementById('showLogin');
        
        if (showRegisterBtn) {
            showRegisterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Switching to register form');
                this.toggleAuthForm('register');
            });
        }

        if (showLoginBtn) {
            showLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Switching to login form');
                this.toggleAuthForm('login');
            });
        }
    }

    setupFormSubmissions() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Login form submitted');
                this.handleLogin();
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Register form submitted');
                this.handleRegister();
            });
        }
    }

    setupDashboardInteractions() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }

        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }
    }

    setupSubjectNavigation() {
        const subjects = document.querySelectorAll('.nav-subject');
        subjects.forEach(subject => {
            subject.addEventListener('click', () => {
                this.selectSubject(subject.dataset.subject);
            });
        });
    }

    toggleAuthForm(form) {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        if (form === 'register') {
            if (loginForm) loginForm.classList.add('hidden');
            if (registerForm) registerForm.classList.remove('hidden');
        } else {
            if (registerForm) registerForm.classList.add('hidden');
            if (loginForm) loginForm.classList.remove('hidden');
        }
    }

    handleLogin() {
        console.log('Processing login...');
        
        const usernameField = document.getElementById('loginUsername');
        const passwordField = document.getElementById('loginPassword');
        
        if (!usernameField || !passwordField) {
            console.error('Login form fields not found');
            this.showToast('Form error - please refresh the page', 'error');
            return;
        }
        
        const username = usernameField.value.trim();
        const password = passwordField.value;

        console.log('Login attempt for username:', username);

        if (!username || !password) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        const user = this.users.get(username);
        console.log('User found:', !!user);
        
        if (user && user.password === password) {
            console.log('Login successful');
            this.currentUser = username;
            this.loadUserProgress();
            this.showDashboard();
            this.showToast(`Welcome back, ${username}!`, 'success');
        } else {
            console.log('Login failed - invalid credentials');
            this.showToast('Invalid username or password', 'error');
        }
    }

    handleRegister() {
        const usernameField = document.getElementById('registerUsername');
        const passwordField = document.getElementById('registerPassword');
        const confirmPasswordField = document.getElementById('confirmPassword');
        
        if (!usernameField || !passwordField || !confirmPasswordField) {
            this.showToast('Form error - please refresh the page', 'error');
            return;
        }
        
        const username = usernameField.value.trim();
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;

        if (!username || !password || !confirmPassword) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showToast('Passwords do not match', 'error');
            return;
        }

        if (this.users.has(username)) {
            this.showToast('Username already exists', 'error');
            return;
        }

        this.users.set(username, { username, password });
        this.currentUser = username;
        this.initializeUserProgress();
        this.showDashboard();
        this.showToast(`Account created successfully! Welcome, ${username}!`, 'success');
    }

    handleLogout() {
        this.currentUser = null;
        this.currentSubject = null;
        this.userProgress.clear();
        
        // Hide dashboard and show auth screen
        const dashboard = document.getElementById('dashboard');
        const authScreen = document.getElementById('auth-screen');
        
        if (dashboard) dashboard.classList.add('hidden');
        if (authScreen) authScreen.classList.remove('hidden');
        
        // Reset forms
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        
        if (loginForm) loginForm.reset();
        if (registerForm) registerForm.reset();
        
        this.toggleAuthForm('login');
        this.showToast('Logged out successfully', 'success');
    }

    showDashboard() {
        console.log('Showing dashboard...');
        
        const authScreen = document.getElementById('auth-screen');
        const dashboard = document.getElementById('dashboard');
        const welcomeMessage = document.getElementById('welcomeMessage');
        
        // Hide auth screen and show dashboard
        if (authScreen) {
            authScreen.classList.add('hidden');
            console.log('Auth screen hidden');
        }
        if (dashboard) {
            dashboard.classList.remove('hidden');
            console.log('Dashboard shown');
        }
        
        // Set welcome message
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome, ${this.currentUser}`;
        }
        
        // Update sidebar progress and show welcome content
        this.updateSidebarProgress();
        this.showWelcomeContent();
    }

    showWelcomeContent() {
        const welcomeContent = document.getElementById('welcome-content');
        const subjectContent = document.getElementById('subject-content');
        
        if (welcomeContent) welcomeContent.classList.remove('hidden');
        if (subjectContent) subjectContent.classList.add('hidden');
        
        // Clear any active subject selection
        document.querySelectorAll('.nav-subject').forEach(subject => {
            subject.classList.remove('active');
        });
        
        this.currentSubject = null;
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        this.sidebarOpen = !this.sidebarOpen;
        
        if (sidebar) {
            if (this.sidebarOpen) {
                sidebar.classList.add('open');
            } else {
                sidebar.classList.remove('open');
            }
        }
    }

    selectSubject(subjectName) {
        console.log('Selecting subject:', subjectName);
        this.currentSubject = subjectName;
        
        // Update active subject in sidebar
        document.querySelectorAll('.nav-subject').forEach(subject => {
            subject.classList.remove('active');
        });
        
        const activeSubject = document.querySelector(`[data-subject="${subjectName}"]`);
        if (activeSubject) {
            activeSubject.classList.add('active');
        }

        // Show subject content
        const welcomeContent = document.getElementById('welcome-content');
        const subjectContent = document.getElementById('subject-content');
        
        if (welcomeContent) welcomeContent.classList.add('hidden');
        if (subjectContent) subjectContent.classList.remove('hidden');

        this.renderSubjectContent(subjectName);
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            this.sidebarOpen = false;
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.classList.remove('open');
        }
    }

    renderSubjectContent(subjectName) {
        const subjectData = this.syllabus["12th"]["SEM"][subjectName];
        const subjectTitle = document.getElementById('subject-title');
        const chaptersContainer = document.getElementById('chapters-container');

        if (subjectTitle) {
            subjectTitle.textContent = subjectName;
        }
        
        if (chaptersContainer) {
            chaptersContainer.innerHTML = '';

            subjectData.forEach((chapter, chapterIndex) => {
                const chapterElement = this.createChapterElement(subjectName, chapter, chapterIndex);
                chaptersContainer.appendChild(chapterElement);
            });
        }

        this.updateSubjectProgress(subjectName);
    }

    createChapterElement(subjectName, chapter, chapterIndex) {
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter';
        chapterDiv.dataset.chapter = chapterIndex;

        const headerDiv = document.createElement('div');
        headerDiv.className = 'chapter-header';
        headerDiv.addEventListener('click', () => {
            chapterDiv.classList.toggle('expanded');
        });

        const titleSpan = document.createElement('span');
        titleSpan.className = 'chapter-title';
        titleSpan.textContent = chapter.chapter;

        const progressSpan = document.createElement('span');
        progressSpan.className = 'chapter-progress';

        headerDiv.appendChild(titleSpan);
        headerDiv.appendChild(progressSpan);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'chapter-content';

        const taskList = document.createElement('div');
        taskList.className = 'task-list';

        chapter.tasks.forEach((task, taskIndex) => {
            const taskItem = this.createTaskElement(subjectName, chapterIndex, taskIndex, task);
            taskList.appendChild(taskItem);
        });

        contentDiv.appendChild(taskList);
        chapterDiv.appendChild(headerDiv);
        chapterDiv.appendChild(contentDiv);

        this.updateChapterProgress(subjectName, chapterIndex, progressSpan);

        return chapterDiv;
    }

    createTaskElement(subjectName, chapterIndex, taskIndex, taskText) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.id = `task-${subjectName}-${chapterIndex}-${taskIndex}`;

        const label = document.createElement('label');
        label.className = 'task-label';
        label.htmlFor = checkbox.id;
        label.textContent = taskText;

        // Set initial state
        const isCompleted = this.isTaskCompleted(subjectName, chapterIndex, taskIndex);
        checkbox.checked = isCompleted;
        if (isCompleted) {
            taskDiv.classList.add('completed');
        }

        checkbox.addEventListener('change', () => {
            this.toggleTask(subjectName, chapterIndex, taskIndex, checkbox.checked);
            if (checkbox.checked) {
                taskDiv.classList.add('completed');
            } else {
                taskDiv.classList.remove('completed');
            }
        });

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(label);

        return taskDiv;
    }

    toggleTask(subjectName, chapterIndex, taskIndex, isCompleted) {
        const progressKey = `${this.currentUser}-${subjectName}-${chapterIndex}-${taskIndex}`;
        
        if (isCompleted) {
            this.userProgress.set(progressKey, true);
        } else {
            this.userProgress.delete(progressKey);
        }

        // Update progress displays
        this.updateChapterProgress(subjectName, chapterIndex);
        this.updateSubjectProgress(subjectName);
        this.updateSidebarProgress();
        
        this.showToast(isCompleted ? 'Task completed!' : 'Task unmarked', 'success');
    }

    isTaskCompleted(subjectName, chapterIndex, taskIndex) {
        const progressKey = `${this.currentUser}-${subjectName}-${chapterIndex}-${taskIndex}`;
        return this.userProgress.has(progressKey);
    }

    updateChapterProgress(subjectName, chapterIndex, progressElement = null) {
        const chapter = this.syllabus["12th"]["SEM"][subjectName][chapterIndex];
        const totalTasks = chapter.tasks.length;
        let completedTasks = 0;

        for (let taskIndex = 0; taskIndex < totalTasks; taskIndex++) {
            if (this.isTaskCompleted(subjectName, chapterIndex, taskIndex)) {
                completedTasks++;
            }
        }

        const percentage = Math.round((completedTasks / totalTasks) * 100);
        
        if (progressElement) {
            progressElement.textContent = `${completedTasks}/${totalTasks} (${percentage}%)`;
        } else {
            const element = document.querySelector(`[data-chapter="${chapterIndex}"] .chapter-progress`);
            if (element) {
                element.textContent = `${completedTasks}/${totalTasks} (${percentage}%)`;
            }
        }
    }

    updateSubjectProgress(subjectName) {
        const subjectData = this.syllabus["12th"]["SEM"][subjectName];
        let totalTasks = 0;
        let completedTasks = 0;

        subjectData.forEach((chapter, chapterIndex) => {
            chapter.tasks.forEach((task, taskIndex) => {
                totalTasks++;
                if (this.isTaskCompleted(subjectName, chapterIndex, taskIndex)) {
                    completedTasks++;
                }
            });
        });

        const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        // Update progress bar
        const progressFill = document.getElementById('subject-progress');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `${percentage}% Complete (${completedTasks}/${totalTasks})`;
        }
    }

    updateSidebarProgress() {
        const subjects = ['Physics', 'Information Technology', 'Biology', 'Chemistry', 'English'];
        
        subjects.forEach(subjectName => {
            const subjectData = this.syllabus["12th"]["SEM"][subjectName];
            let totalTasks = 0;
            let completedTasks = 0;

            subjectData.forEach((chapter, chapterIndex) => {
                chapter.tasks.forEach((task, taskIndex) => {
                    totalTasks++;
                    if (this.isTaskCompleted(subjectName, chapterIndex, taskIndex)) {
                        completedTasks++;
                    }
                });
            });

            const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
            const progressElement = document.querySelector(`[data-subject="${subjectName}"] .progress-indicator`);
            
            if (progressElement) {
                progressElement.textContent = `${percentage}%`;
            }
        });
    }

    loadUserProgress() {
        // In a real app, this would load from a database
        // For this demo, we'll simulate some progress for demo users
        if (this.currentUser === 'demo') {
            // Add some demo progress
            this.userProgress.set('demo-Physics-0-0', true);
            this.userProgress.set('demo-Physics-0-1', true);
            this.userProgress.set('demo-Information Technology-0-0', true);
            this.userProgress.set('demo-Biology-0-0', true);
            this.userProgress.set('demo-Biology-0-1', true);
            this.userProgress.set('demo-Biology-0-2', true);
        }
    }

    initializeUserProgress() {
        // Initialize empty progress for new user
        this.userProgress.clear();
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.remove('hidden');
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.classList.add('hidden');
                }, 300);
            }, 3000);
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing StudyPro DEV...');
    window.app = new StudyProApp();
});

// Fallback initialization
window.addEventListener('load', () => {
    if (!window.app) {
        console.log('Fallback initialization...');
        window.app = new StudyProApp();
    }
});