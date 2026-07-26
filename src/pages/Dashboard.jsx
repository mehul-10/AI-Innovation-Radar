import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import DashboardCards from '../components/DashboardCards'
import TopOpportunity from '../components/TopOpportunity'
import TrendChart from '../components/TrendChart'
import RecommendationPanel from '../components/RecommendationPanel'
import UploadPanel from '../components/UploadPanel'

function Dashboard() {
  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main className="dashboard-main">
          <section className="dashboard-header">
            <div>
              <p className="welcome-text">ENTERPRISE OVERVIEW</p>
              <h2>Intelligence Dashboard</h2>

              <span>
                Monitor emerging opportunities, trends, and risks across
                organizational data.
              </span>
            </div>

            <div className="last-updated">
              <span className="status-indicator"></span>
              Last updated just now
            </div>
          </section>

          <DashboardCards />

          <TopOpportunity />

          <section className="dashboard-grid">
            <TrendChart />
            <RecommendationPanel />
          </section>

          <UploadPanel />

          <footer className="dashboard-footer">
            <span>AI Innovation Radar</span>
            <span>Enterprise Intelligence Platform</span>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default Dashboard