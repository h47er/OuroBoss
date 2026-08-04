/**
 * OuroBoss - Continuous Cyber Defense & Self-Healing Platform Engine
 * Strict Zero-Unsolved Vulnerability Guarantee & 0.1% False Positive Precision
 */

(function () {
  // State Initialization
  const state = {
    activeTab: 'architecture', // 'architecture' | 'pipeline' | 'redteam' | 'report'
    isScanning: true,
    scanSpeed: 2500,
    stats: {
      discoveredAssets: 142,
      activeThreatsDetected: 0, // In triage/pipeline
      remediatedAndVerified: 28,
      falsePositivesFiltered: 14,
      publishedUnsolvedCount: 0, // STRICT GUARANTEE: Always 0
      defensiveLoopPrecision: '99.9%' // 0.1% false-positive boundary
    },
    // Pipeline Items (Active state machine)
    pipelineItems: [
      {
        id: 'VULN-2026-8801',
        name: 'Remote Code Execution in Microservice Gateway',
        asset: 'api-gateway-us-east.prod',
        ttp: 'T1190 - Exploit Public-Facing App',
        severity: 'critical',
        stage: 'verified', // 'discovery' | 'correlation' | 'validation' | 'remediation' | 'verified'
        confidenceScore: 0.999,
        sideEffectRisk: 0.001,
        blastRadius: 'High (14 Microservices)',
        patchStatus: 'Staged Patch v4.2.1 Applied',
        redTeamVerified: true,
        remediated: true,
        timestamp: new Date(Date.now() - 3600000).toLocaleTimeString()
      },
      {
        id: 'VULN-2026-8802',
        name: 'Unauthorized K8s Pod Privilege Escalation',
        asset: 'k8s-cluster-01.compute',
        ttp: 'T1068 - Exploitation for Privilege Escalation',
        severity: 'high',
        stage: 'remediation',
        confidenceScore: 0.998,
        sideEffectRisk: 0.002,
        blastRadius: 'Medium (Cluster Node 3)',
        patchStatus: 'Applying RBAC Restriction Lockdown...',
        redTeamVerified: false,
        remediated: false,
        timestamp: new Date(Date.now() - 1800000).toLocaleTimeString()
      },
      {
        id: 'VULN-2026-8803',
        name: 'GraphQL Introspection Data Leakage',
        asset: 'customer-portal-graphql',
        ttp: 'T1082 - System Information Discovery',
        severity: 'medium',
        stage: 'validation',
        confidenceScore: 0.999,
        sideEffectRisk: 0.0005,
        blastRadius: 'Low (Read-Only Schema)',
        patchStatus: 'Pending Blast Radius Calculation',
        redTeamVerified: false,
        remediated: false,
        timestamp: new Date(Date.now() - 600000).toLocaleTimeString()
      }
    ],
    // Log Feed
    logs: [
      { time: new Date().toLocaleTimeString(), text: 'OuroBoss Core Defensive Loop initialized.', type: 'info' },
      { time: new Date().toLocaleTimeString(), text: 'Continuous Discovery: 142 cloud assets registered.', type: 'success' },
      { time: new Date().toLocaleTimeString(), text: 'Zero-Unsolved Vulnerabilities Reporting Filter active.', type: 'success' }
    ]
  };

  // Sample Pool for Dynamic Injection
  const mockThreatPool = [
    {
      name: 'SQL Injection in Auth Service',
      asset: 'auth-service-db.internal',
      ttp: 'T1190 - Exploit Public App',
      severity: 'critical',
      blastRadius: 'Critical (User DB Database)'
    },
    {
      name: 'Exposed IAM Access Token in S3 Bucket',
      asset: 'analytics-storage-prod',
      ttp: 'T1552 - Unsecured Credentials',
      severity: 'high',
      blastRadius: 'High (Cloud IAM Policy)'
    },
    {
      name: 'SSRF in Image Processing Worker',
      asset: 'worker-media-04',
      ttp: 'T1090 - Proxy Redirection',
      severity: 'high',
      blastRadius: 'Medium (Internal VPC)'
    },
    {
      name: 'Unquoted Service Path Privilege Escalation',
      asset: 'win-jump-host-02',
      ttp: 'T1574 - Hijack Execution Flow',
      severity: 'medium',
      blastRadius: 'Low (Local Admin)'
    }
  ];

  // Helper Functions
  function addLog(text, type = 'info') {
    const time = new Date().toLocaleTimeString();
    state.logs.unshift({ time, text, type });
    if (state.logs.length > 50) state.logs.pop();
    renderLogs();
  }

  function recalculateStats() {
    const verifiedCount = state.pipelineItems.filter(i => i.stage === 'verified' && i.remediated && i.redTeamVerified).length;
    const activeCount = state.pipelineItems.filter(i => i.stage !== 'verified').length;
    state.stats.remediatedAndVerified = verifiedCount + 27; // Baseline + active
    state.stats.activeThreatsDetected = activeCount;
    // PUBLISHED UNSOLVED GUARANTEE IS STRICTLY 0
    state.stats.publishedUnsolvedCount = 0;
  }

  // Core Pipeline Simulation Timer
  setInterval(() => {
    if (!state.isScanning) return;

    // Advance items through pipeline stages
    let changed = false;
    state.pipelineItems.forEach(item => {
      if (item.stage === 'discovery') {
        item.stage = 'correlation';
        addLog(`[Detect & Correlate] Mapped TTP: ${item.ttp} on ${item.asset}`, 'info');
        changed = true;
      } else if (item.stage === 'correlation') {
        item.stage = 'validation';
        addLog(`[Validation] Confidence: 99.9% | Blast Radius: ${item.blastRadius}`, 'info');
        changed = true;
      } else if (item.stage === 'validation') {
        item.stage = 'remediation';
        item.patchStatus = 'Staged Hotfix Rollout & Verification...';
        addLog(`[Remediate & Verify] Staged patch deployed for ${item.id}`, 'warn');
        changed = true;
      } else if (item.stage === 'remediation') {
        // Trigger self red-team validation automatically
        item.stage = 'verified';
        item.remediated = true;
        item.redTeamVerified = true;
        item.patchStatus = 'Verified & Confirmed Fixed by Self-Red-Team';
        addLog(`[Self-Red-Team] Probed ${item.asset}. Fix confirmed! Item published as RESOLVED.`, 'success');
        changed = true;
      }
    });

    if (changed) {
      recalculateStats();
      renderApp();
    }
  }, 4500);

  // Trigger Simulated Self-Red-Team Execution
  window.triggerSelfRedTeam = function () {
    addLog('🔥 [Self-Red-Team] LAUNCHING AUTOMATED ADVERSARY SIMULATION...', 'attack');
    
    // Find unverified or remediation items and attack them
    const pendingItems = state.pipelineItems.filter(i => i.stage !== 'verified');
    
    if (pendingItems.length === 0) {
      addLog('🔥 [Self-Red-Team] Executed 14 exploit vectors across perimeter. No bypasses detected. Defenses hold 100%.', 'success');
    } else {
      pendingItems.forEach(item => {
        addLog(`🔥 [Self-Red-Team] Simulating adversary exploit payload against ${item.asset}...`, 'attack');
        setTimeout(() => {
          item.stage = 'verified';
          item.remediated = true;
          item.redTeamVerified = true;
          item.patchStatus = 'Confirmed Fixed after Adversary Probe';
          addLog(`✅ [Self-Red-Team Feedback] ${item.id} successfully blocked exploit payload! Verified closed.`, 'success');
          recalculateStats();
          renderApp();
        }, 1500);
      });
    }
    renderApp();
  };

  // Inject Threat Function
  window.injectNewThreat = function () {
    const randomThreat = mockThreatPool[Math.floor(Math.random() * mockThreatPool.length)];
    const newId = `VULN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newItem = {
      id: newId,
      name: randomThreat.name,
      asset: randomThreat.asset,
      ttp: randomThreat.ttp,
      severity: randomThreat.severity,
      stage: 'discovery',
      confidenceScore: 0.999,
      sideEffectRisk: 0.001,
      blastRadius: randomThreat.blastRadius,
      patchStatus: 'Queued for Multi-Signal Correlation',
      redTeamVerified: false,
      remediated: false,
      timestamp: new Date().toLocaleTimeString()
    };

    state.pipelineItems.unshift(newItem);
    addLog(`[Continuous Discovery] Surface scanner detected anomaly on ${randomThreat.asset}`, 'warn');
    recalculateStats();
    renderApp();
  };

  // Tab Switcher
  window.switchTab = function (tabName) {
    state.activeTab = tabName;
    renderApp();
  };

  // Render Functions
  function renderHeader() {
    return `
      <header>
        <div class="header-container">
          <div class="logo-group">
            <div class="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="logo-text">OuroBoss</span>
                <span class="logo-badge">Self-Healing Defense</span>
              </div>
            </div>
          </div>
          <div class="nav-metrics">
            <div class="metric-pill success">
              <div class="status-dot"></div>
              <span>Loop Precision:</span>
              <span class="val">${state.stats.defensiveLoopPrecision}</span>
            </div>
            <div class="metric-pill alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              <span>Published Unsolved:</span>
              <span class="val" style="color: var(--color-primary);">0 (Guaranteed)</span>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  function renderArchitectureSection() {
    return `
      <div class="arch-card">
        <div class="arch-header">
          <div class="arch-title-area">
            <h1>Continuous Defense & Self-Healing Pipeline</h1>
            <p class="arch-subtitle">Zero-Unsolved Vulnerabilities Guarantee • Automated Self-Red-Team Feedback Loop</p>
          </div>
          <div class="guarantee-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            <span>0.1% False-Positive & Side-Effect Cap</span>
          </div>
        </div>

        <div class="pipeline-grid">
          <!-- Main 4-Stage Vertical Flow -->
          <div class="pipeline-flow">
            <!-- Stage 1 -->
            <div class="pipeline-node ${state.pipelineItems.some(i => i.stage === 'discovery') ? 'active' : ''}">
              <div class="node-left">
                <div class="node-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/></svg>
                </div>
                <div class="node-info">
                  <h3>Continuous Discovery</h3>
                  <p>Never waits for activity • Real-time asset surface scan</p>
                </div>
              </div>
              <div class="node-metrics">
                <div class="count">${state.stats.discoveredAssets}</div>
                <div class="label">Assets Monitored</div>
              </div>
            </div>

            <!-- Stage 2 -->
            <div class="pipeline-node ${state.pipelineItems.some(i => i.stage === 'correlation') ? 'active' : ''}">
              <div class="node-left">
                <div class="node-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                </div>
                <div class="node-info">
                  <h3>Detect and Correlate</h3>
                  <p>Multi-signal • MITRE ATT&CK TTP mapped</p>
                </div>
              </div>
              <div class="node-metrics">
                <div class="count" style="color: var(--color-cyan);">${state.pipelineItems.filter(i => i.stage === 'correlation').length}</div>
                <div class="label">Triaging TTPs</div>
              </div>
            </div>

            <!-- Stage 3 -->
            <div class="pipeline-node ${state.pipelineItems.some(i => i.stage === 'validation') ? 'active' : ''}">
              <div class="node-left">
                <div class="node-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div class="node-info">
                  <h3>Validate</h3>
                  <p>Confidence score (>99.9%) + blast-radius check</p>
                </div>
              </div>
              <div class="node-metrics">
                <div class="count" style="color: var(--color-purple);">${state.pipelineItems.filter(i => i.stage === 'validation').length}</div>
                <div class="label">Validating</div>
              </div>
            </div>

            <!-- Stage 4 -->
            <div class="pipeline-node ${state.pipelineItems.some(i => i.stage === 'remediation' || i.stage === 'verified') ? 'active' : ''}">
              <div class="node-left">
                <div class="node-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                </div>
                <div class="node-info">
                  <h3>Remediate and Verify</h3>
                  <p>Staged rollout • Confirmed fix validation</p>
                </div>
              </div>
              <div class="node-metrics">
                <div class="count" style="color: var(--color-primary);">${state.stats.remediatedAndVerified}</div>
                <div class="label">Resolved & Verified</div>
              </div>
            </div>
          </div>

          <!-- Self-Red-Team Side Node -->
          <div class="redteam-box">
            <div class="redteam-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <h3>Self-Red-Team</h3>
              <p>Attacks itself continuously to verify that fixes hold against live exploits.</p>
            </div>
            <button class="btn-redteam" onclick="triggerSelfRedTeam()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              <span>Run Self-Attack</span>
            </button>
          </div>
        </div>

        <div style="margin-top: 1rem; color: var(--text-dim); font-size: 0.85rem; display: flex; justify-content: space-between; align-items: center;">
          <span>↻ Closes the loop back to discovery with 0.1% defensive tolerance</span>
          <span>● Green: Detection Pipeline | ● Red: Self-Attack Feedback</span>
        </div>
      </div>
    `;
  }

  function renderPipelineTab() {
    return `
      <div class="grid-2col">
        <!-- Active Pipeline Monitor -->
        <div class="section-card">
          <div class="card-title">
            <h2>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              <span>Active Threat Triage Queue</span>
            </h2>
            <button class="btn-sim" onclick="injectNewThreat()">+ Inject Simulated Threat</button>
          </div>

          <div class="item-list">
            ${state.pipelineItems.map(item => `
              <div class="threat-item">
                <div class="threat-item-top">
                  <span class="threat-name">
                    <span class="severity-pill severity-${item.severity}">${item.severity}</span>
                    <span>${item.name}</span>
                  </span>
                  <span class="stage-badge stage-${item.stage}">
                    ${item.stage.toUpperCase()}
                  </span>
                </div>
                <div class="threat-details">
                  <span><strong>ID:</strong> ${item.id}</span>
                  <span><strong>Asset:</strong> ${item.asset}</span>
                  <span class="ttp-tag">${item.ttp}</span>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; justify-content: space-between; margin-top: 0.2rem;">
                  <span>Confidence: ${(item.confidenceScore * 100).toFixed(1)}% | Blast: ${item.blastRadius}</span>
                  <span style="color: var(--color-primary);">${item.patchStatus}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Terminal & Logs -->
        <div class="section-card">
          <div class="card-title">
            <h2>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              <span>OuroBoss Defense Telemetry</span>
            </h2>
            <span style="font-size: 0.75rem; color: var(--color-primary); font-family: var(--font-mono);">LIVE STREAM</span>
          </div>

          <div class="terminal-box" id="terminal-feed">
            ${state.logs.map(log => `
              <div class="log-line">
                <span class="log-time">[${log.time}]</span>
                <span class="log-${log.type}">${log.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderReportTab() {
    const verifiedList = state.pipelineItems.filter(i => i.stage === 'verified' && i.remediated);
    
    return `
      <div class="section-card">
        <div class="report-banner">
          <div class="report-banner-top">
            <h2>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 12 14 22 4"/></svg>
              <span>Zero-Unsolved Vulnerabilities Compliance Report</span>
            </h2>
            <span class="guarantee-badge">Strict Executive Guarantee Active</span>
          </div>
          <p style="color: var(--text-muted); font-size: 0.9rem;">
            OuroBoss enforces a strict publishing policy: <strong>Zero unsolved or unverified vulnerabilities</strong> are reported in final compliance audits. Candidate vulnerabilities remain in the automated remediation & self-red-team queue until 100% verified.
          </p>

          <div class="report-stats-grid">
            <div class="report-stat-card">
              <div class="val zero">0</div>
              <div class="label">Unsolved Vulnerabilities</div>
            </div>
            <div class="report-stat-card">
              <div class="val" style="color: var(--color-primary);">${state.stats.remediatedAndVerified}</div>
              <div class="label">Verified Remediated</div>
            </div>
            <div class="report-stat-card">
              <div class="val" style="color: var(--color-cyan);">${state.stats.falsePositivesFiltered}</div>
              <div class="label">False Positives Filtered</div>
            </div>
            <div class="report-stat-card">
              <div class="val" style="color: var(--color-purple);">0.1%</div>
              <div class="label">Max Tolerated Boundary</div>
            </div>
          </div>
        </div>

        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-top: 1rem; color: var(--text-main);">
          Official Verified Vulnerability Audit Log
        </h3>
        
        <div class="audit-table-wrapper">
          <table class="audit-table">
            <thead>
              <tr>
                <th>Vulnerability ID</th>
                <th>Target Asset</th>
                <th>ATT&CK TTP</th>
                <th>Confidence Score</th>
                <th>Remediation Fix</th>
                <th>Self-Red-Team Status</th>
                <th>Report Status</th>
              </tr>
            </thead>
            <tbody>
              ${verifiedList.map(item => `
                <tr>
                  <td style="font-family: var(--font-mono); font-weight: 600;">${item.id}</td>
                  <td>${item.asset}</td>
                  <td><span class="ttp-tag">${item.ttp}</span></td>
                  <td>${(item.confidenceScore * 100).toFixed(1)}%</td>
                  <td style="color: var(--text-muted);">${item.patchStatus}</td>
                  <td>
                    <span style="color: var(--color-primary); display: flex; align-items: center; gap: 0.3rem; font-weight: 600;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      Verified Blocked
                    </span>
                  </td>
                  <td>
                    <span style="background: rgba(16, 185, 129, 0.15); color: var(--color-primary); padding: 3px 8px; border-radius: 4px; font-weight: 600;">
                      CLOSED & RESOLVED
                    </span>
                  </td>
                </tr>
              `).join('')}
              <tr>
                <td style="font-family: var(--font-mono); font-weight: 600;">VULN-2026-7910</td>
                <td>auth-jwt-verifier.svc</td>
                <td><span class="ttp-tag">T1550 - Use Alternate Auth</span></td>
                <td>99.9%</td>
                <td style="color: var(--text-muted);">Rotated RSA Keys & Patched Library</td>
                <td><span style="color: var(--color-primary); font-weight: 600;">Verified Blocked</span></td>
                <td><span style="background: rgba(16, 185, 129, 0.15); color: var(--color-primary); padding: 3px 8px; border-radius: 4px; font-weight: 600;">CLOSED & RESOLVED</span></td>
              </tr>
              <tr>
                <td style="font-family: var(--font-mono); font-weight: 600;">VULN-2026-7911</td>
                <td>redis-cache-cluster.internal</td>
                <td><span class="ttp-tag">T1210 - Exploitation of Remote Service</span></td>
                <td>99.8%</td>
                <td style="color: var(--text-muted);">Enforced TLS 1.3 & ACL Rules</td>
                <td><span style="color: var(--color-primary); font-weight: 600;">Verified Blocked</span></td>
                <td><span style="background: rgba(16, 185, 129, 0.15); color: var(--color-primary); padding: 3px 8px; border-radius: 4px; font-weight: 600;">CLOSED & RESOLVED</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderLogs() {
    const el = document.getElementById('terminal-feed');
    if (!el) return;
    el.innerHTML = state.logs.map(log => `
      <div class="log-line">
        <span class="log-time">[${log.time}]</span>
        <span class="log-${log.type}">${log.text}</span>
      </div>
    `).join('');
    el.scrollTop = 0;
  }

  function renderApp() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    let bodyContent = '';
    if (state.activeTab === 'architecture') {
      bodyContent = renderArchitectureSection() + renderPipelineTab();
    } else if (state.activeTab === 'pipeline') {
      bodyContent = renderPipelineTab();
    } else if (state.activeTab === 'report') {
      bodyContent = renderReportTab();
    }

    appEl.innerHTML = `
      ${renderHeader()}
      <main>
        <div class="dashboard-controls">
          <div class="tab-group">
            <button class="tab-btn ${state.activeTab === 'architecture' ? 'active' : ''}" onclick="switchTab('architecture')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              Architecture & Telemetry
            </button>
            <button class="tab-btn ${state.activeTab === 'report' ? 'active' : ''}" onclick="switchTab('report')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              Zero-Unsolved Executive Report
            </button>
          </div>
          <div class="sim-controls">
            <button class="btn-sim" onclick="injectNewThreat()">+ Inject Simulated Threat</button>
            <button class="btn-redteam" style="width: auto; padding: 0.6rem 1rem;" onclick="triggerSelfRedTeam()">🔥 Run Self-Attack</button>
          </div>
        </div>

        ${bodyContent}
      </main>
    `;
  }

  // Initial Boot
  document.addEventListener('DOMContentLoaded', () => {
    recalculateStats();
    renderApp();
  });
})();
