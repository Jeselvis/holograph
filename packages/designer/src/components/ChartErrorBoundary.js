import React from 'react';

class ChartErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidUpdate(prevProps) {
    // Clear error when the zone config changes so a corrected config gets a fresh render
    if (prevProps.zoneId !== this.props.zoneId || prevProps.tableName !== this.props.tableName) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '100%', padding: '16px', color: '#dc2626',
          fontSize: '13px', textAlign: 'center', backgroundColor: '#fef2f2',
          borderRadius: '6px', border: '1px solid #fecaca',
        }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>Chart error</div>
            <div style={{ color: '#6b7280', fontSize: '12px' }}>{this.state.error.message}</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ChartErrorBoundary;
