import '../App.css'
import logo from '../assets/logo.png'

const workflowSteps = [
  {
    number: '01',
    title: 'Connect knowledge',
    description:
      'Bring together customer reviews, support tickets, meeting notes, surveys and internal documents.',
  },
  {
    number: '02',
    title: 'Detect meaningful signals',
    description:
      'AI groups related feedback, identifies emerging patterns and separates noise from evidence.',
  },
  {
    number: '03',
    title: 'Prioritise action',
    description:
      'Every opportunity receives a business score, confidence level and recommended next step.',
  },
]

const sourceTypes = [
  'Customer Feedback',
  'Support Operations',
  'Meeting Intelligence',
  'Internal Knowledge',
]

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="inline-icon"
    >
      <path
        d="M5 15L15 5M7 5h8v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function RadarIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="18" />
      <circle cx="24" cy="24" r="11" />
      <circle cx="24" cy="24" r="4" />
      <path d="M24 24L38 13" />
      <circle className="radar-point" cx="35" cy="15" r="2.5" />
    </svg>
  )
}

function DataIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  )
}

function InsightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M8.5 15.5C6.9 14.4 6 12.6 6 10.5a6 6 0 0 1 12 0c0 2.1-.9 3.9-2.5 5" />
      <path d="M12 3V1" />
      <path d="M4.8 5.3 3.4 3.9" />
      <path d="m19.2 5.3 1.4-1.4" />
    </svg>
  )
}

function LandingPage() {
  return (
    <div className="site-shell">
      <div className="announcement-bar">
        <div className="announcement-content">
          <span className="announcement-indicator"></span>

          <span>
            Enterprise intelligence for faster, evidence-based innovation
          </span>

          <a href="#workflow">
            Explore the platform
            <ArrowIcon />
          </a>
        </div>
      </div>

      <header className="site-header">
          <a className="site-logo" href="#home">
  <img
    src={logo}
    alt="AI Innovation Radar"
    className="landing-main-logo"
  />
</a>

        <nav className="main-navigation" aria-label="Main navigation">
          <a href="#home">Overview</a>
          <a href="#workflow">How it works</a>
          <a href="#platform">Platform</a>
          <a href="#use-cases">Use cases</a>
        </nav>

       <a className="primary-button" href="#dashboard">
          View prototype
          <ArrowIcon />
        </a>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span></span>
              Continuous enterprise intelligence
            </div>

            <h1>
              Turn scattered business data into
              <em> decisions that matter.</em>
            </h1>

            <p className="hero-description">
              AI Innovation Radar continuously analyses organisational
              knowledge to uncover emerging trends, high-value opportunities
              and actionable business recommendations.
            </p>

            <div className="hero-actions">
             <a className="primary-button" href="#dashboard">
  Open intelligence dashboard
  <ArrowIcon />
</a>

              <a className="secondary-button" href="#workflow">
                See how it works
              </a>
            </div>

            <div className="hero-metrics">
              <div>
                <strong>157</strong>
                <span>Insights generated</span>
              </div>

              <div>
                <strong>24</strong>
                <span>Active opportunities</span>
              </div>

              <div>
                <strong>96%</strong>
                <span>Model confidence</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-background-shape"></div>

            <div className="product-window">
              <div className="window-header">
                <div className="window-controls">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <span className="window-title">
                  Innovation Radar / Executive Overview
                </span>

                <div className="live-status">
                  <span></span>
                  Live monitoring
                </div>
              </div>

              <div className="window-layout">
                <aside className="preview-sidebar">
                  <div className="preview-brand">
                    <RadarIcon />
                  </div>

                  <button className="preview-nav-item active" type="button">
                    <span>01</span>
                    Overview
                  </button>

                  <button className="preview-nav-item" type="button">
                    <span>02</span>
                    Sources
                  </button>

                  <button className="preview-nav-item" type="button">
                    <span>03</span>
                    Opportunities
                  </button>

                  <button className="preview-nav-item" type="button">
                    <span>04</span>
                    Trends
                  </button>

                  <button className="preview-nav-item" type="button">
                    <span>05</span>
                    Reports
                  </button>

                   <button className="preview-nav-item" type="button">
                    <span>06</span>
                    Settings
                  </button>

                  <div className="preview-system-status">
                    <span></span>
                    AI engine online
                  </div>
                </aside>

                <div className="preview-main">
                  <div className="preview-heading">
                    <div>
                      <span>ENTERPRISE OVERVIEW</span>
                      <h2>Intelligence Dashboard</h2>
                    </div>

                    <button type="button">Last 30 days</button>
                  </div>

                  <div className="preview-metrics">
                    <article>
                      <div className="preview-metric-icon">
                        <DataIcon />
                      </div>

                      <span>Connected sources</span>
                      <strong>06</strong>
                      <small>2 added this month</small>
                    </article>

                    <article>
                      <div className="preview-metric-icon">
                        <InsightIcon />
                      </div>

                      <span>AI insights</span>
                      <strong>157</strong>
                      <small>23 generated today</small>
                    </article>

                    <article>
                      <div className="preview-metric-code">OP</div>

                      <span>Opportunities</span>
                      <strong>24</strong>
                      <small>5 high priority</small>
                    </article>
                  </div>

                  <div className="preview-dashboard-grid">
                    <article className="preview-opportunity">
                      <div className="preview-panel-heading">
                        <div>
                          <span>PRIORITY OPPORTUNITY</span>
                          <h3>Improve customer onboarding</h3>
                        </div>

                        <span className="priority-label">High impact</span>
                      </div>

                      <p>
                        Repeated feedback indicates friction during account
                        setup, verification and initial product adoption.
                      </p>

                      <div className="preview-tags">
                        <span>Customer Experience</span>
                        <span>Product Strategy</span>
                      </div>

                      <div className="preview-evidence">
                        <div>
                          <span>Mentions</span>
                          <strong>427</strong>
                        </div>

                        <div>
                          <span>Growth</span>
                          <strong>+38%</strong>
                        </div>

                        <div>
                          <span>Confidence</span>
                          <strong>96%</strong>
                        </div>
                      </div>
                    </article>

                    <article className="preview-score">
                      <span>INNOVATION SCORE</span>
                      <strong>94</strong>
                      <small>out of 100</small>

                      <div className="score-track">
                        <div></div>
                      </div>

                      <p>Strong evidence and high business relevance</p>
                    </article>
                  </div>

                  <div className="preview-bottom-grid">
                    <article className="trend-preview">
                      <div className="small-panel-heading">
                        <div>
                          <span>SIGNAL GROWTH</span>
                          <strong>Emerging themes</strong>
                        </div>

                        <small>30 days</small>
                      </div>

                      <div className="mini-chart">
                        <div style={{ height: '35%' }}></div>
                        <div style={{ height: '48%' }}></div>
                        <div style={{ height: '43%' }}></div>
                        <div style={{ height: '62%' }}></div>
                        <div style={{ height: '72%' }}></div>
                        <div style={{ height: '88%' }}></div>
                        <div style={{ height: '95%' }}></div>
                      </div>
                    </article>

                    <article className="recommendation-preview">
                      <span>RECOMMENDED ACTION</span>
                      <strong>
                        Simplify verification and introduce guided onboarding.
                      </strong>

                      <a href="#demo">
                        View recommendation
                        <ArrowIcon />
                      </a>
                    </article>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-insight">
              <span className="floating-icon">
                <InsightIcon />
              </span>

              <div>
                <small>NEW SIGNAL DETECTED</small>
                <strong>Onboarding friction increased 38%</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="audience-strip" id="use-cases">
          <p>Designed for teams responsible for enterprise growth</p>

          <div className="audience-list">
            <span>Product Strategy</span>
            <span>Customer Experience</span>
            <span>Innovation Teams</span>
            <span>Business Operations</span>
            <span>Executive Leadership</span>
          </div>
        </section>

        <section className="workflow-section" id="workflow">
          <div className="section-introduction">
            <span className="section-kicker">HOW IT WORKS</span>

            <h2>
              From fragmented information
              <br />
              to confident action.
            </h2>

            <p>
              The platform converts large volumes of unstructured enterprise
              data into a clear and prioritised innovation pipeline.
            </p>
          </div>

          <div className="workflow-grid">
            {workflowSteps.map((step) => (
              <article className="workflow-card" key={step.number}>
                <div className="workflow-card-top">
                  <span className="workflow-number">{step.number}</span>
                  <span className="workflow-line"></span>
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="platform-section" id="platform">
          <div className="platform-copy">
            <span className="section-kicker">ONE INTELLIGENCE LAYER</span>

            <h2>
              Connect the knowledge your organisation already creates.
            </h2>

            <p>
              AI Innovation Radar is designed to sit above existing enterprise
              systems. It continuously identifies patterns across departments
              without forcing teams to change how they work.
            </p>

            <div className="source-list">
              {sourceTypes.map((source) => (
                <div key={source}>
                  <span className="source-check">✓</span>
                  {source}
                </div>
              ))}
            </div>

            <a className="text-link" href="#demo">
              Explore enterprise use cases
              <ArrowIcon />
            </a>
          </div>

          <div className="radar-visual">
            <div className="radar-grid">
              <div className="radar-circle circle-one"></div>
              <div className="radar-circle circle-two"></div>
              <div className="radar-circle circle-three"></div>

              <div className="radar-axis horizontal"></div>
              <div className="radar-axis vertical"></div>

              <span className="radar-centre">
                <RadarIcon />
              </span>

              <span className="signal-point point-one">
                <i></i>
                Customer feedback
              </span>

              <span className="signal-point point-two">
                <i></i>
                Support tickets
              </span>

              <span className="signal-point point-three">
                <i></i>
                Meeting notes
              </span>

              <span className="signal-point point-four">
                <i></i>
                Internal documents
              </span>
            </div>

            <div className="radar-summary">
              <div>
                <span>Signals processed</span>
                <strong>12,480</strong>
              </div>

              <div>
                <span>Emerging themes</span>
                <strong>18</strong>
              </div>

              <div>
                <span>High-priority opportunities</span>
                <strong>05</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section" id="demo">
          <div>
            <span className="section-kicker light">HACKATHON PROTOTYPE</span>

            <h2>See hidden business signals before they become obvious.</h2>

            <p>
              Upload a sample organisational dataset and let the platform
              identify patterns, opportunities and recommended actions.
            </p>
          </div>

          <a className="demo-button" href="#dashboard">
  Launch prototype
  <ArrowIcon />
</a>
        </section>
      </main>

      <footer className="site-footer">
       <a className="footer-brand" href="#home">
  <img
    src={logo}
    alt="AI Innovation Radar"
    className="landing-footer-logo"
  />
</a>

        <p>
          Transforming organisational knowledge into actionable intelligence.
        </p>

        <span>Made by Team Breaking code © 2026</span>
      </footer>
    </div>
  )
}

export default LandingPage
