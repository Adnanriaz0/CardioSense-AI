// --- themes.js ---
// Defines light and dark themes with specific Tailwind CSS classes for styling.
export const themes = {
    light: {
        name: 'Light',
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
        alertInfoBgClass: 'bg-blue-50',
        alertInfoBorderClass: 'border-blue-100',
        alertWarningBgClass: 'bg-amber-50',
        alertWarningBorderClass: 'border-amber-200',
        alertDangerBgClass: 'bg-rose-50',
        alertDangerBorderClass: 'border-rose-200',
        buttonPrimaryClass: 'bg-blue-600 hover:bg-blue-700 text-white',
        buttonSecondaryClass: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
        iconColorClass: 'text-gray-600',
        chartGridColor: 'rgba(209, 213, 219, 0.2)',
        chartTextColor: 'rgb(75, 85, 99)',
        primaryRgb: '59, 130, 246',
        secondaryRgb: '99, 102, 241',
        progressBgClass: 'bg-gray-200',
        progressFillClass: 'bg-blue-500',
        waveformStroke: '#3B82F6',
        waveformFill: 'rgba(59, 130, 246, 0.1)',
        activeNavLink: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
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
        alertInfoBgClass: 'bg-blue-900/30',
        alertInfoBorderClass: 'border-blue-800',
        alertWarningBgClass: 'bg-amber-900/30',
        alertWarningBorderClass: 'border-amber-800',
        alertDangerBgClass: 'bg-rose-900/30',
        alertDangerBorderClass: 'border-rose-800',
        buttonPrimaryClass: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        buttonSecondaryClass: 'bg-gray-600 hover:bg-gray-500 text-gray-100',
        iconColorClass: 'text-gray-300',
        chartGridColor: 'rgba(75, 85, 99, 0.3)',
        chartTextColor: 'rgb(209, 213, 219)',
        primaryRgb: '156, 163, 175',
        secondaryRgb: '156, 163, 175',
        progressBgClass: 'bg-gray-700',
        progressFillClass: 'bg-gray-400',
        waveformStroke: '#60A5FA',
        waveformFill: 'rgba(96, 165, 250, 0.15)',
        activeNavLink: 'bg-indigo-900/50 text-indigo-300'
    },
};
