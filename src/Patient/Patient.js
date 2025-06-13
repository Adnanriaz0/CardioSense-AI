import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationCircleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import i18next and useTranslation
import i18n from 'i18next'; // Assuming your i18n config is in i18n.js
import { useTranslation, initReactI18next } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // useNavigate hook import kiya

// --- i18n Configuration (typically in a separate i18n.js file, but included here for completeness) ---
// In a real project, put this in a file like src/i18n.js and import 'i18n' from it.
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: {
                    "patientDashboard": "Patient Dashboard",
                    "home": "Home",
                    "reports": "Reports",
                    "appointments": "Appointments",
                    "messages": "Messages",
                    "theme": "Theme",
                    "dark": "Dark",
                    "light": "Light",
                    "language": "Language",
                    "english": "English",
                    "urdu": "Urdu",
                    "spanish": "Spanish",
                    "french": "French",
                    "german": "German",
                    "dashboard": "Dashboard",
                    "myReports": "My Reports",
                    "myAppointments": "My Appointments",
                    "profile": "Profile",
                    "settings": "Settings",
                    "logout": "Logout",
                    "welcomePatient": "Welcome, {{patientName}}!",
                    "dashboardOverview": "Here's an overview of your health status.",
                    "totalReports": "Total Reports",
                    "upcomingAppointments": "Upcoming Appointments",
                    "activeAlerts": "Active Alerts",
                    "healthReports": "Health Reports",
                    "searchReportsPlaceholder": "Search reports...",
                    "reportId": "Report ID",
                    "date": "Date",
                    "type": "Type",
                    "reasonForVisit": "Reason for Visit",
                    "status": "Status",
                    "actions": "Actions",
                    "view": "View",
                    "download": "Download",
                    "noReportsFound": "No reports found.",
                    "reportDetails": "Report Details",
                    "fullReportContentPlaceholder": "Detailed medical findings and recommendations would go here.",
                    "gotIt": "Got it!",
                    "appointmentWith": "Appointment with Dr. {{doctor}}",
                    "details": "Details",
                    "cancel": "Cancel",
                    "noUpcomingAppointments": "No upcoming appointments.",
                    "scheduleNewAppointment": "Schedule New Appointment",
                    "doctorName": "Doctor's Name",
                    "appointmentDate": "Appointment Date",
                    "appointmentTime": "Appointment Time",
                    "reasonForAppointment": "Reason for Appointment",
                    "schedule": "Schedule",
                    "appointmentScheduledSuccess": "Appointment scheduled successfully!",
                    "cancelAppointmentPrompt": "This is a placeholder for a cancellation confirmation. In a real app, a confirmation modal would appear.",
                    "recentAlerts": "Recent Alerts",
                    "noRecentAlerts": "No recent alerts.",
                    "livePCG": "Live PCG Monitoring",
                    "pcgStatusNormal": "PCG Status: Normal",
                    "pcgStatusIrregular": "PCG Status: Irregular",
                    "pcgValue": "Current PCG Value: {{value}}",
                    "currentHealthStatus": "Current Health Status",
                    "noHealthStatus": "No health status available.",
                    "heartHealthMetrics": "Heart Health Metrics",
                    "heartRate": "Heart Rate",
                    "bloodPressure": "Blood Pressure",
                    "cholesterol": "Cholesterol",
                    "heartHealthStatus": "Heart Health Status",
                    "riskAssessment": "Risk Assessment",
                    "viewDetails": "View Details",
                    "heartRateWarning": "Your heart rate is slightly elevated.",
                    "bloodPressureHigh": "Your blood pressure readings are consistently high.",
                    "cholesterolWarning": "Your cholesterol levels are elevated.",
                    "overallRiskLow": "Overall Risk: Low",
                    "overallRiskMedium": "Overall Risk: Medium",
                    "overallRiskHigh": "Overall Risk: High",
                    "patientOverview": "Patient Overview",
                    "healthTrends": "Health Trends",
                    "dailyActivity": "Daily Activity",
                    "sleepPatterns": "Sleep Patterns",
                    "medicationReminders": "Medication Reminders",
                    "noMedicationReminders": "No medication reminders.",
                    "medicationName": "Medication",
                    "dose": "Dose",
                    "time": "Time",
                    "taken": "Taken",
                    "markAsTaken": "Mark as Taken",
                    "trendType": "Trend Type",
                    "chartTitle": "Health Trend: {{type}}",
                    "bloodSugar": "Blood Sugar",
                    "weight": "Weight",
                    "activityLevel": "Activity Level",
                    "caloriesBurned": "Calories Burned",
                    "steps": "Steps",
                    "distance": "Distance (km)",
                    "activityGoal": "Activity Goal",
                    "averageSleep": "Average Sleep",
                    "quality": "Quality",
                    "noSleepData": "No sleep data available.",
                    "sleepQualityGood": "Sleep Quality: Good",
                    "sleepQualityFair": "Sleep Quality: Fair",
                    "sleepQualityPoor": "Sleep Quality: Poor",
                    "lastChecked": "Last Checked: {{time}}",
                    "viewAllAlerts": "View All Alerts"
                }
            },
            ur: {
                translation: {
                    "patientDashboard": "مریض کا ڈیش بورڈ",
                    "home": "ہوم",
                    "reports": "رپورٹس",
                    "appointments": "ملاقاتیں",
                    "messages": "پیغامات",
                    "theme": "تھیم",
                    "dark": "ڈارک",
                    "light": "لائٹ",
                    "language": "زبان",
                    "english": "انگریزی",
                    "urdu": "اردو",
                    "spanish": "ہسپانوی",
                    "french": "فرانسیسی",
                    "german": "جرمن",
                    "dashboard": "ڈیش بورڈ",
                    "myReports": "میری رپورٹس",
                    "myAppointments": "میری ملاقاتیں",
                    "profile": "پروفائل",
                    "settings": "سیٹنگز",
                    "logout": "لاگ آؤٹ",
                    "welcomePatient": "خوش آمدید، {{patientName}}!",
                    "dashboardOverview": "آپ کی صحت کی حالت کا جائزہ یہاں ہے۔",
                    "totalReports": "کل رپورٹس",
                    "upcomingAppointments": "آنے والی ملاقاتیں",
                    "activeAlerts": "فعال انتباہات",
                    "healthReports": "صحت کی رپورٹس",
                    "searchReportsPlaceholder": "رپورٹس تلاش کریں...",
                    "reportId": "رپورٹ ID",
                    "date": "تاریخ",
                    "type": "قسم",
                    "reasonForVisit": "ملاقات کا سبب",
                    "status": "حیثیت",
                    "actions": "عمل",
                    "view": "دیکھیں",
                    "download": "ڈاؤن لوڈ کریں",
                    "noReportsFound": "کوئی رپورٹ نہیں ملی۔",
                    "reportDetails": "رپورٹ کی تفصیلات",
                    "fullReportContentPlaceholder": "تفصیلی طبی نتائج اور سفارشات یہاں ہوں گے۔",
                    "gotIt": "سمجھ گیا!",
                    "appointmentWith": "ڈاکٹر {{doctor}} کے ساتھ ملاقات",
                    "details": "تفصیلات",
                    "cancel": "منسوخ کریں",
                    "noUpcomingAppointments": "کوئی آنے والی ملاقاتیں نہیں ہیں۔",
                    "scheduleNewAppointment": "نئی ملاقات کا شیڈول",
                    "doctorName": "ڈاکٹر کا نام",
                    "appointmentDate": "ملاقات کی تاریخ",
                    "appointmentTime": "ملاقات کا وقت",
                    "reasonForAppointment": "ملاقات کا سبب",
                    "schedule": "شیڈول کریں",
                    "appointmentScheduledSuccess": "ملاقات کامیابی سے شیڈول ہو گئی!",
                    "cancelAppointmentPrompt": "یہ منسوخی کی تصدیق کے لیے ایک پلیس ہولڈر ہے۔ اصلی ایپ میں، ایک تصدیقی ماڈل ظاہر ہوگا۔",
                    "recentAlerts": "حالیہ انتباہات",
                    "noRecentAlerts": "کوئی حالیہ انتباہات نہیں ہیں۔",
                    "livePCG": "لائیو پی سی جی مانیٹرنگ",
                    "pcgStatusNormal": "پی سی جی حالت: نارمل",
                    "pcgStatusIrregular": "پی سی جی حالت: بے قاعدہ",
                    "pcgValue": "موجودہ پی سی جی قدر: {{value}}",
                    "currentHealthStatus": "موجودہ صحت کی حالت",
                    "noHealthStatus": "صحت کی کوئی حالت دستیاب نہیں ہے۔",
                    "heartHealthMetrics": "دل کی صحت کے میٹرکس",
                    "heartRate": "دل کی دھڑکن",
                    "bloodPressure": "بلڈ پریشر",
                    "cholesterol": "کولیسٹرول",
                    "heartHealthStatus": "دل کی صحت کی حالت",
                    "riskAssessment": "خطرے کی تشخیص",
                    "viewDetails": "تفصیلات دیکھیں",
                    "heartRateWarning": "آپ کے دل کی دھڑکن تھوڑی تیز ہے۔",
                    "bloodPressureHigh": "آپ کے بلڈ پریشر کی ریڈنگ مسلسل زیادہ ہیں۔",
                    "cholesterolWarning": "آپ کے کولیسٹرول کی سطح بلند ہے۔",
                    "overallRiskLow": "مجموعی خطرہ: کم",
                    "overallRiskMedium": "مجموعی خطرہ: درمیانہ",
                    "overallRiskHigh": "مجموعی خطرہ: زیادہ",
                    "patientOverview": "مریض کا جائزہ",
                    "healthTrends": "صحت کے رجحانات",
                    "dailyActivity": "روزانہ کی سرگرمی",
                    "sleepPatterns": "نیند کے پیٹرن",
                    "medicationReminders": "ادویات کی یاد دہانیاں",
                    "noMedicationReminders": "کوئی ادویات کی یاد دہانیاں نہیں ہیں۔",
                    "medicationName": "دوا",
                    "dose": "خوراک",
                    "time": "وقت",
                    "taken": "لی گئی",
                    "markAsTaken": "لی گئی کے طور پر نشان زد کریں",
                    "trendType": "رجحان کی قسم",
                    "chartTitle": "صحت کا رجحان: {{type}}",
                    "bloodSugar": "بلڈ شوگر",
                    "weight": "وزن",
                    "activityLevel": "سرگرمی کی سطح",
                    "caloriesBurned": "کیلوریز جلائیں",
                    "steps": "اقدامات",
                    "distance": "فاصلہ (کلومیٹر)",
                    "activityGoal": "سرگرمی کا ہدف",
                    "averageSleep": "اوسط نیند",
                    "quality": "معیار",
                    "noSleepData": "نیند کا کوئی ڈیٹا دستیاب نہیں ہے۔",
                    "sleepQualityGood": "نیند کا معیار: اچھا",
                    "sleepQualityFair": "نیند کا معیار: مناسب",
                    "sleepQualityPoor": "نیند کا معیار: خراب",
                    "lastChecked": "آخری بار چیک کیا گیا: {{time}}",
                    "viewAllAlerts": "تمام انتباہات دیکھیں"
                }
            }
        },
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });
// --- End i18n Configuration ---


// Register Chart.js components for use
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// --- Utility Components ---

/**
 * StatusBadge Component: Displays a colored badge based on status and type.
 * @param {object} props - Component props.
 * @param {string} props.status - The status text to display.
 * @param {string} props.type - The category of the status (e.g., 'health', 'report', 'alert').
 * @param {string} [props.className=''] - Additional CSS classes.
 */
const StatusBadge = ({ status, type, className = '' }) => {
    const baseClasses = 'px-3 py-1 rounded-full font-semibold text-xs inline-flex items-center justify-center';
    let specificClasses = '';

    switch (type) {
        case 'health':
            switch (status) {
                case 'Stable': specificClasses = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100'; break;
                case 'Needs Attention': specificClasses = 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100'; break;
                case 'Critical': specificClasses = 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100'; break;
                default: specificClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
            }
            break;
        case 'livePcg':
            specificClasses = status === 'Normal' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400 animate-pulse';
            break;
        case 'alert':
            specificClasses = status === 'info' ? 'bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200' :
                status === 'warning' ? 'bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-900 dark:border-amber-700 dark:text-amber-200' :
                    'bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-900 dark:border-rose-700 dark:text-rose-200';
            break;
        case 'risk':
            switch (status) {
                case 'Low': specificClasses = 'bg-emerald-500 text-white'; break;
                case 'Medium': specificClasses = 'bg-amber-500 text-white'; break;
                case 'High': specificClasses = 'bg-rose-500 text-white'; break;
                default: specificClasses = 'bg-gray-500 text-white';
            }
            break;
        case 'report':
            switch (status) {
                case 'Pending': specificClasses = 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100'; break;
                case 'Completed': specificClasses = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100'; break;
                case 'Requires Review': specificClasses = 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100'; break;
                default: specificClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
            }
            break;
        case 'appointment':
            switch (status) {
                case 'Scheduled': specificClasses = 'bg-sky-100 text-sky-800 dark:bg-sky-700 dark:text-sky-100'; break;
                case 'Completed': specificClasses = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100'; break;
                case 'Cancelled': specificClasses = 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100'; break;
                default: specificClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
            }
            break;
        case 'sync':
            switch (status) {
                case 'Synced': specificClasses = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100'; break;
                case 'Pending': specificClasses = 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100'; break;
                case 'Error': specificClasses = 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100'; break;
                default: specificClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
            }
            break;
        case 'heartHealth':
            switch (status) {
                case 'Optimal': specificClasses = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100'; break;
                case 'Good': specificClasses = 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100'; break;
                case 'Needs Monitoring': specificClasses = 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100'; break;
                case 'Concern': specificClasses = 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100'; break;
                default: specificClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
            }
            break;
        default:
            specificClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }

    return (
        <span className={`${baseClasses} ${specificClasses} ${className}`}>
            {status}
        </span>
    );
};

/**
 * Card Component: A reusable card container with a title and optional header content.
 * @param {object} props - Component props.
 * @param {string} [props.title] - The title of the card.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card.
 * @param {string} [props.className=''] - Additional CSS classes for the card.
 * @param {React.ReactNode} [props.headerContent] - Optional content to display in the card header.
 */
const Card = ({ title, children, className = '', headerContent }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}
    >
        <div className="flex justify-between items-center mb-4">
            {title && <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h2>}
            {headerContent}
        </div>
        {children}
    </motion.div>
);

/**
 * NavBar Component: Top navigation bar with dashboard title, navigation links,
 * theme toggle, and language selector.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {string} props.theme - Current theme ('light' or 'dark').
 * @param {function} props.toggleTheme - Function to toggle the theme.
 * @param {string} props.language - Current language code.
 * @param {function} props.setLanguage - Function to set the language.
 * @param {function} props.onLogout - Function to handle logout, now passed from parent.
 */
const NavBar = ({ t, theme, toggleTheme, language, setLanguage, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-900 dark:to-gray-800 text-white p-4 shadow-xl">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold tracking-wide">
                    {t('patientDashboard')}
                </div>
                <div className="lg:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none p-2 rounded-md hover:bg-white/20 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex items-center space-x-6">
                    <a href="#" className="hover:text-blue-200 transition-colors duration-200 flex items-center"><i className="fas fa-home mr-2"></i>{t('home')}</a>
                    <a href="#" className="hover:text-blue-200 transition-colors duration-200 flex items-center"><i className="fas fa-file-alt mr-2"></i>{t('reports')}</a>
                    <a href="#" className="hover:text-blue-200 transition-colors duration-200 flex items-center"><i className="fas fa-calendar-check mr-2"></i>{t('appointments')}</a>
                    <a href="#" className="hover:text-blue-200 transition-colors duration-200 flex items-center"><i className="fas fa-comments mr-2"></i>{t('messages')}</a>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 flex items-center justify-center"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ?
                            <i className="fas fa-moon text-yellow-300"></i> :
                            <i className="fas fa-sun text-yellow-300"></i>
                        }
                    </button>
                    <select
                        className="p-2 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="en">{t('english')}</option>
                        <option value="ur">{t('urdu')}</option>
                        <option value="es">{t('spanish')}</option>
                        <option value="fr">{t('french')}</option>
                        <option value="de">{t('german')}</option>
                    </select>
                    {/* Logout button in Navbar, now using onLogout prop */}
                    <button
                        onClick={onLogout} // onLogout prop ko call kiya
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center"
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i> {t('logout')}
                    </button>
                </div>
            </div>
            {/* Mobile navigation menu */}
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: { opacity: 1, height: "auto" },
                    closed: { opacity: 0, height: 0 }
                }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-4 space-y-2 overflow-hidden bg-white/10 rounded-lg py-2"
            >
                <a href="#" className="block px-4 py-2 hover:bg-white/20 rounded-md transition-colors duration-200 flex items-center"><i className="fas fa-home mr-2"></i>{t('home')}</a>
                <a href="#" className="block px-4 py-2 hover:bg-white/20 rounded-md transition-colors duration-200 flex items-center"><i className="fas fa-file-alt mr-2"></i>{t('reports')}</a>
                <a href="#" className="block px-4 py-2 hover:bg-white/20 rounded-md transition-colors duration-200 flex items-center"><i className="fas fa-calendar-check mr-2"></i>{t('appointments')}</a>
                <a href="#" className="block px-4 py-2 hover:bg-white/20 rounded-md transition-colors duration-200 flex items-center"><i className="fas fa-comments mr-2"></i>{t('messages')}</a>
                <div className="flex items-center justify-between px-4 py-2 hover:bg-white/20 rounded-md transition-colors duration-200">
                    <span className="font-medium">{t('theme')}</span>
                    <button
                        onClick={toggleTheme}
                        className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                    >
                        {theme === 'light' ? t('dark') : t('light')}
                    </button>
                </div>
                <div className="flex items-center justify-between px-4 py-2 hover:bg-white/20 rounded-md transition-colors duration-200">
                    <span className="font-medium">{t('language')}</span>
                    <select
                        className="p-2 rounded-md bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-100"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="en">{t('english')}</option>
                        <option value="ur">{t('urdu')}</option>
                        <option value="es">{t('spanish')}</option>
                        <option value="fr">{t('french')}</option>
                        <option value="de">{t('german')}</option>
                    </select>
                </div >
                {/* Mobile logout button */}
                <button
                    onClick={onLogout} // onLogout prop ko call kiya
                    className="w-full text-left px-4 py-2 hover:bg-white/20 rounded-md transition-colors duration-200 flex items-center text-red-300"
                >
                    <i className="fas fa-sign-out-alt mr-2"></i> {t('logout')}
                </button>
            </motion.div>
        </nav>
    );
};

/**
 * Sidebar Component: Displays patient profile information and navigation links.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.patient - Patient data object.
 */
const Sidebar = ({ t, patient }) => (
    <div className="w-64 bg-white dark:bg-gray-800 p-6 flex flex-col items-center shadow-xl rounded-r-xl transition-colors duration-300 border border-gray-200 dark:border-gray-700">
        <div className="mb-6 text-center">
            <img src={patient.profilePic} alt={patient.name} className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover mx-auto mb-4 shadow-md" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{patient.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{patient.email || 'patient@example.com'}</p>
        </div>
        <nav className="flex-grow w-full">
            <ul className="space-y-3">
                <li>
                    <a href="#" className="flex items-center p-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200 font-medium">
                        <i className="fas fa-chart-line mr-3 text-blue-500"></i> {t('dashboard')}
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200 font-medium">
                        <i className="fas fa-file-medical-alt mr-3 text-emerald-500"></i> {t('myReports')}
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200 font-medium">
                        <i className="fas fa-calendar-check mr-3 text-purple-500"></i> {t('myAppointments')}
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200 font-medium">
                        <i className="fas fa-comment-alt mr-3 text-amber-500"></i> {t('messages')}
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200 font-medium">
                        <i className="fas fa-user-circle mr-3 text-indigo-500"></i> {t('profile')}
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-3 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200 font-medium">
                        <i className="fas fa-cog mr-3 text-gray-500"></i> {t('settings')}
                    </a>
                </li>
            </ul>
        </nav>
        {/* Sidebar se Logout button hata diya gaya hai */}
        {/* <div className="w-full mt-6">
            <button className="w-full bg-rose-500 text-white py-2.5 rounded-lg hover:bg-rose-600 transition duration-300 shadow-md">
                <i className="fas fa-sign-out-alt mr-2"></i> {t('logout')}
            </button>
        </div> */}
    </div>
);

/**
 * HeaderStats Component: Displays key statistics for the patient dashboard.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.patient - Patient data object.
 * @param {object} props.stats - Statistics data object.
 */
const HeaderStats = ({ t, patient, stats }) => (
    <Card className="mb-6 !p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
                    {t('welcomePatient', { patientName: patient.name })}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-lg">{t('dashboardOverview')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full sm:w-auto">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center shadow-sm border border-blue-100 dark:border-blue-800">
                    <p className="text-blue-600 dark:text-blue-300 text-2xl font-bold">{stats.totalReports}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{t('totalReports')}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-lg text-center shadow-sm border border-emerald-100 dark:border-emerald-800">
                    <p className="text-emerald-600 dark:text-emerald-300 text-2xl font-bold">{stats.upcomingAppointments}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{t('upcomingAppointments')}</p>
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/30 p-4 rounded-lg text-center shadow-sm border border-rose-100 dark:border-rose-800">
                    <p className="text-rose-600 dark:text-rose-300 text-2xl font-bold">{stats.activeAlerts}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{t('activeAlerts')}</p>
                </div>
            </div>
        </div>
    </Card>
);

/**
 * HealthReportTable Component: Displays a searchable table of health reports.
 * Includes a modal to view report details.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {Array<object>} props.reports - Array of report objects.
 */
const HealthReportTable = ({ t, reports }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter reports based on search term
    const filteredReports = reports.filter(report =>
        report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reasonForVisit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to open the report detail modal
    const openReportModal = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    // Function to close the report detail modal
    const closeReportModal = () => {
        setSelectedReport(null);
        setIsModalOpen(false);
    };

    return (
        <Card title={t('healthReports')} className="mb-6">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder={t('searchReportsPlaceholder')}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {t('reportId')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {t('date')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {t('type')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {t('reasonForVisit')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {t('status')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                {t('actions')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredReports.length > 0 ? (
                            filteredReports.map((report) => (
                                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{report.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{report.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{report.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{report.reasonForVisit}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={report.status} type="report" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => openReportModal(report)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 mr-3"
                                        >
                                            {t('view')}
                                        </button>
                                        <button
                                            onClick={() => toast.info(`${t('download')}: ${report.id}`)}
                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200"
                                        >
                                            {t('download')}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400">
                                    {t('noReportsFound')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Report Details Modal */}
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeReportModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 mb-4 flex items-center"
                                    >
                                        <InformationCircleIcon className="h-6 w-6 text-blue-500 mr-2" />
                                        {t('reportDetails')} - {selectedReport?.id}
                                    </Dialog.Title>
                                    <div className="mt-2 text-gray-700 dark:text-gray-300">
                                        <p><strong>{t('type')}:</strong> {selectedReport?.type}</p>
                                        <p><strong>{t('date')}:</strong> {selectedReport?.date}</p>
                                        <p><strong>{t('reasonForVisit')}:</strong> {selectedReport?.reasonForVisit}</p>
                                        <p><strong>{t('status')}:</strong> <StatusBadge status={selectedReport?.status} type="report" /></p>
                                        <p className="mt-4 text-sm italic">{t('fullReportContentPlaceholder')}</p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-blue-700 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeReportModal}
                                        >
                                            {t('gotIt')}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </Card>
    );
};

/**
 * UpcomingAppointments Component: Displays a list of upcoming appointments.
 * Includes a form to schedule new appointments.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {Array<object>} props.appointments - Array of appointment objects.
 * @param {function} props.onScheduleAppointment - Callback for scheduling new appointments.
 * @param {function} props.onCancelAppointment - Callback for cancelling appointments.
 */
const UpcomingAppointments = ({ t, appointments, onScheduleAppointment, onCancelAppointment }) => {
    const [isScheduling, setIsScheduling] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        doctor: '',
        date: '',
        time: '',
        reason: ''
    });

    const handleScheduleSubmit = (e) => {
        e.preventDefault();
        onScheduleAppointment(newAppointment);
        setNewAppointment({ doctor: '', date: '', time: '', reason: '' });
        setIsScheduling(false);
        toast.success(t('appointmentScheduledSuccess'));
    };

    return (
        <Card title={t('upcomingAppointments')} className="mb-6">
            <div className="space-y-4">
                {appointments.length > 0 ? (
                    appointments.map((appt) => (
                        <div key={appt.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                            <div>
                                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('appointmentWith', { doctor: appt.doctor })}</p>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    {appt.date} at {appt.time} - {appt.reason}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => toast.info(`${t('details')}: ${appt.id}`)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition"
                                >
                                    {t('details')}
                                </button>
                                <button
                                    onClick={() => onCancelAppointment(appt.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition"
                                >
                                    {t('cancel')}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">{t('noUpcomingAppointments')}</p>
                )}
            </div>

            <button
                onClick={() => setIsScheduling(!isScheduling)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                {isScheduling ? t('cancel') : t('scheduleNewAppointment')}
            </button>

            <AnimatePresence>
                {isScheduling && (
                    <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleScheduleSubmit}
                        className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-3 border border-blue-100 dark:border-blue-700"
                    >
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">{t('scheduleNewAppointment')}</h3>
                        <input
                            type="text"
                            placeholder={t('doctorName')}
                            className="w-full p-2 border border-blue-300 dark:border-blue-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                            value={newAppointment.doctor}
                            onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                            required
                        />
                        <input
                            type="date"
                            placeholder={t('appointmentDate')}
                            className="w-full p-2 border border-blue-300 dark:border-blue-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                            value={newAppointment.date}
                            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                            required
                        />
                        <input
                            type="time"
                            placeholder={t('appointmentTime')}
                            className="w-full p-2 border border-blue-300 dark:border-blue-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                            value={newAppointment.time}
                            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder={t('reasonForAppointment')}
                            rows="2"
                            className="w-full p-2 border border-blue-300 dark:border-blue-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                            value={newAppointment.reason}
                            onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {t('schedule')}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </Card>
    );
};

/**
 * RecentAlerts Component: Displays a list of recent health alerts.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {Array<object>} props.alerts - Array of alert objects.
 */
const RecentAlerts = ({ t, alerts }) => {
    const getIcon = (type) => {
        if (type === 'error') return <ExclamationCircleIcon className="h-5 w-5 text-rose-500" />;
        if (type === 'warning') return <ExclamationCircleIcon className="h-5 w-5 text-amber-500" />;
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
    };

    return (
        <Card title={t('recentAlerts')} className="mb-6">
            <div className="space-y-3">
                {alerts.length > 0 ? (
                    alerts.map((alert) => (
                        <div key={alert.id} className={`flex items-center p-3 rounded-lg ${
                            alert.type === 'error' ? 'bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-700' :
                                alert.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-700' :
                                    'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-700'
                        }`}>
                            <div className="flex-shrink-0 mr-3">
                                {getIcon(alert.type)}
                            </div>
                            <div>
                                <p className="font-medium text-gray-800 dark:text-gray-100">{alert.message}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{alert.date} {alert.time}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">{t('noRecentAlerts')}</p>
                )}
            </div>
            {alerts.length > 0 && (
                <div className="mt-4 text-right">
                    <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                        {t('viewAllAlerts')}
                    </button>
                </div>
            )}
        </Card>
    );
};


/**
 * LivePCGMonitoring Component: Simulates live PCG monitoring with a status and value.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 */
const LivePCGMonitoring = ({ t }) => {
    const [pcgValue, setPcgValue] = useState(75);
    const [pcgStatus, setPcgStatus] = useState('Normal');
    const [lastChecked, setLastChecked] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            const newValue = Math.floor(Math.random() * (100 - 60 + 1)) + 60; // Simulate PCG values between 60 and 100
            setPcgValue(newValue);
            setPcgStatus(newValue > 90 || newValue < 70 ? 'Irregular' : 'Normal'); // Example logic for irregular
            setLastChecked(new Date().toLocaleTimeString());
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <Card title={t('livePCG')} className="mb-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center">
                        <span className={`mr-2 text-lg ${pcgStatus === 'Normal' ? 'text-emerald-500' : 'text-rose-500'}`}>●</span>
                        <span className="font-semibold">{pcgStatus === 'Normal' ? t('pcgStatusNormal') : t('pcgStatusIrregular')}</span>
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-2">
                        {t('pcgValue', { value: pcgValue })} bpm
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {t('lastChecked', { time: lastChecked })}
                    </p>
                </div>
                <div className="relative w-20 h-20">
                    {/* Simple animated circle for PCG */}
                    <div className={`absolute inset-0 rounded-full flex items-center justify-center
                        ${pcgStatus === 'Normal' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-rose-100 dark:bg-rose-900/30'}
                        ${pcgStatus === 'Irregular' ? 'animate-pulse' : ''}`}>
                        <div className={`w-12 h-12 rounded-full
                            ${pcgStatus === 'Normal' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

/**
 * HealthStatusCard Component: Displays various health metrics and their status.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.healthData - Health metrics data.
 */
const HealthStatusCard = ({ t, healthData }) => {
    if (!healthData) {
        return (
            <Card title={t('currentHealthStatus')} className="mb-6">
                <p className="text-gray-500 dark:text-gray-400">{t('noHealthStatus')}</p>
            </Card>
        );
    }

    const getRiskStatus = () => {
        if (healthData.cholesterol > 240 || healthData.bloodPressure.systolic > 140 || healthData.heartRate > 100) {
            return t('overallRiskHigh');
        }
        if (healthData.cholesterol > 200 || healthData.bloodPressure.systolic > 130 || healthData.heartRate > 90) {
            return t('overallRiskMedium');
        }
        return t('overallRiskLow');
    };

    const getHeartHealthStatus = () => {
        if (getRiskStatus() === t('overallRiskHigh')) return t('concern');
        if (getRiskStatus() === t('overallRiskMedium')) return t('needsMonitoring');
        if (healthData.heartRate >= 60 && healthData.heartRate <= 90 && healthData.bloodPressure.systolic < 120 && healthData.cholesterol < 200) {
            return t('optimal');
        }
        return t('good');
    };

    return (
        <Card title={t('heartHealthMetrics')} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('heartRate')}</h3>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{healthData.heartRate} bpm</p>
                    {healthData.heartRate > 90 && <p className="text-rose-500 text-sm mt-1">{t('heartRateWarning')}</p>}
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('bloodPressure')}</h3>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{healthData.bloodPressure.systolic}/{healthData.bloodPressure.diastolic} mmHg</p>
                    {healthData.bloodPressure.systolic > 130 && <p className="text-rose-500 text-sm mt-1">{t('bloodPressureHigh')}</p>}
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('cholesterol')}</h3>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{healthData.cholesterol} mg/dL</p>
                    {healthData.cholesterol > 200 && <p className="text-rose-500 text-sm mt-1">{t('cholesterolWarning')}</p>}
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('heartHealthStatus')}</h3>
                        <StatusBadge status={getHeartHealthStatus()} type="heartHealth" className="mb-2" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('riskAssessment')}</h3>
                        <StatusBadge status={getRiskStatus()} type="risk" className="mb-2" />
                    </div>
                    <button onClick={() => toast.info(t('viewDetails'))} className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm">
                        {t('viewDetails')}
                    </button>
                </div>
            </div>
        </Card>
    );
};

/**
 * HealthTrendsChart Component: Displays a customizable health trend chart using Chart.js.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.trendData - Data for the chart.
 */
const HealthTrendsChart = ({ t, trendData }) => {
    const [selectedTrend, setSelectedTrend] = useState('heartRate');

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: t('chartTitle', { type: t(selectedTrend) }),
                color: 'rgb(55, 65, 81)', // Tailwind gray-700
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: 'rgb(107, 114, 128)' // Tailwind gray-500
                }
            },
            y: {
                grid: {
                    color: 'rgba(209, 213, 219, 0.2)' // Tailwind gray-200 with transparency
                },
                ticks: {
                    color: 'rgb(107, 114, 128)' // Tailwind gray-500
                }
            }
        }
    };

    const chartData = {
        labels: trendData[selectedTrend].labels,
        datasets: [
            {
                label: t(selectedTrend),
                data: trendData[selectedTrend].data,
                backgroundColor: 'rgba(59, 130, 246, 0.6)', // Tailwind blue-500
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Card title={t('healthTrends')} className="mb-6">
            <div className="mb-4">
                <label htmlFor="trend-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('trendType')}:
                </label>
                <select
                    id="trend-select"
                    value={selectedTrend}
                    onChange={(e) => setSelectedTrend(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                >
                    <option value="heartRate">{t('heartRate')}</option>
                    <option value="bloodPressure">{t('bloodPressure')}</option>
                    <option value="bloodSugar">{t('bloodSugar')}</option>
                    <option value="weight">{t('weight')}</option>
                </select>
            </div>
            <div className="h-64"> {/* Chart ke liye height set ki hai */}
                <Bar options={chartOptions} data={chartData} />
            </div>
        </Card>
    );
};

/**
 * DailyActivity Component: Displays daily activity metrics.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.activityData - Daily activity data.
 */
const DailyActivity = ({ t, activityData }) => {
    return (
        <Card title={t('dailyActivity')} className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('steps')}</h3>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-300">{activityData.steps}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('activityGoal')}: {activityData.goalSteps}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('caloriesBurned')}</h3>
                    <p className="text-3xl font-bold text-amber-600 dark:text-amber-300">{activityData.caloriesBurned}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">kcal</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('distance')}</h3>
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-300">{activityData.distanceKm}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">km</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('activityLevel')}</h3>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">{activityData.activityLevel}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"></p>
                </div>
            </div>
        </Card>
    );
};

/**
 * SleepPatterns Component: Displays sleep data.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.sleepData - Sleep data.
 */
const SleepPatterns = ({ t, sleepData }) => {
    if (!sleepData) {
        return (
            <Card title={t('sleepPatterns')} className="mb-6">
                <p className="text-gray-500 dark:text-gray-400">{t('noSleepData')}</p>
            </Card>
        );
    }

    const getQualityColor = (quality) => {
        if (quality === 'Good') return 'text-emerald-500';
        if (quality === 'Fair') return 'text-amber-500';
        return 'text-rose-500';
    };

    return (
        <Card title={t('sleepPatterns')} className="mb-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('averageSleep')}</h3>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{sleepData.averageHours} hours</p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('quality')}</h3>
                    <p className={`text-3xl font-bold ${getQualityColor(sleepData.quality)}`}>{sleepData.quality}</p>
                </div>
            </div>
        </Card>
    );
};

/**
 * MedicationReminders Component: Displays and manages medication reminders.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {Array<object>} props.medications - Array of medication objects.
 * @param {function} props.onMarkAsTaken - Callback for marking medication as taken.
 */
const MedicationReminders = ({ t, medications, onMarkAsTaken }) => {
    return (
        <Card title={t('medicationReminders')} className="mb-6">
            {medications.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    {t('medicationName')}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    {t('dose')}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    {t('time')}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    {t('status')}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    {t('actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {medications.map((med) => (
                                <tr key={med.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{med.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{med.dose}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{med.time}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={med.taken ? t('taken') : t('pending')} type={med.taken ? 'sync' : 'report'} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {!med.taken && (
                                            <button
                                                onClick={() => onMarkAsTaken(med.id)}
                                                className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-200"
                                            >
                                                {t('markAsTaken')}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">{t('noMedicationReminders')}</p>
            )}
        </Card>
    );
};


// --- Main Patient Dashboard Component ---
const PatientDashboard = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate(); // useNavigate hook ko initialize kiya

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
    const [patient, setPatient] = useState({
        name: 'Jane Doe',
        profilePic: 'https://via.placeholder.com/150/007bff/ffffff?text=JD',
        email: 'jane.doe@example.com'
    });
    const [stats, setStats] = useState({
        totalReports: 12,
        upcomingAppointments: 3,
        activeAlerts: 1
    });
    const [reports, setReports] = useState([
        { id: 'RPT001', date: '2025-05-20', type: 'Blood Test', reasonForVisit: 'Routine Checkup', status: 'Completed' },
        { id: 'RPT002', date: '2025-05-15', type: 'X-Ray', reasonForVisit: 'Injury', status: 'Requires Review' },
        { id: 'RPT003', date: '2025-05-10', type: 'ECG', reasonForVisit: 'Heart Concerns', status: 'Completed' },
        { id: 'RPT004', date: '2025-05-01', type: 'General Checkup', reasonForVisit: 'Annual Visit', status: 'Pending' },
    ]);
    const [appointments, setAppointments] = useState([
        { id: 'APT001', doctor: 'Dr. Smith', date: '2025-06-10', time: '10:00 AM', reason: 'Follow-up' },
        { id: 'APT002', doctor: 'Dr. Jones', date: '2025-06-15', time: '02:30 PM', reason: 'New Consultation' },
        { id: 'APT003', doctor: 'Dr. Williams', date: '2025-07-01', time: '09:00 AM', reason: 'Prescription Refill' },
    ]);
    const [alerts, setAlerts] = useState([
        { id: 'ALT001', type: 'error', message: 'Urgent: Irregular heart rhythm detected.', date: '2025-05-28', time: '14:30' },
        { id: 'ALT002', type: 'warning', message: 'Blood pressure readings are elevated. Consult your doctor.', date: '2025-05-27', time: '09:00' },
        { id: 'ALT003', type: 'info', message: 'Your annual checkup is due next month.', date: '2025-05-25', time: '11:00' },
    ]);
    const [healthData, setHealthData] = useState({
        heartRate: 85,
        bloodPressure: { systolic: 128, diastolic: 82 },
        cholesterol: 210,
        lastUpdated: new Date().toLocaleString()
    });
    const [trendData] = useState({
        heartRate: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            data: [75, 78, 82, 80, 85]
        },
        bloodPressure: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            data: [120, 125, 128, 122, 128]
        },
        bloodSugar: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            data: [95, 102, 98, 110, 105]
        },
        weight: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            data: [70, 71, 70.5, 69, 70]
        }
    });
    const [activityData] = useState({
        steps: 7500,
        goalSteps: 10000,
        caloriesBurned: 550,
        distanceKm: 5.2,
        activityLevel: 'Moderate'
    });
    const [sleepData] = useState({
        averageHours: 7.5,
        quality: 'Good'
    });
    const [medications, setMedications] = useState([
        { id: 'MED001', name: 'Metformin', dose: '500mg', time: 'Morning', taken: false },
        { id: 'MED002', name: 'Lisinopril', dose: '10mg', time: 'Evening', taken: true },
        { id: 'MED003', name: 'Vitamin D', dose: '1000 IU', time: 'Morning', taken: false },
    ]);

    // Theme effect
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Language effect
    useEffect(() => {
        i18n.changeLanguage(language);
        document.documentElement.lang = language; // HTML lang attribute set kiya
        if (language === 'ur') {
            document.documentElement.dir = 'rtl'; // Right-to-left direction for Urdu
        } else {
            document.documentElement.dir = 'ltr'; // Left-to-right for others
        }
        localStorage.setItem('language', language);
    }, [language, i18n]);

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);

    const handleScheduleAppointment = useCallback((newAppt) => {
        setAppointments(prev => [...prev, { ...newAppt, id: `APT${String(prev.length + 1).padStart(3, '0')}`, status: 'Scheduled' }]);
        setStats(prev => ({ ...prev, upcomingAppointments: prev.upcomingAppointments + 1 }));
    }, []);

    const handleCancelAppointment = useCallback((id) => {
        toast.info(t('cancelAppointmentPrompt'));
        // In a real application, you'd integrate with a backend API to truly cancel.
        // For demonstration, we'll just filter it out after a delay or confirmation.
        setTimeout(() => {
            setAppointments(prev => prev.filter(appt => appt.id !== id));
            setStats(prev => ({ ...prev, upcomingAppointments: prev.upcomingAppointments - 1 }));
            toast.success("Appointment cancelled successfully!");
        }, 1000); // Simulate API call delay
    }, [t]);

    const handleMarkMedicationAsTaken = useCallback((id) => {
        setMedications(prev => prev.map(med =>
            med.id === id ? { ...med, taken: true } : med
        ));
        toast.success("Medication marked as taken!");
    }, []);

    // Logout Function
    const handleLogout = useCallback(() => {
        // Yahan aap real logout logic add kar sakte hain,
        // jaise user session clear karna, authentication token remove karna, etc.
        console.log("Patient logging out...");
        navigate('/login'); // User ko login page par redirect karein
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme={theme === 'dark' ? 'dark' : 'light'} />
            <NavBar t={t} theme={theme} toggleTheme={toggleTheme} language={language} setLanguage={setLanguage} onLogout={handleLogout} /> {/* onLogout prop pass kiya */}

            <div className="flex flex-1 container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <Sidebar t={t} patient={patient} />
                <main className="flex-1 ml-6">
                    <HeaderStats t={t} patient={patient} stats={stats} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        <HealthStatusCard t={t} healthData={healthData} />
                        <LivePCGMonitoring t={t} />
                        <RecentAlerts t={t} alerts={alerts} />
                        <HealthReportTable t={t} reports={reports} />
                        <UpcomingAppointments t={t} appointments={appointments} onScheduleAppointment={handleScheduleAppointment} onCancelAppointment={handleCancelAppointment} />
                        <MedicationReminders t={t} medications={medications} onMarkAsTaken={handleMarkMedicationAsTaken} />
                        <HealthTrendsChart t={t} trendData={trendData} />
                        <DailyActivity t={t} activityData={activityData} />
                        <SleepPatterns t={t} sleepData={sleepData} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PatientDashboard;