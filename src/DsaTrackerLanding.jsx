import React from 'react';
import { useReveal } from './useReveal';
import './DsaTrackerLanding.css';

const NAV_LINKS = [
  { href: '#why', label: 'why' },
  { href: '#schedule', label: 'schedule' },
  { href: '#features', label: 'features' },
  { href: '#stack', label: 'stack' },
];

const STACK = ['Next.js 14', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'LeetCode GraphQL'];

const TIMELINE_NODES = [
  { label: 'Solved', sub: 'Metadata fetched, first log written', badge: 'day 0', solid: true, lineFilled: true },
  { label: 'Revisit', sub: 'Short term recall check', badge: '+1 day', solid: true, lineFilled: true },
  { label: 'Revisit', sub: 'Confidence rated 1 to 5', badge: '+7 days', solid: true, lineFilled: true },
  { label: 'Revisit', sub: 'Pattern should be automatic by now', badge: '+14 days', solid: false, lineFilled: false },
];

// Same pattern as the vanilla version — a fixed 12-week x 7-day intensity
// grid so the heatmap mock looks like real practice data, not a placeholder.
const HEATMAP_PATTERN = [
  0,0,1,0,2,0,0, 1,2,3,1,0,0,1, 0,3,4,2,1,0,0, 2,1,0,0,3,4,2, 0,0,1,2,3,1,0,
  1,0,2,3,0,0,1, 0,2,3,4,2,1,0, 1,1,0,0,2,3,0, 0,3,4,3,1,0,0, 2,0,1,0,0,2,3,
  0,1,2,1,0,0,1, 3,4,2,0,1,0,0,
];

const HEATMAP_INTENSITIES = [
  'var(--line)',
  'rgba(94,234,212,0.12)',
  'rgba(94,234,212,0.3)',
  'rgba(94,234,212,0.55)',
  'rgba(94,234,212,0.8)',
];

function Reveal({ as: Tag = 'div', className = '', style, children }) {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`} style={style}>
      {children}
    </Tag>
  );
}

export default function DsaTrackerLanding({
  githubUrl = 'https://github.com/srivastava-aryan',
  portfolioUrl = 'https://aryansrivastava.me',
}) {
  return (
    <div className="dsa-landing">
      <nav>
        <div className="wrap">
          <div className="brand">
            {/* <span className="dot" /> */}
            algo-pulse
          </div>
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>
          <a className="nav-cta" href="https://github.com/srivastava-aryan/algopulse" target="_blank" rel="noreferrer">
            View source
          </a>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap">
          <p className="eyebrow">./algo-pulse --status</p>
          <h1>
            A spaced repetition system
            <br />
            for <span className="accent">LeetCode practice.</span>
          </h1>
          <p className="sub">
            Solving a problem once does not mean you will remember it in a month. This tracks
            what you have solved, schedules three revisits at the moments memory actually starts
            to fade, and shows the whole pattern on a calendar and a heatmap.
          </p>
          <div className="cta-row">
            <a className="btn-primary" href="https://github.com/srivastava-aryan/algopulse" target="_blank" rel="noreferrer">
              View source on GitHub
            </a>
            <a className="btn-ghost" href="#schedule">How the scheduling works</a>
          </div>

          <Reveal className="terminal" style={{ marginTop: 48 }}>
            <div className="terminal-bar">
              <span /><span /><span />
              <span className="path">algo-pulse --zsh</span>
            </div>
            <div className="terminal-body">
              <div><span className="prompt">$</span> add --question "https://leetcode.com/problems/two-sum/"</div>
              <div style={{ color: 'var(--dim)', marginTop: 6 }}>fetched: Two Sum · Easy · Array, Hash Table</div>
              <div style={{ color: 'var(--dim)' }}>scheduled revisions: +1d, +7d, +14d</div>
              <div style={{ marginTop: 14 }}>
                <span className="prompt">$</span> revisions --due
                <span className="cursor" />
              </div>
            </div>
          </Reveal>

          <Reveal className="hero-stats">
            <div className="stat-chip">
              <div className="num">+1 / +7 / +14</div>
              <div className="label">day revision schedule</div>
            </div>
            <div className="stat-chip">
              <div className="num">28</div>
              <div className="label">core topics tracked for gaps</div>
            </div>
            <div className="stat-chip">
              <div className="num">0</div>
              <div className="label">manual scheduling required</div>
            </div>
          </Reveal>
        </div>
      </header>

      <Reveal as="section" className="problem" style={{}} >
        <div className="wrap" id="why">
          <p className="eyebrow">why</p>
          <h2>Most trackers are a checklist. This one is built around retention.</h2>
          <p>
            A spreadsheet or a solved counter tells you what you have done. It does not tell you
            what you are about to forget. The forgetting curve is steepest right after you first
            learn something, which is exactly why a single solve rarely sticks. This app treats
            every solve as the start of a short schedule, not the end of one.
          </p>
        </div>
      </Reveal>

      <Reveal as="section">
        <div className="wrap" id="schedule">
          <p className="eyebrow">revision --schedule</p>
          <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', maxWidth: 640 }}>
            Every solve gets three scheduled comebacks.
          </h2>
          <p style={{ color: 'var(--dim)', maxWidth: 600, marginTop: 14, fontSize: 14 }}>
            The three checkpoints are date math done once, at the moment you solve something. No
            cron job, no background worker, just three rows written to the database up front.
          </p>

          <div className="timeline-wrap">
            <div className="timeline">
              {TIMELINE_NODES.map((node, i) => (
                <div className="tl-node" key={i}>
                  <div className="tl-dot-row">
                    <div className={`tl-circle ${node.solid ? 'solid' : ''}`} />
                    {i < TIMELINE_NODES.length - 1 && (
                      <div className={`tl-line ${node.lineFilled ? 'filled' : ''}`} />
                    )}
                  </div>
                  <div className="tl-label">{node.label}</div>
                  <div className="tl-sub">{node.sub}</div>
                  <div className="tl-badge">{node.badge}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section">
        <div className="wrap" id="features">
          <p className="eyebrow">features --list</p>
          <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', maxWidth: 640 }}>
            Four views on the same data.
          </h2>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="mock">
                <div className="mock-row">
                  <span>Course Schedule</span>
                  <div className="mock-conf">
                    {[1, 2, 3, 4, 5].map((n) => <span key={n}>{n}</span>)}
                  </div>
                </div>
                <div className="mock-row">
                  <span>Number of Islands</span>
                  <div className="mock-conf">
                    {[1, 2, 3, 4, 5].map((n) => <span key={n}>{n}</span>)}
                  </div>
                </div>
              </div>
              <div className="info">
                <h3>Dashboard</h3>
                <p>Paste a URL, get auto filled metadata, and see exactly what is due today rated by confidence, not a checkbox.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="mock">
                <div className="mock-cal">
                  <div className="cell" />
                  <div className="cell"><span className="b solved">+1</span></div>
                  <div className="cell" />
                  <div className="cell today"><span className="b due">2 due</span></div>
                  <div className="cell" />
                  <div className="cell"><span className="b solved">+2</span></div>
                  <div className="cell" />
                  <div className="cell" />
                  <div className="cell" />
                  <div className="cell"><span className="b due">1 due</span></div>
                  <div className="cell" />
                  <div className="cell" />
                  <div className="cell"><span className="b solved">+1</span></div>
                  <div className="cell" />
                </div>
              </div>
              <div className="info">
                <h3>Calendar</h3>
                <p>Click any day to see what was solved and what came due, so a slow week is visible, not hidden in a table.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="mock">
                <div className="mock-heat">
                  {HEATMAP_PATTERN.map((level, i) => (
                    <span key={i} style={{ background: HEATMAP_INTENSITIES[level] }} />
                  ))}
                </div>
              </div>
              <div className="info">
                <h3>Heatmap</h3>
                <p>A year of practice at a glance, current streak and longest streak included, built from the same solve and revision data.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="mock">
                <div className="mock-topic-row">
                  <div className="mock-topic-label"><span>Dynamic Programming</span><span>4</span></div>
                  <div className="mock-bar">
                    <div style={{ width: '20%', background: 'var(--easy)' }} />
                    <div style={{ width: '15%', background: 'var(--medium)' }} />
                  </div>
                </div>
                <div className="mock-topic-row">
                  <div className="mock-topic-label"><span>Union Find</span><span>1</span></div>
                  <div className="mock-bar">
                    <div style={{ width: '8%', background: 'var(--medium)' }} />
                  </div>
                </div>
                <div className="mock-topic-row">
                  <div className="mock-topic-label" style={{ color: 'var(--hard)' }}>
                    <span>Bit Manipulation</span><span>0</span>
                  </div>
                  <div className="mock-bar" />
                </div>
              </div>
              <div className="info">
                <h3>Topic coverage</h3>
                <p>Weighed against 28 core DSA topics, sorted weakest first, so gaps like an untouched topic are the first thing you see.</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="tight">
        <div className="wrap" id="stack">
          <p className="eyebrow">stack --show</p>
          <h2 style={{ fontSize: 'clamp(20px,2.6vw,26px)' }}>Built with</h2>
          <div className="stack-row">
            {STACK.map((item) => (
              <div className="stack-badge" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section">
        <div className="wrap">
          <p className="eyebrow">how --built</p>
          <div className="arch-grid">
            <div>
              <h2 style={{ fontSize: 'clamp(20px,2.6vw,26px)', marginBottom: 16 }}>
                No scheduler running anywhere.
              </h2>
              <p>
                Pasting a URL triggers one request to LeetCode's public GraphQL endpoint for
                title, difficulty, and topic tags, so nothing has to be typed by hand.
              </p>
              <p>
                The three revision dates are written as plain rows the moment a solve is logged.
                The calendar, heatmap, and due queue are just reads and aggregates over that same
                table, so there is nothing running in the background and nothing that can
                silently fail to fire.
              </p>
            </div>
            <div className="code-block">
              <span className="c">// three rows, written once, at solve time</span><br />
              <span className="k">model</span> Revision {'{'}<br />
              &nbsp;&nbsp;dueDate&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DateTime<br />
              &nbsp;&nbsp;completedAt&nbsp;&nbsp;DateTime?<br />
              &nbsp;&nbsp;confidence&nbsp;&nbsp;&nbsp;Int?&nbsp;&nbsp;&nbsp;<span className="c">// 1 to 5</span><br />
              &nbsp;&nbsp;intervalDay&nbsp;&nbsp;Int&nbsp;&nbsp;&nbsp;&nbsp;<span className="c">// 1, 7, 14</span><br />
              {'}'}<br /><br />
              <span className="c">// due queue is just this, no cron</span><br />
              <span className="k">where</span> completedAt <span className="k">is</span> <span className="s">null</span><br />
              <span className="k">and</span> dueDate &lt;= today
            </div>
          </div>
        </div>
      </Reveal>

      <footer>
        <div className="wrap">
          <div className="row">
            <p className="note">
              Built by Aryan Srivastava as a personal practice tool. Not currently open for
              public signup, this page exists to walk through how it works.
            </p>
            <div className="links">
              <a href="https://github.com/srivastava-aryan/algo-pulse" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://aryansrivastava.me" target="_blank" rel="noreferrer">Portfolio</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
