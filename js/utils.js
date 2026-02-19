/**
 * UTILITY FUNCTIONS
 * Helper functions for date manipulation, calculations, and formatting
 * FULL IMPLEMENTATION
 */

/**
 * DATE & TIME UTILITIES
 */

/**
 * Get current ISO week number
 * @param {Date} date - Date object (defaults to today)
 * @returns {number} ISO week number (1-53)
 */
export function getCurrentWeekNumber(date = new Date()) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/**
 * Get ISO year for a given date (may differ from calendar year)
 * @param {Date} date - Date object
 * @returns {number} ISO year
 */
export function getISOYear(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return d.getUTCFullYear();
}

/**
 * Get start and end dates for a given ISO week
 * @param {number} year - ISO year
 * @param {number} weekNumber - ISO week number
 * @returns {Object} { startDate: Date, endDate: Date }
 */
export function getWeekDateRange(year, weekNumber) {
    const simple = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());

    const startDate = new Date(ISOweekStart);
    const endDate = new Date(ISOweekStart);
    endDate.setDate(endDate.getDate() + 6);

    return { startDate, endDate };
}

/**
 * Get all dates in a week as array
 * @param {number} year - ISO year
 * @param {number} weekNumber - ISO week number
 * @param {number} weekStartsOn - Day week starts on (0-6, default 1 for Monday)
 * @returns {Array<Date>} Array of 7 Date objects
 */
export function getWeekDates(year, weekNumber, weekStartsOn = 1) {
    const { startDate } = getWeekDateRange(year, weekNumber);
    const dates = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date);
    }

    return dates;
}

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format pattern (e.g., 'YYYY-MM-DD', 'MMM DD')
 * @returns {string} Formatted date string
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
    const d = typeof date === 'string' ? new Date(date) : date;

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    if (format === 'YYYY-MM-DD') {
        return `${year}-${month}-${day}`;
    } else if (format === 'MMM DD') {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${monthNames[d.getMonth()]} ${day}`;
    } else if (format === 'DD/MM/YYYY') {
        return `${day}/${month}/${year}`;
    }

    return `${year}-${month}-${day}`;
}

/**
 * Get day name from date
 * @param {Date|string} date - Date object or ISO string
 * @param {string} locale - Locale for day name (default 'en')
 * @returns {string} Day name (e.g., 'Monday')
 */
export function getDayName(date, locale = 'en') {
    const d = typeof date === 'string' ? new Date(date) : date;

    if (locale === 'ar') {
        const arabicDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        return arabicDays[d.getDay()];
    }

    const englishDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return englishDays[d.getDay()];
}

/**
 * Check if a date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} Whether date is today
 */
export function isToday(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();

    return d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear();
}

/**
 * CALCULATION UTILITIES
 */

/**
 * Calculate completion percentage for a day
 * @param {Array} tasks - Array of task objects
 * @returns {number} Completion percentage (0-100)
 */
export function calculateDayCompletion(tasks) {
    if (!tasks || tasks.length === 0) return 0;

    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    return Math.round((completedTasks / tasks.length) * 100);
}

/**
 * Calculate completion percentage for a week
 * @param {Array} days - Array of day objects
 * @returns {number} Completion percentage (0-100)
 */
export function calculateWeekCompletion(days) {
    if (!days || days.length === 0) return 0;

    const totalPercentage = days.reduce((sum, day) => {
        return sum + (day.completionPercentage || 0);
    }, 0);

    return Math.round(totalPercentage / days.length);
}

/**
 * Calculate time accuracy (estimated vs actual)
 * @param {number} estimatedMinutes - Estimated time
 * @param {number} actualMinutes - Actual time spent
 * @returns {number} Accuracy percentage
 */
export function calculateTimeAccuracy(estimatedMinutes, actualMinutes) {
    if (estimatedMinutes === 0) return 0;

    const difference = Math.abs(estimatedMinutes - actualMinutes);
    const accuracy = 100 - ((difference / estimatedMinutes) * 100);

    return Math.max(0, Math.round(accuracy));
}

/**
 * Generate grade based on completion percentage
 * Uses the exact grading scale from requirements
 * @param {number} percentage - Completion percentage
 * @returns {string} Grade letter
 */
export function calculateGrade(percentage) {
    if (percentage >= 90) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 80) return 'A-';
    if (percentage >= 75) return 'B+';
    if (percentage >= 70) return 'B';
    if (percentage >= 65) return 'B-';
    if (percentage >= 60) return 'C+';
    if (percentage >= 55) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
}

/**
 * Calculate statistics for a week
 * @param {Object} week - Week object
 * @returns {Object} Statistics object
 */
export function calculateWeekStats(week) {
    const allTasks = week.days.flatMap(day => day.tasks || []);

    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(t => t.status === 'completed').length;
    const cancelledTasks = allTasks.filter(t => t.status === 'cancelled').length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const totalEstimatedMinutes = allTasks.reduce((sum, t) => sum + (t.estimatedMinutes || 0), 0);
    const totalActualMinutes = allTasks.reduce((sum, t) => sum + (t.actualMinutes || 0), 0);
    const timeAccuracy = calculateTimeAccuracy(totalEstimatedMinutes, totalActualMinutes);

    return {
        totalTasks,
        completedTasks,
        cancelledTasks,
        completionRate,
        totalEstimatedMinutes,
        totalActualMinutes,
        timeAccuracy
    };
}

/**
 * DATA MANIPULATION UTILITIES
 */

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Sort tasks by priority and status
 * @param {Array} tasks - Array of tasks
 * @returns {Array} Sorted tasks
 */
export function sortTasks(tasks) {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const statusOrder = { 'in-progress': 0, pending: 1, completed: 2, cancelled: 3 };

    return [...tasks].sort((a, b) => {
        // First sort by status
        const statusDiff = statusOrder[a.status] - statusOrder[b.status];
        if (statusDiff !== 0) return statusDiff;

        // Then by priority
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
}

/**
 * Filter tasks by status
 * @param {Array} tasks - Array of tasks
 * @param {string} status - Status to filter by
 * @returns {Array} Filtered tasks
 */
export function filterTasksByStatus(tasks, status) {
    return tasks.filter(t => t.status === status);
}

/**
 * Group tasks by a property
 * @param {Array} tasks - Array of tasks
 * @param {string} property - Property to group by
 * @returns {Object} Grouped tasks
 */
export function groupTasksBy(tasks, property) {
    return tasks.reduce((groups, task) => {
        const key = task[property];
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(task);
        return groups;
    }, {});
}

/**
 * VALIDATION UTILITIES
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate date string
 * @param {string} dateString - Date string to validate
 * @returns {boolean} Whether date is valid
 */
export function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

/**
 * Sanitize user input
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized input
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') return '';

    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim();
}

/**
 * FORMATTING UTILITIES
 */

/**
 * Format minutes to human-readable duration
 * @param {number} minutes - Minutes to format
 * @returns {string} Formatted duration (e.g., '2h 30m')
 */
export function formatDuration(minutes) {
    if (minutes < 60) {
        return `${minutes}m`;
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (mins === 0) {
        return `${hours}h`;
    }

    return `${hours}h ${mins}m`;
}

/**
 * Format number with thousands separator
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

/**
 * PLANNER-SPECIFIC UTILITIES
 */

/**
 * Check if week can be closed
 * All days must be closed
 * @param {Object} week - Week object
 * @returns {boolean} Whether week can be closed
 */
export function canCloseWeek(week) {
    if (!week || !week.days || week.days.length === 0) return false;
    return week.days.every(day => day.status === 'closed');
}

/**
 * Check if day can be closed
 * Day must have at least one task
 * @param {Object} day - Day object
 * @returns {boolean} Whether day can be closed
 */
export function canCloseDay(day) {
    if (!day || !day.tasks) return false;
    return day.tasks.length > 0;
}
