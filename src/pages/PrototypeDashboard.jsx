import { useState } from 'react'
import { useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
 CartesianGrid,
  Tooltip,
} from "recharts";
import './PrototypeDashboard.css'
import { uploadDataset } from "../api/uploadApi";
import { askAI } from "../api/chatApi";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import ActionPlanModal from "../components/ActionPlanModal";
import { generatePDF } from "../components/pdfReport";

const navigationItems = [
  {
    id: 'overview', 
    label: 'Overview',
    description: 'Executive intelligence',
  },
  {
    id: 'sources',
    label: 'Data Sources',
    description: 'Connected knowledge',
  },
  {
    id: 'opportunities',
    label: 'Opportunities',
    description: 'Prioritised signals',
  },
  {
    id: 'trends',
    label: 'Trend Analysis',
    description: 'Emerging patterns',
  },
  {
    id: 'reports',
    label: 'Reports',
    description: 'Executive summaries',
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Platform controls',
  },
]

const trendData = [
  { label: 'Week 1', value: 38 },
  { label: 'Week 2', value: 46 },
  { label: 'Week 3', value: 43 },
  { label: 'Week 4', value: 57 },
  { label: 'Week 5', value: 64 },
  { label: 'Week 6', value: 72 },
  { label: 'Week 7', value: 88 },
  { label: 'Week 8', value: 96 },
]


function InterfaceIcon({ name }) {
  const iconPaths = {
    overview: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),

    sources: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
      </>
    ),

    opportunities: (
      <>
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M8.5 15.5A7 7 0 1 1 15.5 15.5" />
        <path d="M12 2V1" />
      </>
    ),

    trends: (
      <>
        <path d="M4 18 9 13l4 3 7-9" />
        <path d="M15 7h5v5" />
      </>
    ),

    reports: (
      <>
        <path d="M6 2h9l4 4v16H6z" />
        <path d="M14 2v5h5" />
        <path d="M9 12h7" />
        <path d="M9 16h7" />
      </>
    ),

    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.5 1a8 8 0 0 0-1.7-1L14.3 3h-4.6l-.4 3a8 8 0 0 0-1.7 1L5.1 6 3 9.4 5.1 11a7 7 0 0 0 0 2L3 14.6 5.1 18l2.5-1a8 8 0 0 0 1.7 1l.4 3h4.6l.4-3a8 8 0 0 0 1.7-1l2.5 1 2.1-3.4-2.1-1.6a7 7 0 0 0 .1-1z" />
      </>
    ),

    insights: (
      <>
        <path d="M5 19V9" />
        <path d="M12 19V4" />
        <path d="M19 19v-7" />
      </>
    ),

    risks: (
      <>
        <path d="M12 3 2.8 20h18.4z" />
        <path d="M12 9v5" />
        <path d="M12 17h.01" />
      </>
    ),
  }

  return (
    <svg
      className="pd-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name] || iconPaths.overview}
    </svg>
  )
}

function OverviewPage({
  metricCards,
  openOpportunities,
  healthChartData,
  missingChartData,
  analysis,
  aiSummary,
  executiveMetrics,
  sentiment,
   openActionPlan,
}){
  return (
    <>
      <section className="pd-metric-grid">
        {metricCards.map((metric) => (
          <article className="pd-metric-card" key={metric.label}>
            <div className="pd-metric-top">
              <span className="pd-metric-icon">
                <InterfaceIcon name={metric.icon} />
              </span>

              <span className="pd-positive-change">Live</span>
            </div>

            <span className="pd-metric-label">{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.change}</small>
          </article>
        ))}
      </section>

      <section className="pd-primary-grid">
<article className="pd-panel pd-opportunity-panel">
          <div className="pd-panel-header">
            <div>
              <span className="pd-kicker">PRIORITY INTELLIGENCE</span>
              <h2>{analysis
 ? "Dataset Quality Analysis"
 : "Top Innovation Opportunity"}</h2>
            </div>

            <span className="pd-priority-badge">Critical priority</span>
          </div>

          <div className="pd-opportunity-heading">
            <span className="pd-rank">01</span>

            <div>
  <h3>Dataset Quality</h3>

  <p>
    {analysis
      ? analysis.summary
      : "Upload a dataset to generate insights."}
  </p>

  {analysis ? (
    <ul className="pd-recommendation-list">
      {analysis.recommendations.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  ) : (
    <p>Upload a dataset to receive AI recommendations.</p>
  )}
</div>
          </div>

          <div className="pd-tag-row">
            {analysis &&
analysis?.analysis?.column_names?.slice(0,3).map(col=>(
    <span key={col}>{col}</span>
))}
          </div>

          <div className="pd-evidence-grid">
            <div>
              <span>Independent mentions</span>
              <strong>
{analysis
 ? analysis.analysis.rows
 : 0}
</strong>
            </div>

            <div>
              <span>Thirty-day growth</span>
              <strong>
{analysis
 ? analysis.analysis.columns
 : 0}
</strong>
            </div>

            <div>
              <span>Model confidence</span>
              <strong>
{analysis
 ? `${analysis.analysis.quality_score}%`
 : "--"}
</strong>
            </div>
          </div>

          <button
            className="pd-text-action"
            type="button"
            onClick={openOpportunities}
          >
            Review all opportunities
            <span>→</span>
          </button>
</article>
<article className="pd-panel pd-score-panel">

  <span className="pd-kicker">
    DATA QUALITY
  </span>

  <h2>Innovation Score</h2>

  {!analysis ? (

    <div className="pd-empty-state">
      Upload a dataset
    </div>

  ) : (

 <>
  <div className="pd-gauge-wrapper">

    <svg
      viewBox="0 0 220 130"
      className="pd-gauge"
    >

      <path
        d="M20 110 A90 90 0 0 1 200 110"
        className="pd-gauge-bg"
      />

      <path
        d="M20 110 A90 90 0 0 1 200 110"
        className="pd-gauge-progress"
        style={{
          strokeDasharray: 283,
          strokeDashoffset:
            283 -
            (283 * analysis.analysis.quality_score) / 100,
        }}
      />

      <text
        x="110"
        y="78"
        textAnchor="middle"
        className="pd-gauge-score"
      >
        {analysis.analysis.quality_score}
      </text>

      <text
        x="110"
        y="98"
        textAnchor="middle"
        className="pd-gauge-label"
      >
        Dataset Health
      </text>

    </svg>

  </div>

  <div className="pd-score-info">

    <div>
      <span>Status</span>
      <strong>{analysis.analysis.quality_status}</strong>
    </div>

    <div>
      <span>Rows</span>
      <strong>{analysis.analysis.rows}</strong>
    </div>

    <div>
      <span>Columns</span>
      <strong>{analysis.analysis.columns}</strong>
    </div>

    <div>
      <span>Missing Values</span>
      <strong>{analysis.analysis.total_missing}</strong>
    </div>

  </div>
</>

  )}

</article>
      </section>

      <section className="pd-secondary-grid">
        <article className="pd-panel pd-risk-card">
  <span className="pd-kicker">
    AI RISK ANALYSIS
  </span>

  <h2>Risk Score</h2>

  {!analysis ? (
    <div className="pd-empty-state">
      Upload a dataset
    </div>
  ) : (
    <>
      <div className="pd-risk-score">
        {100 - analysis.analysis.quality_score}
      </div>

      <span className="pd-risk-status">
        {100 - analysis.analysis.quality_score > 60
          ? "High Risk"
          : 100 - analysis.analysis.quality_score > 30
          ? "Medium Risk"
          : "Low Risk"}
      </span>
    </>
  )}
</article>
<article className="pd-panel pd-ai-brief-card">
  <div className="pd-panel-header">
    <div>
      <span className="pd-kicker">AI EXECUTIVE BRIEF</span>
      <h2>Dataset Intelligence</h2>
    </div>
  </div>

  {!aiSummary ? (
    <div className="pd-empty-state">
      Upload a dataset to generate AI insights.
    </div>
  ) : (
    <>
      <div className="pd-ai-brief-metrics">

        <div className="pd-ai-pill">
          <span>Health: </span>
          <strong>{executiveMetrics.health}</strong>
        </div>

        <div className="pd-ai-pill">
          <span>Quality: </span>
          <strong>{executiveMetrics.score}/100</strong>
        </div>

        <div className="pd-ai-pill">
          <span>Confidence: </span>
          <strong>{executiveMetrics.confidence}%</strong>
        </div>

        <div className="pd-ai-pill">
          <span>Ready: </span>
          <strong>{executiveMetrics.ready}</strong>
        </div>

      </div>

      <div className="pd-ai-summary-box">
        <h4>Executive Summary</h4>

        <p>{aiSummary.executive_summary}</p>
      </div>

      <div className="pd-ai-recommendation-box">
        <span>Top Recommendation: </span>

        <strong>
          {aiSummary.actions[0]}
        </strong>
      </div>
    </>
  )}
</article>
<article className="pd-panel pd-trend-card">
  <div className="pd-panel-header">
    <div>
      <span className="pd-kicker">DATA HEALTH</span>
      <h2>Dataset Health Overview</h2>
    </div>
  </div>

  {!analysis ? (
    <div
      style={{
        width: "100%",
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#777",
      }}
    >
      Upload a dataset to view analytics
    </div>
  ) : (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
       <BarChart
  data={healthChartData}
  margin={{
    top: 20,
    right: 20,
    left: 20,
    bottom: 20,
  }}
>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" />
          <YAxis
  domain={[0, "auto"]}
/>
          <Tooltip />
          <Bar dataKey="value" fill="#7c3aed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )}
</article>
<article className="pd-panel">
  <div className="pd-panel-header">
    <div>
      <span className="pd-kicker">DATA QUALITY</span>
      <h2>Missing Values</h2>
    </div>
  </div>

  {!analysis ? (
    <div
      style={{
        height: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#777",
      }}
    >
      Upload a dataset to view missing values
    </div>
  ) : (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={missingChartData}
        layout="vertical"
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis type="number" />

        <YAxis
          type="category"
          dataKey="name"
        />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#ef4444"
          radius={[0, 8, 8, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )}
</article>
{sentiment && (
<article className="pd-panel pd-sentiment-card">

<div className="pd-panel-header">
<div>
<span className="pd-kicker">
CUSTOMER SENTIMENT
</span>

<h2>Review Analysis</h2>
</div>
</div>

{!sentiment.available ? (

<div className="pd-empty-state">
No customer reviews or support tickets detected in this dataset.
</div>

) : (

<>

<div className="pd-sentiment-stats">

<div className="pd-sentiment-box positive">
<div className="pd-sentiment-icon">😊</div>
<h3>{sentiment.positive}</h3>
<span>Positive</span>
</div>

<div className="pd-sentiment-box neutral">
<div className="pd-sentiment-icon">😐</div> 
<h3>{sentiment.neutral}</h3>
<span>Neutral</span>
</div>

<div className="pd-sentiment-box negative">
<div className="pd-sentiment-icon">😠</div>
<h3>{sentiment.negative}</h3>
<span>Negative</span>
</div>

</div>

<div className="pd-overall-sentiment">
Overall Sentiment: 

<strong>{sentiment.overall}</strong>
</div>

<h3>Top Issues</h3>

<div className="pd-tag-row">
{sentiment.top_topics.map((topic,index)=>(
<span key={index}>
{topic}
</span>
))}
</div>

<h3>Recommendations</h3>

<ul className="pd-recommendation-list">
{sentiment.recommendations.map((item,index)=>(
<li key={index}>
{item}
</li>
))}
</ul>

</>

)}

</article>
)}
<article className="pd-panel pd-recommendation-card">
          <div>
            <span className="pd-kicker">AI RECOMMENDATION</span>
            <h2>Recommended Next Action</h2>
          </div>

          <p>
{analysis
  ? analysis.recommendations[0]
  : "Upload a dataset to receive AI recommendations."}
</p>

          <div className="pd-recommendation-details">
            <div>
              <span>Expected impact</span>
              <strong>
{analysis
  ? analysis.analysis.quality_status
  : "--"}
</strong>
            </div>

            <div>
              <span>Estimated effort</span>
              <strong>Medium</strong>
            </div>

            <div>
              <span>Priority</span>
              <strong>
{analysis
  ? `${analysis.analysis.quality_score}/100`
  : "--"}
</strong>
            </div>
          </div>

<button
    className="pd-primary-action"
    onClick={openActionPlan}
>
    Create Action Plan
</button>
</article>

      </section>
    </>
  )
}

function SourcesPage({
  selectedFile,
  handleFileSelection,
  analysis,
  connectedSources,
}) {
  return (
    <>
      <section className="pd-panel pd-upload-area">
        <div className="pd-upload-information">
          <span className="pd-upload-icon">
            <InterfaceIcon name="sources" />
          </span>

          <div>
            <span className="pd-kicker">DATA INGESTION</span>
            <h2>Add organisational knowledge</h2>

            <p>
              Upload customer reviews, support tickets, survey responses,
              meeting notes or internal documents.
            </p>

            <small>{selectedFile}</small>
          </div>
        </div>

        <label className="pd-primary-action pd-file-button">
  Select dataset

  <input
    type="file"
    accept=".csv,.xlsx"
    onChange={handleFileSelection}
  />
</label>
      </section>

  {analysis && (
    <>
  <section className="pd-panel">
    <span className="pd-kicker">
      AI EXECUTIVE SUMMARY
    </span>

    <h2>Dataset Intelligence</h2>

    <div className="analysis-grid">

      <div>
        <strong>Quality Score</strong>
        <p>
          {analysis.analysis.quality_score}/100
        </p>
      </div>

      <div>
        <strong>Status</strong>
        <p>
          {analysis.analysis.quality_status}
        </p>
      </div>

      <div>
        <strong>Total Missing</strong>
        <p>
          {analysis.analysis.total_missing}
        </p>
      </div>

      <div>
        <strong>Duplicate Rows</strong>
        <p>
          {analysis.analysis.duplicate_rows}
        </p>
      </div>

    </div>

   <h3>AI Summary</h3>

<p>{analysis.summary}</p>

<h3>Recommendations</h3>

<ul>
  {analysis.recommendations.map((item,index)=>(
      <li key={index}>{item}</li>
  ))}
</ul>

  </section>
  <section className="pd-panel">
    <h2>Dataset Analysis</h2>

    <div className="analysis-grid">
      <p><strong>Rows:</strong>{analysis ? analysis.analysis.rows : 0}</p>
      <p><strong>Columns:</strong> {analysis.analysis.columns}</p>
      <p><strong>Duplicate Rows:</strong> {analysis.analysis.duplicate_rows}</p>
    </div>

    <h3>Column Names</h3>

    <div className="analysis-tags">
      {analysis.analysis.column_names.map((column) => (
        <span key={column}>{column}</span>
      ))}
    </div>

    <h3>Missing Values</h3>

    <table className="pd-table">
      <thead>
        <tr>
          <th>Column</th>
          <th>Missing</th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(analysis.analysis.missing_values).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>

    
    <h3>Numeric Summary</h3>

<div className="pd-table-wrapper">
  <table className="pd-table">
    <thead>
      <tr>
        <th>Column</th>
        <th>Mean</th>
        <th>Minimum</th>
        <th>Maximum</th>
      </tr>
    </thead>

    <tbody>
      {Object.entries(analysis.analysis.numeric_summary).map(
        ([column, stats]) => (
          <tr key={column}>
            <td>{column}</td>

            <td>
              {Number(stats.mean).toFixed(2)}
            </td>

            <td>{stats.min}</td>

            <td>{stats.max}</td>
          </tr>
        )
      )}
    </tbody>
  </table>
</div>
    <h3>Dataset Preview</h3>

<div className="pd-table-wrapper">
  <table className="pd-table">

    <thead>
      <tr>
        {analysis.analysis.column_names.map((column) => (
          <th key={column}>
            {column}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {analysis?.analysis?.preview?.map((row, index) => (
        <tr key={index}>
          {analysis.analysis.column_names.map((column) => (
            <td key={column}>
              {row[column]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>

  </table>
</div>
  </section>
  </>
)}

      <section className="pd-panel pd-table-panel">
        <div className="pd-panel-header">
          <div>
            <span className="pd-kicker">CONNECTED SYSTEMS</span>
            <h2>Enterprise Data Sources</h2>
          </div>

          <button className="pd-outline-action" type="button">
            Add integration
          </button>
        </div>

        <div className="pd-table-wrapper">
          <table className="pd-table">
            <thead>
              <tr>
                <th>Source name</th>
                <th>Connection type</th>
                <th>Records</th>
                <th>Status</th>
                <th>Last updated</th>
              </tr>
            </thead>

           <tbody>
  {connectedSources.length === 0 ? (
    <tr>
      <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
        No datasets uploaded yet.
      </td>
    </tr>
  ) : (
    connectedSources.map((source) => (
      <tr key={source.name}>
        <td>
          <strong>{source.name}</strong>
        </td>

        <td>{source.type}</td>
        <td>{source.records}</td>

        <td>
          <span
            className={`pd-source-status ${
              source.status === "Processing"
                ? "processing"
                : "connected"
            }`}
          >
            {source.status}
          </span>
        </td>

        <td>{source.updated}</td>
      </tr>
    ))
  )}
</tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function OpportunitiesPage({
    opportunities,
    showNotice
}) {
  return (
    <section className="pd-opportunities-grid">
      {opportunities.map((opportunity, index) => (
        <article className="pd-panel pd-opportunity-card" key={opportunity.title}>
          <div className="pd-opportunity-card-top">
            <span className="pd-rank">
              {String(index + 1).padStart(2, '0')}
            </span>

            <span
              className={`pd-priority-badge ${
                opportunity.priority === 'Critical' ? 'critical' : ''
              }`}
            >
              {opportunity.priority}
            </span>
          </div>

          <span className="pd-kicker">{opportunity.category}</span>
          <h2>{opportunity.title}</h2>

          <p>{opportunity.title}</p>

          <div className="pd-opportunity-metrics">

  <div>
    <span>Quality Score</span>
    <strong>{opportunity.score}</strong>
  </div>

  <div>
    <span>Confidence</span>
    <strong>{opportunity.confidence}</strong>
  </div>

  <div>
    <span>Source</span>
    <strong>Gemini AI</strong>
  </div>

</div>

          <button
            className="pd-outline-action"
            type="button"
            onClick={() =>
              showNotice(`Opened opportunity: ${opportunity.title}`)
            }
          >
            Review opportunity
          </button>
        </article>
      ))}
    </section>
  )
}

function TrendsPage({
    trendData,
    trendChartData,
    analysis,
    aiSummary,
}) {


return (
<section className="pd-trends-layout">
<article className="pd-panel pd-large-chart-panel">
        <div className="pd-panel-header">
          <div>
            <span className="pd-kicker">ORGANISATIONAL SIGNALS</span>
            <h2>Enterprise Trend Growth</h2>
          </div>

        </div>

        <div style={{ width: "100%", height: 350 }}>
  {!trendChartData.length ? (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#777",
      }}
    >
      Upload a dataset to view trends
    </div>
  ) : (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={trendChartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#7c3aed"
          strokeWidth={3}
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )}
</div>
</article>
<article className="pd-panel pd-ai-insights-card">
  <div className="pd-panel-header">
    <div>
      <span className="pd-kicker">AI TREND ANALYSIS</span>
      <h2>Emerging Trends</h2>
    </div>
  </div>

  {!aiSummary ? (
    <div className="pd-empty-state">
      Upload a dataset to view trends.
    </div>
  ) : (
    <ul className="pd-insights-list">
      {aiSummary.trends.map((trend, index) => (
        <li key={index}> {trend}</li>
      ))}
    </ul>
  )}
</article>
<article className="pd-panel pd-ai-insights-card">
  <div className="pd-panel-header">
    <div>
      <span className="pd-kicker">AI ACTION PLAN</span>
      <h2>Recommended Actions</h2>
    </div>
  </div>

  {!aiSummary ? (
    <div className="pd-empty-state">
      Upload a dataset to generate actions.
    </div>
  ) : (
    <ul className="pd-insights-list">
      {aiSummary.actions.map((action, index) => (
        <li key={index}> {action}</li>
      ))}
    </ul>
  )}
</article>
    </section>
  )
}

function ReportsPage({
    reports,
    analysis,
    aiSummary,
    executiveMetrics,
    sentiment,
    logo,
    setNotice,
}) {
  return (
    <section className="pd-report-grid">
      {reports.length === 0 ? (

<div
    style={{
        textAlign: "center",
        padding: "60px",
        color: "#777",
    }}
>
    Upload a dataset to generate AI reports.
</div>

) :(
      reports.map((report) => (
        <article className="pd-panel pd-report-card" key={report.title}>
          <span className="pd-report-icon">
            <InterfaceIcon name="reports" />
          </span>

          <span className="pd-kicker">{report.type}</span>
          <h2>{report.title}</h2>
          <p>{report.description}</p>

          <div className="pd-report-footer">
            <small>{report.date}</small>

<button
    className="pd-outline-action"
    onClick={() =>
        generatePDF({
            analysis,
            aiSummary,
            executiveMetrics,
            sentiment,
            logo,
            setNotice,
        })
    }
>
    Download report
</button>
          </div>
        </article>
      )))}
    </section>
  )
}

function SettingsPage({ analysis }) {
 const [monitoring, setMonitoring] = useState(
  JSON.parse(localStorage.getItem("monitoring")) ?? true
)
const [notifications, setNotifications] = useState(
  JSON.parse(localStorage.getItem("notifications")) ?? true
)

const [weeklyReports, setWeeklyReports] = useState(
  JSON.parse(localStorage.getItem("weeklyReports")) ?? false
)
useEffect(() => {
  localStorage.setItem("monitoring", monitoring);
}, [monitoring]);

useEffect(() => {
  localStorage.setItem("notifications", notifications);
}, [notifications]);

useEffect(() => {
  localStorage.setItem("weeklyReports", weeklyReports);
}, [weeklyReports]);
  return (
    <section className="pd-settings-grid">
      <article className="pd-panel pd-settings-card">
        <div>
          <span className="pd-kicker">MONITORING</span>
          <h2>AI Engine Controls</h2>
        </div>

        <label className="pd-setting-row">
          <div>
            <strong>Continuous monitoring</strong>
            <span>Automatically analyse newly connected information.</span>
          </div>

          <input
            type="checkbox"
            checked={monitoring}
            onChange={() => setMonitoring(!monitoring)}
          />
        </label>

        <label className="pd-setting-row">
          <div>
            <strong>Priority notifications</strong>
            <span>Receive alerts when high-impact opportunities appear.</span>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </label>

        <label className="pd-setting-row">
          <div>
            <strong>Weekly executive reports</strong>
            <span>Automatically prepare a weekly intelligence summary.</span>
          </div>

          <input
            type="checkbox"
            checked={weeklyReports}
            onChange={() => setWeeklyReports(!weeklyReports)}
          />
        </label>
      </article>

      <article className="pd-panel pd-configuration-card">
        <span className="pd-kicker">PLATFORM INFORMATION</span>
        <h2>Prototype Configuration</h2>

        <div>
          <span>AI processing status</span>
          <strong>
{analysis ? "Dataset Loaded" : "Waiting for Dataset"}
</strong>
        </div>

        <div>
          <span>Current environment</span>
          <strong>Version 1.0</strong>
        </div>

        <div>
          <span>Data retention</span>
          <strong>
{analysis
? `${analysis.analysis.rows} Records`
: "No Data"}
</strong>
        </div>

        <div>
  <span>Data retention</span>
  <strong>Session only</strong>
</div>

<div>
  <span>Last Scan</span>
  <strong>{localStorage.getItem("lastScan") || "Never"}</strong>
</div>

        <div>
          <span>Interface version</span>
          <strong>Build 2026.1</strong>
        </div>
        
        <button
  className="pd-primary-action"
  onClick={() => {
    localStorage.clear();
    window.location.reload();
  }}
>
  Reset Dashboard
</button>
      </article>
    </section>
  )
}

function PrototypeDashboard() {
  const [activePage, setActivePage] = useState('overview')
  const [selectedFile, setSelectedFile] = useState('No dataset selected')
  const [notice, setNotice] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [connectedSources, setConnectedSources] = useState([])
  const [aiSummary, setAiSummary] = useState(null);
  const [sentiment, setSentiment] = useState(null);
const [showActionPlan, setShowActionPlan] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

const [chatMessages, setChatMessages] = useState([
  {
    role: "assistant",
    content: "Hi! Ask me anything about your uploaded dataset."
  }
]);

const [chatInput, setChatInput] = useState("");
 const chartData =
  analysis?.analysis?.numeric_summary
    ? Object.entries(analysis.analysis.numeric_summary).map(([name, stats]) => ({
        name,
        value: Number(stats.mean.toFixed(2)),
      }))
    : [];

   const healthChartData = analysis
  ? [
      {
        metric: "Rows",
        value: analysis.analysis.rows,
      },
      {
        metric: "Columns",
        value: analysis.analysis.columns,
      },
      {
        metric: "Missing",
        value: analysis.analysis.total_missing,
      },
      {
        metric: "Duplicates",
        value: analysis.analysis.duplicate_rows,
      },
      {
        metric: "Quality",
        value: analysis.analysis.quality_score,
      },
    ]
  : [];

 const opportunitiesData = aiSummary
  ? aiSummary.opportunities.map((item, index) => ({
      title: item,
      category: "AI Opportunity",
      score: analysis.analysis.quality_score,
      confidence: `${analysis.analysis.quality_score}%`,
      growth: "Generated by Gemini",
      priority:
        index === 0
          ? "Critical"
          : index === 1
          ? "High"
          : "Medium",
    }))
  : [];

  const reportsData = analysis
  ? [
      {
        title: "Dataset Summary",
        description: analysis.summary,
        date: "Generated now",
        type: "AI Report",
      },
      {
        title: "Quality Assessment",
        description: `Dataset Quality Score: ${analysis.analysis.quality_score}/100`,
        date: "Generated now",
        type: "Quality Report",
      },
      {
        title: "Numeric Statistics",
        description: `${Object.keys(
          analysis.analysis.numeric_summary
        ).length} numeric columns analysed.`,
        date: "Generated now",
        type: "Statistics Report",
      },
      {
        title: "Missing Values",
        description: `${analysis.analysis.total_missing} missing values detected.`,
        date: "Generated now",
        type: "Data Cleaning Report",
      },
    ]
  : [];

const missingChartData = analysis
  ? Object.entries(analysis.analysis.missing_values).map(([name, value]) => ({
      name,
      value,
    }))
  : [];

const trendChartData = analysis
  ? [
      {
        name: "Rows",
        value: analysis.analysis.rows,
      },
      {
        name: "Columns",
        value: analysis.analysis.columns,
      },
      {
        name: "Numeric",
        value: Object.keys(
          analysis.analysis.numeric_summary
        ).length,
      },
      {
        name: "Missing",
        value: analysis.analysis.total_missing,
      },
      {
        name: "Quality",
        value: analysis.analysis.quality_score,
      },
    ]
  : [];

  const metricCards = [
  {
    label: "Connected Sources",
    value: connectedSources.length,
    change: "Uploaded datasets",
    icon: "sources",
  },
  {
    label: "Rows",
    value: analysis ? analysis.analysis.rows : 0,
    change: "Dataset records",
    icon: "insights",
  },
  {
    label: "Columns",
    value: analysis ? analysis.analysis.columns : 0,
    change: "Dataset features",
    icon: "opportunities",
  },
  {
    label: "Duplicate Rows",
    value: analysis ? analysis.analysis.duplicate_rows : 0,
    change: "Quality check",
    icon: "risks",
  },
]
  const activeNavigationItem = navigationItems.find(
    (item) => item.id === activePage,
  )

  const handleNavigation = (pageId) => {
    setActivePage(pageId)
    setNotice('')
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleFileSelection = async (event) => {
  const file = event.target.files[0]

  if (!file) return

  setSelectedFile(`Selected file: ${file.name}`)
  setNotice("Uploading dataset...")

  try {
    const result = await uploadDataset(file)
console.log(result)
setAiSummary(result.ai_summary);

setAnalysis(result)
setSentiment(result.sentiment);
localStorage.setItem(
"lastScan",
new Date().toLocaleString()
);
setConnectedSources((previous) => [
  {
    name: file.name,
    type: file.name.endsWith(".csv")
      ? "CSV Dataset"
      : "Excel Dataset",
    records: result.analysis.rows,
    status: "Connected",
    updated: "Just now",
  },
  ...previous,
])

setNotice("Dataset analyzed successfully!")
  } catch (error) {
  console.error("UPLOAD ERROR:", error);

  if (error.response) {
    console.log("Response:", error.response.data);
    setNotice(JSON.stringify(error.response.data));
  } else {
    console.log("Message:", error.message);
    setNotice(error.message);
  }
}
}

  const showNotice = (message) => {
    setNotice(message)
  }



const executiveMetrics = analysis
  ? {
      health: analysis.analysis.quality_status,
      score: analysis.analysis.quality_score,
      confidence: Math.min(
        99,
        analysis.analysis.quality_score + 5
      ),
      ready:
        analysis.analysis.quality_score >= 80
          ? "Yes"
          : "Needs Cleaning",
      cleaningTime:
        analysis.analysis.total_missing > 20
          ? "20 mins"
          : analysis.analysis.total_missing > 5
          ? "10 mins"
          : "5 mins",
      impact:
        analysis.analysis.quality_score >= 90
          ? "High"
          : analysis.analysis.quality_score >= 75
          ? "Medium"
          : "Low",
    }
  : null;
const handleChat = async () => {

  if (!chatInput.trim()) return;

  if (!analysis) {
    setChatMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content: "Please upload a dataset first."
      }
    ]);
    return;
  }

  const question = chatInput;

  setChatMessages(prev => [
    ...prev,
    {
      role: "user",
      content: question,
    },
  ]);

  setChatInput("");

  setIsTyping(true);

  try {

    const reply = await askAI(question, analysis);

    setIsTyping(false);

    setChatMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content: reply.answer,
      },
    ]);

  } catch {

    setIsTyping(false);

    setChatMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content: "Sorry, something went wrong.",
      },
    ]);

  }
};
  return (
    <div className="pd-shell">
      <aside className="pd-sidebar">
        <a className="pd-brand" href="#home">
         <div className="brand-logo">
  <img
    src={logo2}
    alt="AI Innovation Radar"
    className="primary-logo"
  />
</div>
        </a>

        <div className="pd-navigation-heading">WORKSPACE</div>

        <nav className="pd-navigation" aria-label="Dashboard navigation">
          {navigationItems.map((item) => (
            <button
              className={`pd-navigation-button ${
                activePage === item.id ? 'active' : ''
              }`}
              type="button"
              key={item.id}
              onClick={() => handleNavigation(item.id)}
            >
              <span className="pd-navigation-icon">
                <InterfaceIcon
                  name={
                    item.id === 'opportunities'
                      ? 'opportunities'
                      : item.id === 'trends'
                        ? 'trends'
                        : item.id
                  }
                />
              </span>

              <span className="pd-navigation-copy">
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </button>
          ))}
        </nav>

        <div className="pd-system-status">
          <span className="pd-system-indicator"></span>

          <div>
            <strong>AI engine operational</strong>
            <small>Continuous monitoring active</small>
          </div>
        </div>
      </aside>

      <div className="pd-workspace">
        <header className="pd-topbar">
          <div className="pd-breadcrumb">
            <span>Innovation Radar</span>
            <i>/</i>
            <strong>{activeNavigationItem?.label}</strong>
          </div>

          <div className="pd-topbar-actions">
            {/* <label className="pd-search">
              <span>Search</span>

              <input
                type="search"
                placeholder="Search intelligence..."
                aria-label="Search intelligence"
              />
            </label> */}

            <a className="pd-back-button" href="#home">
              Back to website
            </a>

            <button
              className="pd-export-button"
              type="button"
              onClick={() =>
  generatePDF({
    analysis,
    aiSummary,
    executiveMetrics,
    sentiment,
    logo: logo3,
    setNotice,
  })
}
            >
              Export summary
            </button>

            <span className="pd-user-avatar">AI</span>
          </div>
        </header>

        <main className="pd-main">
          <section className="pd-page-header">
            <div>
              <span className="pd-kicker">
                {activePage === 'overview'
                  ? 'ENTERPRISE OVERVIEW'
                  : 'AI INNOVATION RADAR'}
              </span>

              <h1>{activeNavigationItem?.label}</h1>
              <p>{activeNavigationItem?.description}</p>
            </div>

            <div className="pd-update-status">
              <span></span>
              Last updated just now
            </div>
          </section>

          {notice && (
            <div className="pd-notice">
              <span>{notice}</span>

              <button type="button" onClick={() => setNotice('')}>
                Close
              </button>
            </div>
          )}

          {activePage === 'overview' && (
<OverviewPage
    metricCards={metricCards}
    healthChartData={healthChartData}
    missingChartData={missingChartData}
    analysis={analysis}
    aiSummary={aiSummary}
    executiveMetrics={executiveMetrics}
    sentiment={sentiment}
    openOpportunities={() => handleNavigation("opportunities")}
    openActionPlan={() => setShowActionPlan(true)}
/>
          )}


          {activePage === 'sources' && (
           <SourcesPage
  selectedFile={selectedFile}
  handleFileSelection={handleFileSelection}
  analysis={analysis}
  connectedSources={connectedSources}
/>
          )}

          {activePage === 'opportunities' && (
           <OpportunitiesPage
    opportunities={opportunitiesData}
    showNotice={showNotice}
/>
          )}

          {activePage === 'trends' && <TrendsPage
    trendData={trendData}
    trendChartData={trendChartData}
    analysis={analysis}
    aiSummary={aiSummary}
/>}

{activePage === 'reports' && (
<ReportsPage
    reports={reportsData}
    analysis={analysis}
    aiSummary={aiSummary}
    executiveMetrics={executiveMetrics}
    sentiment={sentiment}
    logo={logo3}
    setNotice={setNotice}
/>

          )}

          {activePage === 'settings' && (
  <SettingsPage analysis={analysis} />
)}
        </main>

<ActionPlanModal
    open={showActionPlan}
    onClose={() => setShowActionPlan(false)}
    analysis={analysis}
    aiSummary={aiSummary}
/>
     <button
  className="pd-chat-button"
  onClick={() => setShowChat(!showChat)}
>
  💬
</button>

{showChat && (
  <div className="pd-chat-window">

   <div className="pd-chat-header">

  <span>AI Dataset Assistant</span>

  <button
    className="pd-chat-close"
    onClick={() => setShowChat(false)}
  >
    ✕
  </button>

</div>

    <div className="pd-chat-body">

      {chatMessages.map((msg, index) => (
        <div
          key={index}
          className={`pd-chat-message ${msg.role}`}
        >
          {msg.content}
        </div>
      ))}

      {isTyping && (
        <div className="pd-chat-message ai">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

    </div>

    <div className="pd-chat-footer">

      <input
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        placeholder="Ask about your dataset..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleChat();
          }
        }}
      />

      <button onClick={handleChat}>
        Send
      </button>

    </div>

  </div>
  
)}


      </div>
    </div>
  )
}

export default PrototypeDashboard
