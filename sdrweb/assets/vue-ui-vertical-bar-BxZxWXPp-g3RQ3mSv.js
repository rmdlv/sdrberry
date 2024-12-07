import{af as Ze,z as et,c as f,r as s,D as tt,R as at,A as F,H as lt,w as Fe,B as Ie,C as Z,a0 as N,Q as se,E as ot,b as ut,ac as rt,V as nt,N as st,o as r,a as i,i as I,L as p,j as it,l as k,m as x,p as G,q as H,u as h,e as u,M as d,h as v,U as ee,G as A,n as E,J as vt,f as ie,P as W,k as U,O as ve,a1 as dt,a2 as ct,a3 as ht,ah as gt,g as pt}from"./index-UNQvOp-_.js";import{O as yt,k as bt}from"./useResponsive-CoxXLe23-CoJWR8uA.js";import{x as ft}from"./Title-DyD-mBPN-D1JKsC4v.js";import{r as mt,a as xt}from"./usePrinter-CLcxWv-4-BCaxEi1-.js";import{E as kt}from"./Tooltip-qod9o4Vz-yuZ96RAr.js";import{C as Ae}from"./Legend-BorSDXCj-BlB-FUJn.js";import $t from"./vue-ui-skeleton-Dgzcn3FL-BesRK3Fh.js";import{s as wt,u as Ct}from"./vue-data-ui-DF7u-eZV-Cm3hFNaA.js";import _t from"./vue-ui-accordion-m8rut1bP-B24xq09o.js";import{c as Oe}from"./useNestedProp-BxrcwmTZ-CudEJDco.js";import{p as Tt}from"./PackageVersion-mSsg8dpu-BpMA5JNq.js";import{S as Lt}from"./PenAndPaper-Dk41ZrJ0-C6X1XG5F.js";import"./Shape-DYFnvMNd-Cz606loY.js";const Pt=["id"],Vt=["onClick"],Nt=["xmlns","viewBox"],St=["id"],zt=["stop-color"],Mt=["stop-color"],Ft=["x","y","width","height","fill","rx"],It=["x","y","width","height","fill","rx","stroke","stroke-width"],At=["x2","y1","y2","stroke","stroke-width"],Ot=["x1","x2","y1","y2","stroke","stroke-width"],Bt=["x","y","text-anchor","font-size","fill","font-weight"],jt=["x","y","font-size","fill","font-weight"],Et=["x","y","font-size","fill","font-weight"],Rt=["x","y","font-size","fill","font-weight"],Xt=["y","width","height","fill","onMouseenter"],Dt={key:6,class:"vue-data-ui-watermark"},Gt=["onClick"],Ht={style:"width:100%;padding-top: 36px;position:relative"},Wt={class:"vue-ui-data-table"},Ut={key:0},qt={style:{width:"100%"}},Kt=["data-cell"],Yt={style:{display:"flex","align-items":"center",gap:"5px","justify-content":"flex-end",width:"100%","padding-right":"3px"}},Jt=["data-cell"],Qt={style:{display:"flex","align-items":"center",gap:"5px","justify-content":"flex-end",width:"100%","padding-right":"3px"}},Zt=["data-cell"],ea={style:{display:"flex","align-items":"center",gap:"5px","justify-content":"flex-end",width:"100%","padding-right":"3px"}},ta=["data-cell"],aa={style:{display:"flex","align-items":"center",gap:"5px","justify-content":"flex-end",width:"100%","padding-right":"3px"}},la=["data-cell"],oa={style:{display:"flex","align-items":"center",gap:"5px","justify-content":"flex-end",width:"100%","padding-right":"3px"}},ua=["data-cell"],ra={style:{display:"flex","align-items":"center",gap:"5px","justify-content":"flex-end",width:"100%","padding-right":"3px"}},na=["data-cell"],sa={style:{display:"flex","align-items":"center",gap:"5px","justify-content":"flex-end",width:"100%","padding-right":"3px"}},ia={__name:"vue-ui-vertical-bar",props:{config:{type:Object,default(){return{}}},dataset:{type:Array,default(){return[]}}},emits:["selectLegend"],setup(Be,{expose:je,emit:Ee}){const C=Be;Ze(t=>({"5a0dcab3":t.tdo}));const{vue_ui_vertical_bar:Re}=et(),q=f(()=>!!C.dataset&&C.dataset.length),S=s(tt()),Xe=s(null),te=s(!1),ae=s(""),K=s(0),De=s(null),de=s(0),O=s(null),ce=s(null),le=s(null),he=s(null),ge=s(null),pe=s(0),oe=s(0),e=f({get:()=>ye(),set:t=>t});function ye(){const t=Oe({userConfig:C.config,defaultConfig:Re});return t.theme?{...Oe({userConfig:lt.vue_ui_vertical_bar[t.theme]||C.config,defaultConfig:t}),customPalette:at[t.theme]||F}:t}Fe(()=>C.config,t=>{e.value=ye(),Ce(),pe.value+=1,oe.value+=1,c.value=e.value.style.chart.layout.bars.height,y.value=e.value.style.chart.layout.bars.gap},{deep:!0}),Fe(()=>C.dataset,J,{deep:!0});const{isPrinting:be,isImaging:fe,generatePdf:me,generateImage:xe}=mt({elementId:`vue-ui-vertical-bar_${S.value}`,fileName:e.value.style.chart.title.text||"vue-ui-vertical-bar"}),Ge=f(()=>e.value.userOptions.show&&!e.value.style.chart.title.text),ke=f(()=>ot(e.value.customPalette)),$e=s(null),we=s(!1),He=f(()=>e.value.table.responsiveBreakpoint),Y=s(null);ut(()=>{Ce()});function Ce(){if(Ie(C.dataset)&&Z({componentName:"VueUiVerticalBar",type:"dataset"}),K.value=C.dataset.flatMap(t=>t.children&&t.children.length>0?t.children.length:1).reduce((t,l)=>t+l,0),We(),e.value.responsive){const t=yt(()=>{const{width:l,height:a}=bt({chart:O.value,title:e.value.style.chart.title.text?ce.value:null,legend:e.value.style.chart.legend.show?le.value:null,source:he.value,noTitle:ge.value});Le.value=l,c.value=a/K.value-y.value*2});Y.value=new ResizeObserver(t),Y.value.observe(O.value.parentNode)}}rt(()=>{Y.value&&Y.value.disconnect()});function We(){new ResizeObserver(t=>{t.forEach(l=>{we.value=l.contentRect.width<He.value})}).observe($e.value)}const w=s({showTable:e.value.table.show,sortDesc:e.value.style.chart.layout.bars.sort==="desc",showTooltip:e.value.style.chart.tooltip.show}),_e=f(()=>w.value.sortDesc),z=f(()=>(C.dataset.forEach((t,l)=>{!t.value&&!t.children&&Z({componentName:"VueUiVerticalBar",type:"datasetAttributeEmpty",property:`value (index ${l})`}),t.children&&(Ie(t.children)?Z({componentName:"VueUiVerticalBar",type:"datasetAttributeEmpty",property:`children (index ${l})`}):t.children.forEach((a,o)=>{[null,void 0].includes(a.name)&&Z({componentName:"VueUiVerticalBar",type:"datasetSerieAttribute",property:"name",key:"children",index:o})}))}),C.dataset.map((t,l)=>{const a=`vertical_parent_${l}_${S.value}`,o=t.children&&t.children.length>0,m=N(t.value?t.value:o?t.children.map($=>$.value||0).reduce(($,P)=>$+P,0):0),g=m>=0?1:-1;return{...t,id:a,shape:"square",opacity:T.value.includes(a)?.5:1,value:Math.abs(m),sign:g,hasChildren:o,isChild:!1,segregate:()=>R(a),isSegregated:T.value.includes(a),color:se(t.color)||ke.value[l]||F[l]||F[l%F.length],children:!t.children||!t.children.length?[]:t.children.toSorted(($,P)=>_e.value?P.value-$.value:$.value-P.value).map(($,P)=>({...$,value:N(Math.abs($.value)),sign:$.value>=0?1:-1,isChild:!0,parentId:a,parentName:t.name,parentValue:m,parentSign:g,id:`vertical_child_${l}_${P}_${S.value}`,childIndex:P,color:se($.color)||se(t.color)||ke.value[l]||F[l]||F[l%F.length]})).map(($,P)=>({...$,isFirstChild:P===0,isLastChild:P===t.children.length-1}))}}).toSorted((t,l)=>_e.value?l.value-t.value:t.value-l.value))),Te=f(()=>({cy:"vertical-bar-div-legend",backgroundColor:e.value.style.chart.legend.backgroundColor,color:e.value.style.chart.legend.color,fontSize:e.value.style.chart.legend.fontSize,paddingBottom:12,fontWeight:e.value.style.chart.legend.bold?"bold":""})),c=s(e.value.style.chart.layout.bars.height),y=s(e.value.style.chart.layout.bars.gap),Ue=f(()=>(c.value+y.value)*K.value),Le=s(512),b=f(()=>({width:Le.value,height:Ue.value,padding:{top:12,left:128+e.value.style.chart.layout.bars.offsetX,right:64+e.value.style.chart.layout.bars.paddingRight,bottom:12}})),n=f(()=>({fullHeight:b.value.padding.top+b.value.padding.bottom+b.value.height,top:b.value.padding.top,left:b.value.padding.left,right:b.value.width-b.value.padding.right,bottom:b.value.padding.top+b.value.height,width:b.value.width-(b.value.padding.left+b.value.padding.right)}));function J(){K.value=M.value.flatMap(t=>t.children&&t.children.length>0?t.children.length:1).reduce((t,l)=>t+l,0)}const T=s([]);function R(t){T.value.includes(t)?T.value=T.value.filter(l=>l!==t):T.value.push(t),J(),Ee("selectLegend",M.value)}const M=f(()=>z.value.filter(t=>!T.value.includes(t.id))),L=f(()=>M.value.map(t=>Math.abs(t.value)).reduce((t,l)=>t+l,0));function Pe(t,l=!1,a=0){return l?A({v:N(Math.abs(t)/L.value*100),s:"%",r:a}):Math.abs(t)/L.value}const B=f(()=>M.value.flatMap(t=>t.hasChildren?t.children:t)),j=f(()=>B.value.map(t=>t.sign).includes(-1)),qe=f(()=>Math.max(...M.value.flatMap(t=>t.children&&t.children.length?Math.max(...t.children.map(l=>l.value)):t.value)));function V(t){const l=t/qe.value;return n.value.width/(j.value?2:1)*l}function Ke(t){return V(t)+n.value.left}function X(t,l){const a=M.value.find(g=>g.id===t.parentId),o=n.value.top+(y.value+c.value)*l,m=a.children.length*(y.value+c.value);return{y:o+m/2-e.value.style.chart.layout.bars.parentLabels.fontSize,name:a.name,value:[void 0,NaN,null].includes(a.value)?"":a.sign===1?a.value:-a.value,percentageToTotal:isNaN(a.value/L.value)?"":Pe(a.value,!0,e.value.style.chart.layout.bars.dataLabels.percentage.roundingPercentage),sign:a.sign}}function Ye(){return M.value}const ue=s(null),re=s(null);function Je(t,l){re.value={datapoint:t,seriesIndex:l,series:z.value,config:e.value},te.value=!0,ue.value=t.id;let a="";const o=t.isChild?t.parentName:t.name,m=t.isChild?t.name:"",g=e.value.style.chart.tooltip.customFormat;ct(g)&&ht(()=>g({datapoint:t,series:z.value,config:e.value,seriesIndex:l}))?ae.value=g({datapoint:t,series:z.value,config:e.value,seriesIndex:l}):(a+=`<div style="width:100%;text-align:center;border-bottom:1px solid ${e.value.style.chart.tooltip.borderColor};padding-bottom:6px;margin-bottom:3px;text-align:left;">
                <div style="display:flex;align-items:center;gap:4px;"><svg viewBox="0 0 12 12" height="14" width="14"><rect x="0" y="0" height="12" width="12" rx="2" stroke="none" fill="${t.color}"/></svg> ${o}</div>
                ${m?`<div>${m}</div>`:""}
            </div>`,e.value.style.chart.tooltip.showValue&&(a+=`<div>${e.value.translations.value}: <b>${ee(e.value.style.chart.layout.bars.dataLabels.value.formatter,t.sign===1?t.value:-t.value,A({p:e.value.style.chart.tooltip.prefix,v:t.sign===1?t.value:-t.value,s:e.value.style.chart.tooltip.suffix,r:e.value.style.chart.tooltip.roundingValue}),{datapoint:t,seriesIndex:l})}</b></div>`),e.value.style.chart.tooltip.showPercentage&&(a+=`<div>${e.value.translations.percentageToTotal} : <b>${A({v:Math.abs(t.value)/L.value*100,s:"%",r:e.value.style.chart.tooltip.roundingPercentage})}</b></div>`,t.isChild&&(a+=`<div>${e.value.translations.percentageToSerie}: <b>${A({v:Math.abs(t.value)/Math.abs(t.parentValue)*100,s:"%",r:e.value.style.chart.tooltip.roundingPercentage})}</b></div>`)),ae.value=`<div style="text-align:left">${a}</div>`)}function Ve(t,l,a,o){if(!e.value.style.chart.layout.bars.dataLabels.value.show)return"";const m=ee(e.value.style.chart.layout.bars.dataLabels.value.formatter,N(o===-1&&t>=0?-t:t),A({p:e.value.style.chart.layout.bars.dataLabels.value.prefix,v:N(o===-1&&t>=0?-t:t),s:e.value.style.chart.layout.bars.dataLabels.value.suffix,r:e.value.style.chart.layout.bars.dataLabels.value.roundingValue}),{datapoint:l,seriesIndex:a}),g=`(${Pe(t,!0,e.value.style.chart.layout.bars.dataLabels.percentage.roundingPercentage)})`;return`${m}${e.value.style.chart.layout.bars.dataLabels.percentage.show?` ${g}`:""}`}const _=f(()=>{const t=[e.value.translations.parentName,e.value.translations.value,e.value.translations.percentageToTotal,e.value.translations.childName,e.value.translations.value,e.value.translations.percentageToSerie,e.value.translations.percentageToTotal],l=B.value.map(a=>a.isChild?a.isFirstChild?{color:a.color,parentName:a.parentName,parentValue:a.parentValue,percentageToTotal:a.parentValue/L.value,childName:a.name,childValue:a.sign===1?a.value:-a.value,childPercentageToParent:Math.abs(a.value)/Math.abs(a.parentValue),childPercentageToTotal:Math.abs(a.value)/L.value}:{color:"",parentName:"",parentValue:"",percentageToTotal:"",childName:a.name,childValue:a.sign===1?a.value:-a.value,childPercentageToParent:Math.abs(a.value)/Math.abs(a.parentValue),childPercentageToTotal:Math.abs(a.value)/L.value}:{color:a.color,parentName:a.name,parentValue:a.sign===1?a.value:-a.value,percentageToTotal:Math.abs(a.value)/L.value,childName:"",childValue:"",childPercentageToParent:"",childPercentageToTotal:""});return{head:t,body:l}});function Ne(){const t=[[e.value.style.chart.title.text],[e.value.style.chart.title.subtitle.text],[""]],l=_.value.head,a=_.value.body.map(g=>[g.parentName,g.parentValue,g.percentageToTotal,g.childName,g.childValue,g.childPercentageToParent,g.childPercentageToTotal]),o=t.concat([l]).concat(a),m=nt(o);st({csvContent:m,title:e.value.style.chart.title.text||"vue-ui-vertical-bar"})}const D=s(!1);function Qe(t){D.value=t,de.value+=1}function Se(){w.value.showTable=!w.value.showTable}function ze(){w.value.sortDesc=!w.value.sortDesc,J()}function Me(){w.value.showTooltip=!w.value.showTooltip}const Q=s(!1);function ne(){Q.value=!Q.value}return je({getData:Ye,recalculateHeight:J,generatePdf:me,generateCsv:Ne,generateImage:xe,toggleTable:Se,toggleSort:ze,toggleTooltip:Me,toggleAnnotator:ne}),(t,l)=>(r(),i("div",{class:E(`vue-ui-vertical-bar ${D.value?"vue-data-ui-wrapper-fullscreen":""} ${e.value.useCssAnimation?"":"vue-ui-dna"}`),ref_key:"verticalBarChart",ref:O,id:`vue-ui-vertical-bar_${S.value}`,style:d(`font-family:${e.value.style.fontFamily};width:100%; text-align:center;background:${e.value.style.chart.backgroundColor};${e.value.responsive?"height: 100%":""}`)},[e.value.userOptions.buttons.annotator?(r(),I(Lt,{key:0,parent:O.value,backgroundColor:e.value.style.chart.backgroundColor,color:e.value.style.chart.color,active:Q.value,onClose:ne},null,8,["parent","backgroundColor","color","active"])):p("",!0),Ge.value?(r(),i("div",{key:1,ref_key:"noTitle",ref:ge,class:"vue-data-ui-no-title-space",style:"height:36px; width: 100%;background:transparent"},null,512)):p("",!0),e.value.style.chart.title.text?(r(),i("div",{key:2,ref_key:"chartTitle",ref:ce,style:"width:100%;background:transparent;padding-bottom:12px"},[(r(),I(ft,{key:`title_${pe.value}`,config:{title:{cy:"vertical-bar-div-title",...e.value.style.chart.title},subtitle:{cy:"vertical-bar-div-subtitle",...e.value.style.chart.title.subtitle}}},null,8,["config"]))],512)):p("",!0),e.value.userOptions.show&&q.value?(r(),I(xt,{ref_key:"details",ref:Xe,key:`user_options_${de.value}`,backgroundColor:e.value.style.chart.backgroundColor,color:e.value.style.chart.color,isImaging:h(fe),isPrinting:h(be),uid:S.value,hasTooltip:e.value.userOptions.buttons.tooltip&&e.value.style.chart.tooltip.show,hasPdf:e.value.userOptions.buttons.pdf,hasImg:e.value.userOptions.buttons.img,hasXls:e.value.userOptions.buttons.csv,hasTable:e.value.userOptions.buttons.table,hasSort:e.value.userOptions.buttons.sort,hasFullscreen:e.value.userOptions.buttons.fullscreen,isFullscreen:D.value,isTooltip:w.value.showTooltip,titles:{...e.value.userOptions.buttonTitles},chartElement:O.value,position:e.value.userOptions.position,hasAnnotator:e.value.userOptions.buttons.annotator,isAnnotation:Q.value,onToggleFullscreen:Qe,onGeneratePdf:h(me),onGenerateCsv:Ne,onGenerateImage:h(xe),onToggleTable:Se,onToggleSort:ze,onToggleTooltip:Me,onToggleAnnotator:ne},it({_:2},[t.$slots.optionTooltip?{name:"optionTooltip",fn:k(()=>[x(t.$slots,"optionTooltip",{},void 0,!0)]),key:"0"}:void 0,t.$slots.optionPdf?{name:"optionPdf",fn:k(()=>[x(t.$slots,"optionPdf",{},void 0,!0)]),key:"1"}:void 0,t.$slots.optionCsv?{name:"optionCsv",fn:k(()=>[x(t.$slots,"optionCsv",{},void 0,!0)]),key:"2"}:void 0,t.$slots.optionImg?{name:"optionImg",fn:k(()=>[x(t.$slots,"optionImg",{},void 0,!0)]),key:"3"}:void 0,t.$slots.optionTable?{name:"optionTable",fn:k(()=>[x(t.$slots,"optionTable",{},void 0,!0)]),key:"4"}:void 0,t.$slots.optionLabels?{name:"optionLabels",fn:k(()=>[x(t.$slots,"optionLabels",{},void 0,!0)]),key:"5"}:void 0,t.$slots.optionSort?{name:"optionSort",fn:k(()=>[x(t.$slots,"optionSort",{},void 0,!0)]),key:"6"}:void 0,t.$slots.optionFullscreen?{name:"optionFullscreen",fn:k(({toggleFullscreen:a,isFullscreen:o})=>[x(t.$slots,"optionFullscreen",G(H({toggleFullscreen:a,isFullscreen:o})),void 0,!0)]),key:"7"}:void 0,t.$slots.optionAnnotator?{name:"optionAnnotator",fn:k(({toggleAnnotator:a,isAnnotator:o})=>[x(t.$slots,"optionAnnotator",G(H({toggleAnnotator:a,isAnnotator:o})),void 0,!0)]),key:"8"}:void 0]),1032,["backgroundColor","color","isImaging","isPrinting","uid","hasTooltip","hasPdf","hasImg","hasXls","hasTable","hasSort","hasFullscreen","isFullscreen","isTooltip","titles","chartElement","position","hasAnnotator","isAnnotation","onGeneratePdf","onGenerateImage"])):p("",!0),e.value.style.chart.legend.show&&e.value.style.chart.legend.position==="top"?(r(),i("div",{key:4,ref_key:"chartLegend",ref:le},[(r(),I(Ae,{key:`legend_top_${oe.value}`,legendSet:z.value,config:Te.value,onClickMarker:l[0]||(l[0]=({legend:a})=>R(a.id))},{item:k(({legend:a,index:o})=>[u("div",{"data-cy-legend-item":"",onClick:m=>R(a.id),style:d(`opacity:${T.value.includes(a.id)?.5:1}`)},v(a.name)+": "+v(h(ee)(e.value.style.chart.layout.bars.dataLabels.value.formatter,a.value,h(A)({p:e.value.style.chart.legend.prefix,v:a.value,s:e.value.style.chart.legend.suffix,r:e.value.style.chart.legend.roundingValue}),{datapoint:a,seriesIndex:o})),13,Vt)]),_:1},8,["legendSet","config"]))],512)):p("",!0),q.value?(r(),i("svg",{key:5,xmlns:h(vt),class:E({"vue-data-ui-fullscreen--on":D.value,"vue-data-ui-fulscreen--off":!D.value}),viewBox:`0 0 ${b.value.width<=0?10:b.value.width} ${n.value.fullHeight<=0?10:n.value.fullHeight}`,style:d(`max-width:100%;overflow:visible;background:transparent;color:${e.value.style.chart.color}`)},[ie(Tt),(r(!0),i(W,null,U(B.value,(a,o)=>(r(),i("linearGradient",{x1:"0%",y1:"0%",x2:"100%",y2:"0%",id:`vertical_bar_gradient_${S.value}_${o}`},[u("stop",{offset:"0%","stop-color":a.color},null,8,zt),u("stop",{offset:"100%","stop-color":h(ve)(h(dt)(a.color,.03),100-e.value.style.chart.layout.bars.gradientIntensity)},null,8,Mt)],8,St))),256)),(r(!0),i(W,null,U(B.value,(a,o)=>(r(),i("g",null,[u("rect",{x:h(N)(j.value?n.value.left+n.value.width/2-(a.sign===1?0:V(a.value)<=0?1e-4:V(a.value)):n.value.left),y:n.value.top+(y.value+c.value)*o,width:h(N)(V(a.value)<=0?1e-4:V(a.value)),height:c.value<=0?1e-4:c.value,fill:e.value.style.chart.layout.bars.underlayerColor,rx:e.value.style.chart.layout.bars.borderRadius,class:E({animated:e.value.useCssAnimation})},null,10,Ft)]))),256)),(r(!0),i(W,null,U(B.value,(a,o)=>(r(),i("g",null,[u("rect",{x:h(N)(j.value?n.value.left+n.value.width/2-(a.sign===1?0:V(a.value)<=0?1e-4:V(a.value)):n.value.left),y:n.value.top+(y.value+c.value)*o,width:h(N)(V(a.value)<=0?1e-4:V(a.value)),height:c.value<=0?1e-4:c.value,fill:e.value.style.chart.layout.bars.useGradient?`url(#vertical_bar_gradient_${S.value}_${o})`:h(ve)(a.color,e.value.style.chart.layout.bars.fillOpacity),rx:e.value.style.chart.layout.bars.borderRadius,stroke:e.value.style.chart.layout.bars.useStroke?a.color:"none","stroke-width":e.value.style.chart.layout.bars.useStroke?e.value.style.chart.layout.bars.strokeWidth:0,class:E({animated:e.value.useCssAnimation})},null,10,It),(!a.isChild||a.isLastChild)&&e.value.style.chart.layout.separators.show&&o!==B.value.length-1?(r(),i("line",{key:0,x1:0,x2:n.value.left,y1:c.value+y.value/2+n.value.top+(y.value+c.value)*o,y2:c.value+y.value/2+n.value.top+(y.value+c.value)*o,stroke:e.value.style.chart.layout.separators.color,"stroke-width":e.value.style.chart.layout.separators.strokeWidth,"stroke-linecap":"round"},null,8,At)):p("",!0),j.value&&e.value.style.chart.layout.separators.show?(r(),i("line",{key:1,x1:n.value.left+n.value.width/2,x2:n.value.left+n.value.width/2,y1:n.value.top,y2:n.value.bottom,stroke:e.value.style.chart.layout.separators.color,"stroke-width":e.value.style.chart.layout.separators.strokeWidth,"stroke-linecap":"round"},null,8,Ot)):p("",!0),u("text",{x:j.value?n.value.left+n.value.width/2+(a.sign===1?-12:12)+(a.sign===1?-e.value.style.chart.layout.bars.dataLabels.offsetX:e.value.style.chart.layout.bars.dataLabels.offsetX):Ke(a.value)+3+e.value.style.chart.layout.bars.dataLabels.offsetX,y:n.value.top+(y.value+c.value)*o+c.value/2+e.value.style.chart.layout.bars.dataLabels.fontSize/2,"text-anchor":!j.value||a.sign===-1?"start":"end","font-size":e.value.style.chart.layout.bars.dataLabels.fontSize,fill:e.value.style.chart.layout.bars.dataLabels.color,"font-weight":e.value.style.chart.layout.bars.dataLabels.bold?"bold":"normal"},v(Ve(a.value,a,o,a.sign)),9,Bt),(a.isChild||!a.hasChildren)&&e.value.style.chart.layout.bars.nameLabels.show?(r(),i("text",{key:2,"text-anchor":"end",x:n.value.left-3+e.value.style.chart.layout.bars.nameLabels.offsetX,y:n.value.top+(y.value+c.value)*o+c.value/2+e.value.style.chart.layout.bars.nameLabels.fontSize/2,"font-size":e.value.style.chart.layout.bars.nameLabels.fontSize,fill:e.value.style.chart.layout.bars.nameLabels.color,"font-weight":e.value.style.chart.layout.bars.nameLabels.bold?"bold":"normal"},v(a.name),9,jt)):p("",!0),a.isChild&&a.childIndex===0&&e.value.style.chart.layout.bars.parentLabels.show?(r(),i("text",{key:3,x:3+e.value.style.chart.layout.bars.parentLabels.offsetX,y:X(a,o).y,"font-size":e.value.style.chart.layout.bars.parentLabels.fontSize,fill:e.value.style.chart.layout.bars.parentLabels.color,"font-weight":e.value.style.chart.layout.bars.parentLabels.bold?"bold":"normal","text-anchor":"start"},v(X(a,o).name),9,Et)):p("",!0),a.isChild&&a.childIndex===0&&e.value.style.chart.layout.bars.parentLabels.show?(r(),i("text",{key:4,x:3+e.value.style.chart.layout.bars.parentLabels.offsetX,y:X(a,o).y+e.value.style.chart.layout.bars.parentLabels.fontSize+6,"font-size":e.value.style.chart.layout.bars.parentLabels.fontSize,fill:e.value.style.chart.layout.bars.parentLabels.color,"font-weight":e.value.style.chart.layout.bars.dataLabels.bold?"bold":"normal","text-anchor":"start"},v(Ve(X(a,o).value),X(a,o),o,a.parentSign||a.sign),9,Rt)):p("",!0),u("rect",{"data-cy-trap":"",x:0,y:n.value.top+(y.value+c.value)*o-y.value/2,width:b.value.width<=0?1e-4:b.value.width,height:c.value+y.value<=0?1e-4:c.value+y.value,fill:ue.value===a.id?h(ve)(e.value.style.chart.layout.highlighter.color,e.value.style.chart.layout.highlighter.opacity):"transparent",onMouseenter:m=>Je(a,o),onMouseleave:l[1]||(l[1]=m=>{De.value=null,te.value=!1,ue.value=null})},null,40,Xt)]))),256)),x(t.$slots,"svg",{svg:b.value},void 0,!0)],14,Nt)):p("",!0),t.$slots.watermark?(r(),i("div",Dt,[x(t.$slots,"watermark",G(H({isPrinting:h(be)||h(fe)})),void 0,!0)])):p("",!0),q.value?p("",!0):(r(),I($t,{key:7,config:{type:"verticalBar",style:{backgroundColor:e.value.style.chart.backgroundColor,verticalBar:{axis:{color:"#CCCCCC"},color:"#CCCCCC"}}}},null,8,["config"])),e.value.style.chart.legend.show&&e.value.style.chart.legend.position==="bottom"?(r(),i("div",{key:8,ref_key:"chartLegend",ref:le},[(r(),I(Ae,{key:`legend_bottom_${oe.value}`,legendSet:z.value,config:Te.value,onClickMarker:l[2]||(l[2]=({legend:a})=>R(a.id))},{item:k(({legend:a,index:o})=>[u("div",{onClick:m=>R(a.id),style:d(`opacity:${T.value.includes(a.id)?.5:1}`)},v(a.name)+": "+v(h(ee)(e.value.style.chart.layout.bars.dataLabels.value.formatter,a.value,h(A)({p:e.value.style.chart.legend.prefix,v:a.value,s:e.value.style.chart.legend.suffix,r:e.value.style.chart.legend.roundingValue}),{datapoint:a,seriesIndex:o})),13,Gt)]),_:1},8,["legendSet","config"]))],512)):p("",!0),x(t.$slots,"legend",{legend:z.value},void 0,!0),t.$slots.source?(r(),i("div",{key:9,ref_key:"source",ref:he,dir:"auto"},[x(t.$slots,"source",{},void 0,!0)],512)):p("",!0),ie(kt,{show:w.value.showTooltip&&te.value&&T.value.length<C.dataset.length,backgroundColor:e.value.style.chart.tooltip.backgroundColor,color:e.value.style.chart.tooltip.color,borderRadius:e.value.style.chart.tooltip.borderRadius,borderColor:e.value.style.chart.tooltip.borderColor,borderWidth:e.value.style.chart.tooltip.borderWidth,fontSize:e.value.style.chart.tooltip.fontSize,backgroundOpacity:e.value.style.chart.tooltip.backgroundOpacity,position:e.value.style.chart.tooltip.position,offsetY:e.value.style.chart.tooltip.offsetY,parent:O.value,content:ae.value,isCustom:e.value.style.chart.tooltip.customFormat&&typeof e.value.style.chart.tooltip.customFormat=="function"},{"tooltip-before":k(()=>[x(t.$slots,"tooltip-before",G(H({...re.value})),void 0,!0)]),"tooltip-after":k(()=>[x(t.$slots,"tooltip-after",G(H({...re.value})),void 0,!0)]),_:3},8,["show","backgroundColor","color","borderRadius","borderColor","borderWidth","fontSize","backgroundOpacity","position","offsetY","parent","content","isCustom"]),q.value?(r(),I(_t,{key:10,hideDetails:"",config:{open:w.value.showTable,maxHeight:1e4,body:{backgroundColor:e.value.style.chart.backgroundColor,color:e.value.style.chart.color},head:{backgroundColor:e.value.style.chart.backgroundColor,color:e.value.style.chart.color}}},{content:k(()=>[u("div",{ref_key:"tableContainer",ref:$e,class:"vue-ui-vertical-bar-table"},[u("div",Ht,[u("div",{role:"button",tabindex:"0",style:d(`width:32px; position: absolute; top: 0; right:4px; padding: 0 0px; display: flex; align-items:center;justify-content:center;height: 36px; width: 32px; cursor:pointer; background:${e.value.table.th.backgroundColor};`),onClick:l[3]||(l[3]=a=>w.value.showTable=!1),onKeypress:l[4]||(l[4]=gt(a=>w.value.showTable=!1,["enter"]))},[ie(Ct,{name:"close",stroke:e.value.table.th.color,"stroke-width":2},null,8,["stroke"])],36),u("div",{style:{width:"100%","container-type":"inline-size"},class:E({"vue-ui-responsive":we.value})},[u("table",Wt,[u("caption",{style:d({backgroundColor:e.value.table.th.backgroundColor,color:e.value.table.th.color,outline:e.value.table.th.outline}),class:"vue-ui-data-table__caption"},[pt(v(e.value.style.chart.title.text)+" ",1),e.value.style.chart.title.subtitle.text?(r(),i("span",Ut,v(e.value.style.chart.title.subtitle.text),1)):p("",!0)],4),u("thead",null,[u("tr",{role:"row",style:d(`background:${e.value.table.th.backgroundColor};color:${e.value.table.th.color}`)},[(r(!0),i(W,null,U(_.value.head,a=>(r(),i("th",{style:d(`outline:${e.value.table.th.outline}`)},[u("div",qt,v(a),1)],4))),256))],4),u("tr",null,[u("th",{style:d(`background:${e.value.table.th.backgroundColor};color:${e.value.table.th.color};outline:${e.value.table.th.outline}`)},null,4),u("th",{style:d(`background:${e.value.table.th.backgroundColor};color:${e.value.table.th.color};outline:${e.value.table.th.outline};text-align:right;padding-right:5px;font-weight:bold`)},"∑ "+v(e.value.table.td.prefix)+v(isNaN(L.value)?"":L.value.toFixed(e.value.table.td.roundingValue))+v(e.value.table.td.suffix),5),u("th",{style:d(`background:${e.value.table.th.backgroundColor};color:${e.value.table.th.color};outline:${e.value.table.th.outline};text-align:right;padding-right:5px;font-weight:bold`)},"100%",4),u("th",{style:d(`background:${e.value.table.th.backgroundColor};color:${e.value.table.th.color};outline:${e.value.table.th.outline}`)},null,4),u("th",{style:d(`background:${e.value.table.th.backgroundColor};color:${e.value.table.th.color};outline:${e.value.table.th.outline}`)},null,4),u("th",{style:d(`background:${e.value.table.th.backgroundColor};color:${e.value.table.th.color};outline:${e.value.table.th.outline}`)},null,4),u("th",{style:d(`background:${e.value.table.th.backgroundColor};color:${e.value.table.th.color};outline:${e.value.table.th.outline}`)},null,4)])]),u("tbody",null,[(r(!0),i(W,null,U(_.value.body,(a,o)=>(r(),i("tr",{class:E({"vue-ui-data-table__tbody__row":!0,"vue-ui-data-table__tbody__row-even":o%2===0,"vue-ui-data-table__tbody__row-odd":o%2!==0}),style:d(`background:${e.value.table.td.backgroundColor};color:${e.value.table.td.color}`)},[u("td",{class:"vue-ui-data-table__tbody__td",style:d(`outline:${e.value.table.td.outline};font-variant-numeric: tabular-nums;`),"data-cell":_.value.head[0]??""},[u("div",Yt,[a.color?(r(),i("span",{key:0,style:d(`color:${a.color};margin-right:3px`)},"⬤",4)):p("",!0),u("span",null,v(a.parentName),1)])],12,Kt),u("td",{class:"vue-ui-data-table__tbody__td",style:d(`outline:${e.value.table.td.outline}`),"data-cell":_.value.head[1]??""},[u("div",Qt,v(e.value.table.td.prefix)+v(["",NaN,void 0].includes(a.parentValue)?"":a.parentValue.toFixed(e.value.table.td.roundingValue))+v(e.value.table.td.suffix),1)],12,Jt),u("td",{class:"vue-ui-data-table__tbody__td",style:d(`outline:${e.value.table.td.outline}`),"data-cell":_.value.head[2]??""},[u("div",ea,v(["",NaN,void 0].includes(a.percentageToTotal)?"":`${(a.percentageToTotal*100).toFixed(e.value.table.td.roundingPercentage)}%`),1)],12,Zt),u("td",{class:"vue-ui-data-table__tbody__td",style:d(`outline:${e.value.table.td.outline}`),"data-cell":_.value.head[3]??""},[u("div",aa,v(a.childName),1)],12,ta),u("td",{class:"vue-ui-data-table__tbody__td",style:d(`outline:${e.value.table.td.outline}`),"data-cell":_.value.head[4]??""},[u("div",oa,v(e.value.table.td.prefix)+v(["",NaN,void 0].includes(a.childValue)?"":a.childValue.toFixed(e.value.table.td.roundingValue))+v(e.value.table.td.suffix),1)],12,la),u("td",{class:"vue-ui-data-table__tbody__td",style:d(`outline:${e.value.table.td.outline}`),"data-cell":_.value.head[5]??""},[u("div",ra,v(["",NaN,void 0].includes(a.childPercentageToParent)?"":`${(a.childPercentageToParent*100).toFixed(e.value.table.td.roundingPercentage)}%`),1)],12,ua),u("td",{class:"vue-ui-data-table__tbody__td",style:d(`outline:${e.value.table.td.outline}`),"data-cell":_.value.head[6]??""},[u("div",sa,v(["",NaN,void 0].includes(a.childPercentageToTotal)?"":`${(a.childPercentageToTotal*100).toFixed(e.value.table.td.roundingPercentage)}%`),1)],12,na)],6))),256))])])],2)])],512)]),_:1},8,["config"])):p("",!0)],14,Pt))}},wa=wt(ia,[["__scopeId","data-v-0976c0bc"]]);export{wa as default};
