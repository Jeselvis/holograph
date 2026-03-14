/**
 * PropertyPanel Component
 * 
 * A configuration panel that allows users to modify zone settings.
 */

import React from 'react';
import { CHART_LIBRARIES, CHART_TYPES, CHART_TYPE_LIBRARY, DEFAULT_CHART_TYPE, COLOR_THEMES, THEMES } from '../types/schema';
import { getAvailableTables, getTableColumns } from '../services/dataService';

const PropertyPanel = ({ zoneConfig, onUpdate, onClose }) => {
  const { id, library, theme, title, dataSource, chartType } = zoneConfig;
  const availableTables = getAvailableTables();
  const tableColumns = dataSource?.tableName ? getTableColumns(dataSource.tableName) : [];

  // Get available chart types for the current library
  const availableChartTypes = Object.values(CHART_TYPES).filter(
    (type) => CHART_TYPE_LIBRARY[type] === library
  );

  // Get chart type display name
  const getChartTypeName = (type) => {
    const names = {
      [CHART_TYPES.D3_BAR]: 'Bar Chart',
      [CHART_TYPES.D3_LINE]: 'Line Chart',
      [CHART_TYPES.D3_AREA]: 'Area Chart',
      [CHART_TYPES.D3_PIE]: 'Pie Chart',
      [CHART_TYPES.D3_DONUT]: 'Donut Chart',
      [CHART_TYPES.D3_SCATTER]: 'Scatter Chart',
      [CHART_TYPES.CHARTJS_LINE]: 'Line Chart',
      [CHART_TYPES.CHARTJS_BAR]: 'Bar Chart',
      [CHART_TYPES.CHARTJS_PIE]: 'Pie Chart',
      [CHART_TYPES.CHARTJS_DOUGHNUT]: 'Doughnut Chart',
      [CHART_TYPES.CHARTJS_RADAR]: 'Radar Chart',
      [CHART_TYPES.CHARTJS_POLAR]: 'Polar Area Chart',
    };
    return names[type] || type;
  };

  const handleLibraryChange = (e) => {
    const newLibrary = e.target.value;
    const defaultType = DEFAULT_CHART_TYPE[newLibrary];
    onUpdate({
      ...zoneConfig,
      library: newLibrary,
      chartType: defaultType,
    });
  };

  const handleChartTypeChange = (e) => {
    onUpdate({
      ...zoneConfig,
      chartType: e.target.value,
    });
  };

  const handleThemeChange = (e) => {
    onUpdate({
      ...zoneConfig,
      theme: e.target.value,
    });
  };

  const handleTitleChange = (e) => {
    onUpdate({
      ...zoneConfig,
      title: e.target.value,
    });
  };

  const handleTableChange = (e) => {
    onUpdate({
      ...zoneConfig,
      dataSource: {
        ...dataSource,
        tableName: e.target.value,
        labelColumn: '',
        valueColumn: '',
      },
    });
  };

  const handleLabelColumnChange = (e) => {
    onUpdate({
      ...zoneConfig,
      dataSource: {
        ...dataSource,
        labelColumn: e.target.value,
      },
    });
  };

  const handleValueColumnChange = (e) => {
    onUpdate({
      ...zoneConfig,
      dataSource: {
        ...dataSource,
        valueColumn: e.target.value,
      },
    });
  };

  const handleThemeClick = (themeKey) => {
    onUpdate({
      ...zoneConfig,
      theme: themeKey,
    });
  };

  return (
    <div className="property-panel">
      <div className="property-panel-header">
        <h2 className="property-panel-title">Configure Chart</h2>
        <button className="property-panel-close" onClick={onClose}>×</button>
      </div>

      <div className="property-panel-content">
        {/* Chart Title */}
        <div className="property-field-group">
          <label className="property-label">Chart Title</label>
          <input
            type="text"
            className="property-input"
            value={title || ''}
            onChange={handleTitleChange}
            placeholder="Enter chart title"
          />
        </div>

        {/* Library Selection */}
        <div className="property-field-group">
          <label className="property-label">Rendering Library</label>
          <select
            className="property-select"
            value={library}
            onChange={handleLibraryChange}
          >
            <option value={CHART_LIBRARIES.CHARTJS}>
              Chart.js
            </option>
            <option value={CHART_LIBRARIES.D3}>
              D3.js
            </option>
          </select>
        </div>

        {/* Chart Type Selection */}
        <div className="property-field-group">
          <label className="property-label">Chart Type</label>
          <select
            className="property-select"
            value={chartType || DEFAULT_CHART_TYPE[library]}
            onChange={handleChartTypeChange}
          >
            {availableChartTypes.map((type) => (
              <option key={type} value={type}>
                {getChartTypeName(type)}
              </option>
            ))}
          </select>
          <p className="property-help-text">
            {library === CHART_LIBRARIES.CHARTJS
              ? 'Select a chart type from Chart.js library'
              : 'Select a chart type from D3.js library'}
          </p>
        </div>

        {/* Theme Selection */}
        <div className="property-field-group">
          <label className="property-label">Color Theme</label>
          <select
            className="property-select"
            value={theme}
            onChange={handleThemeChange}
          >
            {Object.values(COLOR_THEMES).map((themeKey) => (
              <option key={themeKey} value={themeKey}>
                {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
              </option>
            ))}
          </select>
          <div style={{ marginTop: '12px' }}>
            {Object.values(COLOR_THEMES).map((themeKey) => (
              <div
                key={themeKey}
                className="property-theme-preview"
                onClick={() => handleThemeClick(themeKey)}
              >
                <span 
                  className={`property-theme-color ${theme === themeKey ? 'selected' : ''}`}
                  style={{ backgroundColor: THEMES[themeKey]?.primary || '#3b82f6' }}
                />
                <span className="property-theme-label">{themeKey}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Source Selection */}
        <div className="property-field-group">
          <label className="property-label">Data Source (SQL Table)</label>
          <select
            className="property-select"
            value={dataSource?.tableName || ''}
            onChange={handleTableChange}
          >
            <option value="">Select a table...</option>
            {availableTables.map((table) => (
              <option key={table} value={table}>
                {table}
              </option>
            ))}
          </select>
        </div>

        {/* Label Column */}
        {dataSource?.tableName && (
          <div className="property-field-group">
            <label className="property-label">Label Column</label>
            <select
              className="property-select"
              value={dataSource?.labelColumn || ''}
              onChange={handleLabelColumnChange}
            >
              <option value="">Select column...</option>
              {tableColumns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Value Column */}
        {dataSource?.tableName && (
          <div className="property-field-group">
            <label className="property-label">Value Column</label>
            <select
              className="property-select"
              value={dataSource?.valueColumn || ''}
              onChange={handleValueColumnChange}
            >
              <option value="">Select column...</option>
              {tableColumns.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Zone Info */}
        <div className="property-info">
          <strong>Zone ID:</strong> {id}
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel;
