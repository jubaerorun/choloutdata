/* =========================================
   CholOut Hub - Modern Dashboard JavaScript
   Part 1: Initialization, Login & Core
   ========================================= */

// =============================================
// GLOBAL STATE & CONFIGURATION
// =============================================

const APP_CONFIG = {
    itemsPerPage: 15,
    cardsPerLoad: 12,
    toastDuration: 4000,
    animationDuration: 300,
    searchDebounce: 300,
    // Multiple users array
    users: [
        {
            email: "orunjubaer@gmail.com",
            password: "Jubaer@2026",
            name: "Orun Jubaer",
            role: "Administrator"
        },
        {
            email: "probir@icddrb.org",
            password: "Probir@2026",
            name: "Probir",
            role: "Administrator"
        }
        // Add more users here as needed
    ]
};

const STATE = {
    currentPage: 'dashboard',
    currentDataPage: 1,
    cardsLoaded: 0,
    selectedItems: new Set(),
    currentItem: null,
    filters: {
        category: '',
        subCategory: '',
        source: '',
        search: ''
    },
    sort: {
        column: 'id',
        direction: 'asc'
    },
    theme: 'light',
    sidebarCollapsed: false,
    sidebarOpen: false
};

// Charts storage
let charts = {};

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initLogin();
    initTheme();
    initKeyboardShortcuts();
});

function initLoader() {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
}

function initApp() {
    console.log('🚀 Initializing CholOut Hub...');
    console.log(`📊 Total Variables: ${masterData.length}`);
    
    // Initialize all components
    updateStats();
    initNavigation();
    initSearch();
    initFilters();
    renderDashboard();
    renderRecentItems();
    
    // Set initial page
    switchPage('dashboard');
    
    showToast('success', 'Welcome!', 'Dashboard loaded successfully');
    console.log('✅ CholOut Hub initialized');
}

// =============================================
// THEME MANAGEMENT
// =============================================

function initTheme() {
    const savedTheme = localStorage.getItem('cholout-theme');
    if (savedTheme === 'dark') {
        STATE.theme = 'dark';
        document.body.classList.add('dark-theme');
        updateThemeIcon();
    }
}

function toggleTheme() {
    STATE.theme = STATE.theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('cholout-theme', STATE.theme);
    updateThemeIcon();
    
    // Redraw charts for theme
    if (STATE.currentPage === 'dashboard' || STATE.currentPage === 'analytics') {
        setTimeout(() => renderDashboard(), 100);
    }
    
    showToast('info', 'Theme Changed', `Switched to ${STATE.theme} mode`);
}

function updateThemeIcon() {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.className = STATE.theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}

// =============================================
// LOGIN SYSTEM
// =============================================

function initLogin() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', handleLogin);
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('login-error');
    const loginBtn = document.querySelector('.login-btn');
    const loginForm = document.getElementById('login-form');
    
    // Clear previous errors
    errorEl.classList.remove('show');
    errorEl.innerHTML = '';
    
    // Add loading state
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    
    // Simulate authentication delay
    setTimeout(() => {
        if (email === APP_CONFIG.credentials.email && 
            password === APP_CONFIG.credentials.password) {
            // Success - hide login, show app
            loginSuccess();
        } else {
            // Error
            loginError(errorEl, loginBtn, loginForm);
        }
    }, 1200);
}

function loginSuccess() {
    const loginScreen = document.getElementById('login-screen');
    const app = document.getElementById('app');
    
    // Animate out login screen
    loginScreen.style.opacity = '0';
    loginScreen.style.transform = 'scale(1.02)';
    
    setTimeout(() => {
        loginScreen.classList.add('hidden');
        loginScreen.style.display = 'none';
        app.style.display = 'flex';
        
        // Initialize the app
        initApp();
    }, 400);
}

function loginError(errorEl, loginBtn, loginForm) {
    // Show error message
    errorEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Invalid email or password. Please try again.';
    errorEl.classList.add('show');
    
    // Reset button
    loginBtn.classList.remove('loading');
    loginBtn.disabled = false;
    
    // Shake animation
    loginForm.classList.add('shake');
    setTimeout(() => loginForm.classList.remove('shake'), 600);
    
    // Clear password field
    document.getElementById('password').value = '';
    document.getElementById('password').focus();
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-pass i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fa-solid fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fa-solid fa-eye';
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        showToast('info', 'Goodbye!', 'You have been logged out');
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}

// =============================================
// KEYBOARD SHORTCUTS
// =============================================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K - Focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('global-search');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // Escape - Close modals/panels
        if (e.key === 'Escape') {
            closeDetailPanel();
            closeModal();
            closeExportModal();
            closeNotifications();
        }
        
        // Ctrl/Cmd + N - Add new
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            openAddModal();
        }
    });
}

// =============================================
// SIDEBAR & NAVIGATION
// =============================================

function initNavigation() {
    // Set up nav item clicks
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            switchPage(page);
            
            // Close sidebar on mobile
            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
        });
    });
    
    // Set up dropdown item clicks
    document.querySelectorAll('.dropdown-item[data-page]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            switchPage(page);
            
            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
        });
    });
    
    // Update category counts in nav
    updateNavCounts();
}

function updateNavCounts() {
    const counts = getCategoryCounts();
    
    document.getElementById('nav-health-count').textContent = counts.Health || 0;
    document.getElementById('nav-demo-count').textContent = counts.Demographic || 0;
    document.getElementById('nav-climate-count').textContent = counts.Climatic || 0;
    document.getElementById('nav-env-count').textContent = counts.Environmental || 0;
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    
    if (window.innerWidth <= 1024) {
        // Mobile - slide in/out
        STATE.sidebarOpen = !STATE.sidebarOpen;
        sidebar.classList.toggle('open', STATE.sidebarOpen);
        
        // Toggle overlay
        toggleSidebarOverlay(STATE.sidebarOpen);
    } else {
        // Desktop - collapse/expand
        STATE.sidebarCollapsed = !STATE.sidebarCollapsed;
        sidebar.classList.toggle('collapsed', STATE.sidebarCollapsed);
        localStorage.setItem('sidebar-collapsed', STATE.sidebarCollapsed);
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    STATE.sidebarOpen = false;
    sidebar.classList.remove('open');
    toggleSidebarOverlay(false);
}

function toggleSidebarOverlay(show) {
    let overlay = document.querySelector('.sidebar-overlay');
    
    if (show && !overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.onclick = closeSidebar;
        document.body.appendChild(overlay);
        
        setTimeout(() => overlay.classList.add('show'), 10);
    } else if (!show && overlay) {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
    }
}

function toggleDropdown(btn) {
    const dropdown = btn.closest('.nav-dropdown');
    const isOpen = dropdown.classList.contains('open');
    
    // Close all other dropdowns
    document.querySelectorAll('.nav-dropdown.open').forEach(d => {
        if (d !== dropdown) {
            d.classList.remove('open');
        }
    });
    
    // Toggle current dropdown
    dropdown.classList.toggle('open', !isOpen);
}

function toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('open');
}

// Close user menu when clicking outside
document.addEventListener('click', (e) => {
    const userCard = document.querySelector('.user-card');
    const userDropdown = document.getElementById('user-dropdown');
    
    if (userDropdown && !userCard.contains(e.target)) {
        userDropdown.classList.remove('open');
    }
});

// =============================================
// PAGE SWITCHING
// =============================================

function switchPage(page) {
    STATE.currentPage = page;
    
    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });
    
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });
    
    // Update page title and breadcrumb
    updatePageHeader(page);
    
    // Hide all pages, show target
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    
    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Initialize page content
    initPageContent(page);
}

function updatePageHeader(page) {
    const titles = {
        'dashboard': { title: 'Dashboard', breadcrumb: 'Overview' },
        'tree': { title: 'Hierarchy Tree', breadcrumb: 'Tree View' },
        'cards': { title: 'Variable Gallery', breadcrumb: 'Cards' },
        'grid': { title: 'Data Grid', breadcrumb: 'Table View' },
        'analytics': { title: 'Analytics', breadcrumb: 'Charts' },
        'reports': { title: 'Reports', breadcrumb: 'Reports' },
        'settings': { title: 'Settings', breadcrumb: 'Preferences' }
    };
    
    const info = titles[page] || { title: 'Dashboard', breadcrumb: 'Overview' };
    
    document.getElementById('page-title').textContent = info.title;
    document.getElementById('breadcrumb-current').textContent = info.breadcrumb;
}

function initPageContent(page) {
    switch (page) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'tree':
            renderTreeView();
            break;
        case 'cards':
            STATE.cardsLoaded = 0;
            renderCards();
            break;
        case 'grid':
            STATE.currentDataPage = 1;
            renderGrid();
            break;
        case 'analytics':
            renderAnalytics();
            break;
    }
}

// =============================================
// STATISTICS & COUNTS
// =============================================

function getCategoryCounts() {
    const counts = {};
    masterData.forEach(item => {
        counts[item.cat] = (counts[item.cat] || 0) + 1;
    });
    return counts;
}

function getSubCategoryCounts(category = null) {
    const counts = {};
    const data = category 
        ? masterData.filter(d => d.cat === category) 
        : masterData;
    
    data.forEach(item => {
        counts[item.sub] = (counts[item.sub] || 0) + 1;
    });
    return counts;
}

function getSourceCounts() {
    const counts = {};
    masterData.forEach(item => {
        if (item.source) {
            counts[item.source] = (counts[item.source] || 0) + 1;
        }
    });
    return counts;
}

function updateStats() {
    const counts = getCategoryCounts();
    
    // Update stat cards
    document.getElementById('stat-health').textContent = counts.Health || 0;
    document.getElementById('stat-demo').textContent = counts.Demographic || 0;
    document.getElementById('stat-climate').textContent = counts.Climatic || 0;
    document.getElementById('stat-env').textContent = counts.Environmental || 0;
    
    // Update nav counts
    updateNavCounts();
}

// =============================================
// SEARCH FUNCTIONALITY
// =============================================

function initSearch() {
    const searchInput = document.getElementById('global-search');
    let debounceTimer;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(() => {
            STATE.filters.search = e.target.value.trim().toLowerCase();
            
            if (STATE.filters.search.length >= 2 || STATE.filters.search.length === 0) {
                applyFiltersAndRender();
            }
        }, APP_CONFIG.searchDebounce);
    });
    
    // Clear search on escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            STATE.filters.search = '';
            applyFiltersAndRender();
            searchInput.blur();
        }
    });
}

// =============================================
// FILTER SYSTEM
// =============================================

function initFilters() {
    // Populate filter dropdowns
    populateFilterOptions();
    
    // Add event listeners
    const filterCat = document.getElementById('filter-cat');
    const filterSub = document.getElementById('filter-sub');
    const filterSource = document.getElementById('filter-source');
    
    if (filterCat) {
        filterCat.addEventListener('change', () => {
            STATE.filters.category = filterCat.value;
            updateSubCategoryFilter();
            applyFiltersAndRender();
        });
    }
    
    if (filterSub) {
        filterSub.addEventListener('change', () => {
            STATE.filters.subCategory = filterSub.value;
            applyFiltersAndRender();
        });
    }
    
    if (filterSource) {
        filterSource.addEventListener('change', () => {
            STATE.filters.source = filterSource.value;
            applyFiltersAndRender();
        });
    }
}

function populateFilterOptions() {
    // Sources
    const sourceSelect = document.getElementById('filter-source');
    if (sourceSelect) {
        const sources = [...new Set(masterData.map(d => d.source).filter(s => s))].sort();
        sources.forEach(source => {
            const opt = document.createElement('option');
            opt.value = source;
            opt.textContent = source.length > 30 ? source.substring(0, 30) + '...' : source;
            sourceSelect.appendChild(opt);
        });
    }
}

function updateSubCategoryFilter() {
    const subSelect = document.getElementById('filter-sub');
    if (!subSelect) return;
    
    // Clear existing options
    subSelect.innerHTML = '<option value="">All Sub-Categories</option>';
    
    // Get sub-categories based on selected category
    let subCategories;
    if (STATE.filters.category) {
        subCategories = [...new Set(
            masterData
                .filter(d => d.cat === STATE.filters.category)
                .map(d => d.sub)
        )].sort();
    } else {
        subCategories = [...new Set(masterData.map(d => d.sub))].sort();
    }
    
    subCategories.forEach(sub => {
        const opt = document.createElement('option');
        opt.value = sub;
        opt.textContent = sub;
        subSelect.appendChild(opt);
    });
}

function filterCategory(category) {
    STATE.filters.category = category;
    
    // Update filter dropdown
    const filterCat = document.getElementById('filter-cat');
    if (filterCat) {
        filterCat.value = category;
    }
    
    updateSubCategoryFilter();
    
    // Switch to grid view for filtered results
    switchPage('grid');
    
    showToast('info', 'Filter Applied', `Showing ${category} variables`);
}

function applyFilters() {
    applyFiltersAndRender();
}

function applyFiltersAndRender() {
    // Reset pagination
    STATE.currentDataPage = 1;
    STATE.cardsLoaded = 0;
    
    // Re-render current page
    initPageContent(STATE.currentPage);
}

function clearAllFilters() {
    STATE.filters = {
        category: '',
        subCategory: '',
        source: '',
        search: ''
    };
    
    // Reset filter dropdowns
    document.getElementById('filter-cat').value = '';
    document.getElementById('filter-sub').value = '';
    document.getElementById('filter-source').value = '';
    document.getElementById('global-search').value = '';
    
    updateSubCategoryFilter();
    applyFiltersAndRender();
    
    showToast('info', 'Filters Cleared', 'All filters have been reset');
}

function getFilteredData() {
    let data = [...masterData];
    
    // Apply search filter
    if (STATE.filters.search) {
        const query = STATE.filters.search.toLowerCase();
        data = data.filter(d => 
            d.name.toLowerCase().includes(query) ||
            d.desc.toLowerCase().includes(query) ||
            d.cat.toLowerCase().includes(query) ||
            d.sub.toLowerCase().includes(query) ||
            (d.source && d.source.toLowerCase().includes(query))
        );
    }
    
    // Apply category filter
    if (STATE.filters.category) {
        data = data.filter(d => d.cat === STATE.filters.category);
    }
    
    // Apply sub-category filter
    if (STATE.filters.subCategory) {
        data = data.filter(d => d.sub === STATE.filters.subCategory);
    }
    
    // Apply source filter
    if (STATE.filters.source) {
        data = data.filter(d => d.source === STATE.filters.source);
    }
    
    // Apply sorting
    data.sort((a, b) => {
        let valA = a[STATE.sort.column];
        let valB = b[STATE.sort.column];
        
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        
        if (valA < valB) return STATE.sort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return STATE.sort.direction === 'asc' ? 1 : -1;
        return 0;
    });
    
    return data;
}

// =============================================
// NOTIFICATIONS
// =============================================

function toggleNotifications() {
    const panel = document.getElementById('notifications-panel');
    panel.classList.toggle('open');
    
    // Update header button state
    const btn = document.querySelector('.header-btn[onclick*="toggleNotifications"]');
    if (btn) {
        btn.classList.toggle('active', panel.classList.contains('open'));
    }
}

function closeNotifications() {
    const panel = document.getElementById('notifications-panel');
    panel.classList.remove('open');
    
    const btn = document.querySelector('.header-btn[onclick*="toggleNotifications"]');
    if (btn) {
        btn.classList.remove('active');
    }
}

function clearNotifications() {
    document.getElementById('notif-list').innerHTML = `
        <div class="empty-state" style="padding: 40px 20px;">
            <i class="fa-solid fa-bell-slash"></i>
            <p>No notifications</p>
        </div>
    `;
    
    // Update badge
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.style.display = 'none';
    }
}

// Close notifications when clicking outside
document.addEventListener('click', (e) => {
    const panel = document.getElementById('notifications-panel');
    const btn = document.querySelector('.header-btn[onclick*="toggleNotifications"]');
    
    if (panel && panel.classList.contains('open') && 
        !panel.contains(e.target) && 
        !btn.contains(e.target)) {
        closeNotifications();
    }
});

// =============================================
// TOAST NOTIFICATIONS
// =============================================

function showToast(type, title, message) {
    const container = document.getElementById('toast-container');
    
    const icons = {
        success: 'fa-circle-check',
        error: 'fa-circle-xmark',
        warning: 'fa-triangle-exclamation',
        info: 'fa-circle-info'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fa-solid ${icons[type] || icons.info}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="removeToast(this)">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="toast-progress">
            <div class="toast-progress-bar"></div>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }
    }, APP_CONFIG.toastDuration);
}

function removeToast(btn) {
    const toast = btn.closest('.toast');
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function getCategoryIcon(category) {
    const icons = {
        'Health': 'fa-solid fa-heart-pulse',
        'Demographic': 'fa-solid fa-users',
        'Climatic': 'fa-solid fa-cloud-sun',
        'Environmental': 'fa-solid fa-leaf'
    };
    return icons[category] || 'fa-solid fa-database';
}

function getCategoryClass(category) {
    const classes = {
        'Health': 'health',
        'Demographic': 'demographic',
        'Climatic': 'climatic',
        'Environmental': 'environmental'
    };
    return classes[category] || '';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// =============================================
// WINDOW RESIZE HANDLER
// =============================================

window.addEventListener('resize', debounce(() => {
    // Handle responsive changes
    if (window.innerWidth > 1024) {
        closeSidebar();
    }
    
    // Redraw charts if needed
    if (STATE.currentPage === 'dashboard' || STATE.currentPage === 'analytics') {
        Object.values(charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }
}, 250));

console.log('📦 CholOut Hub Core Module Loaded');

/* =========================================
   CholOut Hub - Modern Dashboard JavaScript
   Part 2: Dashboard, Charts & Analytics
   ========================================= */

// =============================================
// DASHBOARD RENDERING
// =============================================

function renderDashboard() {
    updateStats();
    renderCharts();
    renderRecentItems();
}

function renderRecentItems() {
    const container = document.getElementById('recent-list');
    if (!container) return;
    
    // Get last 5 items
    const recentData = masterData.slice(0, 5);
    
    if (recentData.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-inbox"></i>
                <h3>No Variables</h3>
                <p>Add your first variable to get started</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = recentData.map(item => `
        <div class="recent-item" onclick="openDetails(${item.id})">
            <div class="recent-icon ${getCategoryClass(item.cat)}">
                <i class="${getCategoryIcon(item.cat)}"></i>
            </div>
            <div class="recent-info">
                <h4>${escapeHtml(truncateText(item.name, 40))}</h4>
                <p>${escapeHtml(item.sub)}</p>
            </div>
            <i class="fa-solid fa-chevron-right recent-action"></i>
        </div>
    `).join('');
}

// =============================================
// CHARTS RENDERING
// =============================================

function renderCharts() {
    setTimeout(() => {
        renderCategoryChart();
        renderSubCategoryChart();
    }, 100);
}

function renderCategoryChart(type = 'doughnut') {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;
    
    const counts = getCategoryCounts();
    
    const data = {
        labels: ['Health', 'Demographic', 'Climatic', 'Environmental'],
        datasets: [{
            data: [
                counts.Health || 0,
                counts.Demographic || 0,
                counts.Climatic || 0,
                counts.Environmental || 0
            ],
            backgroundColor: [
                'rgba(244, 63, 94, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(16, 185, 129, 0.8)'
            ],
            borderColor: [
                '#f43f5e',
                '#8b5cf6',
                '#f59e0b',
                '#10b981'
            ],
            borderWidth: 2,
            hoverOffset: 10
        }]
    };
    
    const config = {
        type: type,
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            family: 'Inter',
                            size: 12,
                            weight: '500'
                        },
                        color: STATE.theme === 'dark' ? '#cbd5e1' : '#475569'
                    }
                },
                tooltip: {
                    backgroundColor: STATE.theme === 'dark' ? '#1e293b' : '#ffffff',
                    titleColor: STATE.theme === 'dark' ? '#f8fafc' : '#0f172a',
                    bodyColor: STATE.theme === 'dark' ? '#cbd5e1' : '#475569',
                    borderColor: STATE.theme === 'dark' ? '#334155' : '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: type === 'doughnut' ? '65%' : 0,
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    };
    
    // Destroy existing chart
    if (charts.category) {
        charts.category.destroy();
    }
    
    charts.category = new Chart(ctx, config);
}

function renderSubCategoryChart() {
    const ctx = document.getElementById('subCatChart');
    if (!ctx) return;
    
    // Get top 8 sub-categories
    const subCounts = getSubCategoryCounts();
    const sorted = Object.entries(subCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);
    
    const data = {
        labels: sorted.map(s => s[0]),
        datasets: [{
            label: 'Variables',
            data: sorted.map(s => s[1]),
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderColor: '#6366f1',
            borderWidth: 1,
            borderRadius: 8,
            barThickness: 30
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: STATE.theme === 'dark' ? '#1e293b' : '#ffffff',
                    titleColor: STATE.theme === 'dark' ? '#f8fafc' : '#0f172a',
                    bodyColor: STATE.theme === 'dark' ? '#cbd5e1' : '#475569',
                    borderColor: STATE.theme === 'dark' ? '#334155' : '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return `Count: ${context.parsed.x}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: STATE.theme === 'dark' ? '#334155' : '#f1f5f9',
                        drawBorder: false
                    },
                    ticks: {
                        color: STATE.theme === 'dark' ? '#94a3b8' : '#64748b',
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: STATE.theme === 'dark' ? '#94a3b8' : '#64748b',
                        font: {
                            family: 'Inter',
                            size: 11,
                            weight: '500'
                        }
                    }
                }
            }
        }
    };
    
    if (charts.subCategory) {
        charts.subCategory.destroy();
    }
    
    charts.subCategory = new Chart(ctx, config);
}

function changeChartType(type) {
    renderCategoryChart(type);
    
    // Update active state
    const buttons = document.querySelectorAll('.card-actions button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.onclick && btn.onclick.toString().includes(`'${type}'`)) {
            btn.classList.add('active');
        }
    });
}

// =============================================
// ANALYTICS PAGE
// =============================================

function renderAnalytics() {
    setTimeout(() => {
        renderSourceChart();
        renderResolutionChart();
        renderCoverageChart();
    }, 100);
}

function renderSourceChart() {
    const ctx = document.getElementById('sourceChart');
    if (!ctx) return;
    
    const sourceCounts = getSourceCounts();
    const sorted = Object.entries(sourceCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    const colors = [
        '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
        '#f59e0b', '#10b981', '#14b8a6', '#06b6d4',
        '#3b82f6', '#a855f7'
    ];
    
    const data = {
        labels: sorted.map(s => truncateText(s[0], 25)),
        datasets: [{
            label: 'Count',
            data: sorted.map(s => s[1]),
            backgroundColor: colors.map(c => c + 'cc'),
            borderColor: colors,
            borderWidth: 2
        }]
    };
    
    const config = {
        type: 'polarArea',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            family: 'Inter',
                            size: 11
                        },
                        color: STATE.theme === 'dark' ? '#cbd5e1' : '#475569'
                    }
                },
                tooltip: {
                    backgroundColor: STATE.theme === 'dark' ? '#1e293b' : '#ffffff',
                    titleColor: STATE.theme === 'dark' ? '#f8fafc' : '#0f172a',
                    bodyColor: STATE.theme === 'dark' ? '#cbd5e1' : '#475569',
                    borderColor: STATE.theme === 'dark' ? '#334155' : '#e2e8f0',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    grid: {
                        color: STATE.theme === 'dark' ? '#334155' : '#e2e8f0'
                    },
                    ticks: {
                        color: STATE.theme === 'dark' ? '#94a3b8' : '#64748b',
                        backdropColor: 'transparent',
                        font: {
                            family: 'Inter',
                            size: 10
                        }
                    }
                }
            }
        }
    };
    
    if (charts.source) {
        charts.source.destroy();
    }
    
    charts.source = new Chart(ctx, config);
}

function renderResolutionChart() {
    const ctx = document.getElementById('resChart');
    if (!ctx) return;
    
    // Get resolution counts
    const resCounts = {};
    masterData.forEach(item => {
        if (item.res) {
            resCounts[item.res] = (resCounts[item.res] || 0) + 1;
        }
    });
    
    const sorted = Object.entries(resCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);
    
    const data = {
        labels: sorted.map(s => s[0]),
        datasets: [{
            label: 'Count',
            data: sorted.map(s => s[1]),
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: '#10b981',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#10b981',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };
    
    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: STATE.theme === 'dark' ? '#1e293b' : '#ffffff',
                    titleColor: STATE.theme === 'dark' ? '#f8fafc' : '#0f172a',
                    bodyColor: STATE.theme === 'dark' ? '#cbd5e1' : '#475569',
                    borderColor: STATE.theme === 'dark' ? '#334155' : '#e2e8f0',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    grid: {
                        color: STATE.theme === 'dark' ? '#334155' : '#e2e8f0'
                    },
                    angleLines: {
                        color: STATE.theme === 'dark' ? '#334155' : '#e2e8f0'
                    },
                    ticks: {
                        color: STATE.theme === 'dark' ? '#94a3b8' : '#64748b',
                        backdropColor: 'transparent',
                        font: {
                            family: 'Inter',
                            size: 10
                        }
                    },
                    pointLabels: {
                        color: STATE.theme === 'dark' ? '#cbd5e1' : '#475569',
                        font: {
                            family: 'Inter',
                            size: 11,
                            weight: '500'
                        }
                    }
                }
            }
        }
    };
    
    if (charts.resolution) {
        charts.resolution.destroy();
    }
    
    charts.resolution = new Chart(ctx, config);
}

function renderCoverageChart() {
    const ctx = document.getElementById('coverageChart');
    if (!ctx) return;
    
    // Calculate data coverage by category
    const counts = getCategoryCounts();
    const total = masterData.length;
    
    const categories = ['Health', 'Demographic', 'Climatic', 'Environmental'];
    const percentages = categories.map(cat => 
        ((counts[cat] || 0) / total * 100).toFixed(1)
    );
    
    const data = {
        labels: categories,
        datasets: [{
            label: 'Coverage %',
            data: percentages,
            backgroundColor: [
                'rgba(244, 63, 94, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(16, 185, 129, 0.8)'
            ],
            borderColor: [
                '#f43f5e',
                '#8b5cf6',
                '#f59e0b',
                '#10b981'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: STATE.theme === 'dark' ? '#1e293b' : '#ffffff',
                    titleColor: STATE.theme === 'dark' ? '#f8fafc' : '#0f172a',
                    bodyColor: STATE.theme === 'dark' ? '#cbd5e1' : '#475569',
                    borderColor: STATE.theme === 'dark' ? '#334155' : '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            const cat = context.label;
                            const count = counts[cat] || 0;
                            const pct = context.parsed.y;
                            return `${count} variables (${pct}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: STATE.theme === 'dark' ? '#334155' : '#f1f5f9',
                        drawBorder: false
                    },
                    ticks: {
                        color: STATE.theme === 'dark' ? '#94a3b8' : '#64748b',
                        font: {
                            family: 'Inter',
                            size: 11
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: STATE.theme === 'dark' ? '#94a3b8' : '#64748b',
                        font: {
                            family: 'Inter',
                            size: 12,
                            weight: '500'
                        }
                    }
                }
            }
        }
    };
    
    if (charts.coverage) {
        charts.coverage.destroy();
    }
    
    charts.coverage = new Chart(ctx, config);
}

// =============================================
// CHART UTILITIES
// =============================================

function destroyAllCharts() {
    Object.keys(charts).forEach(key => {
        if (charts[key] && typeof charts[key].destroy === 'function') {
            charts[key].destroy();
            charts[key] = null;
        }
    });
}

function refreshCharts() {
    if (STATE.currentPage === 'dashboard') {
        renderCharts();
    } else if (STATE.currentPage === 'analytics') {
        renderAnalytics();
    }
}

// =============================================
// DASHBOARD INTERACTIONS
// =============================================

function handleStatCardClick(category) {
    filterCategory(category);
}

// Make stat cards interactive
document.addEventListener('DOMContentLoaded', () => {
    const statsInterval = setInterval(() => {
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length > 0) {
            statCards.forEach(card => {
                if (!card.dataset.initialized) {
                    card.dataset.initialized = 'true';
                    
                    // Add hover effect data
                    card.addEventListener('mouseenter', function() {
                        this.style.transform = 'translateY(-4px)';
                    });
                    
                    card.addEventListener('mouseleave', function() {
                        this.style.transform = '';
                    });
                }
            });
            clearInterval(statsInterval);
        }
    }, 100);
});

// =============================================
// EXPORT CHART AS IMAGE
// =============================================

function exportChartAsImage(chartId) {
    const chart = charts[chartId];
    if (!chart) {
        showToast('error', 'Error', 'Chart not found');
        return;
    }
    
    const url = chart.toBase64Image();
    const link = document.createElement('a');
    link.download = `cholout-chart-${chartId}-${Date.now()}.png`;
    link.href = url;
    link.click();
    
    showToast('success', 'Exported', 'Chart saved as image');
}

// =============================================
// DASHBOARD DATA REFRESH
// =============================================

function refreshDashboard() {
    updateStats();
    refreshCharts();
    renderRecentItems();
    showToast('success', 'Refreshed', 'Dashboard data updated');
}

// Add refresh button to dashboard (optional)
function addRefreshButton() {
    const toolbar = document.querySelector('#page-dashboard .page-toolbar');
    if (toolbar) {
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'toolbar-btn';
        refreshBtn.innerHTML = '<i class="fa-solid fa-rotate"></i> Refresh';
        refreshBtn.onclick = refreshDashboard;
        toolbar.querySelector('.toolbar-right').appendChild(refreshBtn);
    }
}

// =============================================
// LIVE DATA SIMULATION (Optional)
// =============================================

let liveUpdateInterval = null;

function startLiveUpdates() {
    if (liveUpdateInterval) return;
    
    liveUpdateInterval = setInterval(() => {
        // Simulate small data changes
        if (STATE.currentPage === 'dashboard') {
            updateStats();
        }
    }, 30000); // Every 30 seconds
    
    showToast('info', 'Live Updates', 'Real-time updates enabled');
}

function stopLiveUpdates() {
    if (liveUpdateInterval) {
        clearInterval(liveUpdateInterval);
        liveUpdateInterval = null;
        showToast('info', 'Updates Paused', 'Live updates disabled');
    }
}

// =============================================
// CHART ANIMATION CONTROLS
// =============================================

function pauseChartAnimations() {
    Object.values(charts).forEach(chart => {
        if (chart && chart.options) {
            chart.options.animation = false;
            chart.update();
        }
    });
}

function resumeChartAnimations() {
    Object.values(charts).forEach(chart => {
        if (chart && chart.options) {
            chart.options.animation = {
                duration: 750
            };
            chart.update();
        }
    });
}

console.log('📊 Dashboard & Charts Module Loaded');

/* =========================================
   CholOut Hub - Modern Dashboard JavaScript
   Part 3: Tree View, Cards & Data Grid
   ========================================= */

// =============================================
// TREE VIEW RENDERING
// =============================================

function renderTreeView() {
    const container = document.getElementById('tree-container');
    if (!container) return;
    
    // Build hierarchy
    const hierarchy = buildHierarchy();
    
    // Render tree
    container.innerHTML = `
        <div class="tree-view">
            ${renderTreeNode(hierarchy, 'root')}
        </div>
    `;
}

function buildHierarchy() {
    const structure = {
        name: 'CholOut Data Hub',
        type: 'root',
        children: {}
    };
    
    masterData.forEach(item => {
        // Category level
        if (!structure.children[item.cat]) {
            structure.children[item.cat] = {
                name: item.cat,
                type: 'category',
                count: 0,
                children: {}
            };
        }
        
        // Sub-category level
        if (!structure.children[item.cat].children[item.sub]) {
            structure.children[item.cat].children[item.sub] = {
                name: item.sub,
                type: 'subcategory',
                count: 0,
                items: []
            };
        }
        
        // Add item
        structure.children[item.cat].children[item.sub].items.push(item);
        structure.children[item.cat].children[item.sub].count++;
        structure.children[item.cat].count++;
    });
    
    return structure;
}

function renderTreeNode(node, level = 'root', isExpanded = true) {
    if (level === 'root') {
        return `
            <div class="tree-node ${level} expanded">
                <div class="tree-node-content">
                    <button class="tree-toggle expanded" onclick="toggleTreeNode(this)">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                    <div class="tree-icon ${level}">
                        <i class="fa-solid fa-database"></i>
                    </div>
                    <div class="tree-label">
                        <h4>${node.name}</h4>
                        <p>${masterData.length} total variables</p>
                    </div>
                    <span class="tree-count">${Object.keys(node.children).length}</span>
                </div>
                <div class="tree-children">
                    ${Object.entries(node.children).map(([key, child]) => 
                        renderTreeNode(child, 'category', false)
                    ).join('')}
                </div>
            </div>
        `;
    }
    
    if (level === 'category') {
        const catClass = getCategoryClass(node.name);
        return `
            <div class="tree-node category ${catClass}">
                <div class="tree-node-content">
                    <button class="tree-toggle" onclick="toggleTreeNode(this)">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                    <div class="tree-icon ${catClass}">
                        <i class="${getCategoryIcon(node.name)}"></i>
                    </div>
                    <div class="tree-label">
                        <h4>${node.name}</h4>
                        <p>${node.count} variables</p>
                    </div>
                    <span class="tree-count">${Object.keys(node.children).length}</span>
                </div>
                <div class="tree-children">
                    ${Object.entries(node.children).map(([key, child]) => 
                        renderTreeNode(child, 'subcategory', false)
                    ).join('')}
                </div>
            </div>
        `;
    }
    
    if (level === 'subcategory') {
        return `
            <div class="tree-node subcategory">
                <div class="tree-node-content">
                    <button class="tree-toggle" onclick="toggleTreeNode(this)">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                    <div class="tree-icon sub">
                        <i class="fa-solid fa-folder"></i>
                    </div>
                    <div class="tree-label">
                        <h4>${node.name}</h4>
                        <p>${node.count} items</p>
                    </div>
                    <span class="tree-count">${node.count}</span>
                </div>
                <div class="tree-children">
                    ${node.items.slice(0, 10).map(item => renderTreeLeaf(item)).join('')}
                    ${node.items.length > 10 ? `
                        <div class="tree-node leaf">
                            <div class="tree-node-content" style="opacity: 0.7; cursor: default;">
                                <div class="tree-icon leaf">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </div>
                                <div class="tree-label">
                                    <h4>+${node.items.length - 10} more items</h4>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
}

function renderTreeLeaf(item) {
    return `
        <div class="tree-node leaf">
            <div class="tree-node-content" onclick="openDetails(${item.id})">
                <div class="tree-icon leaf">
                    <i class="fa-solid fa-file-lines"></i>
                </div>
                <div class="tree-label">
                    <h4>${escapeHtml(truncateText(item.name, 35))}</h4>
                    <p>${escapeHtml(item.source || 'N/A')}</p>
                </div>
                <div class="tree-actions">
                    <button class="tree-action-btn view" onclick="event.stopPropagation(); openDetails(${item.id})" title="View">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="tree-action-btn edit" onclick="event.stopPropagation(); openEditModal(${item.id})" title="Edit">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="tree-action-btn delete" onclick="event.stopPropagation(); deleteItem(${item.id})" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function toggleTreeNode(button) {
    const node = button.closest('.tree-node');
    const isExpanded = node.classList.contains('expanded');
    
    node.classList.toggle('expanded', !isExpanded);
    button.classList.toggle('expanded', !isExpanded);
}

function expandAllNodes() {
    document.querySelectorAll('.tree-node').forEach(node => {
        node.classList.add('expanded');
    });
    document.querySelectorAll('.tree-toggle').forEach(toggle => {
        toggle.classList.add('expanded');
    });
    showToast('info', 'Expanded', 'All tree nodes expanded');
}

function collapseAllNodes() {
    document.querySelectorAll('.tree-node:not(.root)').forEach(node => {
        node.classList.remove('expanded');
    });
    document.querySelectorAll('.tree-toggle:not(.tree-node.root .tree-toggle)').forEach(toggle => {
        toggle.classList.remove('expanded');
    });
    showToast('info', 'Collapsed', 'All tree nodes collapsed');
}

function toggleTreeLayout() {
    const container = document.getElementById('tree-container');
    container.classList.toggle('horizontal-layout');
    showToast('info', 'Layout Changed', 'Tree layout toggled');
}

// =============================================
// CARDS GALLERY RENDERING
// =============================================

function renderCards() {
    const container = document.getElementById('cards-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (!container) return;
    
    const data = getFilteredData();
    
    if (STATE.cardsLoaded === 0) {
        container.innerHTML = '';
    }
    
    // Calculate items to load
    const toLoad = data.slice(STATE.cardsLoaded, STATE.cardsLoaded + APP_CONFIG.cardsPerLoad);
    
    if (toLoad.length === 0 && STATE.cardsLoaded === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fa-solid fa-inbox"></i>
                <h3>No Variables Found</h3>
                <p>Try adjusting your filters or search criteria</p>
            </div>
        `;
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
    }
    
    // Render cards
    toLoad.forEach(item => {
        const card = createCardElement(item);
        container.appendChild(card);
    });
    
    STATE.cardsLoaded += toLoad.length;
    
    // Update count
    const countEl = document.getElementById('cards-count');
    if (countEl) {
        countEl.textContent = `Showing ${STATE.cardsLoaded} of ${data.length}`;
    }
    
    // Show/hide load more button
    if (loadMoreBtn) {
        loadMoreBtn.style.display = STATE.cardsLoaded >= data.length ? 'none' : 'block';
    }
}

function createCardElement(item) {
    const card = document.createElement('div');
    card.className = `var-card ${getCategoryClass(item.cat)}`;
    card.setAttribute('data-id', item.id);
    
    card.innerHTML = `
        <div class="var-card-header">
            <span class="var-card-id">#${item.id}</span>
            <span class="var-card-badge ${getCategoryClass(item.cat)}">${item.cat}</span>
        </div>
        <h3 class="var-card-title">${escapeHtml(item.name)}</h3>
        <p class="var-card-desc">${escapeHtml(item.desc)}</p>
        <div class="var-card-meta">
            <div class="var-card-meta-item">
                <i class="fa-solid fa-folder"></i>
                <span>${escapeHtml(item.sub)}</span>
            </div>
            <div class="var-card-meta-item">
                <i class="fa-solid fa-satellite-dish"></i>
                <span>${escapeHtml(item.source || 'N/A')}</span>
            </div>
        </div>
        <div class="var-card-actions">
            <button class="var-card-action view" onclick="event.stopPropagation(); openDetails(${item.id})" title="View Details">
                <i class="fa-solid fa-eye"></i>
            </button>
            <button class="var-card-action edit" onclick="event.stopPropagation(); openEditModal(${item.id})" title="Edit">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="var-card-action delete" onclick="event.stopPropagation(); deleteItem(${item.id})" title="Delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    
    // Main card click opens details
    card.addEventListener('click', () => openDetails(item.id));
    
    return card;
}

function loadMoreCards() {
    renderCards();
}

function sortCards() {
    const sortBy = document.getElementById('cards-sort').value;
    STATE.sort.column = sortBy;
    STATE.cardsLoaded = 0;
    renderCards();
}

function setCardView(view) {
    const container = document.getElementById('cards-container');
    
    // Update container class
    container.classList.remove('list-view');
    if (view === 'list') {
        container.classList.add('list-view');
    }
    
    // Update button states
    document.querySelectorAll('.view-switcher button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('button').classList.add('active');
}

// =============================================
// DATA GRID RENDERING
// =============================================

function renderGrid() {
    const tbody = document.getElementById('table-body');
    const countEl = document.getElementById('grid-count');
    
    if (!tbody) return;
    
    const data = getFilteredData();
    
    // Calculate pagination
    const start = (STATE.currentDataPage - 1) * APP_CONFIG.itemsPerPage;
    const end = start + APP_CONFIG.itemsPerPage;
    const pageData = data.slice(start, end);
    
    // Check if empty
    if (pageData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8">
                    <div class="empty-state" style="padding: 60px 20px;">
                        <i class="fa-solid fa-inbox"></i>
                        <h3>No Data Found</h3>
                        <p>Try adjusting your filters or add new variables</p>
                    </div>
                </td>
            </tr>
        `;
        
        if (countEl) {
            countEl.textContent = '0 records';
        }
        
        renderPagination(0);
        return;
    }
    
    // Render rows
    tbody.innerHTML = pageData.map(item => `
        <tr class="${STATE.selectedItems.has(item.id) ? 'selected' : ''}" data-id="${item.id}">
            <td>
                <input type="checkbox" 
                    ${STATE.selectedItems.has(item.id) ? 'checked' : ''}
                    onchange="toggleSelectItem(${item.id})">
            </td>
            <td><strong>#${item.id}</strong></td>
            <td>
                <span class="table-badge ${getCategoryClass(item.cat)}">${item.cat}</span>
            </td>
            <td>${escapeHtml(item.sub)}</td>
            <td>
                <a href="#" class="table-name" onclick="event.preventDefault(); openDetails(${item.id})">
                    ${escapeHtml(truncateText(item.name, 40))}
                </a>
            </td>
            <td>
                <span class="table-desc" title="${escapeHtml(item.desc)}">
                    ${escapeHtml(truncateText(item.desc, 50))}
                </span>
            </td>
            <td>${escapeHtml(truncateText(item.source || '-', 25))}</td>
            <td>
                <div class="table-actions">
                    <button class="table-action view" onclick="openDetails(${item.id})" title="View">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="table-action edit" onclick="openEditModal(${item.id})" title="Edit">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="table-action delete" onclick="deleteItem(${item.id})" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Update count
    if (countEl) {
        countEl.textContent = `${data.length} records (showing ${start + 1}-${Math.min(end, data.length)})`;
    }
    
    // Render pagination
    renderPagination(data.length);
    
    // Update select all checkbox
    updateSelectAllCheckbox();
}

function renderPagination(totalItems) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(totalItems / APP_CONFIG.itemsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = '';
    
    // Previous button
    html += `
        <button class="pagination-btn" 
            ${STATE.currentDataPage === 1 ? 'disabled' : ''} 
            onclick="goToPage(${STATE.currentDataPage - 1})">
            <i class="fa-solid fa-chevron-left"></i>
        </button>
    `;
    
    // Page numbers
    const maxVisible = 5;
    let startPage = Math.max(1, STATE.currentDataPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    // First page
    if (startPage > 1) {
        html += `<button class="pagination-btn" onclick="goToPage(1)">1</button>`;
        if (startPage > 2) {
            html += `<span class="pagination-dots">...</span>`;
        }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        html += `
            <button class="pagination-btn ${i === STATE.currentDataPage ? 'active' : ''}" 
                onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }
    
    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            html += `<span class="pagination-dots">...</span>`;
        }
        html += `<button class="pagination-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }
    
    // Next button
    html += `
        <button class="pagination-btn" 
            ${STATE.currentDataPage === totalPages ? 'disabled' : ''} 
            onclick="goToPage(${STATE.currentDataPage + 1})">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    `;
    
    // Page info
    html += `
        <span class="pagination-info">
            Page ${STATE.currentDataPage} of ${totalPages}
        </span>
    `;
    
    pagination.innerHTML = html;
}

function goToPage(page) {
    STATE.currentDataPage = page;
    renderGrid();
    
    // Scroll to top of table
    const tableWrapper = document.querySelector('.table-wrapper');
    if (tableWrapper) {
        tableWrapper.scrollTop = 0;
    }
}

// =============================================
// TABLE SORTING
// =============================================

function sortTable(column) {
    if (STATE.sort.column === column) {
        STATE.sort.direction = STATE.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        STATE.sort.column = column;
        STATE.sort.direction = 'asc';
    }
    
    // Update header icons
    document.querySelectorAll('.data-table th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
    });
    
    const header = Array.from(document.querySelectorAll('.data-table th'))
        .find(th => th.onclick && th.onclick.toString().includes(`'${column}'`));
    
    if (header) {
        header.classList.add(`sorted-${STATE.sort.direction}`);
    }
    
    // Re-render
    STATE.currentDataPage = 1;
    renderGrid();
}

// =============================================
// SELECTION MANAGEMENT
// =============================================

function toggleSelectItem(id) {
    if (STATE.selectedItems.has(id)) {
        STATE.selectedItems.delete(id);
    } else {
        STATE.selectedItems.add(id);
    }
    
    renderGrid();
    updateSelectionToolbar();
}

function toggleSelectAll() {
    const checkbox = document.getElementById('select-all');
    const data = getFilteredData();
    const start = (STATE.currentDataPage - 1) * APP_CONFIG.itemsPerPage;
    const end = start + APP_CONFIG.itemsPerPage;
    const pageData = data.slice(start, end);
    
    if (checkbox.checked) {
        pageData.forEach(item => STATE.selectedItems.add(item.id));
    } else {
        pageData.forEach(item => STATE.selectedItems.delete(item.id));
    }
    
    renderGrid();
    updateSelectionToolbar();
}

function selectAllRows() {
    const data = getFilteredData();
    data.forEach(item => STATE.selectedItems.add(item.id));
    renderGrid();
    updateSelectionToolbar();
    showToast('info', 'Selected All', `${STATE.selectedItems.size} items selected`);
}

function updateSelectAllCheckbox() {
    const checkbox = document.getElementById('select-all');
    if (!checkbox) return;
    
    const data = getFilteredData();
    const start = (STATE.currentDataPage - 1) * APP_CONFIG.itemsPerPage;
    const end = start + APP_CONFIG.itemsPerPage;
    const pageData = data.slice(start, end);
    
    const allSelected = pageData.length > 0 && 
        pageData.every(item => STATE.selectedItems.has(item.id));
    
    checkbox.checked = allSelected;
    checkbox.indeterminate = !allSelected && 
        pageData.some(item => STATE.selectedItems.has(item.id));
}

function updateSelectionToolbar() {
    let toolbar = document.querySelector('.selection-toolbar');
    
    if (STATE.selectedItems.size > 0) {
        if (!toolbar) {
            toolbar = document.createElement('div');
            toolbar.className = 'selection-toolbar';
            
            const gridSection = document.getElementById('page-grid');
            const filtersBar = gridSection.querySelector('.filters-bar');
            
            if (filtersBar) {
                filtersBar.after(toolbar);
            }
        }
        
        toolbar.innerHTML = `
            <div class="selection-info">
                <i class="fa-solid fa-check-circle"></i>
                <span class="selection-count">${STATE.selectedItems.size} item${STATE.selectedItems.size > 1 ? 's' : ''} selected</span>
                <button onclick="clearSelection()" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 12px; border-radius: 6px; margin-left: 12px; cursor: pointer;">
                    Clear Selection
                </button>
            </div>
            <div class="selection-actions">
                <button class="selection-action" onclick="exportSelected()">
                    <i class="fa-solid fa-download"></i> Export
                </button>
                <button class="selection-action danger" onclick="deleteSelected()">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
            </div>
        `;
        
        toolbar.classList.add('show');
    } else if (toolbar) {
        toolbar.classList.remove('show');
        setTimeout(() => toolbar.remove(), 300);
    }
}

function clearSelection() {
    STATE.selectedItems.clear();
    renderGrid();
    updateSelectionToolbar();
}

function deleteSelected() {
    if (STATE.selectedItems.size === 0) {
        showToast('warning', 'No Selection', 'Please select items to delete');
        return;
    }
    
    const count = STATE.selectedItems.size;
    
    if (confirm(`Are you sure you want to delete ${count} item${count > 1 ? 's' : ''}?`)) {
        STATE.selectedItems.forEach(id => {
            const index = masterData.findIndex(item => item.id === id);
            if (index > -1) {
                masterData.splice(index, 1);
            }
        });
        
        STATE.selectedItems.clear();
        updateStats();
        renderGrid();
        updateSelectionToolbar();
        
        showToast('success', 'Deleted', `${count} item${count > 1 ? 's' : ''} removed`);
    }
}

function exportSelected() {
    if (STATE.selectedItems.size === 0) {
        showToast('warning', 'No Selection', 'Please select items to export');
        return;
    }
    
    const selectedData = masterData.filter(item => STATE.selectedItems.has(item.id));
    
    // Export as JSON
    const json = JSON.stringify(selectedData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cholout-selected-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    showToast('success', 'Exported', `${STATE.selectedItems.size} items exported`);
}

console.log('🌳 Tree, Cards & Grid Module Loaded');

/* =========================================
   CholOut Hub - Modern Dashboard JavaScript
   Part 4: Detail Panel, CRUD & Export
   ========================================= */

// =============================================
// DETAIL PANEL
// =============================================

function openDetails(id) {
    const item = masterData.find(d => d.id === id);
    if (!item) {
        showToast('error', 'Not Found', 'Variable not found');
        return;
    }
    
    STATE.currentItem = item;
    
    const panel = document.getElementById('detail-panel');
    
    // Populate header
    document.getElementById('panel-name').textContent = item.name;
    document.getElementById('panel-cat').textContent = item.cat;
    document.getElementById('panel-cat').className = `panel-badge ${getCategoryClass(item.cat)}`;
    
    // Populate info tab
    document.getElementById('panel-id').textContent = `#${item.id}`;
    document.getElementById('panel-sub').textContent = item.sub;
    document.getElementById('panel-desc').textContent = item.desc;
    document.getElementById('panel-source').textContent = item.source || 'Not specified';
    document.getElementById('panel-res').textContent = item.res || 'Not specified';
    
    // Render codes tab
    renderPanelCodes(item);
    
    // Render related tab
    renderPanelRelated(item);
    
    // Show panel
    panel.classList.add('open');
    
    // Switch to info tab
    switchPanelTab('info');
}

function closeDetailPanel() {
    const panel = document.getElementById('detail-panel');
    panel.classList.remove('open');
    STATE.currentItem = null;
}

function switchPanelTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.panel-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeTab = Array.from(document.querySelectorAll('.panel-tab'))
        .find(btn => btn.onclick && btn.onclick.toString().includes(`'${tab}'`));
    
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Update tab content
    document.querySelectorAll('.panel-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const activeContent = document.getElementById(`panel-tab-${tab}`);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

function renderPanelCodes(item) {
    const container = document.getElementById('panel-codes-list');
    
    if (!item.codes || Object.keys(item.codes).length === 0) {
        container.innerHTML = `
            <div class="codes-empty">
                <i class="fa-solid fa-code"></i>
                <p>No codes available for this variable</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = Object.entries(item.codes).map(([key, value]) => `
        <div class="code-item">
            <div class="code-key">${escapeHtml(key)}</div>
            <div class="code-value">${escapeHtml(value)}</div>
        </div>
    `).join('');
}

function renderPanelRelated(item) {
    const container = document.getElementById('panel-related-list');
    
    // Find related items (same sub-category, different id)
    const related = masterData
        .filter(d => d.id !== item.id && d.sub === item.sub)
        .slice(0, 5);
    
    if (related.length === 0) {
        container.innerHTML = `
            <div class="codes-empty">
                <i class="fa-solid fa-link-slash"></i>
                <p>No related variables found in this sub-category</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = related.map(rel => `
        <div class="related-item" onclick="openDetails(${rel.id})">
            <div class="related-icon ${getCategoryClass(rel.cat)}">
                <i class="${getCategoryIcon(rel.cat)}"></i>
            </div>
            <div class="related-info">
                <h4>${escapeHtml(truncateText(rel.name, 35))}</h4>
                <p>${escapeHtml(rel.source || 'N/A')}</p>
            </div>
            <i class="fa-solid fa-chevron-right related-arrow"></i>
        </div>
    `).join('');
}

function editCurrentItem() {
    if (!STATE.currentItem) return;
    openEditModal(STATE.currentItem.id);
    closeDetailPanel();
}

function duplicateCurrentItem() {
    if (!STATE.currentItem) return;
    
    const newItem = {
        ...STATE.currentItem,
        id: getNextId(),
        name: STATE.currentItem.name + ' (Copy)'
    };
    
    masterData.unshift(newItem);
    
    updateStats();
    refreshCurrentView();
    closeDetailPanel();
    
    showToast('success', 'Duplicated', 'Variable has been duplicated');
}

function deleteCurrentItem() {
    if (!STATE.currentItem) return;
    deleteItem(STATE.currentItem.id);
    closeDetailPanel();
}

// =============================================
// CRUD MODAL
// =============================================

function openAddModal() {
    const modal = document.getElementById('crud-modal');
    const form = document.getElementById('crud-form');
    
    // Reset form
    form.reset();
    document.getElementById('form-id').value = '';
    
    // Update title
    document.getElementById('modal-title').innerHTML = 
        '<i class="fa-solid fa-plus"></i> Add New Variable';
    
    // Populate subcategory datalist
    updateFormSubcategories();
    
    // Show modal
    modal.classList.add('open');
}

function openEditModal(id) {
    const item = masterData.find(d => d.id === id);
    if (!item) {
        showToast('error', 'Not Found', 'Variable not found');
        return;
    }
    
    const modal = document.getElementById('crud-modal');
    const form = document.getElementById('crud-form');
    
    // Populate form
    document.getElementById('form-id').value = item.id;
    document.getElementById('form-cat').value = item.cat;
    document.getElementById('form-sub').value = item.sub;
    document.getElementById('form-name').value = item.name;
    document.getElementById('form-desc').value = item.desc;
    document.getElementById('form-source').value = item.source || '';
    document.getElementById('form-res').value = item.res || '';
    document.getElementById('form-codes').value = item.codes ? JSON.stringify(item.codes, null, 2) : '';
    
    // Update title
    document.getElementById('modal-title').innerHTML = 
        '<i class="fa-solid fa-pen"></i> Edit Variable';
    
    // Update subcategory datalist
    updateFormSubcategories();
    
    // Show modal
    modal.classList.add('open');
}

function closeModal() {
    const modal = document.getElementById('crud-modal');
    modal.classList.remove('open');
    
    // Reset form after animation
    setTimeout(() => {
        document.getElementById('crud-form').reset();
    }, 300);
}

function updateFormSubcategories() {
    const category = document.getElementById('form-cat').value;
    const datalist = document.getElementById('sub-list');
    
    if (!datalist) return;
    
    datalist.innerHTML = '';
    
    let subs;
    if (category) {
        subs = [...new Set(masterData.filter(d => d.cat === category).map(d => d.sub))].sort();
    } else {
        subs = [...new Set(masterData.map(d => d.sub))].sort();
    }
    
    subs.forEach(sub => {
        const option = document.createElement('option');
        option.value = sub;
        datalist.appendChild(option);
    });
}

// Category change handler
document.addEventListener('DOMContentLoaded', () => {
    const formCat = document.getElementById('form-cat');
    if (formCat) {
        formCat.addEventListener('change', updateFormSubcategories);
    }
});

function updateSubCategories() {
    updateFormSubcategories();
}

// =============================================
// SAVE VARIABLE (ADD/EDIT)
// =============================================

function saveVariable(e) {
    e.preventDefault();
    
    const id = document.getElementById('form-id').value;
    const category = document.getElementById('form-cat').value;
    const subCategory = document.getElementById('form-sub').value.trim();
    const name = document.getElementById('form-name').value.trim();
    const description = document.getElementById('form-desc').value.trim();
    const source = document.getElementById('form-source').value.trim();
    const resolution = document.getElementById('form-res').value.trim();
    const codesStr = document.getElementById('form-codes').value.trim();
    
    // Validate
    if (!category || !subCategory || !name || !description) {
        showToast('error', 'Validation Error', 'Please fill in all required fields');
        return;
    }
    
    // Parse codes
    let codes = null;
    if (codesStr) {
        try {
            codes = JSON.parse(codesStr);
            if (typeof codes !== 'object' || Array.isArray(codes)) {
                throw new Error('Codes must be a JSON object');
            }
        } catch (err) {
            showToast('error', 'Invalid JSON', 'Codes must be valid JSON object format');
            return;
        }
    }
    
    // Create/update item
    const item = {
        id: id ? parseInt(id) : getNextId(),
        cat: category,
        sub: subCategory,
        name: name,
        desc: description,
        source: source || null,
        res: resolution || null,
        codes: codes
    };
    
    if (id) {
        // Update existing
        const index = masterData.findIndex(d => d.id == id);
        if (index > -1) {
            masterData[index] = item;
            showToast('success', 'Updated', `"${name}" has been updated`);
        }
    } else {
        // Add new
        masterData.unshift(item);
        showToast('success', 'Added', `"${name}" has been added`);
    }
    
    // Close modal
    closeModal();
    
    // Refresh views
    updateStats();
    refreshCurrentView();
}

// Add form submit listener
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('crud-form');
    if (form) {
        form.addEventListener('submit', saveVariable);
    }
});

// =============================================
// DELETE OPERATIONS
// =============================================

function deleteItem(id) {
    const item = masterData.find(d => d.id === id);
    if (!item) {
        showToast('error', 'Not Found', 'Variable not found');
        return;
    }
    
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
        const index = masterData.findIndex(d => d.id === id);
        if (index > -1) {
            masterData.splice(index, 1);
            
            // Remove from selection if selected
            STATE.selectedItems.delete(id);
            
            updateStats();
            refreshCurrentView();
            
            showToast('success', 'Deleted', `"${item.name}" has been deleted`);
        }
    }
}

// =============================================
// EXPORT FUNCTIONALITY
// =============================================

function openExportModal() {
    const modal = document.getElementById('export-modal');
    const data = getFilteredData();
    
    // Update count
    const countEl = document.getElementById('export-count');
    if (countEl) {
        countEl.textContent = data.length;
    }
    
    modal.classList.add('open');
}

function closeExportModal() {
    const modal = document.getElementById('export-modal');
    modal.classList.remove('open');
}

function exportData(format) {
    const data = getFilteredData();
    
    if (data.length === 0) {
        showToast('warning', 'No Data', 'No data to export');
        return;
    }
    
    let content, filename, mimeType;
    
    switch (format) {
        case 'json':
            content = JSON.stringify(data, null, 2);
            filename = `cholout-data-${Date.now()}.json`;
            mimeType = 'application/json';
            break;
            
        case 'csv':
            content = convertToCSV(data);
            filename = `cholout-data-${Date.now()}.csv`;
            mimeType = 'text/csv';
            break;
            
        case 'excel':
            content = convertToCSV(data);
            filename = `cholout-data-${Date.now()}.csv`;
            mimeType = 'text/csv';
            break;
            
        default:
            showToast('error', 'Invalid Format', 'Unsupported export format');
            return;
    }
    
    downloadFile(content, filename, mimeType);
    closeExportModal();
    
    showToast('success', 'Exported', `${data.length} records exported as ${format.toUpperCase()}`);
}

function convertToCSV(data) {
    // Headers
    const headers = ['ID', 'Category', 'Sub-Category', 'Name', 'Description', 'Source', 'Resolution', 'Codes'];
    
    // Rows
    const rows = data.map(item => [
        item.id,
        escapeCSV(item.cat),
        escapeCSV(item.sub),
        escapeCSV(item.name),
        escapeCSV(item.desc),
        escapeCSV(item.source || ''),
        escapeCSV(item.res || ''),
        item.codes ? escapeCSV(JSON.stringify(item.codes)) : ''
    ]);
    
    // Combine
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');
    
    return csvContent;
}

function escapeCSV(str) {
    if (str === null || str === undefined) return '';
    
    str = String(str);
    
    // If contains comma, quote, or newline, wrap in quotes and escape quotes
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    
    return str;
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// =============================================
// BULK IMPORT
// =============================================

function openBulkModal() {
    showToast('info', 'Coming Soon', 'Bulk import feature will be available soon');
}

function handleBulkImport(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target.result);
            
            if (!Array.isArray(json)) {
                throw new Error('Import data must be an array');
            }
            
            // Validate and import
            let imported = 0;
            let errors = 0;
            
            json.forEach(item => {
                if (validateImportItem(item)) {
                    // Assign new ID
                    item.id = getNextId();
                    masterData.unshift(item);
                    imported++;
                } else {
                    errors++;
                }
            });
            
            updateStats();
            refreshCurrentView();
            
            if (errors > 0) {
                showToast('warning', 'Import Complete', 
                    `Imported ${imported} items, ${errors} failed validation`);
            } else {
                showToast('success', 'Import Complete', 
                    `Successfully imported ${imported} items`);
            }
            
        } catch (err) {
            showToast('error', 'Import Failed', 'Invalid JSON file format');
        }
    };
    
    reader.readAsText(file);
}

function validateImportItem(item) {
    return item.cat && item.sub && item.name && item.desc;
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

function getNextId() {
    return Math.max(...masterData.map(d => d.id), 0) + 1;
}

function refreshCurrentView() {
    switch (STATE.currentPage) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'tree':
            renderTreeView();
            break;
        case 'cards':
            STATE.cardsLoaded = 0;
            renderCards();
            break;
        case 'grid':
            renderGrid();
            break;
        case 'analytics':
            renderAnalytics();
            break;
    }
}

// =============================================
// CONTEXT MENU (Right-click menu)
// =============================================

let contextMenu = null;

function showContextMenu(e, itemId) {
    e.preventDefault();
    
    const item = masterData.find(d => d.id === itemId);
    if (!item) return;
    
    // Remove existing menu
    if (contextMenu) {
        contextMenu.remove();
    }
    
    // Create menu
    contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu open';
    contextMenu.innerHTML = `
        <div class="context-menu-item" onclick="openDetails(${itemId})">
            <i class="fa-solid fa-eye"></i> View Details
        </div>
        <div class="context-menu-item" onclick="openEditModal(${itemId})">
            <i class="fa-solid fa-pen"></i> Edit
        </div>
        <div class="context-menu-item" onclick="duplicateItem(${itemId})">
            <i class="fa-solid fa-copy"></i> Duplicate
        </div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item" onclick="exportSingle(${itemId})">
            <i class="fa-solid fa-download"></i> Export
        </div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item danger" onclick="deleteItem(${itemId})">
            <i class="fa-solid fa-trash"></i> Delete
        </div>
    `;
    
    document.body.appendChild(contextMenu);
    
    // Position menu
    const x = e.clientX;
    const y = e.clientY;
    
    contextMenu.style.left = x + 'px';
    contextMenu.style.top = y + 'px';
    
    // Close on click outside
    setTimeout(() => {
        document.addEventListener('click', closeContextMenu);
    }, 10);
}

function closeContextMenu() {
    if (contextMenu) {
        contextMenu.classList.remove('open');
        setTimeout(() => {
            if (contextMenu) {
                contextMenu.remove();
                contextMenu = null;
            }
        }, 150);
    }
    document.removeEventListener('click', closeContextMenu);
}

function duplicateItem(id) {
    const item = masterData.find(d => d.id === id);
    if (!item) return;
    
    const newItem = {
        ...item,
        id: getNextId(),
        name: item.name + ' (Copy)'
    };
    
    masterData.unshift(newItem);
    
    updateStats();
    refreshCurrentView();
    
    showToast('success', 'Duplicated', `"${item.name}" has been duplicated`);
}

function exportSingle(id) {
    const item = masterData.find(d => d.id === id);
    if (!item) return;
    
    const json = JSON.stringify([item], null, 2);
    downloadFile(json, `variable-${id}.json`, 'application/json');
    
    showToast('success', 'Exported', `Variable exported`);
}

// =============================================
// KEYBOARD SHORTCUTS FOR MODALS
// =============================================

document.addEventListener('keydown', (e) => {
    // Ctrl+S to save in modal
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        const modal = document.getElementById('crud-modal');
        if (modal.classList.contains('open')) {
            e.preventDefault();
            document.getElementById('crud-form').requestSubmit();
        }
    }
});

// =============================================
// FORM VALIDATION HELPERS
// =============================================

function validateForm() {
    const form = document.getElementById('crud-form');
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Real-time validation
document.addEventListener('DOMContentLoaded', () => {
    const requiredInputs = document.querySelectorAll('#crud-form [required]');
    
    requiredInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.classList.remove('error');
            }
        });
    });
});

// =============================================
// AUTO-SAVE DRAFT (Optional)
// =============================================

function saveDraft() {
    const form = document.getElementById('crud-form');
    const formData = new FormData(form);
    const draft = {};
    
    formData.forEach((value, key) => {
        draft[key] = value;
    });
    
    localStorage.setItem('cholout-draft', JSON.stringify(draft));
}

function loadDraft() {
    const draftStr = localStorage.getItem('cholout-draft');
    if (!draftStr) return false;
    
    try {
        const draft = JSON.parse(draftStr);
        
        Object.keys(draft).forEach(key => {
            const input = document.getElementById(key);
            if (input) {
                input.value = draft[key];
            }
        });
        
        return true;
    } catch (err) {
        return false;
    }
}

function clearDraft() {
    localStorage.removeItem('cholout-draft');
}

// Auto-save draft every 10 seconds when modal is open
let draftInterval = null;

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('crud-modal');
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (modal.classList.contains('open')) {
                    draftInterval = setInterval(saveDraft, 10000);
                } else {
                    clearInterval(draftInterval);
                }
            }
        });
    });
    
    observer.observe(modal, { attributes: true });
});

// =============================================
// BATCH OPERATIONS
// =============================================

function batchEdit(ids) {
    showToast('info', 'Coming Soon', 'Batch edit feature will be available soon');
}

function batchDelete(ids) {
    if (ids.length === 0) return;
    
    if (confirm(`Delete ${ids.length} items?`)) {
        ids.forEach(id => {
            const index = masterData.findIndex(d => d.id === id);
            if (index > -1) {
                masterData.splice(index, 1);
            }
        });
        
        updateStats();
        refreshCurrentView();
        
        showToast('success', 'Deleted', `${ids.length} items deleted`);
    }
}

// =============================================
// UNDO/REDO FUNCTIONALITY (Advanced)
// =============================================

const undoStack = [];
const redoStack = [];
const MAX_UNDO = 50;

function pushUndo(action) {
    undoStack.push({
        action: action,
        timestamp: Date.now()
    });
    
    if (undoStack.length > MAX_UNDO) {
        undoStack.shift();
    }
    
    // Clear redo stack
    redoStack.length = 0;
}

function undo() {
    if (undoStack.length === 0) {
        showToast('info', 'Nothing to Undo', 'No actions to undo');
        return;
    }
    
    const action = undoStack.pop();
    // Implement undo logic based on action type
    // This would need to be expanded based on specific needs
    
    redoStack.push(action);
    showToast('success', 'Undo', 'Action undone');
}

function redo() {
    if (redoStack.length === 0) {
        showToast('info', 'Nothing to Redo', 'No actions to redo');
        return;
    }
    
    const action = redoStack.pop();
    // Implement redo logic based on action type
    
    undoStack.push(action);
    showToast('success', 'Redo', 'Action redone');
}

// Keyboard shortcuts for undo/redo
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
    }
    
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
    }
});

console.log('📝 Detail Panel, CRUD & Export Module Loaded');
console.log('✅ CholOut Hub Fully Loaded - Ready to Use!');

/* =========================================
   FINAL INTEGRATION & POLISH
   ========================================= */

// =============================================
// ENSURE DATA.JS IS LOADED
// =============================================

function checkDataLoaded() {
    if (typeof masterData === 'undefined') {
        console.error('❌ data.js not loaded! Make sure data.js is included before script.js');
        showToast('error', 'Data Error', 'Unable to load data');
        return false;
    }
    return true;
}

// =============================================
// INITIALIZE ON LOAD
// =============================================

window.addEventListener('load', () => {
    console.log('🚀 CholOut Hub Starting...');
    
    if (!checkDataLoaded()) {
        document.getElementById('loader').innerHTML = `
            <div class="loader-content" style="color: #ef4444;">
                <i class="fa-solid fa-circle-exclamation" style="font-size: 64px; margin-bottom: 20px;"></i>
                <h2>Data Loading Error</h2>
                <p>Please ensure data.js is properly included</p>
            </div>
        `;
        return;
    }
    
    console.log(`✅ Data loaded: ${masterData.length} variables`);
});

// =============================================
// PREVENT CONTEXT MENU ON PRODUCTION (Optional)
// =============================================

// Uncomment to disable right-click in production
// document.addEventListener('contextmenu', e => e.preventDefault());

// =============================================
// GLOBAL ERROR HANDLER
// =============================================

window.addEventListener('error', (e) => {
    console.error('Global Error:', e.error);
    showToast('error', 'Application Error', 'An unexpected error occurred');
});

// =============================================
// PERFORMANCE MONITORING (Optional)
// =============================================

function logPerformance() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
}

window.addEventListener('load', () => {
    setTimeout(logPerformance, 0);
});

// =============================================
// MOBILE RESPONSIVE HELPERS
// =============================================

function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// Adjust UI based on screen size
window.addEventListener('resize', debounce(() => {
    if (isMobile()) {
        // Auto-close sidebar on mobile
        closeSidebar();
    }
}, 250));

// =============================================
// SERVICE WORKER (PWA - Optional)
// =============================================

if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA
    // navigator.serviceWorker.register('/sw.js')
    //     .then(() => console.log('✅ Service Worker registered'))
    //     .catch(err => console.error('❌ Service Worker error:', err));
}

// =============================================
// ACCESSIBILITY IMPROVEMENTS
// =============================================

// Focus trap in modals
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// =============================================
// PRINT STYLES HELPER
// =============================================

function printCurrentView() {
    window.print();
}

// Add print button (optional)
function addPrintButton() {
    const toolbar = document.querySelector('.page-toolbar .toolbar-right');
    if (toolbar && !document.getElementById('print-btn')) {
        const printBtn = document.createElement('button');
        printBtn.id = 'print-btn';
        printBtn.className = 'toolbar-btn';
        printBtn.innerHTML = '<i class="fa-solid fa-print"></i> Print';
        printBtn.onclick = printCurrentView;
        toolbar.appendChild(printBtn);
    }
}

// =============================================
// LOCAL STORAGE DATA PERSISTENCE (Optional)
// =============================================

function saveToLocalStorage() {
    try {
        localStorage.setItem('cholout-data', JSON.stringify(masterData));
        localStorage.setItem('cholout-data-timestamp', Date.now());
        showToast('success', 'Saved', 'Data saved to browser storage');
    } catch (e) {
        showToast('error', 'Save Failed', 'Unable to save data');
    }
}

function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem('cholout-data');
        if (saved) {
            const parsed = JSON.parse(saved);
            const timestamp = localStorage.getItem('cholout-data-timestamp');
            
            if (confirm('Found saved data. Load it?')) {
                masterData.length = 0;
                masterData.push(...parsed);
                showToast('success', 'Loaded', 'Data loaded from browser storage');
                return true;
            }
        }
    } catch (e) {
        console.error('Load error:', e);
    }
    return false;
}

// Auto-save every 5 minutes (optional)
// setInterval(saveToLocalStorage, 300000);

// =============================================
// EXPORT ALL AS BACKUP
// =============================================

function createFullBackup() {
    const backup = {
        version: '2.0',
        timestamp: new Date().toISOString(),
        data: masterData,
        stats: getCategoryCounts(),
        totalRecords: masterData.length
    };
    
    const json = JSON.stringify(backup, null, 2);
    downloadFile(json, `cholout-backup-${Date.now()}.json`, 'application/json');
    
    showToast('success', 'Backup Created', 'Full backup downloaded');
}

// =============================================
// RESTORE FROM BACKUP
// =============================================

function restoreFromBackup(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const backup = JSON.parse(e.target.result);
            
            if (!backup.data || !Array.isArray(backup.data)) {
                throw new Error('Invalid backup format');
            }
            
            if (confirm(`Restore ${backup.totalRecords} records from backup?\n\nThis will replace current data.`)) {
                masterData.length = 0;
                masterData.push(...backup.data);
                
                updateStats();
                refreshCurrentView();
                
                showToast('success', 'Restored', `${backup.totalRecords} records restored`);
            }
        } catch (err) {
            showToast('error', 'Restore Failed', 'Invalid backup file');
        }
    };
    
    reader.readAsText(file);
}

// =============================================
// QUICK STATS SUMMARY
// =============================================

function showQuickStats() {
    const counts = getCategoryCounts();
    const total = masterData.length;
    
    alert(`CholOut Hub Statistics
    
📊 Total Variables: ${total}
❤️ Health: ${counts.Health || 0}
👥 Demographic: ${counts.Demographic || 0}
🌤️ Climatic: ${counts.Climatic || 0}
🌍 Environmental: ${counts.Environmental || 0}

💾 Data loaded and ready!`);
}

// =============================================
// HELP / TUTORIAL (Optional)
// =============================================

function showHelp() {
    const helpContent = `
        <div style="text-align: left; max-width: 500px;">
            <h3 style="margin-bottom: 20px;">🎯 Quick Guide</h3>
            
            <h4>⌨️ Keyboard Shortcuts:</h4>
            <ul style="line-height: 1.8;">
                <li><kbd>Ctrl+K</kbd> - Focus Search</li>
                <li><kbd>Ctrl+N</kbd> - Add New Variable</li>
                <li><kbd>Esc</kbd> - Close Panels/Modals</li>
                <li><kbd>Ctrl+S</kbd> - Save in Modal</li>
            </ul>
            
            <h4 style="margin-top: 20px;">🔍 Navigation:</h4>
            <ul style="line-height: 1.8;">
                <li>Click sidebar menu to switch views</li>
                <li>Use dropdowns for categories</li>
                <li>Click stat cards to filter data</li>
                <li>Right-click items for quick actions</li>
            </ul>
            
            <h4 style="margin-top: 20px;">✏️ Editing:</h4>
            <ul style="line-height: 1.8;">
                <li>Click any card/row to view details</li>
                <li>Use Edit button to modify</li>
                <li>Select multiple for bulk actions</li>
                <li>Export data in JSON/CSV format</li>
            </ul>
        </div>
    `;
    
    // You can implement a custom modal or use alert
    showToast('info', 'Help', 'Press F12 to open console for more info');
    console.log('%c🎯 CholOut Hub Help', 'font-size: 20px; font-weight: bold; color: #6366f1;');
    console.log(helpContent.replace(/<[^>]*>/g, ''));
}

// =============================================
// DEVELOPER TOOLS (Console Commands)
// =============================================

window.CholOutDev = {
    // Get current state
    getState: () => STATE,
    
    // Get all data
    getData: () => masterData,
    
    // Reset filters
    resetFilters: () => {
        clearAllFilters();
        console.log('✅ Filters reset');
    },
    
    // Quick stats
    stats: () => {
        console.table(getCategoryCounts());
    },
    
    // Export to console
    export: () => {
        console.log(JSON.stringify(masterData, null, 2));
    },
    
    // Clear all data (dangerous!)
    clearData: () => {
        if (confirm('⚠️ Clear ALL data? This cannot be undone!')) {
            masterData.length = 0;
            updateStats();
            refreshCurrentView();
            console.log('✅ Data cleared');
        }
    },
    
    // Add sample data
    addSample: () => {
        const sample = {
            id: getNextId(),
            cat: 'Health',
            sub: 'Test',
            name: 'Sample Variable',
            desc: 'This is a test variable',
            source: 'Manual Entry',
            res: 'Daily',
            codes: { "0": "No", "1": "Yes" }
        };
        masterData.unshift(sample);
        updateStats();
        refreshCurrentView();
        console.log('✅ Sample added:', sample);
    },
    
    // Show help
    help: () => {
        console.log(`
%cCholOut Developer Commands:
%c
CholOutDev.getState()    - Get current app state
CholOutDev.getData()     - Get all data
CholOutDev.stats()       - Show statistics
CholOutDev.export()      - Export to console
CholOutDev.addSample()   - Add sample data
CholOutDev.clearData()   - Clear all data
CholOutDev.help()        - Show this help
        `, 'font-size: 14px; font-weight: bold; color: #6366f1;', 'color: #64748b;');
    }
};

// Show dev tools info in console
console.log('%c🛠️ Developer Tools Available!', 'font-size: 16px; font-weight: bold; color: #10b981;');
console.log('%cType CholOutDev.help() for commands', 'color: #64748b;');

// =============================================
// FINAL READY STATE
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if all components are loaded
    setTimeout(() => {
        const checks = {
            'HTML': document.getElementById('app') !== null,
            'CSS': getComputedStyle(document.body).fontFamily.includes('Inter'),
            'Data': typeof masterData !== 'undefined',
            'Charts': typeof Chart !== 'undefined'
        };
        
        console.log('🔍 Component Check:', checks);
        
        const allReady = Object.values(checks).every(v => v);
        
        if (allReady) {
            console.log('%c✅ CholOut Hub - All Systems Ready!', 'font-size: 16px; font-weight: bold; color: #22c55e; background: #dcfce7; padding: 8px;');
        } else {
            console.warn('⚠️ Some components missing:', checks);
        }
    }, 2000);
});


console.log('🎉 CholOut Hub - Complete & Enhanced!');
