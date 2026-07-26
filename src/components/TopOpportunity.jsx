function TopOpportunity() {
  return (
    <article className="panel top-opportunity">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">PRIORITY INSIGHT</span>
          <h2>Top Innovation Opportunity</h2>
        </div>

        <span className="status-badge">High Priority</span>
      </div>

      <div className="opportunity-content">
        <div className="opportunity-details">
          <div className="opportunity-heading-row">
            <div className="opportunity-number">01</div>

            <div>
              <h3>Improve Customer Onboarding Experience</h3>

              <p>
                Analysis of customer feedback indicates repeated friction during
                account setup, identity verification, and initial product
                adoption.
              </p>
            </div>
          </div>

          <div className="opportunity-tags">
            <span>Customer Experience</span>
            <span>Product Strategy</span>
            <span>Operational Improvement</span>
          </div>

          <div className="opportunity-stats">
            <div>
              <span>Independent Mentions</span>
              <strong>427</strong>
            </div>

            <div>
              <span>Thirty-Day Growth</span>
              <strong>38%</strong>
            </div>

            <div>
              <span>Model Confidence</span>
              <strong>96%</strong>
            </div>
          </div>
        </div>

        <div className="innovation-score">
          <span>INNOVATION SCORE</span>
          <strong>94</strong>
          <small>Maximum score: 100</small>

          <div className="score-progress">
            <div className="score-progress-fill"></div>
          </div>

          <p>Strong business relevance and high evidence consistency</p>
        </div>
      </div>
    </article>
  )
}

export default TopOpportunity
