import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { FaHeartbeat, FaBrain } from "react-icons/fa";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LiveDemoSection = ({ sectionRef }) => {
  const [pcgData, setPcgData] = useState(Array(50).fill(0)); // Initialize with 50 zeros
  const [heartRate, setHeartRate] = useState(72);
  const [aiAnalysis, setAiAnalysis] = useState("Monitoring Paused");
  const [isMonitoring, setIsMonitoring] = useState(false);
  const dataIntervalRef = useRef(null);

  const startPcgMonitoring = () => {
    if (isMonitoring) return;
    setIsMonitoring(true);
    let count = 0;
    const initialData = Array(50).fill(0).map(() => Math.random() * 2 - 1); // Start with some initial data
    setPcgData(initialData);
    setAiAnalysis("Analyzing Heart Sounds...");

    dataIntervalRef.current = setInterval(() => {
      setPcgData((prevData) => {
        const newDataPoint = Math.sin(count * 0.2) + Math.random() * 0.5 - 0.25; // Simulates a wavy signal with noise
        const updatedData = [...prevData.slice(1), newDataPoint]; // Shift data left, add new point
        count++;

        // Simulate occasional anomalies
        if (count % 200 === 0) {
          // Every 200 points, introduce an anomaly
          const anomalies = ["Systolic Murmur Detected", "Mild Arrhythmia Identified", "No Abnormalities Detected"];
          const randomIndex = Math.floor(Math.random() * anomalies.length);
          setAiAnalysis(anomalies[randomIndex]);
        } else if (count % 100 === 0) {
          // Reset to normal more often
          setAiAnalysis("Normal Sinus Rhythm");
        }

        // Simulate slight heart rate fluctuation
        setHeartRate(Math.floor(60 + Math.random() * 30));

        return updatedData;
      });
    }, 100); // Update every 100ms for a "live" feel
  };

  const stopPcgMonitoring = () => {
    setIsMonitoring(false);
    if (dataIntervalRef.current) {
      clearInterval(dataIntervalRef.current);
    }
    setPcgData(Array(50).fill(0)); // Reset data
    setAiAnalysis("Monitoring Paused");
    setHeartRate(0); // Reset heart rate
  };

  const simulateAnomaly = () => {
    if (!isMonitoring) {
      setAiAnalysis("Start monitoring to simulate anomaly.");
      return;
    }
    setAiAnalysis("Significant Irregularity Detected!"); // Force an anomaly
    setPcgData((prevData) => {
      // Create a temporary spike/dip in the data
      const lastFew = prevData.slice(-10);
      const anomalyPoints = lastFew.map((val, i) => val + Math.sin(i * Math.PI / 5) * 2);
      return [...prevData.slice(0, prevData.length - 10), ...anomalyPoints];
    });
  };

  const chartData = {
    labels: Array(pcgData.length).fill(""), // No x-axis labels needed for real-time
    datasets: [
      {
        label: "PCG Waveform",
        data: pcgData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        pointRadius: 0, // No points for a continuous line
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: false, // Disable Chart.js animation for smoother real-time updates
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        min: -2,
        max: 2,
        display: false, // Hide y-axis
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <section ref={(el) => (sectionRef.current[1] = el)} className="py-20 bg-gray-100 dark:bg-gray-800 flex justify-center items-center overflow-hidden px-6">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-12 text-center border border-blue-200 dark:border-blue-700 animate-fade-in-up">
        <h2 className="text-4xl font-extrabold mb-8 text-blue-700 dark:text-blue-400">SmartBeat In Action: Live PCG Monitoring & AI Insights</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Witness how SmartBeat captures, processes, and visualizes heart sounds, bringing complex diagnostics to an intuitive platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Live PCG Waveform */}
          <div
            aria-label="Live PCG waveform demonstration"
            className="relative h-72 bg-gradient-to-br from-green-100 to-green-300 dark:from-green-700 dark:to-green-900 rounded-xl flex flex-col items-center justify-center text-green-800 dark:text-green-200 font-mono font-bold select-none text-2xl border-4 border-dashed border-green-600 dark:border-green-500 overflow-hidden group p-4"
          >
            <div className="absolute inset-0 bg-pattern-dots opacity-20 dark:opacity-30"></div>
            <div className="relative z-10 w-full h-full">
              <Line data={chartData} options={chartOptions} />
            </div>
            <span className="absolute top-4 left-4 text-sm text-green-700 dark:text-green-300 opacity-90">
              <FaHeartbeat className="inline-block mr-2" /> Live PCG Stream
            </span>
            <span className="absolute bottom-4 left-4 text-lg text-green-700 dark:text-green-300 font-bold">HR: {heartRate} BPM</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 animate-pulse-light group-hover:animate-none"></div>
          </div>
          {/* Interactive Dashboard / AI Analysis */}
          <div
            aria-label="SmartBeat Dashboard Screenshot"
            className="relative h-72 bg-gradient-to-br from-purple-100 to-purple-300 dark:from-purple-700 dark:to-purple-900 rounded-xl flex flex-col items-center justify-center text-purple-800 dark:text-purple-200 font-mono font-bold select-none text-2xl border-4 border-dashed border-purple-600 dark:border-purple-500 overflow-hidden group p-4"
          >
            <div className="absolute inset-0 bg-pattern-squares opacity-20 dark:opacity-30"></div>
            <FaBrain className="relative z-10 text-6xl mb-4 animate-bounce-slow" />
            <span className="relative z-10 text-purple-900 dark:text-purple-100 font-semibold text-xl md:text-2xl">{aiAnalysis}</span>
            <div className="relative z-10 mt-6 flex gap-4">
              <button
                onClick={startPcgMonitoring}
                className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 text-base font-semibold"
                disabled={isMonitoring}
              >
                {isMonitoring ? "Monitoring..." : "Start Monitoring"}
              </button>
              <button
                onClick={stopPcgMonitoring}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 text-base font-semibold"
                disabled={!isMonitoring}
              >
                Stop Monitoring
              </button>
            </div>
            <button
              onClick={simulateAnomaly}
              className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition-all duration-300 opacity-90 hover:opacity-100"
              disabled={!isMonitoring}
            >
              Simulate Anomaly
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemoSection;