const menuItems = [
  { shortName: 'DB', label: 'Dashboard', active: true },
  { shortName: 'DS', label: 'Data Sources' },
  { shortName: 'OP', label: 'Opportunities' },
  { shortName: 'TR', label: 'Trend Analysis' },
  { shortName: 'RS', label: 'Risk Signals' },
  { shortName: 'RP', label: 'Reports' },
  { shortName: 'ST', label: 'Settings' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-navigation">
          {menuItems.map((item) => (
            <button
              className={`sidebar-item ${item.active ? 'active' : ''}`}
              type="button"
              key={item.label}
            >
              <span className="sidebar-icon">{item.shortName}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-status">
        <span className="status-indicator"></span>

        <div>
          <strong>System Operational</strong>
          <span>Monitoring active sources</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar