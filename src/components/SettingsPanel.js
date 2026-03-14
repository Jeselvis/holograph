/**
 * SettingsPanel Component
 * 
 * A panel for overall dashboard setup including:
 * - Data source configuration
 * - Save locations for drafts and publishes
 * - General dashboard settings
 */

import React, { useState } from 'react';

const SettingsPanel = ({ isOpen, onClose, settings, onSave }) => {
  const [localSettings, setLocalSettings] = useState(settings || {
    dataSource: {
      type: 'azure-sql',
      connectionString: '',
      databaseName: '',
    },
    saveLocations: {
      draftsContainer: 'drafts',
      publishedContainer: 'published',
      storageAccount: '',
    },
    general: {
      autoSave: true,
      autoSaveInterval: 30,
    },
  });

  const [activeTab, setActiveTab] = useState('datasource');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const updateSettings = (section, key, value) => {
    setLocalSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  return (
    <div className="property-panel">
      <div className="property-panel-header">
        <h2 className="property-panel-title">Dashboard Settings</h2>
        <button className="property-panel-close" onClick={onClose}>×</button>
      </div>

      {/* Tabs */}
      <div className="settings-tabs">
        <button
          className={`settings-tab ${activeTab === 'datasource' ? 'active' : ''}`}
          onClick={() => setActiveTab('datasource')}
        >
          Data Source
        </button>
        <button
          className={`settings-tab ${activeTab === 'save' ? 'active' : ''}`}
          onClick={() => setActiveTab('save')}
        >
          Save Locations
        </button>
        <button
          className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
      </div>

      {/* Content */}
      <div className="property-panel-content">
        {activeTab === 'datasource' && (
          <>
            <div className="settings-section-title">Azure SQL Configuration</div>
            
            <div className="property-field-group">
              <label className="property-label">Data Source Type</label>
              <select
                className="property-select"
                value={localSettings.dataSource.type}
                onChange={(e) => updateSettings('dataSource', 'type', e.target.value)}
              >
                <option value="azure-sql">Azure SQL Database</option>
                <option value="postgresql">PostgreSQL</option>
                <option value="mysql">MySQL</option>
                <option value="cosmos">Azure Cosmos DB</option>
              </select>
            </div>

            <div className="property-field-group">
              <label className="property-label">Connection String</label>
              <input
                type="password"
                className="property-input"
                value={localSettings.dataSource.connectionString}
                onChange={(e) => updateSettings('dataSource', 'connectionString', e.target.value)}
                placeholder="DefaultEndpoints=..."
              />
              <p className="property-help-text">Leave empty to use environment variable</p>
            </div>

            <div className="property-field-group">
              <label className="property-label">Database Name</label>
              <input
                type="text"
                className="property-input"
                value={localSettings.dataSource.databaseName}
                onChange={(e) => updateSettings('dataSource', 'databaseName', e.target.value)}
                placeholder="Enter database name"
              />
            </div>
          </>
        )}

        {activeTab === 'save' && (
          <>
            <div className="settings-section-title">Azure Blob Storage</div>

            <div className="property-field-group">
              <label className="property-label">Storage Account Name</label>
              <input
                type="text"
                className="property-input"
                value={localSettings.saveLocations.storageAccount}
                onChange={(e) => updateSettings('saveLocations', 'storageAccount', e.target.value)}
                placeholder="mystorageaccount"
              />
            </div>

            <div className="property-field-group">
              <label className="property-label">Drafts Container</label>
              <input
                type="text"
                className="property-input"
                value={localSettings.saveLocations.draftsContainer}
                onChange={(e) => updateSettings('saveLocations', 'draftsContainer', e.target.value)}
                placeholder="drafts"
              />
              <p className="property-help-text">Container for saving draft dashboards</p>
            </div>

            <div className="property-field-group">
              <label className="property-label">Published Container</label>
              <input
                type="text"
                className="property-input"
                value={localSettings.saveLocations.publishedContainer}
                onChange={(e) => updateSettings('saveLocations', 'publishedContainer', e.target.value)}
                placeholder="published"
              />
              <p className="property-help-text">Container for publishing live dashboards</p>
            </div>
          </>
        )}

        {activeTab === 'general' && (
          <>
            <div className="settings-section-title">General Settings</div>

            <div className="property-field-group">
              <div className="settings-toggle">
                <input
                  type="checkbox"
                  id="autoSave"
                  className="settings-toggle-input"
                  checked={localSettings.general.autoSave}
                  onChange={(e) => updateSettings('general', 'autoSave', e.target.checked)}
                />
                <label htmlFor="autoSave" className="settings-toggle-label">
                  Enable auto-save
                </label>
              </div>
              <p className="property-help-text" style={{ marginLeft: '28px' }}>
                Automatically save changes while editing
              </p>
            </div>

            {localSettings.general.autoSave && (
              <div className="property-field-group">
                <label className="property-label">Auto-save Interval (seconds)</label>
                <input
                  type="number"
                  className="property-input"
                  min="10"
                  max="300"
                  value={localSettings.general.autoSaveInterval}
                  onChange={(e) => updateSettings('general', 'autoSaveInterval', parseInt(e.target.value))}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
