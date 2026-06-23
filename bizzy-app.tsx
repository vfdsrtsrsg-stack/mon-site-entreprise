import { useState } from "react";

const NAV = [
  { id: "home", label: "🏠 Home" },
  { id: "create", label: "🚀 Create" },
  { id: "manage", label: "📊 Manage" },
  { id: "money", label: "💰 Money" },
  { id: "legal", label: "⚖️ Legal" },
  { id: "tools", label: "🔧 Tools" },
];

const STRUCTURES = [
  { id: "ei", short: "EI", emoji: "👤", color: "#3B82F6", capital: "None", alone: true, kbis: false, desc: "Simplest form. You are the business. No capital needed, no Kbis.", best: "Freelancers, small trades" },
  { id: "sasu", short: "SASU", emoji: "🚀", color: "#8B5CF6", capital: "€1 min", alone: true, kbis: true, desc: "Solo company with employee status. Perfect if you want a salary and plan to grow.", best: "Ambitious solo founders" },
  { id: "eurl", short: "EURL", emoji: "🛡️", color: "#059669", capital: "€1 min", alone: true, kbis: true, desc: "Solo limited company. Lower social charges than SASU. Great for artisans.", best: "Artisans, stable income" },
  { id: "sarl", short: "SARL", emoji: "🤝", color: "#D97706", capital: "€1 min", alone: false, kbis: true, desc: "Classic company for 2–100 partners. Well-known by banks and clients.", best: "Family businesses, 2+ partners" },
  { id: "sas", short: "SAS", emoji: "📈", color: "#EC4899", capital: "€1 min", alone: false, kbis: true, desc: "Most flexible structure. All partners get employee status. Ideal for startups.", best: "Startups, fundraising" },
];

const CREATE_STEPS = [
  { num: 1, icon: "⚖️", title: "Pick your business type", desc: "Choose between EI, SASU, SARL, SAS… based on your situation. Solo or with partners? See the 'Create' tab.", links: [{ label: "Compare structures – BPI France", url: "https://bpifrance-creation.fr" }] },
  { num: 2, icon: "📝", title: "Write your articles", desc: "For companies (not EI), you need founding documents called 'statuts'. They define the rules of your business.", links: [{ label: "Free templates – Legalplace", url: "https://www.legalplace.fr" }] },
  { num: 3, icon: "🏦", title: "Deposit your capital", desc: "Open a business bank account and deposit your initial capital. You'll get a deposit certificate.", links: [{ label: "Shine – Online business account", url: "https://www.shine.fr", primary: true }, { label: "Qonto – Business account", url: "https://qonto.com/fr" }] },
  { num: 4, icon: "📰", title: "Publish a legal notice", desc: "Required for companies. Publish your creation notice in an approved journal (JAL). Cost: ~€150–200.", links: [{ label: "Infogreffe – Legal notices", url: "https://www.infogreffe.fr" }] },
  { num: 5, icon: "🖥️", title: "File on the Official Portal", desc: "Since 2023, everything is done online on the Guichet Unique. Free for EI, ~€50–70 for companies.", links: [{ label: "🔑 Guichet Unique (official)", url: "https://formalites.entreprises.gouv.fr", primary: true }] },
  { num: 6, icon: "📋", title: "Get your Kbis!", desc: "After 3–5 business days, your company is registered. Download your Kbis from Infogreffe.", links: [{ label: "📋 Download Kbis – Infogreffe", url: "https://www.infogreffe.fr/documents-officiels/demande-kbis.html", primary: true }] },
];

const MANAGE_TOPICS = [
  {
    id: "accounting",
    icon: "📒",
    title: "Accounting & Bookkeeping",
    color: "#3B82F6",
    short: "Track every euro in and out",
    content: [
      { label: "What you must do", text: "Record every transaction — sales, expenses, invoices paid, invoices received. This is mandatory by law and needed to calculate your taxes." },
      { label: "How often?", text: "Daily ideally, at least monthly. At the end of the year, you close your accounts (called 'clôture comptable') and file your annual report." },
      { label: "Tools to use", text: "Use accounting software like Pennylane, Indy, or Dext. They connect to your bank and automate most of the work." },
      { label: "Do you need an accountant?", text: "For companies (SASU, SARL…) yes — it's highly recommended and sometimes mandatory. Budget €100–300/month. For EI/auto-entrepreneur, you can do it yourself." },
    ],
    links: [{ label: "Pennylane – Accounting software", url: "https://www.pennylane.com/fr" }, { label: "Indy – Simple accounting", url: "https://www.indy.fr" }],
  },
  {
    id: "dividends",
    icon: "💸",
    title: "Dividends — How to Pay Yourself",
    color: "#8B5CF6",
    short: "Take profits out of your company",
    content: [
      { label: "What are dividends?", text: "When your company makes a profit, you can pay yourself some of that money as dividends — a distribution of profits to shareholders (you)." },
      { label: "When can you pay dividends?", text: "Once a year, after approving your annual accounts. You vote on the dividend amount in your annual general meeting (AGM)." },
      { label: "How are dividends taxed?", text: "In France, dividends are taxed at a flat rate of 30% (called 'flat tax' or PFU). This includes 12.8% income tax and 17.2% social contributions." },
      { label: "Dividends vs Salary — which is better?", text: "Salary = more charges but builds pension & unemployment rights. Dividends = less charges but no social protection. Most entrepreneurs mix both." },
      { label: "SARL/EURL exception", text: "For SARL/EURL, dividends above 10% of capital are subject to extra social charges. SASU/SAS dividends are not, which is a big advantage." },
    ],
    links: [{ label: "Flat tax explained – Impots.gouv", url: "https://www.impots.gouv.fr" }],
  },
  {
    id: "taxes",
    icon: "🧾",
    title: "Taxes — What You Owe",
    color: "#D97706",
    short: "Corporate tax, VAT, and more",
    content: [
      { label: "Corporate Tax (IS)", text: "Companies pay 25% tax on profits (15% for the first €42,500 if you qualify as a small business). This is called Impôt sur les Sociétés (IS)." },
      { label: "Income Tax (IR)", text: "If you chose IR instead of IS (possible for EI and some companies), your profits are taxed as personal income directly." },
      { label: "VAT (TVA)", text: "If you earn above €36,800/year (services) or €91,900/year (goods), you must collect and pay VAT (usually 20%). File monthly or quarterly." },
      { label: "CFE", text: "Cotisation Foncière des Entreprises — a local business tax paid every year in December. Varies by city and revenue." },
      { label: "Key deadlines", text: "Corporate tax: filed within 3 months after year-end. VAT: monthly or quarterly depending on your regime. CFE: December each year." },
    ],
    links: [{ label: "Business taxes – Impots.gouv", url: "https://www.impots.gouv.fr/professionnel" }],
  },
  {
    id: "payroll",
    icon: "👥",
    title: "Payroll & Social Charges",
    color: "#EC4899",
    short: "Pay yourself and your employees",
    content: [
      { label: "As a SASU/SAS president", text: "You are an 'assimilated employee'. You get a payslip, pay income tax and ~80% social charges on top of your gross salary. Example: €3,000 gross = ~€5,400 total cost." },
      { label: "As a SARL/EURL manager", text: "You have TNS status (non-salaried worker). You pay lower social charges (~45% of net income) but have less social protection." },
      { label: "Hiring employees", text: "Use DPAE (pre-hire declaration) on Net-Entreprises.fr before the employee starts. Then set up payroll monthly. You'll pay ~42% employer charges on gross salary." },
      { label: "Tools for payroll", text: "Use Payfit, Silae, or Gusto to automate payslips and social declarations. Costs ~€30–80/month per employee." },
    ],
    links: [{ label: "URSSAF – Social contributions", url: "https://www.urssaf.fr" }, { label: "Payfit – Payroll software", url: "https://payfit.com/fr" }],
  },
  {
    id: "invoices",
    icon: "🧾",
    title: "Invoicing — Get Paid Properly",
    color: "#059669",
    short: "Create legal invoices and track payments",
    content: [
      { label: "Mandatory info on every invoice", text: "Your name/company, SIRET number, client details, date, invoice number, description, price, VAT amount (if applicable), payment terms." },
      { label: "Invoice numbering", text: "Invoices must be numbered sequentially (no gaps). You cannot delete an invoice — only issue a credit note." },
      { label: "Payment terms", text: "By law, B2B payments must be made within 30 days (max 60 days). Late payments can be charged interest." },
      { label: "Tools to use", text: "Freebe, Zervant, or Pennylane let you create professional invoices in 30 seconds and track who has paid." },
    ],
    links: [{ label: "Zervant – Free invoicing", url: "https://www.zervant.com/fr" }, { label: "Freebe – For freelancers", url: "https://www.freebe.me" }],
  },
  {
    id: "annual",
    icon: "📅",
    title: "Annual Obligations",
    color: "#6B7280",
    short: "What you must do every year",
    content: [
      { label: "Annual accounts", text: "Every year, companies must close their accounts, prepare a balance sheet, income statement, and have them approved at an AGM (Assemblée Générale)." },
      { label: "File at Infogreffe", text: "Within 6 months of year-end, file your annual accounts at the Commercial Court Registry (Greffe). Cost: ~€40–100." },
      { label: "Annual General Meeting", text: "Even as a sole shareholder, you must hold a formal AGM each year to approve accounts and decide on dividends. Write and keep the minutes." },
      { label: "Update your Kbis", text: "If your address, manager, or capital changes, update your registration within 1 month on Guichet Unique." },
    ],
    links: [{ label: "File accounts – Infogreffe", url: "https://www.infogreffe.fr" }, { label: "Guichet Unique – Updates", url: "https://formalites.entreprises.gouv.fr" }],
  },
];

const MONEY_TIPS = [
  { icon: "💰", title: "Pay Yourself a Salary", text: "As president of SASU/SAS, set a monthly salary. Even a small one (€500–1,500) builds your rights. It must be voted on in your articles or board meeting.", color: "#3B82F6" },
  { icon: "📈", title: "Mix Salary + Dividends", text: "The smartest setup: small salary (to stay under taxes) + dividends at end of year. This optimizes your net income. An accountant can calculate the best split for you.", color: "#8B5CF6" },
  { icon: "🏦", title: "Keep a Cash Reserve", text: "Always keep 3–6 months of expenses in your business account. Taxes, VAT, and social charges can arrive unexpectedly. Never spend all your profits.", color: "#059669" },
  { icon: "📊", title: "Track Your Break-Even", text: "Know exactly how much you need to earn each month to cover all costs (salary, charges, rent, tools…). Below this = you're losing money.", color: "#D97706" },
  { icon: "💳", title: "Separate Personal & Business", text: "Never mix personal and business money. Use a dedicated business account. This protects you legally and simplifies your accounting.", color: "#EC4899" },
  { icon: "🧮", title: "Provision for Taxes", text: "Set aside 25–30% of every payment you receive. This covers corporate tax, VAT, and social charges when the bills arrive.", color: "#6B7280" },
];

const LEGAL_ITEMS = [
  { icon: "📋", title: "Keep your Kbis up to date", desc: "Update it within 1 month of any change (address, manager, capital). Do it on Guichet Unique.", url: "https://formalites.entreprises.gouv.fr" },
  { icon: "🔒", title: "GDPR — Protect user data", desc: "If you collect any personal data (emails, names…), you must have a privacy policy and register with CNIL.", url: "https://www.cnil.fr" },
  { icon: "📜", title: "Business insurance", desc: "Some activities require professional insurance (RC Pro). Check your sector's requirements.", url: "https://www.service-public.fr" },
  { icon: "🏷️", title: "Protect your brand", desc: "Register your brand name at INPI to prevent copies. Cost: ~€190 for 1 class of products/services.", url: "https://www.inpi.fr" },
  { icon: "📑", title: "Terms & Conditions", desc: "Every business selling online or to other businesses needs proper T&Cs (CGV). Required by French law.", url: "https://www.service-public.fr" },
  { icon: "⚠️", title: "Avoid common traps", desc: "Never mix personal/business money. Always sign contracts in your company name. Keep all receipts 10 years.", url: "https://bpifrance-creation.fr" },
];

const TOOLS = [
  { icon: "🏛️", name: "Guichet Unique", cat: "Creation", desc: "Create or update your company — official government portal", url: "https://formalites.entreprises.gouv.fr", tag: "FREE" },
  { icon: "📋", name: "Infogreffe", cat: "Kbis", desc: "Download your Kbis and file annual accounts", url: "https://www.infogreffe.fr", tag: "FREE" },
  { icon: "💼", name: "Shine", cat: "Banking", desc: "Business bank account made for entrepreneurs", url: "https://www.shine.fr", tag: "€8/mo" },
  { icon: "💳", name: "Qonto", cat: "Banking", desc: "Business account for startups and SMEs", url: "https://qonto.com/fr", tag: "€9/mo" },
  { icon: "📊", name: "Pennylane", cat: "Accounting", desc: "Accounting + invoicing all-in-one", url: "https://www.pennylane.com/fr", tag: "€47/mo" },
  { icon: "📒", name: "Indy", cat: "Accounting", desc: "Simple automated accounting for solo entrepreneurs", url: "https://www.indy.fr", tag: "Free plan" },
  { icon: "🧾", name: "Zervant", cat: "Invoicing", desc: "Create professional invoices for free", url: "https://www.zervant.com/fr", tag: "FREE" },
  { icon: "👥", name: "Payfit", cat: "Payroll", desc: "Automated payroll and payslips", url: "https://payfit.com/fr", tag: "€49/mo" },
  { icon: "⚖️", name: "Legalstart", cat: "Legal", desc: "Create your company online with help", url: "https://www.legalstart.fr", tag: "€149+" },
  { icon: "🔍", name: "Societe.com", cat: "Research", desc: "Look up any French company and get free Kbis", url: "https://www.societe.com", tag: "FREE" },
  { icon: "💰", name: "URSSAF", cat: "Social", desc: "Pay and manage your social contributions", url: "https://www.urssaf.fr", tag: "OFFICIAL" },
  { icon: "📈", name: "BPI France", cat: "Growth", desc: "Loans, grants, and support for French businesses", url: "https://bpifrance-creation.fr", tag: "OFFICIAL" },
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [openStep, setOpenStep] = useState(null);
  const [openTopic, setOpenTopic] = useState(null);
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [filterCat, setFilterCat] = useState("All");

  const cats = ["All", ...new Set(TOOLS.map((t) => t.cat))];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F0F4FF", minHeight: "100vh", color: "#1E2A4A" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { color: inherit; text-decoration: none; }
        .card { background: white; border-radius: 16px; padding: 22px; box-shadow: 0 2px 12px rgba(30,42,74,0.07); }
        .pill { display:inline-flex;align-items:center;gap:6px;background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;border-radius:8px;padding:6px 13px;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s; }
        .pill:hover { background:#DBEAFE; }
        .pill.p { background:#2563EB;color:white;border-color:#2563EB; }
        .pill.p:hover { background:#1D4ED8; }
        .nav-btn { padding:12px 16px;border:none;background:transparent;cursor:pointer;font-size:13px;font-weight:600;color:#6B7280;border-bottom:3px solid transparent;transition:all .15s;white-space:nowrap; }
        .nav-btn.active { color:#2563EB;border-bottom-color:#2563EB; }
        .nav-btn:hover { color:#1E2A4A; }
        .acc { border:1.5px solid #E5E7EB;border-radius:14px;overflow:hidden;background:white; }
        .acc-h { padding:16px 20px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:background .15s; }
        .acc-h:hover { background:#F8FAFF; }
        .acc-b { padding:0 20px 18px;font-size:14px;line-height:1.7;color:#4B5563; }
        .tag { font-size:10px;font-weight:700;letter-spacing:.07em;padding:2px 8px;border-radius:4px; }
        .cat-btn { padding:6px 14px;border-radius:20px;border:1.5px solid #E5E7EB;background:white;cursor:pointer;font-size:13px;font-weight:600;color:#6B7280;transition:all .15s; }
        .cat-btn.active { background:#2563EB;color:white;border-color:#2563EB; }
        .step-row { display:flex;gap:14px;padding:18px;border:1.5px solid #E5E7EB;border-radius:14px;background:white;cursor:pointer;transition:all .2s; }
        .step-row:hover,.step-row.open { border-color:#2563EB; }
        .step-num { width:34px;height:34px;border-radius:50%;background:#EFF6FF;color:#2563EB;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
        .step-row.open .step-num { background:#2563EB;color:white; }
        .hover-lift { transition:all .2s; }
        .hover-lift:hover { transform:translateY(-3px);box-shadow:0 8px 24px rgba(37,99,235,0.13); }
      `}</style>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#0F172A 0%,#1E3A8A 55%,#3B82F6 100%)", padding: "44px 20px 36px", color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -50, left: -50, width: 200, height: 200, background: "rgba(255,255,255,0.03)", borderRadius: "50%" }} />
        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 20, padding: "4px 14px", fontSize: 11, fontWeight: 700, marginBottom: 14, color: "white", letterSpacing: "0.06em" }}>
            🇫🇷 FOR FRENCH ENTREPRENEURS
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#93C5FD", textTransform: "uppercase", marginBottom: 8 }}>Your all-in-one business companion</div>
          <h1 style={{ fontSize: "clamp(26px,5.5vw,46px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 10, letterSpacing: "-0.025em" }}>
            Start & Run Your Business<br />
            <span style={{ color: "#93C5FD" }}>The Easy Way</span>
          </h1>
          <p style={{ fontSize: 15, opacity: 0.8, maxWidth: 480, lineHeight: 1.65, marginBottom: 28 }}>
            Create your company, get your Kbis, manage dividends, taxes, payroll, and stay legally compliant — all explained simply in one place.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="https://formalites.entreprises.gouv.fr" target="_blank" rel="noopener noreferrer">
              <button style={{ background: "white", color: "#1D4ED8", border: "none", padding: "12px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>🚀 Create My Company</button>
            </a>
            <a href="https://www.infogreffe.fr" target="_blank" rel="noopener noreferrer">
              <button style={{ background: "rgba(255,255,255,0.13)", color: "white", border: "1.5px solid rgba(255,255,255,0.35)", padding: "12px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>📋 Get My Kbis</button>
            </a>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ background: "#1E3A8A", padding: "13px 20px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
          {[["1–5 days", "To create"], ["€1", "Min. capital"], ["Free", "For EI/AE"], ["30%", "Flat tax rate"], ["100%", "Online"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center", color: "white" }}>
              <div style={{ fontWeight: 800, fontSize: 17, color: "#93C5FD" }}>{v}</div>
              <div style={{ fontSize: 10, opacity: 0.65, letterSpacing: "0.05em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* NAV */}
      <div style={{ background: "white", borderBottom: "1.5px solid #E5E7EB", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", overflowX: "auto" }}>
          {NAV.map((n) => <button key={n.id} className={`nav-btn ${tab === n.id ? "active" : ""}`} onClick={() => setTab(n.id)}>{n.label}</button>)}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "30px 18px 70px" }}>

        {/* HOME */}
        {tab === "home" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>What do you need help with?</h2>
            <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 24 }}>Tap a card to jump straight to the section you need.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 14, marginBottom: 28 }}>
              {[
                { icon: "🚀", title: "Create my company", sub: "Step-by-step guide, Kbis, forms", tab: "create", color: "#3B82F6", bg: "#EFF6FF" },
                { icon: "📊", title: "Manage my business", sub: "Accounting, invoices, annual tasks", tab: "manage", color: "#8B5CF6", bg: "#F5F3FF" },
                { icon: "💰", title: "Handle money & dividends", sub: "Pay yourself, taxes, optimize", tab: "money", color: "#059669", bg: "#F0FDF4" },
                { icon: "⚖️", title: "Stay legal", sub: "GDPR, insurance, brand protection", tab: "legal", color: "#D97706", bg: "#FFFBEB" },
                { icon: "🔧", title: "Find the right tools", sub: "Apps, software, official sites", tab: "tools", color: "#EC4899", bg: "#FDF2F8" },
              ].map((card) => (
                <div key={card.tab} className="card hover-lift" style={{ cursor: "pointer", border: `1.5px solid ${card.bg}`, background: card.bg }} onClick={() => setTab(card.tab)}>
                  <div style={{ fontSize: 30, marginBottom: 10 }}>{card.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: card.color, marginBottom: 4 }}>{card.title}</div>
                  <div style={{ fontSize: 13, color: "#6B7280" }}>{card.sub}</div>
                  <div style={{ marginTop: 12, fontSize: 13, color: card.color, fontWeight: 600 }}>Go there →</div>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div className="card" style={{ background: "linear-gradient(135deg,#1E3A8A,#3B82F6)", color: "white" }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>⚡ Most important links</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  ["🏛️ Create company (official)", "https://formalites.entreprises.gouv.fr"],
                  ["📋 Get Kbis – Infogreffe", "https://www.infogreffe.fr"],
                  ["💰 URSSAF – Social charges", "https://www.urssaf.fr"],
                  ["🧾 Business taxes – Impots.gouv", "https://www.impots.gouv.fr/professionnel"],
                  ["🏦 Shine – Business bank", "https://www.shine.fr"],
                  ["📊 BPI France – Guides & loans", "https://bpifrance-creation.fr"],
                ].map(([label, url]) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer">
                    <span style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "6px 13px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CREATE */}
        {tab === "create" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Create your company in 6 steps</h2>
            <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 22 }}>Click each step to see what to do and which links to use.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {CREATE_STEPS.map((s) => (
                <div key={s.num} className={`step-row ${openStep === s.num ? "open" : ""}`} onClick={() => setOpenStep(openStep === s.num ? null : s.num)}>
                  <div className="step-num">{s.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{s.icon} {s.title}</div>
                      <span style={{ color: "#9CA3AF" }}>{openStep === s.num ? "▲" : "▼"}</span>
                    </div>
                    {openStep === s.num && (
                      <div style={{ marginTop: 10 }}>
                        <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.7, marginBottom: 12 }}>{s.desc}</p>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {s.links.map((l) => <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"><span className={`pill ${l.primary ? "p" : ""}`}>{l.label} →</span></a>)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontWeight: 800, fontSize: 17, marginBottom: 14 }}>Which structure is right for you?</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
              {STRUCTURES.map((s) => (
                <div key={s.id} style={{ border: `2px solid ${selectedStructure?.id === s.id ? s.color : "#E5E7EB"}`, borderRadius: 14, padding: 16, background: "white", cursor: "pointer", transition: "all .2s" }}
                  className="hover-lift" onClick={() => setSelectedStructure(selectedStructure?.id === s.id ? null : s)}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 22 }}>{s.emoji}</span>
                    <span className="tag" style={{ background: s.kbis ? "#D1FAE5" : "#FEF3C7", color: s.kbis ? "#065F46" : "#92400E" }}>{s.kbis ? "✅ Kbis" : "⚠️ Certificate"}</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 19, color: s.color }}>{s.short}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 6 }}>Capital: {s.capital} · {s.alone ? "Solo only" : "2+ partners"}</div>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{s.desc}</p>
                  {selectedStructure?.id === s.id && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #F3F4F6" }}>
                      <div style={{ fontSize: 12, color: "#059669", fontWeight: 700, marginBottom: 4 }}>✅ Best for</div>
                      <div style={{ fontSize: 13, color: "#4B5563" }}>{s.best}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MANAGE */}
        {tab === "manage" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Manage your business</h2>
            <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 22 }}>Everything you need to keep your company running properly. Click a topic to expand it.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {MANAGE_TOPICS.map((t) => (
                <div key={t.id} className="acc">
                  <div className="acc-h" onClick={() => setOpenTopic(openTopic === t.id ? null : t.id)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: t.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{t.icon}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: t.color }}>{t.title}</div>
                        <div style={{ fontSize: 12, color: "#9CA3AF" }}>{t.short}</div>
                      </div>
                    </div>
                    <span style={{ color: "#9CA3AF", fontSize: 16 }}>{openTopic === t.id ? "▲" : "▼"}</span>
                  </div>
                  {openTopic === t.id && (
                    <div className="acc-b">
                      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {t.content.map((c) => (
                          <div key={c.label} style={{ paddingLeft: 12, borderLeft: `3px solid ${t.color}30` }}>
                            <div style={{ fontWeight: 700, fontSize: 13, color: t.color, marginBottom: 3 }}>{c.label}</div>
                            <div style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.65 }}>{c.text}</div>
                          </div>
                        ))}
                      </div>
                      {t.links?.length > 0 && (
                        <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {t.links.map((l) => <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"><span className="pill">{l.label} →</span></a>)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MONEY */}
        {tab === "money" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Money, Dividends & Taxes</h2>
            <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 22 }}>How to pay yourself, optimize your income, and handle taxes without stress.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14, marginBottom: 28 }}>
              {MONEY_TIPS.map((tip) => (
                <div key={tip.title} className="card hover-lift" style={{ borderLeft: `4px solid ${tip.color}` }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{tip.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: tip.color, marginBottom: 6 }}>{tip.title}</div>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{tip.text}</p>
                </div>
              ))}
            </div>

            {/* Dividend explainer */}
            <div className="card" style={{ background: "linear-gradient(135deg,#F5F3FF,#EFF6FF)", border: "1.5px solid #C4B5FD", marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#5B21B6", marginBottom: 14 }}>💸 How dividends work — simple example</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["Your company earns", "€100,000"],
                  ["Expenses & costs", "− €30,000"],
                  ["Profit before tax", "= €70,000"],
                  ["Corporate tax (IS 25%)", "− €17,500"],
                  ["Profit available for dividends", "= €52,500"],
                  ["You pay yourself €40,000 dividend", ""],
                  ["Flat tax on dividends (30%)", "− €12,000"],
                  ["✅ You receive net", "€28,000"],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "6px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    <span style={{ color: "#4B5563" }}>{label}</span>
                    {val && <span style={{ fontWeight: 700, color: "#5B21B6" }}>{val}</span>}
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 12, fontSize: 12, color: "#7C3AED", fontStyle: "italic" }}>This is a simplified example. An accountant will optimize this for your specific situation.</p>
            </div>

            <div className="card" style={{ background: "#FFF7ED", border: "1.5px solid #FED7AA" }}>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: 22 }}>💡</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#C2410C", marginBottom: 4 }}>Always work with an accountant</div>
                  <p style={{ fontSize: 14, color: "#92400E", lineHeight: 1.6 }}>Tax optimization is complex. A good accountant (€100–300/month) saves you far more than they cost by finding the best salary/dividend split for your situation.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LEGAL */}
        {tab === "legal" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Stay Legal & Protected</h2>
            <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 22 }}>Key legal obligations every French business owner must know.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14, marginBottom: 28 }}>
              {LEGAL_ITEMS.map((item) => (
                <div key={item.title} className="card hover-lift">
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{item.title}</div>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, marginBottom: 12 }}>{item.desc}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer"><span className="pill" style={{ fontSize: 12 }}>Learn more →</span></a>
                </div>
              ))}
            </div>

            <div className="card" style={{ background: "#FEF2F2", border: "1.5px solid #FECACA" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#DC2626", marginBottom: 12 }}>🚨 Most common mistakes to avoid</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Mixing personal and business bank accounts",
                  "Not keeping receipts (required for 10 years)",
                  "Forgetting to file annual accounts at the greffe",
                  "Not declaring changes (address, manager) within 1 month",
                  "Not charging VAT when you should be",
                  "Signing contracts in your personal name instead of company name",
                ].map((m) => (
                  <div key={m} style={{ display: "flex", gap: 10, fontSize: 13, color: "#7F1D1D" }}>
                    <span>❌</span><span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TOOLS */}
        {tab === "tools" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>The Right Tools for Your Business</h2>
            <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 16 }}>Official sites, software, and services every French entrepreneur needs.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {cats.map((c) => <button key={c} className={`cat-btn ${filterCat === c ? "active" : ""}`} onClick={() => setFilterCat(c)}>{c}</button>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 14 }}>
              {TOOLS.filter((t) => filterCat === "All" || t.cat === filterCat).map((tool) => (
                <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer">
                  <div className="card hover-lift" style={{ height: "100%", cursor: "pointer" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 26 }}>{tool.icon}</span>
                      <span className="tag" style={{ background: tool.tag === "FREE" || tool.tag === "OFFICIAL" ? "#D1FAE5" : "#F3F4F6", color: tool.tag === "FREE" || tool.tag === "OFFICIAL" ? "#065F46" : "#6B7280" }}>{tool.tag}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{tool.name}</div>
                    <div style={{ fontSize: 11, color: "#3B82F6", fontWeight: 600, marginBottom: 6 }}>{tool.cat}</div>
                    <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{tool.desc}</p>
                    <div style={{ marginTop: 10, fontSize: 12, color: "#2563EB", fontWeight: 600 }}>Open →</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ background: "#0F172A", color: "rgba(255,255,255,0.5)", padding: "20px 24px", textAlign: "center", fontSize: 12 }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          For informational purposes only. For complex decisions, consult a certified accountant (expert-comptable) or lawyer.<br />
          Official portals: <a href="https://formalites.entreprises.gouv.fr" style={{ color: "#93C5FD" }}>Guichet Unique</a> · <a href="https://www.infogreffe.fr" style={{ color: "#93C5FD" }}>Infogreffe</a> · <a href="https://www.urssaf.fr" style={{ color: "#93C5FD" }}>URSSAF</a>
        </div>
      </div>
    </div>
  );
}
