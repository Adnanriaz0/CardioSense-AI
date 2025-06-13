import React, { useState, useEffect, useCallback, Fragment, useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationCircleIcon, InformationCircleIcon, CheckCircleIcon, CalendarIcon, UserGroupIcon, DocumentTextIcon, EnvelopeIcon, HeartIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import i18next and useTranslation
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

// --- i18n Configuration (typically in a separate i18n.js file, but included here for completeness) ---
i18n
    .use(initReactI18next)
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
                    "dashboard": "Dashboard",
                    "myReports": "My Reports",
                    "myAppointments": "My Appointments",
                    "profile": "Profile",
                    "settings": "Settings",
                    "logout": "Logout",
                    "logoutSuccessPlaceholder": "You have been successfully logged out.",
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
                    "pcgValue": "Current PCG Value: {{value}} bpm",
                    "currentHealthStatus": "Current Health Status",
                    "noHealthStatus": "No health status available.",
                    "heartHealthMetrics": "Cardiac Monitoring",
                    "pcg": "PCG",
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
                    "viewAllAlerts": "View All Alerts",
                    "hours": "hours",
                    "value": "Value",
                    "bloodSugarLevel": "Blood Sugar Level",
                    "weightKg": "Weight (kg)",
                    "dailySteps": "Daily Steps",
                    "noDataForTrend": "No data available for this trend.",
                    "overallHealth": "Overall Health",
                    "online": "Online",
                    "inPerson": "In-person",
                    "followUp": "Follow-up",
                    "doctorDashboard": "Doctor's Dashboard",
                    "myPatients": "My Patients", // Keep for Sidebar/internal use
                    "pendingReviews": "Pending Reviews", // Keep for Sidebar/internal use
                    "consultations": "Consultations", // Keep for Sidebar/internal use
                    "mySchedule": "My Schedule",
                    "welcomeDoctor": "Welcome, Dr. {{doctorName}}!",
                    "doctorOverview": "Here's an overview of your practice.",
                    "totalPatients": "Total Patients",
                    "newPatientsToday": "New Patients Today",
                    "patientsAwaitingReview": "Patients Awaiting Review",
                    "patientId": "Patient ID",
                    "patientName": "Patient Name",
                    "lastVisit": "Last Visit",
                    "nextAppointment": "Next Appointment",
                    "viewProfile": "View Profile",
                    "noPatientsFound": "No patients found.",
                    "searchPatientsPlaceholder": "Search patients...",
                    "reviewType": "Review Type",
                    "patientDetails": "Patient Details",
                    "assignedTo": "Assigned To",
                    "noPendingReviews": "No pending reviews.",
                    "messagePatient": "Message Patient",
                    "consultationRequests": "Consultation Requests",
                    "noConsultationRequests": "No consultation requests.",
                    "viewRequest": "View Request",
                    "dailySchedule": "Daily Schedule",
                    "noAppointmentsToday": "No appointments today.",
                    "addAppointment": "Add Appointment",
                    "appointmentType": "Appointment Type",
                    "meetingLink": "Meeting Link (Optional)",
                    "appointmentSuccess": "Appointment added successfully!",
                    "consultationWith": "Consultation with {{patientName}}",
                    "scheduledFor": "Scheduled for",
                    "appointmentTime": "Time",
                    "duration": "Duration",
                    "patientContact": "Patient Contact",
                    "viewCalendar": "View Full Calendar",
                    "totalAppointmentsToday": "Total Appointments Today",
                    "completedAppointments": "Completed Appointments",
                    "cancelledAppointments": "Cancelled Appointments",
                    "clinicHours": "Clinic Hours",
                    "today": "Today",
                    "upcoming": "Upcoming",
                    "completed": "Completed",
                    "missed": "Missed",
                    "newConsultationRequest": "New Consultation Request",
                    "patientIdPlaceholder": "Enter Patient ID",
                    "consultationReason": "Reason for Consultation",
                    "submitRequest": "Submit Request",
                    "requestSentSuccess": "Consultation request sent!",
                    "patientID": "Patient ID",
                    // New Footer Translation Keys
                    "allRightsReserved": "All rights reserved",
                    "dedicatedToHealthcare": "Dedicated to enhancing healthcare management.",
                    "quickLinks": "Quick Links",
                    "privacyPolicy": "Privacy Policy",
                    "termsOfService": "Terms of Service",
                    "support": "Support",
                    "contactUs": "Contact Us",
                    "address": "Address",
                    "phone": "Phone",
                    "email": "Email",
                    "followUs": "Follow Us",
                    "pcgTrendOverTime": "PCG Trend Over Time",
                    "pcgAlertIrregular": "Irregular PCG detected: {{value}} bpm",
                    // New Navbar/Sidebar Items for Doctor Dashboard
                    "heartHealthData": "Heart Health Data",
                    "patientPcgReports": "Patient PCG Reports",
                    "livePcgMonitoring": "Live PCG Monitoring", // Reusing existing key for clarity
                    "searchReports": "Search Reports",
                    "pcgAudio": "PCG Audio",
                    "pcgImage": "PCG Image",
                    "pcgVideo": "PCG Video",
                    "noReportsFoundForPatient": "No reports found for this patient.",
                    "searchByPatientId": "Search by Patient ID",
                    "enterPatientId": "Enter Patient ID",
                    "patientNotFound": "Patient with ID {{patientId}} not found.",
                    "recentReports": "Recent Reports",
                    "downloadReport": "Download Report",
                    "playAudio": "Play Audio",
                    "viewImage": "View Image",
                    "playVideo": "Play Video",
                    "fileFormat": "File Format",
                    "uploadNewReport": "Upload New Report"
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
                    "dashboard": "ڈیش بورڈ",
                    "myReports": "میری رپورٹس",
                    "myAppointments": "میری ملاقاتیں",
                    "profile": "پروفائل",
                    "settings": "سیٹنگز",
                    "logout": "لاگ آؤٹ",
                    "logoutSuccessPlaceholder": "آپ کامیابی سے لاگ آؤٹ ہو گئے ہیں۔",
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
                    "pcgValue": "موجودہ پی سی جی قدر: {{value}} دھڑکن فی منٹ",
                    "currentHealthStatus": "موجودہ صحت کی حالت",
                    "noHealthStatus": "صحت کی کوئی حالت دستیاب نہیں ہے۔",
                    "heartHealthMetrics": "کارڈیک مانیٹرنگ",
                    "pcg": "پی سی جی",
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
                    "viewAllAlerts": "تمام انتباہات دیکھیں",
                    "hours": "گھنٹے",
                    "value": "قدر",
                    "bloodSugarLevel": "بلڈ شوگر کی سطح",
                    "weightKg": "وزن (کلوگرام)",
                    "dailySteps": "روزانہ کے اقدامات",
                    "noDataForTrend": "اس رجحان کے لیے کوئی ڈیٹا دستیاب نہیں ہے۔",
                    "overallHealth": "مجموعی صحت",
                    "online": "آن لائن",
                    "inPerson": "شخصی",
                    "followUp": "فالو اپ",
                    "doctorDashboard": "ڈاکٹر کا ڈیش بورڈ",
                    "myPatients": "میرے مریض", // Keep for Sidebar/internal use
                    "pendingReviews": "زیر التواء جائزے", // Keep for Sidebar/internal use
                    "consultations": "مشاورات", // Keep for Sidebar/internal use
                    "mySchedule": "میرا شیڈول",
                    "welcomeDoctor": "خوش آمدید، ڈاکٹر {{doctorName}}!",
                    "doctorOverview": "یہ آپ کی پریکٹس کا ایک جائزہ ہے۔",
                    "totalPatients": "کل مریض",
                    "newPatientsToday": "آج کے نئے مریض",
                    "patientsAwaitingReview": "جائزہ کے منتظر مریض",
                    "patientId": "مریض ID",
                    "patientName": "مریض کا نام",
                    "lastVisit": "آخری ملاقات",
                    "nextAppointment": "اگلی ملاقات",
                    "viewProfile": "پروفائل دیکھیں",
                    "noPatientsFound": "کوئی مریض نہیں ملا۔",
                    "searchPatientsPlaceholder": "مریض تلاش کریں...",
                    "reviewType": "جائزہ کی قسم",
                    "patientDetails": "مریض کی تفصیلات",
                    "assignedTo": "کو تفویض کیا گیا",
                    "noPendingReviews": "کوئی زیر التواء جائزے نہیں ہیں۔",
                    "messagePatient": "مریض کو پیغام بھیجیں",
                    "consultationRequests": "مشاورت کی درخواستیں",
                    "noConsultationRequests": "کوئی مشاورت کی درخواستیں نہیں ہیں۔",
                    "viewRequest": "درخواست دیکھیں",
                    "dailySchedule": "روزانہ کا شیڈول",
                    "noAppointmentsToday": "آج کوئی ملاقاتیں نہیں ہیں۔",
                    "addAppointment": "ملاقات شامل کریں",
                    "appointmentType": "ملاقات کی قسم",
                    "meetingLink": "میٹنگ لنک (اختیاری)",
                    "appointmentSuccess": "ملاقات کامیابی سے شامل ہو گئی!",
                    "consultationWith": "مشاورت {{patientName}} کے ساتھ",
                    "scheduledFor": "کے لیے شیڈول کیا گیا",
                    "appointmentTime": "وقت",
                    "duration": "دورانیہ",
                    "patientContact": "مریض سے رابطہ",
                    "viewCalendar": "مکمل کیلنڈر دیکھیں",
                    "totalAppointmentsToday": "آج کی کل ملاقاتیں",
                    "completedAppointments": "مکمل شدہ ملاقاتیں",
                    "cancelledAppointments": "منسوخ شدہ ملاقاتیں",
                    "clinicHours": "کلینک کے اوقات",
                    "today": "آج",
                    "upcoming": "آنے والی",
                    "completed": "مکمل",
                    "missed": "چھوٹ گئی",
                    "newConsultationRequest": "نئی مشاورت کی درخواست",
                    "patientIdPlaceholder": "مریض ID درج کریں",
                    "consultationReason": "مشاورت کا سبب",
                    "submitRequest": "درخواست جمع کرائیں",
                    "requestSentSuccess": "مشاورت کی درخواست بھیج دی گئی!",
                    "patientID": "مریض ID",
                    // New Footer Translation Keys
                    "allRightsReserved": "تمام حقوق محفوظ ہیں۔",
                    "dedicatedToHealthcare": "صحت کی دیکھ بھال کو بہتر بنانے کے لیے وقف ہے۔",
                    "quickLinks": "فوری لنکس",
                    "privacyPolicy": "رازداری کی پالیسی",
                    "termsOfService": "سروس کی شرائط",
                    "support": "سپورٹ",
                    "contactUs": "ہم سے رابطہ کریں",
                    "address": "پتہ",
                    "phone": "فون",
                    "email": "ای میل",
                    "followUs": "ہمیں فالو کریں",
                    "pcgTrendOverTime": "وقت کے ساتھ پی سی جی رجحان",
                    "pcgAlertIrregular": "بے قاعدہ پی سی جی کا پتہ چلا: {{value}} دھڑکن فی منٹ",
                    // New Navbar/Sidebar Items for Doctor Dashboard
                    "heartHealthData": "دل کی صحت کا ڈیٹا",
                    "patientPcgReports": "مریض کی پی سی جی رپورٹس",
                    "livePcgMonitoring": "لائیو پی سی جی مانیٹرنگ", // Reusing existing key for clarity
                    "searchReports": "رپورٹس تلاش کریں",
                    "pcgAudio": "پی سی جی آڈیو",
                    "pcgImage": "پی سی جی تصویر",
                    "pcgVideo": "پی سی جی ویڈیو",
                    "noReportsFoundForPatient": "اس مریض کے لیے کوئی رپورٹ نہیں ملی۔",
                    "searchByPatientId": "مریض کی ID سے تلاش کریں",
                    "enterPatientId": "مریض ID درج کریں",
                    "patientNotFound": "مریض ID {{patientId}} کے ساتھ نہیں ملا۔",
                    "recentReports": "حالیہ رپورٹس",
                    "downloadReport": "رپورٹ ڈاؤن لوڈ کریں",
                    "playAudio": "آڈیو چلائیں",
                    "viewImage": "تصویر دیکھیں",
                    "playVideo": "ویڈیو چلائیں",
                    "fileFormat": "فائل فارمیٹ",
                    "uploadNewReport": "نئی رپورٹ اپ لوڈ کریں"
                }
            }
        },
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
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
    Legend,
    PointElement,
    LineElement,
);

// --- Utility Components (Reused from PatientDashboard) ---

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
        case 'report':
            switch (status) {
                case 'Pending': specificClasses = 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100'; break;
                case 'Completed': specificClasses = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100'; break;
                case 'Requires Review': specificClasses = 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100'; break;
                case 'Reviewed': specificClasses = 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100'; break;
                default: specificClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
            }
            break;
        case 'appointment':
            switch (status) {
                case 'Scheduled': specificClasses = 'bg-sky-100 text-sky-800 dark:bg-sky-700 dark:text-sky-100'; break;
                case 'Completed': specificClasses = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100'; break;
                case 'Cancelled': specificClasses = 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100'; break;
                case 'Rescheduled': specificClasses = 'bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100'; break;
                default: specificClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
            }
            break;
        case 'consultation':
            switch (status) {
                case 'New Request': specificClasses = 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100'; break;
                case 'Responded': specificClasses = 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100'; break;
                case 'Closed': specificClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'; break;
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
 * theme toggle, and logout button.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {string} props.theme - Current theme ('light' or 'dark').
 * @param {function} props.toggleTheme - Function to toggle the theme.
 * @param {function} props.handleLogout - Function to handle user logout.
 * @param {function} props.setActiveTab - Function to set the active tab for navigation.
 */
const NavBar = ({ t, theme, toggleTheme, handleLogout, setActiveTab }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-900 dark:to-gray-800 text-white p-4 shadow-xl flex-shrink-0">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold tracking-wide cursor-pointer" onClick={() => setActiveTab('dashboard')}>
                    {t('doctorDashboard')}
                </div>
                <div className="lg:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none p-2 rounded-md hover:bg-white/20 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex items-center space-x-6">
                    <a href="#" onClick={() => setActiveTab('dashboard')} className="hover:text-blue-200 transition-colors duration-200 flex items-center"><i className="fas fa-home mr-2"></i>{t('home')}</a>
                    <a href="#" onClick={() => setActiveTab('livePcgMonitoring')} className="hover:text-blue-200 transition-colors duration-200 flex items-center"><i className="fas fa-heartbeat mr-2"></i>{t('livePcgMonitoring')}</a>
                    <a href="#" onClick={() => setActiveTab('patientPcgReports')} className="hover:text-blue-200 transition-colors duration-200 flex items-center"><i className="fas fa-file-medical mr-2"></i>{t('patientPcgReports')}</a>
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
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 flex items-center"
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i>{t('logout')}
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
                <a href="#" onClick={() => setActiveTab('dashboard')} className="block px-4 py-2 hover:bg-white/20 rounded-md transition-colors duration-200 flex items-center"><i className="fas fa-home mr-2"></i>{t('home')}</a>
                <a href="#" onClick={() => setActiveTab('livePcgMonitoring')} className="block px-4 py-2 hover:bg-white/20 rounded-md transition-colors duration-200 flex items-center"><i className="fas fa-heartbeat mr-2"></i>{t('livePcgMonitoring')}</a>
                <a href="#" onClick={() => setActiveTab('patientPcgReports')} className="block px-4 py-2 hover:bg-white/20 rounded-md transition-colors duration-200 flex items-center"><i className="fas fa-file-medical mr-2"></i>{t('patientPcgReports')}</a>
                <div className="flex items-center justify-between px-4 py-2 hover:bg-white/20 rounded-md transition-colors duration-200">
                    <span className="font-medium">{t('theme')}</span>
                    <button
                        onClick={toggleTheme}
                        className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                    >
                        {theme === 'light' ? t('dark') : t('light')}
                    </button>
                </div>
                {/* Logout button in mobile menu */}
                <div className="flex items-center justify-between px-4 py-2 hover:bg-white/20 rounded-md transition-colors duration-200">
                    <button
                        onClick={handleLogout}
                        className="w-full px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 flex items-center justify-center"
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i>{t('logout')}
                    </button>
                </div>
            </motion.div>
        </nav>
    );
};

/**
 * Sidebar Component: Displays doctor profile information and navigation links.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {function} props.handleLogout - Function to handle user logout.
 * @param {string} props.activeTab - Currently active tab for highlighting.
 * @param {function} props.setActiveTab - Function to set the active tab.
 */
const Sidebar = ({ t, handleLogout, activeTab, setActiveTab }) => {
    const doctorName = "Dr. Ahmed Khan"; // Example doctor name

    // Updated Navigation Items for Sidebar
    const navItems = [
        { id: 'dashboard', icon: <i className="fas fa-th-large text-xl"></i>, text: t('dashboard') },
        {
            id: 'heartHealthData', icon: <i className="fas fa-heartbeat text-xl"></i>, text: t('heartHealthData'),
            children: [
                { id: 'livePcgMonitoring', icon: <i className="fas fa-waveform text-base"></i>, text: t('livePcgMonitoring') },
                { id: 'patientPcgReports', icon: <i className="fas fa-file-medical text-base"></i>, text: t('patientPcgReports') },
            ]
        },
        { id: 'myPatients', icon: <i className="fas fa-user-friends text-xl"></i>, text: t('myPatients') },
        { id: 'mySchedule', icon: <i className="fas fa-calendar-alt text-xl"></i>, text: t('mySchedule') },
        { id: 'profile', icon: <i className="fas fa-user-circle text-xl"></i>, text: t('profile') },
        { id: 'settings', icon: <i className="fas fa-cog text-xl"></i>, text: t('settings') },
    ];

    return (
        <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-y-auto hidden lg:flex flex-shrink-0"
        >
            <div className="p-6 text-center border-b border-gray-200 dark:border-gray-700">
                <img
                    src="https://via.placeholder.com/100" // Replace with actual doctor image
                    alt="Doctor Profile"
                    className="w-24 h-24 rounded-full mx-auto mb-3 object-cover shadow-md"
                />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{doctorName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cardiologist</p>
            </div>
            <nav className="mt-6 flex-grow">
                <ul>
                    {navItems.map((item) => (
                        <React.Fragment key={item.id}>
                            {item.children ? (
                                <>
                                    <li className="px-6 py-3 text-gray-700 dark:text-gray-300 font-bold flex items-center">
                                        <span className="w-8 flex-shrink-0">{item.icon}</span>
                                        <span className="ml-3">{item.text}</span>
                                    </li>
                                    {item.children.map(child => (
                                        <li key={child.id}>
                                            <a
                                                href="#"
                                                onClick={() => setActiveTab(child.id)}
                                                className={`flex items-center pl-14 pr-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition-colors duration-200 ${activeTab === child.id ? 'bg-blue-600 text-white shadow-lg' : ''}`}
                                            >
                                                <span className="w-6 flex-shrink-0">{child.icon}</span>
                                                <span className="ml-3 font-medium text-sm">{child.text}</span>
                                            </a>
                                        </li>
                                    ))}
                                </>
                            ) : (
                                <li>
                                    <a
                                        href="#"
                                        onClick={() => setActiveTab(item.id)}
                                        className={`flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition-colors duration-200 ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg' : ''}`}
                                    >
                                        <span className="w-8 flex-shrink-0">{item.icon}</span>
                                        <span className="ml-3 font-medium">{item.text}</span>
                                    </a>
                                </li>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            </nav>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 mt-auto flex-shrink-0">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 shadow-md"
                >
                    <i className="fas fa-sign-out-alt mr-3"></i> {t('logout')}
                </button>
            </div>
        </motion.div>
    );
};


/**
 * GenericModal Component: A reusable modal for displaying various content.
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function} props.setIsOpen - Function to set the modal visibility.
 * @param {string} props.title - The title of the modal.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {string} [props.size='md'] - The size of the modal ('sm', 'md', 'lg', 'xl').
 */
const GenericModal = ({ isOpen, setIsOpen, title, children, size = 'md' }) => {
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl'
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-40" />
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
                            <Dialog.Panel
                                className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-200 dark:border-gray-700`}
                            >
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 pb-4 border-b border-gray-200 dark:border-gray-700"
                                >
                                    {title}
                                </Dialog.Title>
                                <div className="mt-4">
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

// --- Doctor Dashboard Specific Components ---

/**
 * DoctorOverview Component: Displays key metrics for the doctor's practice.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 */
const DoctorOverview = ({ t }) => {
    const overviewData = [
        { id: 1, name: t('totalPatients'), value: 1250, icon: UserGroupIcon, color: 'text-blue-500' },
        { id: 2, name: t('newPatientsToday'), value: 7, icon: CalendarIcon, color: 'text-emerald-500' },
        { id: 3, name: t('patientsAwaitingReview'), value: 18, icon: DocumentTextIcon, color: 'text-amber-500' },
        { id: 4, name: t('totalAppointmentsToday'), value: 12, icon: CalendarIcon, color: 'text-purple-500' },
    ];

    return (
        <Card title={t('doctorOverview')} className="col-span-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewData.map((item) => (
                    <motion.div
                        key={item.id}
                        className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <item.icon className={`h-8 w-8 ${item.color} mr-4`} />
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">{item.name}</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Card>
    );
};

/**
 * PatientsList Component: Displays a list of patients with their details and actions.
 * This component is still here for internal dashboard use (e.g., if you click 'My Patients' in sidebar).
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {string} props.theme - Current theme ('light' or 'dark').
 */
const PatientsList = ({ t, theme }) => {
    const [patients, setPatients] = useState([
        { id: 'P001', name: 'Ali Hassan', lastVisit: '2023-03-15', nextAppointment: '2023-06-01', status: 'Stable' },
        { id: 'P002', name: 'Sara Khan', lastVisit: '2023-04-20', nextAppointment: 'N/A', status: 'Needs Attention' },
        { id: 'P003', name: 'Usman Sharif', lastVisit: '2023-05-10', nextAppointment: '2023-07-10', status: 'Critical' },
        { id: 'P004', name: 'Fatima Zahra', lastVisit: '2023-05-22', nextAppointment: '2023-06-15', status: 'Stable' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] = useState(false);

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewProfile = (patient) => {
        setSelectedPatient(patient);
        setIsPatientDetailsModalOpen(true);
    };

    return (
        <Card title={t('myPatients')} className="col-span-full">
            <input
                type="text"
                placeholder={t('searchPatientsPlaceholder')}
                className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('patientId')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('patientName')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('lastVisit')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('nextAppointment')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('status')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredPatients.length > 0 ? (
                            filteredPatients.map((patient) => (
                                <motion.tr
                                    key={patient.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{patient.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{patient.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{patient.lastVisit}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{patient.nextAppointment}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={patient.status} type="health" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleViewProfile(patient)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                                        >
                                            {t('viewProfile')}
                                        </button>
                                        <button
                                            onClick={() => toast.info(t('messagePatient'), { theme: theme === 'dark' ? 'dark' : 'light' })}
                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                        >
                                            {t('messagePatient')}
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center dark:text-gray-400">
                                    {t('noPatientsFound')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <GenericModal
                isOpen={isPatientDetailsModalOpen}
                setIsOpen={setIsPatientDetailsModalOpen}
                title={t('patientDetails')}
                size="lg"
            >
                {selectedPatient && (
                    <div className="space-y-4 text-gray-700 dark:text-gray-200">
                        <p><strong>{t('patientId')}:</strong> {selectedPatient.id}</p>
                        <p><strong>{t('patientName')}:</strong> {selectedPatient.name}</p>
                        <p><strong>{t('lastVisit')}:</strong> {selectedPatient.lastVisit}</p>
                        <p><strong>{t('nextAppointment')}:</strong> {selectedPatient.nextAppointment}</p>
                        <p><strong>{t('overallHealth')}:</strong> <StatusBadge status={selectedPatient.status} type="health" /></p>
                        <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Medical History Summary:</h4>
                            <p className="text-sm">
                                This is a placeholder for detailed medical history and notes for {selectedPatient.name}.
                                It would include diagnosis, past treatments, allergies, and current medications.
                                For example, "Patient has a history of mild hypertension, managed with medication.
                                Recent blood work shows stable cholesterol levels. No known allergies."
                            </p>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
                                onClick={() => setIsPatientDetailsModalOpen(false)}
                            >
                                {t('gotIt')}
                            </button>
                        </div>
                    </div>
                )}
            </GenericModal>
        </Card>
    );
};

/**
 * PendingReviews Component: Lists reports/cases awaiting doctor's review.
 * (Kept for internal use, might be linked from 'My Patients' patient details or similar).
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {string} props.theme - Current theme ('light' or 'dark').
 */
const PendingReviews = ({ t, theme }) => {
    const [reviews, setReviews] = useState([
        { id: 'R005', patientId: 'P002', patientName: 'Sara Khan', date: '2023-05-20', type: 'Blood Test', status: 'Requires Review' },
        { id: 'R006', patientId: 'P001', patientName: 'Ali Hassan', date: '2023-05-18', type: 'Consultation Notes', status: 'Pending' },
        { id: 'R007', patientId: 'P003', patientName: 'Usman Sharif', date: '2023-05-15', type: 'PCG Scan', status: 'Requires Review' },
    ]);

    const handleReviewAction = (reviewId, action) => {
        // Simulate API call or state update
        toast.success(`Review ${reviewId} marked as ${action}!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: theme === 'dark' ? 'dark' : 'light',
        });
        setReviews(prev => prev.filter(r => r.id !== reviewId)); // Remove from pending
    };

    return (
        <Card title={t('pendingReviews')} className="col-span-full">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('patientID')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('patientName')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('reviewType')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('status')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <motion.tr
                                    key={review.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{review.patientId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{review.patientName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{review.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={review.status} type="report" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleReviewAction(review.id, 'Reviewed')}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            {t('view')} / {t('review')}
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center dark:text-gray-400">
                                    {t('noPendingReviews')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

/**
 * ConsultationRequests Component: Manages new and active consultation requests.
 * (Kept for internal use).
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {string} props.theme - Current theme ('light' or 'dark').
 */
const ConsultationRequests = ({ t, theme }) => {
    const [requests, setRequests] = useState([
        { id: 'C001', patientId: 'P004', patientName: 'Fatima Zahra', date: '2023-05-25', reason: 'Fever and fatigue', status: 'New Request' },
        { id: 'C002', patientId: 'P001', patientName: 'Ali Hassan', date: '2023-05-24', reason: 'Follow-up on blood pressure', status: 'Responded' },
    ]);
    const [isAddRequestModalOpen, setIsAddRequestModalOpen] = useState(false);
    const [newRequest, setNewRequest] = useState({ patientId: '', reason: '', date: '', time: '' });

    const handleNewRequestChange = (e) => {
        setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
    };

    const handleAddRequest = (e) => {
        e.preventDefault();
        if (!newRequest.patientId || !newRequest.reason) {
            toast.error("Please fill in all required fields for the consultation request.", { theme: theme === 'dark' ? 'dark' : 'light' });
            return;
        }

        const addedRequest = {
            id: `C${String(requests.length + 1).padStart(3, '0')}`,
            patientId: newRequest.patientId,
            patientName: `Patient ${newRequest.patientId}`, // Placeholder name
            date: new Date().toISOString().slice(0, 10), // Current date
            reason: newRequest.reason,
            status: 'New Request'
        };
        setRequests(prev => [addedRequest, ...prev]);
        toast.success(t('requestSentSuccess'), { theme: theme === 'dark' ? 'dark' : 'light' });
        setNewRequest({ patientId: '', reason: '', date: '', time: '' });
        setIsAddRequestModalOpen(false);
    };

    return (
        <Card
            title={t('consultationRequests')}
            className="col-span-full"
            headerContent={
                <button
                    onClick={() => setIsAddRequestModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                    {t('newConsultationRequest')}
                </button>
            }
        >
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('patientID')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('patientName')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('date')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('reasonForAppointment')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('status')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {requests.length > 0 ? (
                            requests.map((request) => (
                                <motion.tr
                                    key={request.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{request.patientId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{request.patientName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{request.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{request.reason}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={request.status} type="consultation" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => toast.info(`Viewing request from ${request.patientName}`, { theme: theme === 'dark' ? 'dark' : 'light' })}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            {t('viewRequest')}
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center dark:text-gray-400">
                                    {t('noConsultationRequests')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <GenericModal
                isOpen={isAddRequestModalOpen}
                setIsOpen={setIsAddRequestModalOpen}
                title={t('newConsultationRequest')}
            >
                <form onSubmit={handleAddRequest} className="space-y-4">
                    <div>
                        <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('patientID')}
                        </label>
                        <input
                            type="text"
                            name="patientId"
                            id="patientId"
                            value={newRequest.patientId}
                            onChange={handleNewRequestChange}
                            placeholder={t('patientIdPlaceholder')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('consultationReason')}
                        </label>
                        <textarea
                            name="reason"
                            id="reason"
                            rows="3"
                            value={newRequest.reason}
                            onChange={handleNewRequestChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                            onClick={() => setIsAddRequestModalOpen(false)}
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
                        >
                            {t('submitRequest')}
                        </button>
                    </div>
                </form>
            </GenericModal>
        </Card>
    );
};

/**
 * DailySchedule Component: Displays the doctor's appointments for the day.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {string} props.theme - Current theme ('light' or 'dark').
 */
const DailySchedule = ({ t, theme }) => {
    const [appointments, setAppointments] = useState([
        { id: 'A001', patientName: 'Ali Hassan', time: '09:00 AM', type: 'online', duration: '30 mins', link: 'https://meet.google.com/abc-defg-hij' },
        { id: 'A002', patientName: 'Sara Khan', time: '10:30 AM', type: 'inPerson', duration: '45 mins' },
        { id: 'A003', patientName: 'Usman Sharif', time: '02:00 PM', type: 'followUp', duration: '20 mins' },
    ]);
    const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = useState(false);
    const [newAppointment, setNewAppointment] = useState({ patientName: '', date: '', time: '', type: 'inPerson', duration: '', meetingLink: '' });

    const handleNewAppointmentChange = (e) => {
        setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
    };

    const handleAddAppointment = (e) => {
        e.preventDefault();
        if (!newAppointment.patientName || !newAppointment.date || !newAppointment.time || !newAppointment.duration) {
            toast.error("Please fill in all required fields for the appointment.", { theme: theme === 'dark' ? 'dark' : 'light' });
            return;
        }

        const addedAppointment = {
            id: `A${String(appointments.length + 1).padStart(3, '0')}`,
            ...newAppointment,
            link: newAppointment.type === 'online' ? newAppointment.meetingLink : undefined,
        };
        setAppointments(prev => [addedAppointment, ...prev]);
        toast.success(t('appointmentSuccess'), { theme: theme === 'dark' ? 'dark' : 'light' });
        setNewAppointment({ patientName: '', date: '', time: '', type: 'inPerson', duration: '', meetingLink: '' });
        setIsAddAppointmentModalOpen(false);
    };

    const getAppointmentTypeBadge = (type) => {
        const typeClasses = {
            online: 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100',
            inPerson: 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100',
            followUp: 'bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100',
        };
        return (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${typeClasses[type]}`}>
                {t(type)}
            </span>
        );
    };

    return (
        <Card
            title={t('dailySchedule')}
            className="col-span-full"
            headerContent={
                <button
                    onClick={() => setIsAddAppointmentModalOpen(true)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-300"
                >
                    {t('addAppointment')}
                </button>
            }
        >
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('appointmentTime')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('patientName')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('type')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('duration')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {appointments.length > 0 ? (
                            appointments.map((appt) => (
                                <motion.tr
                                    key={appt.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{appt.time}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{t('consultationWith', { patientName: appt.patientName })}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getAppointmentTypeBadge(appt.type)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{appt.duration}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {appt.link && (
                                            <a href={appt.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                                                <i className="fas fa-video"></i> Join
                                            </a>
                                        )}
                                        <button
                                            onClick={() => toast.info(`Details for appointment with ${appt.patientName}`, { theme: theme === 'dark' ? 'dark' : 'light' })}
                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                        >
                                            {t('details')}
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center dark:text-gray-400">
                                    {t('noAppointmentsToday')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-right">
                <button
                    onClick={() => toast.info(t('viewCalendar'), { theme: theme === 'dark' ? 'dark' : 'light' })}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                >
                    {t('viewCalendar')}
                </button>
            </div>

            <GenericModal
                isOpen={isAddAppointmentModalOpen}
                setIsOpen={setIsAddAppointmentModalOpen}
                title={t('addAppointment')}
            >
                <form onSubmit={handleAddAppointment} className="space-y-4">
                    <div>
                        <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('patientName')}
                        </label>
                        <input
                            type="text"
                            name="patientName"
                            id="patientName"
                            value={newAppointment.patientName}
                            onChange={handleNewAppointmentChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('appointmentDate')}
                            </label>
                            <input
                                type="date"
                                name="date"
                                id="date"
                                value={newAppointment.date}
                                onChange={handleNewAppointmentChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('appointmentTime')}
                            </label>
                            <input
                                type="time"
                                name="time"
                                id="time"
                                value={newAppointment.time}
                                onChange={handleNewAppointmentChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('appointmentType')}
                        </label>
                        <select
                            name="type"
                            id="type"
                            value={newAppointment.type}
                            onChange={handleNewAppointmentChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        >
                            <option value="inPerson">{t('inPerson')}</option>
                            <option value="online">{t('online')}</option>
                            <option value="followUp">{t('followUp')}</option>
                        </select>
                    </div>
                    {newAppointment.type === 'online' && (
                        <div>
                            <label htmlFor="meetingLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('meetingLink')}
                            </label>
                            <input
                                type="url"
                                name="meetingLink"
                                id="meetingLink"
                                value={newAppointment.meetingLink}
                                onChange={handleNewAppointmentChange}
                                placeholder="e.g., https://zoom.us/j/1234567890"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('duration')}
                        </label>
                        <input
                            type="text"
                            name="duration"
                            id="duration"
                            value={newAppointment.duration}
                            onChange={handleNewAppointmentChange}
                            placeholder="e.g., 30 mins"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                            onClick={() => setIsAddAppointmentModalOpen(false)}
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
                        >
                            {t('addAppointment')}
                        </button>
                    </div>
                </form>
            </GenericModal>
        </Card>
    );
};

/**
 * LivePCGMonitoring Component: Displays current PCG value, status, and a trend chart.
 * @param {object} props - Component props.
 * @param {string} props.theme - Current theme ('light' or 'dark') for chart styling.
 * @param {function} props.t - Translation function.
 */
const LivePCGMonitoring = ({ theme, t }) => {
    const [pcgValue, setPcgValue] = useState(75); // Simulated PCG value (bpm)
    const [pcgStatus, setPcgStatus] = useState('Normal');
    const [pcgHistory, setPcgHistory] = useState([]); // Array of { value, timestamp }
    const [timeLabels, setTimeLabels] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newPcgValue = Math.floor(Math.random() * (90 - 60 + 1)) + 60; // Simulate 60-90 bpm
            const status = newPcgValue > 85 || newPcgValue < 65 ? 'Irregular' : 'Normal';
            const now = new Date();
            const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            setPcgValue(newPcgValue);
            setPcgStatus(status);

            setPcgHistory(prev => {
                const updatedHistory = [...prev, { value: newPcgValue, timestamp: now }];
                // Keep last 10 readings for the chart
                return updatedHistory.slice(-10);
            });
            setTimeLabels(prev => {
                const updatedLabels = [...prev, timeLabel];
                // Keep last 10 labels for the chart
                return updatedLabels.slice(-10);
            });

            if (status === 'Irregular') {
                toast.warn(t('pcgAlertIrregular', { value: newPcgValue }), {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: theme === 'dark' ? 'dark' : 'light',
                });
            }
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, [theme, t]); // Re-run effect if theme or translation function changes

    const chartData = {
        labels: timeLabels,
        datasets: [
            {
                label: t('pcg') + ' (bpm)',
                data: pcgHistory.map(d => d.value),
                borderColor: theme === 'dark' ? '#60A5FA' : '#3B82F6', // Blue-400 / Blue-500
                backgroundColor: theme === 'dark' ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                tension: 0.3,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: theme === 'dark' ? '#60A5FA' : '#3B82F6',
                pointBorderColor: '#fff',
                pointHoverRadius: 7,
                pointHoverBackgroundColor: theme === 'dark' ? '#3B82F6' : '#2563EB',
                pointHoverBorderColor: '#fff',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: theme === 'dark' ? '#D1D5DB' : '#4B5563', // Gray-300 / Gray-700
                },
            },
            title: {
                display: true,
                text: t('pcgTrendOverTime'), // Using newly added translation
                color: theme === 'dark' ? '#F9FAFB' : '#1F2937', // Gray-50 / Gray-900
                font: {
                    size: 16,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: t('time'), // Assuming translation for time
                    color: theme === 'dark' ? '#D1D5DB' : '#4B5563',
                },
                ticks: {
                    color: theme === 'dark' ? '#9CA3AF' : '#6B7280', // Gray-400 / Gray-500
                },
                grid: {
                    color: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                },
            },
            y: {
                title: {
                    display: true,
                    text: t('pcgValue') + ' (bpm)', // Using existing translation for PCG value
                    color: theme === 'dark' ? '#D1D5DB' : '#4B5563',
                },
                beginAtZero: false,
                ticks: {
                    color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
                },
                grid: {
                    color: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                },
            },
        },
    };

    return (
        <Card title={t('livePCG')} className="col-span-full">
            <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                    {t('pcgValue', { value: pcgValue })}
                </p>
                <StatusBadge status={pcgStatus} type="livePcg" />
            </div>
            <div className="h-64"> {/* Fixed height for the chart */}
                <Line data={chartData} options={chartOptions} />
            </div>
        </Card>
    );
};

/**
 * PatientPCGReports Component: Allows searching and viewing patient PCG reports (audio, image, video).
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {string} props.theme - Current theme ('light' or 'dark').
 */
const PatientPCGReports = ({ t, theme }) => {
    const [patientId, setPatientId] = useState('');
    const [patientReports, setPatientReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeMediaType, setActiveMediaType] = useState('all'); // 'all', 'audio', 'image', 'video'

    // Dummy data for demonstration
    const dummyReports = {
        'P001': [
            { id: 'PCG001_A', type: 'audio', date: '2024-05-20', format: 'mp3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
            { id: 'PCG001_I', type: 'image', date: '2024-05-18', format: 'png', url: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=PCG_Image_P001' },
            { id: 'PCG001_V', type: 'video', date: '2024-05-15', format: 'mp4', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
            { id: 'PCG001_A2', type: 'audio', date: '2024-05-10', format: 'wav', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
        ],
        'P002': [
            { id: 'PCG002_I', type: 'image', date: '2024-05-22', format: 'jpg', url: 'https://via.placeholder.com/300/00FF00/FFFFFF?text=PCG_Image_P002' },
            { id: 'PCG002_A', type: 'audio', date: '2024-05-19', format: 'ogg', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
        ],
    };

    const searchPcgReports = useCallback(() => {
        setIsLoading(true);
        setPatientReports([]); // Clear previous results

        // Simulate API call
        setTimeout(() => {
            const reports = dummyReports[patientId.toUpperCase()] || [];
            if (reports.length > 0) {
                setPatientReports(reports);
                toast.success(`Found ${reports.length} reports for Patient ID: ${patientId.toUpperCase()}`, { theme: theme === 'dark' ? 'dark' : 'light' });
            } else {
                toast.warn(t('patientNotFound', { patientId: patientId.toUpperCase() }), { theme: theme === 'dark' ? 'dark' : 'light' });
                setPatientReports([]);
            }
            setIsLoading(false);
        }, 1000);
    }, [patientId, t, theme]);

    useEffect(() => {
        // Optional: Load some recent reports on component mount or if no search is performed
        if (!patientId) {
            // Display all dummy reports if no specific patient is searched initially
            const allReports = Object.values(dummyReports).flat();
            setPatientReports(allReports);
        }
    }, [patientId]);

    const filteredReports = patientReports.filter(report => {
        if (activeMediaType === 'all') return true;
        return report.type === activeMediaType;
    });

    const handleDownload = (url, filename) => {
        // In a real app, this would involve a backend call or direct file serving.
        // For demonstration, we just open the URL.
        window.open(url, '_blank');
        toast.info(`Downloading ${filename}...`, { theme: theme === 'dark' ? 'dark' : 'light' });
    };

    const renderMedia = (report) => {
        switch (report.type) {
            case 'audio':
                return (
                    <div className="flex items-center space-x-2">
                        <audio controls src={report.url} className="w-48"></audio>
                        <button
                            onClick={() => toast.info(t('playAudio') + ': ' + report.id, { theme: theme === 'dark' ? 'dark' : 'light' })}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            <i className="fas fa-play"></i> {t('playAudio')}
                        </button>
                    </div>
                );
            case 'image':
                return (
                    <div className="flex items-center space-x-2">
                        <img src={report.url} alt={`PCG ${report.id}`} className="w-24 h-24 object-cover rounded-md border border-gray-200 dark:border-gray-600" />
                        <button
                            onClick={() => window.open(report.url, '_blank')}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            <i className="fas fa-eye"></i> {t('viewImage')}
                        </button>
                    </div>
                );
            case 'video':
                return (
                    <div className="flex items-center space-x-2">
                        <video controls src={report.url} className="w-48 h-auto rounded-md border border-gray-200 dark:border-gray-600" preload="metadata">
                            Your browser does not support the video tag.
                        </video>
                        <button
                            onClick={() => window.open(report.url, '_blank')}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            <i className="fas fa-video"></i> {t('playVideo')}
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card title={t('patientPcgReports')} className="col-span-full">
            <div className="mb-6">
                <label htmlFor="patientIdSearch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('searchByPatientId')}
                </label>
                <div className="flex space-x-3">
                    <input
                        type="text"
                        id="patientIdSearch"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        placeholder={t('enterPatientId')}
                        className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                        onClick={searchPcgReports}
                        disabled={isLoading || !patientId}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Searching...' : t('searchReports')}
                    </button>
                </div>
            </div>

            <div className="flex space-x-2 mb-4">
                {['all', 'audio', 'image', 'video'].map(type => (
                    <button
                        key={type}
                        onClick={() => setActiveMediaType(type)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                            ${activeMediaType === type
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                            }`}
                    >
                        {t(`pcg${type.charAt(0).toUpperCase() + type.slice(1)}`)}
                    </button>
                ))}
            </div>


            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{t('recentReports')}</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Report ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('date')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('type')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('fileFormat')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Media</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredReports.length > 0 ? (
                            filteredReports.map((report) => (
                                <motion.tr
                                    key={report.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{report.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{report.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 capitalize">{report.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 uppercase">{report.format}</td>
                                    <td className="px-6 py-4">
                                        {renderMedia(report)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleDownload(report.url, `${report.id}.${report.format}`)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            {t('downloadReport')}
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center dark:text-gray-400">
                                    {t('noReportsFoundForPatient')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 text-right">
                <button
                    onClick={() => toast.info(t('uploadNewReport'), { theme: theme === 'dark' ? 'dark' : 'light' })}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
                >
                    <i className="fas fa-upload mr-2"></i>{t('uploadNewReport')}
                </button>
            </div>
        </Card>
    );
};

// --- Main DoctorDashboard Component ---

/**
 * DoctorDashboard Component: The main component for the doctor's dashboard.
 */
const DoctorDashboard = () => {
    const { t, i18n } = useTranslation();
    const [theme, setTheme] = useState('light'); // Default theme
    // Set 'livePcgMonitoring' as the initial active tab to immediately show relevant content
    const [activeTab, setActiveTab] = useState('livePcgMonitoring');

    // Effect to apply theme class to document body
    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme); // Save theme preference
    }, [theme]);

    // Load theme from local storage on initial render
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark'); // Default to dark if OS prefers it
        }
    }, []);

    // Function to toggle theme
    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);

    // Function to handle language change
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    // Function to handle user logout
    const handleLogout = useCallback(() => {
        toast.success(t('logoutSuccessPlaceholder'), {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: theme === 'dark' ? 'dark' : 'light',
        });
        // Simulate logout, e.g., redirect to login page
        console.log("User logged out!");
        // setTimeout(() => window.location.href = '/login', 2000); // Example redirect
    }, [t, theme]);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    >
                        <DoctorOverview t={t} />
                        <LivePCGMonitoring theme={theme} t={t} />
                        {/* You can choose to display other overview cards here, or guide the user to relevant tabs */}
                        <PatientsList t={t} theme={theme} /> {/* Kept for overview */}
                        <DailySchedule t={t} theme={theme} /> {/* Kept for overview */}
                    </motion.div>
                );
            case 'livePcgMonitoring':
                return (
                    <motion.div
                        key="livePcgMonitoring"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 gap-6"
                    >
                        <LivePCGMonitoring theme={theme} t={t} />
                    </motion.div>
                );
            case 'patientPcgReports':
                return (
                    <motion.div
                        key="patientPcgReports"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 gap-6"
                    >
                        <PatientPCGReports t={t} theme={theme} />
                    </motion.div>
                );
            case 'myPatients': // Still accessible via sidebar
                return (
                    <motion.div
                        key="myPatients"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 gap-6"
                    >
                        <PatientsList t={t} theme={theme} />
                    </motion.div>
                );
            case 'mySchedule': // Still accessible via sidebar
                return (
                    <motion.div
                        key="mySchedule"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 gap-6"
                    >
                        <DailySchedule t={t} theme={theme} />
                    </motion.div>
                );
            case 'profile':
                return (
                    <motion.div
                        key="profile"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('profile')}</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            This is a placeholder for the doctor's profile page.
                            It would contain personal information, qualifications, contact details, etc.
                        </p>
                    </motion.div>
                );
            case 'settings':
                return (
                    <motion.div
                        key="settings"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('settings')}</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('theme')}</h3>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={`px-4 py-2 rounded-md ${theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'} hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200`}
                                    >
                                        {t('light')}
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'} hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200`}
                                    >
                                        {t('dark')}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Language</h3>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => changeLanguage('en')}
                                        className={`px-4 py-2 rounded-md ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'} hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200`}
                                    >
                                        English
                                    </button>
                                    <button
                                        onClick={() => changeLanguage('ur')}
                                        className={`px-4 py-2 rounded-md ${i18n.language === 'ur' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'} hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200`}
                                    >
                                        اردو
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-3 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 flex items-center justify-center mt-6"
                            >
                                <i className="fas fa-sign-out-alt mr-3"></i> {t('logout')}
                            </button>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        // Outermost div with flex flex-col h-screen and removed overflow-hidden
        <div className={`flex flex-col h-screen ${theme}`}>
            <ToastContainer />
            <NavBar t={t} theme={theme} toggleTheme={toggleTheme} handleLogout={handleLogout} setActiveTab={setActiveTab} />
            {/* This div acts as the main content area wrapper. Removed overflow-hidden from here. */}
            <div className="flex flex-1 overflow-hidden">
                <Sidebar t={t} handleLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab} />
                {/* The main content area now has overflow-y-auto to handle its own scrolling */}
                <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 mb-6">
                        {t('welcomeDoctor', { doctorName: "Ahmed Khan" })}
                    </h1>
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                </main>
            </div>
            {/* The Footer component has been removed */}
        </div>
    );
};

export default DoctorDashboard;