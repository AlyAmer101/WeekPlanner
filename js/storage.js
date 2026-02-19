/**
 * STORAGE MODULE
 * Handles all data persistence using LocalStorage
 * Implements versioning and migration strategies
 * FULL IMPLEMENTATION
 */

import { createAppState, isValidWeek } from './models.js';

// Storage configuration
const STORAGE_CONFIG = {
    APP_KEY: 'plannedWeak',
    VERSION_KEY: 'plannedWeak_version',
    CURRENT_VERSION: '1.0.0',
    BACKUP_KEY: 'plannedWeak_backup'
};

/**
 * Storage API
 * Public interface for data persistence operations
 */
export const Storage = {
    /**
     * Initialize storage
     * Creates initial state if none exists, handles migrations
     */
    init() {
        try {
            if (!isLocalStorageAvailable()) {
                console.error('LocalStorage is not available');
                return false;
            }

            const storedVersion = localStorage.getItem(STORAGE_CONFIG.VERSION_KEY);

            // First time initialization
            if (!storedVersion) {
                const initialState = createAppState();
                this.saveState(initialState);
                localStorage.setItem(STORAGE_CONFIG.VERSION_KEY, STORAGE_CONFIG.CURRENT_VERSION);
                console.log('✅ Storage initialized');
                return true;
            }

            // Handle version migration if needed
            if (storedVersion !== STORAGE_CONFIG.CURRENT_VERSION) {
                console.log(`Migrating from ${storedVersion} to ${STORAGE_CONFIG.CURRENT_VERSION}`);
                migrateData(storedVersion, STORAGE_CONFIG.CURRENT_VERSION);
                localStorage.setItem(STORAGE_CONFIG.VERSION_KEY, STORAGE_CONFIG.CURRENT_VERSION);
            }

            return true;
        } catch (error) {
            console.error('Storage initialization failed:', error);
            return false;
        }
    },

    /**
     * Load complete application state
     * @returns {Object} Application state object
     */
    loadState() {
        try {
            const stateJson = localStorage.getItem(STORAGE_CONFIG.APP_KEY);

            if (!stateJson) {
                return createAppState();
            }

            const state = JSON.parse(stateJson);

            if (!validateStoredData(state)) {
                console.warn('Invalid stored data, creating new state');
                return createAppState();
            }

            return state;
        } catch (error) {
            console.error('Failed to load state:', error);
            return createAppState();
        }
    },

    /**
     * Save complete application state
     * @param {Object} state - Application state to save
     * @returns {boolean} Success status
     */
    saveState(state) {
        try {
            const stateJson = JSON.stringify(state);
            localStorage.setItem(STORAGE_CONFIG.APP_KEY, stateJson);
            state.lastSyncedAt = new Date().toISOString();
            return true;
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                handleQuotaExceeded();
            }
            console.error('Failed to save state:', error);
            return false;
        }
    },

    /**
     * Load a specific week by ID
     * @param {string} weekId - Week identifier
     * @returns {Object|null} Week object or null
     */
    loadWeek(weekId) {
        const state = this.loadState();
        return state.weeks[weekId] || null;
    },

    /**
     * Save a specific week
     * @param {Object} week - Week object to save
     * @returns {boolean} Success status
     */
    saveWeek(week) {
        try {
            const state = this.loadState();
            state.weeks[week.id] = week;
            return this.saveState(state);
        } catch (error) {
            console.error('Failed to save week:', error);
            return false;
        }
    },

    /**
     * Load all weeks
     * @returns {Object} Map of weekId -> Week
     */
    loadAllWeeks() {
        const state = this.loadState();
        return state.weeks || {};
    },

    /**
     * Delete a week
     * @param {string} weekId - Week identifier
     * @returns {boolean} Success status
     */
    deleteWeek(weekId) {
        try {
            const state = this.loadState();
            delete state.weeks[weekId];
            return this.saveState(state);
        } catch (error) {
            console.error('Failed to delete week:', error);
            return false;
        }
    },

    /**
     * Load a specific report by ID
     * @param {string} reportId - Report identifier
     * @returns {Object|null} Report object or null
     */
    loadReport(reportId) {
        const state = this.loadState();
        return state.reports[reportId] || null;
    },

    /**
     * Save a specific report
     * @param {Object} report - Report object to save
     * @returns {boolean} Success status
     */
    saveReport(report) {
        try {
            const state = this.loadState();
            state.reports[report.id] = report;
            return this.saveState(state);
        } catch (error) {
            console.error('Failed to save report:', error);
            return false;
        }
    },

    /**
     * Load user settings
     * @returns {Object} Settings object
     */
    loadSettings() {
        const state = this.loadState();
        return state.settings || {};
    },

    /**
     * Save user settings
     * @param {Object} settings - Settings object
     * @returns {boolean} Success status
     */
    saveSettings(settings) {
        try {
            const state = this.loadState();
            state.settings = settings;
            return this.saveState(state);
        } catch (error) {
            console.error('Failed to save settings:', error);
            return false;
        }
    },

    /**
     * Create backup of current state
     * @returns {boolean} Success status
     */
    createBackup() {
        try {
            const state = this.loadState();
            const backupJson = JSON.stringify(state);
            localStorage.setItem(STORAGE_CONFIG.BACKUP_KEY, backupJson);
            console.log('✅ Backup created');
            return true;
        } catch (error) {
            console.error('Failed to create backup:', error);
            return false;
        }
    },

    /**
     * Restore from backup
     * @returns {boolean} Success status
     */
    restoreBackup() {
        try {
            const backupJson = localStorage.getItem(STORAGE_CONFIG.BACKUP_KEY);

            if (!backupJson) {
                console.warn('No backup found');
                return false;
            }

            const backup = JSON.parse(backupJson);

            if (!validateStoredData(backup)) {
                console.error('Invalid backup data');
                return false;
            }

            this.saveState(backup);
            console.log('✅ Backup restored');
            return true;
        } catch (error) {
            console.error('Failed to restore backup:', error);
            return false;
        }
    },

    /**
     * Export all data as JSON
     * @returns {string} JSON string of all data
     */
    exportData() {
        try {
            const state = this.loadState();
            return JSON.stringify(state, null, 2);
        } catch (error) {
            console.error('Failed to export data:', error);
            return null;
        }
    },

    /**
     * Import data from JSON
     * @param {string} jsonData - JSON string to import
     * @returns {boolean} Success status
     */
    importData(jsonData) {
        try {
            const importedState = JSON.parse(jsonData);

            if (!validateStoredData(importedState)) {
                console.error('Invalid import data structure');
                return false;
            }

            // Create backup before import
            this.createBackup();

            // Import the data
            this.saveState(importedState);
            console.log('✅ Data imported successfully');
            return true;
        } catch (error) {
            console.error('Failed to import data:', error);
            return false;
        }
    },

    /**
     * Clear all application data
     * @returns {boolean} Success status
     */
    clearAll() {
        try {
            localStorage.removeItem(STORAGE_CONFIG.APP_KEY);
            localStorage.removeItem(STORAGE_CONFIG.VERSION_KEY);
            localStorage.removeItem(STORAGE_CONFIG.BACKUP_KEY);
            console.log('✅ All data cleared');
            return true;
        } catch (error) {
            console.error('Failed to clear data:', error);
            return false;
        }
    },

    /**
     * Load Notebook data
     * @returns {Object} Notebook object
     */
    loadNotebook() {
        const state = this.loadState();
        return state.notebook || null;
    },

    /**
     * Save Notebook data
     * @param {Object} notebook - Notebook object to save
     * @returns {boolean} Success status
     */
    saveNotebook(notebook) {
        try {
            const state = this.loadState();
            state.notebook = notebook;
            state.notebook.updatedAt = new Date().toISOString();
            return this.saveState(state);
        } catch (error) {
            console.error('Failed to save notebook:', error);
            return false;
        }
    },

    /**
     * Get storage usage statistics
     * @returns {Object} Storage stats (used bytes, available, etc.)
     */
    getStorageStats() {
        try {
            const stateJson = localStorage.getItem(STORAGE_CONFIG.APP_KEY) || '';
            const usedBytes = new Blob([stateJson]).size;
            const usedKB = (usedBytes / 1024).toFixed(2);
            const usedMB = (usedBytes / (1024 * 1024)).toFixed(2);

            return {
                usedBytes,
                usedKB,
                usedMB,
                totalWeeks: Object.keys(this.loadAllWeeks()).length
            };
        } catch (error) {
            console.error('Failed to get storage stats:', error);
            return null;
        }
    }
};

/**
 * Internal helper: Check if LocalStorage is available
 * @returns {boolean} Whether LocalStorage is available
 */
function isLocalStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Internal helper: Handle storage quota exceeded
 */
function handleQuotaExceeded() {
    console.error('⚠️ Storage quota exceeded!');
    alert('Storage is full. Please export your data and clear old weeks.');
}

/**
 * Internal helper: Migrate data from old version to new
 * @param {string} fromVersion - Source version
 * @param {string} toVersion - Target version
 */
function migrateData(fromVersion, toVersion) {
    console.log(`Migrating data from ${fromVersion} to ${toVersion}`);
    // Future: Add migration logic here when versions change
    // For now, no migration needed (v1.0.0 is first version)
}

/**
 * Internal helper: Validate stored data integrity
 * @param {Object} data - Data to validate
 * @returns {boolean} Whether data is valid
 */
function validateStoredData(data) {
    if (!data || typeof data !== 'object') return false;

    // Check required properties
    if (!data.version || !data.weeks || !data.reports || !data.settings) {
        return false;
    }

    // Validate weeks object
    if (typeof data.weeks !== 'object') return false;

    // Validate reports object
    if (typeof data.reports !== 'object') return false;

    // Validate settings object
    if (typeof data.settings !== 'object') return false;

    return true;
}

