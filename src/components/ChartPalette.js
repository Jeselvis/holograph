/**
 * ChartPalette Component
 * 
 * A panel showing available chart types with icons for drag-and-drop
 * to add new charts to the dashboard.
 */

import React from 'react';
import { CHART_LIBRARIES, CHART_TYPES } from '../types/schema';

const CHART_OPTIONS = [
  {
    id: 'line-chart',
    library: CHART_LIBRARIES.CHARTJS,
    chartType: CHART_TYPES[CHART_LIBRARIES.CHARTJS],
    title: 'Line Chart',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    description: 'Trend visualization',
  },
  {
    id: 'bar-chart',
    library: CHART_LIBRARIES.D3,
    chartType: CHART_TYPES[CHART_LIBRARIES.D3],
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
