/**
 * DATA MODELS
 * Core data structures for the Planned Weak application
 * These are factory functions that create properly structured objects
 */

/**
 * Task Model
 * Represents a single task within a day
 */
export function createTask(title = '', options = {}) {
    return {
        id: options.id || generateId('task'),
        title: title,
        description: options.description || '',
        status: options.status || 'pending', // 'pending' | 'in-progress' | 'completed' | 'cancelled'
        priority: options.priority || 'medium', // 'low' | 'medium' | 'high'
        estimatedMinutes: options.estimatedMinutes || 0,
        actualMinutes: options.actualMinutes || 0,
        createdAt: options.createdAt || new Date().toISOString(),
        completedAt: options.completedAt || null,
        tags: options.tags || [],
        metadata: options.metadata || {}
    };
}

/**
 * Day Model
 * Represents a single day in the week with its tasks
 */
export function createDay(date, options = {}) {
    return {
        id: options.id || generateId('day'),
        date: date, // ISO date string (YYYY-MM-DD)
        dayOfWeek: options.dayOfWeek || new Date(date).getDay(), // 0-6 (Sunday-Saturday)
        status: options.status || 'open', // 'open' | 'closed'
        tasks: options.tasks || [],
        notes: options.notes || '',
        completionPercentage: options.completionPercentage || 0,
        evaluationGrade: options.evaluationGrade || null, // null | 'A' | 'B' | 'C' | 'D' | 'F'
        evaluationNotes: options.evaluationNotes || '',
        closedAt: options.closedAt || null,
        metadata: options.metadata || {}
    };
}

/**
 * Week Model
 * Represents a complete week with 7 days
 */
export function createWeek(year, weekNumber, options = {}) {
    return {
        id: options.id || generateId('week'),
        year: year,
        weekNumber: weekNumber, // ISO week number (1-53)
        startDate: options.startDate || null, // ISO date string
        endDate: options.endDate || null, // ISO date string
        status: options.status || 'open', // 'open' | 'closed'
        days: options.days || [], // Array of 7 Day objects
        weeklyGoals: options.weeklyGoals || [],
        completionPercentage: options.completionPercentage || 0,
        evaluationGrade: options.evaluationGrade || null, // null | 'A' | 'B' | 'C' | 'D' | 'F'
        evaluationNotes: options.evaluationNotes || '',
        closedAt: options.closedAt || null,
        createdAt: options.createdAt || new Date().toISOString(),
        metadata: options.metadata || {}
    };
}

/**
 * Weekly Report Model
 * Represents a completed week's performance report
 */
export function createWeeklyReport(weekId, options = {}) {
    return {
        id: options.id || generateId('report'),
        weekId: weekId,
        year: options.year || new Date().getFullYear(),
        weekNumber: options.weekNumber || 1,

        // Statistics
        stats: {
            totalTasks: options.totalTasks || 0,
            completedTasks: options.completedTasks || 0,
            cancelledTasks: options.cancelledTasks || 0,
            completionRate: options.completionRate || 0,
            totalEstimatedMinutes: options.totalEstimatedMinutes || 0,
            totalActualMinutes: options.totalActualMinutes || 0,
            timeAccuracy: options.timeAccuracy || 0
        },

        // Daily breakdown
        dailyBreakdown: options.dailyBreakdown || [], // Array of per-day stats

        // Evaluation
        overallGrade: options.overallGrade || null, // 'A' | 'B' | 'C' | 'D' | 'F'
        strengths: options.strengths || [],
        improvements: options.improvements || [],
        notes: options.notes || '',

        // Metadata
        generatedAt: options.generatedAt || new Date().toISOString(),
        metadata: options.metadata || {}
    };
}

/**
 * Notebook Tab Model
 * Represents a single tab/page in the Notebook
 */
export function createNotebookTab(name = 'Untitled', options = {}) {
    return {
        id: options.id || generateId('tab'),
        name: name,
        content: options.content || '',
        createdAt: options.createdAt || new Date().toISOString(),
        updatedAt: options.updatedAt || new Date().toISOString(),
        metadata: options.metadata || {}
    };
}

/**
 * Notebook Model
 * Represents the entire Notebook with all tabs
 */
export function createNotebook(options = {}) {
    return {
        tabs: options.tabs || [createNotebookTab('Page 1')], // Array of NotebookTab objects
        activeTabId: options.activeTabId || null, // ID of currently active tab
        createdAt: options.createdAt || new Date().toISOString(),
        updatedAt: options.updatedAt || new Date().toISOString(),
        metadata: options.metadata || {}
    };
}

/**
 * Application State Model
 * Represents the entire application state
 */
export function createAppState(options = {}) {
    return {
        version: options.version || '1.0.0',
        currentWeekId: options.currentWeekId || null,
        currentView: options.currentView || 'week', // 'week' | 'report' | 'settings'
        weeks: options.weeks || {}, // Map of weekId -> Week object
        reports: options.reports || {}, // Map of reportId -> Report object
        notebook: options.notebook || createNotebook(), // Notebook object
        settings: options.settings || createDefaultSettings(),
        lastSyncedAt: options.lastSyncedAt || null,
        metadata: options.metadata || {}
    };
}

/**
 * Settings Model
 * User preferences and configuration
 */
export function createDefaultSettings() {
    return {
        theme: 'light', // 'light' | 'dark' | 'auto'
        weekStartsOn: 1, // 0 (Sunday) - 6 (Saturday), default Monday
        defaultTaskDuration: 30, // minutes
        enableNotifications: false,
        autoCloseDay: false,
        gradeScale: 'letter', // 'letter' | 'numeric' | 'emoji'
        language: 'en',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: '24h'
    };
}

/**
 * Helper: Generate unique IDs
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Unique ID
 */
function generateId(prefix = 'item') {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 9);
    return `${prefix}_${timestamp}_${randomPart}`;
}

/**
 * Helper: Validate Task object
 * @param {Object} task - Task object to validate
 * @returns {boolean} Whether the task is valid
 */
export function isValidTask(task) {
    return (
        task &&
        typeof task.id === 'string' &&
        typeof task.title === 'string' &&
        ['pending', 'in-progress', 'completed', 'cancelled'].includes(task.status)
    );
}

/**
 * Helper: Validate Day object
 * @param {Object} day - Day object to validate
 * @returns {boolean} Whether the day is valid
 */
export function isValidDay(day) {
    return (
        day &&
        typeof day.id === 'string' &&
        typeof day.date === 'string' &&
        ['open', 'closed'].includes(day.status) &&
        Array.isArray(day.tasks)
    );
}

/**
 * Helper: Validate Week object
 * @param {Object} week - Week object to validate
 * @returns {boolean} Whether the week is valid
 */
export function isValidWeek(week) {
    return (
        week &&
        typeof week.id === 'string' &&
        typeof week.year === 'number' &&
        typeof week.weekNumber === 'number' &&
        ['open', 'closed'].includes(week.status) &&
        Array.isArray(week.days)
    );
}
