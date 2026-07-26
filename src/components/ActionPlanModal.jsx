import "./ActionPlanModal.css";

function ActionPlanModal({
  open,
  onClose,
  analysis,
  aiSummary,
}) {
  if (!open) return null;

  return (
    <div className="ap-overlay">

      <div className="ap-modal">

        <div className="ap-header">
          <h2>AI Action Plan</h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="ap-section">

          <h3>🚨 Immediate Actions:</h3>

          <ul>
            {(analysis?.recommendations || []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

        <div className="ap-section">

          <h3>📅 Short-Term Actions:</h3>

          <ul>
            {(aiSummary?.actions || []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

        <div className="ap-section">

          <h3>⚠ Risks:</h3>

          <ul>
            {(aiSummary?.risks || []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

        <div className="ap-section">

          <h3>🚀 Opportunities:</h3>

          <ul>
            {(aiSummary?.opportunities || []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

      </div>

    </div>
  );
}

export default ActionPlanModal;