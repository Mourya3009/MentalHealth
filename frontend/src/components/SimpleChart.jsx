import React from 'react';

const SimpleChart = ({ scores, type = 'line' }) => {
  if (!scores || scores.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-slate-400">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p>No data available</p>
          <p className="text-sm mt-2">Take assessments to see charts</p>
        </div>
      </div>
    );
  }

  const width = 800;
  const height = 400;
  const padding = 60;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  if (type === 'line') {
    // Line chart
    const maxScore = 5;
    const minScore = 0;
    
    const points = scores.map((score, index) => {
      const x = padding + (index / (scores.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((score - minScore) / (maxScore - minScore)) * chartHeight;
      return { x, y };
    });
    
    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

    return (
      <div className="w-full max-w-4xl mx-auto">
        <svg width="100%" height="400" viewBox={`0 0 ${width} ${height}`} className="rounded-lg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor:'#a78bfa', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#f472b6', stopOpacity:1}} />
            </linearGradient>
          </defs>
          
          {/* Background */}
          <rect width={width} height={height} fill="#1e293b" rx="8"/>
          
          {/* Grid lines */}
          {Array.from({length: 6}, (_, i) => {
            const y = padding + (i / 5) * chartHeight;
            return (
              <line key={`grid-y-${i}`} x1={padding} y1={y} x2={width - padding} y2={y} stroke="#475569" strokeWidth="1" opacity="0.3"/>
            );
          })}
          
          {Array.from({length: scores.length}, (_, i) => {
            const x = padding + (i / (scores.length - 1)) * chartWidth;
            return (
              <line key={`grid-x-${i}`} x1={x} y1={padding} x2={x} y2={height - padding} stroke="#475569" strokeWidth="1" opacity="0.3"/>
            );
          })}
          
          {/* Line plot */}
          <path d={pathData} stroke="url(#lineGradient)" strokeWidth="3" fill="none"/>
          
          {/* Data points */}
          {points.map((point, index) => (
            <circle key={`point-${index}`} cx={point.x} cy={point.y} r="6" fill="#a78bfa" stroke="#ffffff" strokeWidth="2"/>
          ))}
          
          {/* Labels */}
          <text x={width/2} y={height - 10} textAnchor="middle" fill="#e2e8f0" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold">Assessment Number</text>
          <text x="15" y={height/2} textAnchor="middle" fill="#e2e8f0" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" transform={`rotate(-90, 15, ${height/2})`}>Mental Health Score</text>
          
          {/* Y-axis labels */}
          {Array.from({length: 6}, (_, i) => {
            const value = maxScore - (i / 5) * (maxScore - minScore);
            const y = padding + (i / 5) * chartHeight;
            return (
              <text key={`y-label-${i}`} x={padding - 10} y={y + 5} textAnchor="end" fill="#94a3b8" fontFamily="Arial, sans-serif" fontSize="12">{value}</text>
            );
          })}
          
          {/* X-axis labels */}
          {scores.map((_, i) => {
            const x = padding + (i / (scores.length - 1)) * chartWidth;
            return (
              <text key={`x-label-${i}`} x={x} y={height - padding + 20} textAnchor="middle" fill="#94a3b8" fontFamily="Arial, sans-serif" fontSize="12">{i + 1}</text>
            );
          })}
          
          {/* Title */}
          <text x={width/2} y="30" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold">Mental Health Trends Over Time</text>
        </svg>
      </div>
    );
  }

  if (type === 'bar') {
    // Bar chart
    const scoreRanges = ['0-1', '1-2', '2-3', '3-4', '4-5'];
    const scoreCounts = [0, 0, 0, 0, 0];
    
    scores.forEach(score => {
      if (0 <= score && score < 1) scoreCounts[0]++;
      else if (1 <= score && score < 2) scoreCounts[1]++;
      else if (2 <= score && score < 3) scoreCounts[2]++;
      else if (3 <= score && score < 4) scoreCounts[3]++;
      else if (4 <= score && score <= 5) scoreCounts[4]++;
    });
    
    const maxCount = Math.max(...scoreCounts);
    const barWidth = chartWidth / scoreRanges.length * 0.8;
    const barSpacing = chartWidth / scoreRanges.length;
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];

    return (
      <div className="w-full max-w-4xl mx-auto">
        <svg width="100%" height="400" viewBox={`0 0 ${width} ${height}`} className="rounded-lg">
          {/* Background */}
          <rect width={width} height={height} fill="#1e293b" rx="8"/>
          
          {/* Grid lines */}
          {Array.from({length: Math.max(maxCount + 1, 6)}, (_, i) => {
            const y = padding + chartHeight - (i / Math.max(maxCount, 5)) * chartHeight;
            return (
              <line key={`grid-y-${i}`} x1={padding} y1={y} x2={width - padding} y2={y} stroke="#475569" strokeWidth="1" opacity="0.3"/>
            );
          })}
          
          {/* Bars */}
          {scoreRanges.map((range, i) => {
            const count = scoreCounts[i];
            const barHeight = maxCount > 0 ? (count / maxCount) * chartHeight : 0;
            const x = padding + i * barSpacing + (barSpacing - barWidth) / 2;
            const y = padding + chartHeight - barHeight;
            
            return (
              <g key={`bar-${i}`}>
                <rect x={x} y={y} width={barWidth} height={barHeight} fill={colors[i]} opacity="0.8"/>
                {count > 0 && (
                  <text x={x + barWidth/2} y={y - 5} textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold">{count}</text>
                )}
              </g>
            );
          })}
          
          {/* Labels */}
          <text x={width/2} y={height - 10} textAnchor="middle" fill="#e2e8f0" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold">Score Range</text>
          <text x="15" y={height/2} textAnchor="middle" fill="#e2e8f0" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" transform={`rotate(-90, 15, ${height/2})`}>Number of Assessments</text>
          
          {/* Y-axis labels */}
          {Array.from({length: Math.max(maxCount + 1, 6)}, (_, i) => {
            const value = Math.round((i / Math.max(maxCount, 5)) * maxCount);
            const y = padding + chartHeight - (i / Math.max(maxCount, 5)) * chartHeight;
            return (
              <text key={`y-label-${i}`} x={padding - 10} y={y + 5} textAnchor="end" fill="#94a3b8" fontFamily="Arial, sans-serif" fontSize="12">{value}</text>
            );
          })}
          
          {/* X-axis labels */}
          {scoreRanges.map((range, i) => {
            const x = padding + i * barSpacing + barSpacing / 2;
            return (
              <text key={`x-label-${i}`} x={x} y={height - padding + 20} textAnchor="middle" fill="#94a3b8" fontFamily="Arial, sans-serif" fontSize="12">{range}</text>
            );
          })}
          
          {/* Title */}
          <text x={width/2} y="30" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold">Mental Health Score Distribution</text>
        </svg>
      </div>
    );
  }

  return null;
};

export default SimpleChart;
