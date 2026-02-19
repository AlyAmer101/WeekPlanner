/**
 * STREAK COUNTER MODULE
 * Tracks consecutive days the user opens the app
 * 
 * Storage Schema:
 * {
 *   currentStreak: number,    // Current streak count
 *   lastVisit: string,        // ISO date of last visit (YYYY-MM-DD)
 *   longestStreak: number,    // All-time longest streak
 *   totalVisits: number       // Total number of visits
 * }
 */

const StreakCounter = {
    // Configuration
    STORAGE_KEY: 'plannedWeak_streak',
    DELAY_MS: 1000, // Wait 1 seconds before incrementing
    MILESTONE_DAYS: [5, 10, 25, 50, 100, 365],

    /**
     * Initialize the streak counter
     * Call this when the app loads
     */
    init() {
        // Initial loading sequence
        const data = this.getStreakData();

        // Start counting animation from 0 to existing streak
        if (data.currentStreak > 0) {
            setTimeout(() => {
                this.animateIncrement(0, data.currentStreak);
            }, 500);
        }

        // Process actual daily streak logic after a delay
        setTimeout(() => {
            this.processStreak();
            this.render();
        }, 2000);

        // Add click listener for stats
        const el = document.getElementById('streakCounter');
        if (el) {
            el.addEventListener('click', () => {
                const stats = this.getStats();
                const lang = document.documentElement.getAttribute('lang') || 'ar';
                if (lang === 'ar') {
                    alert(`
📅 إحصائيات التتابع:
• التتابع الحالي: ${stats.current} يوم
• أطول تتابع: ${stats.longest} يوم
• إجمالي الزيارات: ${stats.total}
                    `);
                } else {
                    alert(`
📅 Streak Stats:
• Current Streak: ${stats.current} days
• Longest Streak: ${stats.longest} days
• Total Visits: ${stats.total}
                    `);
                }
            });
        }
    },

    /**
     * Get current streak data from storage
     * @returns {Object} Streak data object
     */
    getStreakData() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);

            if (!data) {
                // First time visitor
                return {
                    currentStreak: 0,
                    lastVisit: null,
                    longestStreak: 0,
                    totalVisits: 0
                };
            }

            return JSON.parse(data);
        } catch (error) {
            console.error('Failed to load streak data:', error);
            return {
                currentStreak: 0,
                lastVisit: null,
                longestStreak: 0,
                totalVisits: 0
            };
        }
    },

    /**
     * Save streak data to storage
     * @param {Object} data - Streak data to save
     */
    saveStreakData(data) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save streak data:', error);
        }
    },

    /**
     * Get today's date in YYYY-MM-DD format
     * @returns {string} Today's date
     */
    getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    /**
     * Calculate days difference between two dates
     * @param {string} date1 - First date (YYYY-MM-DD)
     * @param {string} date2 - Second date (YYYY-MM-DD)
     * @returns {number} Number of days difference
     */
    getDaysDifference(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2 - d1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },

    /**
     * Process streak logic
     * - Increment if consecutive day
     * - Reset if gap > 1 day
     * - Do nothing if same day
     */
    processStreak() {
        const data = this.getStreakData();
        const today = this.getTodayDate();

        // First time visit
        if (!data.lastVisit) {
            data.currentStreak = 1;
            data.lastVisit = today;
            data.longestStreak = 1;
            data.totalVisits = 1;
            this.saveStreakData(data);
            console.log('✨ Streak started! Day 1');
            return;
        }

        // Same day visit - no change
        if (data.lastVisit === today) {
            console.log('📅 Already visited today. Streak:', data.currentStreak);
            return;
        }

        const daysSinceLastVisit = this.getDaysDifference(data.lastVisit, today);

        // Consecutive day - increment streak
        if (daysSinceLastVisit === 1) {
            const oldStreak = data.currentStreak;
            data.currentStreak += 1;
            data.lastVisit = today;
            data.totalVisits += 1;

            // Update longest streak if needed
            if (data.currentStreak > data.longestStreak) {
                data.longestStreak = data.currentStreak;
            }

            this.saveStreakData(data);
            console.log(`🔥 Streak increased: ${oldStreak} → ${data.currentStreak}`);

            // Animate the increment
            this.animateIncrement(oldStreak, data.currentStreak);

            // Check for milestones
            if (this.MILESTONE_DAYS.includes(data.currentStreak)) {
                this.celebrateMilestone(data.currentStreak);
            }
        }
        // Gap > 1 day - reset streak
        else {
            console.log(`💔 Streak broken after ${data.currentStreak} days`);
            data.currentStreak = 1;
            data.lastVisit = today;
            data.totalVisits += 1;
            this.saveStreakData(data);
        }
    },

    /**
     * Render the streak counter in the UI
     */
    render() {
        const data = this.getStreakData();
        const streakNumberEl = document.getElementById('streakNumber');

        if (streakNumberEl) {
            streakNumberEl.textContent = data.currentStreak;
        }
    },

    /**
     * Animate number increment with counting effect
     * @param {number} from - Starting number
     * @param {number} to - Ending number
     */
    animateIncrement(from, to) {
        const streakNumberEl = document.getElementById('streakNumber');

        if (!streakNumberEl) return;

        // Add animation class
        streakNumberEl.classList.add('counting');

        // Counting animation
        const duration = 600; // ms
        const steps = 20;
        const stepValue = (to - from) / steps;
        const stepDuration = duration / steps;
        let current = from;
        let step = 0;

        const interval = setInterval(() => {
            step++;
            current += stepValue;

            if (step >= steps) {
                streakNumberEl.textContent = to;
                clearInterval(interval);

                // Remove animation class after completion
                setTimeout(() => {
                    streakNumberEl.classList.remove('counting');
                }, 300);
            } else {
                streakNumberEl.textContent = Math.round(current);
            }
        }, stepDuration);
    },

    /**
     * Celebrate milestone achievements
     * @param {number} days - Milestone day count
     */
    celebrateMilestone(days) {
        const streakCounterEl = document.getElementById('streakCounter');

        if (!streakCounterEl) return;

        // Add milestone animation class
        streakCounterEl.classList.add('milestone');

        // Show congratulations message (optional)
        console.log(`🎉 MILESTONE! ${days} day streak!`);

        // You can add a toast notification here if you have one
        // showToast(`🎉 Amazing! ${days} day streak!`);

        // Remove class after animation
        setTimeout(() => {
            streakCounterEl.classList.remove('milestone');
        }, 1000);
    },

    /**
     * Get streak statistics for display
     * @returns {Object} Statistics object
     */
    getStats() {
        const data = this.getStreakData();
        return {
            current: data.currentStreak,
            longest: data.longestStreak,
            total: data.totalVisits,
            lastVisit: data.lastVisit
        };
    },

    /**
     * Reset streak (for testing or user request)
     */
    reset() {
        localStorage.removeItem(this.STORAGE_KEY);
        console.log('🔄 Streak reset');
        this.render();
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        StreakCounter.init();
    });
} else {
    StreakCounter.init();
}

/**
 * ===================================
 * DEVELOPER CONSOLE COMMANDS
 * للاختبار والتطوير فقط
 * ===================================
 */

// إضافة دوال للـ window عشان تكون متاحة في Console
window.StreakCommands = {

    /**
     * زيادة الـ Streak بمقدار معين
     * @param {number} amount - عدد الأيام المراد إضافتها (افتراضي: 1)
     */
    add(amount = 1) {
        const data = StreakCounter.getStreakData();
        const oldStreak = data.currentStreak;

        data.currentStreak += amount;

        // تحديث longest streak إذا لزم الأمر
        if (data.currentStreak > data.longestStreak) {
            data.longestStreak = data.currentStreak;
        }

        StreakCounter.saveStreakData(data);
        StreakCounter.animateIncrement(oldStreak, data.currentStreak);

        console.log(`✅ Streak increased: ${oldStreak} → ${data.currentStreak}`);

        // فحص إذا كان milestone
        if (StreakCounter.MILESTONE_DAYS.includes(data.currentStreak)) {
            StreakCounter.celebrateMilestone(data.currentStreak);
        }

        return data.currentStreak;
    },

    /**
     * تقليل الـ Streak بمقدار معين
     * @param {number} amount - عدد الأيام المراد إنقاصها (افتراضي: 1)
     */
    remove(amount = 1) {
        const data = StreakCounter.getStreakData();
        const oldStreak = data.currentStreak;

        data.currentStreak = Math.max(0, data.currentStreak - amount);

        StreakCounter.saveStreakData(data);
        StreakCounter.render();

        console.log(`⬇️ Streak decreased: ${oldStreak} → ${data.currentStreak}`);
        return data.currentStreak;
    },

    /**
     * تعيين قيمة محددة للـ Streak
     * @param {number} value - القيمة المطلوبة
     */
    set(value) {
        const data = StreakCounter.getStreakData();
        const oldStreak = data.currentStreak;

        data.currentStreak = Math.max(0, value);

        if (data.currentStreak > data.longestStreak) {
            data.longestStreak = data.currentStreak;
        }

        StreakCounter.saveStreakData(data);
        StreakCounter.animateIncrement(oldStreak, data.currentStreak);

        console.log(`🎯 Streak set to: ${data.currentStreak}`);

        if (StreakCounter.MILESTONE_DAYS.includes(data.currentStreak)) {
            StreakCounter.celebrateMilestone(data.currentStreak);
        }

        return data.currentStreak;
    },

    /**
     * عرض إحصائيات مفصلة
     */
    stats() {
        const data = StreakCounter.getStreakData();

        console.table({
            'Current Streak': data.currentStreak,
            'Longest Streak': data.longestStreak,
            'Total Visits': data.totalVisits,
            'Last Visit': data.lastVisit
        });

        return data;
    },

    /**
     * محاكاة زيارة في تاريخ معين
     * @param {string} date - التاريخ بصيغة YYYY-MM-DD
     */
    setLastVisit(date) {
        const data = StreakCounter.getStreakData();
        data.lastVisit = date;
        StreakCounter.saveStreakData(data);

        console.log(`📅 Last visit set to: ${date}`);
        console.log('🔄 Reload the page to see the effect');

        return data;
    },

    /**
     * إعادة تعيين كل شيء
     */
    reset() {
        StreakCounter.reset();
        console.log('🔄 Streak has been reset to 0');
        return 0;
    },

    /**
     * محاكاة milestone معين
     * @param {number} day - رقم اليوم (5, 10, 25, 50, 100)
     */
    testMilestone(day) {
        if (!StreakCounter.MILESTONE_DAYS.includes(day)) {
            console.warn(`⚠️ ${day} is not a milestone. Available: ${StreakCounter.MILESTONE_DAYS.join(', ')}`);
            return;
        }

        this.set(day);
        StreakCounter.celebrateMilestone(day);

        console.log(`🎉 Milestone ${day} triggered!`);
    },

    /**
     * عرض جميع الأوامر المتاحة
     */
    help() {
        console.log(`
🎮 ═══════════════════════════════════════════
   STREAK COUNTER - CONSOLE COMMANDS
═══════════════════════════════════════════

📝 الأوامر المتاحة:

1️⃣  StreakCommands.add(n)
   ➜ زيادة الـ Streak بمقدار n (افتراضي: 1)
   ➜ مثال: StreakCommands.add(5)

2️⃣  StreakCommands.remove(n)
   ➜ إنقاص الـ Streak بمقدار n (افتراضي: 1)
   ➜ مثال: StreakCommands.remove(2)

3️⃣  StreakCommands.set(n)
   ➜ تعيين قيمة محددة للـ Streak
   ➜ مثال: StreakCommands.set(100)

4️⃣  StreakCommands.stats()
   ➜ عرض إحصائيات مفصلة

5️⃣  StreakCommands.setLastVisit('YYYY-MM-DD')
   ➜ تغيير تاريخ آخر زيارة
   ➜ مثال: StreakCommands.setLastVisit('2025-02-07')

6️⃣  StreakCommands.reset()
   ➜ إعادة تعيين الـ Streak لـ 0

7️⃣  StreakCommands.testMilestone(n)
   ➜ اختبار animation لـ milestone معين
   ➜ مثال: StreakCommands.testMilestone(25)

8️⃣  StreakCommands.help()
   ➜ عرض هذه القائمة

═══════════════════════════════════════════
💡 نصائح:
   • استخدم Tab للإكمال التلقائي
   • اكتب StreakCommands. واضغط Tab
   • جرب: StreakCommands.add() لزيادة يوم واحد
═══════════════════════════════════════════
        `);
    }
};

// اختصارات سريعة (اختياري)
window.streak = {
    '+': () => StreakCommands.add(),
    '-': () => StreakCommands.remove(),
    '?': () => StreakCommands.stats(),
    reset: () => StreakCommands.reset()
};

// رسالة ترحيبية في Console عند تحميل الصفحة
console.log('%c🎮 Streak Console Commands Ready!', 'color: #28a745; font-size: 14px; font-weight: bold;');
console.log('%cType: StreakCommands.help() للمساعدة', 'color: #6c757d; font-size: 12px;');
console.log('%cQuick: streak[\'+\']() to add 1 day', 'color: #6c757d; font-size: 12px;');
