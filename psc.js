function updateNonCursor() {
    const allChildren = document.body.querySelectorAll('*');
    allChildren.forEach(element => {element.style.cursor = 'none';});
    setTimeout(updateNonCursor, 1000)
}
updateNonCursor();

let main = document.createElement('canvas')
main.id = "main";
const ctx = main.getContext("2d");
document.body.prepend(main);
main.style.pointerEvents = "none";
main.style.position = "absolute";
main.style.zIndex = '9999';

let cum = document.createElement('canvas');
cum.id="cum";
const tx = cum.getContext("2d");
document.body.prepend(cum);
cum.style.pointerEvents = "none";
cum.style.position = "absolute";
cum.style.zIndex = '999';
cum.height = cum.width = 0;

let pxs = 5;
let cuming = false;

function updatePenisHW() {
    const fullHeight = Math.max(document.body.scrollHeight,document.body.clientHeight,document.documentElement.clientHeight);
    const fullWidth = Math.max(document.body.scrollWidth,document.body.clientWidth,document.documentElement.clientWidth);
    main.width = fullWidth;
    main.height = fullHeight;
    setTimeout(updatePenisHW, 5000)
}
updatePenisHW();

let lastPenis = null;
function renderPenis(event) {
    const overlay = main.getBoundingClientRect();
    const x1 = Math.floor((event.clientX - overlay.left) / pxs) * pxs;
    const y1 = Math.floor((event.clientY - overlay.top) / pxs) * pxs;
    if (lastPenis) {
        ctx.clearRect(lastPenis.x-pxs, lastPenis.y-pxs, pxs*19, pxs*21)
    }
    drawPenis(x1, y1, pxs);
    lastPenis = {x: x1, y: y1}
}
function drawPenis(x, y, px) {
    ctx.fillStyle="#ffdbac";
    for (let i=0; i<14; i++) {ctx.fillRect(x + 2*px + i*px, y + px + i*px, px, 3*px)}
    ctx.fillRect(x + 16*px, y + 15*px, px, px);ctx.fillRect(x + 8*px, y + 13*px, px, 3*px)
    for (let i=0; i<4; i++) {ctx.fillRect(x + 9*px +i*px, y + 11*px + i*px, px, 6*px)}
    ctx.fillRect(x + 13*px, y + 15*px, 2*px, 4*px);
    ctx.fillStyle="#3c372a";
    for (let i=0; i<15; i++) {ctx.fillRect(x + 3*px + i*px, y + px + i*px, px, px)}
    for (let i=0; i<11; i++) {ctx.fillRect(x + px + i*px, y + 3*px + i*px, px, px)}
    for (let i=0; i<3; i++) {ctx.fillRect(x + 16*px - i*px, y + 16*px + i*px, px, px);ctx.fillRect(x + 8*px + i*px, y + 16*px + i*px, px, px)}
    ctx.fillRect(x + 11*px, y + 19*px, 3*px, px);ctx.fillRect(x + 7*px, y + 13*px, px, 3*px);ctx.fillRect(x + 9*px, y + 15*px, px, 3*px);
    ctx.fillRect(x + 8*px, y + 12*px, px, px);ctx.fillRect(x + 10*px, y + 14*px, px, px);
    ctx.fillStyle="#FF1493"; //strokeGlans
    ctx.beginPath();ctx.moveTo(x, y-px);ctx.lineTo(x+2*px, y-px);ctx.lineTo(x+2*px, y+3*px);ctx.lineTo(x, y+3*px);ctx.closePath();ctx.fill();
    ctx.beginPath();ctx.moveTo(x-px, y);ctx.lineTo(x-px, y+2*px);ctx.lineTo(x+3*px, y+2*px);ctx.lineTo(x+3*px, y);ctx.closePath();ctx.fill();
    ctx.fillStyle="#FFC0CB";ctx.fillRect(x, y, px*2, px*2); //glans
}
document.body.addEventListener("mousemove", renderPenis);

let cumtextcss = `
#cm {
    position: absolute;
    font-family: 'Comic Sans MS', cursive;
    z-index: 500;
    margin: 0 auto;
    width:1000px;
    text-align: center;
    font-size: 180px;
    font-weight: bold;
    display: none;
    top: 200px;
    right: 100px;
}`;
let ctxt = document.createElement("style");
ctxt.innerHTML = cumtextcss;
document.head.append(ctxt);

function cumText() {
    let cumtxt = document.createElement("h1")
    cumtxt.innerHTML="CUMSHOT!";
    cumtxt.id = "cm";
    document.body.append(cumtxt);
    document.body.addEventListener("contextmenu", () => {cumtxt.style.display = "block"; setTimeout(() => {cumtxt.style.display = "none"}, 5000)});
}
cumText();

cumNoise = ["rgba(222, 229, 228, 0.49)",  "rgba(229, 229, 228, 0.77)"];
function cumShot(event) {
    const b = cum.getBoundingClientRect();
    const x1 = event.clientX - b.left
    const y1 = event.clientY - b.top
    tx.fillStyle = cumNoise[Math.floor(Math.random() * 3)];
    tx.beginPath();tx.arc(x1, y1, Math.random() * 40, 0, Math.PI*2, false);tx.closePath();
    tx.fill();
}
function cumHW() {
    const fullHeight = Math.max(document.body.scrollHeight,document.body.clientHeight,document.documentElement.clientHeight);
    const fullWidth = Math.max(document.body.scrollWidth,document.body.clientWidth,document.documentElement.clientWidth);
    cum.width = fullWidth;
    cum.height = fullHeight;
    setTimeout(() => {cum.width = cum.height = 0}, 10000)
}
document.body.addEventListener("contextmenu", cumHW);
document.body.addEventListener("mousemove", cumShot)
