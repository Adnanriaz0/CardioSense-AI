// PCGUploadAndAnalysis.jsx
import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Card from './Card'; // Card component ko import kiya gaya
import StatusBadge from './StatusBadge'; // StatusBadge component ko import kiya gaya
import PCGWaveform from './PCGWaveform'; // PCGWaveform component ko import kiya gaya

/**
 * PCGUploadAndAnalysis Component: Allows doctors to upload heart sound files for simulated CNN analysis.
 * Displays analysis results and allows saving them as a new patient report.
 * @param {object} props - Component props.
 * @param {object} props.themeColors - Theme-specific colors.
 * @param {function} props.onNewPcgReport - Callback to add a new PCG report.
 * @param {function} props.onUpdateLivePcgData - Callback to update live PCG data.
 * @param {Array<object>} props.patients - List of patients for ID validation.
 */
const PCGUploadAndAnalysis = ({ themeColors, onNewPcgReport, onUpdateLivePcgData, patients }) => {
    const { t } = useTranslation();
    const [selectedFile, setSelectedFile] = useState(null);
    const [patientId, setPatientId] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    // Handles file selection from the input
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'audio/wav' || file.type === 'audio/mpeg')) { // Check for .wav or .mp3
            setSelectedFile(file);
            setAnalysisResult(null); // Clear previous results
        } else {
            setSelectedFile(null);
            toast.error("Please select a valid .wav or .mp3 audio file.");
        }
    };

    // Simulates CNN model analysis
    const simulateCNNAnalysis = useCallback(async (file, patientId) => {
        setIsAnalyzing(true);
        setAnalysisResult(null);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Simulate CNN model output
        const classifications = ['Normal', 'Murmur', 'Extrasystole', 'Valve Disorder', 'Extra Sounds'];
        const randomClassification = classifications[Math.floor(Math.random() * classifications.length)];
        const randomHeartRate = Math.floor(Math.random() * (90 - 60 + 1)) + 60;
        const randomMurmurPresence = parseFloat((Math.random() * 0.8).toFixed(2)); // Higher chance of murmur for simulation
        const randomPcgScore = Math.floor(Math.random() * (99 - 40 + 1)) + 40;
        const randomS1Amplitude = Math.floor(Math.random() * (90 - 50 + 1)) + 50;
        const randomS2Frequency = Math.floor(Math.random() * (130 - 90 + 1)) + 90;
        const randomMurmurType = randomClassification === 'Murmur' ? ['Systolic', 'Diastolic', 'Continuous'][Math.floor(Math.random() * 3)] : 'None';
        const randomS3Presence = Math.random() > 0.7; // 30% chance
        const randomS4Presence = Math.random() > 0.8; // 20% chance

        const simulatedReport = {
            id: `rep${Date.now()}`,
            patientId: patientId,
            patientName: patients.find(p => p.id === patientId)?.name || 'Unknown Patient',
            date: new Date().toISOString().split('T')[0],
            type: 'PCG Analysis', // Default type for uploaded reports
            status: 'Completed', // Automatically completed after analysis
            classification: randomClassification,
            fileUrl: URL.createObjectURL(file), // Use blob URL for uploaded file
            content: `Simulated PCG analysis for patient ${patientId}. Classification: ${randomClassification}. Heart rate: ${randomHeartRate} bpm. Murmur presence: ${randomMurmurPresence * 100}%.`,
            pcgMetrics: {
                s1Amplitude: randomS1Amplitude,
                s2Frequency: randomS2Frequency,
                murmurPresence: randomMurmurPresence,
                pcgScore: randomPcgScore,
                murmurType: randomMurmurType,
                s3Presence: randomS3Presence,
                s4Presence: randomS4Presence,
                heartRate: randomHeartRate,
            },
            doctorNotes: `Automated analysis suggests ${randomClassification.toLowerCase()} heart sounds. Further clinical correlation recommended.`,
            audioFile: URL.createObjectURL(file), // Use blob URL for uploaded file
            imageFile: `https://placehold.co/400x200/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=Simulated+Waveform`, // Placeholder image
        };

        setIsAnalyzing(false);
        setAnalysisResult(simulatedReport);
        toast.success(t('analysisComplete'));

        // Add the new report to the main reports list
        onNewPcgReport(simulatedReport);

        // Update live PCG data with the new analysis result
        onUpdateLivePcgData({
            heartRate: simulatedReport.pcgMetrics.heartRate,
            classification: simulatedReport.classification,
            timestamp: new Date(),
            murmurPresence: simulatedReport.pcgMetrics.murmurPresence,
            s3Presence: simulatedReport.pcgMetrics.s3Presence, // Update S3 presence
            s4Presence: simulatedReport.pcgMetrics.s4Presence, // Update S4 presence
        });

    }, [t, onNewPcgReport, onUpdateLivePcgData, patients]);

    // Handles the "Analyze" button click
    const handleAnalyzeClick = () => {
        if (!selectedFile) {
            toast.error(t('noFileSelected'));
            return;
        }
        if (!patientId) {
            toast.error(t('enterPatientIdForAnalysis'));
            return;
        }
        const patientExists = patients.some(p => p.id === patientId);
        if (!patientExists) {
            toast.error(t('patientNotFound', { patientId }));
            return;
        }
        simulateCNNAnalysis(selectedFile, patientId);
    };

    return (
        <Card title={t('uploadHeartSound')} themeColors={themeColors} className="col-span-full">
            <div className="space-y-4">
                {/* Patient ID Input */}
                <div>
                    <label htmlFor="patientIdForAnalysis" className={`block text-sm font-medium ${themeColors.textColorClass}`}>
                        {t('patientIdForAnalysis')}
                    </label>
                    <input
                        type="text"
                        id="patientIdForAnalysis"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        placeholder={t('enterPatientIdForAnalysis')}
                        className={`mt-1 block w-full rounded-md border-gray-300 ${themeColors.cardBgClass} ${themeColors.textColorClass} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm`}
                    />
                </div>

                {/* File Input */}
                <div>
                    <label htmlFor="heartSoundFile" className={`block text-sm font-medium ${themeColors.textColorClass}`}>
                        {t('selectFile')}
                    </label>
                    <div className="mt-1 flex items-center space-x-3">
                        <input
                            type="file"
                            id="heartSoundFile"
                            accept=".wav,.mp3"
                            onChange={handleFileChange}
                            className={`block w-full text-sm ${themeColors.textColorClass}
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100 cursor-pointer`}
                        />
                        {selectedFile && (
                            <span className={`text-sm text-gray-500 dark:text-gray-400`}>
                                {selectedFile.name}
                            </span>
                        )}
                        {!selectedFile && (
                            <span className={`text-sm text-gray-500 dark:text-gray-400`}>
                                {t('noFileSelected')}
                            </span>
                        )}
                    </div>
                </div>

                {/* Analyze Button */}
                <button
                    onClick={handleAnalyzeClick}
                    disabled={!selectedFile || isAnalyzing || !patientId}
                    className={`${themeColors.buttonPrimaryClass} px-6 py-2 rounded-md flex items-center justify-center transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isAnalyzing ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('analyzing')}
                        </>
                    ) : (
                        <>
                            <i className="fas fa-wave-square mr-2"></i> {t('analyze')}
                        </>
                    )}
                </button>

                {/* Analysis Result Display */}
                {analysisResult && (
                    <div className={`mt-6 p-6 rounded-lg ${themeColors.reportBgClass} ${themeColors.reportBorderClass}`}>
                        <h3 className={`text-lg font-semibold ${themeColors.textColorClass} mb-3 flex items-center`}>
                            <CheckCircleIcon className="h-6 w-6 text-emerald-500 mr-2" /> {t('analysisReport')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <p><strong className={themeColors.textColorClass}>{t('patientID')}:</strong> {analysisResult.patientId}</p>
                            <p><strong className={themeColors.textColorClass}>{t('patientName')}:</strong> {analysisResult.patientName}</p>
                            <p><strong className={themeColors.textColorClass}>{t('date')}:</strong> {analysisResult.date}</p>
                            <p><strong className={themeColors.textColorClass}>{t('type')}:</strong> {t(analysisResult.type.replace(/\s/g, '').toLowerCase())}</p>
                            <p><strong className={themeColors.textColorClass}>{t('modelClassification')}:</strong> <StatusBadge status={analysisResult.classification} type="pcgClassification" /></p>
                            <p><strong className={themeColors.textColorClass}>{t('heartRate')}:</strong> {analysisResult.pcgMetrics.heartRate} bpm</p>
                            <p><strong className={themeColors.textColorClass}>{t('murmurPresence')}:</strong> {(analysisResult.pcgMetrics.murmurPresence * 100).toFixed(1)}%</p>
                            <p><strong className={themeColors.textColorClass}>{t('murmurtype')}:</strong> {analysisResult.pcgMetrics.murmurType}</p>
                            <p><strong className={themeColors.textColorClass}>{t('s1Amplitude')}:</strong> {analysisResult.pcgMetrics.s1Amplitude}</p>
                            <p><strong className={themeColors.textColorClass}>{t('s2Frequency')}:</strong> {analysisResult.pcgMetrics.s2Frequency} Hz</p>
                            <p><strong className={themeColors.textColorClass}>{t('pcgScore')}:</strong> {analysisResult.pcgMetrics.pcgScore}</p>
                            <p><strong className={themeColors.textColorClass}>{t('s3presence')}:</strong> {analysisResult.pcgMetrics.s3Presence ? 'Yes' : 'No'}</p>
                            <p><strong className={themeColors.textColorClass}>{t('s4presence')}:</strong> {analysisResult.pcgMetrics.s4Presence ? 'Yes' : 'No'}</p>
                        </div>
                        <h4 className={`text-md font-semibold ${themeColors.textColorClass} mt-4 mb-2`}>{t('doctor_notes')}</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-blue-500 pl-3">
                            {analysisResult.doctorNotes || "No specific notes for this report."}
                        </p>
                        {analysisResult.audioFile && (
                            <div className="mt-4">
                                <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('pcgAudio')}</h4>
                                <audio controls src={analysisResult.audioFile} className="w-full">
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        )}
                        {analysisResult.imageFile && (
                            <div className="mt-4">
                                <h4 className={`text-md font-semibold ${themeColors.textColorClass} mb-2`}>{t('pcgImage')}</h4>
                                <img src={analysisResult.imageFile} alt="Simulated PCG Waveform" className="w-full h-auto rounded-lg" onError={(e) => e.target.src = "https://placehold.co/400x200/CCCCCC/000000?text=Image+Not+Available"}/>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default PCGUploadAndAnalysis;
