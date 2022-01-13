var st=Object.defineProperty;var rt=(t,e,a)=>e in t?st(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var D=(t,e,a)=>(rt(t,typeof e!="symbol"?e+"":e,a),a);import{R as k,A as at,r as f,j as c,C as F,S as O,a as R,F as j,b as L,c as ot,P as it,t as q,M as ct,T as lt,O as ut,V as dt,d as pt,e as ft,f as ht,g as yt,h as B,q as V,i as T,k as mt,l as N,m as W,n as Y,o as gt,p as xt,s as vt,u as wt,v as U,w as Ct,x as Q,y as Mt,z as H,B as bt,D as Et,E as St,G as Pt,H as b,I as K,J as At,K as Z,L as P,N as _,Q as kt,U as Dt}from"./vendor.11ec4672.js";const Ot=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerpolicy&&(n.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?n.credentials="include":s.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}};Ot();const J=k.createContext(null),$t=({children:t})=>{const e="my-city-climate-pqkfg",a=new at({id:e}),[r,s]=f.exports.useState(null),n=async()=>{const l=F.anonymous();try{return await a.logIn(l),s(a.currentUser),a.currentUser}catch{return s(null),null}},i=async(l,y)=>{const d=F.emailPassword(l,y);try{return await a.logIn(d),s(a.currentUser),a.currentUser}catch{return s(null),null}},h=()=>{var l;r!==null&&((l=a.currentUser)==null||l.logOut(),s(null))};return c(J.Provider,{value:{logIn:i,logOut:h,user:r,anonymousIn:n},children:t})},X=()=>{const t=f.exports.useContext(J);if(t==null)throw new Error("useRealmApp() called outside of a RealmApp?");return t},z=k.createContext(null),Rt=({children:t})=>{const{user:e}=X(),[a,r]=f.exports.useState(null);return f.exports.useEffect(()=>{if(e!==null){const s=e.mongoClient("mongodb-atlas");r(s.db("mcc-climate"))}},[e]),c(z.Provider,{value:{db:a},children:t})},tt=()=>{const t=f.exports.useContext(z);if(t==null)throw new Error("useMongoDB() called outside of a MongoDB?");return t};const I={climate:new O({image:new R({radius:8,fill:new j({color:"#FC9292"}),stroke:new L({color:"#C86767",width:1})})}),perception:new O({image:new R({radius:3,fill:new j({color:"#c0ddff"}),stroke:new L({color:"#5f97dc",width:1})})}),synoptic:new O({image:new R({radius:5,fill:new j({color:"#d0ffc0"}),stroke:new L({color:"#74d350",width:1})})})},jt=t=>t.type=="k"?I.climate:t.type=="s"?I.synoptic:t.type=="pp"?I.perception:new O,Lt=t=>t=="k"?10:t=="s"?9:(t=="pp",8),Nt=t=>{const e={k:[],s:[],pp:[]};return t.forEach(a=>{const r=new ot({geometry:new it(q(a.location.coordinates,"EPSG:4326","EPSG:3857")),name:a.name});switch(r.type=a.type,r.setProperties({code:a.code,name:a.name,type:a.type}),a.type){case"k":e.k.push(r);break;case"pp":e.pp.push(r);break;case"s":e.s.push(r);break;default:console.error(`Unknown station type: ${a.type}`)}}),e};function Ut(t){const e=f.exports.useRef(null);return f.exports.useEffect(()=>{const a=new ct({target:e.current,layers:[new lt({source:new ut})],view:new dt({projection:"EPSG:3857",center:q([19.105,52.107],"EPSG:4326","EPSG:3857"),zoom:6,extent:pt([11.51284,46.3127,28.18045,58.36571],"EPSG:4326","EPSG:3857")}),controls:ft()});t.onMapCreate&&t.onMapCreate(a)},[]),c("div",{ref:e,className:"map-container"})}var It=k.memo(Ut,(t,e)=>!0);class Gt extends k.Component{constructor(e){super(e);D(this,"map");D(this,"stationsLayer",!1);D(this,"buildStationsLayer",()=>{if(!this.map)return;const e=this.map,a=Nt(this.props.stations);let r;for(r in a){const s=a[r],n=new ht({source:new yt({features:s}),style:jt});n.setZIndex(Lt(r)),e.addLayer(n),r=="k"&&e.getView().fit(n.getSource().getExtent(),{padding:[50,50,50,50]})}this.stationsLayer=!0,e.on("pointermove",s=>{const n=e.getEventPixel(s.originalEvent),i=e.hasFeatureAtPixel(n);e.getViewport().style.cursor=i?"pointer":""}),e.on("click",s=>{const{onClickFeatures:n}=this.props;if(!n)return;const i=[];e.getEventPixel(s.originalEvent),e.forEachFeatureAtPixel(s.pixel,h=>i.push(h)),n(i)})})}componentDidUpdate(e){e.stations!==this.props.stations&&!this.stationsLayer&&this.map&&this.buildStationsLayer()}onMapCreate(e){this.map=e}render(){return c(It,{onMapCreate:e=>this.onMapCreate(e)})}}function Ft(t,{title:e,tickSize:a=6,width:r=320,height:s=44+a,marginTop:n=18,marginRight:i=0,marginBottom:h=16+a,marginLeft:l=0,ticks:y=r/64,tickFormat:d,tickValues:u}={}){function g(p,w=256){const m=document.createElement("canvas");m.width=w,m.height=1;const C=m.getContext("2d");for(let E=0;E<w;++E)C.fillStyle=p(E/(w-1)),C.fillRect(E,0,1,1);return m}const M=B("svg").attr("width",r).attr("height",s).attr("viewBox",[0,0,r,s]).style("overflow","visible").style("display","block");let A=p=>p.selectAll(".tick line").attr("y1",n+h-s),x;if(t.interpolate){const p=Math.min(t.domain().length,t.range().length);x=t.copy().rangeRound(V(T(l,r-i),p)),M.append("image").attr("x",l).attr("y",n).attr("width",r-l-i).attr("height",s-n-h).attr("preserveAspectRatio","none").attr("xlink:href",g(t.copy().domain(V(T(0,1),p))).toDataURL())}else if(t.interpolator){if(x=Object.assign(t.copy().interpolator(mt(l,r-i)),{range(){return[l,r-i]}}),M.append("image").attr("x",l).attr("y",n).attr("width",r-l-i).attr("height",s-n-h).attr("preserveAspectRatio","none").attr("xlink:href",g(t.interpolator()).toDataURL()),!x.ticks){if(u===void 0){const p=Math.round(y+1);u=N(p).map(w=>W(t.domain(),w/(p-1)))}typeof d!="function"&&(d=Y(d===void 0?",f":d))}}else if(t.invertExtent){const p=t.thresholds?t.thresholds():t.quantiles?t.quantiles():t.domain(),w=d===void 0?m=>m:typeof d=="string"?Y(d):d;x=gt().domain([-1,t.range().length-1]).rangeRound([l,r-i]),M.append("g").selectAll("rect").data(t.range()).join("rect").attr("x",(m,C)=>x(C-1)).attr("y",n).attr("width",(m,C)=>x(C)-x(C-1)).attr("height",s-n-h).attr("fill",m=>m),u=N(p.length),d=m=>w(p[m],m)}else x=xt().domain(t.domain()).rangeRound([l,r-i]),M.append("g").selectAll("rect").data(t.domain()).join("rect").attr("x",x).attr("y",n).attr("width",Math.max(0,x.bandwidth()-1)).attr("height",s-n-h).attr("fill",t),A=()=>{};return M.append("g").attr("transform",`translate(0,${s-h})`).call(vt(x).ticks(y,typeof d=="string"?d:void 0).tickFormat(typeof d=="function"?d:void 0).tickSize(a).tickValues(u)).call(A).call(p=>p.select(".domain").remove()).call(p=>p.append("text").attr("x",l).attr("y",n+h-s-6).attr("fill","currentColor").attr("text-anchor","start").attr("font-weight","bold").attr("class","title").text(e)),M.node()}function qt(t,{x:e=([u])=>u,y:a=([,u])=>u,title:r,width:s=1e3,cellSize:n=12,weekday:i="monday",formatDay:h=u=>"SMTWTFS"[u],formatMonth:l="%b",yFormat:y,colors:d=wt}={}){const u=U(t,e),g=U(t,a),M=N(u.length),A=i==="sunday"?o=>o:o=>(o+6)%7,x=i==="sunday"?St:Pt,p=i==="weekday"?5:7,w=n*(p+.2);s=n*58;const m=W(g,.9975,Math.abs),C=Ct([-m,+m],d).unknown("none");if(l=Q(l),r===void 0){const o=Q("%B %-d, %Y"),v=C.tickFormat(100,y);r=S=>`${o(u[S])}
${v(g[S])}`}else if(r!==null){const o=U(t,r);r=v=>o[v]}const E=Mt(M,o=>u[o].getUTCFullYear()).reverse();function et(o){const v=Math.max(0,Math.min(p,A(o.getUTCDay()))),S=x.count(H(o),o);return`${v===0?`M${S*n},0`:v===p?`M${(S+1)*n},0`:`M${(S+1)*n},0V${v*n}H${S*n}`}V${p*n}`}const G=B("svg").attr("width",s).attr("height",w*E.length).attr("viewBox",[0,0,s,w*E.length]).attr("style","max-width: 100%; height: auto; height: intrinsic;").attr("font-family","sans-serif").attr("font-size","14px"),$=G.selectAll("g").data(E).join("g").attr("id",(o,v)=>`mcc-year-${o[0]}`).attr("transform",(o,v)=>`translate(40.5,${w*v+n*1.5})`);$.append("text").attr("x",-5).attr("y",n*3.5).attr("font-weight","bold").attr("text-anchor","end").text(([o])=>o);const nt=$.append("g").selectAll("rect").data(i==="weekday"?([,o])=>o.filter(v=>![0,6].includes(u[v].getUTCDay())):([,o])=>o).join("rect").attr("width",n-1).attr("height",n-1).attr("x",o=>x.count(H(u[o]),u[o])*n+.5).attr("y",o=>A(u[o].getUTCDay())*n+.5).attr("fill",o=>C(g[o]));return r&&nt.append("title").text(r),$.append("g").selectAll("g").data(([,o])=>bt(Et(u[o[0]]),u[o[o.length-1]])).join("g").filter((o,v)=>v).append("path").attr("fill","none").attr("stroke","#fff").attr("stroke-width",2).attr("d",et),Object.assign(G.node(),{scales:{color:C}})}const Bt=c(K,{sx:{width:"100%",marginTop:"10%"},children:c(At,{})});function Vt(t){const{station:e,className:a}=t,[r,s]=f.exports.useState([]),n=f.exports.useRef(!0),{db:i}=tt(),h=f.exports.useRef(null),l=f.exports.useRef(null);f.exports.useEffect(()=>()=>{n.current=!1},[]),f.exports.useEffect(()=>{if(r.length==0||!h||!h.current||!l||!l.current)return;const d=qt(r,{x:g=>g.ts,y:g=>g.tavg,cellSize:l.current.clientWidth/60,width:l.current.clientWidth-100});l.current.appendChild(d);const u=Ft(d.scales.color,{title:"Daily average temperature",tickFormat:".0f"});h.current.appendChild(u),window.addEventListener("resize",function(g){console.log(g.detail)})},[r]),f.exports.useEffect(()=>{async function d(){if(!e)return;const u=e.getProperties();if(!u.hasOwnProperty("code"))return;const g=u.code;if(i){const M=await i.collection("observations").find({"source.code":parseInt(g,10)},{sort:{ts:-1}});n.current&&s(M)}}d()},[i]);let y;return r.length==0?y=Bt:y=b("div",{className:"grid",children:[c("div",{className:"legend",ref:h}),c("div",{className:"calendar",ref:l})]}),c("div",{className:a,children:y})}function Tt(t){const{station:e,onClose:a}=t,r=()=>a();let s=c(kt,{});return e&&(s=c(Z,{open:!0,onClose:r,children:b("div",{className:"station-modal",children:[b("div",{className:"header",children:[c(P,{variant:"h6",children:e.getProperties().name}),c(_,{onClick:r,variant:"outlined",children:"Close"})]}),c(Vt,{className:"wrapper",station:e})]})})),s}var Wt="/mcc-frontend/assets/favicon.27019856.svg";function Yt(){const[t,e]=f.exports.useState(!1),a=()=>e(!0),r=()=>e(!1);return b(f.exports.Fragment,{children:[c("div",{className:"logo",title:"My city's climate",onClick:a,children:c("img",{src:Wt,alt:"My city's climate"})}),c(Z,{open:t,onClose:r,children:b(K,{className:"modal-logo-description",children:[c(P,{variant:"h6",component:"h2",children:"My city's climate"}),c(P,{sx:{mt:2},children:"Free online viewer for historical weather data"}),b(P,{sx:{mt:2},children:["The application uses ",c("a",{href:"https://danepubliczne.imgw.pl/",children:"Dane publiczne IMGW-PIB"})]}),b(P,{sx:{mt:2},children:["Source code - ",c("a",{href:"https://github.com/karavanjo/mcc-frontend",title:"karavanjo/mcc-frontend",children:"github"})]}),c(P,{align:"right",sx:{mt:2},children:c(_,{onClick:r,variant:"outlined",children:"Close"})})]})})]})}function Qt(){const{anonymousIn:t,user:e}=X(),{db:a}=tt(),[r,s]=f.exports.useState([]),[n,i]=f.exports.useState(null);f.exports.useEffect(()=>{async function y(){if(a){const d=await a.collection("stations").find({},{projection:{code:1,name:1,type:1,location:1}});s(d)}}y()},[a]),f.exports.useEffect(()=>{e||t()});const h=y=>{y.length!=0&&i(y[0])},l=()=>{i(null)};return b(f.exports.Fragment,{children:[b("div",{className:"app",children:[c(Yt,{}),c(Gt,{stations:r,onClickFeatures:y=>h(y)})]}),c(Tt,{station:n,onClose:l})]})}Dt.render(c(k.StrictMode,{children:c($t,{children:c(Rt,{children:c(Qt,{})})})}),document.getElementById("root"));
