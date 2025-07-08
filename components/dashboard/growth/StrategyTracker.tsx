'use client';

import React, { useState, useEffect } from 'react';
import getRespense from '@/app/hooks/getIArespense';


const BarChart = ({ metrics }: { metrics: string[] }) => (
    <div className="bg-gray-800 p-4 rounded">[Bar Chart for {metrics.join(', ')}]</div>
);
const PieChart = ({ metrics }: { metrics: string[] }) => (
    <div className="bg-gray-800 p-4 rounded">[Pie Chart for {metrics.join(', ')}]</div>
);
const LineChart = ({ metrics }: { metrics: string[] }) => (
    <div className="bg-gray-800 p-4 rounded">[Line Chart for {metrics.join(', ')}]</div>
);

const StrategyAnalyzer = ({ strategy }: { strategy: string }) => {
    const [loading, setLoading] = useState(true);
    const [requiredMetrics, setRequiredMetrics] = useState<string[]>([]);
    const [chartType, setChartType] = useState<'bar' | 'pie' | 'line' | null>(null);
    const [error, setError] = useState<string | null>(null);

    const analyzeStrategy = async () => {
        setLoading(true);
        setError(null);

        const prompt = `
You are a data analyst.

Given the following business growth strategy, tell me:
1. The key data metrics required to track this strategy.
2. The most appropriate chart type to visualize this data.

Strategy:
"${strategy}"

Respond in the following JSON format:
{
    "requiredData": ["metric1", "metric2", "metric3"],
    "recommendedChart": "bar" // or "pie", "line"
}
        `;

        try {
            const aiResponse = await getRespense(prompt);
            if (!aiResponse) {
                setError('No response from AI.');
                setLoading(false);
                return;
            }

            const parsed = JSON.parse(aiResponse);

            if (parsed?.requiredData && parsed?.recommendedChart) {
                setRequiredMetrics(parsed.requiredData);
                setChartType(parsed.recommendedChart);
            } else {
                setError('AI response format invalid.');
            }
        } catch (err) {
            console.error(err);
            setError('Error processing AI response.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (strategy) analyzeStrategy();
    }, [strategy]);

    if (loading) return <div className="text-white p-4">Analyzing strategy...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;
    if (!chartType) return <div className="text-white p-4">No chart type recommended.</div>;

    return (
        <div className="space-y-6 p-4 text-white">
            <h2 className="text-2xl font-bold mb-4">📊 Strategy Tracker</h2>
            <p className="mb-2">Strategy: {strategy}</p>
            <p className="mb-4">Tracking Metrics: {requiredMetrics.join(', ')}</p>

            {chartType === 'bar' && <BarChart metrics={requiredMetrics} />}
            {chartType === 'pie' && <PieChart metrics={requiredMetrics} />}
            {chartType === 'line' && <LineChart metrics={requiredMetrics} />}
        </div>
    );
};

export default StrategyAnalyzer;
