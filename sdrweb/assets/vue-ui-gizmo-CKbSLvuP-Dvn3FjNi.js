import{z as x,r as C,D as z,b as _,C as G,c as d,w as b,o as r,a as s,f as L,e as t,L as l,P as k,h as g,u,U as m,G as p,M as $}from"./index-UNQvOp-_.js";import{c as B}from"./useNestedProp-BxrcwmTZ-CudEJDco.js";import{p as M}from"./PackageVersion-mSsg8dpu-BpMA5JNq.js";const P=["viewBox","width"],V={key:0},D=["id"],N=["stop-color"],S=["stop-color"],U=["stroke"],F=["stroke"],j=["width","fill"],q=["fill"],E={key:0},H=["id"],I=t("feGaussianBlur",{in:"SourceGraphic",stdDeviation:1},null,-1),O=[I],A=["stroke"],J=["stroke","stroke-dasharray","stroke-dashoffset"],K=["filter"],Q=["stroke","stroke-dasharray","stroke-dashoffset"],R=["fill"],Y={__name:"vue-ui-gizmo",props:{config:{type:Object,default(){return{}}},dataset:{type:Number,default:0}},setup(f){const a=f,{vue_ui_gizmo:w}=x(),i=C(z());_(()=>{c()});function c(){!a.dataset&&a.dataset!==0&&G({componentName:"VueUiGizmo",type:"dataset"}),a.dataset<0&&console.warn("VueUiGizmo: dataset cannot be negative.")}const e=d({get:()=>h(),set:o=>o});function h(){return B({userConfig:a.config,defaultConfig:w})}b(()=>a.config,o=>{e.value=h(),c()},{deep:!0});const v=d(()=>({battery:{width:e.value.showPercentage?140:80,height:50},gauge:{width:80,height:80}})[e.value.type]),n=d(()=>{const o=2*Math.PI*35,y=o-a.dataset/100*o;return{dasharray:`${o} ${o}`,dashoffset:y}});return(o,y)=>(r(),s("svg",{class:"vue-ui-gizmo",viewBox:`0 0 ${v.value.width} ${v.value.height}`,width:e.value.size,style:$({background:"transparent",fontFamily:e.value.fontFamily})},[L(M),e.value.useGradient?(r(),s("defs",V,[t("linearGradient",{id:`gizmo_gradient_${i.value}`,x1:"0%",x2:"100%",y1:"0%",y2:"0%"},[t("stop",{offset:"0%","stop-color":e.value.gradientColor},null,8,N),t("stop",{offset:"100%","stop-color":e.value.color},null,8,S)],8,D)])):l("",!0),e.value.type==="battery"?(r(),s(k,{key:1},[t("path",{d:"M 5 10 L 5 40 C 5 43 7 45 9 45 L 65 45 C 68 45 70 43 70 40 L 70 38 C 73 38 75 38 75 33 L 75 17 C 75 12 73 12 70 12 L 70 10 C 70 7 68 5 65 5 L 10 5 C 7 5 5 7 5 10",stroke:e.value.stroke,"stroke-width":2,fill:"none"},null,8,U),t("path",{d:"M 70 16 L 70 34",stroke:e.value.stroke,"stroke-width":2,fill:"none",style:{opacity:"0.5"}},null,8,F),t("rect",{x:10,y:10,height:30,width:55*(f.dataset/100),fill:e.value.useGradient?`url(#gizmo_gradient_${i.value})`:e.value.color,rx:2},null,8,j),e.value.showPercentage?(r(),s("text",{key:0,x:85,y:32,"text-anchor":"start","font-size":"20",fill:e.value.textColor},g(u(m)(e.value.formatter,a.dataset,u(p)({v:a.dataset,s:"%"}))),9,q)):l("",!0)],64)):l("",!0),e.value.type==="gauge"?(r(),s(k,{key:2},[e.value.useGradient?(r(),s("defs",E,[t("filter",{id:`blur_${i.value}`,x:"-50%",y:"-50%",width:"200%",height:"200%"},O,8,H)])):l("",!0),t("circle",{cx:40,cy:40,r:35,stroke:e.value.stroke,"stroke-width":2*4,fill:"none"},null,8,A),t("circle",{cx:40,cy:40,r:35,stroke:e.value.color,"stroke-width":2*4,"stroke-dasharray":n.value.dasharray,"stroke-dashoffset":n.value.dashoffset,"stroke-linecap":"round",fill:"none",style:{transform:"rotate(-90deg)","transform-origin":"50% 50%"}},null,8,J),e.value.useGradient?(r(),s("g",{key:1,filter:`url(#blur_${i.value})`},[t("circle",{cx:40,cy:40,r:35,stroke:e.value.gradientColor,"stroke-width":1,fill:"none","stroke-dasharray":n.value.dasharray,"stroke-dashoffset":n.value.dashoffset,style:{transform:"rotate(-90deg)","transform-origin":"50% 50%"}},null,8,Q)],8,K)):l("",!0),e.value.showPercentage?(r(),s("text",{key:2,x:40,y:47,"text-anchor":"middle","font-size":"20",fill:e.value.textColor},g(u(m)(e.value.formatter,a.dataset,u(p)({v:a.dataset,s:"%"}))),9,R)):l("",!0)],64)):l("",!0)],12,P))}};export{Y as default};
