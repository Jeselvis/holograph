/**
 * FilterBar Component
 * 
 * A component that provides a UI for manually configuring and applying
 * filters to the dashboard. This allows users to interactively filter
 * data across all charts.
 * 
 * Flow: Select Table -> Select Column -> Select Values
 */

import React, { useState, useEffect } from 'react';
import { useFilters } from '../hooks/useFilters';
import { 
  getCachedTables, 
  getCachedColumns, 
  getUniqueValuesForColumn,
  initializeDataService 
} from '../services/dataService';

const FilterBar = ({ visible = true }) => {
  const { 
    filters, 
    setFilter, 
    clearFilter, 
    clearAllFilters,
    hasActiveFilters 
  } = useFilters();

  const [isInitialized, setIsInitialized] = useState(false);
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [availableColumns, setAvailableColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const [availableValues, setAvailableValues] = useState([]);

  // Initialize data service on mount
  useEffect(() => {
    const init = async () => {
      await initializeDataService();
      setAvailableTables(getCachedTables());
      setIsInitialized(true);
    };
    init();
  }, []);

  // Get columns when table is selected
  useEffect(() => {
    if (!selectedTable) {
      setAvailableColumns([]);
      setSelectedColumn('');
      return;
    }

    const columns = getCachedColumns(selectedTable);
    setAvailableColumns(columns);
    setSelectedColumn('');
    setAvailableValues([]);
    setSelectedValues([]);
  }, [selectedTable]);

  // Get available values when column is selected
  useEffect(() => {
    if (!selectedColumn) {
      setAvailableValues([]);
      setSelectedValues([]);
      return;
    }

    const values = getUniqueValuesForColumn(selectedColumn);
    setAvailableValues(values);
    setSelectedValues(filters[selectedColumn] || []);
  }, [selectedColumn]);

  // Update selected values when filters change externally
  useEffect(() => {
    if (selectedColumn && filters[selectedColumn]) {
      setSelectedValues(filters[selectedColumn]);
    }
  }, [filters, selectedColumn]);

  const handleTableChange = (e) => {
    setSelectedTable(e.target.value);
  };

  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
  };

  const handleValueToggle = (value) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    
    setSelectedValues(newValues);
    
    if (newValues.length > 0) {
      setFilter(selectedColumn, newValues);
    } else {
      clearFilter(selectedColumn);
    }
  };

  const handleSelectAll = () => {
    setFilter(selectedColumn, availableValues);
  };

  const handleClearColumn = () => {
    clearFilter(selectedColumn);
    setSelectedValues([]);
  };

  const handleClearAll = () => {
    setSelectedTable('');
    setSelectedColumn('');
    setSelectedValues([]);
    setAvailableValues([]);
    clearAllFilters();
  };

  if (!visible || !isInitialized) {
    return null;
  }

  return (
    <div className="filter-bar">
      <div className="filter-bar-header">
        <span className="filter-bar-title">Filters</span>
        {hasActiveFilters() && (
          <button 
            className="filter-bar-clear-all"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="filter-bar-content">
        {/* Table Selection */}
        <div className="filter-bar-row">
          <label className="filter-bar-label">Table:</label>
          <select 
            className="filter-bar-select"
            value={selectedTable}
            onChange={handleTableChange}
          >
            <option value="">Select a table...</option>
            {availableTables.map((table) => (
              <option key={table} value={table}>{table}</option>
            ))}
          </select>
        </div>
        
        {/* Column Selection (shown when table is selected) */}
        {selectedTable && availableColumns.length > 0 && (
          <div className="filter-bar-row">
            <label className="filter-bar-label">Column:</label>
            <select 
              className="filter-bar-select"
              value={selectedColumn}
              onChange={handleColumnChange}
            >
              <option value="">Select a column...</option>
              {availableColumns.map((col) => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>
        )}
        
        {/* Values Selection (shown when column is selected) */}
        {selectedColumn && (
          <>
            <div className="filter-bar-row filter-bar-actions">
              <button 
                className="filter-bar-btn"
                onClick={handleSelectAll}
              >
                Select All
              </button>
              <button 
                className="filter-bar-btn filter-bar-btn-secondary"
                onClick={handleClearColumn}
              >
                Clear
              </button>
            </div>
            
            <div className="filter-bar-values">
              <label className="filter-bar-label">Values:</label>
              <div className="filter-bar-values-list">
                {availableValues.length === 0 ? (
                  <span className="filter-bar-empty">No values available</span>
                ) : (
                  availableValues.map((value) => (
                    <label key={value} className="filter-bar-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedValues.includes(value)}
                        onChange={() => handleValueToggle(value)}
                      />
                      <span>{String(value)}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          </>
        )}
        
        {/* Active Filters Display */}
        {hasActiveFilters() && (
          <div className="filter-bar-active">
            <span className="filter-bar-label">Active:</span>
            <div className="filter-bar-tags">
              {Object.entries(filters).map(([column, values]) => (
                <span key={column} className="filter-bar-tag">
                  {column}: {values.join(', ')}
                  <button
                    className="filter-bar-tag-remove"
                    onClick={() => clearFilter(column)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
