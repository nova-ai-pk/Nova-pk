const WHATSAPP = "923471016620";

const PAYMENTS = {
  easypaisa: "03420604105",
  jazzcash: "03174453242"
};

const tools = [
  {id:"qr",name:"URL to QR Generator",icon:"▦",cat:"Marketing",desc:"Turn website links into downloadable QR codes with optional logo.",price:799,kind:"qr"},
  {id:"barcode",name:"Barcode Generator",icon:"▥",cat:"Business",desc:"Create product barcodes and download printable SVG files.",price:699,kind:"barcode"},
  {id:"image",name:"Image Compressor",icon:"▧",cat:"Image",desc:"Reduce image file size directly in your browser.",price:899,kind:"image"},
  {id:"resize",name:"Image Resizer",icon:"◫",cat:"Image",desc:"Resize images to custom pixel dimensions.",price:699,kind:"image"},
  {id:"invoice",name:"Invoice Generator Pro",icon:"▤",cat:"Business",desc:"Create clean business invoices ready to print or save as PDF.",price:999,kind:"invoice"},
  {id:"resume",name:"Resume Builder",icon:"▣",cat:"Business",desc:"Build a professional resume from your details.",price:1299,kind:"resume"},
  {id:"pdf",name:"PDF Merge Studio",icon:"▧",cat:"Documents",desc:"Combine multiple PDF files into one document in your browser.",price:999,kind:"pdf"},
  {id:"thumbnail",name:"YouTube Thumbnail Maker",icon:"▶",cat:"Creator",desc:"Design a custom thumbnail with image, text and colors.",price:999,kind:"thumbnail"},
  {id:"social",name:"Social Media Design Maker",icon:"✧",cat:"Creator",desc:"Create a square promotional graphic for social platforms.",price:1199,kind:"social"},
  {id:"seo",name:"SEO Source Analyzer",icon:"⌕",cat:"Marketing",desc:"Check pasted page source for title, description and heading basics.",price:1299,kind:"seo"},
  {id:"favicon",name:"Favicon Maker",icon:"◈",cat:"Design",desc:"Create a simple downloadable website icon from text or emoji.",price:599,kind:"favicon"},
  {id:"word",name:"Word Counter Pro",icon:"¶",cat:"Writing",desc:"Count words, characters, sentences and reading time.",price:599,kind:"word"},
  {id:"case",name:"Text Case Converter",icon:"Aa",cat:"Writing",desc:"Convert text to upper, lower, title and sentence case.",price:599,kind:"case"},
  {id:"json",name:"JSON Formatter",icon:"{}",cat:"Developer",desc:"Format, validate and inspect JSON data.",price:599,kind:"json"},
  {id:"password",name:"Password Generator",icon:"⌑",cat:"Security",desc:"Generate random passwords locally in your browser.",price:699,kind:"password"},
  {id:"calc",name:"Smart Calculator",icon:"＋",cat:"Utility",desc:"Calculate common arithmetic expressions.",price:599,kind:"calc"},
  {id:"percent",name:"Percentage Calculator",icon:"％",cat:"Utility",desc:"Calculate percentages and percentage amounts.",price:599,kind:"percent"},
  {id:"color",name:"Color Studio",icon:"◉",cat:"Design",desc:"Pick a color and get HEX and RGB values.",price:699,kind:"color"},
  {id:"unit",name:"Unit Converter",icon:"⇄",cat:"Utility",desc:"Convert kilometers, miles, kilograms and pounds.",price:599,kind:"unit"},
  {id:"notes",name:"Notes Exporter",icon:"▧",cat:"Productivity",desc:"Write notes and download them as a text file.",price:599,kind:"notes"},
  {id:"binary",name:"Binary Converter",icon:"01",cat:"Developer",desc:"Convert text to binary and binary back to text.",price:699,kind:"binary"}
];

let activeCategory = "All";

function money(n) {
  return "Rs. " + Number(n).toLocaleString("en-PK");
}

function renderTools() {
  const cats = ["All", ...new Set(tools.map(t => t.cat))];

  document.getElementById("categories").innerHTML = cats.map(c =>
    `<button class="cat ${activeCategory === c ? 'active' : ''}" onclick="setCategory('${c}')">${c}</button>`
  ).join("");

  const q = document.getElementById("search").value.toLowerCase();

  const list = tools.filter(t =>
    (activeCategory === "All" || t.cat === activeCategory) &&
    (t.name + " " + t.desc + " " + t.cat).toLowerCase().includes(q)
  );

  document.getElementById("toolGrid").innerHTML = list.map(t =>
    `<article class="card">
      <span class="badge">PREMIUM</span>
      <div class="card-icon">${t.icon}</div>
      <h3>${t.name}</h3>
      <p>${t.desc}</p>
      <div class="card-bottom">
        <span class="price">${money(t.price)} / 60 days</span>
        <button class="btn" onclick="handleTool('${t.id}')">View Tool →</button>
      </div>
    </article>`
  ).join("");
}

function setCategory(c) {
  activeCategory = c;
  renderTools();
}

function showPurchase(id) {
  const t = tools.find(x => x.id === id);

  showModal("Purchase " + t.name, `
    <div class="price-big">${money(t.price)}</div>
    <p class="desc">Individual tool · 60-day access after manual confirmation</p>
    <hr>
    <b>Receiver name: NOVA AI</b>

    <div class="payment-method">
      <b>Easypaisa</b><br>
      <span class="account-number">${PAYMENTS.easypaisa}</span>
      <button class="copy-btn" onclick="copyNumber('${PAYMENTS.easypaisa}')">Copy</button>
    </div>

    <div class="payment-method">
      <b>JazzCash</b><br>
      <span class="account-number">${PAYMENTS.jazzcash}</span>
      <button class="copy-btn" onclick="copyNumber('${PAYMENTS.jazzcash}')">Copy</button>
    </div>

    <label class="field-label">Payment method</label>
    <select class="field" id="payMethod">
      <option>Easypaisa</option>
      <option>JazzCash</option>
    </select>

    <label class="field-label">Transaction ID</label>
    <input class="field" id="txId" placeholder="Enter transaction ID">

    <p class="notice">
      Send payment only after checking the receiver name. Enter the transaction ID after paying. Payment is checked manually. After confirmation, NOVA AI will share the access code. You must sign in and enter it in My Account.
    </p>

    <button class="btn" style="width:100%;margin-top:12px" onclick="sendRequest('${t.id}')">
      Send Payment Request on WhatsApp
    </button>

    <p class="notice">
      After NOVA AI manually confirms your payment, you will receive the shared access code. Sign in, open My Account, select this tool and enter that code. The one-hour activation countdown then begins.
    </p>
  `);
}

function sendRequest(id) {
  const t = tools.find(x => x.id === id);
  const method = document.getElementById("payMethod").value;
  const tx = document.getElementById("txId").value.trim();

  if (!tx) {
    alert("Enter your transaction ID first.");
    return;
  }

  const msg = `NOVA AI PAYMENT REQUEST
Tool: ${t.name}
Amount: ${money(t.price)}
Payment method: ${method}
Receiver: NOVA AI
Transaction ID: ${tx}
Please verify my payment and confirm my 60-day access.`;

  window.open(
    "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg),
    "_blank"
  );
}

function copyNumber(n) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(n).then(
      () => alert("Number copied."),
      () => alert("Copy this number: " + n)
    );
  } else {
    alert("Copy this number: " + n);
  }
}

function showModal(title, content) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalContent").innerHTML = content;
  document.getElementById("modal").classList.add("show");
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
}

const ACCESS_CODE = "NOVA60";
const ACCESS_WAIT_MS = 60 * 60 * 1000;
const ACCESS_LENGTH_MS = 60 * 24 * 60 * 60 * 1000;

function currentUser() {
  try {
    return JSON.parse(localStorage.getItem("nova_current_user") || "null");
  } catch (e) {
    return null;
  }
}

function showAuth(mode = "signup") {
  const isSignup = mode === "signup";

  showModal(isSignup ? "Create Your NOVA AI Account" : "Login to NOVA AI", `
    <p class="desc">Your account is stored in this browser in this demo version.</p>

    <label class="field-label">Email address</label>
    <input class="field" id="authEmail" type="email" placeholder="you@example.com">

    <label class="field-label">Password</label>
    <input class="field" id="authPass" type="password" placeholder="At least 6 characters">

    ${isSignup ? '<label class="field-label">Confirm password</label><input class="field" id="authConfirm" type="password" placeholder="Repeat password">' : ''}

    <button class="btn" style="width:100%;margin-top:14px" onclick="${isSignup ? 'createAccount()' : 'loginAccount()'}">
      ${isSignup ? 'Create Account' : 'Login'}
    </button>

    <p class="desc">
      ${isSignup ? 'Already registered?' : 'New to NOVA AI?'}
      <a style="color:var(--gold);cursor:pointer" onclick="showAuth('${isSignup ? 'login' : 'signup'}')">
        ${isSignup ? 'Login' : 'Create an account'}
      </a>
    </p>

    <p class="notice">
      Demo limitation: this frontend-only account is not secure and does not sync across devices. Do not reuse an important password.
    </p>
  `);
}

function createAccount() {
  const email = (document.getElementById("authEmail").value || "").trim().toLowerCase();
  const pass = document.getElementById("authPass").value;
  const confirm = document.getElementById("authConfirm").value;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return alert("Enter a valid email address.");
  }

  if (pass.length < 6) {
    return alert("Password must be at least 6 characters.");
  }

  if (pass !== confirm) {
    return alert("Passwords do not match.");
  }

  let users = {};

  try {
    users = JSON.parse(localStorage.getItem("nova_users") || "{}");
  } catch (e) {}

  if (users[email]) {
    return alert("An account with this email already exists. Please log in.");
  }

  users[email] = {password: pass};

  localStorage.setItem("nova_users", JSON.stringify(users));
  localStorage.setItem("nova_current_user", JSON.stringify({email}));

  showAccount();
}

function loginAccount() {
  const email = (document.getElementById("authEmail").value || "").trim().toLowerCase();
  const pass = document.getElementById("authPass").value;

  let users = {};

  try {
    users = JSON.parse(localStorage.getItem("nova_users") || "{}");
  } catch (e) {}

  if (!users[email] || users[email].password !== pass) {
    return alert("Email or password is incorrect.");
  }

  localStorage.setItem("nova_current_user", JSON.stringify({email}));
  showAccount();
}

function logoutAccount() {
  localStorage.removeItem("nova_current_user");
  showAuth("login");
}

function accessKey(toolId) {
  const u = currentUser();
  return u ? "nova_access_" + u.email + "_" + toolId : null;
}

function accessStatus(toolId) {
  const k = accessKey(toolId);

  if (!k) return {state: "login"};

  let a;

  try {
    a = JSON.parse(localStorage.getItem(k) || "null");
  } catch (e) {
    a = null;
  }

  if (!a) return {state: "locked"};

  const now = Date.now();

  if (a.startAt && now >= a.startAt && now < a.expiresAt) {
    return {state: "active", expiresAt: a.expiresAt};
  }

  if (a.startAt && now < a.startAt) {
    return {state: "waiting", startAt: a.startAt};
  }

  if (a.expiresAt && now >= a.expiresAt) {
    localStorage.removeItem(k);
    return {state: "expired"};
  }

  return {state: "locked"};
}

function handleTool(id) {
  const user = currentUser();

  if (!user) {
    showAuth("signup");
    return;
  }

  const st = accessStatus(id);

  if (st.state === "active") {
    openTool(id);
    return;
  }

  if (st.state === "waiting") {
    alert("Your code has been accepted. This tool activates in " +
      Math.ceil((st.startAt - Date.now()) / 60000) + " minute(s).");
    return;
  }

  showPurchase(id);
}

function showAccount() {
  const u = currentUser();

  if (!u) return showAuth("login");

  const options = tools.map(t =>
    `<option value="${t.id}">${t.name} — ${money(t.price)}</option>`
  ).join("");

  let rows = tools.map(t => {
    let s = accessStatus(t.id);

    let label =
      s.state === "active" ? "ACTIVE" :
      s.state === "waiting" ? "ACTIVATING IN " + Math.ceil((s.startAt - Date.now()) / 60000) + " MIN" :
      s.state === "expired" ? "EXPIRED" :
      "NOT ACTIVATED";

    return `<p><b>${t.name}</b> — <span style="color:var(--gold)">${label}</span></p>`;
  }).join("");

  showModal("My NOVA AI Account", `
    <p class="desc">Signed in as <b>${u.email}</b></p>

    <label class="field-label">Select purchased tool</label>
    <select class="field" id="activateTool">${options}</select>

    <label class="field-label">Shared access code</label>
    <input class="field" id="accessCode" placeholder="Enter code received after payment">

    <button class="btn" style="width:100%;margin-top:12px" onclick="activateCode()">
      Activate selected tool
    </button>

    <hr>
    <b>Your tool access</b>
    ${rows}

    <button class="btn btn-dark" style="width:100%;margin-top:12px" onclick="logoutAccount()">
      Log Out
    </button>

    <p class="notice">
      Access starts one hour after code entry and expires 60 days after activation. This browser-only demo can be reset by clearing browser data.
    </p>
  `);
}

function activateCode() {
  if (!currentUser()) return showAuth("login");

  const code = (document.getElementById("accessCode").value || "").trim();
  const id = document.getElementById("activateTool").value;

  if (code.toUpperCase() !== ACCESS_CODE) {
    return alert("Incorrect access code.");
  }

  const k = accessKey(id);
  const existing = accessStatus(id);

  if (existing.state === "active") {
    return alert("This tool is already active.");
  }

  if (existing.state === "waiting") {
    return alert("The one-hour activation countdown has already started.");
  }

  const enteredAt = Date.now();

  localStorage.setItem(k, JSON.stringify({
    enteredAt,
    startAt: enteredAt + ACCESS_WAIT_MS,
    expiresAt: enteredAt + ACCESS_WAIT_MS + ACCESS_LENGTH_MS
  }));

  alert("Code accepted. Your selected tool will activate in one hour.");
  showAccount();
}

function openTool(id) {
  const t = tools.find(x => x.id === id);

  if (!t) return;

  document.getElementById("workTitle").textContent = t.icon + " " + t.name;
  document.getElementById("workDescription").textContent = t.desc;

  let h = "";

  let input = `
    <label class="field-label">Your text</label>
    <textarea id="data" placeholder="Type or paste here..."></textarea>
  `;

  switch (t.kind) {
    case "qr":
      h = `
        <label class="field-label">Website URL</label>
        <input class="field" id="qrUrl" placeholder="https://example.com">
        <label class="field-label">Optional logo</label>
        <input class="field" type="file" id="qrLogo" accept="image/*">
        <label class="field-label">QR color</label>
        <input class="field" type="color" id="qrColor" value="#111111">
        <button class="btn" onclick="makeQR()">Generate QR</button>
        <div id="qrResult" class="tool-output output-center">QR appears here.</div>
      `;
      break;

    case "barcode":
      h = `
        <input class="field" id="barVal" placeholder="Product code">
        <button class="btn" onclick="makeBarcode()">Generate Barcode</button>
        <div class="tool-output output-center"><svg id="barSvg"></svg></div>
        <button class="btn" onclick="downloadBarcode()">Download SVG</button>
      `;
      break;

    case "image":
      h = `
        <label class="field-label">Choose image</label>
        <input class="field" type="file" id="imgFile" accept="image/*">
        <label class="field-label">Maximum output width (px)</label>
        <input class="field" id="imgWidth" type="number" value="1000">
        <label class="field-label">JPEG quality (0.1–1)</label>
        <input class="field" id="imgQuality" type="number" min=".1" max="1" step=".05" value=".75">
        <button class="btn" onclick="processImage('${t.id}')">Process Image</button>
        <div id="imgResult" class="tool-output"></div>
      `;
      break;

    case "invoice":
      h = `
        <input class="field" id="biz" placeholder="Business name">
        <input class="field" id="cust" placeholder="Customer name">
        <input class="field" id="item" placeholder="Product or service">
        <input class="field" id="amt" type="number" placeholder="Amount (PKR)">
        <button class="btn" onclick="makeInvoice()">Create Invoice</button>
        <div id="invoiceOut" class="tool-output"></div>
      `;
      break;

    case "resume":
      h = `
        <input class="field" id="rName" placeholder="Full name">
        <input class="field" id="rEmail" placeholder="Email">
        <input class="field" id="rRole" placeholder="Professional title">
        <textarea id="rAbout" placeholder="Professional summary"></textarea>
        <textarea id="rSkills" placeholder="Skills"></textarea>
        <textarea id="rExp" placeholder="Experience and education"></textarea>
        <button class="btn" onclick="makeResume()">Generate Resume</button>
        <div id="resumeOut" class="tool-output"></div>
      `;
      break;

    case "pdf":
      h = `
        <label class="field-label">Select two or more PDF files</label>
        <input class="field" type="file" id="pdfFiles" accept="application/pdf" multiple>
        <button class="btn" onclick="mergePDFs()">Merge PDFs</button>
        <div id="pdfOut" class="tool-output">Files are processed locally in your browser.</div>
      `;
      break;

    case "thumbnail":
    case "social":
      h = `
        <label class="field-label">Background image (optional)</label>
        <input class="field" type="file" id="designImage" accept="image/*">
        <label class="field-label">Main text</label>
        <input class="field" id="designTitle" placeholder="Your headline">
        <label class="field-label">Subtitle</label>
        <input class="field" id="designSub" placeholder="Optional subtitle">
        <label class="field-label">Background color</label>
        <input class="field" id="designColor" type="color" value="#171d2d">
        <button class="btn" onclick="makeDesign('${t.kind}')">Create Design</button>
        <div class="tool-output output-center">
          <canvas id="designCanvas" style="max-width:100%;height:auto"></canvas>
        </div>
        <button class="btn" onclick="downloadDesign()">Download PNG</button>
      `;
      break;

    case "seo":
      h = `
        <p class="desc">Paste the HTML source of a page. This browser tool checks basic on-page SEO fields; it does not crawl websites.</p>
        <textarea id="seoSource" placeholder="Paste page HTML source here..."></textarea>
        <button class="btn" onclick="analyzeSEO()">Analyze Source</button>
        <div id="seoOut" class="tool-output"></div>
      `;
      break;

    case "favicon":
      h = `
        <label class="field-label">Text or emoji</label>
        <input class="field" id="favText" maxlength="3" value="N">
        <label class="field-label">Background</label>
        <input class="field" id="favBg" type="color" value="#d8b46a">
        <label class="field-label">Text color</label>
        <input class="field" id="favFg" type="color" value="#111111">
        <button class="btn" onclick="makeFavicon()">Create Icon</button>
        <div class="tool-output output-center">
          <canvas id="favCanvas" width="256" height="256" style="max-width:180px"></canvas>
        </div>
        <button class="btn" onclick="downloadFavicon()">Download PNG</button>
      `;
      break;

    case "word":
      h = input + '<button class="btn" onclick="wordCount()">Count</button><div id="result" class="tool-output"></div>';
      break;

    case "case":
      h = input + `
        <div class="tool-actions">
          <button class="btn" onclick="convertCase('upper')">UPPER</button>
          <button class="btn" onclick="convertCase('lower')">lower</button>
          <button class="btn" onclick="convertCase('title')">Title Case</button>
          <button class="btn" onclick="convertCase('sentence')">Sentence</button>
        </div>
      `;
      break;

    case "json":
      h = input + '<button class="btn" onclick="formatJSON()">Format JSON</button><div id="result" class="tool-output"></div>';
      break;

    case "password":
      h = `
        <label class="field-label">Password length</label>
        <input class="field" id="passLength" type="number" value="18" min="8" max="64">
        <button class="btn" onclick="generatePassword()">Generate Password</button>
        <div id="result" class="tool-output"></div>
      `;
      break;

    case "calc":
      h = `
        <input class="field" id="calcInput" placeholder="Example: (25 + 5) * 2">
        <button class="btn" onclick="doCalc()">Calculate</button>
        <div id="result" class="tool-output"></div>
      `;
      break;

    case "percent":
      h = `
        <input class="field" id="percentA" type="number" placeholder="Percentage">
        <input class="field" id="percentB" type="number" placeholder="Number">
        <button class="btn" onclick="doPercent()">Calculate</button>
        <div id="result" class="tool-output"></div>
      `;
      break;

    case "color":
      h = `
        <input class="field" id="colorInput" type="color" value="#d8b46a">
        <button class="btn" onclick="showColor()">Get Color Codes</button>
        <div id="result" class="tool-output"></div>
      `;
      break;

    case "unit":
      h = `
        <input class="field" id="unitValue" type="number" placeholder="Value">
        <select class="field" id="unitType">
          <option value="km">Kilometers to Miles</option>
          <option value="mi">Miles to Kilometers</option>
          <option value="kg">Kilograms to Pounds</option>
          <option value="lb">Pounds to Kilograms</option>
        </select>
        <button class="btn" onclick="convertUnit()">Convert</button>
        <div id="result" class="tool-output"></div>
      `;
      break;

    case "notes":
      h = input + '<button class="btn" onclick="downloadNotes()">Download TXT</button>';
      break;

    case "binary":
      h = input + `
        <div class="tool-actions">
          <button class="btn" onclick="toBinary()">Text to Binary</button>
          <button class="btn" onclick="fromBinary()">Binary to Text</button>
        </div>
        <div id="result" class="tool-output"></div>
      `;
      break;
  }

  document.getElementById("workContent").innerHTML = h;

  const w = document.getElementById("workspace");
  w.classList.add("show");
  w.scrollIntoView({behavior: "smooth"});
}

function closeTool() {
  document.getElementById("workspace").classList.remove("show");
}

function out(v) {
  document.getElementById("result").textContent = v;
}

function getText() {
  return document.getElementById("data").value;
}

function wordCount() {
  let s = getText();

  out(
    "Words: " + (s.trim() ? s.trim().split(/\s+/).length : 0) +
    "\nCharacters: " + s.length +
    "\nWithout spaces: " + s.replace(/\s/g, "").length +
    "\nSentences: " + (s.match(/[.!?]+/g) || []).length +
    "\nEstimated reading time: " +
    Math.max(1, Math.ceil(s.trim().split(/\s+/).filter(Boolean).length / 200)) +
    " min"
  );
}

function convertCase(type) {
  let s = getText();

  if (type === "upper") s = s.toUpperCase();
  if (type === "lower") s = s.toLowerCase();

  if (type === "title") {
    s = s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }

  if (type === "sentence") {
    s = s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
  }

  document.getElementById("data").value = s;
}

function formatJSON() {
  try {
    out(JSON.stringify(JSON.parse(getText()), null, 2));
  } catch (e) {
    out("Invalid JSON: " + e.message);
  }
}

function generatePassword() {
  let n = Math.max(8, Math.min(64, +document.getElementById("passLength").value || 18));
  let chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*";

  let a = new Uint32Array(n);
  crypto.getRandomValues(a);

  out(Array.from(a, x => chars[x % chars.length]).join(""));
}

function doCalc() {
  let s = document.getElementById("calcInput").value;

  if (!/^[0-9+\-*/().%\s]+$/.test(s)) {
    return out("Invalid expression");
  }

  try {
    let n = Function('"use strict";return (' + s + ')')();
    out(Number.isFinite(n) ? String(n) : "Invalid result");
  } catch (e) {
    out("Invalid expression");
  }
}

function doPercent() {
  let a = Number(document.getElementById("percentA").value);
  let b = Number(document.getElementById("percentB").value);

  out((a * b / 100).toFixed(2));
}

function showColor() {
  let c = document.getElementById("colorInput").value;

  out(
    "HEX: " + c.toUpperCase() +
    "\nRGB: " +
    parseInt(c.slice(1, 3), 16) + ", " +
    parseInt(c.slice(3, 5), 16) + ", " +
    parseInt(c.slice(5, 7), 16)
  );
}

function convertUnit() {
  let n = Number(document.getElementById("unitValue").value);
  let u = document.getElementById("unitType").value;

  let f = {
    km: [.621371, "miles"],
    mi: [1.60934, "km"],
    kg: [2.20462, "lbs"],
    lb: [.453592, "kg"]
  }[u];

  out((n * f[0]).toFixed(4) + " " + f[1]);
}

function downloadNotes() {
  let b = new Blob([getText()], {type: "text/plain"});
  let u = URL.createObjectURL(b);
  let a = document.createElement("a");

  a.href = u;
  a.download = "nova-notes.txt";
  a.click();

  URL.revokeObjectURL(u);
}

function toBinary() {
  out(
    Array.from(new TextEncoder().encode(getText()))
      .map(x => x.toString(2).padStart(8, "0"))
      .join(" ")
  );
}

function fromBinary() {
  try {
    let a = getText().trim().split(/\s+/);

    if (!a.length || a.some(x => !/^[01]{8}$/.test(x))) {
      throw Error();
    }

    out(new TextDecoder().decode(new Uint8Array(a.map(x => parseInt(x, 2)))));
  } catch (e) {
    out("Enter valid 8-bit binary groups separated by spaces.");
  }
}

function makeQR() {
  let url = document.getElementById("qrUrl").value.trim();

  try {
    let u = new URL(url);
    if (!["http:", "https:"].includes(u.protocol)) throw Error();
  } catch (e) {
    alert("Enter a valid http or https URL.");
    return;
  }

  let box = document.getElementById("qrResult");

  box.innerHTML = `
    <div class="qr-area"><div id="qrCanvas"></div></div>
    <button class="btn" onclick="downloadQR()">Download PNG</button>
  `;

  new QRCode(document.getElementById("qrCanvas"), {
    text: url,
    width: 250,
    height: 250,
    colorDark: document.getElementById("qrColor").value,
    colorLight: "#fff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

async function downloadQR() {
  let c0 = document.querySelector("#qrCanvas canvas");

  if (!c0) return;

  let c = document.createElement("canvas");
  c.width = c0.width;
  c.height = c0.height;
  c.getContext("2d").drawImage(c0, 0, 0);

  let f = document.getElementById("qrLogo").files[0];

  if (f) {
    try {
      let im = new Image();
      im.src = URL.createObjectURL(f);
      await im.decode();

      let s = c.width * .2;
      let x = (c.width - s) / 2;
      let ctx = c.getContext("2d");

      ctx.fillStyle = "#fff";
      ctx.fillRect(x - 5, x - 5, s + 10, s + 10);
      ctx.drawImage(im, x, x, s, s);
    } catch (e) {}
  }

  let a = document.createElement("a");
  a.href = c.toDataURL();
  a.download = "nova-qr.png";
  a.click();
}

function makeBarcode() {
  let v = document.getElementById("barVal").value;

  if (!v) return alert("Enter a code.");

  try {
    JsBarcode("#barSvg", v, {
      format: "CODE128",
      displayValue: true,
      background: "#fff",
      lineColor: "#000"
    });
  } catch (e) {
    alert("Invalid barcode value.");
  }
}

function downloadBarcode() {
  let s = document.getElementById("barSvg");

  if (!s.innerHTML) return alert("Generate a barcode first.");

  let b = new Blob(
    [new XMLSerializer().serializeToString(s)],
    {type: "image/svg+xml"}
  );

  let u = URL.createObjectURL(b);
  let a = document.createElement("a");

  a.href = u;
  a.download = "nova-barcode.svg";
  a.click();

  URL.revokeObjectURL(u);
}

function processImage() {
  let f = document.getElementById("imgFile").files[0];

  if (!f) return alert("Choose an image.");

  let w = Math.max(1, Math.min(6000, +document.getElementById("imgWidth").value || 1000));
  let q = Math.max(.1, Math.min(1, +document.getElementById("imgQuality").value || .75));
  let url = URL.createObjectURL(f);
  let im = new Image();

  im.onload = () => {
    let nw = Math.min(w, im.width);
    let nh = Math.round(im.height * nw / im.width);
    let c = document.createElement("canvas");

    c.width = nw;
    c.height = nh;
    c.getContext("2d").drawImage(im, 0, 0, nw, nh);

    c.toBlob(b => {
      let u = URL.createObjectURL(b);

      document.getElementById("imgResult").innerHTML = `
        Original: ${(f.size / 1024).toFixed(1)} KB<br>
        New: ${(b.size / 1024).toFixed(1)} KB<br>
        <a style="color:var(--gold)" href="${u}" download="nova-image.jpg">Download processed image</a>
      `;

      URL.revokeObjectURL(url);
    }, "image/jpeg", q);
  };

  im.src = url;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function makeInvoice() {
  let b = document.getElementById("biz").value;
  let c = document.getElementById("cust").value;
  let i = document.getElementById("item").value;
  let a = Number(document.getElementById("amt").value);

  if (!b || !c || !i || !Number.isFinite(a) || a <= 0) {
    return alert("Complete all fields with a valid amount.");
  }

  document.getElementById("invoiceOut").innerHTML = `
    <div style="background:white;color:#222;padding:25px">
      <h2>${esc(b)}</h2>
      <h3>INVOICE</h3>
      <p>Customer: ${esc(c)}</p>
      <p>Item: ${esc(i)}</p>
      <h2>PKR ${a.toLocaleString("en-PK")}</h2>
    </div>
    <button class="btn" onclick="window.print()">Print / Save PDF</button>
  `;
}

function makeResume() {
  let n = document.getElementById("rName").value;

  if (!n) return alert("Enter your name.");

  let e = document.getElementById("rEmail").value;
  let r = document.getElementById("rRole").value;
  let a = document.getElementById("rAbout").value;
  let s = document.getElementById("rSkills").value;
  let x = document.getElementById("rExp").value;

  document.getElementById("resumeOut").innerHTML = `
    <div style="background:white;color:#222;padding:25px">
      <h1>${esc(n)}</h1>
      <p>${esc(r)} | ${esc(e)}</p>
      <hr>
      <h3>PROFILE</h3>
      <p>${esc(a)}</p>
      <h3>SKILLS</h3>
      <p>${esc(s)}</p>
      <h3>EXPERIENCE & EDUCATION</h3>
      <p>${esc(x)}</p>
    </div>
    <button class="btn" onclick="window.print()">Print / Save PDF</button>
  `;
}

async function mergePDFs() {
  let fs = [...document.getElementById("pdfFiles").files];

  if (fs.length < 2) return alert("Choose at least two PDF files.");
  if (!window.PDFLib) return alert("PDF library did not load. Check your internet.");

  try {
    let merged = await PDFLib.PDFDocument.create();

    for (let f of fs) {
      let doc = await PDFLib.PDFDocument.load(await f.arrayBuffer());
      let pages = await merged.copyPages(doc, doc.getPageIndices());
      pages.forEach(p => merged.addPage(p));
    }

    let bytes = await merged.save();
    let blob = new Blob([bytes], {type: "application/pdf"});
    let url = URL.createObjectURL(blob);

    document.getElementById("pdfOut").innerHTML = `
      Merged ${fs.length} PDF files successfully.
      <a style="color:var(--gold)" href="${url}" download="nova-merged.pdf">Download merged PDF</a>
    `;
  } catch (e) {
    document.getElementById("pdfOut").textContent =
      "Could not merge these PDFs. Check that they are valid and not password-protected.";
  }
}

function makeDesign(kind) {
  let c = document.getElementById("designCanvas");
  let ctx = c.getContext("2d");
  let file = document.getElementById("designImage").files[0];
  let title = document.getElementById("designTitle").value || "YOUR BIG IDEA";
  let sub = document.getElementById("designSub").value || "Make it happen.";
  let bg = document.getElementById("designColor").value;

  c.width = kind === "thumbnail" ? 1280 : 1080;
  c.height = kind === "thumbnail" ? 720 : 1080;

  function draw(im) {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, c.width, c.height);

    if (im) {
      ctx.globalAlpha = .42;

      let scale = Math.max(c.width / im.width, c.height / im.height);

      ctx.drawImage(
        im,
        (c.width - im.width * scale) / 2,
        (c.height - im.height * scale) / 2,
        im.width * scale,
        im.height * scale
      );

      ctx.globalAlpha = 1;
    }

    ctx.fillStyle = "#0008";
    ctx.fillRect(0, c.height * .55, c.width, c.height * .45);

    ctx.fillStyle = "#f4d28e";
    ctx.font = `900 ${kind === "thumbnail" ? 76 : 68}px Arial`;
    ctx.textAlign = "center";

    wrapText(
      ctx,
      title.toUpperCase(),
      c.width / 2,
      c.height * .72,
      c.width * .86,
      kind === "thumbnail" ? 88 : 82
    );

    ctx.fillStyle = "#fff";
    ctx.font = "36px Arial";
    ctx.fillText(sub, c.width / 2, c.height * .9);
  }

  if (file) {
    let im = new Image();
    im.onload = () => draw(im);
    im.src = URL.createObjectURL(file);
  } else {
    draw(null);
  }
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  let words = text.split(" ");
  let line = "";
  let lines = [];

  for (let w of words) {
    let test = line + w + " ";

    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line.trim());
      line = w + " ";
    } else {
      line = test;
    }
  }

  if (line) lines.push(line.trim());

  lines.slice(0, 3).forEach((l, i) => {
    ctx.fillText(l, x, y + i * lineHeight);
  });
}

function downloadDesign() {
  let c = document.getElementById("designCanvas");

  if (!c.width) return alert("Create a design first.");

  let a = document.createElement("a");
  a.href = c.toDataURL("image/png");
  a.download = "nova-design.png";
  a.click();
}

function analyzeSEO() {
  let s = document.getElementById("seoSource").value;

  if (!s.trim()) return alert("Paste page HTML source.");

  let d = new DOMParser().parseFromString(s, "text/html");
  let title = d.querySelector("title")?.textContent || "";
  let desc = d.querySelector('meta[name="description"]')?.content || "";
  let h1 = d.querySelectorAll("h1").length;
  let imgs = d.querySelectorAll("img");
  let missing = [...imgs].filter(x => !x.getAttribute("alt")).length;

  document.getElementById("seoOut").textContent =
    `Title: ${title || "MISSING"} (${title.length} characters)
Meta description: ${desc || "MISSING"} (${desc.length} characters)
H1 headings: ${h1}
Images without alt text: ${missing}

This is a basic source check, not a full SEO audit or search-engine ranking prediction.`;
}

function makeFavicon() {
  let c = document.getElementById("favCanvas");
  let x = c.getContext("2d");
  let bg = document.getElementById("favBg").value;
  let fg = document.getElementById("favFg").value;
  let t = document.getElementById("favText").value || "N";

  x.clearRect(0, 0, 256, 256);
  x.fillStyle = bg;
  x.beginPath();
  x.roundRect(0, 0, 256, 256, 48);
  x.fill();

  x.fillStyle = fg;
  x.font = "bold 145px Arial";
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillText(t, 128, 132);
}

function downloadFavicon() {
  let a = document.createElement("a");
  a.href = document.getElementById("favCanvas").toDataURL();
  a.download = "nova-favicon.png";
  a.click();
}

renderTools();