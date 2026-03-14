/**
 * ChartPalette Component
 * 
 * A panel showing available chart types with icons for drag-and-drop
 * to add new charts to the dashboard.
 */

import React from 'react';
import { CHART_LIBRARIES, CHART_TYPES, DEFAULT_CHART_TYPE } from '../types/schema';

const CHART_OPTIONS = [
  // Chart.js charts
  {
    id: 'chartjs-line',
    library: CHART_LIBRARIES.CHARTJS,
    chartType: CHART_TYPES.CHARTJS_LINE,
    title: 'Line Chart',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    description: 'Trend visualization',
  },
  {
    id: 'chartjs-bar',
    library: CHART_LIBRARIES.CHARTJS,
    chartType: CHART_TYPES.CHARTJS_BAR,
    title: 'Bar Chart',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="12" width="4" height="9" rx="1" />
        <rect x="10" y="6" width="4" height="15" rx="1" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    ),
    description: 'Comparison visualization',
  },
  {
    id: 'chartjs-pie',
    library: CHART_LIBRARIES.CHARTJS,
    chartType: CHART_TYPES.CHARTJS_PIE,
    title: 'Pie Chart',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2 L12 12 L20 8" />
      </svg>
    ),
    description: 'Part-to-whole',
  },
  {
    id: 'chartjs-doughnut',
    library: CHART_LIBRARIES.CHARTJS,
    chartType: CHART_TYPES.CHARTJS_DOUGHNUT,
    title: 'Doughnut Chart',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    description: 'Donut visualization',
  },
  {
    id: 'chartjs-radar',
    library: CHART_LIBRARIES.CHARTJS,
    chartType: CHART_TYPES.CHARTJS_RADAR,
    title: 'Radar Chart',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
        <polygon points="12 6 17 9 17 15 12 18 7 15 7 9" />
      </svg>
    ),
    description: 'Multi-variable comparison',
  },
  {
    id: 'chartjs-polar',
    library: CHART_LIBRARIES.CHARTJS,
    chartType: CHART_TYPES.CHARTJS_POLAR,
    title: 'Polar Area',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2 L12 12 L18 6" />
        <path d="M12 12 L6 18" />
      </svg>
    ),
    description: 'Circular comparison',
  },
  // D3.js charts
  {
    id: 'd3-bar',
    library: CHART_LIBRARIES.D3,
    chartType: CHART_TYPES.D3_BAR,
    title: 'D3 Bar',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="12" width="4" height="9" rx="1" />
        <rect x="10" y="6" width="4" height="15" rx="1" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    ),
    description: 'Animated bar chart',
  },
  {
    id: 'd3-line',
    library: CHART_LIBRARIES.D3,
    chartType: CHART_TYPES.D3_LINE,
    title: 'D3 Line',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    description: 'Animated line chart',
  },
  {
    id: 'd3-area',
    library: CHART_LIBRARIES.D3,
    chartType: CHART_TYPES.D3_AREA,
    title: 'D3 Area',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 20 L6 12 L10 16 L14 8 L18 14 L22 6 L22 20 Z" />
      </svg>
    ),
    description: 'Filled area chart',
  },
  {
    id: 'd3-pie',
    library: CHART_LIBRARIES.D3,
    chartType: CHART_TYPES.D3_PIE,
    title: 'D3 Pie',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2 L12 12 L20 8" />
      </svg>
    ),
    description: 'D3 pie visualization',
  },
  {
    id: 'd3-donut',
    library: CHART_LIBRARIES.D3,
    chartType: CHART_TYPES.D3_DONUT,
    title: 'D3 Donut',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    description: 'D3 donut chart',
  },
  {
    id: 'd3-scatter',
    library: CHART_LIBRARIES.D3,
    chartType: CHART_TYPES.D3_SCATTER,
    title: 'D3 Scatter',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="18" r="2" />
        <circle cx="10" cy="10" r="2" />
        <circle cx="16" cy="14" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="8" cy="14" r="2" />
      </svg>
    ),
    description: 'Scatter point chart',
  },
];

const ChartPalette = ({ onDragStart }) => {
  const handleDragStart = (e, chartOption) => {
    e.dataTransfer.setData('chartType', JSON.stringify(chartOption));
    e.dataTransfer.effectAllowed = 'copy';
    if (onDragStart) {
      onDragStart(chartOption);
    }
  };

  const handleDragEnd = () => {
    if (onDragStart) {
      onDragStart(null);
    }
  };

  return (
    <div className="chart-palette">
      <div className="chart-palette-title">Add Chart</div>
      
      {CHART_OPTIONS.map((chartOption) => (
        <div
          key={chartOption.id}
          className="chart-palette-item"
          draggable
          onDragStart={(e) => handleDragStart(e, chartOption)}
          onDragEnd={handleDragEnd}
          title={`${chartOption.title}: ${chartOption.description}`}
        >
          <div className="chart-palette-item-icon">
            {chartOption.icon}
          </div>
          <span className="chart-palette-item-label">
            {chartOption.title}
          </span>
        </div>
      ))}

      <div className="chart-palette-footer">
        <div>📊</div>
        Drag to add
      </div>
    </div>
  );
};

export default ChartPalette;
