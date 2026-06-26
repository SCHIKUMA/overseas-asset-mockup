/* 海外資産管理サポート v0.1 - 画面遷移・ダミーデータ */

const SERVICES = [
  {
    id: 'bd-securities',
    name: 'バングラデシュ証券口座開設サポート',
    country: 'バングラデシュ',
    type: '証券口座開設',
    period: '約4〜8週間',
    fee: '55,000円（税込）',
    docs: 'パスポート、住所確認書類 他2点',
    institution: 'Dhaka Securities Ltd.',
    overview: 'バングラデシュの証券会社における口座開設手続きをサポートします。必要書類の案内、提出フォーマットの確認、海外金融機関への書類提出代行、進捗管理を行います。',
    support: ['口座開設に必要な書類リストの提供', '書類フォーマット・記入方法の案内', '海外金融機関への書類提出サポート', '審査状況の進捗確認・連絡', '開設完了後の送金手続き案内'],
    requiredDocs: ['パスポート（有効期限内）', '住所確認書類（発行3ヶ月以内）', 'マイナンバー関連書類', '銀行口座情報（通帳コピー等）', '自己資金の原資確認書類'],
    notices: ['当社は投資助言を行いません', '金融商品の購入判断はお客様自身で行います', '口座開設や送金の可否は海外金融機関の審査により決定されます']
  },
  {
    id: 'kz-securities',
    name: 'カザフスタン証券口座開設サポート',
    country: 'カザフスタン',
    type: '証券口座開設',
    period: '約6〜10週間',
    fee: '65,000円（税込）',
    docs: 'パスポート、住所確認書類 他3点',
    institution: 'Kazakhstan Stock Exchange 提携証券会社',
    overview: 'カザフスタンの証券口座開設に関する手続き支援サービスです。現地金融機関の要件に沿った書類準備から、申込進捗の管理まで一貫してサポートします。',
    support: ['現地金融機関の口座開設要件の案内', '必要書類の翻訳・公証に関する情報提供', '申込書類の確認・提出サポート', '審査ステータスの定期報告', '口座開設後の送金ルート案内'],
    requiredDocs: ['パスポート（公証付きコピー推奨）', '住所確認書類', 'マイナンバー関連書類', '銀行口座情報', '在留カード（コピー）', '追加：原資確認書類'],
    notices: ['当社は投資助言を行いません', '金融商品の購入判断はお客様自身で行います', '口座開設や送金の可否は海外金融機関の審査により決定されます']
  },
  {
    id: 'kh-bank',
    name: 'カンボジア銀行口座開設サポート',
    country: 'カンボジア',
    type: '銀行口座開設',
    period: '約3〜6週間',
    fee: '45,000円（税込）',
    docs: 'パスポート、住所確認書類 他2点',
    institution: 'ACLEDA Bank',
    overview: 'カンボジアのACLEDA Bankにおける銀行口座開設手続きをサポートします。口座開設に必要な書類の準備支援、現地金融機関とのやり取り、進捗管理を提供します。',
    support: ['口座開設申込書類の案内・確認', '現地銀行への書類提出サポート', '審査進捗のモニタリング', '口座開設完了の連絡', '海外送金手続きの案内'],
    requiredDocs: ['パスポート', '住所確認書類', 'マイナンバー関連書類', '銀行口座情報（日本国内）'],
    notices: ['当社は投資助言を行いません', '金融商品の購入判断はお客様自身で行います', '口座開設や送金の可否は海外金融機関の審査により決定されます']
  },
  {
    id: 'overseas-deposit',
    name: '海外定期預金紹介サポート',
    country: '複数国',
    type: '定期預金手続き支援',
    period: '約2〜4週間',
    fee: '35,000円（税込）',
    docs: 'パスポート、住所確認書類 他2点',
    institution: '提携海外金融機関（複数）',
    overview: '海外金融機関の定期預金口座開設に関する手続き支援サービスです。対象金融機関の選定はお客様ご自身で行い、当社は手続きに必要な書類準備と進捗管理をサポートします。',
    support: ['対象金融機関の口座開設要件案内', '必要書類チェックリストの提供', '書類提出・審査進捗の管理', '口座開設後の送金手続きサポート', '手続きに関する問い合わせ対応'],
    requiredDocs: ['パスポート', '住所確認書類', 'マイナンバー関連書類', '銀行口座情報', '資金原資に関する確認書類'],
    notices: ['当社は投資助言を行いません', '金融商品の購入判断はお客様自身で行います', '口座開設や送金の可否は海外金融機関の審査により決定されます']
  }
];

const DOCUMENTS = [
  { id: 'passport', name: 'パスポート', desc: '有効期限内のパスポート（顔写真ページ）', status: '承認済' },
  { id: 'address', name: '住所確認書類', desc: '公共料金領収書・住民票等（発行3ヶ月以内）', status: '確認中' },
  { id: 'mynumber', name: 'マイナンバー関連書類', desc: 'マイナンバーカードまたは通知カード', status: '未提出' },
  { id: 'bank', name: '銀行口座情報', desc: '通帳コピーまたは銀行発行の口座証明書', status: '未提出' },
  { id: 'other', name: 'その他追加書類', desc: '原資確認書類等（必要に応じて）', status: '未提出' }
];

const TIMELINE = [
  { title: '申込受付', desc: 'サポート申込を受け付けました', date: '2026/06/01 10:30', status: 'done' },
  { title: '書類確認中', desc: '提出書類を確認しています', date: '2026/06/03 14:00', status: 'done' },
  { title: '海外金融機関へ提出済', desc: 'ACLEDA Bankへ書類を提出しました', date: '2026/06/10 11:20', status: 'done' },
  { title: '海外金融機関審査中', desc: '現地金融機関にて審査を実施中です', date: '2026/06/15 09:00', status: 'active' },
  { title: '口座開設完了', desc: '審査完了後、口座開設のご連絡をいたします', date: '—', status: 'pending' },
  { title: '送金手続き待ち', desc: '口座開設後、送金手続きの案内を行います', date: '—', status: 'pending' }
];

const ADMIN_APPLICATIONS = [
  { id: 'APP-2026-0042', name: '山田 太郎', country: 'カンボジア', type: '銀行口座開設', status: '審査中', assignee: '佐藤', updated: '2026/06/25' },
  { id: 'APP-2026-0041', name: '鈴木 花子', country: 'バングラデシュ', type: '証券口座開設', status: '書類確認中', assignee: '田中', updated: '2026/06/24' },
  { id: 'APP-2026-0040', name: '田中 一郎', country: 'カザフスタン', type: '証券口座開設', status: '対応中', assignee: '佐藤', updated: '2026/06/23' },
  { id: 'APP-2026-0039', name: '伊藤 美咲', country: '複数国', type: '定期預金手続き支援', status: '口座開設完了', assignee: '山本', updated: '2026/06/20' },
  { id: 'APP-2026-0038', name: '渡辺 健太', country: 'カンボジア', type: '銀行口座開設', status: '書類確認待ち', assignee: '田中', updated: '2026/06/18' },
  { id: 'APP-2026-0037', name: '中村 さくら', country: 'バングラデシュ', type: '証券口座開設', status: '申込受付', assignee: '未割当', updated: '2026/06/15' }
];

const INSTITUTIONS = [
  { name: 'ACLEDA Bank', country: 'カンボジア', type: '銀行口座開設', contact: 'Sok Pisey', langs: '英語・クメール語', docs: 'パスポート、住所確認書類', status: 'active' },
  { name: 'Dhaka Securities Ltd.', country: 'バングラデシュ', type: '証券口座開設', contact: 'Rahim Khan', langs: '英語・ベンガル語', docs: 'パスポート、原資確認書類 他', status: 'active' },
  { name: 'Kazakhstan Stock Exchange 提携証券会社', country: 'カザフスタン', type: '証券口座開設', contact: 'Aidar Nur', langs: '英語・ロシア語・カザフ語', docs: 'パスポート（公証付き）、在留カード', status: 'pending' },
  { name: '提携海外金融機関（定期預金）', country: '複数国', type: '定期預金手続き支援', contact: '—', langs: '英語', docs: 'パスポート、銀行口座情報', status: 'active' },
  { name: 'Phnom Penh Commercial Bank', country: 'カンボジア', type: '銀行口座開設', contact: '—', langs: '英語・クメール語', docs: 'パスポート、住所確認書類', status: 'inactive' }
];

const USER_NAV = [
  { id: 'user-dashboard', icon: 'fa-gauge-high', label: 'ダッシュボード' },
  { id: 'service-list', icon: 'fa-list', label: 'サービス一覧' },
  { id: 'application-status', icon: 'fa-clock-rotate-left', label: '申込状況' },
  { id: 'documents', icon: 'fa-file-lines', label: '必要書類' },
  { id: 'transfer-support', icon: 'fa-money-bill-transfer', label: '送金サポート' },
  { id: 'transaction-history', icon: 'fa-receipt', label: '取引履歴' }
];

const ADMIN_NAV = [
  { id: 'admin-dashboard', icon: 'fa-gauge-high', label: 'ダッシュボード' },
  { id: 'admin-applications', icon: 'fa-clipboard-list', label: '申込管理' },
  { id: 'admin-documents', icon: 'fa-file-circle-check', label: '書類確認' },
  { id: 'admin-institutions', icon: 'fa-building-columns', label: '金融機関管理' }
];

let currentRole = 'user';
let currentView = 'user-dashboard';
let currentServiceId = null;
let applicationStep = 1;

const VIEW_TITLES = {
  'user-dashboard': 'ダッシュボード',
  'service-list': 'サービス一覧',
  'service-detail': 'サービス詳細',
  'application-flow': 'サポート申込',
  'documents': '必要書類',
  'application-status': '申込状況・進捗確認',
  'transfer-support': '送金サポート',
  'transaction-history': '取引履歴',
  'admin-dashboard': '管理者ダッシュボード',
  'admin-applications': '申込管理',
  'admin-documents': '書類確認',
  'admin-institutions': '金融機関管理'
};

function statusBadge(status) {
  const map = {
    '未提出': 'badge-gray', '確認中': 'badge-amber', '承認済': 'badge-green', '差戻し': 'badge-red',
    '申込受付': 'badge-blue', '書類確認中': 'badge-amber', '書類確認待ち': 'badge-amber',
    '対応中': 'badge-blue', '審査中': 'badge-amber', '口座開設完了': 'badge-green'
  };
  return `<span class="badge ${map[status] || 'badge-gray'}">${status}</span>`;
}

function institutionStatus(status) {
  const labels = { active: '連携中', pending: '審査中', inactive: '非アクティブ' };
  return `<span class="status-dot ${status}"></span>${labels[status]}`;
}

function renderNav() {
  const nav = document.getElementById('sidebar-nav');
  const items = currentRole === 'user' ? USER_NAV : ADMIN_NAV;
  nav.innerHTML = `<div class="nav-section-title">${currentRole === 'user' ? 'ユーザーメニュー' : '管理者メニュー'}</div>` +
    items.map(item => `
      <button class="nav-item ${currentView === item.id ? 'active' : ''}" data-view="${item.id}">
        <i class="fa-solid ${item.icon}"></i> ${item.label}
      </button>
    `).join('');
  nav.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.view));
  });
}

function navigateTo(viewId, opts = {}) {
  if (opts.serviceId) currentServiceId = opts.serviceId;
  if (opts.step) applicationStep = opts.step;
  currentView = viewId;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('view-' + viewId);
  if (el) el.classList.add('active');
  document.getElementById('header-title').textContent = VIEW_TITLES[viewId] || '';
  renderNav();
  renderCurrentView();
}

function renderCurrentView() {
  switch (currentView) {
    case 'service-list': renderServiceList(); break;
    case 'service-detail': renderServiceDetail(); break;
    case 'application-flow': renderApplicationFlow(); break;
    case 'documents': renderDocuments(); break;
    case 'application-status': renderTimeline(); break;
    case 'admin-applications': renderAdminApplications(); break;
    case 'admin-documents': renderAdminDocuments(); break;
    case 'admin-institutions': renderAdminInstitutions(); break;
  }
}

function renderServiceList() {
  const grid = document.getElementById('service-grid');
  if (!grid) return;
  grid.innerHTML = SERVICES.map(s => `
    <div class="service-card">
      <div class="service-card-header">
        <div>
          <span class="country-badge"><i class="fa-solid fa-globe"></i> ${s.country}</span>
          <h3>${s.name}</h3>
        </div>
      </div>
      <div class="service-type">${s.type}</div>
      <div class="service-meta">
        <div class="meta-item"><span class="label">想定期間</span><span class="value">${s.period}</span></div>
        <div class="meta-item"><span class="label">サポート手数料</span><span class="value">${s.fee}</span></div>
        <div class="meta-item" style="grid-column:1/-1"><span class="label">必要書類の目安</span><span class="value">${s.docs}</span></div>
      </div>
      <button class="btn btn-outline btn-sm" onclick="navigateTo('service-detail', {serviceId:'${s.id}'})">詳細を見る</button>
    </div>
  `).join('');
}

function renderServiceDetail() {
  const s = SERVICES.find(x => x.id === currentServiceId) || SERVICES[0];
  currentServiceId = s.id;
  const el = document.getElementById('service-detail-content');
  if (!el) return;
  el.innerHTML = `
    <div class="breadcrumb"><a onclick="navigateTo('service-list')">サービス一覧</a> &gt; ${s.name}</div>
    <div class="card">
      <div class="card-header"><h2>${s.name}</h2><span class="country-badge"><i class="fa-solid fa-globe"></i> ${s.country}</span></div>
      <div class="card-body">
        <div class="detail-section"><h3>サービス概要</h3><p>${s.overview}</p></div>
        <div class="grid-2">
          <div class="detail-section"><h3>対象国</h3><p>${s.country}</p></div>
          <div class="detail-section"><h3>対象金融機関</h3><p>${s.institution}</p></div>
        </div>
        <div class="detail-section"><h3>サポート内容</h3><ul>${s.support.map(x => `<li>${x}</li>`).join('')}</ul></div>
        <div class="detail-section"><h3>必要書類</h3><ul>${s.requiredDocs.map(x => `<li>${x}</li>`).join('')}</ul></div>
        <div class="detail-section"><h3>サポート手数料・期間</h3><p>${s.fee} ／ 想定期間：${s.period}</p></div>
        <div class="notice-box">
          <h4><i class="fa-solid fa-triangle-exclamation"></i> 注意事項</h4>
          <ul>${s.notices.map(x => `<li>${x}</li>`).join('')}</ul>
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" onclick="navigateTo('application-flow', {serviceId:'${s.id}', step:1})"><i class="fa-solid fa-pen-to-square"></i> このサービスに申し込む</button>
          <button class="btn btn-secondary" onclick="navigateTo('service-list')">一覧に戻る</button>
        </div>
      </div>
    </div>
  `;
}

function renderStepsBar(step) {
  const steps = ['サービス選択', 'お客様情報確認', '必要書類アップロード', '申込内容確認', '申込完了'];
  return `<div class="steps-bar">${steps.map((label, i) => {
    const n = i + 1;
    let cls = '';
    if (n < step) cls = 'done';
    else if (n === step) cls = 'active';
    return `<div class="step-item ${cls}"><div class="step-circle">${n < step ? '<i class="fa-solid fa-check"></i>' : n}</div><span class="step-label">${label}</span></div>`;
  }).join('')}</div>`;
}

function renderApplicationFlow() {
  const s = SERVICES.find(x => x.id === currentServiceId) || SERVICES[2];
  const el = document.getElementById('application-flow-content');
  if (!el) return;

  let body = '';
  if (applicationStep === 1) {
    body = `
      <h3 style="margin-bottom:16px;font-size:15px;">Step 1：サービス選択</h3>
      <p style="color:var(--gray-500);margin-bottom:16px;font-size:13px;">申し込むサービスを確認してください。</p>
      <table class="confirm-table">
        <tr><th>サービス名</th><td>${s.name}</td></tr>
        <tr><th>対象国</th><td>${s.country}</td></tr>
        <tr><th>サービス種別</th><td>${s.type}</td></tr>
        <tr><th>サポート手数料</th><td>${s.fee}</td></tr>
      </table>
      <div class="btn-group" style="margin-top:24px">
        <button class="btn btn-primary" onclick="applicationStep=2;renderApplicationFlow()">次へ</button>
        <button class="btn btn-secondary" onclick="navigateTo('service-list')">サービスを変更</button>
      </div>`;
  } else if (applicationStep === 2) {
    body = `
      <h3 style="margin-bottom:16px;font-size:15px;">Step 2：お客様情報確認</h3>
      <div class="form-row">
        <div class="form-group"><label>お名前</label><input type="text" value="山田 太郎" readonly></div>
        <div class="form-group"><label>メールアドレス</label><input type="text" value="yamada@example.com" readonly></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>電話番号</label><input type="text" value="090-1234-5678" readonly></div>
        <div class="form-group"><label>bitwallet会員ID</label><input type="text" value="BW-2024-00891" readonly></div>
      </div>
      <div class="form-group"><label>住所</label><input type="text" value="東京都渋谷区〇〇 1-2-3" readonly></div>
      <p style="font-size:12px;color:var(--gray-500);margin-top:8px;">※ 登録情報はbitwalletアカウントから取得しています。変更が必要な場合はアカウント設定から更新してください。</p>
      <div class="btn-group" style="margin-top:24px">
        <button class="btn btn-secondary" onclick="applicationStep=1;renderApplicationFlow()">戻る</button>
        <button class="btn btn-primary" onclick="applicationStep=3;renderApplicationFlow()">次へ</button>
      </div>`;
  } else if (applicationStep === 3) {
    body = `
      <h3 style="margin-bottom:16px;font-size:15px;">Step 3：必要書類アップロード</h3>
      <p style="color:var(--gray-500);margin-bottom:16px;font-size:13px;">以下の書類をアップロードしてください。</p>
      <div class="doc-list">${DOCUMENTS.map(d => `
        <div class="doc-item">
          <div class="doc-info">
            <div class="doc-icon"><i class="fa-solid fa-file"></i></div>
            <div><div class="doc-name">${d.name}</div><div class="doc-desc">${d.desc}</div></div>
          </div>
          <div class="doc-actions">${statusBadge(d.status)}<div class="upload-zone"><i class="fa-solid fa-cloud-arrow-up"></i> 選択</div></div>
        </div>`).join('')}
      </div>
      <div class="btn-group" style="margin-top:24px">
        <button class="btn btn-secondary" onclick="applicationStep=2;renderApplicationFlow()">戻る</button>
        <button class="btn btn-primary" onclick="applicationStep=4;renderApplicationFlow()">次へ</button>
      </div>`;
  } else if (applicationStep === 4) {
    body = `
      <h3 style="margin-bottom:16px;font-size:15px;">Step 4：サポート申込内容確認</h3>
      <table class="confirm-table">
        <tr><th>サービス名</th><td>${s.name}</td></tr>
        <tr><th>お客様名</th><td>山田 太郎</td></tr>
        <tr><th>対象国</th><td>${s.country}</td></tr>
        <tr><th>対象金融機関</th><td>${s.institution}</td></tr>
        <tr><th>サポート手数料</th><td>${s.fee}</td></tr>
        <tr><th>提出書類</th><td>パスポート（承認済）、住所確認書類（確認中）、他3点（未提出）</td></tr>
      </table>
      <div class="notice-box" style="margin-top:16px">
        <h4>ご確認ください</h4>
        <ul>
          <li>当社は投資助言を行いません</li>
          <li>金融商品の購入判断はお客様自身で行います</li>
          <li>口座開設や送金の可否は海外金融機関の審査により決定されます</li>
        </ul>
      </div>
      <div class="btn-group" style="margin-top:24px">
        <button class="btn btn-secondary" onclick="applicationStep=3;renderApplicationFlow()">戻る</button>
        <button class="btn btn-primary" onclick="applicationStep=5;renderApplicationFlow()"><i class="fa-solid fa-paper-plane"></i> 申し込む</button>
      </div>`;
  } else {
    body = `
      <div class="complete-box">
        <div class="complete-icon"><i class="fa-solid fa-check"></i></div>
        <h2>申込が完了しました</h2>
        <p>申込ID：<strong>APP-2026-0043</strong><br>サポート担当者より2営業日以内にご連絡いたします。</p>
        <div class="btn-group" style="justify-content:center">
          <button class="btn btn-primary" onclick="navigateTo('application-status')">申込状況を確認</button>
          <button class="btn btn-secondary" onclick="navigateTo('user-dashboard')">ダッシュボードへ</button>
        </div>
      </div>`;
  }

  el.innerHTML = renderStepsBar(applicationStep) + `<div class="step-content">${body}</div>`;
}

function renderDocuments() {
  const el = document.getElementById('documents-content');
  if (!el) return;
  el.innerHTML = `
    <div class="info-banner"><i class="fa-solid fa-circle-info"></i> 申込案件：カンボジア銀行口座開設サポート（APP-2026-0042）</div>
    <div class="card"><div class="card-header"><h2>提出書類一覧</h2></div><div class="card-body"><div class="doc-list">
      ${DOCUMENTS.map(d => `
        <div class="doc-item">
          <div class="doc-info">
            <div class="doc-icon"><i class="fa-solid fa-file"></i></div>
            <div><div class="doc-name">${d.name}</div><div class="doc-desc">${d.desc}</div></div>
          </div>
          <div class="doc-actions">${statusBadge(d.status)}<div class="upload-zone"><i class="fa-solid fa-cloud-arrow-up"></i> アップロード</div></div>
        </div>`).join('')}
    </div></div></div>`;
}

function renderTimeline() {
  const el = document.getElementById('timeline-content');
  if (!el) return;
  el.innerHTML = `
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h2>申込情報</h2>${statusBadge('審査中')}</div>
        <div class="card-body">
          <table class="confirm-table">
            <tr><th>申込ID</th><td>APP-2026-0042</td></tr>
            <tr><th>サービス</th><td>カンボジア銀行口座開設サポート</td></tr>
            <tr><th>対象金融機関</th><td>ACLEDA Bank</td></tr>
            <tr><th>申込日</th><td>2026/06/01</td></tr>
            <tr><th>担当者</th><td>佐藤</td></tr>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h2>進捗タイムライン</h2></div>
        <div class="card-body">
          <div class="timeline">
            ${TIMELINE.map(t => `
              <div class="timeline-item ${t.status === 'done' ? 'done' : t.status === 'active' ? 'active' : ''}">
                <div class="timeline-dot"></div>
                <div class="timeline-date">${t.date}</div>
                <div class="timeline-title">${t.title}</div>
                <div class="timeline-desc">${t.desc}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function renderAdminApplications() {
  const tbody = document.getElementById('admin-applications-tbody');
  if (!tbody) return;
  tbody.innerHTML = ADMIN_APPLICATIONS.map(a => `
    <tr>
      <td><strong>${a.id}</strong></td>
      <td>${a.name}</td>
      <td>${a.country}</td>
      <td>${a.type}</td>
      <td>${statusBadge(a.status)}</td>
      <td>${a.assignee}</td>
      <td>${a.updated}</td>
      <td><button class="btn btn-outline btn-sm" onclick="navigateTo('admin-documents')">詳細</button></td>
    </tr>`).join('');
}

function renderAdminDocuments() {
  const el = document.getElementById('admin-documents-content');
  if (!el) return;
  el.innerHTML = `
    <div class="review-layout">
      <div class="card"><div class="card-header"><h2>顧客一覧</h2></div><div class="card-body" style="padding:8px">
        <div class="customer-list-item active"><div class="name">山田 太郎</div><div class="sub">APP-2026-0042 ／ カンボジア</div></div>
        <div class="customer-list-item"><div class="name">鈴木 花子</div><div class="sub">APP-2026-0041 ／ バングラデシュ</div></div>
        <div class="customer-list-item"><div class="name">渡辺 健太</div><div class="sub">APP-2026-0038 ／ カンボジア</div></div>
      </div></div>
      <div class="card">
        <div class="card-header"><h2>山田 太郎 — 提出書類確認</h2><span class="badge badge-amber">書類確認中</span></div>
        <div class="card-body">
          ${DOCUMENTS.map(d => `
            <div class="review-doc-row">
              <div><strong>${d.name}</strong><div style="font-size:11px;color:var(--gray-500)">${d.desc}</div></div>
              <div style="display:flex;gap:8px;align-items:center">
                <select class="status-select"><option ${d.status==='未提出'?'selected':''}>未提出</option><option ${d.status==='確認中'?'selected':''}>確認中</option><option ${d.status==='承認済'?'selected':''}>承認済</option><option ${d.status==='差戻し'?'selected':''}>差戻し</option></select>
                <button class="btn btn-outline btn-sm">プレビュー</button>
              </div>
            </div>`).join('')}
          <div class="form-group" style="margin-top:16px"><label>差戻し理由</label><textarea class="memo-area" placeholder="差戻しの場合、理由を入力してください"></textarea></div>
          <div class="form-group"><label>管理者メモ</label><textarea class="memo-area" placeholder="内部メモ（顧客には表示されません）">パスポートは承認済。住所確認書類は発行日を確認中。</textarea></div>
          <div class="btn-group" style="margin-top:16px">
            <button class="btn btn-primary"><i class="fa-solid fa-bell"></i> 顧客へ通知</button>
            <button class="btn btn-success">変更を保存</button>
          </div>
        </div>
      </div>
    </div>`;
}

function renderAdminInstitutions() {
  const tbody = document.getElementById('admin-institutions-tbody');
  if (!tbody) return;
  tbody.innerHTML = INSTITUTIONS.map(i => `
    <tr>
      <td><strong>${i.name}</strong></td>
      <td>${i.country}</td>
      <td>${i.type}</td>
      <td>${i.contact}</td>
      <td>${i.langs}</td>
      <td>${i.docs}</td>
      <td>${institutionStatus(i.status)}</td>
      <td><button class="btn btn-outline btn-sm">編集</button></td>
    </tr>`).join('');
}

function switchRole(role) {
  currentRole = role;
  document.querySelectorAll('.role-tab').forEach(t => t.classList.toggle('active', t.dataset.role === role));
  const userEl = document.getElementById('header-username');
  const avatarEl = document.querySelector('.user-avatar');
  if (role === 'admin') {
    userEl.textContent = '管理者：佐藤';
    avatarEl.textContent = '佐';
  } else {
    userEl.textContent = '山田 太郎 様';
    avatarEl.textContent = '山';
  }
  navigateTo(role === 'user' ? 'user-dashboard' : 'admin-dashboard');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.role-tab').forEach(tab => {
    tab.addEventListener('click', () => switchRole(tab.dataset.role));
  });
  renderNav();
  renderCurrentView();
});

window.navigateTo = navigateTo;
