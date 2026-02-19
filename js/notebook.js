/**
 * NOTEBOOK MODULE
 * Handles the Notebook feature with tabs and text content
 * Integrates with existing storage system
 */

(function () {
    'use strict';

    // Notebook state
    let notebook = null;
    let currentTabId = null;
    let isEditMode = false;
    let modalElement = null;

    /**
     * Initialize the Notebook
     */
    function init() {
        // Load notebook from localStorage
        loadNotebook();

        // Setup event listeners
        setupEventListeners();
    }

    /**
     * Load notebook from localStorage
     */
    function loadNotebook() {
        const stored = localStorage.getItem('plannedWeek_notebook');

        if (stored) {
            try {
                notebook = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to load notebook:', e);
                notebook = createDefaultNotebook();
            }
        } else {
            notebook = createDefaultNotebook();
            saveNotebook();
        }

        // Set active tab
        if (notebook.activeTabId && notebook.tabs.find(t => t.id === notebook.activeTabId)) {
            currentTabId = notebook.activeTabId;
        } else {
            currentTabId = notebook.tabs[0].id;
            notebook.activeTabId = currentTabId;
            saveNotebook();
        }
    }

    /**
     * Create default notebook structure
     */
    function createDefaultNotebook() {
        const lang = document.documentElement.getAttribute('lang') || 'ar';
        const defaultName = lang === 'ar' ? 'صفحة 1' : 'Page 1';

        const firstTab = {
            id: generateId('tab'),
            name: defaultName,
            content: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return {
            tabs: [firstTab],
            activeTabId: firstTab.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    /**
     * Generate unique ID
     */
    function generateId(prefix) {
        const timestamp = Date.now().toString(36);
        const randomPart = Math.random().toString(36).substring(2, 9);
        return `${prefix}_${timestamp}_${randomPart}`;
    }

    /**
     * Save notebook to localStorage
     */
    function saveNotebook() {
        notebook.updatedAt = new Date().toISOString();
        localStorage.setItem('plannedWeek_notebook', JSON.stringify(notebook));
    }

    /**
     * Setup event listeners for Notebook button
     */
    function setupEventListeners() {
        const notebookBtn = document.getElementById('btnNotebook');
        if (notebookBtn) {
            notebookBtn.addEventListener('click', openNotebook);
        }
    }

    /**
     * Open the Notebook modal
     */
    function openNotebook() {
        const currentTab = getCurrentTab();
        // Automatically enter edit mode if content is empty
        isEditMode = (!currentTab || !currentTab.content.trim());
        renderModal();
    }

    /**
     * Close the Notebook modal
     */
    function closeNotebook() {
        if (modalElement) {
            modalElement.remove();
            modalElement = null;
        }
    }

    /**
     * Render the Notebook modal
     */
    function renderModal() {
        // Remove existing modal if any
        if (modalElement) {
            modalElement.remove();
        }

        const currentTab = getCurrentTab();
        const lang = document.documentElement.getAttribute('lang') || 'ar';
        const isRTL = lang === 'ar';

        // Create modal HTML
        const modalHTML = `
            <div class="modal-overlay" id="notebookModal">
                <div class="modal-container notebook-modal">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h2>${isRTL ? 'دفتر الملاحظات' : 'Notebook'}</h2>
                        <button class="modal-close" id="btnCloseNotebook" aria-label="Close">
                            <svg viewBox="0 0 16 16" width="16" height="16">
                                <path fill="currentColor"
                                    d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z">
                                </path>
                            </svg>
                        </button>
                    </div>

                    <!-- Tabs Navigation -->
                    <div class="notebook-tabs">
                        <div class="notebook-tabs-list" id="notebookTabsList">
                            ${renderTabs()}
                        </div>
                        <button class="notebook-tab-add" id="btnAddTab" title="${isRTL ? 'إضافة صفحة جديدة' : 'Add new page'}">
                            <svg viewBox="0 0 16 16" width="16" height="16">
                                <path fill="currentColor" d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Modal Body -->
                    <div class="modal-body notebook-body">
                        <div class="notebook-textarea-container">
                            <button class="notebook-copy-btn" id="btnCopyNotebook" title="${isRTL ? 'نسخ النص' : 'Copy Text'}">
                                <svg viewBox="0 0 16 16" width="14" height="14">
                                    <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                                    <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                                </svg>
                            </button>
                            <textarea 
                                class="notebook-textarea" 
                                id="notebookTextarea"
                                ${isEditMode ? '' : 'readonly'}
                                placeholder="${isRTL ? 'اكتب ملاحظاتك هنا...' : 'Write your notes here...'}"
                            >${currentTab ? escapeHtml(currentTab.content) : ''}</textarea>
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div class="modal-footer notebook-footer">
                        ${isEditMode
                ? `<button class="gh-btn gh-btn-primary" id="btnSaveNotebook">${isRTL ? 'حفظ' : 'Save'}</button>`
                : `<button class="gh-btn" id="btnEditNotebook">${isRTL ? 'تعديل النص' : 'Edit Text'}</button>`
            }
                    </div>
                </div>
            </div>
        `;

        // Insert modal into DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        modalElement = document.getElementById('notebookModal');

        // Setup modal event listeners
        setupModalEventListeners();

        // Focus textarea if in edit mode
        if (isEditMode) {
            const textarea = document.getElementById('notebookTextarea');
            if (textarea) {
                textarea.focus();
                textarea.setSelectionRange(textarea.value.length, textarea.value.length);
            }
        }
    }

    /**
     * Render tabs HTML
     */
    function renderTabs() {
        return notebook.tabs.map(tab => `
            <div class="notebook-tab ${tab.id === currentTabId ? 'active' : ''}" data-tab-id="${tab.id}">
                <span class="notebook-tab-name">${escapeHtml(tab.name)}</span>
                <div class="notebook-tab-actions">
                    <button class="notebook-tab-rename" data-tab-id="${tab.id}" title="Rename">
                        <svg viewBox="0 0 16 16" width="12" height="12">
                            <path fill="currentColor" d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path>
                        </svg>
                    </button>
                    ${notebook.tabs.length > 1 ? `
                        <button class="notebook-tab-delete" data-tab-id="${tab.id}" title="Delete">
                            <svg viewBox="0 0 16 16" width="12" height="12">
                                <path fill="currentColor" d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75ZM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15ZM6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25Z"></path>
                            </svg>
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    /**
     * Setup modal event listeners
     */
    function setupModalEventListeners() {
        // Close button
        const closeBtn = document.getElementById('btnCloseNotebook');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeNotebook);
        }

        // Click outside to close
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) {
                closeNotebook();
            }
        });

        // Edit/Save button
        const editBtn = document.getElementById('btnEditNotebook');
        const saveBtn = document.getElementById('btnSaveNotebook');

        if (editBtn) {
            editBtn.addEventListener('click', enableEditMode);
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', saveContent);
        }

        // Add tab button
        const addTabBtn = document.getElementById('btnAddTab');
        if (addTabBtn) {
            addTabBtn.addEventListener('click', addTab);
        }

        // Tab click events
        const tabs = modalElement.querySelectorAll('.notebook-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                // Only switch tab if clicking on the tab itself, not the action buttons
                if (!e.target.closest('.notebook-tab-actions')) {
                    const tabId = tab.dataset.tabId;
                    switchTab(tabId);
                }
            });
        });

        // Rename buttons
        const renameButtons = modalElement.querySelectorAll('.notebook-tab-rename');
        renameButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const tabId = btn.dataset.tabId;
                renameTab(tabId);
            });
        });

        // Delete buttons
        const deleteButtons = modalElement.querySelectorAll('.notebook-tab-delete');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const tabId = btn.dataset.tabId;
                deleteTab(tabId);
            });
        });

        // Copy button
        const copyBtn = document.getElementById('btnCopyNotebook');
        if (copyBtn) {
            copyBtn.addEventListener('click', copyText);
        }
    }

    /**
     * Copy text to clipboard
     */
    function copyText() {
        const textarea = document.getElementById('notebookTextarea');
        if (!textarea) return;

        const text = textarea.value;
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
            const copyBtn = document.getElementById('btnCopyNotebook');
            const originalHTML = copyBtn.innerHTML;

            // Simple visual feedback
            copyBtn.innerHTML = `
                <svg viewBox="0 0 16 16" width="14" height="14">
                    <path fill="var(--color-success-fg)" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
                </svg>
            `;

            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    /**
     * Get current tab
     */
    function getCurrentTab() {
        return notebook.tabs.find(tab => tab.id === currentTabId);
    }

    /**
     * Switch to a different tab
     */
    function switchTab(tabId) {
        // Save current content if in edit mode
        if (isEditMode) {
            saveCurrentContent();
        }

        currentTabId = tabId;
        notebook.activeTabId = tabId;
        saveNotebook();

        // Auto-edit if empty
        const nextTab = notebook.tabs.find(t => t.id === tabId);
        isEditMode = (!nextTab || !nextTab.content.trim());

        renderModal();
    }

    /**
     * Enable edit mode
     */
    function enableEditMode() {
        isEditMode = true;
        renderModal();

        // Focus textarea
        const textarea = document.getElementById('notebookTextarea');
        if (textarea) {
            textarea.focus();
            // Move cursor to end
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        }
    }

    /**
     * Save current textarea content to current tab
     */
    function saveCurrentContent() {
        const textarea = document.getElementById('notebookTextarea');
        if (textarea) {
            const currentTab = getCurrentTab();
            if (currentTab) {
                currentTab.content = textarea.value;
                currentTab.updatedAt = new Date().toISOString();
            }
        }
    }

    /**
     * Save content and exit edit mode
     */
    function saveContent() {
        saveCurrentContent();
        saveNotebook();
        isEditMode = false;
        renderModal();
    }

    /**
     * Add a new tab
     */
    function addTab() {
        const lang = document.documentElement.getAttribute('lang') || 'ar';
        const isRTL = lang === 'ar';
        const defaultName = isRTL ? `صفحة ${notebook.tabs.length + 1}` : `Page ${notebook.tabs.length + 1}`;

        const newTab = {
            id: generateId('tab'),
            name: defaultName,
            content: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        notebook.tabs.push(newTab);
        currentTabId = newTab.id;
        notebook.activeTabId = newTab.id;

        // New tab is always empty, so enter edit mode
        isEditMode = true;

        saveNotebook();
        renderModal();
    }

    /**
     * Rename a tab
     */
    function renameTab(tabId) {
        const tab = notebook.tabs.find(t => t.id === tabId);
        if (!tab) return;

        const lang = document.documentElement.getAttribute('lang') || 'ar';
        const isRTL = lang === 'ar';
        const newName = prompt(
            isRTL ? 'أدخل الاسم الجديد للصفحة:' : 'Enter new page name:',
            tab.name
        );

        if (newName && newName.trim()) {
            tab.name = newName.trim();
            tab.updatedAt = new Date().toISOString();
            saveNotebook();
            renderModal();
        }
    }

    /**
     * Delete a tab
     */
    function deleteTab(tabId) {
        if (notebook.tabs.length <= 1) {
            const lang = document.documentElement.getAttribute('lang') || 'ar';
            const isRTL = lang === 'ar';
            alert(isRTL ? 'لا يمكن حذف الصفحة الأخيرة' : 'Cannot delete the last page');
            return;
        }

        const lang = document.documentElement.getAttribute('lang') || 'ar';
        const isRTL = lang === 'ar';
        const confirmed = confirm(
            isRTL ? 'هل أنت متأكد من حذف هذه الصفحة؟' : 'Are you sure you want to delete this page?'
        );

        if (confirmed) {
            const tabIndex = notebook.tabs.findIndex(t => t.id === tabId);
            if (tabIndex !== -1) {
                notebook.tabs.splice(tabIndex, 1);

                // If deleted tab was active, switch to first tab
                if (currentTabId === tabId) {
                    currentTabId = notebook.tabs[0].id;
                    notebook.activeTabId = currentTabId;
                }

                saveNotebook();
                renderModal();
            }
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export to global scope for debugging
    window.NotebookManager = {
        open: openNotebook,
        close: closeNotebook
    };

})();
