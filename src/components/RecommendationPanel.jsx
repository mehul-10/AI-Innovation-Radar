function RecommendationPanel() {
  return (
    <article className="panel recommendation-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">AI RECOMMENDATION</span>
          <h2>Recommended Action</h2>
        </div>

        <span className="recommendation-label">Strategic</span>
      </div>

      <div className="recommendation-message">
        <p>
          Onboarding-related complaints have increased consistently over the
          past 30 days. The strongest signals relate to unclear instructions,
          delayed verification, and limited guidance for new users.
        </p>
      </div>

      <div className="recommended-action">
        <span>PROPOSED NEXT STEP</span>

        <strong>
          Simplify the onboarding workflow and introduce a guided product tour
          for first-time users.
        </strong>
      </div>

      <div className="impact-row">
        <div>
          <span>Expected Impact</span>
          <strong>High</strong>
        </div>

        <div>
          <span>Implementation Effort</span>
          <strong>Medium</strong>
        </div>

        <div>
          <span>Recommended Priority</span>
          <strong>Immediate</strong>
        </div>
      </div>
    </article>
  )
}

export default RecommendationPanel