/* 海外資産管理サポート v0.2 — 画面遷移・ダミーデータ
 * ------------------------------------------------------------------
 * 画面の追加方法（これだけで完結します）:
 *   1. SCREENS に { title, nav?, render? } を1エントリ追加
 *   2. 描画が必要なら render 関数を実装
 *   3. ホストHTMLに <div class="view" id="view-<id>"> の器を追加
 *   ※ switch文・タイトル表・ナビ配列の編集は不要
 *
 * 設計メモ:
 *   - 状態は state オブジェクトに集約
 *   - 画面遷移/操作は data-* 属性 + イベント委譲（インラインonclickは不使用）
 *   - 動的値は必ず esc() を通して挿入（実データ投入時のXSS対策）
 *   - 繰り返すマークアップは下部のコンポーネント関数に集約
 * ================================================================== */

/* ============================================================
 * 共通文言・データ
 * ========================================================== */

const COMMON_NOTICES = [
  '当社は投資助言を行いません',
  '金融商品の購入判断はお客様自身で行います',
  '口座開設や送金の可否は海外金融機関の審査により決定されます'
];

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
    notices: COMMON_NOTICES
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
    notices: COMMON_NOTICES
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
    notices: COMMON_NOTICES
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
    notices: COMMON_NOTICES
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

/* 「現在ログイン中のユーザー / 進行中の申込」— 実API接続時はここだけ差し替える */
const CURRENT_USER = {
  name: '山田 太郎',
  email: 'yamada@example.com',
  tel: '090-1234-5678',
  bitwallet: 'BW-2024-00891',
  address: '東京都渋谷区〇〇 1-2-3'
};

const CURRENT_APP = {
  id: 'APP-2026-0043',          // 申込完了時に発番される想定のID
  trackingId: 'APP-2026-0042',  // 進捗確認中の既存案件
  service: 'カンボジア銀行口座開設サポート',
  institution: 'ACLEDA Bank',
  appliedAt: '2026/06/01',
  assignee: '佐藤'
};

/* ============================================================
 * 状態
 * ========================================================== */

const state = {
  role: 'user',           // 'user' | 'admin'
  view: 'user-dashboard',
  serviceId: null,
  step: 1
};

/* ============================================================
 * 汎用ヘルパー
 * ========================================================== */

/** innerHTML へ挿し込む動的値は必ずこれを通す（XSS / 表示崩れ対策） */
const esc = (v) => String(v ?? '').replace(/[&<>"']/g,
  (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** id を持つ要素へ HTML を流し込む（要素が無ければ何もしない） */
function mount(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/* ============================================================
 * 再利用コンポーネント（マークアップの単一情報源）
 * ========================================================== */

function statusBadge(status) {
  const map = {
    '未提出': 'badge-gray', '確認中': 'badge-amber', '承認済': 'badge-green', '差戻し': 'badge-red',
    '申込受付': 'badge-blue', '書類確認中': 'badge-amber', '書類確認待ち': 'badge-amber',
    '対応中': 'badge-blue', '審査中': 'badge-amber', '口座開設完了': 'badge-green'
  };
  return `<span class="badge ${map[status] || 'badge-gray'}">${esc(status)}</span>`;
}

function institutionStatus(status) {
  const labels = { active: '連携中', pending: '審査中', inactive: '非アクティブ' };
  return `<span class="status-dot ${esc(status)}"></span>${esc(labels[status] || status)}`;
}

/** [ラベル, 値] の配列から confirm-table を生成（値はテキストとして安全に挿入） */
function kvTable(rows) {
  return `<table class="confirm-table">${rows
    .map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`)
    .join('')}</table>`;
}

/** 文字列配列から <ul><li>…</li></ul> を生成 */
function bulletList(items) {
  return `<ul>${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
}

/** 書類リスト（必要書類画面・申込フローStep3で共用） */
function docList(docs, uploadLabel) {
  return `<div class="doc-list">${docs.map((d) => `
    <div class="doc-item">
      <div class="doc-info">
        <div class="doc-icon"><i class="fa-solid fa-file"></i></div>
        <div><div class="doc-name">${esc(d.name)}</div><div class="doc-desc">${esc(d.desc)}</div></div>
      </div>
      <div class="doc-actions">${statusBadge(d.status)}<div class="upload-zone"><i class="fa-solid fa-cloud-arrow-up"></i> ${esc(uploadLabel)}</div></div>
    </div>`).join('')}</div>`;
}

/* ============================================================
 * 各画面の描画
 * ========================================================== */

function renderServiceList() {
  mount('service-grid', SERVICES.map((s) => `
    <div class="service-card">
      <div class="service-card-header">
        <div>
          <span class="country-badge"><i class="fa-solid fa-globe"></i> ${esc(s.country)}</span>
          <h3>${esc(s.name)}</h3>
        </div>
      </div>
      <div class="service-type">${esc(s.type)}</div>
      <div class="service-meta">
        <div class="meta-item"><span class="label">想定期間</span><span class="value">${esc(s.period)}</span></div>
        <div class="meta-item"><span class="label">サポート手数料</span><span class="value">${esc(s.fee)}</span></div>
        <div class="meta-item" style="grid-column:1/-1"><span class="label">必要書類の目安</span><span class="value">${esc(s.docs)}</span></div>
      </div>
      <button class="btn btn-outline btn-sm" data-view="service-detail" data-service="${esc(s.id)}">詳細を見る</button>
    </div>`).join(''));
}

function renderServiceDetail() {
  const s = SERVICES.find((x) => x.id === state.serviceId) || SERVICES[0];
  state.serviceId = s.id;
  mount('service-detail-content', `
    <div class="breadcrumb"><a data-view="service-list">サービス一覧</a> &gt; ${esc(s.name)}</div>
    <div class="card">
      <div class="card-header"><h2>${esc(s.name)}</h2><span class="country-badge"><i class="fa-solid fa-globe"></i> ${esc(s.country)}</span></div>
      <div class="card-body">
        <div class="detail-section"><h3>サービス概要</h3><p>${esc(s.overview)}</p></div>
        <div class="grid-2">
          <div class="detail-section"><h3>対象国</h3><p>${esc(s.country)}</p></div>
          <div class="detail-section"><h3>対象金融機関</h3><p>${esc(s.institution)}</p></div>
        </div>
        <div class="detail-section"><h3>サポート内容</h3>${bulletList(s.support)}</div>
        <div class="detail-section"><h3>必要書類</h3>${bulletList(s.requiredDocs)}</div>
        <div class="detail-section"><h3>サポート手数料・期間</h3><p>${esc(s.fee)} ／ 想定期間：${esc(s.period)}</p></div>
        <div class="notice-box">
          <h4><i class="fa-solid fa-triangle-exclamation"></i> 注意事項</h4>
          ${bulletList(s.notices)}
        </div>
        <div class="btn-group">
          <button class="btn btn-primary" data-view="application-flow" data-service="${esc(s.id)}" data-step="1"><i class="fa-solid fa-pen-to-square"></i> このサービスに申し込む</button>
          <button class="btn btn-secondary" data-view="service-list">一覧に戻る</button>
        </div>
      </div>
    </div>`);
}

function renderStepsBar(step) {
  const steps = ['サービス選択', 'お客様情報確認', '必要書類アップロード', '申込内容確認', '申込完了'];
  return `<div class="steps-bar">${steps.map((label, i) => {
    const n = i + 1;
    let cls = '';
    if (n < step) cls = 'done';
    else if (n === step) cls = 'active';
    return `<div class="step-item ${cls}"><div class="step-circle">${n < step ? '<i class="fa-solid fa-check"></i>' : n}</div><span class="step-label">${esc(label)}</span></div>`;
  }).join('')}</div>`;
}

/* 申込フローの各ステップ本文をデータ駆動で定義（ステップ追加はここに1関数足すだけ） */
const FLOW_STEPS = {
  1: (s) => `
    <h3 style="margin-bottom:16px;font-size:15px;">Step 1：サービス選択</h3>
    <p style="color:var(--gray-500);margin-bottom:16px;font-size:13px;">申し込むサービスを確認してください。</p>
    ${kvTable([
      ['サービス名', s.name],
      ['対象国', s.country],
      ['サービス種別', s.type],
      ['サポート手数料', s.fee]
    ])}
    <div class="btn-group" style="margin-top:24px">
      <button class="btn btn-primary" data-action="flow-step" data-step="2">次へ</button>
      <button class="btn btn-secondary" data-view="service-list">サービスを変更</button>
    </div>`,

  2: () => `
    <h3 style="margin-bottom:16px;font-size:15px;">Step 2：お客様情報確認</h3>
    <div class="form-row">
      <div class="form-group"><label>お名前</label><input type="text" value="${esc(CURRENT_USER.name)}" readonly></div>
      <div class="form-group"><label>メールアドレス</label><input type="text" value="${esc(CURRENT_USER.email)}" readonly></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>電話番号</label><input type="text" value="${esc(CURRENT_USER.tel)}" readonly></div>
      <div class="form-group"><label>bitwallet会員ID</label><input type="text" value="${esc(CURRENT_USER.bitwallet)}" readonly></div>
    </div>
    <div class="form-group"><label>住所</label><input type="text" value="${esc(CURRENT_USER.address)}" readonly></div>
    <p style="font-size:12px;color:var(--gray-500);margin-top:8px;">※ 登録情報はbitwalletアカウントから取得しています。変更が必要な場合はアカウント設定から更新してください。</p>
    <div class="btn-group" style="margin-top:24px">
      <button class="btn btn-secondary" data-action="flow-step" data-step="1">戻る</button>
      <button class="btn btn-primary" data-action="flow-step" data-step="3">次へ</button>
    </div>`,

  3: () => `
    <h3 style="margin-bottom:16px;font-size:15px;">Step 3：必要書類アップロード</h3>
    <p style="color:var(--gray-500);margin-bottom:16px;font-size:13px;">以下の書類をアップロードしてください。</p>
    ${docList(DOCUMENTS, '選択')}
    <div class="btn-group" style="margin-top:24px">
      <button class="btn btn-secondary" data-action="flow-step" data-step="2">戻る</button>
      <button class="btn btn-primary" data-action="flow-step" data-step="4">次へ</button>
    </div>`,

  4: (s) => `
    <h3 style="margin-bottom:16px;font-size:15px;">Step 4：サポート申込内容確認</h3>
    ${kvTable([
      ['サービス名', s.name],
      ['お客様名', CURRENT_USER.name],
      ['対象国', s.country],
      ['対象金融機関', s.institution],
      ['サポート手数料', s.fee],
      ['提出書類', 'パスポート（承認済）、住所確認書類（確認中）、他3点（未提出）']
    ])}
    <div class="notice-box" style="margin-top:16px">
      <h4>ご確認ください</h4>
      ${bulletList(COMMON_NOTICES)}
    </div>
    <div class="btn-group" style="margin-top:24px">
      <button class="btn btn-secondary" data-action="flow-step" data-step="3">戻る</button>
      <button class="btn btn-primary" data-action="flow-step" data-step="5"><i class="fa-solid fa-paper-plane"></i> 申し込む</button>
    </div>`,

  5: () => `
    <div class="complete-box">
      <div class="complete-icon"><i class="fa-solid fa-check"></i></div>
      <h2>申込が完了しました</h2>
      <p>申込ID：<strong>${esc(CURRENT_APP.id)}</strong><br>サポート担当者より2営業日以内にご連絡いたします。</p>
      <div class="btn-group" style="justify-content:center">
        <button class="btn btn-primary" data-view="application-status">申込状況を確認</button>
        <button class="btn btn-secondary" data-view="user-dashboard">ダッシュボードへ</button>
      </div>
    </div>`
};

function renderApplicationFlow() {
  const s = SERVICES.find((x) => x.id === state.serviceId) || SERVICES[2];
  const body = (FLOW_STEPS[state.step] || FLOW_STEPS[1])(s);
  mount('application-flow-content', renderStepsBar(state.step) + `<div class="step-content">${body}</div>`);
}

function renderDocuments() {
  mount('documents-content', `
    <div class="info-banner"><i class="fa-solid fa-circle-info"></i> 申込案件：${esc(CURRENT_APP.service)}（${esc(CURRENT_APP.trackingId)}）</div>
    <div class="card"><div class="card-header"><h2>提出書類一覧</h2></div><div class="card-body">
      ${docList(DOCUMENTS, 'アップロード')}
    </div></div>`);
}

function renderTimeline() {
  mount('timeline-content', `
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h2>申込情報</h2>${statusBadge('審査中')}</div>
        <div class="card-body">
          ${kvTable([
            ['申込ID', CURRENT_APP.trackingId],
            ['サービス', CURRENT_APP.service],
            ['対象金融機関', CURRENT_APP.institution],
            ['申込日', CURRENT_APP.appliedAt],
            ['担当者', CURRENT_APP.assignee]
          ])}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h2>進捗タイムライン</h2></div>
        <div class="card-body">
          <div class="timeline">
            ${TIMELINE.map((t) => `
              <div class="timeline-item ${t.status === 'done' ? 'done' : t.status === 'active' ? 'active' : ''}">
                <div class="timeline-dot"></div>
                <div class="timeline-date">${esc(t.date)}</div>
                <div class="timeline-title">${esc(t.title)}</div>
                <div class="timeline-desc">${esc(t.desc)}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`);
}

function renderAdminApplications() {
  mount('admin-applications-tbody', ADMIN_APPLICATIONS.map((a) => `
    <tr>
      <td><strong>${esc(a.id)}</strong></td>
      <td>${esc(a.name)}</td>
      <td>${esc(a.country)}</td>
      <td>${esc(a.type)}</td>
      <td>${statusBadge(a.status)}</td>
      <td>${esc(a.assignee)}</td>
      <td>${esc(a.updated)}</td>
      <td><button class="btn btn-outline btn-sm" data-view="admin-documents" data-app="${esc(a.id)}">詳細</button></td>
    </tr>`).join(''));
}

function renderAdminDocuments() {
  const selected = ADMIN_APPLICATIONS[0];
  // 顧客一覧は申込データから先頭数件を表示
  const customers = ADMIN_APPLICATIONS.slice(0, 3).map((a, i) => `
    <div class="customer-list-item ${i === 0 ? 'active' : ''}">
      <div class="name">${esc(a.name)}</div>
      <div class="sub">${esc(a.id)} ／ ${esc(a.country)}</div>
    </div>`).join('');

  const reviewRows = DOCUMENTS.map((d) => {
    const opts = ['未提出', '確認中', '承認済', '差戻し']
      .map((o) => `<option ${d.status === o ? 'selected' : ''}>${esc(o)}</option>`).join('');
    return `
      <div class="review-doc-row">
        <div><strong>${esc(d.name)}</strong><div style="font-size:11px;color:var(--gray-500)">${esc(d.desc)}</div></div>
        <div style="display:flex;gap:8px;align-items:center">
          <select class="status-select">${opts}</select>
          <button class="btn btn-outline btn-sm">プレビュー</button>
        </div>
      </div>`;
  }).join('');

  mount('admin-documents-content', `
    <div class="review-layout">
      <div class="card"><div class="card-header"><h2>顧客一覧</h2></div><div class="card-body" style="padding:8px">
        ${customers}
      </div></div>
      <div class="card">
        <div class="card-header"><h2>${esc(selected.name)} — 提出書類確認</h2><span class="badge badge-amber">書類確認中</span></div>
        <div class="card-body">
          ${reviewRows}
          <div class="form-group" style="margin-top:16px"><label>差戻し理由</label><textarea class="memo-area" placeholder="差戻しの場合、理由を入力してください"></textarea></div>
          <div class="form-group"><label>管理者メモ</label><textarea class="memo-area" placeholder="内部メモ（顧客には表示されません）">パスポートは承認済。住所確認書類は発行日を確認中。</textarea></div>
          <div class="btn-group" style="margin-top:16px">
            <button class="btn btn-primary"><i class="fa-solid fa-bell"></i> 顧客へ通知</button>
            <button class="btn btn-success">変更を保存</button>
          </div>
        </div>
      </div>
    </div>`);
}

function renderAdminInstitutions() {
  mount('admin-institutions-tbody', INSTITUTIONS.map((i) => `
    <tr>
      <td><strong>${esc(i.name)}</strong></td>
      <td>${esc(i.country)}</td>
      <td>${esc(i.type)}</td>
      <td>${esc(i.contact)}</td>
      <td>${esc(i.langs)}</td>
      <td>${esc(i.docs)}</td>
      <td>${institutionStatus(i.status)}</td>
      <td><button class="btn btn-outline btn-sm">編集</button></td>
    </tr>`).join(''));
}

/* ============================================================
 * 画面レジストリ（タイトル・ナビ・描画関数を1か所に集約）
 *   nav が無い画面 = サイドメニューに出ない画面
 *   render が無い画面 = 静的HTMLのみで描画する画面（ダッシュボード等）
 * ========================================================== */

const SCREENS = {
  'user-dashboard':      { title: 'ダッシュボード',           nav: { role: 'user',  icon: 'fa-gauge-high',         label: 'ダッシュボード' } },
  'service-list':        { title: 'サービス一覧',             nav: { role: 'user',  icon: 'fa-list',               label: 'サービス一覧' },   render: renderServiceList },
  'service-detail':      { title: 'サービス詳細',                                                                                              render: renderServiceDetail },
  'application-flow':    { title: 'サポート申込',                                                                                              render: renderApplicationFlow },
  'application-status':  { title: '申込状況・進捗確認',         nav: { role: 'user',  icon: 'fa-clock-rotate-left',  label: '申込状況' },        render: renderTimeline },
  'documents':           { title: '必要書類',                 nav: { role: 'user',  icon: 'fa-file-lines',         label: '必要書類' },        render: renderDocuments },
  'transfer-support':    { title: '送金サポート',             nav: { role: 'user',  icon: 'fa-money-bill-transfer', label: '送金サポート' } },
  'transaction-history': { title: '取引履歴',                 nav: { role: 'user',  icon: 'fa-receipt',            label: '取引履歴' } },
  'admin-dashboard':     { title: '管理者ダッシュボード',       nav: { role: 'admin', icon: 'fa-gauge-high',         label: 'ダッシュボード' } },
  'admin-applications':  { title: '申込管理',                 nav: { role: 'admin', icon: 'fa-clipboard-list',     label: '申込管理' },        render: renderAdminApplications },
  'admin-documents':     { title: '書類確認',                 nav: { role: 'admin', icon: 'fa-file-circle-check',  label: '書類確認' },        render: renderAdminDocuments },
  'admin-institutions':  { title: '金融機関管理',             nav: { role: 'admin', icon: 'fa-building-columns',   label: '金融機関管理' },    render: renderAdminInstitutions }
};

/* ============================================================
 * ルーター / ナビゲーション
 * ========================================================== */

function renderNav() {
  const items = Object.entries(SCREENS).filter(([, def]) => def.nav && def.nav.role === state.role);
  mount('sidebar-nav',
    `<div class="nav-section-title">${state.role === 'user' ? 'ユーザーメニュー' : '管理者メニュー'}</div>` +
    items.map(([id, def]) => `
      <button class="nav-item ${state.view === id ? 'active' : ''}" data-view="${esc(id)}">
        <i class="fa-solid ${esc(def.nav.icon)}"></i> ${esc(def.nav.label)}
      </button>`).join(''));
}

function navigateTo(viewId, opts = {}) {
  if (!SCREENS[viewId]) return;
  if (opts.serviceId) state.serviceId = opts.serviceId;
  if (opts.step) state.step = opts.step;
  state.view = viewId;

  document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
  document.getElementById('view-' + viewId)?.classList.add('active');

  const titleEl = document.getElementById('header-title');
  if (titleEl) titleEl.textContent = SCREENS[viewId].title || '';

  renderNav();
  renderCurrentView();
}

function renderCurrentView() {
  SCREENS[state.view]?.render?.();
}

function switchRole(role) {
  state.role = role;
  document.querySelectorAll('.role-tab').forEach((t) => t.classList.toggle('active', t.dataset.role === role));
  const userEl = document.getElementById('header-username');
  const avatarEl = document.querySelector('.user-avatar');
  if (role === 'admin') {
    if (userEl) userEl.textContent = '管理者：佐藤';
    if (avatarEl) avatarEl.textContent = '佐';
  } else {
    if (userEl) userEl.textContent = '山田 太郎 様';
    if (avatarEl) avatarEl.textContent = '山';
  }
  navigateTo(role === 'user' ? 'user-dashboard' : 'admin-dashboard');
}

/* ============================================================
 * イベント委譲（インラインonclickの代わり）
 *   data-role        … ロール切替タブ
 *   data-action="flow-step" + data-step … 申込フローのステップ移動
 *   data-view (+ data-service / data-step) … 画面遷移
 * ========================================================== */

function handleClick(e) {
  const trg = e.target.closest('[data-role],[data-action],[data-view]');
  if (!trg) return;

  if (trg.dataset.role) {
    switchRole(trg.dataset.role);
    return;
  }
  if (trg.dataset.action === 'flow-step') {
    state.step = Number(trg.dataset.step);
    renderApplicationFlow();
    return;
  }
  if (trg.dataset.view) {
    navigateTo(trg.dataset.view, {
      serviceId: trg.dataset.service,
      step: trg.dataset.step ? Number(trg.dataset.step) : undefined
    });
  }
}

/* ============================================================
 * 初期化
 * ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', handleClick);
  renderNav();
  renderCurrentView();
});

/* 静的HTML（ダッシュボード等）からの呼び出し互換のため公開。
 * 新規マークアップでは data-view 属性を使ってください。 */
window.navigateTo = navigateTo;
