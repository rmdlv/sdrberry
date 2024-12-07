import{af as ve,z as de,r as d,D as ce,c as f,R as pe,A as I,H as ge,w as K,B as be,C as Z,Z as me,aH as fe,Q as ye,E as he,b as xe,K as ke,V as _e,N as Ce,o as s,a as r,e as c,M as i,h as p,L as g,P as O,k as G,n as M,i as E,j as we,l as $,m as _,p as Ae,q as Ie,u as v,U as S,G as z}from"./index-UNQvOp-_.js";import{c as J}from"./useNestedProp-BxrcwmTZ-CudEJDco.js";import $e from"./vue-ui-sparkline-B0BJFHMi-5RcGPgFj.js";import{s as Se,u as ze}from"./vue-data-ui-DF7u-eZV-Cm3hFNaA.js";import{r as Pe,a as Fe}from"./usePrinter-CLcxWv-4-BCaxEi1-.js";import"./vue-ui-skeleton-Dgzcn3FL-BesRK3Fh.js";import"./PackageVersion-mSsg8dpu-BpMA5JNq.js";import"./useResponsive-CoxXLe23-CoJWR8uA.js";const We=["id"],Ne={style:{"z-index":"1","padding-right":"24px"}},Oe=["onClick"],Ge={style:{display:"flex","flex-direction":"row",gap:"3px","align-items":"center"}},Me=["data-cell"],Ee={dir:"auto",style:{display:"flex","flex-direction":"row","align-items":"center",gap:"6px"}},Te=["data-cell","onPointerenter"],Ve=["data-cell"],Be=["data-cell"],He=["data-cell"],Re=["data-cell"],De={key:0,ref:"source",dir:"auto"},je={__name:"vue-ui-table-sparkline",props:{config:{type:Object,default(){return{}}},dataset:{type:Array,default(){return[]}}},setup(Q,{expose:Y}){const b=Q;ve(a=>({"588e7231":a.tdo}));const{vue_ui_table_sparkline:ee}=de(),P=d(ce()),T=d(0),C=d(0),e=f({get:()=>V(),set:a=>a});function V(){const a=J({userConfig:b.config,defaultConfig:ee});return a.theme?{...J({userConfig:ge.vue_ui_table_sparkline[a.theme]||b.config,defaultConfig:a}),customPalette:pe[a.theme]||I}:a}K(()=>b.config,a=>{e.value=V(),U(),C.value+=1},{deep:!0}),K(()=>b.dataset,a=>{k.value=y.value,C.value+=1},{deep:!0});const{isPrinting:B,isImaging:H,generatePdf:R,generateImage:D}=Pe({elementId:`table_${P.value}`,fileName:e.value.title.text||"vue-ui-table-sparkline"}),ae=f(()=>he(e.value.customPalette)),w=d(null),j=d(!1),te=f(()=>e.value.responsiveBreakpoint);xe(()=>{U()});function U(){be(b.dataset)&&Z({componentName:"VueUiTableSparkline",type:"dataset"});const a=new ResizeObserver(n=>{n.forEach(t=>{j.value=t.contentRect.width<te.value})});w.value&&a.observe(w.value)}const q=f(()=>(b.dataset.forEach((a,n)=>{me({datasetObject:a,requiredAttributes:["name","values"]}).forEach(t=>{Z({componentName:"VueUiTableSparkline",type:"datasetSerieAttribute",property:t,index:n})})}),b.dataset.map((a,n)=>{const t=(a.values||[]).map(o=>isNaN(o)?0:o??0),l=t.reduce((o,u)=>o+u,0);return{...a,values:a.values||[],color:ye(a.color)||ae.value[n]||I[n]||I[n%I.length],sum:l,average:l/t.length,median:fe(t),sparklineDataset:t.map((o,u)=>({period:e.value.colNames[u]||`col ${u}`,value:o||0}))}})));function le(a){const n=(a[0].values||[]).map((t,l)=>a.map(o=>o.values[l]||[])).map(t=>t.map((l,o)=>[l,o]).sort((l,o)=>o[0]-l[0]).map(l=>l[1]));return a.map((t,l)=>({...t,values:t.values||[],orders:n[l]}))}const y=f(()=>le(q.value)),k=d(y.value),oe=f(()=>Math.max(...k.value.map(a=>(a.values||[]).length))),A=d(void 0),F=d(!1),W=d(void 0),N=d(-1);function ne(){F.value=!1,W.value=void 0,N.value=-1,k.value=y.value}function ue(a){F.value=!0,W.value=a;const n=y.value.map(o=>o.values[a]||[]),t=A.value===a?1:-1;N.value=t,a===A.value?A.value=void 0:A.value=a;const l=n.map((o,u)=>[u,o]).sort((o,u)=>t*(u[1]-o[1])).map(o=>o[0]).map(o=>y.value[o]);k.value=l,C.value+=1}const se=f(()=>Math.max(...b.dataset.map(a=>(a.values||[]).length))),x=f(()=>{let a=e.value.colNames;if(!a.length)for(let t=0;t<se.value;t+=1)a.push(`col ${t+1}`);e.value.showTotal&&(a=[...a,e.value.translations.total]);let n;return e.value.showAverage&&e.value.showMedian?n=[...a,e.value.translations.average,e.value.translations.median]:e.value.showAverage&&!e.value.showMedian?n=[...a,e.value.translations.average]:!e.value.showAverage&&e.value.showMedian?n=[...a,e.value.translations.median]:n=a,e.value.showSparklines?[...n,e.value.translations.chart]:n}),m=d(void 0),h=d(void 0);function ie({dataIndex:a,serieIndex:n}){m.value=a,h.value=n}const L=d(!1);function re(a){L.value=a,T.value+=1}function X(){ke(()=>{const a=[e.value.translations.serie].concat(x.value),n=q.value.map((o,u)=>[[o.name],o.values,[o.sum],[o.average],[o.median]]),t=[a].concat(n),l=_e(t);Ce({csvContent:l,title:e.value.title.text||"vue-ui-table-sparkline"})})}return Y({generatePdf:R,generateImage:D,generateCsv:X,restoreOrder:ne}),(a,n)=>(s(),r("div",{ref_key:"tableContainer",ref:w,class:M({"vue-ui-responsive":j.value}),style:{overflow:"hidden"},id:`table_${P.value}`},[c("div",{style:{overflow:"auto"},onPointerleave:n[0]||(n[0]=t=>{h.value=void 0,m.value=void 0})},[c("table",{class:"vue-ui-data-table",style:i({fontFamily:e.value.fontFamily,position:"relative"})},[e.value.title.text?(s(),r("caption",{key:0,style:i({backgroundColor:e.value.title.backgroundColor})},[c("div",{style:i({fontSize:`${e.value.title.fontSize}px`,fontWeight:e.value.title.bold?"bold":"normal",color:e.value.title.color,textAlign:e.value.title.textAlign})},p(e.value.title.text),5),e.value.title.subtitle.text?(s(),r("div",{key:0,style:i({fontSize:`${e.value.title.subtitle.fontSize}px`,fontWeight:e.value.title.subtitle.bold?"bold":"normal",color:e.value.title.subtitle.color,textAlign:e.value.title.textAlign})},p(e.value.title.subtitle.text),5)):g("",!0)],4)):g("",!0),c("thead",Ne,[c("tr",{role:"row",class:"vue-ui-data-table__thead-row",style:i({backgroundColor:e.value.thead.backgroundColor,color:e.value.thead.color})},[c("th",{role:"cell",style:i({backgroundColor:e.value.thead.backgroundColor,outline:e.value.thead.outline,textAlign:e.value.thead.textAlign,fontWeight:e.value.thead.bold?"bold":"normal"}),class:"sticky-col-first"},p(e.value.translations.serie),5),(s(!0),r(O,null,G(x.value,(t,l)=>(s(),r("th",{role:"cell",style:i({background:e.value.thead.backgroundColor,outline:e.value.thead.outline,textAlign:e.value.thead.textAlign,fontWeight:e.value.thead.bold?"bold":"normal",minWidth:l===x.value.length-1?"150px":"",cursor:y.value[0].values[l]!==void 0?"pointer":"default"}),onClick:()=>ue(l),class:M({"sticky-col":l===x.value.length-1&&e.value.showSparklines})},[c("div",Ge,[c("span",null,p(t),1),F.value&&l===W.value&&y.value[0].values[l]!==void 0?(s(),E(ze,{key:0,size:18,name:N.value===1?"sort":"sortReverse",stroke:e.value.thead.color},null,8,["name","stroke"])):g("",!0)]),e.value.userOptions.show&&l===x.value.length-1?(s(),E(Fe,{ref_for:!0,ref:"details",key:`user_option_${T.value}`,backgroundColor:e.value.thead.backgroundColor,color:e.value.thead.color,isPrinting:v(B),isImaging:v(H),uid:P.value,hasPdf:e.value.userOptions.buttons.pdf,hasXls:e.value.userOptions.buttons.csv,hasImg:e.value.userOptions.buttons.img,hasFullscreen:e.value.userOptions.buttons.fullscreen,isFullscreen:L.value,titles:{...e.value.userOptions.buttonTitles},chartElement:w.value,position:e.value.userOptions.position,onToggleFullscreen:re,onGeneratePdf:v(R),onGenerateImage:v(D),onGenerateCsv:X},we({_:2},[a.$slots.optionPdf?{name:"optionPdf",fn:$(()=>[_(a.$slots,"optionPdf",{},void 0,!0)]),key:"0"}:void 0,a.$slots.optionCsv?{name:"optionCsv",fn:$(()=>[_(a.$slots,"optionCsv",{},void 0,!0)]),key:"1"}:void 0,a.$slots.optionImg?{name:"optionImg",fn:$(()=>[_(a.$slots,"optionImg",{},void 0,!0)]),key:"2"}:void 0,a.$slots.optionFullscreen?{name:"optionFullscreen",fn:$(({toggleFullscreen:o,isFullscreen:u})=>[_(a.$slots,"optionFullscreen",Ae(Ie({toggleFullscreen:o,isFullscreen:u})),void 0,!0)]),key:"3"}:void 0]),1032,["backgroundColor","color","isPrinting","isImaging","uid","hasPdf","hasXls","hasImg","hasFullscreen","isFullscreen","titles","chartElement","position","onGeneratePdf","onGenerateImage"])):g("",!0)],14,Oe))),256))],4)]),c("tbody",null,[(s(!0),r(O,null,G(k.value,(t,l)=>(s(),r("tr",{role:"row",style:i({backgroundColor:e.value.tbody.backgroundColor,color:e.value.tbody.color}),class:M({"vue-ui-data-table__tbody__row":!0,"vue-ui-data-table__tbody__row-even":l%2===0,"vue-ui-data-table__tbody__row-odd":l%2!==0})},[c("td",{role:"cell",style:i({backgroundColor:e.value.tbody.backgroundColor,outline:e.value.tbody.outline,fontSize:`${e.value.tbody.fontSize}px`,fontWeight:e.value.tbody.bold?"bold":"normal",textAlign:e.value.tbody.textAlign}),"data-cell":e.value.translations.serie,class:"vue-ui-data-table__tbody__td sticky-col-first"},[c("div",Ee,[c("span",{style:i({color:t.color})},"⬤",4),c("span",null,p(t.name??"-"),1)])],12,Me),(s(!0),r(O,null,G(oe.value,(o,u)=>(s(),r("td",{dir:"auto",role:"cell",style:i({outline:e.value.tbody.outline,fontSize:`${e.value.tbody.fontSize}px`,fontWeight:e.value.tbody.bold?"bold":"normal",textAlign:e.value.tbody.textAlign,backgroundColor:m.value!==void 0&&h.value!==void 0&&u===m.value&&h.value===l?`${t.color}33`:"",borderRadius:m.value!==void 0&&h.value!==void 0&&u===m.value&&h.value===l?"3px":""}),"data-cell":x.value[u],class:"vue-ui-data-table__tbody__td",onPointerenter:Ue=>{h.value=l,m.value=u}},p([null,void 0].includes(t.values[u])?"-":v(S)(e.value.formatter,Number(t.values[u]),v(z)({p:e.value.prefix,v:Number(t.values[u]),s:e.value.suffix,r:e.value.roundingValues}),{datapoint:t,seriesIndex:l,datapointIndex:u})),45,Te))),256)),e.value.showTotal?(s(),r("td",{key:0,dir:"auto",role:"cell",style:i({outline:e.value.tbody.outline,fontSize:`${e.value.tbody.fontSize}px`,fontWeight:e.value.tbody.bold?"bold":"normal",textAlign:e.value.tbody.textAlign}),"data-cell":e.value.translations.total,class:"vue-ui-data-table__tbody__td"},p(v(S)(e.value.formatter,t.sum,v(z)({p:e.value.prefix,v:t.sum,s:e.value.suffix,r:e.value.roundingTotal}),{datapoint:t.sum,seriesIndex:l})),13,Ve)):g("",!0),e.value.showAverage?(s(),r("td",{key:1,dir:"auto",role:"cell",style:i({outline:e.value.tbody.outline,fontSize:`${e.value.tbody.fontSize}px`,fontWeight:e.value.tbody.bold?"bold":"normal",textAlign:e.value.tbody.textAlign}),"data-cell":e.value.translations.average,class:"vue-ui-data-table__tbody__td"},p(v(S)(e.value.formatter,t.average,v(z)({p:e.value.prefix,v:t.average,s:e.value.suffix,r:e.value.roundingAverage}),{datapoint:t.average,seriesIndex:l})),13,Be)):g("",!0),e.value.showMedian?(s(),r("td",{key:2,dir:"auto",role:"cell",style:i({outline:e.value.tbody.outline,fontSize:`${e.value.tbody.fontSize}px`,fontWeight:e.value.tbody.bold?"bold":"normal",textAlign:e.value.tbody.textAlign}),"data-cell":e.value.translations.median,class:"vue-ui-data-table__tbody__td"},p(v(S)(e.value.formatter,t.median,v(z)({p:e.value.prefix,v:t.median,s:e.value.suffix,r:e.value.roundingMedian}),{datapoint:t.median,seriesIndex:l})),13,He)):g("",!0),e.value.showSparklines?(s(),r("td",{key:3,role:"cell","data-cell":e.value.translations.chart,style:i({outline:e.value.tbody.outline,fontSize:`${e.value.tbody.fontSize}px`,fontWeight:e.value.tbody.bold?"bold":"normal",textAlign:e.value.tbody.textAlign}),class:"vue-ui-data-table__tbody__td sticky-col"},[(s(),E($e,{key:`sparkline_${l}_${C.value}`,onHoverIndex:({index:o})=>ie({dataIndex:o,serieIndex:l}),dataset:t.sparklineDataset,showInfo:!1,selectedIndex:m.value,config:{type:e.value.sparkline.type,style:{backgroundColor:e.value.tbody.backgroundColor,animation:{show:e.value.sparkline.animation.show&&!v(B)&&!v(H),animationFrames:e.value.sparkline.animation.animationFrames},line:{color:t.color,smooth:e.value.sparkline.smooth,strokeWidth:e.value.sparkline.strokeWidth},bar:{color:t.color},area:{color:t.color,opacity:e.value.sparkline.showArea?16:0,useGradient:e.value.sparkline.useGradient},verticalIndicator:{color:t.color},plot:{radius:9,stroke:e.value.tbody.backgroundColor,strokeWidth:3}}}},null,8,["onHoverIndex","dataset","selectedIndex","config"]))],12,Re)):g("",!0)],6))),256))])],4)],32),a.$slots.source?(s(),r("div",De,[_(a.$slots,"source",{},void 0,!0)],512)):g("",!0)],10,We))}},ea=Se(je,[["__scopeId","data-v-1516623f"]]);export{ea as default};
