import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const root=process.cwd()+'/site';
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.json':'application/json'};
const srv=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(q.url.split('?')[0].split('#')[0]));if(f.endsWith('/'))f+='index.html';if(!fs.existsSync(f))f+='.html';if(!fs.existsSync(f)){r.statusCode=404;return r.end()}r.setHeader('content-type',types[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(r)}).listen(8124);
const b=await chromium.launch();
const pages=['index','maintenance','metiers','groupe','informations','contact','404'];
const widths=(process.env.W||'1910,1440,1340,1280,1024,900,768,600,375,320').split(',').map(Number);
const shots=(process.env.SHOTS||'').split(',');
for(const w of widths)for(const pg of pages){
 const p=await b.newPage({viewport:{width:w,height:900}});const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('requestfailed',r=>errs.push('fail '+r.url()));
 p.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('404.html'))errs.push(r.status()+' '+r.url())});
 await p.goto(`http://localhost:8124/${pg}.html`);
 // défiler toute la page pour déclencher les apparitions
 await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,40))}scrollTo(0,0);await new Promise(r=>setTimeout(r,900))});
 const res=await p.evaluate(()=>{
  const out=[];const W=innerWidth;
  if(document.documentElement.scrollWidth>W+1)out.push('débordement horizontal '+document.documentElement.scrollWidth);
  const hidden=[...document.querySelectorAll('.reveal')].filter(e=>getComputedStyle(e).opacity<0.99);
  if(hidden.length)out.push('reveal cachés '+hidden.length);
  const secs=[...document.querySelectorAll('main>*')];
  const R=e=>e.getBoundingClientRect();
  for(let i=0;i<secs.length-1;i++){const a=R(secs[i]),c=R(secs[i+1]);if(a.bottom>c.top+1&&a.height&&c.height)out.push(`sections ${i}/${i+1} se chevauchent ${Math.round(a.bottom-c.top)}px`)}
  secs.forEach((s,i)=>{const sr=R(s);const cs=getComputedStyle(s);
    s.querySelectorAll('*').forEach(e=>{if(e.closest('[id=trade-track],.carousel-viewport,.service-carousel,nav,.visually-hidden,.sr-only'))return;const r=R(e);if(!r.width||!r.height)return;const st=getComputedStyle(e);if(st.position==='fixed'||st.visibility==='hidden')return;
      if(r.bottom>sr.bottom+2||r.top<sr.top-2||r.right>W+1||r.left<-1){out.push(`sec${i}(${s.className}) déborde: <${e.tagName.toLowerCase()} class="${e.className&&e.className.baseVal===undefined?e.className:''}"> ${Math.round(r.top-sr.top)}..${Math.round(r.bottom-sr.bottom)} x${Math.round(r.left)}-${Math.round(r.right)}`)}});
  });
  // texte coupé
  document.querySelectorAll('h1,h2,h3,p,a,button,li,span,label').forEach(e=>{if(e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflow!=='visible'&&e.clientWidth)out.push('texte coupé '+e.tagName+' '+e.textContent.trim().slice(0,30))});
  return [...new Set(out)].slice(0,12);
 });
 if(res.length||errs.length)console.log(w,pg,JSON.stringify(res),errs.slice(0,4));
 if(shots.includes(`${pg}@${w}`))await p.screenshot({path:`/tmp/audit-${pg}-${w}.png`,fullPage:true});
 await p.close();}
await b.close();srv.close();console.log('fin');
