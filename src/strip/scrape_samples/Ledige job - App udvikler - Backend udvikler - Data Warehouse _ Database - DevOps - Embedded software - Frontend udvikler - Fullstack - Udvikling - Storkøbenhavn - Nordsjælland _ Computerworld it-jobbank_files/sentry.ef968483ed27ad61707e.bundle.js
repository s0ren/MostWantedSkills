"use strict";(self.webpackChunkjix=self.webpackChunkjix||[]).push([[2897],{65191:(e,r,t)=>{var o=t(74758),n=t(64487),a=t(8172),i=t(12699),c=t(69153);function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}const l=window.Stash.sentry,p=window.Stash.common,s=[window.location.pathname.replace(/\/$/,"/?")+"$","/js/","/res/","/api/"],d=window.location.protocol+"//"+window.location.host.replace(/\./g,"\\."),w=_objectSpread(_objectSpread({app:[]},l.config),{},{autoSessionTracking:!1,integrations:[new i.S,new c.gE({beforeNavigate:e=>{let r=e.name;return r=r.replace(/^(\/virksomhed\/).*/,"$1*"),r=r.replace(/^(\/jobsoegning)\/.*/,"$1"),r=r.replace(/^(\/tjek-din-loen)\/.*/,"$1"),r=r.replace(/^(\/jobannonce\/).*/,"$1*"),r=r.replace(/^(\/blogs\/job\/).*/,"$1*"),_objectSpread(_objectSpread({},e),{},{name:r})}})],allowUrls:[/^webpack-internal:\/\//,...s.map((e=>new RegExp(d+e)))],denyUrls:["/res/ckeditor",/\/content\/.*\/preview/,"/reportage/"],ignoreErrors:["Et JavaScript-object var ventet","Ett JavaScript-objekt förväntas","JavaScript object expected","Programkoden kan ikke køres fra et frigjort script","Can't execute code from a freed script","Illegal invocation","Blocked a frame with origin","NetworkError when attempting to fetch resource","Failed to initialize WebGL"],beforeSend(e){if("file:"===window.location.protocol)return console.warn("Local file - event ignored"),null;return l.page_load_time&&new Date-l.page_load_time>2592e5?(console.warn("Event ignored on out-of-date page"),null):window.jix_script_errors&&window.jix_script_errors.length>0?(console.warn("Event ignored because of JavaScript load errors"),null):e}});o.S(w),n.rJ(l.extra),n.mG(l.tags),n.YA("lang",p.lang),p.companyuserid?n.av({id:`CU#${p.companyuserid}`}):p.userid&&n.av({id:`U#${p.userid}`}),window.Sentry=a}},e=>{e.O(0,[7444,6742],(()=>{return r=65191,e(e.s=r);var r}));e.O()}]);
//# sourceMappingURL=sentry.ef968483ed27ad61707e.bundle.js.map