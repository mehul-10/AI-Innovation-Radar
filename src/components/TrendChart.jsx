const trends = [
  { name: 'Onboarding', value: 88, growth: '+38%' },
  { name: 'Payments', value: 64, growth: '+21%' },
  { name: 'Mobile App', value: 49, growth: '+17%' },
  { name: 'Search', value: 36, growth: '+12%' },
]

function TrendChart() {
  return (
    <article className="panel trend-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">LAST 30 DAYS</span>
          <h2>Emerging Customer Trends</h2>
        </div>

        <button className="text-button" type="button">
          View all
        </button>
      </div>

      <div className="trend-list">
        {trends.map((trend) => (
          <div className="trend-item" key={trend.name}>
            <div className="trend-label">
              <span>{trend.name}</span>
              <strong>{trend.growth}</strong>
            </div>

            <div className="trend-track">
              <div
                className="trend-fill"
                style={{ width: `${trend.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export default TrendChart
