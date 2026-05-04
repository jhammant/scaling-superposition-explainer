const els = {
  width: document.querySelector('#width'), concepts: document.querySelector('#concepts'), skew: document.querySelector('#skew'), strength: document.querySelector('#strength'),
  widthOut: document.querySelector('#widthOut'), conceptOut: document.querySelector('#conceptOut'), skewOut: document.querySelector('#skewOut'), strengthOut: document.querySelector('#strengthOut'),
  strongMetric: document.querySelector('#strongMetric'), weakMetric: document.querySelector('#weakMetric'), pressureMetric: document.querySelector('#pressureMetric'), chart: document.querySelector('#chart')
};
const ctx = els.chart.getContext('2d');
const widths = [64,128,256,512,1024,2048,4096,8192];
const fmt = new Intl.NumberFormat('en-US');
function strongError(width, concepts, strength) {
  const pressure = concepts / width;
  return strength * Math.min(1.2, 70 / width) * Math.log10(pressure + 2);
}
function weakError(width, concepts, skew) {
  const stored = Math.min(concepts, width * (2.2 + skew));
  const tail = Math.max(0, 1 - stored / concepts);
  return Math.pow(tail, Math.max(0.35, skew)) * 0.95;
}
function draw() {
  const width = +els.width.value, concepts = +els.concepts.value, skew = +els.skew.value, strength = +els.strength.value;
  els.widthOut.value = fmt.format(width); els.conceptOut.value = fmt.format(concepts); els.skewOut.value = skew.toFixed(2); els.strengthOut.value = strength.toFixed(2);
  const strong = widths.map(w => strongError(w, concepts, strength));
  const weak = widths.map(w => weakError(w, concepts, skew));
  const maxY = Math.max(...strong, ...weak, .02) * 1.18;
  const { width: cw, height: ch } = els.chart;
  ctx.clearRect(0,0,cw,ch);
  const pad = { l: 70, r: 28, t: 34, b: 62 };
  const plotW = cw - pad.l - pad.r, plotH = ch - pad.t - pad.b;
  ctx.font = '22px system-ui'; ctx.fillStyle = '#eef6ff'; ctx.fillText('Toy scaling error vs model width', pad.l, 28);
  ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 1;
  for (let i=0;i<=4;i++) { const y = pad.t + plotH * i/4; ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(cw-pad.r,y); ctx.stroke(); }
  const x = i => pad.l + plotW * i/(widths.length-1);
  const y = v => pad.t + plotH * (1 - v/maxY);
  function line(vals, color) { ctx.strokeStyle = color; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); vals.forEach((v,i)=> i ? ctx.lineTo(x(i),y(v)) : ctx.moveTo(x(i),y(v))); ctx.stroke(); vals.forEach((v,i)=>{ctx.fillStyle=color; ctx.beginPath(); ctx.arc(x(i), y(v), 6, 0, Math.PI*2); ctx.fill();}); }
  line(strong, '#5ee7ff'); line(weak, '#fb923c');
  ctx.fillStyle = '#9fb3c8'; ctx.font = '15px system-ui';
  widths.forEach((w,i)=>{ ctx.fillText(w >= 1000 ? `${w/1024}k` : w, x(i)-13, ch-24); });
  ctx.save(); ctx.translate(22, ch/2+60); ctx.rotate(-Math.PI/2); ctx.fillText('relative error', 0, 0); ctx.restore();
  const idx = widths.reduce((best,w,i)=> Math.abs(w-width) < Math.abs(widths[best]-width) ? i : best, 0);
  ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.setLineDash([6,8]); ctx.beginPath(); ctx.moveTo(x(idx), pad.t); ctx.lineTo(x(idx), ch-pad.b); ctx.stroke(); ctx.setLineDash([]);
  const s = strongError(width, concepts, strength), wk = weakError(width, concepts, skew);
  els.strongMetric.textContent = s.toFixed(3);
  els.weakMetric.textContent = wk.toFixed(3);
  els.pressureMetric.textContent = `${(concepts/width).toFixed(1)}×`;
}
document.querySelectorAll('input').forEach(input => input.addEventListener('input', draw));
draw();
