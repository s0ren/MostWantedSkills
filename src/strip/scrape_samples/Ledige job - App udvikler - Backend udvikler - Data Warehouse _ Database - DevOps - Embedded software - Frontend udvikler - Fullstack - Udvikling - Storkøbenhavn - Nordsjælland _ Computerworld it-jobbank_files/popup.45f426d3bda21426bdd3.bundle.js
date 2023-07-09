"use strict";(self.webpackChunkjix=self.webpackChunkjix||[]).push([[1378],{6831:(e,t,r)=>{var n=r(65311),o=r.n(n),a=r(2784),i=r(2871),s=r(88992),c=r(79e3);const l=window.Stash["jobagent/popup"];function jobmail_popup_ready(){o()("#jobmail_popup.show-on-load").modal("show"),o()("#jobmail_popup").on("hide.bs.modal",(function(){o()("#jobmail_popup").find("[name=email]").val(""),o().ajax({url:"/api/popup/jobagent/closed"})}))}window.jobmail_popup_ready=jobmail_popup_ready,o()((()=>{jobmail_popup_ready(),o()(document).on("click",".js-popup-agent",(e=>{e.preventDefault();const t=o()(l.formSelector),r=o()(e.target).data("jobagent-source"),n=o()(e.target).data("jobagent-tag"),a=t.find("[name=q]").val();r||console.error("jobagent popup opened without a source",e.target),t.find("[name=source]").val(r),t.find("[name=email]").val()?(window.jixAnalytics("event",{category:"Jobagent",action:n,label:a}),t.trigger("submit")):(window.jixAnalytics("event",{category:"Jobagent",action:n,label:a}),t.find("[name='analytics_tag']").val("popup"),o()("#jobmail_popup").modal("show"))})),o()(document).on("submit",l.formSelector,(e=>{e.preventDefault();const t=o()(l.formSelector),r=t.find("[name='analytics_tag']").val(),n=t.find("[name=q]").val();t.find(".invalid-feedback").remove(),t.find(".is-invalid").removeClass("is-invalid"),window.Stash.common.userid||window.jixAnalytics("event",{category:"Jobagent",action:r,label:n});const u=(0,c.F)(t[0]);(0,s.CM)(u).then((e=>{location.href=e.redirect_url})).catch((e=>{if(e instanceof a.Z&&"duplicate_jobagent"===e.error)location.href=e.extraData.redirect_url;else{if(!(e instanceof i.Z))throw e;{const r=t.find("[name=email]");r.addClass("is-invalid");for(const t of e.errors)r.parent().append(o()('<div class="invalid-feedback">').text(t.error_message))}}}))}))}))},2784:(e,t,r)=>{r.d(t,{Z:()=>ApiConflictError});var n=r(12369);class ApiConflictError extends n.Z{constructor(e,t,r,n=`API conflict error: ${e} ${t} [${r.status}]`){super(e,t,r,n),this.error=r.responseJSON.errors[0].error_message,this.extraData=r.responseJSON.extra_data}}},2871:(e,t,r)=>{r.d(t,{Z:()=>ApiValidationError});var n=r(12369);class ApiValidationError extends n.Z{constructor(e,t,r,n=`API request failed validation: ${e} ${t} [${r.status}]`){super(e,t,r,n),this.errors=r.responseJSON.errors,this.warnings=r.responseJSON.warnings}}},12369:(e,t,r)=>{r.d(t,{Z:()=>RequestError});class RequestError extends Error{constructor(e,t,r,n=`Request failed: ${e} ${t} [${r.status}]`){super(n),this.method=e,this.url=t,this.status=r.status,this.readyState=r.readyState,this.text=r.responseText,this.json=r.responseJSON}}},88992:(e,t,r)=>{r.d(t,{CM:()=>createJobagent,jO:()=>deleteJobagent,kK:()=>setJobagentState,xK:()=>updateJobagent});var n=r(922);function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){_defineProperty(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function api(e,t,r={}){const o="/api/user/jobagent/v1/"+(Array.isArray(t)?t.join("/"):t);return(0,n.hi)(e,o,JSON.stringify(r),{headers:{"Content-Type":"application/json"}})}function updateJobagent(e){return api("PATCH",[e.id],{jobagent:e})}function setJobagentState(e,t){return updateJobagent(_objectSpread(_objectSpread({},e),{},{enabled:t}))}function deleteJobagent(e){return api("DELETE",[e.id])}function createJobagent(e){return api("POST",[],{jobagent:e})}},79e3:(e,t,r)=>{r.d(t,{F:()=>constructFromForm});var n=r(65311),o=r.n(n);const a=["name","frequency","enabled","source","email","libraryid"];function constructFromForm(e){const t=o()(e).serializeArray(),r={search_params:{}};for(const n of t)-1!==a.indexOf(n.name)?r[n.name]=n.value:void 0!==r.search_params[n.name]?(Array.isArray(r.search_params[n.name])||(r.search_params[n.name]=[r.search_params[n.name]]),r.search_params[n.name].push(n.value)):r.search_params[n.name]=n.value;return r.search_params.radius||(delete r.search_params.address,delete r.search_params.latitude,delete r.search_params.longitude),"string"==typeof r.enabled&&(r.enabled=parseInt(r.enabled,10)),"number"==typeof r.enabled&&(r.enabled=!!r.enabled),r.libraryid&&(r.id=r.libraryid,delete r.libraryid),r}},922:(e,t,r)=>{r.d(t,{Bk:()=>concatName,Dk:()=>setDocumentTitle,HT:()=>compareResponsiveBreakpoint,JB:()=>getNumberFormatter,Kd:()=>getLocale,LQ:()=>u,Nb:()=>uniqueArray,QM:()=>formatByteSize,Sy:()=>shuffleArray,Vt:()=>stripHtml,WU:()=>format,ZO:()=>getResponsiveBreakpoint,aS:()=>truncateString,hi:()=>api,ks:()=>getCurrencyFormatter});var n=r(65311),o=r.n(n),a=r(53495),i=r(12369),s=r(2871),c=r(2784),l=r(60611);function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function shuffleArray(e){for(let t=e.length-1;t>0;t--){const r=Math.floor(Math.random()*(t+1)),n=e[t];e[t]=e[r],e[r]=n}return e}function uniqueArray(e){return e.filter(((e,t,r)=>r.indexOf(e)===t))}function concatName({firstname:e,middlename:t,lastname:r}){return[e,t,r].join(" ").trim()}function format(e,t){return Object.keys(t).reduce(((e,r)=>e.replace(new RegExp("{"+r+"}","g"),t[r])),e)}function getCurrencyFormatter(e,t=getLocale()){return new Intl.NumberFormat(t,{style:"currency",currency:e,minimumFractionDigits:0})}function getNumberFormatter(e=getLocale()){return new Intl.NumberFormat(e)}function formatByteSize(e,t="MB",r="B"){let n={B:0,KB:1,MB:2,GB:3,TB:4},o=n[r]-n[t];return(e*Math.pow(1024,o)).toFixed(2)}function api(e,t,r={},n={}){const l=function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){_defineProperty(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({method:e,url:t,data:r,traditional:!0,headers:{}},n);return window.Stash&&window.Stash.common&&window.Stash.common.csrf_token&&(l.headers["X-CSRF-Token"]=window.Stash.common.csrf_token),(0,a.Z)(o().ajax(l)).catch((r=>{throw 422===r.status?new s.Z(e,t,r):409===r.status?new c.Z(e,t,r):new i.Z(e,t,r)}))}const u=["xs","sm","md","lg","xl"];function getResponsiveBreakpoint(){const e=window.innerWidth;return e>=1200?"xl":e>=992?"lg":e>=768?"md":e>=576?"sm":"xs"}function compareResponsiveBreakpoint(e){const t=u.indexOf(e);if(t<0)throw Error("Invalid breakpoint");const r=getResponsiveBreakpoint(),n=u.indexOf(r);return Math.sign(n-t)}function getLocale(e="en-GB"){return document.querySelector("html").getAttribute("lang")||e}function stripHtml(e){const t=document.createElement("div");return t.innerHTML=e,t.textContent}function truncateString(e,t,r="…"){if(e.length<=t)return e;const n=t-r.length;return[...e].slice(0,n).join("")+r}function setDocumentTitle(e){if(e){let t=(0,l.unref)(e);t=Array.isArray(t)?t:[t],document.title=[...t,window.Stash.common.sitename].join(" | ")}else document.title=window.Stash.common.sitename}},53495:(e,t,r)=>{function toNativePromise(e){return new Promise(((t,r)=>{e.then(t,r)}))}r.d(t,{Z:()=>toNativePromise})},60611:(e,t,r)=>{r.r(t),r.d(t,{BaseTransition:()=>n.P$,BaseTransitionPropsValidators:()=>n.nJ,Comment:()=>n.sv,EffectScope:()=>n.Bj,Fragment:()=>n.HY,KeepAlive:()=>n.Ob,ReactiveEffect:()=>n.qq,Static:()=>n.qG,Suspense:()=>n.n4,Teleport:()=>n.lR,Text:()=>n.xv,Transition:()=>n.uT,TransitionGroup:()=>n.W3,VueElement:()=>n.a2,VueSentry:()=>i,assertNumber:()=>n.Wu,callWithAsyncErrorHandling:()=>n.$d,callWithErrorHandling:()=>n.KU,camelize:()=>n._A,capitalize:()=>n.kC,cloneVNode:()=>n.Ho,compatUtils:()=>n.ry,compile:()=>n.MY,computed:()=>n.Fl,createApp:()=>createApp,createBlock:()=>n.j4,createCommentVNode:()=>n.kq,createElementBlock:()=>n.iD,createElementVNode:()=>n._,createHydrationRenderer:()=>n.Eo,createPropsRestProxy:()=>n.p1,createRenderer:()=>n.Us,createSSRApp:()=>n.vr,createSlots:()=>n.Nv,createStaticVNode:()=>n.uE,createTextVNode:()=>n.Uk,createVNode:()=>n.Wm,customRef:()=>n.ZM,defineAsyncComponent:()=>n.RC,defineComponent:()=>n.aZ,defineCustomElement:()=>n.MW,defineEmits:()=>n.Bz,defineExpose:()=>n.WY,defineModel:()=>n.Gn,defineOptions:()=>n.Yu,defineProps:()=>n.yb,defineSSRCustomElement:()=>n.Ah,defineSlots:()=>n.Wl,devtools:()=>n.mW,effect:()=>n.cE,effectScope:()=>n.B,getCurrentInstance:()=>n.FN,getCurrentScope:()=>n.nZ,getTransitionRawChildren:()=>n.Q6,guardReactiveProps:()=>n.F4,h:()=>n.h,handleError:()=>n.S3,hasInjectionContext:()=>n.EM,hydrate:()=>n.ZB,initCustomFormatter:()=>n.Mr,initDirectivesForSSR:()=>n.Nd,inject:()=>n.f3,isMemoSame:()=>n.nQ,isProxy:()=>n.X3,isReactive:()=>n.PG,isReadonly:()=>n.$y,isRef:()=>n.dq,isRuntimeOnly:()=>n.of,isShallow:()=>n.yT,isVNode:()=>n.lA,markRaw:()=>n.Xl,mergeDefaults:()=>n.u_,mergeModels:()=>n.Vf,mergeProps:()=>n.dG,nextTick:()=>n.Y3,normalizeClass:()=>n.C_,normalizeProps:()=>n.vs,normalizeStyle:()=>n.j5,onActivated:()=>n.dl,onBeforeMount:()=>n.wF,onBeforeUnmount:()=>n.Jd,onBeforeUpdate:()=>n.Xn,onDeactivated:()=>n.se,onErrorCaptured:()=>n.d1,onMounted:()=>n.bv,onRenderTracked:()=>n.bT,onRenderTriggered:()=>n.Yq,onScopeDispose:()=>n.EB,onServerPrefetch:()=>n.vl,onUnmounted:()=>n.SK,onUpdated:()=>n.ic,openBlock:()=>n.wg,popScopeId:()=>n.Cn,provide:()=>n.JJ,proxyRefs:()=>n.WL,pushScopeId:()=>n.dD,queuePostFlushCb:()=>n.qb,reactive:()=>n.qj,readonly:()=>n.OT,ref:()=>n.iH,registerRuntimeCompiler:()=>n.Y1,render:()=>n.sY,renderList:()=>n.Ko,renderSlot:()=>n.WI,resolveComponent:()=>n.up,resolveDirective:()=>n.Q2,resolveDynamicComponent:()=>n.LL,resolveFilter:()=>n.eq,resolveTransitionHooks:()=>n.U2,setBlockTracking:()=>n.qZ,setDevtoolsHook:()=>n.ec,setTransitionHooks:()=>n.nK,shallowReactive:()=>n.Um,shallowReadonly:()=>n.YS,shallowRef:()=>n.XI,ssrContextKey:()=>n.Uc,ssrUtils:()=>n.G,stop:()=>n.sT,toDisplayString:()=>n.zw,toHandlerKey:()=>n.hR,toHandlers:()=>n.mx,toRaw:()=>n.IU,toRef:()=>n.Vh,toRefs:()=>n.BK,toValue:()=>n.Tn,transformVNodeArgs:()=>n.C3,triggerRef:()=>n.oR,unref:()=>n.SU,useAttrs:()=>n.l1,useCssModule:()=>n.fb,useCssVars:()=>n.sj,useModel:()=>n.tT,useSSRContext:()=>n.Zq,useSlots:()=>n.Rr,useTransitionState:()=>n.Y8,vModelCheckbox:()=>n.e8,vModelDynamic:()=>n.YZ,vModelRadio:()=>n.G2,vModelSelect:()=>n.bM,vModelText:()=>n.nr,vShow:()=>n.F8,version:()=>n.i8,warn:()=>n.ZK,watch:()=>n.YP,watchEffect:()=>n.m0,watchPostEffect:()=>n.Rh,watchSyncEffect:()=>n.yX,withAsyncContext:()=>n.mv,withCtx:()=>n.w5,withDefaults:()=>n.b9,withDirectives:()=>n.wy,withKeys:()=>n.D2,withMemo:()=>n.MX,withModifiers:()=>n.iM,withScopeId:()=>n.HX});var n=r(29812),o=r(77594),a=r(77444);const i={install(e){(0,a.W)(e,{logErrors:!0})}};function createApp(...e){return(0,o.ri)(...e).use(i)}},65311:e=>{e.exports=jQuery}},e=>{e.O(0,[7444,9812],(()=>{return t=6831,e(e.s=t);var t}));e.O()}]);
//# sourceMappingURL=popup.45f426d3bda21426bdd3.bundle.js.map