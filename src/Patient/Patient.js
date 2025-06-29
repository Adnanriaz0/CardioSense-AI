import React, { useState, useEffect, useCallback, Fragment, useMemo, useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationCircleIcon, InformationCircleIcon, CheckCircleIcon, XMarkIcon, SunIcon, MoonIcon, CalendarDaysIcon, HeartIcon, BellAlertIcon, BookOpenIcon, ClockIcon, Bars3Icon, ExclamationTriangleIcon, MegaphoneIcon, DocumentArrowDownIcon, DocumentTextIcon, UserCircleIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, GlobeAltIcon, PencilSquareIcon } from '@heroicons/react/24/outline'; // Added more specific alert icons, and document icons for reports, also profile icons, and PencilSquareIcon for medication
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// NOTE: For Font Awesome icons (e.g., <i className="fas fa-home"></i>) to display,
// you need to include the Font Awesome CDN in your public/index.html file's <head> section:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" xintegrity="sha512-Fo3rlalK+l3Zg3F/A6P4n/p5F5D0V5v1hA1UqM6B/N4bL5a6J4P1F2P7W3f5H8O/w2zQ8y2F6w6bQ7t6X5A==" crossorigin="anonymous" referrerpolicy="no-referrer" />


// --- i18n Configuration ---
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
                    "darkTheme": "Dark Theme",
                    "lightTheme": "Light Theme",
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
                    "patient_info": "Patient Information", // Added for profile section
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
                    "appointmentWith": "Appointment with {{doctorName}}",
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
                    "cancelAppointmentPrompt": "Are you sure you want to cancel this appointment?",
                    "confirmCancel": "Confirm Cancel",
                    "cancelSuccess": "Appointment cancelled successfully!",
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
                    "cholesterol": "Cholesterol",
                    "heartHealthStatus": "Heart Health Status",
                    "riskAssessment": "Risk Assessment",
                    "viewDetails": "View Details",
                    "heartRateWarning": "Your heart rate is slightly elevated.",
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
                    "medicationTakenSuccess": "Medication marked as taken!",
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
                    "logoutSuccess": "Logged out successfully!",
                    "fillAllFields": "Please fill all appointment details.",
                    "reportDownloadSuccess": "Report {{reportId}} downloaded successfully!",
                    "reportViewSuccess": "Viewing report {{reportId}} details.",
                    "today": "Today",
                    "thisWeek": "This Week",
                    "thisMonth": "This Month",
                    "healthStatus": "Health Status",
                    "bloodPressure": "Blood Pressure",
                    "bodyTemperature": "Body Temperature",
                    "overall": "Overall",
                    "age": "Age",
                    "gender": "Gender",
                    "bloodType": "Blood Type",
                    "emergencyContact": "Emergency Contact",
                    "dob": "Date of Birth",
                    "privacyPolicy": "Privacy Policy",
                    "termsOfService": "Terms of Service",
                    "contactUs": "Contact Us",
                    "allRightsReserved": "All Rights Reserved.",
                    "trendBloodSugar": "Blood Sugar Trend",
                    "trendWeight": "Weight Trend",
                    "trendActivityLevel": "Activity Level Trend",
                    "dailyGoal": "Daily Goal: {{goal}} steps",
                    "stepsTaken": "Steps Taken: {{steps}}",
                    "caloriesBurnedValue": "Calories Burned: {{calories}} kcal",
                    "distanceCovered": "Distance Covered: {{distance}} km",
                    "pcgMetrics": "PCG Metrics",
                    "s1Amplitude": "S1 Amplitude",
                    "s2Frequency": "S2 Frequency",
                    "murmurPresence": "Murmur Presence",
                    "pcgScore": "PCG Score",
                    "pcgStatus": "PCG Status",
                    "pcg_trend_heart_rate": "PCG Derived Heart Rate Trend", // New for PCG trends
                    "pcg_trend_murmur_score": "Murmur Score Trend", // New for PCG trends
                    "pcg_value_over_time": "PCG Trends Over Time", // New for PCG trends
                    "murmur_detection": "Murmur Detection", // New for PCG trends
                    "view_full_profile": "View Full Profile", // For navigation to PatientDetailPage
                    "Loading patient data...": "Loading patient data...", // For PatientDetailPage
                    "Patient data not found.": "Patient data not found.", // For PatientDetailPage
                    "Back to Dashboard": "Back to Dashboard", // For PatientDetailPage
                    "Lab Results": "Lab Results", // For PatientDetailPage
                    "No lab results available.": "No lab results available.", // For PatientDetailPage
                    "Prescriptions": "Prescriptions", // For PatientDetailPage
                    "No prescriptions issued.": "No prescriptions issued.", // For PatientDetailPage
                    "Visit History": "Visit History", // For PatientDetailPage
                    "No visit history found.": "No visit history found.", // For PatientDetailPage
                    "scheduleAppointment": "Schedule Appointment", // New appointment scheduling
                    "selectDoctor": "Select Doctor",
                    "selectDate": "Select Date",
                    "selectTime": "Select Time",
                    "reason": "Reason",
                    "submit": "Submit",
                    "close": "Close",
                    "cancelAppointmentTitle": "Cancel Appointment",
                    "cancelAppointmentConfirmation": "Are you sure you want to cancel the appointment with {{doctorName}} on {{date}} at {{time}}?",
                    "confirm": "Confirm",
                    "appointmentCancelled": "Appointment with {{doctorName}} on {{date}} at {{time}} has been cancelled.",
                    // New for Alerts
                    "alertDetails": "Alert Details",
                    "dismiss": "Dismiss",
                    "viewAlertDetails": "View Alert Details", // Changed from 'viewDetails' to avoid clash
                    "info": "Info",
                    "warning": "Warning",
                    "danger": "Danger",
                    "newLabResults": "New Lab Results Available!",
                    "appointmentReminder": "Appointment Reminder!",
                    "bloodPressureHigh": "Blood Pressure Alert: Elevated Reading",
                    "noAlertsMessage": "You have no new alerts.",
                    // New for PCG Reports
                    "pcgAnalysis": "PCG Analysis",
                    "heartSoundReport": "Heart Sound Report",
                    "murmurDetectionReport": "Murmur Detection Report",
                    "pcgBaselineComparison": "PCG Baseline Comparison",
                    "normal": "Normal", // for murmur score
                    "mild": "Mild",
                    "moderate": "Moderate",
                    "severe": "Severe",
                    // Doctor names and specialties
                    "doctor_ali_khan": "Dr. Ali Khan",
                    "specialty_cardiologist": "Cardiologist",
                    "doctor_sara_javed": "Dr. Sara Javed",
                    "specialty_general_physician": "General Physician",
                    "doctor_asif_mehmood": "Dr. Asif Mehmood",
                    "specialty_dermatologist": "Dermatologist",
                    "doctor_aisha_siddiqui": "Dr. Aisha Siddiqui",
                    "specialty_pediatrician": "Pediatrician",
                    "patient_id": "Patient ID",
                    "name": "Name",
                    "age": "Age",
                    "gender": "Gender",
                    "bloodType": "Blood Type",
                    "medical_history": "Medical History",
                    "allergies": "Allergies",
                    "contact_info": "Contact Information",
                    "address": "Address",
                    "phone": "Phone",
                    "email": "Email",
                    "relationship": "Relationship",
                    "taken": "Taken",
                    "pending": "Pending",
                    "morning": "Morning",
                    "afternoon": "Afternoon",
                    "evening": "Evening",
                    "night": "Night",
                    "medication_list": "Medication List",
                    "mark_as_taken": "Mark as Taken",
                    "pcg_waveform": "PCG Waveform",
                    "doctor_notes": "Doctor's Notes",
                    "murmur_type": "Murmur Type",
                    "s1_amplitude_value": "S1 Amplitude: {{value}}",
                    "s2_frequency_value": "S2 Frequency: {{value}} Hz",
                    "murmur_presence_value": "Murmur Presence: {{value}}%",
                    "pcg_score_value": "PCG Score: {{value}}",
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
                    "darkTheme": "ڈارک تھیم",
                    "lightTheme": "لائٹ تھیم",
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
                    "patient_info": "مریض کی معلومات",
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
                    "appointmentWith": "ڈاکٹر {{doctorName}} کے ساتھ ملاقات",
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
                    "cancelAppointmentPrompt": "کیا آپ واقعی اس ملاقات کو منسوخ کرنا چاہتے ہیں؟",
                    "confirmCancel": "منسوخی کی تصدیق کریں",
                    "cancelSuccess": "ملاقات کامیابی سے منسوخ ہو گئی!",
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
                    "cholesterol": "کولیسٹرول",
                    "heartHealthStatus": "دل کی صحت کی حالت",
                    "riskAssessment": "خطرے کی تشخیص",
                    "viewDetails": "تفصیلات دیکھیں",
                    "heartRateWarning": "آپ کے دل کی دھڑکن تھوڑی تیز ہے۔",
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
                    "medicationTakenSuccess": "دوا کو لی گئی کے طور پر نشان زد کیا گیا!",
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
                    "logoutSuccess": "کامیابی سے لاگ آؤٹ ہو گئے!",
                    "fillAllFields": "براہ کرم ملاقات کی تمام تفصیلات پُر کریں۔",
                    "reportDownloadSuccess": "رپورٹ {{reportId}} کامیابی سے ڈاؤن لوڈ ہو گئی!",
                    "reportViewSuccess": "رپورٹ {{reportId}} کی تفصیلات دیکھی جا رہی ہیں۔",
                    "today": "آج",
                    "thisWeek": "اس ہفتے",
                    "thisMonth": "اس مہینے",
                    "healthStatus": "صحت کی حالت",
                    "bloodPressure": "بلڈ پریشر",
                    "bodyTemperature": "جسم کا درجہ حرارت",
                    "overall": "مجموعی",
                    "age": "عمر",
                    "gender": "جنس",
                    "bloodType": "خون کی قسم",
                    "emergencyContact": "ایمرجنسی رابطہ",
                    "dob": "تاریخ پیدائش",
                    "privacyPolicy": "رازداری کی پالیسی",
                    "termsOfService": "سروس کی شرائط",
                    "contactUs": "ہم سے رابطہ کریں",
                    "allRightsReserved": "تمام حقوق محفوظ ہیں۔",
                    "trendBloodSugar": "بلڈ شوگر کا رجحان",
                    "trendWeight": "وزن کا رجحان",
                    "trendActivityLevel": "سرگرمی کی سطح کا رجحان",
                    "dailyGoal": "روزانہ کا ہدف: {{goal}} اقدامات",
                    "stepsTaken": "اٹھائے گئے اقدامات: {{steps}}",
                    "caloriesBurnedValue": "جلائی گئی کیلوریز: {{calories}} کلو کیلوری",
                    "distanceCovered": "تہہ شدہ فاصلہ: {{distance}} کلومیٹر",
                    "pcgMetrics": "پی سی جی میٹرکس",
                    "s1Amplitude": "S1 وسعت",
                    "s2Frequency": "S2 فریکوئنسی",
                    "murmurPresence": "مرمر کی موجودگی",
                    "pcgScore": "پی سی جی سکور",
                    "pcgStatus": "پی سی جی کی حیثیت",
                    "pcg_trend_heart_rate": "پی سی جی سے حاصل کردہ دل کی دھڑکن کا رجحان",
                    "pcg_trend_murmur_score": "مرمر سکور کا رجحان",
                    "pcg_value_over_time": "وقت کے ساتھ پی سی جی رجحانات",
                    "murmur_detection": "مرمر کی تشخیص",
                    "view_full_profile": "مکمل پروفائل دیکھیں",
                    "Loading patient data...": "مریض کا ڈیٹا لوڈ ہو رہا ہے...",
                    "Patient data not found.": "مریض کا ڈیٹا نہیں ملا۔",
                    "Back to Dashboard": "ڈیش بورڈ پر واپس جائیں",
                    "Lab Results": "لیب کے نتائج",
                    "No lab results available.": "کوئی لیب کے نتائج دستیاب نہیں ہیں۔",
                    "Prescriptions": "نسخے",
                    "No prescriptions issued.": "کوئی نسخے جاری نہیں کیے گئے۔",
                    "Visit History": "دوروں کی تاریخ",
                    "No visit history found.": "دوروں کی کوئی تاریخ نہیں ملی۔",
                    "scheduleAppointment": "ملاقات کا شیڈول",
                    "selectDoctor": "ڈاکٹر کا انتخاب کریں",
                    "selectDate": "تاریخ کا انتخاب کریں",
                    "selectTime": "وقت کا انتخاب کریں",
                    "reason": "وجہ",
                    "submit": "جمع کرائیں",
                    "close": "بند کریں",
                    "cancelAppointmentTitle": "ملاقات منسوخ کریں",
                    "cancelAppointmentConfirmation": "کیا آپ واقعی ڈاکٹر {{doctorName}} کے ساتھ {{date}} کو {{time}} بجے کی ملاقات منسوخ کرنا چاہتے ہیں؟",
                    "confirm": "تصدیق کریں",
                    "appointmentCancelled": "ڈاکٹر {{doctorName}} کے ساتھ {{date}} کو {{time}} بجے کی ملاقات منسوخ کر دی گئی ہے۔",
                    // New for Alerts
                    "alertDetails": "انتباہ کی تفصیلات",
                    "dismiss": "برخاست کریں",
                    "viewAlertDetails": "انتباہ کی تفصیلات دیکھیں",
                    "info": "معلومات",
                    "warning": "انتباہ",
                    "danger": "خطرہ",
                    "newLabResults": "نئے لیب کے نتائج دستیاب!",
                    "appointmentReminder": "ملاقات کی یاد دہانی!",
                    "bloodPressureHigh": "بلڈ پریشر الرٹ: بلند ریڈنگ",
                    "noAlertsMessage": "آپ کے پاس کوئی نئے انتباہات نہیں ہیں۔",
                    // New for PCG Reports
                    "pcgAnalysis": "پی سی جی تجزیہ",
                    "heartSoundReport": "دل کی آواز کی رپورٹ",
                    "murmurDetectionReport": "مرمر کی تشخیص کی رپورٹ",
                    "pcgBaselineComparison": "پی سی جی بیس لائن کا موازنہ",
                    "normal": "نارمل",
                    "mild": "ہلکا",
                    "moderate": "معتدل",
                    "severe": "شدید",
                    // Doctor names and specialties
                    "doctor_ali_khan": "ڈاکٹر علی خان",
                    "specialty_cardiologist": "کارڈیالوجسٹ",
                    "doctor_sara_javed": "ڈاکٹر سارہ جاوید",
                    "specialty_general_physician": "جنرل فزیشن",
                    "doctor_asif_mehmood": "ڈاکٹر آصف محمود",
                    "specialty_dermatologist": "ڈرمیٹولوجسٹ",
                    "doctor_aisha_siddiqui": "ڈاکٹر عائشہ صدیقی",
                    "specialty_pediatrician": "پیڈیاٹریشن",
                    "patient_id": "مریض ID",
                    "name": "نام",
                    "age": "عمر",
                    "gender": "جنس",
                    "bloodType": "بلڈ گروپ",
                    "medical_history": "طبی تاریخ",
                    "allergies": "الرجیز",
                    "contact_info": "رابطے کی معلومات",
                    "address": "پتہ",
                    "phone": "فون",
                    "email": "ای میل",
                    "relationship": "رشتہ",
                    "taken": "لی گئی",
                    "pending": "زیر التواء",
                    "morning": "صبح",
                    "afternoon": "دوپہر",
                    "evening": "شام",
                    "night": "رات",
                    "medication_list": "ادویات کی فہرست",
                    "mark_as_taken": "لی گئی کے طور پر نشان زد کریں",
                    "pcg_waveform": "پی سی جی ویوفارم",
                    "doctor_notes": "ڈاکٹر کے نوٹس",
                    "murmur_type": "مرمر کی قسم",
                    "s1_amplitude_value": "S1 وسعت: {{value}}",
                    "s2_frequency_value": "S2 فریکوئنسی: {{value}} Hz",
                    "murmur_presence_value": "مرمر کی موجودگی: {{value}}%",
                    "pcg_score_value": "پی سی جی سکور: {{value}}",
                }
            }
        },
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

// Register Chart.js components for use
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// --- Theme Configuration ---
const themes = {
    light: {
        name: 'Light',
        // Direct Tailwind classes for styling
        backgroundClass: 'bg-gray-100',
        textColorClass: 'text-gray-900',
        cardBgClass: 'bg-white',
        cardBorderClass: 'border-gray-200',
        sidebarBgClass: 'bg-white',
        sidebarBorderClass: 'border-gray-200',
        shadowClass: 'shadow-lg',
        reportBgClass: 'bg-blue-50',
        reportBorderClass: 'border-blue-100',
        appointmentBgClass: 'bg-blue-50',
        appointmentBorderClass: 'border-blue-100',
        alertInfoBgClass: 'bg-blue-50', // New for alerts
        alertInfoBorderClass: 'border-blue-100', // New for alerts
        alertWarningBgClass: 'bg-amber-50',
        alertWarningBorderClass: 'border-amber-200',
        alertDangerBgClass: 'bg-rose-50',
        alertDangerBorderClass: 'border-rose-200',
        buttonPrimaryClass: 'bg-blue-600 hover:bg-blue-700 text-white',
        buttonSecondaryClass: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
        iconColorClass: 'text-gray-600',
        // Colors for Chart.js (direct RGB values are fine as Chart.js uses them directly)
        chartGridColor: 'rgba(209, 213, 219, 0.2)', // gray-300 with transparency
        chartTextColor: 'rgb(75, 85, 99)', // gray-700
        primaryRgb: '59, 130, 246', // blue-500
        secondaryRgb: '99, 102, 241', // indigo-500
        progressBgClass: 'bg-gray-200',
        progressFillClass: 'bg-blue-500',
        // PCG Waveform colors
        waveformStroke: '#3B82F6', // blue-500
        waveformFill: 'rgba(59, 130, 246, 0.1)', // blue-500 with transparency
    },
    dark: {
        name: 'Dark',
        backgroundClass: 'bg-gray-900',
        textColorClass: 'text-gray-100',
        cardBgClass: 'bg-gray-800',
        cardBorderClass: 'border-gray-700',
        sidebarBgClass: 'bg-gray-800',
        sidebarBorderClass: 'border-gray-700',
        shadowClass: 'shadow-xl',
        reportBgClass: 'bg-blue-900/30',
        reportBorderClass: 'border-blue-800',
        appointmentBgClass: 'bg-blue-900/30',
        appointmentBorderClass: 'border-blue-800',
        alertInfoBgClass: 'bg-blue-900/30', // New for alerts
        alertInfoBorderClass: 'border-blue-800', // New for alerts
        alertWarningBgClass: 'bg-amber-900/30',
        alertWarningBorderClass: 'border-amber-800',
        alertDangerBgClass: 'bg-rose-900/30',
        alertDangerBorderClass: 'border-rose-800',
        buttonPrimaryClass: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        buttonSecondaryClass: 'bg-gray-600 hover:bg-gray-500 text-gray-100',
        iconColorClass: 'text-gray-300',
        chartGridColor: 'rgba(75, 85, 99, 0.3)', // gray-700 with transparency
        chartTextColor: 'rgb(209, 213, 219)', // gray-300
        primaryRgb: '156, 163, 175', // gray-400
        secondaryRgb: '156, 163, 175', // gray-400
        progressBgClass: 'bg-gray-700',
        progressFillClass: 'bg-gray-400',
        // PCG Waveform colors
        waveformStroke: '#60A5FA', // blue-400
        waveformFill: 'rgba(96, 165, 250, 0.15)', // blue-400 with transparency
    },
};

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

    const { t } = useTranslation();
    
    const STATUS_STYLES = {
        health: {
            'Stable': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Needs Attention': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Critical': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        livePcg: {
            'Normal': 'text-emerald-600 dark:text-emerald-400',
            'Irregular': 'text-rose-600 dark:text-rose-400 animate-pulse',
        },
        alert: { // These are now based on actual alert type, not just status
            'info': 'bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200',
            'warning': 'bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-900 dark:border-amber-700 dark:text-amber-200',
            'danger': 'bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-900 dark:border-rose-700 dark:text-rose-200',
            'default': 'bg-gray-50 border border-gray-200 text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200',
        },
        risk: {
            'Low': 'bg-emerald-500 text-white',
            'Medium': 'bg-amber-500 text-white',
            'High': 'bg-rose-500 text-white',
            'default': 'bg-gray-500 text-white',
        },
        report: {
            'Pending': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Completed': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Requires Review': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        appointment: {
            'Scheduled': 'bg-sky-100 text-sky-800 dark:bg-sky-700 dark:text-sky-100',
            'Completed': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Cancelled': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        sync: {
            'Synced': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Pending': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Error': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        heartHealth: {
            'Optimal': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Good': 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100',
            'Needs Monitoring': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Concern': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        medication: {
            'Taken': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Pending': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Skipped': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        },
        sleep: {
            'Good': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100',
            'Fair': 'bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100',
            'Poor': 'bg-rose-100 text-rose-800 dark:bg-rose-700 dark:text-rose-100',
            'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
        }
    };

    specificClasses = STATUS_STYLES[type]?.[status] || STATUS_STYLES[type]?.default || STATUS_STYLES.default.default;

    return (
        <span className={`${baseClasses} ${specificClasses} ${className}`}>
            {t(status.toLowerCase())}
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
 * @param {object} props.themeColors - Theme-specific colors.
 */
const Card = ({ title, children, className = '', headerContent, themeColors, id }) => (
    <motion.div
        id={id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`${themeColors.cardBgClass} p-6 rounded-xl ${themeColors.shadowClass} ${themeColors.cardBorderClass} ${className}`}
    >
        <div className="flex justify-between items-center mb-4">
            {title && <h2 className={`text-xl font-semibold ${themeColors.textColorClass}`}>{title}</h2>}
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
 * @param {string} props.currentThemeName - Name of the current active theme.
 * @param {function} props.toggleTheme - Function to toggle the theme.
 * @param {string} props.language - Current language code.
 * @param {function} props.setLanguage - Function to set the language.
 * @param {function} props.onLogout - Function to handle logout.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {function} props.scrollToSection - Function to scroll to a specific section.
 * @param {string} props.activeSection - The currently active section ID.
 */
const NavBar = ({ t, currentThemeName, toggleTheme, language, setLanguage, onLogout, themeColors, scrollToSection, activeSection, setIsMobileMenuOpen }) => {
    // Dynamic gradient classes based on theme
    // Note: Tailwind's JIT/AOT compiler needs full class names.
    // For gradients, explicitly define them in the theme config if complex,
    // or use a pre-defined set of classes.
    const gradientClasses = currentThemeName === 'light'
        ? `from-blue-600 to-indigo-700`
        : `from-gray-700 to-gray-800`;


    const navLinks = [
        { id: 'dashboard-section', label: t('home'), icon: <i className="fas fa-home mr-2"></i> },
        { id: 'health-reports-section', label: t('reports'), icon: <i className="fas fa-file-alt mr-2"></i> },
        { id: 'appointments-section', label: t('appointments'), icon: <i className="fas fa-calendar-check mr-2"></i> },
        { id: 'notifications-section', label: t('messages'), icon: <i className="fas fa-comments mr-2"></i> }, // Changed to notifications-section
    ];

    return (
        <nav className={`bg-gradient-to-r ${gradientClasses} ${themeColors.textColorClass} p-4 ${themeColors.shadowClass} relative z-40`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold tracking-wide">
                    {t('patientDashboard')}
                </div>
                <div className="lg:hidden">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="text-white focus:outline-none p-2 rounded-md hover:bg-white/20 transition-colors">
                        <Bars3Icon className="w-6 h-6" /> {/* Using Heroicon for consistency */}
                    </button>
                </div>
                <div className="hidden lg:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(link.id);
                            }}
                            className={`flex items-center p-2 rounded-md transition-colors duration-200
                                ${activeSection === link.id ? `bg-white/30 text-white` : `hover:bg-white/20 text-white`}`
                            }
                        >
                            {link.icon}{link.label}
                        </a>
                    ))}

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                        title={currentThemeName === 'light' ? t('darkTheme') : t('lightTheme')}
                    >
                        {currentThemeName === 'light' ? (
                            <MoonIcon className="w-6 h-6 text-yellow-300" />
                        ) : (
                            <SunIcon className="w-6 h-6 text-yellow-300" />
                        )}
                    </button>

                    <select
                        className={`p-2 rounded-md bg-white/20 ${themeColors.textColorClass} focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-200`}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="en">{t('english')}</option>
                        <option value="ur">{t('urdu')}</option>
                        <option value="es">{t('spanish')}</option>
                        <option value="fr">{t('french')}</option>
                        <option value="de">{t('german')}</option>
                    </select>
                    <button
                        onClick={onLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center"
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i> {t('logout')}
                    </button>
                </div>
            </div>
            {/* Mobile navigation menu handled by a Dialog in PatientDashboard */}
        </nav>
    );
};

/**
 * Sidebar Component: Displays patient profile information and navigation links.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.patient - Patient data object.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {function} props.scrollToSection - Function to scroll to a specific section.
 * @param {string} props.activeSection - The currently active section ID.
 */
const Sidebar = ({ t, patient, themeColors, scrollToSection, activeSection, setIsMobileMenuOpen }) => {
    const sidebarLinks = [
        { id: 'dashboard-section', label: t('dashboard'), icon: <i className={`fas fa-chart-line mr-3 text-blue-500`}></i> },
        { id: 'profile-section', label: t('profile'), icon: <i className="fas fa-user-circle mr-3 text-indigo-500"></i> },
        { id: 'health-trends-section', label: t('health_trends'), icon: <i className="fas fa-chart-bar mr-3 text-green-500"></i> },
        { id: 'appointments-section', label: t('myAppointments'), icon: <i className="fas fa-calendar-alt mr-3 text-yellow-500"></i> },
        { id: 'medication-section', label: t('medicationReminders'), icon: <i className="fas fa-pills mr-3 text-purple-500"></i> },
        { id: 'notifications-section', label: t('recentAlerts'), icon: <i className="fas fa-bell mr-3 text-red-500"></i> },
        { id: 'settings-section', label: t('settings'), icon: <i className="fas fa-cog mr-3 text-gray-500"></i> },
    ];

    return (
        <div className={`w-64 ${themeColors.sidebarBgClass} p-6 flex flex-col items-center ${themeColors.shadowClass} rounded-r-xl transition-colors duration-300 ${themeColors.sidebarBorderClass} sticky top-0 h-screen overflow-y-auto hidden lg:flex`}>
            <div className="mb-6 text-center">
                <img src={patient.profilePic} alt={t('name')} className={`w-28 h-28 rounded-full border-4 border-blue-500 object-cover mx-auto mb-4 ${themeColors.shadowClass}`} />
                <h3 className={`text-xl font-bold ${themeColors.textColorClass}`}>{patient.name}</h3>
                <p className={`text-sm text-gray-600 dark:text-gray-400`}>{patient.email || 'patient@example.com'}</p>
            </div>
            <nav className="flex-grow w-full">
                <ul className="space-y-3">
                    {sidebarLinks.map(link => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(link.id);
                                    if (setIsMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu if called from it
                                }}
                                className={`flex items-center p-3 rounded-lg transition-colors duration-200 font-medium
                                    ${activeSection === link.id
                                        ? `bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300`
                                        : `text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30`
                                    }`
                                }
                            >
                                {link.icon} {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

/**
 * LivePCGMonitoring Component: Simulates live PCG monitoring with a status display.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 */
const LivePCGMonitoring = ({ t, themeColors }) => {
    const [pcgValue, setPcgValue] = useState(72);
    const [status, setStatus] = useState('Normal');

    useEffect(() => {
        const interval = setInterval(() => {
            const newValue = Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Simulate PCG value between 50-100
            setPcgValue(newValue);
            if (newValue > 85 || newValue < 60) {
                setStatus('Irregular');
            } else {
                setStatus('Normal');
            }
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <Card title={t('livePCG')} className="col-span-full md:col-span-1" themeColors={themeColors}>
            <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-32 h-32 mb-4">
                    <div className={`absolute inset-0 rounded-full flex items-center justify-center ${status === 'Normal' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-rose-100 dark:bg-rose-900/30'} transition-all duration-500 ease-in-out`}>
                        <i className={`fas fa-heartbeat text-5xl ${status === 'Normal' ? 'text-emerald-500' : 'text-rose-500 animate-pulse'}`}></i>
                    </div>
                </div>
                <p className={`text-xl font-bold ${status === 'Normal' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'} mt-2`}>
                    {t('pcgStatus', { status: status })}
                </p>
                <p className={`text-lg text-gray-700 dark:text-gray-300 mt-1`}>
                    {t('pcgValue', { value: pcgValue })}
                </p>
            </div>
            <div className="mt-4 text-center">
                <p className={`text-sm text-gray-500 dark:text-gray-400 italic`}>
                    (Simulated Data)
                </p>
            </div>
        </Card>
    );
};

/**
 * CurrentHealthStatus Component: Displays a bar chart for PCG metrics.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors for chart styling.
 */
const CurrentHealthStatus = ({ t, themeColors }) => {
    const pcgData = useMemo(() => ({
        labels: [t('s1Amplitude'), t('s2Frequency'), t('murmurPresence'), t('pcgScore')],
        datasets: [
            {
                label: t('pcgMetrics'),
                data: [75, 120, 0.2, 88], // Example PCG values: S1 Amplitude (0-100), S2 Frequency (Hz), Murmur Presence (0-1), PCG Score (0-100)
                backgroundColor: [
                    `rgba(${themeColors.primaryRgb}, 0.7)`,
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                ],
                borderColor: [
                    `rgb(${themeColors.primaryRgb})`,
                    'rgb(75, 192, 192)',
                    'rgb(255, 99, 132)',
                    'rgb(153, 102, 255)',
                ],
                borderWidth: 1,
                borderRadius: 5,
            },
        ],
    }), [t, themeColors.primaryRgb]);

    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: t('currentHealthStatus') + ' - ' + t('pcgStatus'),
                color: themeColors.chartTextColor,
                font: {
                    size: 18,
                    weight: 'bold',
                }
            },
            tooltip: {
                backgroundColor: themeColors.cardBgClass.replace('bg-', ''), // Extract color name for background
                titleColor: themeColors.textColorClass.replace('text-', ''), // Extract color name for text
                bodyColor: themeColors.textColorClass.replace('text-', ''),
                borderColor: themeColors.cardBorderClass.replace('border-', ''),
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            // Determine unit based on label
                            if (context.label === t('s1Amplitude') || context.label === t('pcgScore')) {
                                label += context.parsed.y;
                            } else if (context.label === t('s2Frequency')) {
                                label += context.parsed.y + ' Hz';
                            } else if (context.label === t('murmurPresence')) {
                                label += (context.parsed.y * 100).toFixed(0) + '%';
                            }
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: themeColors.chartGridColor,
                },
                ticks: {
                    color: themeColors.chartTextColor,
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: themeColors.chartGridColor,
                },
                ticks: {
                    color: themeColors.chartTextColor,
                    // No custom callback needed here as values are numerical and units are in tooltip
                },
                min: 0,
                max: 150, // Adjusted max for PCG metrics
            },
        },
    }), [t, themeColors.chartGridColor, themeColors.chartTextColor, themeColors.cardBgClass, themeColors.textColorClass, themeColors.cardBorderClass]);

    return (
        <Card title={t('currentHealthStatus')} className="col-span-full md:col-span-1" themeColors={themeColors}>
            <div className="h-64"> {/* Fixed height for the chart container */}
                {pcgData.datasets[0].data.length > 0 ? (
                    <Bar data={pcgData} options={chartOptions} />
                ) : (
                    <p className={`${themeColors.textColorClass.replace('text-gray-900', 'text-gray-500').replace('text-gray-100', 'text-gray-400')} text-center py-10`}>
                        {t('noHealthStatus')}
                    </p>
                )}
            </div>
        </Card>
    );
};

/**
 * HealthTrends Component: Displays line charts for PCG-related health trends over time.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors for chart styling.
 */
const HealthTrends = ({ t, themeColors }) => {
    // Generate simulated PCG trend data for the last 12 months
    const generatePCGTrendData = useCallback(() => {
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // Simulate Heart Rate (e.g., 60-90 bpm, with a slight potential increase over time)
        const heartRateData = labels.map((_, i) => Math.floor(60 + Math.random() * 20 + (i / 12) * 10));
        // Simulate Murmur Score (e.g., 0: Normal, 1: Mild, 2: Moderate, 3: Severe)
        // Introduce some variation, maybe a slight increase in later months
        const murmurScoreData = labels.map((_, i) => Math.min(3, Math.floor(Math.random() * 2 + (i / 12) * 1)));
        
        return { labels, heartRateData, murmurScoreData };
    }, []);

    const { labels, heartRateData, murmurScoreData } = useMemo(generatePCGTrendData, [generatePCGTrendData]);

    const heartRateChartData = {
        labels,
        datasets: [
            {
                label: t('pcg_trend_heart_rate'),
                data: heartRateData,
                borderColor: `rgb(${themes.light.primaryRgb})`, // Using theme primary color for consistency
                backgroundColor: `rgba(${themes.light.primaryRgb}, 0.5)`,
                tension: 0.4,
                fill: false,
                pointRadius: 5,
                pointBackgroundColor: `rgb(${themes.light.primaryRgb})`,
                pointBorderColor: themeColors.cardBgClass.replace('bg-', ''), // Use plain color value
                pointHoverRadius: 7,
            },
        ],
    };

    const murmurScoreChartData = {
        labels,
        datasets: [
            {
                label: t('pcg_trend_murmur_score'),
                data: murmurScoreData,
                borderColor: 'rgb(255, 159, 64)', // A distinct color for murmur score
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                tension: 0.4,
                fill: false,
                pointRadius: 5,
                pointBackgroundColor: 'rgb(255, 159, 64)',
                pointBorderColor: themeColors.cardBgClass.replace('bg-', ''), // Use plain color value
                pointHoverRadius: 7,
            },
        ],
    };

    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: themeColors.chartTextColor,
                }
            },
            title: {
                display: false, // Title is handled by Card component or H4
            },
            tooltip: {
                backgroundColor: themeColors.cardBgClass.replace('bg-', ''), // Extract color name for background
                titleColor: themeColors.textColorClass.replace('text-', ''), // Extract color name for text
                bodyColor: themeColors.textColorClass.replace('text-', ''),
                borderColor: themeColors.cardBorderClass.replace('border-', ''),
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.dataset.label === t('pcg_trend_murmur_score')) {
                            const score = context.parsed.y;
                            if (score === 0) label += t('normal');
                            else if (score === 1) label += t('mild');
                            else if (score === 2) label += t('moderate');
                            else if (score === 3) label += t('severe');
                        } else {
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
                    color: themeColors.chartGridColor,
                },
                ticks: {
                    color: themeColors.chartTextColor,
                }
            },
            y: {
                grid: {
                    color: themeColors.chartGridColor,
                },
                ticks: {
                    color: themeColors.chartTextColor,
                },
                min: 0,
                max: 100, // General max for HR/Score scale
            },
        },
    }), [t, themeColors.chartGridColor, themeColors.chartTextColor, themeColors.cardBgClass, themeColors.textColorClass, themeColors.cardBorderClass]);

    const murmurScoreOptions = useMemo(() => ({
        ...chartOptions,
        scales: {
            x: chartOptions.scales.x,
            y: {
                ...chartOptions.scales.y,
                id: 'murmur-score-y-axis', // Unique ID for this scale
                min: -0.5, // Start below 0 for better visual of 'Normal'
                max: 3.5, // Extend slightly beyond max score for better visual
                stepSize: 1, // Ensure integer ticks
                ticks: {
                  ...chartOptions.scales.y.ticks,
                  callback: function (value, index, ticks) {
                    // Only display labels for integer values corresponding to levels
                    if (value === 0) return t('normal');
                    if (value === 1) return t('mild');
                    if (value === 2) return t('moderate');
                    if (value === 3) return t('severe');
                    return '';
                  }
                }
            }
        }
    }), [chartOptions, t]);

    return (
        <Card title={t('healthTrends')} className="col-span-full" themeColors={themeColors}>
            <p className={`text-sm mb-4 ${themeColors.textColorClass} opacity-70`}>{t('pcg_value_over_time')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className={`text-lg font-semibold mb-2 ${themeColors.textColorClass}`}>{t('pcg_trend_heart_rate')}</h4>
                    <div className="h-64"> {/* Fixed height for the chart container */}
                        <Line data={heartRateChartData} options={chartOptions} />
                    </div>
                </div>
                <div>
                    <h4 className={`text-lg font-semibold mb-2 ${themeColors.textColorClass}`}>{t('pcg_trend_murmur_score')}</h4>
                    <div className="h-64"> {/* Fixed height for the chart container */}
                        <Line data={murmurScoreChartData} options={murmurScoreOptions} />
                    </div>
                </div>
            </div>
        </Card>
    );
};


/**
 * Footer Component: Displays copyright, quick links, and social media icons.
 * @param {object} props - Component props.
 * @param {function} props.t - Translation function.
 * @param {object} props.themeColors - Theme-specific colors.
 */
const Footer = ({ t, themeColors }) => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={`${themeColors.cardBgClass} ${themeColors.cardBorderClass} py-8 text-center text-sm text-gray-600 dark:text-gray-400 mt-8`}>
            <div className="container mx-auto px-4">
                <p>&copy; {currentYear} {t('patientDashboard')}. {t('allRightsReserved')}.</p>
                <div className="mt-4 flex flex-wrap justify-center space-x-6">
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('privacyPolicy')}</a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('termsOfService')}</a>
                    <a href="#" className={`hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}>{t('contactUs')}</a>
                </div>
                <div className="mt-6 flex justify-center space-x-5">
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-facebook-f text-xl"></i></a>
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-twitter text-xl"></i></a>
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-instagram text-xl"></i></a>
                    <a href="#" className={`text-gray-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors`}><i className="fab fa-linkedin-in text-xl"></i></a>
                </div>
            </div>
        </footer>
    );
};

/**
 * PCGWaveform SVG Component: Generates a simple SVG representation of a PCG waveform.
 * @param {object} props - Component props.
 * @param {number} props.width - Width of the SVG.
 * @param {number} props.height - Height of the SVG.
 * @param {string} props.strokeColor - Color for the waveform line.
 * @param {string} props.fillColor - Fill color for the area under the waveform.
 */
const PCGWaveform = ({ width = 400, height = 150, strokeColor, fillColor }) => {
    // Generate some points for a simplified PCG waveform (S1-S2 cycle)
    const points = [];
    const numPoints = 100;
    const peakHeight = height * 0.4; // Max deviation from midline
    const midline = height / 2;

    for (let i = 0; i < numPoints; i++) {
        const x = (i / (numPoints - 1)) * width;
        let y;
        // Simulate S1 (first large peak)
        if (i < numPoints * 0.15) { // First 15%
            y = midline - peakHeight * Math.sin((i / (numPoints * 0.15)) * Math.PI);
        }
        // Simulate S2 (second smaller peak)
        else if (i > numPoints * 0.3 && i < numPoints * 0.45) { // 30-45%
            y = midline - (peakHeight * 0.6) * Math.sin(((i - numPoints * 0.3) / (numPoints * 0.15)) * Math.PI);
        }
        // Baseline/diastole
        else {
            y = midline + (Math.random() - 0.5) * 5; // Slight noise
        }
        points.push(`${x},${y}`);
    }

    const pathData = `M${points.join('L')}`;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ border: '1px solid currentColor', borderRadius: '8px' }}>
            <defs>
                <linearGradient id="waveformGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={strokeColor} stopOpacity="0.6"/>
                    <stop offset="100%" stopColor={fillColor} stopOpacity="0"/>
                </linearGradient>
            </defs>
            <path d={pathData} stroke={strokeColor} strokeWidth="2" fill="url(#waveformGradient)" />
            {/* Optional: Add a baseline */}
            <line x1="0" y1={midline} x2={width} y2={midline} stroke={strokeColor} strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
            {/* Optional: S1/S2 markers */}
            <circle cx={points[Math.floor(numPoints * 0.07)].split(',')[0]} cy={points[Math.floor(numPoints * 0.07)].split(',')[1]} r="3" fill="red" />
            <circle cx={points[Math.floor(numPoints * 0.37)].split(',')[0]} cy={points[Math.floor(numPoints * 0.37)].split(',')[1]} r="3" fill="red" />
            <text x={points[Math.floor(numPoints * 0.07)].split(',')[0]} y={points[Math.floor(numPoints * 0.07)].split(',')[1] - 10} textAnchor="middle" fill={strokeColor} fontSize="10">S1</text>
            <text x={points[Math.floor(numPoints * 0.37)].split(',')[0]} y={points[Math.floor(numPoints * 0.37)].split(',')[1] - 10} textAnchor="middle" fill={strokeColor} fontSize="10">S2</text>
        </svg>
    );
};


/**
 * Main PatientDashboard Component: Orchestrates all sub-components.
 */
const PatientDashboard = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false); // State for new appointment modal
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // State for cancel confirmation modal
    const [appointmentToCancel, setAppointmentToCancel] = useState(null); // State to hold appointment being cancelled
    const [isReportDetailsModalOpen, setIsReportDetailsModalOpen] = useState(false); // State for report details modal
    const [selectedReport, setSelectedReport] = useState(null); // State to hold selected report for details

    const [newAppointment, setNewAppointment] = useState({
        doctor: '',
        date: '',
        time: '',
        reason: '',
    });

    const [currentTheme, setCurrentTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme && themes[savedTheme] ? savedTheme : 'light';
    });

    const [language, setLanguage] = useState(i18n.language);
    const [activeSection, setActiveSection] = useState('dashboard-section'); // State for active section
    const [searchTerm, setSearchTerm] = useState(''); // State for report search term

    // State for appointments - now dynamic
    const [appointments, setAppointments] = useState([
        { id: 'app1', doctorKey: 'doctor_ali_khan', date: '2025-07-10', time: '10:00 AM', reason: 'Annual Check-up', status: 'Scheduled' },
        { id: 'app2', doctorKey: 'doctor_sara_javed', date: '2025-08-01', time: '02:30 PM', reason: 'Follow-up for Cholesterol', status: 'Scheduled' },
        { id: 'app3', doctorKey: 'doctor_asif_mehmood', date: '2025-07-20', time: '11:00 AM', reason: 'Dermatology Consultation', status: 'Scheduled' },
    ]);

    // State for reports - new dynamic data with PCG details
    const [reports, setReports] = useState([
        { 
            id: 'rep1', date: '2025-06-15', type: 'PCG Analysis', status: 'Completed', fileUrl: '/path/to/pcg_analysis_rep1.pdf', 
            content: 'Detailed PCG analysis. This report confirms stable cardiac health based on the current phonocardiogram data. No immediate concerns identified. This S1 heart sound is clear and crisp, indicating proper closure of the mitral and tricuspid valves. The S2 heart sound is also well-defined, showing normal aortic and pulmonic valve closure. No additional heart sounds or adventitious sounds were detected. The heart rhythm is regular sinus rhythm. All parameters are within normal physiological ranges, indicating healthy heart function. The absence of murmurs suggests no turbulent blood flow within the heart.',
            pcgMetrics: { s1Amplitude: 75, s2Frequency: 120, murmurPresence: 0.05, pcgScore: 88, murmurType: 'None' },
            doctorNotes: 'Patient exhibits excellent cardiac health with normal heart sounds. Continue regular monitoring.',
        },
        { 
            id: 'rep2', date: '2025-05-20', type: 'Heart Sound Report', status: 'Completed', fileUrl: '/path/to/heart_sound_rep2.pdf', 
            content: 'Heart sound report from latest recording. Clear S1 and S2 sounds. No adventitious sounds. Heart rate average: 70 bpm. The intensity of S1 is normal, and it is appropriately split. S2 is also normal in intensity and splitting. No S3 or S4 gallops. No clicks or snaps. The overall auscultation findings are reassuring. Patient denies any new symptoms of chest pain, shortness of breath, or palpitations. Regular exercise and a balanced diet are recommended for continued cardiovascular well-being.',
            pcgMetrics: { s1Amplitude: 70, s2Frequency: 110, murmurPresence: 0.02, pcgScore: 92, murmurType: 'None' },
            doctorNotes: 'Healthy heart sounds. No murmurs or extra sounds. Maintain current lifestyle.',
        },
        { 
            id: 'rep3', date: '2025-04-10', type: 'Murmur Detection Report', status: 'Requires Review', fileUrl: '/path/to/murmur_detection_rep3.pdf', 
            content: 'Murmur detection report indicates a faint mid-systolic murmur, Grade II/VI. Further investigation with echocardiogram recommended. Patient should follow up with a cardiologist within 2-4 weeks to assess the nature and significance of the murmur. The murmur is best heard at the apex and radiates towards the axilla. It is likely an innocent murmur, but further imaging will provide definitive clarification and rule out any structural heart disease. Patient remains asymptomatic.',
            pcgMetrics: { s1Amplitude: 60, s2Frequency: 100, murmurPresence: 0.4, pcgScore: 65, murmurType: 'Mid-systolic' },
            doctorNotes: 'Mild systolic murmur detected. Echocardiogram referral for definitive diagnosis.',
        },
        { 
            id: 'rep4', date: '2025-03-01', type: 'PCG Baseline Comparison', status: 'Completed', fileUrl: '/path/to/pcg_baseline_rep4.pdf', 
            content: 'Comparison with previous PCG data. Stable heart sound characteristics. No significant changes since last examination. This indicates consistent cardiac acoustic patterns, which is a positive sign. The spectral analysis of heart sounds shows no new frequencies or amplitude shifts, reinforcing the stability of cardiac function. This baseline report is crucial for future comparisons to detect any subtle changes early.',
            pcgMetrics: { s1Amplitude: 72, s2Frequency: 115, murmurPresence: 0.01, pcgScore: 90, murmurType: 'None' },
            doctorNotes: 'Baseline PCG remains stable. No significant progression of any findings. Good control.',
        },
        { 
            id: 'rep5', date: '2025-02-10', type: 'Heart Sound Report', status: 'Completed', fileUrl: '/path/to/heart_sound_rep5.pdf', 
            content: 'Routine heart sound check. All sounds clear, no abnormalities. Resting heart rate 72 bpm. Excellent condition. Patient reports feeling well and has no cardiovascular complaints. Auscultation confirms healthy heart sounds.',
            pcgMetrics: { s1Amplitude: 78, s2Frequency: 125, murmurPresence: 0.0, pcgScore: 95, murmurType: 'None' },
            doctorNotes: 'Excellent heart health. No concerns.',
        },
        { 
            id: 'rep6', date: '2025-01-05', type: 'PCG Analysis', status: 'Completed', fileUrl: '/path/to/pcg_analysis_rep6.pdf', 
            content: 'Annual PCG scan results. S1/S2 normal, no extra sounds. PCG score 92. Very good cardiovascular health. The advanced algorithms confirm regular heart rhythm and sound morphology. The patient has been compliant with lifestyle recommendations, which is reflected in these healthy findings.',
            pcgMetrics: { s1Amplitude: 80, s2Frequency: 130, murmurPresence: 0.0, pcgScore: 92, murmurType: 'None' },
            doctorNotes: 'Annual check-up confirms normal PCG. Continue healthy lifestyle.',
        },
    ]);

    // State for alerts - now dynamic with types and dismiss status
    const [alerts, setAlerts] = useState([
        { id: 'alert1', type: 'warning', message: 'bloodPressureHigh', timestamp: '2 hours ago', details: 'Your latest blood pressure reading was 145/95 mmHg. Please consult your doctor.', isDismissed: false },
        { id: 'alert2', type: 'info', message: 'newLabResults', timestamp: 'yesterday', details: 'New blood test results are available in your reports section. Click to view.', isDismissed: false },
        { id: 'alert3', type: 'danger', message: 'appointmentReminder', timestamp: '30 mins ago', details: 'Reminder: You have an upcoming appointment with Dr. Ali Khan tomorrow at 10:00 AM.', isDismissed: false },
    ]);

    // State for medication reminders
    const [medications, setMedications] = useState([
        { id: 'med1', name: 'Lisinopril', dose: '10mg', time: 'morning', taken: false },
        { id: 'med2', name: 'Aspirin', dose: '81mg', time: 'morning', taken: true },
        { id: 'med3', name: 'Vitamin D', dose: '1000 IU', time: 'afternoon', taken: false },
        { id: 'med4', name: 'Atorvastatin', dose: '20mg', time: 'night', taken: false },
    ]);

    // Simulate new alerts appearing over time
    useEffect(() => {
        const alertInterval = setInterval(() => {
            const newAlert = {
                id: `alert${alerts.length + 1}`,
                type: ['info', 'warning', 'danger'][Math.floor(Math.random() * 3)],
                message: `New random alert ${alerts.length + 1}!`,
                timestamp: 'just now',
                details: 'This is a simulated new alert to demonstrate dynamic updates.',
                isDismissed: false,
            };
            // Only add if not already present to prevent duplicates on re-render
            setAlerts(prev => {
                if (!prev.some(a => a.id === newAlert.id)) {
                    toast.info("You have a new alert!");
                    return [...prev.filter(a => !a.isDismissed), newAlert];
                }
                return prev;
            });
        }, 60000); // Add a new alert every minute

        return () => clearInterval(alertInterval);
    }, [alerts.length]);


    // Refs for scrolling to sections
    const dashboardRef = useRef(null);
    const profileRef = useRef(null);
    const healthTrendsRef = useRef(null);
    const healthReportsRef = useRef(null); // New ref for health reports
    const appointmentsRef = useRef(null);
    const medicationRef = useRef(null);
    const notificationsRef = useRef(null);
    const settingsRef = useRef(null);

    const sectionRefs = {
        'dashboard-section': dashboardRef,
        'profile-section': profileRef,
        'health-trends-section': healthTrendsRef,
        'health-reports-section': healthReportsRef, // Add new section ref
        'appointments-section': appointmentsRef,
        'medication-section': medicationRef,
        'notifications-section': notificationsRef,
        'settings-section': settingsRef,
    };

    const scrollToSection = useCallback((id) => {
        const element = sectionRefs[id]?.current;
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(id); // Update active section state
        }
    }, [sectionRefs]);

    // Get current theme colors dynamically
    const themeColors = themes[currentTheme];

    // Apply dark class to HTML root for Tailwind's dark mode
    useEffect(() => {
        const root = document.documentElement;
        if (currentTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [currentTheme]);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n]);

    // Effect to observe scroll position and update active section
    useEffect(() => {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '-50% 0px -50% 0px', // When 50% of the section is in view
            threshold: 0,
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            Object.values(sectionRefs).forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, [sectionRefs]);


    const toggleTheme = useCallback(() => {
        setCurrentTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            toast.info(t(`Switched to ${newTheme === 'light' ? 'lightTheme' : 'darkTheme'}`)); // Translate toast message
            return newTheme;
        });
    }, [t]);

    const patientData = useMemo(() => ({
        id: 'P001',
        name: i18n.language === 'ur' ? "علی خان" : "Ali Khan",
        profilePic: "https://via.placeholder.com/150/4F46E5/FFFFFF?text=AK", // Placeholder image
        email: "ali.khan@example.com",
        age: 35,
        gender: i18n.language === 'ur' ? "مرد" : "Male",
        bloodGroup: "A+",
        dob: "1990-05-15",
        allergies: ['Pollen', 'Dust'],
        medicalHistory: [i18n.language === 'ur' ? 'دمہ (2005 سے)' : 'Asthma (since 2005)', i18n.language === 'ur' ? 'موسمی الرجی' : 'Seasonal Allergies'],
        contact: {
            address: '123 Main St, Anytown, State, 12345, Pakistan',
            phone: '+92 3XX XXXXXXX',
            email: 'ali.khan@example.com',
        },
        emergencyContact: {
            name: i18n.language === 'ur' ? 'فاطمہ خان' : 'Fatima Khan',
            relationship: i18n.language === 'ur' ? 'بیوی' : 'Wife',
            phone: '+92 3XX YYYYYYY',
        }
    }), [i18n.language]); // Depend on i18n.language to re-render with correct names


    const handleLogout = useCallback(() => {
        toast.success(t('logoutSuccess'));
        // Simulate navigation or actual logout process
        // navigate('/login'); // If using React Router, uncomment and set up login route
        console.log("User logged out!");
    }, [t]);

    const handleScheduleAppointment = useCallback((e) => {
        e.preventDefault();
        const { doctor, date, time, reason } = newAppointment;
        if (!doctor || !date || !time || !reason) {
            toast.error(t('fillAllFields'));
            return;
        }

        const newApp = {
            id: `app${appointments.length + 1}`,
            doctorKey: doctor, // Store the doctor's key, not the translated name directly
            date,
            time,
            reason,
            status: 'Scheduled',
        };
        setAppointments(prev => [...prev, newApp]);
        toast.success(t('appointmentScheduledSuccess'));
        setNewAppointment({ doctor: '', date: '', time: '', reason: '' });
        setIsScheduleModalOpen(false); // Close modal on success
    }, [newAppointment, appointments, t]);

    const openCancelModal = useCallback((app) => {
        setAppointmentToCancel(app);
        setIsCancelModalOpen(true);
    }, []);

    const confirmCancelAppointment = useCallback(() => {
        if (appointmentToCancel) {
            const translatedDoctorName = t(appointmentToCancel.doctorKey);
            setAppointments(prev => prev.filter(app => app.id !== appointmentToCancel.id));
            toast.success(t('appointmentCancelled', { doctorName: translatedDoctorName, date: appointmentToCancel.date, time: appointmentToCancel.time }));
            setAppointmentToCancel(null);
            setIsCancelModalOpen(false);
        }
    }, [appointmentToCancel, appointments, t]);

    // Updated doctorsList to use translation keys
    const doctorsList = useMemo(() => [
        { id: 'd1', nameKey: 'doctor_ali_khan', specialtyKey: 'specialty_cardiologist' },
        { id: 'd2', nameKey: 'doctor_sara_javed', specialtyKey: 'specialty_general_physician' },
        { id: 'd3', nameKey: 'doctor_asif_mehmood', specialtyKey: 'specialty_dermatologist' }, // Corrected name to nameKey
        { id: 'd4', nameKey: 'doctor_aisha_siddiqui', specialtyKey: 'specialty_pediatrician' }, // Corrected name to nameKey
    ], []);

    const dismissAlert = useCallback((id) => {
        setAlerts(prev => prev.map(alert =>
            alert.id === id ? { ...alert, isDismissed: true } : alert
        ));
        toast.info("Alert dismissed!");
    }, []);

    const openAlertDetailsModal = useCallback((alert) => {
        setSelectedAlert(alert);
        setIsAlertDetailsModalOpen(true);
    }, []);

    const [isAlertDetailsModalOpen, setIsAlertDetailsModalOpen] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState(null);


    const filteredAlerts = useMemo(() => alerts.filter(alert => !alert.isDismissed), [alerts]);

    const handleViewReport = useCallback((report) => {
        setSelectedReport(report);
        setIsReportDetailsModalOpen(true);
        toast.info(t('reportViewSuccess', { reportId: report.id }));
    }, [t]);

    const handleDownloadReport = useCallback((report) => {
        // Simulate file download
        const link = document.createElement('a');
        link.href = report.fileUrl || `data:text/plain;charset=utf-8,${encodeURIComponent(report.content)}`;
        link.download = `${t(report.type.replace(/\s/g, '').toLowerCase())}_Report_${report.id}.txt`; // Translate and use .txt for simulated content or actual file extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(t('reportDownloadSuccess', { reportId: report.id }));
    }, [t]);

    const filteredReports = useMemo(() => {
        // Filter by search term across id, type (translated), status (translated), and content
        return reports.filter(report => {
            const translatedType = t(report.type.replace(/\s/g, '').toLowerCase());
            const translatedStatus = t(report.status.toLowerCase());
            const lowerCaseSearchTerm = searchTerm.toLowerCase();

            return report.id.toLowerCase().includes(lowerCaseSearchTerm) ||
                   translatedType.toLowerCase().includes(lowerCaseSearchTerm) ||
                   translatedStatus.toLowerCase().includes(lowerCaseSearchTerm) ||
                   report.content.toLowerCase().includes(lowerCaseSearchTerm);
        });
    }, [reports, searchTerm, t]);

    const markMedicationAsTaken = useCallback((id) => {
        setMedications(prev => prev.map(med =>
            med.id === id ? { ...med, taken: true } : med
        ));
        toast.success(t('medicationTakenSuccess'));
    }, [t]);


    return (
        <div className={`min-h-screen flex flex-col lg:flex-row ${themeColors.backgroundClass} ${themeColors.textColorClass} transition-colors duration-300 font-sans`}
             style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}> {/* Apply font smoothing */}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={i18n.language === 'ur'}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={currentTheme === 'dark' ? 'dark' : 'light'}
                limit={3}
            />

            {/* Sidebar - only visible on large screens */}
            <Sidebar
                t={t}
                patient={patientData}
                themeColors={themeColors}
                scrollToSection={scrollToSection}
                activeSection={activeSection}
                setIsMobileMenuOpen={setIsMobileMenuOpen} // Pass for mobile close
            />

            {/* Mobile Menu (Hidden on large screens, toggled by NavBar) */}
            <Transition appear show={isMobileMenuOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={() => setIsMobileMenuOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className={`relative flex flex-col w-full max-w-xs ${themeColors.sidebarBgClass} ${themeColors.textColorClass} py-4 pb-12 ${themeColors.shadowClass}`}>
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-2xl font-bold">{t('dashboard')}</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                {/* Mobile Sidebar Content - Reuse Sidebar for consistency */}
                                <div className="mt-5 px-2">
                                    <Sidebar
                                        t={t}
                                        patient={patientData}
                                        themeColors={themeColors}
                                        scrollToSection={scrollToSection}
                                        activeSection={activeSection}
                                        setIsMobileMenuOpen={setIsMobileMenuOpen} // Pass this to close menu
                                    />
                                    <div className="mt-4 px-4">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center"
                                        >
                                            <i className="fas fa-sign-out-alt mr-2"></i> {t('logout')}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            <div className="flex-1 flex flex-col overflow-hidden">
                <NavBar
                    t={t}
                    currentThemeName={currentTheme}
                    toggleTheme={toggleTheme}
                    language={language}
                    setLanguage={setLanguage}
                    onLogout={handleLogout}
                    themeColors={themeColors}
                    scrollToSection={scrollToSection}
                    activeSection={activeSection}
                    setIsMobileMenuOpen={setIsMobileMenuOpen} // Pass for mobile menu
                />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

                    {/* Dashboard Overview Section */}
                    <section ref={dashboardRef} id="dashboard-section" className={`${themeColors.cardBgClass} p-6 rounded-xl ${themeColors.shadowClass} ${themeColors.cardBorderClass}`}>
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                            <div className="text-center sm:text-left mb-4 sm:mb-0">
                                <h1 className={`text-3xl font-extrabold ${themeColors.textColorClass}`}>
                                    {t('welcomePatient', { patientName: patientData.name })}
                                </h1>
                                <p className={`text-gray-600 dark:text-gray-400 mt-1 text-lg`}>{t('dashboardOverview')}</p>
                            </div>
                        </div>
                    </section>

                    {/* PCG Metrics & Live Monitoring */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CurrentHealthStatus t={t} themeColors={themeColors} />
                        <LivePCGMonitoring t={t} themeColors={themeColors} />
                    </section>

                    {/* Health Trends Section - Now with PCG data */}
                    <section ref={healthTrendsRef} id="health-trends-section">
                        <HealthTrends t={t} themeColors={themeColors} />
                    </section>

                    {/* Profile Section - Modernized */}
                    <section ref={profileRef} id="profile-section">
                        <Card title={t('profile')} themeColors={themeColors} className="relative overflow-hidden">
                            {/* Profile Header */}
                            <div className="flex flex-col items-center justify-center mb-6 py-4">
                                <div className="relative">
                                    <motion.img
                                        src={patientData.profilePic}
                                        alt={t('/Image/adnanimage.jpg')}
                                        className={`w-32 h-32 rounded-full border-4 border-blue-500 object-cover ${themeColors.shadowClass}`}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                    <span className="absolute bottom-2 right-2 block h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-800"></span>
                                </div>
                                <h3 className={`text-2xl font-bold ${themeColors.textColorClass} mt-4`}>{patientData.name}</h3>
                                <p className={`text-md text-gray-600 dark:text-gray-400`}>ID: {patientData.id}</p>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 dark:text-gray-300">
                                {/* Personal Information */}
                                <div className="space-y-3">
                                    <h4 className={`text-lg font-semibold ${themeColors.textColorClass} mb-2 flex items-center`}>
                                        <UserCircleIcon className="h-5 w-5 mr-2 text-indigo-500" /> {t('patient_info')}
                                    </h4>
                                    <p className="flex items-center"><span className="font-medium w-32">{t('age')}:</span> {patientData.age}</p>
                                    <p className="flex items-center"><span className="font-medium w-32">{t('gender')}:</span> {patientData.gender}</p>
                                    <p className="flex items-center"><span className="font-medium w-32">{t('dob')}:</span> {patientData.dob}</p>
                                    <p className="flex items-center"><span className="font-medium w-32">{t('bloodType')}:</span> {patientData.bloodGroup}</p>
                                    <p className="flex items-center"><span className="font-medium w-32">{t('allergies')}:</span> {patientData.allergies.join(', ')}</p>
                                    <p className="flex items-start"><span className="font-medium w-32">{t('medical_history')}:</span> <span className="flex-1">{patientData.medicalHistory.join('; ')}</span></p>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-3">
                                    <h4 className={`text-lg font-semibold ${themeColors.textColorClass} mb-2 flex items-center`}>
                                        <GlobeAltIcon className="h-5 w-5 mr-2 text-green-500" /> {t('contact_info')}
                                    </h4>
                                    <p className="flex items-center"><PhoneIcon className="h-5 w-5 mr-2 text-gray-500" /><span className="font-medium w-28">{t('phone')}:</span> {patientData.contact.phone}</p>
                                    <p className="flex items-center"><EnvelopeIcon className="h-5 w-5 mr-2 text-gray-500" /><span className="font-medium w-28">{t('email')}:</span> {patientData.contact.email}</p>
                                    <p className="flex items-start"><MapPinIcon className="h-5 w-5 mr-2 text-gray-500" /><span className="font-medium w-28">{t('address')}:</span> <span className="flex-1">{patientData.contact.address}</span></p>

                                    <h4 className={`text-lg font-semibold ${themeColors.textColorClass} mt-4 mb-2 flex items-center`}>
                                        <BellAlertIcon className="h-5 w-5 mr-2 text-red-500" /> {t('emergencyContact')}
                                    </h4>
                                    <p className="flex items-center"><span className="font-medium w-32">{t('name')}:</span> {patientData.emergencyContact.name}</p>
                                    <p className="flex items-center"><span className="font-medium w-32">{t('relationship')}:</span> {patientData.emergencyContact.relationship}</p>
                                    <p className="flex items-center"><PhoneIcon className="h-5 w-5 mr-2 text-gray-500" /><span className="font-medium w-28">{t('phone')}:</span> {patientData.emergencyContact.phone}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate(`/patients/${patientData.id}`)} // Simulate navigation
                                className={`${themeColors.buttonSecondaryClass} mt-6 px-6 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105`}
                            >
                                {t('view_full_profile')}
                            </button>
                        </Card>
                    </section>

                    {/* Health Reports Section - New Section with Search, View, Download */}
                    <section ref={healthReportsRef} id="health-reports-section">
                        <Card title={t('healthReports')} themeColors={themeColors}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder={t('searchReportsPlaceholder')}
                                    className={`p-2 rounded-md w-full ${themeColors.cardBgClass} ${themeColors.textColorClass} border ${themeColors.cardBorderClass} focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            {filteredReports.length > 0 ? (
                                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                                    {t('reportId')}
                                                </th>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                                    {t('date')}
                                                </th>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                                    {t('type')}
                                                </th>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                                    {t('status')}
                                                </th>
                                                <th scope="col" className={`px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                                                    {t('actions')}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {filteredReports.map((report) => (
                                                <tr key={report.id} className={`${themeColors.cardBgClass} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150`}>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${themeColors.textColorClass}`}>
                                                        {report.id}
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                                        {report.date}
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${themeColors.textColorClass}`}>
                                                        {t(report.type.replace(/\s/g, '').toLowerCase())} {/* Translate report type */}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <StatusBadge status={report.status} type="report" />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                        <button
                                                            onClick={() => handleViewReport(report)}
                                                            className={`${themeColors.buttonSecondaryClass} px-3 py-1 rounded-md text-sm inline-flex items-center transition-transform transform hover:scale-105`}
                                                        >
                                                            <DocumentTextIcon className="h-4 w-4 mr-1" /> {t('view')}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDownloadReport(report)}
                                                            className={`${themeColors.buttonPrimaryClass} px-3 py-1 rounded-md text-sm inline-flex items-center transition-transform transform hover:scale-105`}
                                                        >
                                                            <DocumentArrowDownIcon className="h-4 w-4 mr-1" /> {t('download')}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className={`${themeColors.textColorClass} opacity-80 text-center py-8`}>{t('noReportsFound')}</p>
                            )}
                        </Card>
                    </section>

                    {/* Appointments Section */}
                    <section ref={appointmentsRef} id="appointments-section">
                        <Card
                            title={t('appointments')}
                            themeColors={themeColors}
                            headerContent={
                                <button
                                    onClick={() => setIsScheduleModalOpen(true)}
                                    className={`${themeColors.buttonPrimaryClass} px-4 py-2 rounded-md flex items-center`}
                                >
                                    <CalendarDaysIcon className="h-5 w-5 mr-2" /> {t('scheduleNewAppointment')}
                                </button>
                            }
                        >
                            {appointments.length > 0 ? (
                                <ul className="mt-4 space-y-3">
                                    {appointments.map((app) => (
                                        <li key={app.id} className={`p-4 rounded-md ${themeColors.appointmentBgClass} ${themeColors.appointmentBorderClass} flex flex-col sm:flex-row justify-between items-start sm:items-center`}>
                                            <div>
                                                <p className="font-semibold text-lg">{t('appointmentWith', { doctorName: t(app.doctorKey) })}</p>
                                                <p className="text-sm opacity-90">
                                                    {t('date')}: {app.date}, {t('time')}: {app.time}
                                                </p>
                                                <p className="text-sm opacity-80">{t('reason')}: {app.reason}</p>
                                            </div>
                                            <div className="mt-3 sm:mt-0 flex space-x-2">
                                                <StatusBadge status={app.status} type="appointment" />
                                                {app.status === 'Scheduled' && (
                                                    <button
                                                        onClick={() => openCancelModal(app)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                                                    >
                                                        {t('cancel')}
                                                    </button>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className={`${themeColors.textColorClass} opacity-80`}>{t('noUpcomingAppointments')}</p>
                            )}
                        </Card>
                    </section>

                    {/* Medication Section */}
                    <section ref={medicationRef} id="medication-section">
                        <Card title={t('medicationReminders')} themeColors={themeColors}>
                            <p className={`${themeColors.textColorClass} opacity-80 mb-4`}>{t('medication_list')}.</p>
                            {medications.length > 0 ? (
                                <ul className="mt-4 space-y-3">
                                    {medications.map((med) => (
                                        <motion.li
                                            key={med.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            className={`p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center
                                                ${med.taken ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700' : `${themeColors.appointmentBgClass} ${themeColors.appointmentBorderClass}`}
                                            `}
                                        >
                                            <div className="flex items-center flex-grow">
                                                <PencilSquareIcon className={`h-6 w-6 mr-3 ${med.taken ? 'text-emerald-600' : 'text-blue-500'}`} />
                                                <div>
                                                    <p className="font-semibold text-lg">{t('medicationName')}: {med.name} {med.dose}</p>
                                                    <p className="text-sm opacity-90">
                                                        {t('time')}: {t(med.time.toLowerCase())}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-3 sm:mt-0 flex space-x-2 items-center">
                                                <StatusBadge status={med.taken ? 'Taken' : 'Pending'} type="medication" />
                                                {!med.taken && (
                                                    <button
                                                        onClick={() => markMedicationAsTaken(med.id)}
                                                        className={`${themeColors.buttonPrimaryClass} px-3 py-1 rounded-md text-sm inline-flex items-center transition-transform transform hover:scale-105`}
                                                    >
                                                        <CheckCircleIcon className="h-4 w-4 mr-1" /> {t('mark_as_taken')}
                                                    </button>
                                                )}
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            ) : (
                                <p className={`${themeColors.textColorClass} opacity-80`}>{t('noMedicationReminders')}</p>
                            )}
                        </Card>
                    </section>


                    {/* Notifications Section */}
                    <section ref={notificationsRef} id="notifications-section">
                        <Card title={t('recentAlerts')} themeColors={themeColors}>
                            {filteredAlerts.length > 0 ? (
                                <ul className="mt-4 space-y-3">
                                    <AnimatePresence>
                                        {filteredAlerts.map((alert) => (
                                            <motion.li
                                                key={alert.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                className={`p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center
                                                    ${alert.type === 'info' ? themeColors.alertInfoBgClass :
                                                    alert.type === 'warning' ? themeColors.alertWarningBgClass :
                                                    themeColors.alertDangerBgClass}
                                                    ${alert.type === 'info' ? themeColors.alertInfoBorderClass :
                                                    alert.type === 'warning' ? themeColors.alertWarningBorderClass :
                                                    themeColors.alertDangerBorderClass}
                                                `}
                                            >
                                                <div className="flex items-start flex-grow">
                                                    {alert.type === 'info' && <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-300 mr-3 mt-1 sm:mt-0 flex-shrink-0" />}
                                                    {alert.type === 'warning' && <ExclamationTriangleIcon className="h-6 w-6 text-amber-600 dark:text-amber-300 mr-3 mt-1 sm:mt-0 flex-shrink-0" />}
                                                    {alert.type === 'danger' && <MegaphoneIcon className="h-6 w-6 text-rose-600 dark:text-rose-300 mr-3 mt-1 sm:mt-0 flex-shrink-0" />}
                                                    <div>
                                                        <p className="font-semibold text-lg">{t(alert.message)}</p>
                                                        <p className="text-sm opacity-90">{alert.details}</p>
                                                        <p className="text-xs opacity-70 mt-1">{alert.timestamp}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-3 sm:mt-0 flex space-x-2 flex-shrink-0">
                                                    <button
                                                        onClick={() => openAlertDetailsModal(alert)}
                                                        className={`${themeColors.buttonSecondaryClass} px-3 py-1 rounded-md text-sm`}
                                                    >
                                                        {t('viewAlertDetails')}
                                                    </button>
                                                    <button
                                                        onClick={() => dismissAlert(alert.id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                                                    >
                                                        {t('dismiss')}
                                                    </button>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </AnimatePresence>
                                </ul>
                            ) : (
                                <p className={`${themeColors.textColorClass} opacity-80`}>{t('noAlertsMessage')}</p>
                            )}
                            <button className={`${themeColors.buttonSecondaryClass} mt-6 px-4 py-2 rounded-md w-full`}>
                                {t('viewAllAlerts')}
                            </button>
                        </Card>
                    </section>

                    {/* Settings Section (Placeholder) */}
                    <section ref={settingsRef} id="settings-section">
                        <Card title={t('settings')} themeColors={themeColors}>
                            <p className={`${themeColors.textColorClass} opacity-80`}>Manage your dashboard settings.</p>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label htmlFor="theme-select" className="block text-sm font-medium">Theme</label>
                                    <select
                                        id="theme-select"
                                        value={currentTheme}
                                        onChange={toggleTheme}
                                        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${themeColors.cardBgClass} ${themeColors.textColorClass}`}
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="language-select" className="block text-sm font-medium">Language</label>
                                    <select
                                        id="language-select"
                                        value={i18n.language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${themeColors.cardBgClass} ${themeColors.textColorClass}`}
                                    >
                                        <option value="en">English</option>
                                        <option value="ur">اردو</option>
                                    </select>
                                </div>
                            </div>
                        </Card>
                    </section>
                </main>
                <Footer t={t} themeColors={themeColors} />
            </div>

            {/* Schedule Appointment Modal */}
            <Transition appear show={isScheduleModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsScheduleModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
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
                                <Dialog.Panel className={`${themeColors.cardBgClass} ${themeColors.textColorClass} w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all`}>
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                                        {t('scheduleAppointment')}
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <form onSubmit={handleScheduleAppointment} className="space-y-4">
                                            <div>
                                                <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {t('selectDoctor')}
                                                </label>
                                                <select
                                                    id="doctor"
                                                    name="doctor"
                                                    value={newAppointment.doctor}
                                                    onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                                                    className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                    required
                                                >
                                                    <option value="">{t('selectDoctor')}</option>
                                                    {doctorsList.map(doctor => (
                                                        <option key={doctor.id} value={doctor.nameKey}>
                                                            {t(doctor.nameKey)} ({t(doctor.specialtyKey)})
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {t('selectDate')}
                                                </label>
                                                <input
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    value={newAppointment.date}
                                                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                                                    className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                    min={new Date().toISOString().split('T')[0]} // Prevent past dates
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {t('selectTime')}
                                                </label>
                                                <input
                                                    type="time"
                                                    id="time"
                                                    name="time"
                                                    value={newAppointment.time}
                                                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                                                    className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {t('reason')}
                                                </label>
                                                <textarea
                                                    id="reason"
                                                    name="reason"
                                                    rows="3"
                                                    value={newAppointment.reason}
                                                    onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                                                    className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                    required
                                                ></textarea>
                                            </div>
                                            <div className="mt-4 flex justify-end space-x-3">
                                                <button
                                                    type="button"
                                                    className={`${themeColors.buttonSecondaryClass} inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium`}
                                                    onClick={() => setIsScheduleModalOpen(false)}
                                                >
                                                    {t('close')}
                                                </button>
                                                <button
                                                    type="submit"
                                                    className={`${themeColors.buttonPrimaryClass} inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium`}
                                                >
                                                    {t('schedule')}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Cancel Appointment Confirmation Modal */}
            <Transition appear show={isCancelModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsCancelModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
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
                                <Dialog.Panel className={`${themeColors.cardBgClass} ${themeColors.textColorClass} w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all`}>
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                                        {t('cancelAppointmentTitle')}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {appointmentToCancel && t('cancelAppointmentConfirmation', {
                                                doctorName: t(appointmentToCancel.doctorKey), // Use translated doctor name
                                                date: appointmentToCancel.date,
                                                time: appointmentToCancel.time
                                            })}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className={`${themeColors.buttonSecondaryClass} inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium`}
                                            onClick={() => setIsCancelModalOpen(false)}
                                        >
                                            {t('close')}
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-red-600 hover:bg-red-700 text-white inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium"
                                            onClick={confirmCancelAppointment}
                                        >
                                            {t('confirmCancel')}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Alert Details Modal */}
            <Transition appear show={isAlertDetailsModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsAlertDetailsModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
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
                                <Dialog.Panel className={`${themeColors.cardBgClass} ${themeColors.textColorClass} w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all`}>
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 flex items-center">
                                        {selectedAlert?.type === 'info' && <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-300 mr-2" />}
                                        {selectedAlert?.type === 'warning' && <ExclamationTriangleIcon className="h-6 w-6 text-amber-600 dark:text-amber-300 mr-2" />}
                                        {selectedAlert?.type === 'danger' && <MegaphoneIcon className="h-6 w-6 text-rose-600 dark:text-rose-300 mr-2" />}
                                        {t('alertDetails')}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm font-semibold">{t(selectedAlert?.message)}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedAlert?.details}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{selectedAlert?.timestamp}</p>
                                    </div>

                                    <div className="mt-4 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className={`${themeColors.buttonSecondaryClass} inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium`}
                                            onClick={() => setIsAlertDetailsModalOpen(false)}
                                        >
                                            {t('close')}
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-red-600 hover:bg-red-700 text-white inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium"
                                            onClick={() => { dismissAlert(selectedAlert?.id); setIsAlertDetailsModalOpen(false); }}
                                        >
                                            {t('dismiss')}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Report Details Modal */}
            <Transition appear show={isReportDetailsModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsReportDetailsModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
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
                                <Dialog.Panel className={`${themeColors.cardBgClass} ${themeColors.textColorClass} w-full max-w-lg transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all`}>
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                                        {t('reportDetails')} - {t(selectedReport?.type.replace(/\s/g, '').toLowerCase())} ({selectedReport?.id}) {/* Translate report type in modal title */}
                                    </Dialog.Title>
                                    <div className="mt-4 space-y-4">
                                        <p className="text-sm font-semibold flex justify-between"><span>{t('date')}: {selectedReport?.date}</span> <span>{t('status')}: <StatusBadge status={selectedReport?.status} type="report" /></span></p>
                                        
                                        {selectedReport?.pcgMetrics && (
                                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                                <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('pcgMetrics')}</h4>
                                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                    <p><span className="font-medium">{t('s1Amplitude')}:</span> {selectedReport.pcgMetrics.s1Amplitude}</p>
                                                    <p><span className="font-medium">{t('s2Frequency')}:</span> {selectedReport.pcgMetrics.s2Frequency} Hz</p>
                                                    <p><span className="font-medium">{t('murmurPresence')}:</span> {(selectedReport.pcgMetrics.murmurPresence * 100).toFixed(1)}%</p>
                                                    <p><span className="font-medium">{t('pcgScore')}:</span> {selectedReport.pcgMetrics.pcgScore}</p>
                                                    <p className="col-span-2"><span className="font-medium">{t('murmur_type')}:</span> {selectedReport.pcgMetrics.murmurType}</p>
                                                </div>

                                                <h4 className={`text-md font-semibold ${themeColors.textColorClass} mt-4 mb-2`}>{t('pcg_waveform')}</h4>
                                                <PCGWaveform 
                                                    width={400} 
                                                    height={150} 
                                                    strokeColor={themeColors.waveformStroke} 
                                                    fillColor={themeColors.waveformFill} 
                                                />

                                                <h4 className={`text-md font-semibold ${themeColors.textColorClass} mt-4 mb-2`}>{t('doctor_notes')}</h4>
                                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-blue-500 pl-3">
                                                    {selectedReport.doctorNotes || "No specific notes for this report."}
                                                </p>
                                            </div>
                                        )}

                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                            <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>Full Report Content</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                                {selectedReport?.content || t('fullReportContentPlaceholder')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className={`${themeColors.buttonSecondaryClass} inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium`}
                                            onClick={() => setIsReportDetailsModalOpen(false)}
                                        >
                                            {t('close')}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default PatientDashboard;
