import{af as U,c as d,z as Y,H as Q,r as f,D as B,w as Z,B as ee,C as ae,b as le,aH as te,ap as se,K as oe,V as ne,N as re,o,a as n,i as ue,j as ie,l as x,m as r,p as c,q as g,u as h,L as p,e as y,M as C,P as k,k as I,f as ve,v as S,ag as de,n as T}from"./index-UNQvOp-_.js";import{c as E}from"./useNestedProp-BxrcwmTZ-CudEJDco.js";import{r as ce,a as pe}from"./usePrinter-CLcxWv-4-BCaxEi1-.js";import{$ as me}from"./Shape-DYFnvMNd-Cz606loY.js";import{s as ge}from"./vue-data-ui-DF7u-eZV-Cm3hFNaA.js";const fe=["id"],he={role:"cell"},ye={role:"row"},be=["data-cell"],xe={key:0,style:{display:"flex","flex-direction":"row",gap:"2px","align-items":"center"}},ke=["height","width"],$e={key:0,role:"cell","data-cell":"sum"},we={key:1,role:"cell","data-cell":"average"},Ce={key:2,role:"cell","data-cell":"median"},Ie={key:1,ref:"source",dir:"auto"},_e={__name:"vue-ui-table-heatmap",props:{config:{type:Object,default(){return{}}},dataset:{type:Array,default(){return[]}}},setup(G,{expose:H}){const m=G;U(e=>({"4e1c0e72":W.value,"6ed4bc22":K.value}));const{vue_ui_table_heatmap:j}=Y(),$=f(B()),u=f(!1),b=f(null),w=f(!1),_=f(0),a=d({get:()=>P(),set:e=>e});function P(){const e=E({userConfig:m.config,defaultConfig:j});return e.theme?{...E({userConfig:Q.vue_ui_table_heatmap[e.theme]||m.config,defaultConfig:e})}:e}Z(()=>m.config,e=>{a.value=P(),N()},{deep:!0});const{isPrinting:q,isImaging:A,generatePdf:F,generateImage:V}=ce({elementId:`table_heatmap_${$.value}`,fileName:"vue-ui-table-heatmap"}),D=d(()=>a.value.table.responsiveBreakpoint),L=d(()=>!!m.dataset&&m.dataset.length);le(()=>{N()});function N(){ee(m.dataset)&&ae({componentName:"VueUiTableHeatmap",type:"dataset"});const e=new ResizeObserver(s=>{s.forEach(l=>{u.value=l.contentRect.width<D.value})});b.value&&e.observe(b.value)}const O=d(()=>m.dataset.map(e=>{const s=e.values.map(t=>isNaN(t)?0:t),l=s.reduce((t,v)=>t+v,0);return{...e,values:s,serieExtremes:{max:Math.max(...s),min:Math.min(...s)},sum:l,average:l/s.length,median:te(s),displayValues:[e.name,...e.values],id:B()}})),R=d(()=>{const e=O.value.flatMap(s=>s.values);return{min:Math.min(...e),max:Math.max(...e)}});function X(e,s){const l=a.value.style.heatmapColors.useIndividualScale;return se(a.value.style.heatmapColors.min,a.value.style.heatmapColors.max,l?s.min:R.value.min,l?s.max:R.value.max,e)}const z=d(()=>O.value.map(e=>({...e,colors:e.displayValues.map(s=>isNaN(s)?a.value.style.backgroundColor:X(s,e.serieExtremes))}))),K=d(()=>a.value.style.backgroundColor),W=d(()=>`${a.value.table.borderWidth}px`);function M(){oe(()=>{const e=z.value.map(t=>[[t.name],t.displayValues,[t.sum],[t.average],[t.median]]),s=[[[""],a.value.table.head.values,["sum"],["average"],["median"]]].concat(e),l=ne(s);re({csvContent:l,title:"vue-ui-table-heatmap"})})}function J(e){w.value=e,_.value+=1}return H({generatePdf:F,generateCsv:M,generateImage:V}),(e,s)=>(o(),n("div",{ref_key:"tableContainer",ref:b,style:C(`width:100%; overflow-x:auto; container-type: inline-size;padding-top:${a.value.userOptions.show?"36px":""}; ${w.value?"vue-data-ui-wrapper-fullscreen":""}; position:relative;`),class:T({"vue-ui-responsive":u.value}),id:`table_heatmap_${$.value}`},[a.value.userOptions.show&&L.value?(o(),ue(pe,{ref:"details",key:`user_option_${_.value}`,backgroundColor:a.value.style.backgroundColor,color:a.value.style.color,isPrinting:h(q),isImaging:h(A),uid:$.value,hasPdf:a.value.userOptions.buttons.pdf,hasXls:a.value.userOptions.buttons.csv,hasImg:a.value.userOptions.buttons.img,hasFullscreen:a.value.userOptions.buttons.fullscreen,isFullscreen:w.value,titles:{...a.value.userOptions.buttonTitles},chartElement:b.value,position:a.value.userOptions.position,onToggleFullscreen:J,onGeneratePdf:h(F),onGenerateCsv:M,onGenerateImage:h(V)},ie({_:2},[e.$slots.optionPdf?{name:"optionPdf",fn:x(()=>[r(e.$slots,"optionPdf",{},void 0,!0)]),key:"0"}:void 0,e.$slots.optionCsv?{name:"optionCsv",fn:x(()=>[r(e.$slots,"optionCsv",{},void 0,!0)]),key:"1"}:void 0,e.$slots.optionImg?{name:"optionImg",fn:x(()=>[r(e.$slots,"optionImg",{},void 0,!0)]),key:"2"}:void 0,e.$slots.optionFullscreen?{name:"optionFullscreen",fn:x(({toggleFullscreen:l,isFullscreen:t})=>[r(e.$slots,"optionFullscreen",c(g({toggleFullscreen:l,isFullscreen:t})),void 0,!0)]),key:"3"}:void 0]),1032,["backgroundColor","color","isPrinting","isImaging","uid","hasPdf","hasXls","hasImg","hasFullscreen","isFullscreen","titles","chartElement","position","onGeneratePdf","onGenerateImage"])):p("",!0),y("table",{class:T({"vue-ui-table-heatmap":!0}),style:C(`width:100%;font-family:${a.value.style.fontFamily};background:${a.value.style.backgroundColor};`)},[y("caption",null,[r(e.$slots,"caption",{},void 0,!0)]),y("thead",null,[y("tr",{role:"row",style:C(`background:${a.value.table.head.backgroundColor};color:${a.value.table.head.color}`)},[(o(!0),n(k,null,I(a.value.table.head.values,(l,t)=>(o(),n("th",he,[r(e.$slots,"head",c(g({value:l,rowIndex:t,type:typeof l,isResponsive:u.value})),void 0,!0)]))),256))],4)]),y("tbody",null,[(o(!0),n(k,null,I(z.value,(l,t)=>(o(),n("tr",ye,[(o(!0),n(k,null,I(l.displayValues,(v,i)=>(o(),n("td",{role:"cell","data-cell":a.value.table.head.values[i]},[l.color&&i===0?(o(),n("div",xe,[l.color?(o(),n("svg",{key:0,height:a.value.style.shapeSize,width:a.value.style.shapeSize,viewBox:"0 0 20 20",style:{background:"none",overflow:"visible"}},[ve(me,{plot:{x:10,y:10},color:l.color,radius:9,shape:l.shape||"circle"},null,8,["color","shape"])],8,ke)):p("",!0),r(e.$slots,"rowTitle",c(g({value:v,rowIndex:t,colIndex:i,type:typeof v,isResponsive:u.value})),void 0,!0)])):(o(),n(k,{key:1},[i===0?r(e.$slots,"rowTitle",c(S({key:0},{value:v,rowIndex:t,colIndex:i,type:typeof v,isResponsive:u.value})),void 0,!0):p("",!0),i>0?r(e.$slots,"cell",c(S({key:1},{value:v,rowIndex:t,colIndex:i,type:typeof v,isResponsive:u.value,color:l.colors[i],textColor:h(de)(l.colors[i])})),void 0,!0):p("",!0)],64))],8,be))),256)),a.value.table.showSum?(o(),n("td",$e,[r(e.$slots,"sum",c(g({value:l.sum,rowIndex:t,isResponsive:u.value})),void 0,!0)])):p("",!0),a.value.table.showAverage?(o(),n("td",we,[r(e.$slots,"average",c(g({value:l.average,rowIndex:t,isResponsive:u.value})),void 0,!0)])):p("",!0),a.value.table.showMedian?(o(),n("td",Ce,[r(e.$slots,"median",c(g({value:l.median,rowIndex:t,isResponsive:u.value})),void 0,!0)])):p("",!0)]))),256))])],4),e.$slots.source?(o(),n("div",Ie,[r(e.$slots,"source",{},void 0,!0)],512)):p("",!0)],14,fe))}},Re=ge(_e,[["__scopeId","data-v-393e4e2f"]]);export{Re as default};
