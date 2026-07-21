import './style.css';

const SHEET_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT3IcmnuxB0Lmud5okOAH1G5FINjRY78JMeNq9M41mNsgyD56AwaG1fOnV7fGoU6r15-qz29WG-tS8z/pub?output=csv';

const icons = {
  grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
  receipt: '<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  wallet: '<svg viewBox="0 0 24 24"><path d="M4 6h15a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h12"/><path d="M15 11h6v5h-6a2.5 2.5 0 0 1 0-5Z"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V21h-4v-.08a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3v-4h.08a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3h4v.08a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.55 1H21v4h-.08a1.7 1.7 0 0 0-1.55 1Z"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  more: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>'
  ,lock: '<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>'
};

document.querySelector('#app').innerHTML = `
  <div class="app-loader" id="appLoader" role="status" aria-label="Loading Expensio">
    <div class="loader-brand"><span class="loader-mark">E</span><div class="loader-word">${[...'expensio'].map((letter, i) => `<span style="--i:${i}">${letter}</span>`).join('')}</div></div>
    <div class="loader-track"><i></i></div><p>Preparing your workspace</p>
  </div>
  <aside class="sidebar" id="sidebar">
    <div class="brand"><span class="brand-mark">E</span><span>expensio</span></div>
    <button class="close-menu icon-btn" id="closeMenu" aria-label="Close menu">${icons.x}</button>
    <nav>
      <p class="nav-label">WORKSPACE</p>
      <a href="#overview" class="nav-item" data-view="overview"><i>${icons.grid}</i><span>Overview</span></a>
      <a href="#expenses" class="nav-item active" data-view="expenses"><i>${icons.receipt}</i><span>Expense report</span><b>01</b></a>
      <a href="#" class="nav-item locked" aria-disabled="true" data-tooltip="Coming soon"><i>${icons.chart}</i><span>Analytics</span><b class="nav-lock">${icons.lock}</b></a>
      <a href="#" class="nav-item locked" aria-disabled="true" data-tooltip="Coming soon"><i>${icons.wallet}</i><span>Budgets</span><b class="nav-lock">${icons.lock}</b></a>
      <p class="nav-label manage">MANAGE</p>
      <a href="#" class="nav-item"><i>${icons.settings}</i><span>Settings</span></a>
    </nav>
    <div class="sidebar-foot">
      <div class="storage-head"><span>Monthly budget</span><strong id="budgetPercent">—</strong></div>
      <div class="progress"><span id="budgetBar"></span></div>
      <p id="budgetText">Calculating spend...</p>
    </div>
  </aside>
  <div class="sidebar-backdrop" id="backdrop"></div>
  <main>
    <header class="topbar">
      <button class="menu-btn icon-btn" id="menuBtn" aria-label="Open menu">${icons.menu}</button>
      <div class="global-search"><i>${icons.search}</i><input id="globalSearch" placeholder="Search expenses..." /></div>
      <div class="top-actions">
        <span class="synced"><i></i> Live data</span>
        <button class="icon-btn bell" aria-label="Notifications">${icons.bell}<b></b></button>
        <div class="avatar">JC</div>
      </div>
    </header>

    <div class="content">
      <section class="page-heading">
        <div><p class="eyebrow" id="breadcrumb">FINANCE / EXPENSES</p><h1 id="pageTitle">Expense report</h1><p id="pageSubtitle">Track, review and manage all company spending in one place.</p></div>
        <div class="heading-actions"><button class="export-button" id="exportBtn">Export CSV</button></div>
      </section>

      <section class="date-toolbar">
        <div class="date-presets" id="datePresets"><button data-range="today">Today</button><button data-range="7">Last 7 days</button><button data-range="30">Last 30 days</button><button data-range="all" class="active">All time</button><button data-range="custom">${icons.calendar} Custom</button></div>
        <div class="custom-dates" id="customDates"><label>From <input type="date" id="dateFrom"></label><label>To <input type="date" id="dateTo"></label><button id="applyCustom">Apply</button></div>
      </section>

      <section class="stats expense-view" id="stats">
        <article class="stat-card hero-stat"><div><span>Total expenses</span><strong id="totalSpend">—</strong><p id="totalCompare">All recorded transactions</p></div><div class="mini-chart" id="miniChart"></div></article>
        <article class="stat-card"><span>Paid</span><strong id="paidSpend">—</strong><div class="stat-foot"><span class="status-dot paid"></span><p id="paidCount">Loading...</p></div></article>
        <article class="stat-card"><span>Outstanding</span><strong id="unpaidSpend">—</strong><div class="stat-foot"><span class="status-dot unpaid"></span><p id="unpaidCount">Loading...</p></div></article>
        <article class="stat-card"><span>Transactions</span><strong id="transactionCount">—</strong><div class="stat-foot"><span class="trend">↗</span><p id="categoryCount">Loading...</p></div></article>
      </section>

      <section class="overview-view" id="overviewView">
        <div class="overview-grid">
          <article class="chart-card category-chart"><div class="chart-heading"><div><span>SPENDING BREAKDOWN</span><h2>Expenses by category</h2><small id="categoryCompare"></small></div><strong id="categoryTotal">—</strong></div><div class="donut-area"><div class="donut" id="categoryDonut"><div><strong>—</strong><span>Total</span></div></div><div class="legend" id="categoryLegend"></div></div></article>
          <article class="chart-card status-chart"><div class="chart-heading"><div><span>PAYMENT HEALTH</span><h2>Payment status</h2><small id="statusCompare"></small></div></div><div class="status-visual"><div class="status-ring" id="statusRing"><div><strong>—</strong><span>paid</span></div></div><div class="status-summary" id="statusSummary"></div></div></article>
          <article class="chart-card activity-chart"><div class="chart-heading"><div><span>ACTIVITY</span><h2>Spending trend</h2><small id="activityCompare"></small></div><strong id="activityTotal">—</strong></div><div class="bar-chart" id="barChart"></div></article>
          <article class="chart-card top-chart"><div class="chart-heading"><div><span>TOP CATEGORIES</span><h2>Where the money goes</h2></div></div><div class="rank-list" id="rankList"></div></article>
        </div>
      </section>

      <section class="report-card expense-view">
        <div class="report-head"><div><h2>All expenses</h2><p id="recordLabel">Connecting to spreadsheet...</p></div><div class="table-controls"><div class="table-search"><i>${icons.search}</i><input id="tableSearch" placeholder="Search records" /></div><select id="statusFilter" aria-label="Filter by status"><option value="all">All statuses</option><option value="paid">Paid</option><option value="unpaid">Unpaid</option></select></div></div>
        <div class="table-wrap">
          <table><thead><tr><th>Transaction</th><th>Date</th><th>Details</th><th>Price</th><th>AED value</th><th>Status</th><th>Type</th><th></th></tr></thead><tbody id="expenseRows"><tr><td colspan="8"><div class="loader"><span></span>Loading spreadsheet data...</div></td></tr></tbody></table>
        </div>
        <div class="pagination"><p id="pageInfo">—</p><div><button id="prevPage">←</button><span id="pageButtons"></span><button id="nextPage">→</button></div></div>
      </section>
      <footer><span class="powered-by">Powered by <strong>Velara Capitals</strong></span><span>•</span> Last refreshed <b id="refreshedAt">just now</b></footer>
    </div>
  </main>
  <div class="toast" id="toast">CSV exported successfully</div>
  <aside class="detail-popover" id="detailPopover" aria-hidden="true"></aside>
`;

let expenses = [];
let filtered = [];
let page = 1;
let activeRange = 'all';
const pageSize = 8;

function parseCSV(text) {
  const rows = []; let row = []; let field = ''; let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') { if (quoted && text[i + 1] === '"') { field += '"'; i++; } else quoted = !quoted; }
    else if (char === ',' && !quoted) { row.push(field); field = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) { if (char === '\r' && text[i + 1] === '\n') i++; row.push(field); if (row.some(Boolean)) rows.push(row); row = []; field = ''; }
    else field += char;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift().map(h => h.trim());
  return rows.map(values => Object.fromEntries(headers.map((h, i) => [h, values[i] || ''])));
}

const aedValue = (value) => Number(String(value).replace(/[^\d.-]/g, '')) || 0;
const money = (value) => new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(value);
const formatDate = (date) => date ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${date}T00:00:00`)) : '—';
const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const displayName = (key) => key.split('|')[0].split('-').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ');
const initials = (key) => key.split('|')[0].split('-').slice(0, 2).map(x => x[0]?.toUpperCase()).join('');

function normalize(row) {
  return {
    key: row['Transaction Key'], email: row['Email ID'], date: row.Date, due: row.Due,
    details: row.Details, price: row.Price, aed: row['Convert to AED'],
    status: row.Status.toLowerCase(), type: row.Type
  };
}

function renderStats() {
  const rows = filtered.length || activeRange !== 'all' ? filtered : expenses;
  const total = rows.reduce((s, e) => s + aedValue(e.aed), 0);
  const paid = rows.filter(e => e.status === 'paid');
  const unpaid = rows.filter(e => e.status === 'unpaid');
  const paidTotal = paid.reduce((s, e) => s + aedValue(e.aed), 0);
  const unpaidTotal = unpaid.reduce((s, e) => s + aedValue(e.aed), 0);
  document.querySelector('#totalSpend').textContent = money(total);
  document.querySelector('#paidSpend').textContent = money(paidTotal);
  document.querySelector('#unpaidSpend').textContent = money(unpaidTotal);
  document.querySelector('#transactionCount').textContent = rows.length;
  document.querySelector('#paidCount').textContent = `${paid.length} completed payments`;
  document.querySelector('#unpaidCount').textContent = `${unpaid.length} awaiting payment`;
  document.querySelector('#categoryCount').textContent = `${new Set(rows.map(e => e.type)).size} expense categories`;
  const pct = total ? Math.round(paidTotal / total * 100) : 0;
  document.querySelector('#budgetPercent').textContent = `${pct}%`;
  document.querySelector('#budgetBar').style.width = `${Math.min(pct, 100)}%`;
  document.querySelector('#budgetText').textContent = `${money(paidTotal)} processed`;
  const comparison = getComparisonRows();
  const previousTotal = comparison.previous.reduce((s,e) => s + aedValue(e.aed), 0);
  const previousPaid = comparison.previous.filter(e => e.status === 'paid').reduce((s,e) => s + aedValue(e.aed), 0);
  const previousUnpaid = comparison.previous.filter(e => e.status === 'unpaid').reduce((s,e) => s + aedValue(e.aed), 0);
  document.querySelector('#totalCompare').innerHTML = comparisonText(comparison.current.reduce((s,e) => s + aedValue(e.aed), 0), previousTotal);
  document.querySelector('#paidCount').innerHTML = `${comparisonText(paidTotal, previousPaid)} · ${paid.length} payments`;
  document.querySelector('#unpaidCount').innerHTML = `${comparisonText(unpaidTotal, previousUnpaid)} · ${unpaid.length} outstanding`;
  document.querySelector('#categoryCount').innerHTML = `${comparisonText(comparison.current.length, comparison.previous.length)} · ${new Set(rows.map(e => e.type)).size} categories`;
  const recent = [...rows].slice(-14).map(e => aedValue(e.aed));
  const max = Math.max(...recent, 1);
  document.querySelector('#miniChart').innerHTML = recent.map((v, i) => `<span style="height:${Math.max(12, v / max * 66)}px;opacity:${.35 + i / recent.length * .65}"></span>`).join('');
}

function applyFilters() {
  const query = document.querySelector('#tableSearch').value.toLowerCase().trim();
  const status = document.querySelector('#statusFilter').value;
  filtered = expenses.filter(e => inDateRange(e.date) && (status === 'all' || e.status === status) && (!query || Object.values(e).join(' ').toLowerCase().includes(query)));
  page = 1; renderStats(); renderTable(); renderOverview();
}

function inDateRange(dateString) {
  if (activeRange === 'all') return true;
  const date = new Date(`${dateString}T00:00:00`);
  let from; let to = new Date(); to.setHours(23,59,59,999);
  if (activeRange === 'custom') {
    const fromValue = document.querySelector('#dateFrom').value;
    const toValue = document.querySelector('#dateTo').value;
    if (!fromValue && !toValue) return true;
    from = fromValue ? new Date(`${fromValue}T00:00:00`) : new Date('1970-01-01');
    to = toValue ? new Date(`${toValue}T23:59:59`) : to;
  } else {
    from = new Date(); from.setHours(0,0,0,0); from.setDate(from.getDate() - (activeRange === 'today' ? 0 : Number(activeRange) - 1));
  }
  return date >= from && date <= to;
}

function getComparisonRows() {
  const dates = expenses.map(e => new Date(`${e.date}T00:00:00`)).filter(d => !Number.isNaN(d)).sort((a,b) => a-b);
  if (!dates.length) return { current: [], previous: [], label: 'vs previous period' };
  let currentFrom; let currentTo; let previousFrom; let previousTo;
  const day = 86400000;
  if (activeRange === 'all') {
    const min = dates[0]; const max = dates.at(-1); const span = Math.max(day, max - min + day); const half = Math.ceil(span / 2 / day) * day;
    currentTo = new Date(max.getTime() + day - 1); currentFrom = new Date(currentTo.getTime() - half + 1);
    previousTo = new Date(currentFrom.getTime() - 1); previousFrom = new Date(previousTo.getTime() - half + 1);
  } else if (activeRange === 'custom') {
    currentFrom = new Date(`${document.querySelector('#dateFrom').value || '1970-01-01'}T00:00:00`);
    currentTo = new Date(`${document.querySelector('#dateTo').value || new Date().toISOString().slice(0,10)}T23:59:59`);
    const span = currentTo - currentFrom + 1; previousTo = new Date(currentFrom.getTime() - 1); previousFrom = new Date(previousTo.getTime() - span + 1);
  } else {
    const days = activeRange === 'today' ? 1 : Number(activeRange);
    currentTo = new Date(); currentTo.setHours(23,59,59,999); currentFrom = new Date(); currentFrom.setHours(0,0,0,0); currentFrom.setDate(currentFrom.getDate() - days + 1);
    previousTo = new Date(currentFrom.getTime() - 1); previousFrom = new Date(previousTo.getTime() - days * day + 1);
  }
  const query = document.querySelector('#tableSearch').value.toLowerCase().trim(); const status = document.querySelector('#statusFilter').value;
  const matches = e => (status === 'all' || e.status === status) && (!query || Object.values(e).join(' ').toLowerCase().includes(query));
  const between = (e,a,b) => { const d = new Date(`${e.date}T00:00:00`); return d >= a && d <= b && matches(e); };
  return { current: expenses.filter(e => between(e,currentFrom,currentTo)), previous: expenses.filter(e => between(e,previousFrom,previousTo)), label: activeRange === 'all' ? 'recent half vs prior half' : 'vs previous period' };
}

function comparisonText(current, previous, compact = false) {
  if (!previous) return '<span class="compare neutral">No prior data</span>';
  const change = Math.round((current - previous) / previous * 100); const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';
  const value = Math.abs(change) > 999 ? '>999%' : `${Math.abs(change)}%`;
  return `<span class="compare ${direction}">${change > 0 ? '↑' : change < 0 ? '↓' : '—'} ${value}${compact ? '' : ' vs prior'}</span>`;
}

function smoothPath(points) {
  if (!points.length) return ''; if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  return points.slice(1).reduce((path, point, i) => { const prev = points[i]; const mid = (prev.x + point.x) / 2; return `${path} C ${mid} ${prev.y}, ${mid} ${point.y}, ${point.x} ${point.y}`; }, `M ${points[0].x} ${points[0].y}`);
}

const chartColors = ['#174f3b','#8bb945','#d8a44e','#7199a5','#8a78a6','#d4775d','#4d7c6a','#b2b86b'];
function renderOverview() {
  const comparison = getComparisonRows();
  const total = filtered.reduce((sum, e) => sum + aedValue(e.aed), 0);
  const groups = Object.entries(filtered.reduce((acc, e) => { acc[e.type] = (acc[e.type] || 0) + aedValue(e.aed); return acc; }, {})).sort((a,b) => b[1] - a[1]);
  let cursor = 0;
  const stops = groups.slice(0, 8).flatMap(([_, value], i) => {
    const start = cursor; cursor += total ? value / total * 100 : 0;
    const gap = cursor - start > 2 ? .45 : .12;
    return [`#ffffff ${start}% ${start + gap}%`, `${chartColors[i]} ${start + gap}% ${Math.max(start + gap, cursor - gap)}%`, `#ffffff ${Math.max(start + gap, cursor - gap)}% ${cursor}%`];
  });
  const donut = document.querySelector('#categoryDonut');
  donut.style.background = stops.length ? `conic-gradient(${stops.join(',')})` : '#edf0ed';
  donut.innerHTML = `<div><strong>${money(total)}</strong><span>Total</span></div>`;
  document.querySelector('#categoryTotal').textContent = `${groups.length} categories`;
  const currentCompareTotal = comparison.current.reduce((s,e) => s + aedValue(e.aed), 0); const previousCompareTotal = comparison.previous.reduce((s,e) => s + aedValue(e.aed), 0);
  document.querySelector('#categoryCompare').innerHTML = `${comparisonText(currentCompareTotal, previousCompareTotal, true)} <em>${comparison.label}</em>`;
  document.querySelector('#categoryLegend').innerHTML = groups.slice(0, 6).map(([name,value],i) => `<div><i style="background:${chartColors[i]}"></i><span>${escapeHTML(name)}</span><strong>${Math.round(value / (total || 1) * 100)}%</strong></div>`).join('') || '<p class="no-chart-data">No data in this period</p>';
  const paid = filtered.filter(e => e.status === 'paid').reduce((s,e) => s + aedValue(e.aed), 0);
  const paidPct = Math.round(paid / (total || 1) * 100);
  document.querySelector('#statusRing').style.background = `conic-gradient(#75aa4f 0 ${Math.max(0,paidPct-.6)}%, #fff ${Math.max(0,paidPct-.6)}% ${Math.min(100,paidPct+.6)}%, #f0b467 ${Math.min(100,paidPct+.6)}% 99.4%, #fff 99.4% 100%)`;
  document.querySelector('#statusRing').innerHTML = `<div><strong>${paidPct}%</strong><span>paid</span></div>`;
  document.querySelector('#statusSummary').innerHTML = `<div><i class="paid"></i><span>Paid</span><strong>${money(paid)}</strong></div><div><i class="unpaid"></i><span>Outstanding</span><strong>${money(total-paid)}</strong></div>`;
  const previousPaid = comparison.previous.filter(e => e.status === 'paid').reduce((s,e) => s + aedValue(e.aed), 0); const previousAll = comparison.previous.reduce((s,e) => s + aedValue(e.aed), 0);
  document.querySelector('#statusCompare').innerHTML = `${comparisonText(paid / (total || 1), previousPaid / (previousAll || 1), true)} <em>paid share vs prior</em>`;
  const aggregate = rows => Object.entries(rows.reduce((acc,e) => { acc[e.date] = (acc[e.date] || 0) + aedValue(e.aed); return acc; }, {})).sort((a,b) => a[0].localeCompare(b[0])).slice(-12);
  const daily = aggregate(comparison.current); const previousDaily = aggregate(comparison.previous); const max = Math.max(...daily.map(x => x[1]), ...previousDaily.map(x => x[1]), 1);
  document.querySelector('#activityTotal').textContent = `${daily.length} active days`;
  document.querySelector('#activityCompare').innerHTML = `${comparisonText(currentCompareTotal, previousCompareTotal, true)} <em>${comparison.label}</em>`;
  if (daily.length || previousDaily.length) {
    const width = 640; const height = 168; const padX = 20; const padTop = 12; const padBottom = 25;
    const makePoints = data => data.map(([date,value], i) => ({ date, value, x: data.length === 1 ? width/2 : padX + i*((width-padX*2)/(data.length-1)), y: padTop+(1-value/max)*(height-padTop-padBottom) }));
    const points = makePoints(daily); const previousPoints = makePoints(previousDaily);
    const area = points.length ? `${smoothPath(points)} L ${points.at(-1).x} ${height-padBottom} L ${points[0].x} ${height-padBottom} Z` : '';
    document.querySelector('#barChart').innerHTML = `<div class="line-legend"><span><i></i>Current</span><span><i></i>Previous</span></div><svg class="area-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Current versus previous spending trend"><defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f8062" stop-opacity=".25"/><stop offset="1" stop-color="#3f8062" stop-opacity=".01"/></linearGradient></defs><g class="grid-lines"><line x1="${padX}" y1="${padTop}" x2="${width-padX}" y2="${padTop}"/><line x1="${padX}" y1="${(height-padBottom+padTop)/2}" x2="${width-padX}" y2="${(height-padBottom+padTop)/2}"/><line x1="${padX}" y1="${height-padBottom}" x2="${width-padX}" y2="${height-padBottom}"/></g>${area ? `<path class="area-fill" d="${area}"/>` : ''}${previousPoints.length ? `<path class="previous-line" d="${smoothPath(previousPoints)}"/>` : ''}${points.length ? `<path class="trend-line" d="${smoothPath(points)}"/>` : ''}${points.map(p => `<g class="point"><circle cx="${p.x}" cy="${p.y}" r="3.5"/><title>${formatDate(p.date)} · ${money(p.value)}</title></g>`).join('')}</svg><div class="x-axis-labels">${daily.map(([date]) => `<span>${new Date(`${date}T00:00:00`).getDate()}</span>`).join('')}</div>`;
  } else document.querySelector('#barChart').innerHTML = '<p class="no-chart-data">No activity in this period</p>';
  document.querySelector('#rankList').innerHTML = groups.slice(0,5).map(([name,value],i) => `<div><b>${i+1}</b><span>${escapeHTML(name)}<small>${money(value)}</small></span><div><i style="width:${value/(groups[0]?.[1] || 1)*100}%"></i></div></div>`).join('') || '<p class="no-chart-data">No categories in this period</p>';
}

function switchView(view) {
  document.body.dataset.view = view;
  document.querySelectorAll('[data-view]').forEach(link => link.classList.toggle('active', link.dataset.view === view));
  document.querySelector('#pageTitle').textContent = view === 'overview' ? 'Overview' : 'Expense report';
  document.querySelector('#breadcrumb').textContent = view === 'overview' ? 'FINANCE / OVERVIEW' : 'FINANCE / EXPENSES';
  document.querySelector('#pageSubtitle').textContent = view === 'overview' ? 'A clear view of spending, categories and payment health.' : 'Track, review and manage all company spending in one place.';
  document.querySelector('#exportBtn').style.display = view === 'overview' ? 'none' : '';
  document.body.classList.remove('menu-open'); renderOverview();
}

function renderTable() {
  const start = (page - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);
  const body = document.querySelector('#expenseRows');
  body.innerHTML = pageRows.length ? pageRows.map(e => `
    <tr>
      <td><div class="vendor"><span class="vendor-icon">${escapeHTML(initials(e.key))}</span><div><strong>${escapeHTML(displayName(e.key))}</strong><small>${escapeHTML(e.email)}</small></div></div></td>
      <td><span class="date-cell">${formatDate(e.date)}</span>${e.due ? `<small>Due ${formatDate(e.due)}</small>` : ''}</td>
      <td><button class="details-cell" data-expense-key="${encodeURIComponent(e.key)}">${escapeHTML(e.details)}</button></td>
      <td class="price">${escapeHTML(e.price)}</td>
      <td class="aed">${escapeHTML(e.aed)}</td>
      <td><span class="status ${e.status}"><i></i>${escapeHTML(e.status)}</span></td>
      <td><span class="type">${escapeHTML(e.type)}</span></td>
      <td><button class="more-btn" aria-label="More options">${icons.more}</button></td>
    </tr>`).join('') : '<tr><td colspan="8"><div class="empty-state">No matching expenses found.</div></td></tr>';
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  document.querySelector('#pageInfo').textContent = filtered.length ? `Showing ${start + 1}–${Math.min(start + pageSize, filtered.length)} of ${filtered.length}` : 'No records';
  document.querySelector('#recordLabel').textContent = `${filtered.length} expense records`;
  document.querySelector('#prevPage').disabled = page === 1;
  document.querySelector('#nextPage').disabled = page === pages;
  document.querySelector('#pageButtons').innerHTML = Array.from({length: Math.min(pages, 5)}, (_, i) => {
    let n = pages <= 5 ? i + 1 : Math.min(Math.max(page - 2, 1), pages - 4) + i;
    return `<button class="${n === page ? 'current' : ''}" data-page="${n}">${n}</button>`;
  }).join('');
}

function showDetailCard(trigger) {
  const expense = expenses.find(item => item.key === decodeURIComponent(trigger.dataset.expenseKey));
  if (!expense) return;
  const popover = document.querySelector('#detailPopover');
  popover.innerHTML = `<div class="popover-head"><div><span>TRANSACTION DETAILS</span><h3>${escapeHTML(displayName(expense.key))}</h3></div><span class="status ${expense.status}"><i></i>${escapeHTML(expense.status)}</span></div><p class="popover-description">${escapeHTML(expense.details)}</p><div class="popover-grid"><div><span>Transaction key</span><strong>${escapeHTML(expense.key)}</strong></div><div><span>Email ID</span><strong>${escapeHTML(expense.email)}</strong></div><div><span>Transaction date</span><strong>${formatDate(expense.date)}</strong></div><div><span>Due date</span><strong>${formatDate(expense.due)}</strong></div><div><span>Original price</span><strong>${escapeHTML(expense.price)}</strong></div><div><span>Converted value</span><strong>${escapeHTML(expense.aed)}</strong></div></div><div class="popover-foot"><span>${escapeHTML(expense.type)}</span><small>Google Sheets record</small></div>`;
  popover.classList.add('show'); popover.setAttribute('aria-hidden', 'false');
  const rect = trigger.getBoundingClientRect(); const width = popover.offsetWidth; const height = popover.offsetHeight; const gap = 10;
  let left = rect.left + Math.min(rect.width / 2, 80); let top = rect.bottom + gap;
  if (left + width > window.innerWidth - 12) left = window.innerWidth - width - 12;
  if (left < 12) left = 12;
  if (top + height > window.innerHeight - 12) top = rect.top - height - gap;
  popover.style.left = `${left}px`; popover.style.top = `${Math.max(12, top)}px`;
}

function hideDetailCard() {
  const popover = document.querySelector('#detailPopover'); popover.classList.remove('show'); popover.setAttribute('aria-hidden', 'true');
}

async function loadExpenses() {
  const startedAt = Date.now();
  try {
    const response = await fetch(SHEET_CSV, { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not load spreadsheet');
    expenses = parseCSV(await response.text()).map(normalize).filter(e => e.key);
    filtered = [...expenses]; renderStats(); renderTable(); renderOverview();
    document.querySelector('#refreshedAt').textContent = new Intl.DateTimeFormat('en', {hour:'numeric', minute:'2-digit'}).format(new Date());
  } catch (error) {
    document.querySelector('#expenseRows').innerHTML = `<tr><td colspan="8"><div class="empty-state error">Unable to reach the spreadsheet. Check the published link and refresh.</div></td></tr>`;
    document.querySelector('#recordLabel').textContent = 'Spreadsheet unavailable';
  } finally {
    const remaining = Math.max(0, 900 - (Date.now() - startedAt));
    setTimeout(() => { const loader = document.querySelector('#appLoader'); loader.classList.add('done'); setTimeout(() => loader.remove(), 500); }, remaining);
  }
}

document.querySelector('#tableSearch').addEventListener('input', applyFilters);
document.querySelector('#globalSearch').addEventListener('input', e => { document.querySelector('#tableSearch').value = e.target.value; applyFilters(); });
document.querySelector('#statusFilter').addEventListener('change', applyFilters);
document.querySelectorAll('.nav-item.locked').forEach(link => link.addEventListener('click', e => e.preventDefault()));
document.querySelector('#expenseRows').addEventListener('mouseover', e => { const trigger = e.target.closest('.details-cell'); if (trigger) showDetailCard(trigger); });
document.querySelector('#expenseRows').addEventListener('mouseout', e => { const trigger = e.target.closest('.details-cell'); if (trigger && !trigger.contains(e.relatedTarget)) hideDetailCard(); });
document.querySelector('#expenseRows').addEventListener('focusin', e => { const trigger = e.target.closest('.details-cell'); if (trigger) showDetailCard(trigger); });
document.querySelector('#expenseRows').addEventListener('focusout', hideDetailCard);
window.addEventListener('scroll', hideDetailCard, true);
document.querySelectorAll('[data-view]').forEach(link => link.addEventListener('click', e => { e.preventDefault(); switchView(link.dataset.view); }));
document.querySelector('#datePresets').addEventListener('click', e => {
  const button = e.target.closest('button[data-range]'); if (!button) return;
  const range = button.dataset.range; document.querySelector('#customDates').classList.toggle('show', range === 'custom');
  if (range !== 'custom') { activeRange = range; document.querySelectorAll('#datePresets button').forEach(b => b.classList.toggle('active', b === button)); applyFilters(); }
});
document.querySelector('#applyCustom').addEventListener('click', () => { activeRange = 'custom'; document.querySelectorAll('#datePresets button').forEach(b => b.classList.toggle('active', b.dataset.range === 'custom')); document.querySelector('#customDates').classList.remove('show'); applyFilters(); });
document.querySelector('#pageButtons').addEventListener('click', e => { if (e.target.dataset.page) { page = Number(e.target.dataset.page); renderTable(); } });
document.querySelector('#prevPage').addEventListener('click', () => { if (page > 1) { page--; renderTable(); } });
document.querySelector('#nextPage').addEventListener('click', () => { if (page < Math.ceil(filtered.length / pageSize)) { page++; renderTable(); } });
document.querySelector('#menuBtn').addEventListener('click', () => document.body.classList.add('menu-open'));
document.querySelector('#closeMenu').addEventListener('click', () => document.body.classList.remove('menu-open'));
document.querySelector('#backdrop').addEventListener('click', () => document.body.classList.remove('menu-open'));
document.querySelector('#exportBtn').addEventListener('click', () => {
  const link = document.createElement('a'); link.href = SHEET_CSV; link.download = 'expense-report.csv'; link.target = '_blank'; link.click();
  const toast = document.querySelector('#toast'); toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200);
});

loadExpenses();
