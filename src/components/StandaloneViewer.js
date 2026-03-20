/**
 * StandaloneViewer Component
 * 
 * A standalone viewer page that displays a dashboard without the designer.
 * Used for GitHub Pages deployment of the viewer.
 */

import React, { useMemo, useState, useEffect, useRef } from 'react';
import GridLayout from 'react-grid-layout';
import UniversalChart from './UniversalChart';
import TableComponent from './TableComponent';
import { COMPONENT_TYPES } from '../types/schema';

// Demo dashboard for standalone viewer
const demoDashboard = {
  name: 'Demo Dashboard',
  description: 'A sample dashboard displayed in the viewer',
  showTitle: true,
  showSubtitle: true,
  layout: {
    cols: 12,
    rowHeight: 30,
    margin: [10, 10]
  },
  zones: [
    {
      id: 'zone-1',
      title: 'Sales Overview',
      showHeader: true,
      gridPosition: { x: 0, y: 0, w: 6, h: 4 },
      componentType: COMPONENT_TYPES.CHART,
      chartType: 'bar',
      chartTitle: 'Monthly Sales',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Sales ($)',
          data: [12000, 19000, 3000, 5000, 2000],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      }
    },
    {
      id: 'zone-2',
      title: 'Revenue Breakdown',
      showHeader: true,
      gridPosition: { x: 6, y: 0, w: 6, h: 4 },
      componentType: COMPONENT_TYPES.CHART,
      chartType: 'doughnut',
      chartTitle: 'Revenue by Region',
      data: {
        labels: ['North', 'South', 'East', 'West'],
        datasets: [{
          data: [300, 50, 100, 150],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      }
    },
    {
      id: 'zone-3',
      title: 'Trend Analysis',
      showHeader: true,
      gridPosition: { x: 0, y: 4, w: 12, h: 4 },
      componentType: COMPONENT_TYPES.CHART,
      chartType: 'line',
      chartTitle: '6-Month Trend',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      }
    }
  ]
};

const StandaloneViewer = () => {
  const [gridWidth, setGridWidth] = useState(1100);
  const contentRef = useRef(null);
  
  // Get dashboard ID from URL query params
  const params = new URLSearchParams(window.location.search);
  const dashboardId = params.get('id');

  // In production, fetch dashboard by ID from your API
  // For now, use demo dashboard
  const dashboard = demoDashboard;

  // Calculate grid dimensions for preview - use responsive width
  useEffect(() => {
    const updateWidth = () => {
      if (contentRef.current) {
        const containerWidth = contentRef.current.offsetWidth;
        const newWidth = Math.max(400, containerWidth - 40);
        setGridWidth(newWidth);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Generate layout for react-grid-layout
  const layout = useMemo(() => {
    if (!dashboard || !dashboard.zones) return [];
    return dashboard.zones.map((zone) => ({
      i: zone.id,
      x: zone.gridPosition.x,
      y: zone.gridPosition.y,
      w: zone.gridPosition.w,
      h: zone.gridPosition.h,
    }));
  }, [dashboard]);

  // Calculate grid dimensions for preview
  const cols = dashboard?.layout?.cols || 12;
  const rowHeight = dashboard?.layout?.rowHeight || 30;
  const margin = dashboard?.layout?.margin || [10, 10];

  return (
    <div className="viewer-page">
      <div className="viewer-header">
        <h1 className="viewer-title">📊 {dashboard.name}</h1>
        {dashboard.description && (
          <p className="viewer-description">{dashboard.description}</p>
        )}
      </div>
      
      <div className="viewer-content" ref={contentRef}>
        {!dashboard.zones || dashboard.zones.length === 0 ? (
          <div className="viewer-empty-state">
            <p>No charts to display</p>
          </div>
        ) : (
          <GridLayout
            className="layout"
            layout={layout}
            cols={cols}
            rowHeight={rowHeight}
            margin={margin}
            width={gridWidth}
            draggable={false}
            isDraggable={false}
            isResizable={false}
            compactType="vertical"
            preventCollision={false}
            useCSSTransforms={true}
            containerPadding={[10, 10]}
          >
            {dashboard.zones.map((zone) => (
              <div key={zone.id} className="viewer-zone-card">
                {(zone.showHeader !== false) && (
                  <div className="viewer-zone-header">
                    <h3 className="viewer-zone-title">{zone.title}</h3>
                  </div>
                )}
                <div className="viewer-zone-chart-container">
                  {zone.componentType === COMPONENT_TYPES.TABLE ? (
                    <TableComponent
                      config={zone}
                      width={null}
                      height={null}
                    />
                  ) : (
                    <UniversalChart
                      config={zone}
                      width={null}
                      height={null}
                    />
                  )}
                </div>
              </div>
            ))}
          </GridLayout>
        )}
      </div>
      
      <div className="viewer-footer">
        <span className="viewer-badge">Viewer Mode</span>
        {dashboardId && <span className="viewer-dashboard-id">Dashboard ID: {dashboardId}</span>}
      </div>
    </div>
  );
};

export default StandaloneViewer;
