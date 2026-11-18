import{a as e,c as t,d as n,f as r,glyphAtlas as i,i as a,l as o,n as s,o as c,r as l,s as u,t as d,u as f}from"./scene.CguJRsHo.js";var p={dark:{bg:`#0a1412`,ink:`#5cd8c0`},light:{bg:`#f3f1ea`,ink:`#0b5f52`}},m=e=>new r(parseInt(e.slice(1,3),16)/255,parseInt(e.slice(3,5),16)/255,parseInt(e.slice(5,7),16)/255);function h(e){let t=document.createElement(`canvas`);t.width=1400,t.height=900;let n=t.getContext(`2d`);n.fillStyle=`#0b5f52`,n.fillRect(0,0,1400,900),n.fillStyle=`#f3f1ea`,n.font=`700 128px "Archivo Variable", sans-serif`;let r=[],i=``;for(let t of e.toUpperCase().split(` `)){let e=i?`${i} ${t}`:t;n.measureText(e).width>1240&&i?(r.push(i),i=t):i=e}return r.push(i),r.forEach((e,t)=>n.fillText(e,80,820-(r.length-1-t)*136)),new s(t)}async function g(r,s,{animate:g=!0,theme:_=`dark`}={}){let v=await Promise.all(s.map(({image:e,title:t})=>new Promise(n=>{let r=()=>n(h(t));e?new f().load(e,n,void 0,r):r()})));v.forEach(e=>{e.minFilter=l,e.generateMipmaps=!1});let y=new d({canvas:r,antialias:!1,alpha:!1});y.setPixelRatio(Math.min(devicePixelRatio,1.5)),y.outputColorSpace=a;let b=new o({uniforms:{tA:{value:v[0]},tB:{value:v[0]},tGlyphs:{value:i()},uFitA:{value:new n(1,1)},uFitB:{value:new n(1,1)},uProgress:{value:1},uGrid:{value:new n(80,40)},uBg:{value:m(p[_].bg)},uInk:{value:m(p[_].ink)},uCount:{value:10}},vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
      uniform sampler2D tA, tB, tGlyphs;
      uniform vec2 uFitA, uFitB, uGrid;
      uniform float uProgress, uCount;
      uniform vec3 uBg, uInk;
      varying vec2 vUv;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      vec3 fitted(sampler2D t, vec2 uv, vec2 fit) {
        vec2 q = (uv - 0.5) * fit + 0.5;
        if (q.x < 0.0 || q.x > 1.0 || q.y < 0.0 || q.y > 1.0) return uBg;
        return texture2D(t, q).rgb;
      }
      void main() {
        vec3 a = fitted(tA, vUv, uFitA);
        vec3 b = fitted(tB, vUv, uFitB);
        vec2 cell = floor(vUv * uGrid);
        // Each cell has its own moment, in a band that sweeps from one side to the other.
        float wait = hash(cell) * 0.35 + (cell.x / uGrid.x) * 0.3;
        float e = uProgress * 1.65 - wait;
        vec2 center = (cell + 0.5) / uGrid;
        vec3 source = e > 0.17 ? fitted(tB, center, uFitB) : fitted(tA, center, uFitA);
        float signal = clamp(length(source - uBg) * 1.1, 0.12, 0.999);
        vec2 glyphUv = (vec2(floor(signal * uCount), 0.0) + fract(vUv * uGrid)) / vec2(uCount, 1.0);
        vec3 glyphs = mix(uBg, uInk, texture2D(tGlyphs, glyphUv).r);
        vec3 color = mix(a, glyphs, smoothstep(0.0, 0.05, e));
        color = mix(color, b, smoothstep(0.27, 0.34, e));
        gl_FragColor = vec4(color, 1.0);
      }`}),x=new t;x.add(new e(new u(2,2),b));let S=new c(-1,1,1,-1,0,1),{uniforms:C}=b,w=()=>y.render(x,S),T=(e,t,n)=>{let r=t.image.width/t.image.height;r>n?e.set(1,r/n):e.set(n/r,1)},E=0,D=0,O=()=>{let e=r.clientWidth/Math.max(r.clientHeight,1);T(C.uFitA.value,C.tA.value,e),T(C.uFitB.value,C.tB.value,e)};function k(){y.setSize(r.clientWidth,r.clientHeight,!1);let e=r.clientWidth<600?8:10;C.uGrid.value.set(r.clientWidth/e,r.clientHeight/(e*1.7)),O(),w()}function A(e){if(e===E)return;if(cancelAnimationFrame(D),C.tA.value=v[E],C.tB.value=v[e],E=e,O(),!g){C.uProgress.value=1,w();return}let t=performance.now(),n=e=>{C.uProgress.value=Math.min((e-t)/1e3,1),w(),C.uProgress.value<1&&(D=requestAnimationFrame(n))};D=requestAnimationFrame(n)}function j(e){C.uBg.value.copy(m(p[e].bg)),C.uInk.value.copy(m(p[e].ink)),w()}return k(),addEventListener(`resize`,k),{go:A,resize:k,setTheme:j}}export{g as createStage};