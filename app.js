"use strict";

/* NOVA AI — Frontend Tool Engine
   Payment verification and account security require a backend.
*/

const tools = [
  {id:"qr",name:"QR Code Generator",icon:"▦",category:"Business",price:799,desc:"Create QR codes from links or text.",kind:"qr"},
  {id:"barcode",name:"Barcode Generator",icon:"▥",category:"Business",price:699,desc:"Generate printable barcodes.",kind:"barcode"},
  {id:"compress",name:"Image Compressor",icon:"▧",category:"Images",price:899,desc:"Reduce image file size in your browser.",kind:"compress"},
  {id:"resize",name:"Image Resizer",icon:"▣",category:"Images",price:699,desc:"Resize images to custom dimensions.",kind:"resize"},
  {id:"invoice",name:"Invoice Generator Pro",icon:"▤",category:"Business",price:999,desc:"Create and print professional invoices.",kind:"invoice"},
  {id:"resume",name:"Resume Builder",icon:"▧",category:"Writing",price:1299,desc:"Build a clean professional resume.",kind:"resume"},
  {id:"pdf",name:"PDF Merge Studio",icon:"▦",category:"PDF",price:999,desc:"Combine multiple PDF files.",kind:"pdf"},
  {id:"thumbnail",name:"YouTube Thumbnail Maker",icon:"▣",category:"Design",price:999,desc:"Create a thumbnail and download it.",kind:"thumbnail"},
  {id:"social",name:"Social Media Design Maker",icon:"✦",category:"Design",price:1199,desc:"Design a simple social media graphic.",kind:"social"},
  {id:"seo",name:"SEO Source Analyzer",icon:"⌕",category:"Business",price:1299,desc:"Check title, description and headings.",kind:"seo"},
  {id:"favicon",name:"Favicon Maker",icon:"◈",category:"Design",price:599,desc:"Create a small icon from an image.",kind:"favicon"},
  {id:"word",name:"Word Counter Pro",icon:"≡",category:"Writing",price:599,desc:"Count words, characters and sentences.",kind:"word"},
  {id:"case",name:"Text Case Converter",icon:"Aa",category:"Writing",price:599,desc:"Convert text into different cases.",kind:"case"},
  {id:"json",name:"JSON Formatter",icon:"{}",category:"Developer",price:599,desc:"Format and validate JSON data.",kind:"json"},
  {id:"password",name:"Password Generator",icon:"⌑",category:"Developer",price:699,desc:"Generate random strong passwords.",kind:"password"},
  {id:"calculator",name:"Smart Calculator",icon:"＋",category:"Business",price:599,desc:"Calculate everyday expressions.",kind:"calculator"},
  {id:"percentage",name:"Percentage Calculator",icon:"％",category:"Business",price:599,desc:"Calculate percentages quickly.",kind:"percentage"},
  {id:"color",name:"Color Studio",icon:"◉",category:"Design",price:699,desc:"Explore and copy color codes.",kind:"color"},
  {id:"unit",name:"Unit Converter",icon:"⇄",category:"Business",price:599,desc:"Convert common measurements.",kind:"unit"},
  {id:"notes",name:"Notes Exporter",icon:"▤",category:"Writing",price:599,desc:"Write notes and export as text.",kind:"notes"},
  {id:"binary",name:"Binary Converter",icon:"01",category:"Developer",price:699,desc:"Convert text and binary values.",kind:"binary"},
  {id:"planner",name:"Social Media Content Planner",icon:"▦",category:"Marketing",price:1000,desc:"Plan posts for your content calendar.",kind:"planner"},
  {id:"listing",name:"Product Listing Writer",icon:"✎",category:"Marketing",price:800,desc:"Create product titles and descriptions.",kind:"listing"},
  {id:"profit",name:"Profit Margin Calculator",icon:"％",category:"Business",price:700,desc:"Calculate profit, margin and markup.",kind:"profit"},
  {id:"quotation",name:"Invoice & Quotation Pro",icon:"▤",category:"Business",price:800,desc:"Prepare a quotation for your customer.",kind:"quotation"},
  {id:"caption",name:"Bio & Caption Writer",icon:"✦",category:"Marketing",price:700,desc:"Generate editable caption ideas.",kind:"caption"}
];

let activeCategory = "All";
let selectedTool = null;

const $ = id => document.getElementById(id);
const money = amount => "Rs. " + Number(amount).toLocaleString("en-PK");

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  })[char]);
}

function renderTools() {
  const search = ($("search")?.value || "").toLowerCase();

  const filtered = tools.filter(tool => {
    const categoryMatch = activeCategory === "All" || tool.category === activeCategory;
    const searchMatch = (tool.name + " " + tool.desc + " " + tool.category)
      .toLowerCase().includes(search);
    return categoryMatch && searchMatch;
  });

  $("toolCount").textContent = filtered.length + " tools";

  $("toolGrid").innerHTML = filtered.map(tool => `
    <article class="tool-card">
      <div class="tool-icon">${escapeHTML(tool.icon)}</div>
      <h3>${escapeHTML(tool.name)}</h3>
      <p>${escapeHTML(tool.desc)}</p>
      <div class="tool-card-bottom">
        <span class="tool-price">${money(tool.price)}</span>
        <button class="tool-open" onclick="openTool('${tool.id}')">Open →</button>
      </div>
    </article>
  `).join("") || "<p>No tools found.</p>";
}

function renderCategories() {
  const categories = ["All", ...new Set(tools.map(tool => tool.category))];

  $("categories").innerHTML = categories.map(category => `
    <button class="category-btn ${activeCategory === category ? "active" : ""}"
      onclick="setCategory('${category}')">${escapeHTML(category)}</button>
  `).join("");
}

function setCategory(category) {
  activeCategory = category;
  renderCategories();
  renderTools();
}

function toggleMenu() {
  $("nav").classList.toggle("open");
}

function closeTool() {
  $("workspace").classList.remove("show");
  selectedTool = null;
}

function openTool(id) {
  const tool = tools.find(item => item.id === id);
  if (!tool) return;

  selectedTool = tool;

  $("workTitle").textContent = tool.name;
  $("workDescription").textContent = tool.desc;
  $("workspace").classList.add("show");
  $("workContent").innerHTML = toolInterface(tool.kind);

  $("workspace").scrollIntoView({behavior:"smooth",block:"start"});
}

function field(label, id, placeholder="", type="text") {
  return `
    <label>${escapeHTML(label)}</label>
    <input id="${id}" type="${type}" placeholder="${escapeHTML(placeholder)}">
  `;
}

function area(label, id, placeholder="Enter text here...") {
  return `
    <label>${escapeHTML(label)}</label>
    <textarea id="${id}" placeholder="${escapeHTML(placeholder)}"></textarea>
  `;
}

function action(label, fn) {
  return `<button type="button" onclick="${fn}">${escapeHTML(label)}</button>`;
}

function toolInterface(kind) {
  switch(kind) {
    case "qr":
      return `
        ${field("Enter URL or text","qrText","https://example.com")}
        ${action("Generate QR Code","generateQR()")}
        <div id="qrResult" class="result"></div>`;

    case "barcode":
      return `
        ${field("Enter barcode number","barcodeText","123456789")}
        ${action("Generate Barcode","generateBarcode()")}
        <div class="result"><svg id="barcodeResult"></svg></div>`;

    case "compress":
      return `
        <label>Select image</label>
        <input id="imageFile" type="file" accept="image/*">
        ${field("Quality (0.1 to 1)","imageQuality","0.7","number")}
        ${action("Compress Image","compressImage()")}
        <div id="imageResult" class="result"></div>`;

    case "resize":
      return `
        <label>Select image</label>
        <input id="resizeFile" type="file" accept="image/*">
        ${field("Width in pixels","resizeWidth","800","number")}
        ${field("Height in pixels","resizeHeight","600","number")}
        ${action("Resize Image","resizeImage()")}
        <div id="resizeResult" class="result"></div>`;

    case "invoice":
    case "quotation":
      return `
        ${field("Business name","invBusiness","NOVA AI")}
        ${field("Customer name","invCustomer","Customer")}
        ${field("Document number","invNumber","INV-001")}
        ${field("Date","invDate",new Date().toISOString().slice(0,10),"date")}
        ${field("Item / service","invItem","Digital service")}
        ${field("Quantity","invQty","1","number")}
        ${field("Unit price (PKR)","invPrice","1000","number")}
        ${action("Create & Print Document","createInvoice('${kind}')")}
        <div id="invoiceResult"></div>`;

    case "resume":
      return `
        ${field("Full name","cvName","Your name")}
        ${field("Email","cvEmail","you@example.com","email")}
        ${field("Phone","cvPhone","Phone number")}
        ${field("Professional title","cvTitle","Your profession")}
        ${area("About you","cvAbout")}
        ${area("Skills","cvSkills","Communication, teamwork...")}
        ${area("Education","cvEducation")}
        ${area("Experience","cvExperience")}
        ${action("Build Resume","buildResume()")}
        <div id="resumeResult"></div>`;

    case "pdf":
      return `
        <label>Select PDF files</label>
        <input id="pdfFiles" type="file" accept="application/pdf" multiple>
        ${action("Merge PDFs","mergePDFs()")}
        <div id="pdfResult"></div>`;

    case "thumbnail":
    case "social":
      return `
        ${field("Main heading","designHeading","YOUR BIG TITLE")}
        ${field("Subtitle","designSubtitle","Add your subtitle")}
        ${field("Background color","designColor","#151724","color")}
        ${field("Text color","designTextColor","#ffffff","color")}
        ${field("Canvas width","designWidth",kind==="thumbnail"?"1280":"1080","number")}
        ${field("Canvas height","designHeight",kind==="thumbnail"?"720":"1080","number")}
        ${action("Create Design","createDesign()")}
        <div class="result"><canvas id="designCanvas" style="width:100%"></canvas></div>
        ${action("Download Design","downloadDesign()")}`;

    case "seo":
      return `
        ${area("Paste HTML source code","seoHTML","Paste your webpage HTML here...")}
        ${action("Analyze SEO","analyzeSEO()")}
        <div id="seoResult" class="result"></div>`;

    case "favicon":
      return `
        <label>Select image</label>
        <input id="faviconFile" type="file" accept="image/*">
        ${action("Create Favicon","createFavicon()")}
        <div id="faviconResult"></div>`;

    case "word":
      return `
        ${area("Your text","wordText")}
        <div id="wordResult" class="result"></div>
        <button onclick="countWords()">Count Text</button>`;

    case "case":
      return `
        ${area("Enter text","caseText")}
        <select id="caseType">
          <option value="upper">UPPERCASE</option>
          <option value="lower">lowercase</option>
          <option value="title">Title Case</option>
          <option value="sentence">Sentence case</option>
        </select>
        ${action("Convert Text","convertCase()")}
        <div id="caseResult" class="result"></div>`;

    case "json":
      return `
        ${area("JSON input","jsonText",'{"name":"NOVA AI","active":true}')}
        ${action("Format JSON","formatJSON()")}
        <div id="jsonResult" class="result"></div>`;

    case "password":
      return `
        ${field("Password length","passLength","16","number")}
        <label><input id="passSymbols" type="checkbox" checked> Include symbols</label>
        ${action("Generate Password","generatePassword()")}
        <div id="passwordResult" class="result"></div>`;

    case "calculator":
      return `
        ${field("Expression","calcInput","(25+10)*2")}
        ${action("Calculate","calculate()")}
        <div id="calcResult" class="result"></div>`;

    case "percentage":
      return `
        ${field("Value","percentValue","200","number")}
        ${field("Percentage","percentRate","15","number")}
        ${action("Calculate Percentage","calculatePercentage()")}
        <div id="percentResult" class="result"></div>`;

    case "color":
      return `
        <label>Choose a color</label>
        <input id="colorPicker" type="color" value="#d9ad58" oninput="showColor()">
        <div id="colorResult" class="result"></div>
        ${action("Copy HEX","copyColor()")}`;

    case "unit":
      return `
        ${field("Value","unitValue","1","number")}
        <select id="unitType">
          <option value="km-mi">Kilometers to Miles</option>
          <option value="mi-km">Miles to Kilometers</option>
          <option value="kg-lb">Kilograms to Pounds</option>
          <option value="lb-kg">Pounds to Kilograms</option>
          <option value="cm-in">Centimeters to Inches</option>
          <option value="in-cm">Inches to Centimeters</option>
          <option value="c-f">Celsius to Fahrenheit</option>
          <option value="f-c">Fahrenheit to Celsius</option>
        </select>
        ${action("Convert","convertUnit()")}
        <div id="unitResult" class="result"></div>`;

    case "notes":
      return `
        ${field("Note title","noteTitle","My Notes")}
        ${area("Write your notes","noteText")}
        ${action("Download Notes","downloadNotes()")}`;

    case "binary":
      return `
        ${area("Enter text or binary","binaryInput","Hello")}
        <select id="binaryMode">
          <option value="toBinary">Text to Binary</option>
          <option value="toText">Binary to Text</option>
        </select>
        ${action("Convert","convertBinary()")}
        <div id="binaryResult" class="result"></div>`;

    case "planner":
      return `
        ${field("Business / page name","planName","My Business")}
        ${field("Platform","planPlatform","Instagram")}
        ${field("Number of days","planDays","7","number")}
        ${field("Main topic","planTopic","Your topic")}
        ${action("Create Content Plan","createPlanner()")}
        <div id="plannerResult" class="result"></div>`;

    case "listing":
      return `
        ${field("Product name","productName","Product name")}
        ${field("Main features","productFeatures","Feature one, feature two")}
        ${field("Target customer","productAudience","General customers")}
        <select id="productTone">
          <option>Professional</option>
          <option>Friendly</option>
          <option>Luxury</option>
          <option>Simple</option>
        </select>
        ${action("Create Listing Draft","createListing()")}
        <div id="listingResult" class="result"></div>`;

    case "profit":
      return `
        ${field("Cost price (PKR)","profitCost","1000","number")}
        ${field("Selling price (PKR)","profitSell","1500","number")}
        ${action("Calculate Profit","calculateProfit()")}
        <div id="profitResult" class="result"></div>`;

    case "caption":
      return `
        ${field("Topic / product","captionTopic","Your topic")}
        <select id="captionPlatform">
          <option>Instagram</option>
          <option>Facebook</option>
          <option>TikTok</option>
          <option>LinkedIn</option>
        </select>
        <select id="captionStyle">
          <option>Professional</option>
          <option>Funny</option>
          <option>Motivational</option>
          <option>Luxury</option>
        </select>
        ${action("Generate Caption Ideas","createCaptions()")}
        <div id="captionResult" class="result"></div>`;

    default:
      return "<p>This tool is not available.</p>";
  }
}

function result(id, html) {
  const element = $(id);
  if (element) element.innerHTML = html;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadText(text, filename) {
  downloadBlob(new Blob([text], {type:"text/plain;charset=utf-8"}), filename);
}

function generateQR() {
  const text = $("qrText").value.trim();
  if (!text) return alert("Enter text or URL first.");
  const box = $("qrResult");
  box.innerHTML = "";
  new QRCode(box, {text,width:220,height:220});
}

function generateBarcode() {
  const value = $("barcodeText").value.trim();
  if (!value) return alert("Enter a barcode value.");
  try {
    JsBarcode("#barcodeResult", value, {format:"CODE128",displayValue:true});
  } catch(error) {
    alert("Could not create barcode. Check your input.");
  }
}

function loadImage(file) {
  return new Promise((resolve,reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = reject;
    image.src = url;
  });
}

async function compressImage() {
  const file = $("imageFile").files[0];
  if (!file) return alert("Select an image.");
  const image = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d").drawImage(image,0,0);
  const quality = Math.min(1,Math.max(.1,Number($("imageQuality").value)||.7));
  canvas.toBlob(blob => {
    if (!blob) return alert("Compression failed.");
    result("imageResult",`
      <p>Original: ${(file.size/1024).toFixed(1)} KB</p>
      <p>Compressed: ${(blob.size/1024).toFixed(1)} KB</p>
      <button onclick="downloadBlob(window.lastImageBlob,'compressed-image.jpg')">Download Image</button>
    `);
    window.lastImageBlob = blob;
  },"image/jpeg",quality);
}

async function resizeImage() {
  const file = $("resizeFile").files[0];
  if (!file) return alert("Select an image.");
  const image = await loadImage(file);
  const width = Math.max(1,Number($("resizeWidth").value)||800);
  const height = Math.max(1,Number($("resizeHeight").value)||600);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(image,0,0,width,height);
  canvas.toBlob(blob => {
    if (!blob) return alert("Resize failed.");
    window.lastResizeBlob = blob;
    result("resizeResult",`
      <p>New size: ${width} × ${height}</p>
      <button onclick="downloadBlob(window.lastResizeBlob,'resized-image.png')">Download Image</button>
    `);
  },"image/png");
}

function createInvoice(kind) {
  const business = $("invBusiness").value.trim();
  const customer = $("invCustomer").value.trim();
  const number = $("invNumber").value.trim();
  const date = $("invDate").value;
  const item = $("invItem").value.trim();
  const qty = Math.max(0,Number($("invQty").value)||0);
  const price = Math.max(0,Number($("invPrice").value)||0);
  const total = qty * price;
  const heading = kind === "quotation" ? "QUOTATION" : "INVOICE";

  const html = `
    <div class="result" style="background:white;color:#111;padding:25px">
      <h2>${heading}</h2>
      <h3>${escapeHTML(business)}</h3>
      <p>Document: ${escapeHTML(number)}</p>
      <p>Date: ${escapeHTML(date)}</p>
      <p>Customer: ${escapeHTML(customer)}</p>
      <hr>
      <p>${escapeHTML(item)} — ${qty} × ${money(price)}</p>
      <h2>Total: ${money(total)}</h2>
    </div>
    <button onclick="window.print()">Print / Save PDF</button>
  `;

  result("invoiceResult",html);
}

function buildResume() {
  const values = ["cvName","cvEmail","cvPhone","cvTitle","cvAbout","cvSkills","cvEducation","cvExperience"]
    .map(id => $(id).value.trim());

  const [name,email,phone,title,about,skills,education,experience] = values;

  const html = `
    <div class="result" style="background:white;color:#111;padding:25px">
      <h1>${escapeHTML(name)}</h1>
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(email)} | ${escapeHTML(phone)}</p>
      <h3>Profile</h3><p>${escapeHTML(about)}</p>
      <h3>Skills</h3><p>${escapeHTML(skills)}</p>
      <h3>Education</h3><p>${escapeHTML(education)}</p>
      <h3>Experience</h3><p>${escapeHTML(experience)}</p>
    </div>
    <button onclick="window.print()">Print / Save PDF</button>
  `;

  result("resumeResult",html);
}

async function mergePDFs() {
  const files = [...$("pdfFiles").files];
  if (files.length < 2) return alert("Select at least two PDF files.");
  if (!window.PDFLib) return alert("PDF library did not load.");

  try {
    const merged = await PDFLib.PDFDocument.create();

    for (const file of files) {
      const pdf = await PDFLib.PDFDocument.load(await file.arrayBuffer());
      const pages = await merged.copyPages(pdf,pdf.getPageIndices());
      pages.forEach(page => merged.addPage(page));
    }

    const bytes = await merged.save();
    downloadBlob(new Blob([bytes],{type:"application/pdf"}),"merged.pdf");
    result("pdfResult","<p>PDF files merged successfully.</p>");
  } catch(error) {
    alert("Unable to merge these PDF files.");
  }
}

function createDesign() {
  const canvas = $("designCanvas");
  const width = Math.max(100,Number($("designWidth").value)||1080);
  const height = Math.max(100,Number($("designHeight").value)||1080);
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = $("designColor").value;
  ctx.fillRect(0,0,width,height);

  ctx.fillStyle = $("designTextColor").value;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const heading = $("designHeading").value || "YOUR BIG TITLE";
  const subtitle = $("designSubtitle").value || "";

  ctx.font = `bold ${Math.floor(width/12)}px Arial`;
  wrapText(ctx,heading,width/2,height/2,width*.82,Math.floor(width/9));

  ctx.font = `${Math.floor(width/28)}px Arial`;
  ctx.fillText(subtitle,width/2,height*.75);
}

function wrapText(ctx,text,x,y,maxWidth,lineHeight) {
  const words = text.split(/\s+/);
  let lines = [];
  let line = "";

  for (const word of words) {
    const test = line ? line+" "+word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else line = test;
  }

  if (line) lines.push(line);
  const start = y - ((lines.length-1)*lineHeight)/2;
  lines.forEach((line,index) => ctx.fillText(line,x,start+index*lineHeight));
}

function downloadDesign() {
  const canvas = $("designCanvas");
  if (!canvas.width) return alert("Create your design first.");
  canvas.toBlob(blob => downloadBlob(blob,"nova-design.png"));
}

function analyzeSEO() {
  const source = $("seoHTML").value;
  if (!source.trim()) return alert("Paste HTML first.");

  const doc = new DOMParser().parseFromString(source,"text/html");
  const title = doc.querySelector("title")?.textContent || "Missing";
  const description = doc.querySelector('meta[name="description"]')?.content || "Missing";
  const h1 = doc.querySelectorAll("h1").length;
  const images = doc.querySelectorAll("img").length;
  const missingAlt = [...doc.querySelectorAll("img")].filter(img => !img.hasAttribute("alt")).length;

  result("seoResult",`
    <p><b>Title:</b> ${escapeHTML(title)}</p>
    <p><b>Description:</b> ${escapeHTML(description)}</p>
    <p><b>H1 headings:</b> ${h1}</p>
    <p><b>Images:</b> ${images}</p>
    <p><b>Images missing alt:</b> ${missingAlt}</p>
    <p><b>Title length:</b> ${title.length} characters</p>
    <p><b>Description length:</b> ${description.length} characters</p>
    <p>This is a basic source check, not a full technical SEO audit.</p>
  `);
}

async function createFavicon() {
  const file = $("faviconFile").files[0];
  if (!file) return alert("Select an image.");
  const image = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,256,256);
  ctx.drawImage(image,0,0,256,256);
  canvas.toBlob(blob => {
    window.lastFaviconBlob = blob;
    result("faviconResult",`
      <p>Favicon created.</p>
      <button onclick="downloadBlob(window.lastFaviconBlob,'favicon.png')">Download PNG</button>
    `);
  },"image/png");
}

function countWords() {
  const text = $("wordText").value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  const sentences = text ? (text.match(/[.!?]+/g)||[]).length : 0;
  result("wordResult",`
    <p>Words: <b>${words}</b></p>
    <p>Characters: <b>${text.length}</b></p>
    <p>Characters without spaces: <b>${text.replace(/\s/g,"").length}</b></p>
    <p>Sentences: <b>${sentences}</b></p>
  `);
}

function convertCase() {
  const text = $("caseText").value;
  const mode = $("caseType").value;
  let output = text;

  if (mode === "upper") output = text.toUpperCase();
  if (mode === "lower") output = text.toLowerCase();
  if (mode === "title") output = text.toLowerCase().replace(/\b\w/g,char=>char.toUpperCase());
  if (mode === "sentence") output = text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g,char=>char.toUpperCase());

  result("caseResult",`
    <p>${escapeHTML(output)}</p>
    <button onclick="copyText(${JSON.stringify(output).replace(/</g,"\\u003c")})">Copy Text</button>
  `);
}

function formatJSON() {
  try {
    const parsed = JSON.parse($("jsonText").value);
    const output = JSON.stringify(parsed,null,2);
    result("jsonResult",`
      <pre>${escapeHTML(output)}</pre>
      <button onclick="copyText(${JSON.stringify(output).replace(/</g,"\\u003c")})">Copy JSON</button>
    `);
  } catch(error) {
    result("jsonResult","<p>Invalid JSON. Check commas, quotes and brackets.</p>");
  }
}

function generatePassword() {
  const length = Math.min(128,Math.max(8,Number($("passLength").value)||16));
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" +
    ($("passSymbols").checked ? "!@#$%^&*()-_=+[]{}?" : "");
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  const password = [...values].map(value=>chars[value%chars.length]).join("");

  result("passwordResult",`
    <p>${escapeHTML(password)}</p>
    <button onclick="copyText('${password}')">Copy Password</button>
  `);
}

function calculate() {
  const expression = $("calcInput").value.trim();
  if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
    return result("calcResult","<p>Only numbers and basic math operators are allowed.</p>");
  }

  try {
    const answer = Function('"use strict";return ('+expression+')')();
    if (!Number.isFinite(answer)) throw new Error();
    result("calcResult","<h3>"+answer+"</h3>");
  } catch(error) {
    result("calcResult","<p>Invalid calculation.</p>");
  }
}

function calculatePercentage() {
  const value = Number($("percentValue").value);
  const rate = Number($("percentRate").value);
  result("percentResult",`<h3>${(value*rate/100).toLocaleString()}</h3>`);
}

function showColor() {
  const color = $("colorPicker").value;
  const rgb = color.match(/[a-f0-9]{2}/gi).map(value=>parseInt(value,16));
  result("colorResult",`
    <div style="height:80px;border-radius:8px;background:${color}"></div>
    <p>HEX: ${color}</p>
    <p>RGB: ${rgb.join(", ")}</p>
  `);
}

function copyColor() {
  copyText($("colorPicker").value);
}

function convertUnit() {
  const value = Number($("unitValue").value);
  const type = $("unitType").value;
  const conversions = {
    "km-mi":value*.621371,
    "mi-km":value/ .621371,
    "kg-lb":value*2.20462,
    "lb-kg":value/2.20462,
    "cm-in":value/2.54,
    "in-cm":value*2.54,
    "c-f":value*9/5+32,
    "f-c":(value-32)*5/9
  };

  result("unitResult","<h3>"+conversions[type].toFixed(4)+"</h3>");
}

function downloadNotes() {
  const title = $("noteTitle").value || "My Notes";
  const text = $("noteText").value;
  downloadText(title+"\n\n"+text,"nova-notes.txt");
}

function convertBinary() {
  const input = $("binaryInput").value.trim();
  const mode = $("binaryMode").value;

  try {
    let output;

    if (mode === "toBinary") {
      output = [...new TextEncoder().encode(input)]
        .map(byte=>byte.toString(2).padStart(8,"0")).join(" ");
    } else {
      const bits = input.split(/\s+/);
      if (!bits.every(bit=>/^[01]{8}$/.test(bit))) throw new Error();
      output = new TextDecoder().decode(new Uint8Array(bits.map(bit=>parseInt(bit,2))));
    }

    result("binaryResult",`
      <p>${escapeHTML(output)}</p>
      <button onclick="copyText(${JSON.stringify(output).replace(/</g,"\\u003c")})">Copy Result</button>
    `);
  } catch(error) {
    result("binaryResult","<p>Invalid binary input. Use groups of 8 bits.</p>");
  }
}

function createPlanner() {
  const name = $("planName").value;
  const platform = $("planPlatform").value;
  const days = Math.min(30,Math.max(1,Number($("planDays").value)||7));
  const topic = $("planTopic").value;

  const formats = ["Educational post","Behind-the-scenes","Customer question","Product showcase","Quick tip","Story poll","Weekly recap"];

  const output = Array.from({length:days},(_,index)=>
    `Day ${index+1}: ${formats[index%formats.length]} — ${topic}`
  ).join("\n");

  result("plannerResult",`
    <p><b>${escapeHTML(name)} — ${escapeHTML(platform)}</b></p>
    <pre>${escapeHTML(output)}</pre>
    <button onclick="copyText(${JSON.stringify(output).replace(/</g,"\\u003c")})">Copy Plan</button>
  `);
}

function createListing() {
  const name = $("productName").value.trim();
  const features = $("productFeatures").value.trim();
  const audience = $("productAudience").value.trim();
  const tone = $("productTone").value;

  if (!name) return alert("Enter a product name.");

  const output = `${name}\n\nDiscover ${name}, designed for ${audience || "everyday use"}.\n\nKey features:\n${features}\n\nStyle: ${tone}\n\nContact us to learn more.`;

  result("listingResult",`
    <p>${escapeHTML(output)}</p>
    <button onclick="copyText(${JSON.stringify(output).replace(/</g,"\\u003c")})">Copy Listing</button>
  `);
}

function calculateProfit() {
  const cost = Number($("profitCost").value);
  const sell = Number($("profitSell").value);

  if (cost < 0 || sell < 0 || cost === 0) {
    return alert("Enter valid positive prices.");
  }

  const profit = sell-cost;
  const margin = profit/sell*100;
  const markup = profit/cost*100;

  result("profitResult",`
    <p>Profit: <b>${money(profit)}</b></p>
    <p>Profit margin: <b>${Number.isFinite(margin)?margin.toFixed(2):"N/A"}%</b></p>
    <p>Markup: <b>${markup.toFixed(2)}%</b></p>
  `);
}

function createCaptions() {
  const topic = $("captionTopic").value.trim();
  const platform = $("captionPlatform").value;
  const style = $("captionStyle").value;

  if (!topic) return alert("Enter a topic first.");

  const ideas = [
    `Discover something different with ${topic}.`,
    `A little more quality. A little more ${topic}.`,
    `Made to stand out. Explore ${topic} today.`,
    `Your next favourite might be ${topic}.`
  ];

  const output = `${platform} — ${style}\n\n`+
    ideas.map((idea,index)=>(index+1)+". "+idea).join("\n\n");

  result("captionResult",`
    <pre>${escapeHTML(output)}</pre>
    <button onclick="copyText(${JSON.stringify(output).replace(/</g,"\\u003c")})">Copy Ideas</button>
  `);
}

function copyText(text) {
  navigator.clipboard?.writeText(String(text))
    .then(()=>alert("Copied!"))
    .catch(()=>alert("Copy not available. Please select and copy the text."));
}

/* Basic frontend account interface.
   This is not secure authentication; use a backend before handling real accounts.
*/

function showAccount() {
  openModal("My Account",`
    <p>Create a local browser profile or sign in on this device.</p>
    ${field("Email","accountEmail","you@example.com","email")}
    ${field("Password","accountPassword","Password","password")}
    <button onclick="registerAccount()">Create Account</button>
    <button onclick="loginAccount()">Login</button>
    <div id="accountMessage"></div>
    <p>Accounts created here are stored only in this browser. This is not secure authentication.</p>
  `);
}

function openModal(title,content) {
  $("modalTitle").textContent = title;
  $("modalContent").innerHTML = content;
  $("modal").classList.add("show");
}

function closeModal() {
  $("modal").classList.remove("show");
}

function getAccounts() {
  try {
    return JSON.parse(localStorage.getItem("novaAccounts")||"[]");
  } catch {
    return [];
  }
}

function registerAccount() {
  const email = $("accountEmail").value.trim().toLowerCase();
  const password = $("accountPassword").value;

  if (!email || password.length < 8) {
    return result("accountMessage","<p>Enter a valid email and password with at least 8 characters.</p>");
  }

  const accounts = getAccounts();
  if (accounts.some(account=>account.email===email)) {
    return result("accountMessage","<p>This email already has an account. Please login.</p>");
  }

  accounts.push({email,password});
  localStorage.setItem("novaAccounts",JSON.stringify(accounts));
  result("accountMessage","<p>Browser profile created. Please login.</p>");
}

function loginAccount() {
  const email = $("accountEmail").value.trim().toLowerCase();
  const password = $("accountPassword").value;
  const account = getAccounts().find(item=>item.email===email && item.password===password);

  if (!account) return result("accountMessage","<p>Email or password is incorrect.</p>");

  localStorage.setItem("novaLoggedIn",email);
  result("accountMessage","<p>Logged in on this browser as "+escapeHTML(email)+".</p>");
}

/* Manual payment request.
   Never mark a payment as verified from a browser-only form.
*/

function paymentRequest(toolId) {
  const tool = tools.find(item=>item.id===toolId);
  if (!tool) return;

  openModal("Payment Instructions",`
    <p><b>${escapeHTML(tool.name)}</b> — ${money(tool.price)}</p>
    <p>Easypaisa: <b>03420604105</b></p>
    <p>JazzCash: <b>03174453242</b></p>
    <p>Account name: <b>NOVA AI</b></p>
    ${field("Your name","payName","Full name")}
    ${field("Your email","payEmail","Email address","email")}
    ${field("Transaction ID","payTransaction","Payment reference")}
    <button onclick="sendPaymentRequest('${tool.id}')">Send Payment Request</button>
    <p>Access is provided only after the payment is manually checked.</p>
  `);
}

function sendPaymentRequest(toolId) {
  const tool = tools.find(item=>item.id===toolId);
  const name = $("payName").value.trim();
  const email = $("payEmail").value.trim();
  const transaction = $("payTransaction").value.trim();

  if (!name || !email || !transaction) {
    return alert("Complete all payment request fields.");
  }

  const message =
    `NOVA AI PAYMENT REQUEST\n`+
    `Tool: ${tool.name}\n`+
    `Amount: ${money(tool.price)}\n`+
    `Name: ${name}\n`+
    `Email: ${email}\n`+
    `Transaction ID: ${transaction}`;

  window.open("https://wa.me/923471016620?text="+encodeURIComponent(message),"_blank");
}

document.addEventListener("DOMContentLoaded",()=>{
  $("year").textContent = new Date().getFullYear();
  renderCategories();
  renderTools();
  showColor;
});
