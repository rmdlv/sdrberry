import{c as F}from"./useNestedProp-BxrcwmTZ-CudEJDco.js";import{z,c as S,w as p,r as $,b as w,o as i,a as n,e as y,m as u,g as C,h as k,M as s,n as v,f as B,P as D,u as b,U as M,G as N}from"./index-UNQvOp-_.js";import V from"./vue-ui-digits-d5q7aYEB-CQFoY16C.js";const T={__name:"vue-ui-kpi",props:{config:{type:Object,default(){return{}}},dataset:{type:Number,default:0}},setup(o){const l=o,{vue_ui_kpi:h}=z(),e=S({get:()=>r(),set:a=>a});function r(){return F({userConfig:l.config,defaultConfig:h})}p(()=>l.config,a=>{e.value=r(),c()},{deep:!0});const x=$((l.dataset,l.dataset)),t=$(e.value.useAnimation?e.value.animationValueStart:x.value),m=a=>{const d=e.value.animationFrames,f=Math.abs(a-t.value)/d;function g(){t.value<a?t.value=Math.min(t.value+f,a):t.value>a&&(t.value=Math.max(t.value-f,a)),t.value!==a&&requestAnimationFrame(g)}g()};w(()=>{c()});function c(){e.value.useAnimation?(t.value=e.value.animationValueStart,m(l.dataset)):t.value=l.dataset}return p(()=>l.dataset,a=>{e.value.useAnimation?m(a):t.value=a}),(a,d)=>(i(),n("div",{class:v(`vue-ui-kpi ${e.value.layoutClass}`),style:s(`background:${e.value.backgroundColor}; ${e.value.layoutCss}`)},[y("div",{class:v(`vue-ui-kpi-title ${e.value.titleClass}`),style:s(`font-family: ${e.value.fontFamily}; font-size:${e.value.titleFontSize}px; color:${e.value.titleColor}; font-weight:${e.value.titleBold?"bold":"normal"}; ${e.value.titleCss}`)},[u(a.$slots,"title",{comment:o.dataset}),C(" "+k(e.value.title),1)],6),u(a.$slots,"comment-before",{comment:o.dataset}),y("div",{class:v(`vue-ui-kpi-value ${e.value.valueClass}`),style:s(`font-family: ${e.value.fontFamily}; font-size:${e.value.valueFontSize}px; color:${e.value.valueColor}; font-weight:${e.value.valueBold?"bold":"normal"}; ${e.value.valueCss}`)},[u(a.$slots,"value",{comment:o.dataset}),e.value.analogDigits.show?(i(),n("div",{key:0,style:s({height:e.value.analogDigits.height+"px"})},[B(V,{dataset:Number(t.value.toFixed(e.value.valueRounding)),config:{backgroundColor:e.value.backgroundColor,digits:{color:e.value.analogDigits.color,skeletonColor:e.value.analogDigits.skeletonColor}}},null,8,["dataset","config"])],4)):(i(),n(D,{key:1},[C(k(b(M)(e.value.formatter,t.value,b(N)({p:e.value.prefix,v:t.value,s:e.value.suffix,r:e.value.valueRounding}))),1)],64))],6),u(a.$slots,"comment-after",{comment:o.dataset})],6))}};export{T as default};
