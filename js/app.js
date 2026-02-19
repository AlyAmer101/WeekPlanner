/* ===================================
   PLANNED Week - COMPLETE APP LOGIC
   Navigation, Grading, Reports, Export/Import
   =================================== */

// ----- CONSTANTS -----
const STORAGE_KEY = 'plannedWeek_all';
const ARABIC_DAYS = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const ENGLISH_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const ARABIC_MONTHS = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];
const ENGLISH_MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const TRANSLATIONS = {
    ar: {
        prevWeek: "السابق",
        today: "الحالي",
        nextWeek: "التالي",
        reports: "التقارير",
        data: "البيانات",
        viewGoals: "الأهداف",
        notebook: "دفتر الملاحظات",
        focusMode: "التركيز",
        weeklyTasks: "تاسكات الأسبوع",
        weeklyTasksTitle: "ملخص مهام الأسبوع",
        times: "×",
        completed: "مكتمل",
        notCompleted: "غير مكتمل",
        weekLockedTitle: "الأسبوع مغلق لحين التخطيط",
        weekLockedDesc: "لا يمكن إضافة مهام حتى يتم تحديد أهداف الأسبوع",
        planWeek: "خطط أسبوعك",
        weeklyGoalsTitle: "أهداف الأسبوع",
        goalsPlaceholder: "اكتب أهدافك للأسبوع هنا...\nمثال:\n- إنهاء المشروع\n- مراجعة الكود\n- التحضير للاجتماع",
        saveGoals: "حفظ الأهداف",
        successMessage: "ابدأ في تقسيم أهداف الأسبوع على الأيام كمهام",
        weekLabel: "الأسبوع {n} من شهر {m}",
        partialWeekLabel: "بواقي شهر {m} (الاسبوع 5)",
        weekClosedTitle: "هذا الأسبوع انتهى وتم إغلاقه",
        weekOfYear: "الأسبوع {n} من السنة",
        remainingWeeks: "متبقي {n} أسبوع في السنة",
        partialWeekInfo: "هذا ليس اسبوع و انما اخر كم يوم في الشهر",
        evaluation: "التقييم",
        addTask: "+ إضافة مهمة",
        endDay: "انتهى اليوم",
        completed: "مكتمل",
        closed: "مغلق",
        taskPlaceholder: "اكتب المهمة (أو مهام مفصولة بفاصلة) واضغط Enter...",
        evalModalTitle: "تقييم الأسبوع",
        evalNotes: "ملاحظات عامة",
        evalGood: "الإيجابيات",
        evalBad: "السلبيات",
        evalLessons: "الدروس المستفادة",
        evalSave: "حفظ وإنهاء الأسبوع",
        evalSuccess: "تم إغلاق الأسبوع!\nالتقييم النهائي: {g} ({p}%)",
        noReports: "لا توجد تقارير حتى الآن",
        reportsTitle: "📊 التقارير الأسبوعية",
        close: "إغلاق",
        exportImportTitle: "💾 تصدير/استيراد البيانات",
        export: "تصدير",
        exportDesc: "احفظ نسخة احتياطية من بياناتك",
        exportBtn: "تصدير JSON",
        import: "استيراد",
        importDesc: "استعادة البيانات من ملف سابق",
        importBtn: "استيراد البيانات",
        importSuccess: "✅ تم استيراد البيانات بنجاح",
        exportSuccess: "✅ تم تصدير البيانات بنجاح",
        importError: "❌ خطأ في قراءة الملف: ",
        importConfirm: "⚠️ سيتم استبدال جميع البيانات الحالية. هل أنت متأكد؟",
        selectFile: "الرجاء اختيار ملف",
        writeGoalsAlert: "الرجاء كتابة أهداف الأسبوع",
        edit: "تعديل الأهداف",
        quickAddTask: "+ إضافة سريعة",
        quickAddModalTitle: "إضافة مهمة على الأسبوع",
        quickAddModalDesc: "ستتم إضافة هذه المهمة على جميع الأيام المتاحة (غير المغلقة وغير الماضية)",
        quickAddTaskPlaceholder: "اكتب المهام هنا (يمكنك استخدام سطر جديد أو فاصلة بينها)...",
        quickAddBtn: "إضافة على الأسبوع",
        quickAddSuccess: "✅ تمت إضافة المهمة على {n} أيام",
        quickAddNoAvailableDays: "⚠️ لا توجد أيام متاحة لإضافة المهمة",
        quickAddEmptyTask: "⚠️ الرجاء كتابة المهمة أولاً",
        quickAddTabTitle: "إضافة تاب على الأسبوع",
        quickAddTabDesc: "سيتم إنشاء هذا التاب في جميع الأيام المتاحة",
        quickAddTabPlaceholder: "اسم التاب الجديد...",
        quickAddTabSuccess: "✅ تم إضافة التاب على {n} أيام",
        quickAddTypeTask: "إضافة مهمة",
        quickAddTypeTab: "إضافة تاب",
        // Sub-Tabs System translations
        tabAll: "الكل",
        addTab: "+ تاب",
        addTabTitle: "إضافة تاب جديد",
        tabNamePlaceholder: "اسم التاب...",
        selectTabPrompt: "تحب تحط التاسك دي في أي تاب؟",
        selectTabTitle: "اختر التاب",
        tabCreated: "✅ تم إنشاء التاب بنجاح",
        tabNameRequired: "⚠️ الرجاء كتابة اسم التاب",
        missedTasks: "المهام الفائتة",
        missedPercentage: "نسبة المهام الفائتة",
        tabCompleted: "مكتملة",
        noCompletedTasks: "لا توجد مهام مكتملة بعد",
        autoExport: "التصدير التلقائي",
        autoExportDesc: "حفظ نسخة احتياطية يومياً في مجلد من اختيارك",
        autoExportBtn: "تفعيل التصدير التلقائي",
        autoExportEnabled: "✅ التصدير التلقائي مفعل",
        autoExportDisabled: "❌ تم تعطيل التصدير التلقائي",
        autoExportFolderError: "❌ لم يتم تحديد مجلد صالح",
        autoExportAuthRequired: "⚠️ مطلوب تفويض للوصول للمجلد",
        settings: "الإعدادات",
        settingsTitle: "الإعدادات",
        dataManagement: "إدارة البيانات",
        exportData: "تصدير البيانات",
        importData: "استيراد البيانات",
        clearData: "مسح جميع البيانات",
        appearance: "المظهر",
        toggleTheme: "تبديل المظهر (فاتح/داكن)",
        language: "تبديل اللغة (AR/EN)",
        userGuide: "مرشد المستخدم",
        about: "حول التطبيق"
    },
    en: {
        appTitle: '<span class="word1">Week</span> <span style="color: #fff ;" class="word2">Planner</span>',
        prevWeek: "Previous",
        today: "Today",
        nextWeek: "Next",
        reports: "Reports",
        data: "Data",
        viewGoals: "Goals",
        notebook: "Notebook",
        focusMode: "Focus Mode",
        weeklyTasks: "Weekly Tasks",
        weeklyTasksTitle: "Weekly Tasks Summary",
        times: "×",
        completed: "Completed",
        notCompleted: "Not Completed",
        weekLockedTitle: "Week is locked until planned",
        weekLockedDesc: "You cannot add tasks until you set your weekly goals",
        planWeek: "Plan your week",
        weeklyGoalsTitle: "Weekly Goals",
        goalsPlaceholder: "Write your goals for the week here...\nExample:\n- Finish the project\n- Review code\n- Prepare for meeting",
        saveGoals: "Save Goals",
        successMessage: "Start breaking down your weekly goals into daily tasks",
        weekLabel: "Week {n} of {m}",
        partialWeekLabel: "Remaining of {m} (Week 5)",
        weekClosedTitle: "This week has ended and is closed",
        weekOfYear: "Week {n} of the year",
        remainingWeeks: "{n} weeks remaining in the year",
        partialWeekInfo: "This is not a full week, but the last few days of the month",
        evaluation: "Evaluation",
        addTask: "+ Add Task",
        endDay: "End Day",
        completed: "Completed",
        closed: "Closed",
        taskPlaceholder: "Type task (or multiple separated by comma) and press Enter...",
        evalModalTitle: "Week Evaluation",
        evalNotes: "General Notes",
        evalGood: "Positives",
        evalBad: "Negatives",
        evalLessons: "Lessons Learned",
        evalSave: "Save and Close Week",
        evalSuccess: "Week closed!\nFinal Grade: {g} ({p}%)",
        noReports: "No reports yet",
        reportsTitle: "📊 Weekly Reports",
        close: "Close",
        exportImportTitle: "💾 Export/Import Data",
        export: "Export",
        exportDesc: "Save a backup of your data",
        exportBtn: "Export JSON",
        import: "Import",
        importDesc: "Restore data from a previous file",
        importBtn: "Import Data",
        importSuccess: "✅ Data imported successfully",
        exportSuccess: "✅ Data exported successfully",
        importError: "❌ Error reading file: ",
        importConfirm: "⚠️ This will replace all current data. Are you sure?",
        selectFile: "Please select a file",
        writeGoalsAlert: "Please write your weekly goals",
        edit: "Edit",
        quickAddTask: "+ Quick Add",
        quickAddModalTitle: "Add Task to Week",
        quickAddModalDesc: "This task will be added to all available days (not closed and not past)",
        quickAddTaskPlaceholder: "Type your tasks here (comma or new line supported)...",
        quickAddBtn: "Add to Week",
        quickAddSuccess: "✅ Task added to {n} days",
        quickAddNoAvailableDays: "⚠️ No available days to add the task",
        quickAddEmptyTask: "⚠️ Please write the task first",
        quickAddTabTitle: "Add Tab to Week",
        quickAddTabDesc: "This tab will be created in all available days",
        quickAddTabPlaceholder: "New tab name...",
        quickAddTabSuccess: "✅ Tab added to {n} days",
        quickAddTypeTask: "Add Task",
        quickAddTypeTab: "Add Tab",
        // Sub-Tabs System translations
        tabAll: "All",
        addTab: "+ Tab",
        addTabTitle: "Add New Tab",
        tabNamePlaceholder: "Tab name...",
        selectTabPrompt: "Which tab do you want to add this task to?",
        selectTabTitle: "Select Tab",
        tabCreated: "✅ Tab created successfully",
        tabNameRequired: "⚠️ Please enter a tab name",
        missedTasks: "Missed Tasks",
        missedPercentage: "Missed %",
        tabCompleted: "Completed",
        noCompletedTasks: "No completed tasks yet",
        autoExport: "Auto Export",
        autoExportDesc: "Save a backup daily to a folder of your choice",
        autoExportBtn: "Enable Auto Export",
        autoExportEnabled: "✅ Auto Export enabled",
        autoExportDisabled: "❌ Auto Export disabled",
        autoExportFolderError: "❌ No valid folder selected",
        autoExportAuthRequired: "⚠️ Authorization required for folder access",
        settings: "Settings",
        settingsTitle: "Settings",
        dataManagement: "Data Management",
        exportData: "Export Data",
        importData: "Import Data",
        clearData: "Clear All Data",
        appearance: "Appearance",
        toggleTheme: "Toggle Theme (Light/Dark)",
        language: "Toggle Language (AR/EN)",
        userGuide: "User Guide",
        about: "About"
    }
};

// ----- GLOBAL STATE -----
let allWeeks = {};  // Map of all weeks: { 'YEAR-WEEK': weekData }
let currentWeekKey = '';  // Current week being viewed
let previousWeekKey = ''; // TRACKER: Previous week key for navigation detection
let appState = null;  // Current week data
let isFocusMode = false; // Focus Mode state (session only)
let focusModeTransitioning = false; // DEBOUNCE: Prevents race conditions during toggle
let cachedDayCards = []; // CACHE: Stores day cards for performance
let lastUsedTabId = localStorage.getItem('lastUsedTabId') || 'all'; // Store last used tab ID for default selection

// ----- DOM ELEMENTS -----
const elements = {
    weekNumber: document.getElementById('weekNumber'),
    lockedScreen: document.getElementById('lockedScreen'),
    goalsScreen: document.getElementById('goalsScreen'),
    successMessage: document.getElementById('successMessage'),
    weekGrid: document.getElementById('weekGrid'),
    btnPlanWeek: document.getElementById('btnPlanWeek'),
    btnSaveGoals: document.getElementById('btnSaveGoals'),
    btnCloseMessage: document.getElementById('btnCloseMessage'),
    goalsInput: document.getElementById('goalsInput'),
    btnPrevWeek: document.getElementById('btnPrevWeek'),
    btnNextWeek: document.getElementById('btnNextWeek'),
    btnTodayWeek: document.getElementById('btnTodayWeek'),
    btnViewReports: document.getElementById('btnViewReports'),
    btnViewGoals: document.getElementById('btnViewGoals'),
    btnFocusMode: document.getElementById('btnFocusMode'),
    btnQuickAddTask: document.getElementById('btnQuickAddTask'),
    btnExportImport: document.getElementById('btnExportImport'),
    btnLangToggle: document.getElementById('btnLangToggle'),
    modalContainer: document.getElementById('modalContainer'),
    btnCancelGoals: document.getElementById('btnCancelGoals')
};

// ----- UTILITY FUNCTIONS -----

/**
 * Get Month Week Info
 * Returns { year, month, weekIndex } for a given date
 * weekIndex is 1-5 based on 7-day chunks
 */
function getMonthWeekInfo(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const weekIndex = Math.ceil(day / 7);
    return { year, month, weekIndex };
}

/**
 * Calculate ISO week number
 */
function getISOWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/**
 * Get dates for a specific month week
 */
function getWeekDates(year, month, weekIndex) {
    const dates = [];
    const startDay = (weekIndex - 1) * 7 + 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // If startDay > daysInMonth, this week doesn't exist (shouldn't happen if logic is correct)
    if (startDay > daysInMonth) return [];

    const endDay = Math.min(startDay + 6, daysInMonth);

    for (let d = startDay; d <= endDay; d++) {
        dates.push(new Date(year, month, d));
    }
    return dates;
}

/**
 * Trigger celebration confetti effect
 * @param {number} particleCount - Number of confetti pieces
 */
function triggerCelebration(particleCount = 100) {
    const colors = ['#2ea44f', '#0969da', '#8250df', '#cf222e', '#bf3989'];
    const container = document.body;

    for (let i = 0; i < particleCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.zIndex = '9999';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '2px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

        container.appendChild(confetti);

        const animation = confetti.animate([
            { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate3d(${(Math.random() - 0.5) * 200}px, 100vh, 0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            delay: Math.random() * 1000
        });

        animation.onfinish = () => confetti.remove();
    }
}

/**
 * Calculate grade from percentage
 */
function calculateGrade(percentage) {
    if (percentage >= 95) return 'A+';
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
}

/**
 * Get Weekly Missed Tasks Statistics
 * @param {Object} week - The week data object
 * @returns {Object} Stats containing total missed, total in closed days, percentage and list grouped by day
 */
function getWeeklyMissedTasks(week) {
    let totalMissed = 0;
    let totalInClosedDays = 0;
    const missedByDay = [];

    week.days.forEach(day => {
        if (day.isClosed) {
            const dayMissedTasks = day.tasks.filter(t => !t.completed);
            totalMissed += dayMissedTasks.length;
            totalInClosedDays += day.tasks.length;

            if (dayMissedTasks.length > 0) {
                missedByDay.push({
                    dayName: day.name,
                    tasks: dayMissedTasks.map(t => t.text)
                });
            }
        }
    });

    const missedPercentage = totalInClosedDays > 0
        ? Math.round((totalMissed / totalInClosedDays) * 100)
        : 0;

    return {
        totalMissed,
        totalTasks: totalInClosedDays,
        missedPercentage,
        missedByDay
    };
}

/**
 * Get CSS class for grade
 */
function getGradeClass(grade) {
    if (!grade) return '';
    const g = grade.toUpperCase();
    if (g.startsWith('A')) return 'grade-a';
    if (g.startsWith('B')) return 'grade-b';
    if (g.startsWith('C')) return 'grade-c';
    if (g.startsWith('D')) return 'grade-d';
    if (g.startsWith('F')) return 'grade-f';
    return '';
}

/**
 * Create week key from year, month, and week index
 */
function getWeekKey(year, month, weekIndex) {
    return `${year}-M${String(month + 1).padStart(2, '0')}-W${weekIndex}`;
}

/**
 * Parse YYYY-MM-DD string as local Date object
 */
function parseDateLocal(dateStr) {
    if (!dateStr) return new Date();
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
}

/**
 * Format Date object as YYYY-MM-DD local string
 */
function formatDateLocal(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// ----- STORAGE FUNCTIONS -----

/**
 * Sort tasks: Incomplete first, Completed last
 * Preserves relative order (stable sort)
 */
function sortTasks(tasks) {
    tasks.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
    });
}

/**
 * Save all weeks to LocalStorage
 */
function saveAllWeeks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allWeeks));
}

/**
 * Load all weeks from LocalStorage
 */
function loadAllWeeks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            allWeeks = JSON.parse(stored);
        } catch (e) {
            console.error('Failed to load data:', e);
            allWeeks = {};
        }
    }
}

// ----- INITIALIZATION -----

/**
 * Initialize application
 */
/**
 * Initialize application
 */
function init() {
    setupThemeToggle();
    setupLanguageToggle();
    setupFocusMode();
    loadAllWeeks();
    checkAutoCloseDays(); // Auto-close expired days on load
    checkAutoExportDue(); // Daily backup check

    // Inject dynamic CSS for Missed Task feature
    const style = document.createElement('style');
    style.textContent = `
        .btn-miss-task {
            background: none;
            border: none;
            color: var(--color-fg-muted);
            cursor: pointer;
            padding: 2px;
            opacity: 0;
            transition: opacity 0.2s;
        }
        .task-item:hover .btn-miss-task {
            opacity: 1;
        }
        .btn-miss-task:hover {
            color: var(--color-danger-emphasis);
        }
    `;
    document.head.appendChild(style);

    const today = new Date();
    const { year, month, weekIndex } = getMonthWeekInfo(today);
    const todayKey = getWeekKey(year, month, weekIndex);

    // Initialize current week if doesn't exist
    if (!allWeeks[todayKey]) {
        const weekDates = getWeekDates(year, month, weekIndex);
        allWeeks[todayKey] = {
            year,
            month,
            weekNumber: weekIndex,
            goals: '',
            isPlanned: false,
            isClosed: false,
            weekGrade: null,
            weekFeedback: null,
            days: weekDates.map((date, index) => ({
                id: `day-${index}`,
                name: (localStorage.getItem('lang') === 'en' ? ENGLISH_DAYS : ARABIC_DAYS)[date.getDay()],
                date: formatDateLocal(date),
                tasks: [],
                isClosed: false,
                grade: null,
                completionPercentage: 0,
                // Sub-Tabs: Initialize with default tabs
                tabs: getDefaultTabs(),
                activeTabId: 'all' // Default active tab
            }))
        };
        saveAllWeeks();
    }

    currentWeekKey = todayKey;
    appState = allWeeks[currentWeekKey];

    // Ensure backward compatibility: add tabs to existing days if missing
    ensureTabsCompatibility();

    renderApp();
    updateNavigationButtons();
}

/**
 * Get default tabs for a day
 * These are system tabs that cannot be deleted or renamed
 */
function getDefaultTabs() {
    return [
        { id: 'all', name: 'all', isSystem: true },
        { id: 'completed', name: 'completed', isSystem: true }
    ];
}

/**
 * Ensure backward compatibility by adding tabs to existing days
 * This runs on init to migrate old data structures
 */
function ensureTabsCompatibility() {
    let anyChanged = false;

    Object.values(allWeeks).forEach(week => {
        week.days.forEach(day => {
            // Add tabs array if missing
            if (!day.tabs) {
                day.tabs = getDefaultTabs();
                anyChanged = true;
            }

            // REMOVE 'done' tab if it exists
            const doneTabIndex = day.tabs.findIndex(t => t.id === 'done');
            if (doneTabIndex !== -1) {
                day.tabs.splice(doneTabIndex, 1);
                anyChanged = true;
            }

            // If active tab was 'done', reset to 'all'
            if (day.activeTabId === 'done') {
                day.activeTabId = 'all';
                anyChanged = true;
            }

            // Add activeTabId if missing
            if (!day.activeTabId) {
                day.activeTabId = 'all';
                anyChanged = true;
            }

            // Ensure 'completed' tab exists and is the LAST one
            const completedTabIndex = day.tabs.findIndex(t => t.id === 'completed');
            if (completedTabIndex === -1) {
                day.tabs.push({ id: 'completed', name: 'completed', isSystem: true });
                anyChanged = true;
            } else if (completedTabIndex !== day.tabs.length - 1) {
                // Move it to the end if it's not there
                const [completedTab] = day.tabs.splice(completedTabIndex, 1);
                day.tabs.push(completedTab);
                anyChanged = true;
            }

            // Ensure all tasks have tabId
            day.tasks.forEach(task => {
                if (!task.tabId || task.tabId === 'done') {
                    task.tabId = 'all';
                    anyChanged = true;
                }
            });
        });
    });

    if (anyChanged) {
        saveAllWeeks();
    }
}

// ----- FOCUS MODE -----
function setupFocusMode() {
    if (elements.btnFocusMode) {
        elements.btnFocusMode.addEventListener('click', toggleFocusMode);
    }
}

function toggleFocusMode() {
    // 1. Debounce protection against rapid clicking
    if (focusModeTransitioning) return;

    focusModeTransitioning = true;
    isFocusMode = !isFocusMode;

    // 2. Update button state and Accessibility
    if (isFocusMode) {
        elements.btnFocusMode.classList.add('focus-mode-active');
        elements.btnFocusMode.setAttribute('aria-pressed', 'true');
    } else {
        elements.btnFocusMode.classList.remove('focus-mode-active');
        elements.btnFocusMode.setAttribute('aria-pressed', 'false');
    }

    applyFocusMode();

    // 3. Release debounce lock after transition duration
    setTimeout(() => {
        focusModeTransitioning = false;
    }, 300); // Matches CSS transition duration
}

function applyFocusMode() {
    // 1. Critical Validation
    if (!appState || !appState.days || !Array.isArray(appState.days)) {
        console.warn('Focus Mode: appState not ready');
        return;
    }

    const todayStr = formatDateLocal(new Date());

    // 2. Performance: Use cached cards instead of querying DOM again
    const cards = (cachedDayCards && cachedDayCards.length > 0)
        ? cachedDayCards
        : Array.from(document.querySelectorAll('.day-card'));

    cards.forEach(card => {
        const dayId = card.dataset.dayId;
        const day = appState.days.find(d => d.id === dayId);

        if (!day) return;

        if (isFocusMode) {
            // Check if this is today's card
            if (day.date === todayStr) {
                card.classList.remove('focus-mode-blur');
            } else {
                card.classList.add('focus-mode-blur');
            }
        } else {
            // Remove blur from all
            card.classList.remove('focus-mode-blur');
        }
    });
}

// ----- WEEKLY TASKS SUMMARY -----
function showWeeklyTasksModal(weekKey) {
    const week = allWeeks[weekKey];
    if (!week) return;

    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const t = TRANSLATIONS[lang];
    const tasksSummary = getWeeklyTasksSummary(week);
    const missedStats = getWeeklyMissedTasks(week);

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>${t.weeklyTasksTitle}</h2>
            </div>
            <div class="modal-body">
                <div class="missed-tasks-stats" style="display: flex; gap: 16px; margin-bottom: 20px; padding: 12px; background: var(--color-canvas-subtle); border-radius: 6px; border: 1px solid var(--color-border-default);">
                    <div class="stat-item" style="flex: 1; text-align: center;">
                        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--color-fg-muted); margin-bottom: 4px;">${t.missedTasks}</div>
                        <div style="font-size: 18px; font-weight: 600; color: var(--color-danger-emphasis);">${missedStats.totalMissed} / ${missedStats.totalTasks}</div>
                    </div>
                    <div class="stat-item" style="flex: 1; text-align: center; border-right: 1px solid var(--color-border-muted); border-left: 1px solid var(--color-border-muted);">
                        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--color-fg-muted); margin-bottom: 4px;">${t.missedPercentage}</div>
                        <div style="font-size: 18px; font-weight: 600; color: var(--color-danger-emphasis);">${missedStats.missedPercentage}%</div>
                    </div>
                </div>
                ${tasksSummary.length === 0 ? `<p style="color: var(--color-fg-muted); text-align: center;">${t.noReports || 'No tasks found'}</p>` : ''}
                <div class="summary-task-list">
                    ${tasksSummary.map(item => `
                        <div class="summary-task-item">
                            <div class="summary-task-info">
                                <span class="task-text">${item.text}</span>
                                ${item.count > 1 ? `<span class="summary-task-count">${t.times}${item.count}</span>` : ''}
                            </div>
                            <div class="summary-task-status ${item.completed ? 'status-completed' : 'status-incomplete'}">
                                ${item.completed ? '✓ ' + t.completed : '✗ ' + t.notCompleted}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="modal-footer">
                <button class="gh-btn" onclick="this.closest('.modal-overlay').remove()">${t.close}</button>
            </div>
        </div>
    `;

    elements.modalContainer.appendChild(modal);
}

function getWeeklyTasksSummary(week) {
    const summary = {};
    week.days.forEach(day => {
        day.tasks.forEach(task => {
            const text = task.text.trim();
            // Group by text AND completion status to show separate counts for each
            const statusKey = task.completed ? 'done' : 'pending';
            const key = `${text}|${statusKey}`;

            if (!summary[key]) {
                summary[key] = {
                    text: text,
                    count: 0,
                    completed: task.completed
                };
            }
            summary[key].count++;
        });
    });

    return Object.values(summary).sort((a, b) => {
        // Sort by text alphabetically
        if (a.text !== b.text) {
            return a.text.localeCompare(b.text);
        }
        // If text is same, show completed first
        if (a.completed !== b.completed) {
            return a.completed ? -1 : 1;
        }
        return 0;
    });
}



/**
 * Update navigation button states
 * ===== FIX 2️⃣: Updated to work with ALL weeks (including locked) =====
 */
function updateNavigationButtons() {
    // Get ALL weeks sorted by date
    const weekKeys = Object.keys(allWeeks).sort();
    const currentIndex = weekKeys.indexOf(currentWeekKey);

    // Disable buttons at the boundaries
    elements.btnPrevWeek.disabled = currentIndex <= 0;
    elements.btnNextWeek.disabled = currentIndex === -1 || currentIndex >= weekKeys.length - 1;
}

// ----- SCREEN MANAGEMENT -----

/**
 * Render entire app based on current state
 */
function renderApp() {
    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const monthNames = lang === 'en' ? ENGLISH_MONTHS : ARABIC_MONTHS;
    const monthName = monthNames[appState.month];
    const isPartialWeek = appState.weekNumber === 5 && appState.days.length < 7;

    if (isPartialWeek) {
        const label = TRANSLATIONS[lang].partialWeekLabel.replace('{m}', monthName);
        elements.weekNumber.innerHTML = `
            <span class="week-label">${label}</span>
            <span class="week-separator">-</span>
            <span class="week-year">${appState.year}</span>
        `;
    } else {
        const label = TRANSLATIONS[lang].weekLabel.replace('{n}', appState.weekNumber).replace('{m}', monthName);
        elements.weekNumber.innerHTML = `
            <span class="week-label">${label}</span>
            <span class="week-separator">-</span>
            <span class="week-year">${appState.year}</span>
        `;
    }

    if (!appState.isPlanned) {
        elements.btnViewGoals.classList.add('hidden');
        elements.btnFocusMode.style.display = 'none';
        showLockedScreen();
    } else {
        elements.btnViewGoals.classList.remove('hidden');

        // Focus Mode Logic: Only show if week contains today
        const todayStr = formatDateLocal(new Date());
        const hasToday = appState.days.some(d => d.date === todayStr);

        if (hasToday) {
            elements.btnFocusMode.style.display = 'inline-block';
        } else {
            elements.btnFocusMode.style.display = 'none';
        }

        // Reset Focus Mode ONLY on navigation, not on re-render
        if (currentWeekKey !== previousWeekKey) {
            isFocusMode = false;
            elements.btnFocusMode.classList.remove('focus-mode-active');
            elements.btnFocusMode.setAttribute('aria-pressed', 'false');
        } else if (isFocusMode) {
            // If already in focus mode, re-apply it to new elements
            applyFocusMode();
        }

        showWeekGrid();
    }

    // Update navigation tracking for next render
    previousWeekKey = currentWeekKey;
}

function showLockedScreen() {
    elements.lockedScreen.classList.remove('hidden');
    elements.goalsScreen.classList.add('hidden');
    elements.successMessage.classList.add('hidden');
    elements.weekGrid.classList.add('hidden');
}

function showGoalsScreen() {
    elements.lockedScreen.classList.add('hidden');
    elements.goalsScreen.classList.remove('hidden');
    elements.successMessage.classList.add('hidden');
    elements.weekGrid.classList.add('hidden');
    elements.goalsInput.value = appState.goals || '';
    elements.goalsInput.focus();

    // Show cancel button if already planned
    if (appState.isPlanned) {
        elements.btnCancelGoals.style.display = 'inline-block';
    } else {
        elements.btnCancelGoals.style.display = 'none';
    }
}

function showWeekGrid() {
    elements.lockedScreen.classList.add('hidden');
    elements.goalsScreen.classList.add('hidden');
    elements.weekGrid.classList.remove('hidden');
    renderWeekGrid();
}

// ----- WEEK GRID RENDERING -----

function renderWeekGrid() {
    elements.weekGrid.innerHTML = '';
    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const t = TRANSLATIONS[lang];

    // Check if week is closed (read-only mode)
    const isWeekClosed = appState.isClosed;

    // 1. Render Overlay if week is closed
    if (isWeekClosed) {
        // Calculate stats for overlay
        const totalPercentage = appState.days.reduce((sum, day) => sum + day.completionPercentage, 0);
        const avgPercentage = Math.round(totalPercentage / appState.days.length);
        const gradeClass = getGradeClass(appState.weekGrade);
        const missedStats = getWeeklyMissedTasks(appState);

        // Calculate dynamic week info
        const isPartialWeek = appState.weekNumber === 5 && appState.days.length < 7;
        let infoHtml = '';

        if (isPartialWeek) {
            infoHtml = `<div>${t.partialWeekInfo}</div>`;
        } else {
            const firstDayDate = parseDateLocal(appState.days[0].date);
            const weekOfYear = getISOWeekNumber(firstDayDate);
            const remainingWeeks = 52 - weekOfYear;
            infoHtml = `
                <div>${t.weekOfYear.replace('{n}', weekOfYear)}</div>
                <div>${t.remainingWeeks.replace('{n}', remainingWeeks)}</div>
            `;
        }

        const overlay = document.createElement('div');
        overlay.className = 'week-closed-overlay';
        overlay.innerHTML = `
            <div class="week-closed-content">
                <div class="week-closed-title">${t.weekClosedTitle}</div>
                <div style="margin-bottom: 16px; font-size: 13px; color: var(--color-fg-muted);">
                    ${infoHtml}
                </div>
                <div class="week-closed-stats">
                    <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 8px;">
                        <span class="stat-badge stat-grade ${gradeClass}">${t.evaluation}: ${appState.weekGrade || '-'}</span>
                        <span class="stat-badge stat-percentage">${avgPercentage}%</span>
                    </div>
                    <div style="font-size: 13px; color: var(--color-danger-emphasis); font-weight: 600;">
                        ${t.missedTasks}: ${missedStats.totalMissed} / ${missedStats.totalTasks} (${missedStats.missedPercentage}%)
                    </div>
                </div>
            </div>
        `;
        elements.weekGrid.appendChild(overlay);
    }

    // 2. Render Day Cards
    appState.days.forEach(day => {
        // Pass readOnly flag if week is closed OR day is closed
        const dayCard = createDayCard(day, isWeekClosed);
        elements.weekGrid.appendChild(dayCard);
    });

    // Check if all days are closed for week closure (only if week not already closed)
    if (!isWeekClosed && appState.days.every(d => d.isClosed)) {
        // Prevent multiple modals if one is already open (even if minimized)
        if (!elements.modalContainer.querySelector('.evaluation-modal-overlay')) {
            setTimeout(() => showWeekEvaluationModal(), 500);
        }
    }

    // 3. Cache day cards for performance (Focus Mode)
    cachedDayCards = Array.from(elements.weekGrid.querySelectorAll('.day-card'));
}

function createDayCard(day, isWeekReadOnly = false) {
    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const t = TRANSLATIONS[lang];
    const isReadOnly = isWeekReadOnly || day.isClosed;
    const card = document.createElement('div');
    card.className = `day-card ${isReadOnly ? 'day-closed' : ''}`;
    card.dataset.dayId = day.id;

    // Header
    const gradeClass = getGradeClass(day.grade);
    const dateObj = parseDateLocal(day.date);
    const dayName = (lang === 'en' ? ENGLISH_DAYS : ARABIC_DAYS)[dateObj.getDay()];
    const dateStr = day.date.split('-').reverse().join('/');
    const header = document.createElement('div');
    header.className = 'day-header';
    header.innerHTML = `
        <div class="day-name">
            ${dayName}
            <span style="font-weight: normal; color: var(--color-fg-muted); font-size: 12px; margin-right: 6px;">${dateStr}</span>
        </div>
        ${day.isClosed ? `<div class="day-grade ${gradeClass}">${day.grade}</div>` : ''}
    `;

    // Body
    const body = document.createElement('div');
    body.className = 'day-body';

    // ========== SUB-TABS SYSTEM ==========
    // Ensure day has tabs (backward compatibility)
    if (!day.tabs) {
        day.tabs = getDefaultTabs();
        day.activeTabId = 'all';
    }

    // Create tabs container
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'day-tabs-container';

    // ========== COLLAPSE TABS FEATURE ==========
    // Load collapse state from localStorage (per day)
    const collapseKey = `tabsCollapsed_${day.id}`;
    const isCollapsed = localStorage.getItem(collapseKey) === 'true';
    if (isCollapsed) {
        tabsContainer.classList.add('collapsed');
    }

    // Create tabs header wrapper (contains tabs list + toggle button)
    const tabsHeader = document.createElement('div');
    tabsHeader.className = 'day-tabs-header';

    // Render tabs
    const tabsList = document.createElement('div');
    tabsList.className = 'day-tabs-list';

    day.tabs.forEach(tab => {
        const tabBtn = document.createElement('button');
        tabBtn.className = `day-tab-btn ${day.activeTabId === tab.id ? 'active' : ''}`;
        tabBtn.dataset.tabId = tab.id;
        tabBtn.dataset.dayId = day.id;

        // Display localized name for system tabs
        let tabDisplayName;
        if (tab.id === 'all') {
            tabDisplayName = t.tabAll;
        } else if (tab.id === 'completed') {
            tabDisplayName = t.tabCompleted;
        } else {
            tabDisplayName = tab.name;
        }

        tabBtn.textContent = tabDisplayName;
        tabBtn.addEventListener('click', () => handleTabClick(day.id, tab.id));
        tabsList.appendChild(tabBtn);
    });

    // Add "New Tab" button (only if not read-only)
    if (!isReadOnly) {
        const addTabBtn = document.createElement('button');
        addTabBtn.className = 'day-tab-btn add-tab-btn';
        addTabBtn.dataset.dayId = day.id;
        addTabBtn.textContent = t.addTab;
        addTabBtn.addEventListener('click', () => showAddTabModal(day.id));
        tabsList.appendChild(addTabBtn);
    }

    // Create collapse toggle button
    const collapseToggle = document.createElement('button');
    collapseToggle.className = 'tabs-collapse-toggle';
    collapseToggle.innerHTML = `
        <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
            <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"/>
        </svg>
    `;
    collapseToggle.title = isCollapsed ? 'Expand tabs' : 'Collapse tabs';
    collapseToggle.addEventListener('click', () => toggleTabsCollapse(day.id, tabsContainer, collapseToggle));

    tabsHeader.appendChild(tabsList);
    tabsHeader.appendChild(collapseToggle);
    tabsContainer.appendChild(tabsHeader);
    body.appendChild(tabsContainer);
    // ========== END COLLAPSE TABS FEATURE ==========
    // ========== END SUB-TABS SYSTEM ==========

    // Task input (Only if NOT read-only)
    if (!isReadOnly) {
        const taskInputContainer = document.createElement('div');
        taskInputContainer.className = 'task-input-container';
        taskInputContainer.innerHTML = `
            <textarea class="gh-textarea task-textarea" placeholder="${t.taskPlaceholder}" rows="1"></textarea>
        `;
        body.appendChild(taskInputContainer);
    }

    // For the 'Completed' tab, tasks are always read-only
    const isTabReadOnly = isReadOnly || day.activeTabId === 'completed';

    // Filter tasks based on active tab
    const filteredTasks = filterTasksByTab(day.tasks, day.activeTabId);

    // Task list
    const taskList = document.createElement('ul');
    taskList.className = 'task-list';

    if (day.activeTabId === 'completed' && filteredTasks.length === 0) {
        // Show empty state for completed tab
        const emptyState = document.createElement('div');
        emptyState.style.padding = '20px';
        emptyState.style.textAlign = 'center';
        emptyState.style.color = 'var(--color-fg-muted)';
        emptyState.style.fontSize = '12px';
        emptyState.textContent = t.noCompletedTasks;
        taskList.appendChild(emptyState);
    } else {
        filteredTasks.forEach(task => {
            const taskItem = createTaskElement(task, day.id, isTabReadOnly);
            taskList.appendChild(taskItem);
        });
    }

    body.appendChild(taskList);

    // Footer
    const footer = document.createElement('div');
    footer.className = 'day-footer';

    if (!isReadOnly) {
        footer.innerHTML = `
            <button class="gh-btn btn-add-task">${t.addTask}</button>
            ${day.tasks.length > 0 ? `<button class="gh-btn gh-btn-primary btn-end-day">${t.endDay}</button>` : ''}
        `;
    } else {
        // Show completion status if closed
        if (day.isClosed) {
            footer.innerHTML = `<span style="color: var(--color-success-fg); font-size: 12px; font-weight: 600;">✓ ${t.completed} (${day.completionPercentage}%)</span>`;
        } else {
            // Week is closed but day wasn't formally closed (shouldn't happen normally but good fallback)
            footer.innerHTML = `<span style="color: var(--color-fg-muted); font-size: 12px;">${t.closed}</span>`;
        }
    }

    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);

    // Event listeners (Only if NOT read-only)
    if (!isReadOnly) {
        setupDayCardEvents(card, day);
    }

    return card;
}

/**
 * ========== COLLAPSE TABS FEATURE ==========
 * Toggle collapse state of tabs in a day card
 * @param {string} dayId - The day ID
 * @param {HTMLElement} tabsContainer - The tabs container element
 * @param {HTMLElement} toggleButton - The toggle button element
 */
function toggleTabsCollapse(dayId, tabsContainer, toggleButton) {
    const collapseKey = `tabsCollapsed_${dayId}`;
    const isCurrentlyCollapsed = tabsContainer.classList.contains('collapsed');

    if (isCurrentlyCollapsed) {
        // Expand
        tabsContainer.classList.remove('collapsed');
        localStorage.setItem(collapseKey, 'false');
        toggleButton.title = 'Collapse tabs';
    } else {
        // Collapse
        tabsContainer.classList.add('collapsed');
        localStorage.setItem(collapseKey, 'true');
        toggleButton.title = 'Expand tabs';
    }
}
// ========== END COLLAPSE TABS FEATURE ==========


/**
 * Handle tab click - filters tasks by the selected tab
 * @param {string} dayId - The day ID
 * @param {string} tabId - The tab ID to activate
 */
function handleTabClick(dayId, tabId) {
    const day = appState.days.find(d => d.id === dayId);
    if (day) {
        day.activeTabId = tabId;
        saveAllWeeks();
        renderWeekGrid();
    }
}

/**
 * Filter tasks based on the active tab
 * - 'all': Shows all tasks
 * - 'done': Shows only completed tasks
 * - custom tabs: Shows tasks assigned to that tab (+ also in 'all')
 * 
 * @param {Array} tasks - Array of tasks
 * @param {string} activeTabId - The active tab ID
 * @returns {Array} Filtered tasks
 */
function filterTasksByTab(tasks, activeTabId) {
    if (activeTabId === 'all') {
        // Show ALL UNCOMPLETED tasks (as per requirements)
        // Modified: Hide completed tasks from 'All' tab
        return tasks.filter(task => !task.completed);
    } else if (activeTabId === 'completed') {
        // Added: Show only completed tasks
        return tasks.filter(task => task.completed);
    } else {
        // Custom tab: show tasks assigned to this tab
        return tasks.filter(task => task.tabId === activeTabId);
    }
}

/**
 * Show modal to add a new custom tab to a day
 * @param {string} dayId - The day ID
 */
function showAddTabModal(dayId) {
    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const t = TRANSLATIONS[lang];

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal" style="max-width: 400px;">
            <div class="modal-header">
                <h2>${t.addTabTitle}</h2>
            </div>
            <div class="modal-body">
                <input type="text" id="newTabNameInput" class="gh-textarea" placeholder="${t.tabNamePlaceholder}" style="margin-bottom: 0;">
            </div>
            <div class="modal-footer">
                <button class="gh-btn gh-btn-primary" id="btnConfirmAddTab">${t.addTabTitle}</button>
                <button class="gh-btn" id="btnCancelAddTab">${t.close}</button>
            </div>
        </div>
    `;

    elements.modalContainer.appendChild(modal);

    const input = modal.querySelector('#newTabNameInput');
    input.focus();

    // Handle Enter key
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            createNewTab(dayId, input.value.trim(), modal);
        }
    });

    // Confirm button
    modal.querySelector('#btnConfirmAddTab').addEventListener('click', () => {
        createNewTab(dayId, input.value.trim(), modal);
    });

    // Cancel button
    modal.querySelector('#btnCancelAddTab').addEventListener('click', () => {
        modal.remove();
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Create a new custom tab for a day
 * @param {string} dayId - The day ID
 * @param {string} tabName - The name of the new tab
 * @param {HTMLElement} modal - The modal element to close
 */
function createNewTab(dayId, tabName, modal) {
    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const t = TRANSLATIONS[lang];

    if (!tabName) {
        alert(t.tabNameRequired);
        return;
    }

    const day = appState.days.find(d => d.id === dayId);
    if (day) {
        // Generate unique tab ID
        const tabId = `tab-${Date.now()}`;

        // Add new tab (before the system tabs are at the start)
        day.tabs.push({
            id: tabId,
            name: tabName,
            isSystem: false
        });

        // Switch to the new tab
        day.activeTabId = tabId;

        saveAllWeeks();
        modal.remove();
        renderWeekGrid();
    }
}

function createTaskElement(task, dayId, isReadOnly = false) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : (task.missed || isReadOnly ? 'task-missed' : '')}`;
    li.dataset.taskId = task.id;
    li.dataset.dayId = dayId;

    if (isReadOnly) {
        // Read-only view: No checkbox, no delete button, no drag handle
        li.innerHTML = `
            <span class="task-checkbox" style="border-color: transparent; background-color: ${task.completed ? 'var(--color-accent-emphasis)' : 'transparent'}; width: 8px; height: 8px; border-radius: 50%;"></span>
            <span class="task-text">${task.text}</span>
        `;
    } else {
        // Interactive view with drag handle
        li.innerHTML = `
            <span class="drag-handle" title="Hold to drag">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                    <path d="M5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                </svg>
            </span>
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <div style="display: flex; gap: 4px;">
                <button class="btn-miss-task" title="Mark as missed" style="${task.completed ? 'display: none;' : (task.missed ? 'color: var(--color-danger-emphasis); opacity: 1;' : '')}">
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                        <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
                    </svg>
                </button>
                <button class="btn-delete-task" title="Delete task">
                    <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" fill="currentColor"><path d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75ZM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15ZM6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25Z"></path></svg>
                </button>
            </div>
        `;

        const day = appState.days.find(d => d.id === dayId);
        if (!day.isClosed) {
            const checkbox = li.querySelector('.task-checkbox');
            checkbox.addEventListener('change', (e) => {
                toggleTaskCompletion(dayId, task.id, e.target.checked);
            });

            const deleteBtn = li.querySelector('.btn-delete-task');
            deleteBtn.addEventListener('click', () => {
                deleteTask(dayId, task.id);
            });

            const missBtn = li.querySelector('.btn-miss-task');
            missBtn.addEventListener('click', () => {
                toggleTaskMissed(dayId, task.id);
            });

            // Setup drag handle events
            const dragHandle = li.querySelector('.drag-handle');
            setupDragHandle(dragHandle, li, dayId);
        }
    }

    return li;
}

function setupDayCardEvents(card, day) {
    const addBtn = card.querySelector('.btn-add-task');
    const inputContainer = card.querySelector('.task-input-container');
    const taskInput = card.querySelector('.gh-textarea');
    const endDayBtn = card.querySelector('.btn-end-day');

    addBtn?.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text) {
            addTask(day.id, text);
            taskInput.value = '';
            taskInput.focus();
            // Reset height if it was expanded
            taskInput.style.height = 'auto';
        } else {
            inputContainer.classList.add('active');
            taskInput.focus();
        }
    });

    // New Behavior: Add task on Enter key only
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const text = taskInput.value.trim();
            if (text) {
                addTask(day.id, text);
                taskInput.value = '';
                taskInput.focus();
                taskInput.style.height = 'auto';
            }
        }
    });

    // Auto-expand textarea
    taskInput.addEventListener('input', () => {
        taskInput.style.height = 'auto';
        taskInput.style.height = taskInput.scrollHeight + 'px';
    });

    // Close input on blur if empty
    taskInput.addEventListener('blur', () => {
        if (!taskInput.value.trim()) {
            inputContainer.classList.remove('active');
        }
    });

    endDayBtn?.addEventListener('click', () => {
        closeDay(day.id);
    });
}

// ----- TASK MANAGEMENT -----

/**
 * Add a task to a day (supports multiple tasks via lines or commas)
 * Automatically assigns it to the currently active tab
 * @param {string} dayId - The day ID to add task to
 * @param {string} text - The task text or multi-line tasks
 */
function addTask(dayId, text) {
    const day = appState.days.find(d => d.id === dayId);
    if (!day || day.isClosed) return;

    // Use current active tab ID, but never default to 'completed' tab for new tasks
    let targetTabId = day.activeTabId || 'all';
    if (targetTabId === 'completed') targetTabId = 'all';

    // Parse multiple tasks separated by new lines or commas
    const taskLines = text.split(/[\n,]/).map(t => t.trim()).filter(t => t !== '');

    if (taskLines.length === 0) return;

    let anyAdded = false;
    taskLines.forEach(taskText => {
        day.tasks.push({
            id: `task-${Date.now()}-${Math.random()}`,
            text: taskText,
            completed: false,
            tabId: targetTabId
        });
        anyAdded = true;
    });

    if (anyAdded) {
        sortTasks(day.tasks);
        saveAllWeeks();
        renderWeekGrid();
    }
}

function toggleTaskCompletion(dayId, taskId, completed) {
    const day = appState.days.find(d => d.id === dayId);
    if (day && !day.isClosed) {
        const task = day.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = completed;
            if (completed) task.missed = false; // Cannot be missed if completed
            sortTasks(day.tasks); // Move completed to bottom

            // Auto-close if all tasks completed
            if (day.tasks.length > 0 && day.tasks.every(t => t.completed)) {
                closeDay(dayId);
                return;
            }

            saveAllWeeks();
            // Re-render to update completion percentage and order
            renderWeekGrid();
        }
    }
}

function toggleTaskMissed(dayId, taskId) {
    const day = appState.days.find(d => d.id === dayId);
    if (day && !day.isClosed) {
        const task = day.tasks.find(t => t.id === taskId);
        if (task) {
            task.missed = !task.missed;
            if (task.missed) task.completed = false; // Cannot be completed if missed
            saveAllWeeks();
            renderWeekGrid();
        }
    }
}

function deleteTask(dayId, taskId) {
    const day = appState.days.find(d => d.id === dayId);
    if (day && !day.isClosed) {
        day.tasks = day.tasks.filter(t => t.id !== taskId);

        // Auto-close if all remaining tasks completed (and there are tasks)
        if (day.tasks.length > 0 && day.tasks.every(t => t.completed)) {
            closeDay(dayId);
            return;
        }

        saveAllWeeks();
        renderWeekGrid();
    }
}

// ----- DRAG AND DROP REORDERING -----

// Drag state variables
let dragState = {
    isDragging: false,
    longPressTimer: null,
    draggedElement: null,
    placeholder: null,
    dayId: null,
    startY: 0,
    offsetY: 0,
    taskList: null
};

const LONG_PRESS_DURATION = 100; // ms to hold before drag activates

/**
 * Setup drag handle events for a task item
 */
function setupDragHandle(handle, taskItem, dayId) {
    // Mouse events
    handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startLongPress(e, taskItem, dayId);
    });

    // Touch events for mobile
    handle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        startLongPress(touch, taskItem, dayId);
    }, { passive: false });

    // Prevent text selection on drag handle
    handle.addEventListener('selectstart', (e) => e.preventDefault());
}

/**
 * Start long press timer
 */
function startLongPress(event, taskItem, dayId) {
    clearLongPressTimer();

    const startY = event.clientY || event.pageY;

    dragState.longPressTimer = setTimeout(() => {
        activateDrag(taskItem, dayId, startY);
    }, LONG_PRESS_DURATION);

    // Add temporary listeners for mouse/touch move and up to cancel if moved too much
    const cancelHandler = (e) => {
        const currentY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : startY);
        if (Math.abs(currentY - startY) > 5) {
            clearLongPressTimer();
        }
    };

    const endHandler = () => {
        clearLongPressTimer();
        document.removeEventListener('mousemove', cancelHandler);
        document.removeEventListener('touchmove', cancelHandler);
        document.removeEventListener('mouseup', endHandler);
        document.removeEventListener('touchend', endHandler);
    };

    document.addEventListener('mousemove', cancelHandler);
    document.addEventListener('touchmove', cancelHandler);
    document.addEventListener('mouseup', endHandler);
    document.addEventListener('touchend', endHandler);
}

/**
 * Clear long press timer
 */
function clearLongPressTimer() {
    if (dragState.longPressTimer) {
        clearTimeout(dragState.longPressTimer);
        dragState.longPressTimer = null;
    }
}

/**
 * Activate drag mode
 */
function activateDrag(taskItem, dayId, startY) {
    dragState.isDragging = true;
    dragState.draggedElement = taskItem;
    dragState.dayId = dayId;
    dragState.startY = startY;
    dragState.taskList = taskItem.closest('.task-list');

    // Get item dimensions and position
    const rect = taskItem.getBoundingClientRect();
    dragState.offsetY = startY - rect.top;

    // Create placeholder
    dragState.placeholder = document.createElement('li');
    dragState.placeholder.className = 'task-item task-placeholder';
    dragState.placeholder.style.height = rect.height + 'px';

    // Style the dragged element
    taskItem.classList.add('dragging');
    taskItem.style.width = rect.width + 'px';
    taskItem.style.position = 'fixed';
    taskItem.style.left = rect.left + 'px';
    taskItem.style.top = rect.top + 'px';
    taskItem.style.zIndex = '1000';

    // Insert placeholder
    taskItem.parentNode.insertBefore(dragState.placeholder, taskItem);
    document.body.appendChild(taskItem);

    // Add visual feedback
    document.body.classList.add('is-dragging');

    // Setup move and end handlers
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);

    // Haptic feedback on mobile (if available)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

/**
 * Handle drag move
 */
function handleDragMove(e) {
    if (!dragState.isDragging) return;

    e.preventDefault();

    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : dragState.startY);

    // Move the dragged element
    const newTop = clientY - dragState.offsetY;
    dragState.draggedElement.style.top = newTop + 'px';

    // Find the task item we're hovering over
    const taskItems = Array.from(dragState.taskList.querySelectorAll('.task-item:not(.dragging):not(.task-placeholder)'));

    for (const item of taskItems) {
        const rect = item.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;

        if (clientY < midpoint) {
            // Insert placeholder before this item
            if (item.previousSibling !== dragState.placeholder) {
                dragState.taskList.insertBefore(dragState.placeholder, item);
            }
            break;
        } else if (item === taskItems[taskItems.length - 1]) {
            // Insert placeholder after the last item
            if (item.nextSibling !== dragState.placeholder) {
                dragState.taskList.insertBefore(dragState.placeholder, item.nextSibling);
            }
        }
    }
}

/**
 * Handle drag end
 */
function handleDragEnd() {
    if (!dragState.isDragging) return;

    // Remove event listeners
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchend', handleDragEnd);

    // Get the new order
    const newOrder = getNewTaskOrder();

    // Reset dragged element styles
    const draggedEl = dragState.draggedElement;
    draggedEl.classList.remove('dragging');
    draggedEl.style.position = '';
    draggedEl.style.left = '';
    draggedEl.style.top = '';
    draggedEl.style.width = '';
    draggedEl.style.zIndex = '';

    // Replace placeholder with the dragged element
    if (dragState.placeholder && dragState.placeholder.parentNode) {
        dragState.placeholder.parentNode.insertBefore(draggedEl, dragState.placeholder);
        dragState.placeholder.remove();
    }

    // Remove visual feedback
    document.body.classList.remove('is-dragging');

    // Update the task order in the data model
    updateTaskOrder(dragState.dayId, newOrder);

    // Reset drag state
    dragState = {
        isDragging: false,
        longPressTimer: null,
        draggedElement: null,
        placeholder: null,
        dayId: null,
        startY: 0,
        offsetY: 0,
        taskList: null
    };
}

/**
 * Get the new task order from DOM
 */
function getNewTaskOrder() {
    const taskItems = dragState.taskList.querySelectorAll('.task-item:not(.task-placeholder)');
    const order = [];
    taskItems.forEach(item => {
        if (item.dataset.taskId) {
            order.push(item.dataset.taskId);
        }
    });
    // Also include the dragged element's task ID in its correct position
    const placeholderIndex = Array.from(dragState.taskList.children).indexOf(dragState.placeholder);
    const draggedTaskId = dragState.draggedElement.dataset.taskId;

    // Remove dragged element from order if it's there (it shouldn't be since it's in body)
    const filteredOrder = order.filter(id => id !== draggedTaskId);

    // Insert dragged task ID at placeholder position
    filteredOrder.splice(placeholderIndex, 0, draggedTaskId);

    return filteredOrder;
}

/**
 * Update task order in data model and save
 */
function updateTaskOrder(dayId, newOrder) {
    const day = appState.days.find(d => d.id === dayId);
    if (!day) return;

    // Create a set of moved task IDs for quick lookup
    const movedIds = new Set(newOrder);

    // Keep tasks that were NOT in the current view (hidden tasks)
    const hiddenTasks = day.tasks.filter(task => !movedIds.has(task.id));

    // Create a map of moved tasks by ID for easy access
    const movedTasksMap = {};
    day.tasks.forEach(task => {
        if (movedIds.has(task.id)) {
            movedTasksMap[task.id] = task;
        }
    });

    // Create the reordered list from moved tasks based on the new order from DOM
    const reorderedMovedTasks = [];
    newOrder.forEach(taskId => {
        if (movedTasksMap[taskId]) {
            reorderedMovedTasks.push(movedTasksMap[taskId]);
        }
    });

    // Merge hidden tasks with reordered moved tasks
    const allTasks = [...hiddenTasks, ...reorderedMovedTasks];

    // Enforce sorting rules (Incomplete first, Completed last)
    sortTasks(allTasks);

    // Update the day's tasks
    day.tasks = allTasks;

    // Save to LocalStorage
    saveAllWeeks();
    renderWeekGrid(); // Re-render to reflect enforced order
}

// ----- DAY CLOSURE -----

function closeDay(dayId) {
    const day = appState.days.find(d => d.id === dayId);
    if (!day || day.isClosed || day.tasks.length === 0) return;

    const completedTasks = day.tasks.filter(t => t.completed).length;
    const totalTasks = day.tasks.length;
    const percentage = Math.round((completedTasks / totalTasks) * 100);
    const grade = calculateGrade(percentage);

    day.isClosed = true;
    day.completionPercentage = percentage;
    day.grade = grade;

    saveAllWeeks();
    renderWeekGrid();

    // Celebration for finishing the day!
    triggerCelebration();
}

/**
 * Automatically close days that have passed
 */
function checkAutoCloseDays() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let anyChanged = false;

    Object.values(allWeeks).forEach(week => {
        if (!week.isPlanned || week.isClosed) return;

        let weekChanged = false;
        week.days.forEach(day => {
            const dayDate = parseDateLocal(day.date);
            dayDate.setHours(0, 0, 0, 0);

            if (today > dayDate && !day.isClosed) {
                const totalTasks = day.tasks.length;
                const completedTasks = day.tasks.filter(t => t.completed).length;
                const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
                const grade = totalTasks > 0 ? calculateGrade(percentage) : '-';

                day.isClosed = true;
                day.completionPercentage = percentage;
                day.grade = grade;
                weekChanged = true;
                anyChanged = true;
            }
        });
    });

    if (anyChanged) {
        saveAllWeeks();
    }
}

// ----- WEEK EVALUATION MODAL -----

function showWeekEvaluationModal() {
    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const t = TRANSLATIONS[lang];
    const modal = document.createElement('div');
    modal.className = 'modal-overlay evaluation-modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>${t.evalModalTitle}</h2>
                <div style="display: flex; gap: 8px;">
                    <button id="btnMinimizeEval" class="gh-btn" style="padding: 2px 8px; font-size: 12px; min-width: 30px;" title="Minimize">_</button>
                    <button class="gh-btn" onclick="this.closest('.modal-overlay').remove()" style="padding: 2px 8px; font-size: 12px; min-width: 30px;">${t.times}</button>
                </div>
            </div>
            <div class="modal-body">
                <label>${t.evalNotes}</label>
                <textarea id="weekNotes" class="gh-textarea" rows="3"></textarea>
                
                <label>${t.evalGood}</label>
                <textarea id="weekGood" class="gh-textarea" rows="3"></textarea>
                
                <label>${t.evalBad}</label>
                <textarea id="weekBad" class="gh-textarea" rows="3"></textarea>
                
                <label>${t.evalLessons}</label>
                <textarea id="weekLessons" class="gh-textarea" rows="3"></textarea>
            </div>
            <div class="modal-footer">
                <button class="gh-btn gh-btn-primary" id="saveWeekEvaluation">${t.evalSave}</button>
            </div>
        </div>
    `;

    elements.modalContainer.appendChild(modal);

    // Minimize logic
    const btnMinimize = modal.querySelector('#btnMinimizeEval');
    btnMinimize.addEventListener('click', () => {
        modal.classList.toggle('minimized-modal-overlay');
        btnMinimize.textContent = modal.classList.contains('minimized-modal-overlay') ? '▢' : '_';
    });

    document.getElementById('saveWeekEvaluation').addEventListener('click', () => {
        const notes = document.getElementById('weekNotes').value;
        const good = document.getElementById('weekGood').value;
        const bad = document.getElementById('weekBad').value;
        const lessons = document.getElementById('weekLessons').value;

        // Calculate week grade (average of all days)
        const totalPercentage = appState.days.reduce((sum, day) => sum + day.completionPercentage, 0);
        const avgPercentage = Math.round(totalPercentage / appState.days.length);
        const weekGrade = calculateGrade(avgPercentage);

        appState.isClosed = true;
        appState.weekGrade = weekGrade;
        appState.weekFeedback = { notes, good, bad, lessons };

        saveAllWeeks();
        modal.remove();

        const successMsg = t.evalSuccess.replace('{g}', weekGrade).replace('{p}', avgPercentage);

        // Celebration for finishing the week!
        triggerCelebration(200); // More confetti for the whole week

        alert(successMsg);

        // ===== FIX 1️⃣: AUTOMATICALLY CREATE AND NAVIGATE TO NEXT WEEK =====
        // Check if next week exists in current month
        let nextYear = appState.year;
        let nextMonth = appState.month;
        let nextWeekIndex = appState.weekNumber + 1;

        let nextWeekDates = getWeekDates(nextYear, nextMonth, nextWeekIndex);

        if (nextWeekDates.length === 0) {
            // Move to next month
            nextMonth++;
            nextWeekIndex = 1;
            if (nextMonth > 11) {
                nextMonth = 0;
                nextYear++;
            }
            nextWeekDates = getWeekDates(nextYear, nextMonth, nextWeekIndex);
        }

        const nextWeekKey = getWeekKey(nextYear, nextMonth, nextWeekIndex);

        // Create next week if it doesn't exist
        if (!allWeeks[nextWeekKey]) {
            allWeeks[nextWeekKey] = {
                year: nextYear,
                month: nextMonth,
                weekNumber: nextWeekIndex,
                goals: '',
                isPlanned: false,  // Start as LOCKED
                isClosed: false,
                weekGrade: null,
                weekFeedback: null,
                days: nextWeekDates.map((date, index) => ({
                    id: `day-${index}`,
                    name: (lang === 'en' ? ENGLISH_DAYS : ARABIC_DAYS)[date.getDay()],
                    date: formatDateLocal(date),
                    tasks: [],
                    isClosed: false,
                    grade: null,
                    completionPercentage: 0,
                    // Sub-Tabs: Initialize with default tabs
                    tabs: getDefaultTabs(),
                    activeTabId: 'all'
                }))
            };
            saveAllWeeks();
        }

        // Navigate to the next week
        currentWeekKey = nextWeekKey;
        appState = allWeeks[currentWeekKey];

        renderApp();
        updateNavigationButtons();
    });
}

// ----- NAVIGATION -----

// ===== FIX 2️⃣: IMPROVED NAVIGATION TO INCLUDE LOCKED WEEKS =====
// Navigation now works with ALL weeks (planned and locked), not just planned ones
// This allows users to go back to previous weeks and forward to current week

elements.btnPrevWeek.addEventListener('click', () => {
    // Get ALL weeks (including locked ones) sorted by date
    const weekKeys = Object.keys(allWeeks).sort();
    const currentIndex = weekKeys.indexOf(currentWeekKey);

    if (currentIndex > 0) {
        currentWeekKey = weekKeys[currentIndex - 1];
        appState = allWeeks[currentWeekKey];
        renderApp();
        updateNavigationButtons();
    }
});

elements.btnNextWeek.addEventListener('click', () => {
    // Get ALL weeks (including locked ones) sorted by date
    const weekKeys = Object.keys(allWeeks).sort();
    const currentIndex = weekKeys.indexOf(currentWeekKey);

    if (currentIndex < weekKeys.length - 1) {
        currentWeekKey = weekKeys[currentIndex + 1];
        appState = allWeeks[currentWeekKey];
        renderApp();
        updateNavigationButtons();
    }
});

elements.btnTodayWeek.addEventListener('click', () => {
    const today = new Date();
    const { year, month, weekIndex } = getMonthWeekInfo(today);
    const todayKey = getWeekKey(year, month, weekIndex);

    if (!allWeeks[todayKey]) {
        const weekDates = getWeekDates(year, month, weekIndex);
        allWeeks[todayKey] = {
            year,
            month,
            weekNumber: weekIndex,
            goals: '',
            isPlanned: false,
            isClosed: false,
            weekGrade: null,
            weekFeedback: null,
            days: weekDates.map((date, index) => ({
                id: `day-${index}`,
                name: (localStorage.getItem('lang') === 'en' ? ENGLISH_DAYS : ARABIC_DAYS)[date.getDay()],
                date: formatDateLocal(date),
                tasks: [],
                isClosed: false,
                grade: null,
                completionPercentage: 0,
                // Sub-Tabs: Initialize with default tabs
                tabs: getDefaultTabs(),
                activeTabId: 'all'
            }))
        };
        saveAllWeeks();
    }

    currentWeekKey = todayKey;
    appState = allWeeks[currentWeekKey];
    checkAutoCloseDays(); // Check if any days in the current week have already passed
    renderApp();
    updateNavigationButtons();
});

// ----- REPORTS -----

elements.btnViewReports.addEventListener('click', () => {
    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const t = TRANSLATIONS[lang];
    const closedWeeks = Object.entries(allWeeks)
        .filter(([key, week]) => week.isClosed)
        .sort(([a], [b]) => b.localeCompare(a));

    if (closedWeeks.length === 0) {
        alert(t.noReports);
        return;
    }

    // Group weeks by Year and Month
    const groupedReports = {};
    const monthNames = lang === 'en' ? ENGLISH_MONTHS : ARABIC_MONTHS;

    closedWeeks.forEach(([key, week]) => {
        const year = week.year;
        const month = week.month;
        if (!groupedReports[year]) groupedReports[year] = {};
        if (!groupedReports[year][month]) groupedReports[year][month] = [];
        groupedReports[year][month].push({ key, ...week });
    });

    // Generate grouped HTML
    let reportsHtml = '';
    const sortedYears = Object.keys(groupedReports).sort((a, b) => b - a);

    sortedYears.forEach(year => {
        const sortedMonths = Object.keys(groupedReports[year]).sort((a, b) => b - a);
        sortedMonths.forEach(month => {
            const monthName = monthNames[month];
            const weeksInMonth = groupedReports[year][month];

            reportsHtml += `
                <div class="month-report-section" style="margin-bottom: 12px; border: 1px solid var(--color-border-default); border-radius: 8px; overflow: hidden; background: var(--color-canvas-subtle); box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <div class="month-report-header" style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: background 0.2s; background: var(--color-canvas-default);" 
                         onmouseover="this.style.background='var(--color-canvas-subtle)'" 
                         onmouseout="this.style.background='var(--color-canvas-default)'"
                         onclick="const body = this.nextElementSibling; const isHidden = body.style.display === 'none'; body.style.display = isHidden ? 'block' : 'none'; this.querySelector('.arrow').style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 20px;">📅</span>
                            <div style="display: flex; flex-direction: column;">
                                <strong style="font-size: 15px; color: var(--color-fg-default);">${monthName} ${year}</strong>
                                <span style="font-size: 12px; color: var(--color-fg-muted);">${weeksInMonth.length} ${lang === 'ar' ? 'أسابيع' : 'Weeks'}</span>
                            </div>
                        </div>
                        <span class="arrow" style="transition: transform 0.2s; font-size: 12px; color: var(--color-fg-muted);">▶</span>
                    </div>
                    <div class="month-report-weeks" style="display: none; padding: 12px; background: var(--color-canvas-default); border-top: 1px solid var(--color-border-default);">
                        ${weeksInMonth.map(week => {
                const weekLabel = t.weekLabel.replace('{n}', week.weekNumber).replace('{m}', monthName);
                const missedStats = getWeeklyMissedTasks(week);
                return `
                                <div class="report-item" style="border: 1px solid var(--color-border-muted); border-radius: 6px; padding: 12px; margin-bottom: 12px; background: var(--color-canvas-default);">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                                        <h3 style="font-size: 14px; margin: 0; color: var(--color-accent-fg);">${weekLabel}</h3>
                                        <button class="gh-btn btn-view-week-tasks" data-week-key="${week.key}" style="font-size: 11px; padding: 2px 8px;">${t.weeklyTasks}</button>
                                    </div>
                                    <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 8px;">
                                        <p style="font-size: 12px; color: var(--color-fg-muted); margin: 0;"><strong>${t.evaluation}:</strong> <span class="day-grade ${getGradeClass(week.weekGrade)}">${week.weekGrade}</span></p>
                                        <p style="font-size: 12px; color: var(--color-danger-emphasis); margin: 0;"><strong>${t.missedPercentage}:</strong> ${missedStats.missedPercentage}%</p>
                                    </div>
                                    ${week.weekFeedback ? `
                                        <div style="margin-top: 8px; font-size: 12px; border-top: 1px solid var(--color-border-muted); padding-top: 8px; color: var(--color-fg-muted);">
                                            ${week.weekFeedback.good ? `<p style="margin: 2px 0;"><strong style="color: var(--color-success-fg);">${t.evalGood}:</strong> ${week.weekFeedback.good}</p>` : ''}
                                            ${week.weekFeedback.bad ? `<p style="margin: 2px 0;"><strong style="color: var(--color-danger-fg);">${t.evalBad}:</strong> ${week.weekFeedback.bad}</p>` : ''}
                                            ${week.weekFeedback.lessons ? `<p style="margin: 2px 0; font-style: italic;"><strong>${t.evalLessons}:</strong> ${week.weekFeedback.lessons}</p>` : ''}
                                            ${week.weekFeedback.notes ? `<p style="margin: 2px 0; font-size: 11px; color: var(--color-fg-subtle);"><strong>${t.evalNotes}:</strong> ${week.weekFeedback.notes}</p>` : ''}
                                        </div>
                                    ` : ''}
                                </div>
                            `;
            }).join('')}
                    </div>
                </div>
            `;
        });
    });

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header" style="display: flex; align-items: center; gap: 12px;">
                <button class="modal-close" id="btnBackFromReports" style="padding: 4px; margin-left: -8px;">
                    <svg viewBox="0 0 16 16" width="16" height="16">
                        <path fill="currentColor" d="M7.78 12.53a.75.75 0 0 1-1.06 0L2.47 8.28a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L4.81 7.25h9.44a.75.75 0 0 1 0 1.5H4.81l2.97 2.97a.75.75 0 0 1 0 1.06Z"></path>
                    </svg>
                </button>
                <h2 style="margin: 0;">${t.reportsTitle}</h2>
            </div>
            <div class="modal-body" style="background: var(--color-canvas-subtle); padding: 16px; min-height: 300px;">
                ${reportsHtml}
            </div>
            <div class="modal-footer">
                <button class="gh-btn" onclick="this.closest('.modal-overlay').remove()">${t.close}</button>
            </div>
        </div>
    `;

    elements.modalContainer.appendChild(modal);

    // Back button logic
    modal.querySelector('#btnBackFromReports').addEventListener('click', () => {
        modal.remove();
        openSettingsModal();
    });

    // Add event listeners for "Weekly Tasks" buttons
    modal.querySelectorAll('.btn-view-week-tasks').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showWeeklyTasksModal(btn.dataset.weekKey);
        });
    });
});

// ----- VIEW GOALS -----

elements.btnViewGoals.addEventListener('click', () => {
    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const t = TRANSLATIONS[lang];

    if (!appState.goals) {
        alert(t.writeGoalsAlert);
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';

    // Function to render modal content based on mode (view/edit)
    // This allows the user to edit goals without leaving the modal
    function renderModalContent(isEditing = false) {
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2>${t.weeklyGoalsTitle}</h2>
                </div>
                <div class="modal-body">
                    <div class="gh-box">
                        <div class="gh-box-body">
                            ${isEditing
                ? `<textarea id="modalGoalsInput" class="gh-textarea" rows="8" style="width: 100%; min-height: 200px;">${appState.goals}</textarea>`
                : `<div style="white-space: pre-wrap; font-size: 16px; line-height: 1.6;">${appState.goals}</div>`
            }
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="display: flex; gap: 8px; justify-content: flex-end;">
                    ${isEditing
                ? `<button class="gh-btn gh-btn-primary" id="btnSaveGoalsModal">${t.saveGoals}</button>
                           <button class="gh-btn" id="btnCancelEditModal">${t.close}</button>`
                : `<button class="gh-btn gh-btn-primary" id="btnEditGoalsModal">${t.edit}</button>
                           <button class="gh-btn" id="btnCloseGoalsModal">${t.close}</button>`
            }
                </div>
            </div>
        `;

        // Add event listeners for the newly rendered buttons
        if (isEditing) {
            // Handle saving the edited goals
            modal.querySelector('#btnSaveGoalsModal').addEventListener('click', () => {
                const newGoals = modal.querySelector('#modalGoalsInput').value.trim();
                if (newGoals) {
                    // Update state and persist to LocalStorage (Requirement 1 & 3)
                    appState.goals = newGoals;
                    saveAllWeeks();

                    // Switch back to view mode immediately (Requirement 1)
                    renderModalContent(false);

                    // Sync with main goals input if it exists
                    if (elements.goalsInput) elements.goalsInput.value = newGoals;
                } else {
                    // Validation: empty goals should not be saved (Requirement 2)
                    alert(t.writeGoalsAlert);
                }
            });

            // Cancel editing and return to view mode
            modal.querySelector('#btnCancelEditModal').addEventListener('click', () => {
                renderModalContent(false);
            });
        } else {
            // Switch to edit mode (Requirement 1)
            modal.querySelector('#btnEditGoalsModal').addEventListener('click', () => {
                renderModalContent(true);
            });

            // Close the modal
            modal.querySelector('#btnCloseGoalsModal').addEventListener('click', () => {
                modal.remove();
            });
        }
    }

    renderModalContent(false);
    elements.modalContainer.appendChild(modal);
});

// ----- EXPORT/IMPORT -----

elements.btnExportImport.addEventListener('click', () => {
    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const t = TRANSLATIONS[lang];
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>${t.exportImportTitle}</h2>
            </div>
            <div class="modal-body">
                <div class="gh-box" style="margin-bottom: 16px;">
                    <div class="gh-box-header">
                        <h3>${t.export}</h3>
                    </div>
                    <div class="gh-box-body">
                        <p>${t.exportDesc}</p>
                        <button class="gh-btn gh-btn-primary" id="exportDataBtn">${t.exportBtn}</button>
                    </div>
                </div>
                
                <div class="gh-box">
                    <div class="gh-box-header">
                        <h3>${t.import}</h3>
                    </div>
                    <div class="gh-box-body">
                        <p>${t.importDesc}</p>
                        <input type="file" id="importFile" accept=".json" style="margin-bottom: 8px;display: block;width: 100%;background: transparent;">
                        <button class="gh-btn gh-btn-primary" id="importDataBtn">${t.importBtn}</button>
                    </div>
                </div>

                <div class="gh-box" style="margin-top: 16px;">
                    <div class="gh-box-header">
                        <h3>${t.autoExport}</h3>
                    </div>
                    <div class="gh-box-body">
                        <p>${t.autoExportDesc}</p>
                        <div id="autoExportStatus" style="margin-bottom: 12px; font-weight: 600;">
                            ${localStorage.getItem('autoExportEnabled') === 'true'
            ? `<span style="color: var(--color-success-fg);">${t.autoExportEnabled}</span>`
            : `<span style="color: var(--color-fg-muted);">${t.autoExportDisabled}</span>`}
                        </div>
                        <button class="gh-btn" id="btnToggleAutoExport">
                            ${localStorage.getItem('autoExportEnabled') === 'true' ? t.close : t.autoExportBtn}
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="gh-btn" onclick="this.closest('.modal-overlay').remove()">${t.close}</button>
            </div>
        </div>
    `;

    elements.modalContainer.appendChild(modal);

    // Export
    document.getElementById('exportDataBtn').addEventListener('click', () => {
        const dataStr = JSON.stringify(allWeeks, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `planned-week-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        alert(t.exportSuccess);
    });

    // Import
    document.getElementById('importDataBtn').addEventListener('click', () => {
        const file = document.getElementById('importFile').files[0];
        if (!file) {
            alert(t.selectFile);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);

                if (!confirm(t.importConfirm)) {
                    return;
                }

                // Create backup before import
                localStorage.setItem(STORAGE_KEY + '_backup', JSON.stringify(allWeeks));

                allWeeks = importedData;
                saveAllWeeks();

                alert(t.importSuccess);
                location.reload();
            } catch (error) {
                alert(t.importError + error.message);
            }
        };
        reader.readAsText(file);
    });

    // Auto Export Toggle
    const btnToggleAutoExport = document.getElementById('btnToggleAutoExport');
    if (btnToggleAutoExport) {
        btnToggleAutoExport.addEventListener('click', async () => {
            const isEnabled = localStorage.getItem('autoExportEnabled') === 'true';

            if (isEnabled) {
                // Disable
                localStorage.setItem('autoExportEnabled', 'false');
                alert(t.autoExportDisabled);
                modal.remove();
                elements.btnExportImport.click();
            } else {
                // Enable
                if (!('showDirectoryPicker' in window)) {
                    alert(lang === 'ar' ? "متصفحك لا يدعم هذه الخاصية. جرب Chrome أو Edge." : "Your browser doesn't support folder selection. Try Chrome or Edge.");
                    return;
                }

                try {
                    const handle = await window.showDirectoryPicker({ mode: 'readwrite' });
                    await saveHandleToIDB(handle);
                    localStorage.setItem('autoExportEnabled', 'true');
                    localStorage.setItem('lastAutoExportDate', new Date().toDateString());

                    // Perform first backup immediately
                    await performAutoExport(handle);

                    alert(t.autoExportEnabled);
                    modal.remove();
                    elements.btnExportImport.click();
                } catch (err) {
                    console.error(err);
                    if (err.name !== 'AbortError') alert(t.autoExportFolderError);
                }
            }
        });
    }
});

// ----- AUTO EXPORT HELPERS -----

const DB_NAME = 'PlannedWeekBackupDB';
const STORE_NAME = 'handles';

function saveHandleToIDB(handle) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = () => {
            if (!request.result.objectStoreNames.contains(STORE_NAME)) {
                request.result.createObjectStore(STORE_NAME);
            }
        };
        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction(STORE_NAME, 'readwrite');
            tx.objectStore(STORE_NAME).put(handle, 'backupDir');
            tx.oncomplete = () => resolve();
        };
        request.onerror = () => reject(request.error);
    });
}

function getHandleFromIDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = () => {
            if (!request.result.objectStoreNames.contains(STORE_NAME)) {
                request.result.createObjectStore(STORE_NAME);
            }
        };
        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction(STORE_NAME, 'readonly');

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                return resolve(null);
            }

            const req = tx.objectStore(STORE_NAME).get('backupDir');
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve(null);
        };
        request.onerror = () => resolve(null);
    });
}

async function performAutoExport(handle) {
    try {
        if (!handle) handle = await getHandleFromIDB();
        if (!handle) return;

        const options = { mode: 'readwrite' };
        if ((await handle.queryPermission(options)) !== 'granted') {
            showAutoExportAuthFlash();
            return;
        }

        const fileName = `auto-backup-${new Date().toISOString().split('T')[0]}.json`;
        const dataStr = JSON.stringify(allWeeks, null, 2);

        const fileHandle = await handle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(dataStr);
        await writable.close();

        localStorage.setItem('lastAutoExportDate', new Date().toDateString());
        console.log("Auto-backup successful:", fileName);
    } catch (err) {
        console.error("Auto-backup failed:", err);
    }
}

async function checkAutoExportDue() {
    const isEnabled = localStorage.getItem('autoExportEnabled') === 'true';
    if (!isEnabled) return;

    const lastExport = localStorage.getItem('lastAutoExportDate');
    const today = new Date().toDateString();

    if (lastExport !== today) {
        await performAutoExport();
    }
}

function showAutoExportAuthFlash() {
    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const t = TRANSLATIONS[lang];

    // Check if flash already exists
    if (document.getElementById('autoExportAuthFlash')) return;

    const flash = document.createElement('div');
    flash.id = 'autoExportAuthFlash';
    flash.className = 'flash-message'; // Use the beautiful existing class
    flash.style.display = 'flex';
    flash.style.justifyContent = 'space-between';
    flash.style.alignItems = 'center';
    flash.style.background = 'var(--color-accent-emphasis)';
    flash.style.color = '#fff';
    flash.style.marginBottom = '16px';
    flash.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M7.25 12a.75.75 0 0 0 1.5 0V7a.75.75 0 0 0-1.5 0v5zM8 4a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5z"></path></svg>
            <span>${t.autoExportAuthRequired}</span>
            <button class="gh-btn" id="btnAuthorizeAutoExport" style="background: #fff; color: var(--color-accent-emphasis); font-weight: 600; font-size: 12px; margin: 0 8px;">${lang === 'ar' ? 'تفعيل الآن' : 'Authorize'}</button>
        </div>
        <button class="flash-close" style="color: #fff;" onclick="this.closest('.flash-message').remove()">×</button>
    `;

    const container = document.querySelector('.main-content');
    if (container) container.prepend(flash);

    flash.querySelector('#btnAuthorizeAutoExport').addEventListener('click', async () => {
        const handle = await getHandleFromIDB();
        if (handle) {
            const options = { mode: 'readwrite' };
            if ((await handle.requestPermission(options)) === 'granted') {
                await performAutoExport(handle);
                flash.remove();
            }
        }
    });
}

// ----- QUICK ADD TASK/TAB -----

elements.btnQuickAddTask.addEventListener('click', () => {
    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const t = TRANSLATIONS[lang];

    // Check if week is planned
    if (!appState.isPlanned) {
        alert(t.writeGoalsAlert);
        return;
    }

    // Get available days (not closed and not past)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const availableDays = appState.days.filter(day => {
        if (day.isClosed) return false;
        const dayDate = parseDateLocal(day.date);
        dayDate.setHours(0, 0, 0, 0);
        return dayDate >= today;
    });

    if (availableDays.length === 0) {
        alert(t.quickAddNoAvailableDays);
        return;
    }

    // Collect unique tabs from available days (System + Custom)
    const tabMap = new Map(); // name -> id (if system) or name
    availableDays.forEach(day => {
        day.tabs.forEach(tab => {
            if (tab.id === 'completed') return; // Skip completed tab

            let displayName = tab.name;
            if (tab.id === 'all') displayName = t.tabAll;

            if (!tabMap.has(displayName)) {
                tabMap.set(displayName, tab.id === 'all' ? 'all' : tab.name);
            }
        });
    });

    const uniqueTabs = Array.from(tabMap.entries()).map(([name, id]) => ({ name, id }));

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header" style="padding-bottom: 0;">
                <h2 id="quickAddTitle">${t.quickAddModalTitle}</h2>
                <div class="quick-add-type-selector" style="display: flex; gap: 4px; margin-top: 16px; background: var(--color-canvas-subtle); padding: 4px; border-radius: 6px;">
                    <button class="gh-btn active" id="selectTypeTask" style="flex: 1; padding: 4px;">${t.quickAddTypeTask}</button>
                    <button class="gh-btn" id="selectTypeTab" style="flex: 1; padding: 4px;">${t.quickAddTypeTab}</button>
                </div>
            </div>
            <div class="modal-body" style="padding-top: 16px;">
                <p id="quickAddDesc" style="margin-bottom: 16px; color: var(--color-fg-muted);">${t.quickAddModalDesc}</p>
                <div style="margin-bottom: 12px; font-size: 13px;">
                    <strong>${lang === 'ar' ? 'الأيام المتاحة' : 'Available Days'}:</strong> ${availableDays.length}
                </div>
                
                <div id="quickAddTabSelectContainer" style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 13px;">${t.selectTabTitle}</label>
                    <select id="quickAddTabSelector" class="gh-btn" style="width: 100%; text-align: ${lang === 'ar' ? 'right' : 'left'}; padding: 6px 12px;">
                        ${uniqueTabs.map(tab => `<option value="${tab.id}">${tab.name}</option>`).join('')}
                    </select>
                </div>

                <textarea id="quickAddTaskInput" class="gh-textarea" placeholder="${t.quickAddTaskPlaceholder}" rows="3" style="width: 100%; margin-bottom: 16px;"></textarea>
            </div>
            <div class="modal-footer" style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="gh-btn gh-btn-primary" id="btnConfirmQuickAdd">${t.quickAddBtn}</button>
                <button class="gh-btn" id="btnCancelQuickAdd">${t.close}</button>
            </div>
        </div>
    `;

    elements.modalContainer.appendChild(modal);

    const taskInput = modal.querySelector('#quickAddTaskInput');
    const title = modal.querySelector('#quickAddTitle');
    const desc = modal.querySelector('#quickAddDesc');
    const btnConfirm = modal.querySelector('#btnConfirmQuickAdd');
    const typeTaskBtn = modal.querySelector('#selectTypeTask');
    const typeTabBtn = modal.querySelector('#selectTypeTab');
    const tabSelectContainer = modal.querySelector('#quickAddTabSelectContainer');
    const tabSelector = modal.querySelector('#quickAddTabSelector');

    let activeType = 'task'; // 'task' or 'tab'

    taskInput.focus();

    // Toggle logic
    typeTaskBtn.addEventListener('click', () => {
        activeType = 'task';
        typeTaskBtn.classList.add('active');
        typeTabBtn.classList.remove('active');
        title.textContent = t.quickAddModalTitle;
        desc.textContent = t.quickAddModalDesc;
        taskInput.placeholder = t.quickAddTaskPlaceholder;
        btnConfirm.textContent = t.quickAddBtn;
        tabSelectContainer.style.display = 'block';
    });

    typeTabBtn.addEventListener('click', () => {
        activeType = 'tab';
        typeTabBtn.classList.add('active');
        typeTaskBtn.classList.remove('active');
        title.textContent = t.quickAddTabTitle;
        desc.textContent = t.quickAddTabDesc;
        taskInput.placeholder = t.quickAddTabPlaceholder;
        btnConfirm.textContent = lang === 'ar' ? 'إضافة التاب' : 'Add Tab';
        tabSelectContainer.style.display = 'none';
    });

    // Confirm button
    btnConfirm.addEventListener('click', () => {
        const value = taskInput.value.trim();

        if (!value) {
            alert(activeType === 'task' ? t.quickAddEmptyTask : t.tabNameRequired);
            return;
        }

        let addedCount = 0;

        if (activeType === 'task') {
            const selectedTabIdOrName = tabSelector.value;
            // Parse multiple tasks separated by new lines or commas
            const taskLines = value.split(/[\n,]/).map(t => t.trim()).filter(t => t !== '');

            if (taskLines.length === 0) {
                alert(t.quickAddEmptyTask);
                return;
            }

            // Add tasks to all available days
            availableDays.forEach(day => {
                let targetTabId = 'all';

                if (selectedTabIdOrName !== 'all') {
                    // Try to find the tab by name or ID in this day
                    const dayTab = day.tabs.find(tab => tab.name === selectedTabIdOrName || tab.id === selectedTabIdOrName);
                    if (dayTab) {
                        targetTabId = dayTab.id;
                    } else {
                        // If tab doesn't exist in this day, add it
                        targetTabId = `tab-${Date.now()}-${Math.random()}`;
                        const completedIdx = day.tabs.findIndex(t => t.id === 'completed');
                        if (completedIdx !== -1) {
                            day.tabs.splice(completedIdx, 0, { id: targetTabId, name: selectedTabIdOrName });
                        } else {
                            day.tabs.push({ id: targetTabId, name: selectedTabIdOrName });
                        }
                    }
                }

                taskLines.forEach(taskText => {
                    day.tasks.push({
                        id: `task-${Date.now()}-${Math.random()}`,
                        text: taskText,
                        completed: false,
                        tabId: targetTabId
                    });
                });

                sortTasks(day.tasks);
                addedCount++;
            });
            alert(t.quickAddSuccess.replace('{n}', addedCount));
        } else {
            // Add multiple tabs to all available days
            const tabNames = value.split(/[\n,]/).map(t => t.trim()).filter(t => t !== '');

            if (tabNames.length === 0) {
                alert(t.tabNameRequired);
                return;
            }

            availableDays.forEach(day => {
                let dayAdded = false;
                tabNames.forEach(tabName => {
                    const exists = day.tabs.some(tab => tab.name.toLowerCase() === tabName.toLowerCase());
                    if (!exists) {
                        const tabId = `tab-${Date.now()}-${Math.random()}`;
                        const completedTabIndex = day.tabs.findIndex(t => t.id === 'completed');
                        if (completedTabIndex !== -1) {
                            day.tabs.splice(completedTabIndex, 0, { id: tabId, name: tabName });
                        } else {
                            day.tabs.push({ id: tabId, name: tabName });
                        }
                        dayAdded = true;
                    }
                });
                if (dayAdded) addedCount++;
            });
            alert(t.quickAddTabSuccess.replace('{n}', addedCount));
        }

        saveAllWeeks();
        renderWeekGrid();
        modal.remove();
    });

    // Cancel button
    modal.querySelector('#btnCancelQuickAdd').addEventListener('click', () => {
        modal.remove();
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
});

// ----- EVENT HANDLERS -----

elements.btnPlanWeek.addEventListener('click', () => {
    showGoalsScreen();
});

elements.btnSaveGoals.addEventListener('click', () => {
    const goals = elements.goalsInput.value.trim();

    if (goals) {
        appState.goals = goals;
        appState.isPlanned = true;
        checkAutoCloseDays(); // Auto-close days if planning a past week
        saveAllWeeks();

        elements.successMessage.classList.remove('hidden');
        showWeekGrid();
        updateNavigationButtons();
        elements.btnCancelGoals.style.display = 'none';
    } else {
        const lang = document.documentElement.getAttribute('lang') || 'ar';
        alert(TRANSLATIONS[lang].writeGoalsAlert);
    }
});

elements.btnCancelGoals.addEventListener('click', () => {
    showWeekGrid();
});

elements.btnCloseMessage.addEventListener('click', () => {
    elements.successMessage.classList.add('hidden');
});

// ----- START APPLICATION -----
init();

/**
 * Setup Theme Toggle
 */
function setupThemeToggle() {
    const btnThemeToggle = document.getElementById('btnThemeToggle');
    const body = document.body;

    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.classList.add('dark-mode');
        btnThemeToggle.textContent = '🌙';
    } else {
        btnThemeToggle.textContent = '☀️';
    }

    btnThemeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        btnThemeToggle.textContent = isDark ? '🌙' : '☀️';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

/**
 * Setup Language Toggle
 */
function setupLanguageToggle() {
    const btnLangToggle = elements.btnLangToggle;
    const html = document.documentElement;

    // Check saved preference
    const savedLang = localStorage.getItem('lang') || 'ar';
    setLanguage(savedLang);

    btnLangToggle.addEventListener('click', () => {
        const currentLang = html.getAttribute('lang');
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
        localStorage.setItem('lang', newLang);
    });

    function setLanguage(lang) {
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        btnLangToggle.textContent = lang === 'ar' ? 'EN' : 'AR';

        // Translate static elements
        translateUI(lang);

        // Re-render dynamic elements if app is initialized
        if (appState) {
            renderApp();
            if (elements.weekGrid.classList.contains('hidden') === false) {
                renderWeekGrid();
            }
        }
    }

    function translateUI(lang) {
        const t = TRANSLATIONS[lang];

        // Translate elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                el.innerHTML = t[key];
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key]) {
                el.setAttribute('placeholder', t[key]);
            }
        });
    }
}


/**
 * Developer Command: Open a closed day via console
 * Usage in console: OpenDay(1) through OpenDay(7)
 */
window.OpenDay = function (dayNumber) {
    if (!appState || !appState.days) {
        console.error("App state not loaded.");
        return;
    }

    const index = parseInt(dayNumber) - 1;
    if (isNaN(index) || index < 0 || index >= appState.days.length) {
        console.error(`Invalid day number: ${dayNumber}. Please use 1 to ${appState.days.length}.`);
        return;
    }

    const day = appState.days[index];

    day.isClosed = false;
    // We keep tasks, but allow editing again
    // Resetting grade/percentage is usually desired if re-opening to fix things
    day.grade = null;
    day.completionPercentage = 0;

    saveAllWeeks();
    renderWeekGrid();

    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const msg = lang === 'ar'
        ? `✅ تم فتح اليوم رقم ${dayNumber} (${day.name}) بنجاح. يمكنك الآن تعديل المهام.`
        : `✅ Day ${dayNumber} (${day.name}) has been opened. You can now edit tasks.`;

    console.log(msg);
    return msg;
};

/**
 * ============================================
 * SETTINGS MODAL
 * ============================================
 */

// Get modal and buttons
const settingsModal = document.getElementById('settingsModal');
const btnSettings = document.getElementById('btnSettings');
const btnCloseSettings = document.getElementById('btnCloseSettings');

// Get action buttons inside modal
const btnExportData = document.getElementById('btnExportData');
const btnImportData = document.getElementById('btnImportData');
const btnClearData = document.getElementById('btnClearData');
const btnAutoExport = document.getElementById('btnSettingsAutoExport');

const btnToggleTheme = document.getElementById('btnToggleTheme');
const btnToggleLanguage = document.getElementById('btnToggleLanguage');
const btnSettingsReports = document.getElementById('btnSettingsReports');
const btnUserGuide = document.getElementById('btnUserGuide');

/**
 * Open Settings Modal
 */
function openSettingsModal() {
    settingsModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    updateSettingsAutoExportUI();
}

/**
 * Update Auto Export UI in Settings
 */
function updateSettingsAutoExportUI() {
    const statusEl = document.getElementById('settingsAutoExportStatus');
    const btnTextEl = document.getElementById('settingsAutoExportBtnText');
    if (!statusEl || !btnTextEl) return;

    const lang = document.documentElement.getAttribute('lang') || 'ar';
    const t = TRANSLATIONS[lang];
    const isEnabled = localStorage.getItem('autoExportEnabled') === 'true';

    if (isEnabled) {
        statusEl.innerHTML = `<span style="color: var(--color-success-fg);">${t.autoExportEnabled}</span>`;
        btnTextEl.textContent = t.close;
    } else {
        statusEl.innerHTML = `<span style="color: var(--color-fg-muted);">${t.autoExportDisabled}</span>`;
        btnTextEl.textContent = t.autoExportBtn;
    }
}

/**
 * Close Settings Modal
 */
function closeSettingsModal() {
    settingsModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

/**
 * Event Listeners
 */

// Open modal when Settings button is clicked
if (btnSettings) {
    btnSettings.addEventListener('click', openSettingsModal);
}

// Close modal when X button is clicked
if (btnCloseSettings) {
    btnCloseSettings.addEventListener('click', closeSettingsModal);
}

// Close modal when clicking outside the modal container
if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            closeSettingsModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsModal.classList.contains('active')) {
            closeSettingsModal();
        }
    });
}

/**
 * Settings Action Buttons (Integrated with existing functionality)
 */

if (btnExportData) {
    btnExportData.addEventListener('click', () => {
        const lang = document.documentElement.getAttribute('lang') || 'ar';
        const t = TRANSLATIONS[lang];
        const dataStr = JSON.stringify(allWeeks, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `planned-week-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        alert(t.exportSuccess);
    });
}

if (btnImportData) {
    btnImportData.addEventListener('click', () => {
        const fileInput = document.getElementById('settingsImportFile');
        if (fileInput) fileInput.click();
    });

    const settingsImportFile = document.getElementById('settingsImportFile');
    if (settingsImportFile) {
        settingsImportFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const lang = document.documentElement.getAttribute('lang') || 'ar';
            const t = TRANSLATIONS[lang];
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const importedData = JSON.parse(ev.target.result);
                    if (!confirm(t.importConfirm)) return;

                    localStorage.setItem(STORAGE_KEY + '_backup', JSON.stringify(allWeeks));
                    allWeeks = importedData;
                    saveAllWeeks();
                    alert(t.importSuccess);
                    location.reload();
                } catch (error) {
                    alert(t.importError + error.message);
                }
            };
            reader.readAsText(file);
        });
    }
}

if (btnClearData) {
    btnClearData.addEventListener('click', () => {
        const lang = document.documentElement.getAttribute('lang') || 'ar';
        const confirmMsg = lang === 'ar'
            ? 'هل أنت متأكد من مسح جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.'
            : 'Are you sure you want to clear all data? This cannot be undone.';

        if (window.confirm(confirmMsg)) {
            localStorage.removeItem(STORAGE_KEY);
            location.reload();
        }
    });
}

if (btnToggleTheme) {
    btnToggleTheme.addEventListener('click', () => {
        const themeBtn = document.getElementById('btnThemeToggle');
        if (themeBtn) themeBtn.click();
    });
}

if (btnToggleLanguage) {
    btnToggleLanguage.addEventListener('click', () => {
        const langBtn = document.getElementById('btnLangToggle');
        if (langBtn) langBtn.click();

        // Update any dynamic UI elements in the modal that don't use data-i18n
        updateSettingsAutoExportUI();
    });
}

if (btnAutoExport) {
    btnAutoExport.addEventListener('click', async () => {
        const lang = document.documentElement.getAttribute('lang') || 'ar';
        const t = TRANSLATIONS[lang];
        const isEnabled = localStorage.getItem('autoExportEnabled') === 'true';

        if (isEnabled) {
            localStorage.setItem('autoExportEnabled', 'false');
            alert(t.autoExportDisabled);
            updateSettingsAutoExportUI();
        } else {
            if (!('showDirectoryPicker' in window)) {
                alert(lang === 'ar' ? "متصفحك لا يدعم هذه خاصية (استخدم Chrome او Edge)" : "Your browser doesn't support folder selection. Use Chrome or Edge.");
                return;
            }

            try {
                const handle = await window.showDirectoryPicker({ mode: 'readwrite' });
                await saveHandleToIDB(handle);
                localStorage.setItem('autoExportEnabled', 'true');
                localStorage.setItem('lastAutoExportDate', new Date().toDateString());
                await performAutoExport(handle);
                alert(t.autoExportEnabled);
                updateSettingsAutoExportUI();
            } catch (err) {
                console.error(err);
                if (err.name !== 'AbortError') alert(t.autoExportFolderError);
            }
        }
    });
}

if (btnSettingsReports) {
    btnSettingsReports.addEventListener('click', () => {
        elements.btnViewReports.click();
        closeSettingsModal();
    });
}

if (btnUserGuide) {
    btnUserGuide.addEventListener('click', () => {
        window.open('user-guide.html', '_blank');
    });
}

