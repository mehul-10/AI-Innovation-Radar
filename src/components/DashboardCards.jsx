const dashboardCards = [
  {
    title: 'Connected Sources',
    value: '06',
    description: '2 sources added this month',
    change: '+12%',
    code: 'DS',
  },
  {
    title: 'Insights Generated',
    value: '157',
    description: '23 generated today',
    change: '+18%',
    code: 'AI',
  },
  {
    title: 'Active Opportunities',
    value: '24',
    description: '5 marked as high priority',
    change: '+09%',
    code: 'OP',
  },
  {
    title: 'Emerging Risks',
    value: '08',
    description: '2 require immediate review',
    change: '+03%',
    code: 'RS',
  },
]

function DashboardCards() {
  return (
    <section className="dashboard-cards">
      {dashboardCards.map((card) => (
        <article className="metric-card" key={card.title}>
          <div className="metric-card-header">
            <div className="metric-code">{card.code}</div>
            <span className="metric-change">{card.change}</span>
          </div>

          <p className="metric-title">{card.title}</p>
          <strong className="metric-value">{card.value}</strong>
          <p className="metric-description">{card.description}</p>
        </article>
      ))}
    </section>
  )
}

export default DashboardCards