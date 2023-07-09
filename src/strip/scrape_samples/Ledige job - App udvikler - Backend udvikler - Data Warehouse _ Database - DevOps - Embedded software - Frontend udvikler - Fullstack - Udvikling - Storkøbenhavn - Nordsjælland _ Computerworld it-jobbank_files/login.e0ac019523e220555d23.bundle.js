"use strict";(self.webpackChunkjix=self.webpackChunkjix||[]).push([[4535],{70560:(e,o,t)=>{var i=t(65311),n=t.n(i),a=t(20779),r=t.n(a),l=t(58156);const c=window.JIX=window.JIX||{},s=window.Stash.login;let d;function update_errors(e,o){n()(".form-group",e).removeClass("has-error");for(let t of o.invalid_fields)n()(`input[name=${t}]`,e).closest(".form-group").addClass("has-error");n()(".alert",e).remove(),o.error_message&&n()('<div class="alert alert-danger" role="alert"></div>').text(o.error_message).prependTo(e)}function do_submit(e,o,t){const i=s.api_urls[o],a=t.redirect||s.redirect[o],r=t.callback_name,l=t.caller_obj;let c;r&&(c=s.callbacks[r],void 0===c&&console.error('Could not find callback "'+r+'"')),n().ajax({method:"post",url:i,data:e.serialize(),error:()=>{update_errors(e,{error_message:"Unknown error",invalid_fields:[]})},success:o=>{o&&o.success?c?(d.off("hide.bs.modal"),d.modal("hide"),c(o,l)):location.href=o.redirect_url||a:update_errors(e,o)}})}function click_handler(e){e.preventDefault();const o=n()(this),t=o.data("jix-login"),i={callback_name:o.data("jix-login-callback"),redirect:o.data("jix-login-redirect"),caller_obj:o};if(void 0===s.api_urls[t])throw Error("Unknown login type '"+t+"'");c.Login.show_modal(t,do_submit,i)}function hover_handler(){const e=n()(this),o=e.data("jix-login");c.Login.load_form(o,function get_redirect_url(e){return e.data("jix-login-redirect")||s.redirect[e.data("jix-login")]}(e))}function check_login_status(e){return new Promise((function(o,t){n().ajax({url:e,method:"get",fail:()=>{t(!1)},success:e=>{o(e.isLoggedIn)}})}))}c.Login=class{static show_modal(e,o,t){const i=t.callback_name,a=t.caller_obj;let c=this.load_form(e,t.redirect||s.redirect[e]);d=r().dialog({message:'<div id="_jix_login_contents"></div>',onEscape:!0,backdrop:!0,size:"lg"}),d.on("hide.bs.modal",(()=>{if(jixAnalytics("event",{category:"log-ind",action:"click",label:"luk-boks"}),i){const e=s.callbacks[i];void 0===e?console.error('Could not find callback "'+i+'"'):e({success:!1,cancelled:!0},a)}})),n().when(c).done((o=>{const i=n()("#_jix_login_contents");i.empty().append(n()(o.form));const a=n()("input[name=email]",i);(0,l.Z)(a[0]),d.off("shown.bs.modal"),d.on("shown.bs.modal",(()=>a.trigger("focus")));const r=n()("form",i);r.on("submit",(o=>{o.preventDefault(),do_submit(r,e,t)}))}))}static load_form(e,o){let t=s.forms[e];if(void 0===t)throw Error("Unknown login type '"+e+'"');if(!t){const i=s.api_urls.forms[e]+"?request="+encodeURIComponent(o);t=n().ajax({url:i,method:"get",fail:()=>{console.error('Failed loading form "'+e+'" from backend'),s.forms[e]=null}}),s.forms[e]=t}return t}static register_handlers(e){const o=n()(document.body);o.on("click",e,click_handler),o.on("mouseover focus",e,hover_handler)}static register_callback(e,o){s.callbacks[e]=o}static verify_login(e,o,t){const i=s.api_urls.check[e];if(!i)return console.error("User type "+e+" is not available"),!1;check_login_status(i).then((function(i){if(!i)return window.JIX.Login.register_callback(o.name,o),window.JIX.Login.show_modal(e,o.name,{callback_name:o.name,caller_obj:t});o({success:!1},t)})).catch((function(e){console.error("Failurestate: "+e)}))}static requires_login(e){const o=s.api_urls.check[e];if(!o)return console.error("User type "+e+" is not available"),!1;check_login_status(o).then((function(e){return!e})).catch((function(e){console.error("Failurestate: "+e)}))}},n()((()=>{c.Login.register_handlers("[data-jix-login]")}))},58156:(e,o,t)=>{t.d(o,{Z:()=>setupEmailField});const i=Mailcheck;var n=t.n(i),a=t(65311),r=t.n(a);function ownKeys(e,o){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);o&&(i=i.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),t.push.apply(t,i)}return t}function _defineProperty(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}const l={cwddk:[],itjdk:["gmail.com","hotmail.com","yahoo.com","yahoo.dk","live.dk","mail.dk","msn.com","ofir.dk","privat.dk","sol.dk","itu.dk","tdcadsl.dk","mail.tele.dk","stofanet.dk","outlook.com","hotmail.dk","webspeed.dk","email.dk","me.com","outlook.dk","pc.dk","vip.cybercity.dk","post.tele.dk","get2net.dk","live.com","c.dk","mail1.stofanet.dk","it.dk","jubii.dk","adslhome.dk"],jobdk:["gmail.com","hotmail.com","live.dk","yahoo.dk","yahoo.com","mail.dk","hotmail.dk","outlook.dk","msn.com","stofanet.dk","ofir.dk","sol.dk","privat.dk","webspeed.dk","me.com","jubii.dk","icloud.com","outlook.com","youmail.dk","mail.tele.dk","email.dk","live.com","forum.dk","godmail.dk","pc.dk","os.dk","c.dk","bbsyd.dk","mail.com","post.tele.dk","vip.cybercity.dk","wp.pl","ymail.com","get2net.dk","tdcadsl.dk","yahoo.co.uk","dbmail.dk","mail.ru","mail-online.dk","profibermail.dk","mac.com","city.dk","comxnet.dk","fibermail.dk","inbox.lv","tiscali.dk","oncable.dk","esenet.dk","ruc.dk"],jobno:["gmail.com","hotmail.com","yahoo.com","online.no","live.no","hotmail.no","yahoo.no","outlook.com","wp.pl","msn.com","live.com","icloud.com","me.com","broadpark.no","inbox.lv","mail.ru","live.dk","yahoo.fr","ymail.com","live.se","o2.pl","interia.pl","getmail.no","yahoo.co.uk","yahoo.dk","abv.bg","mail.com","lyse.net","frisurf.no","op.pl"],stedk:["gmail.com","hotmail.com","live.dk","yahoo.dk","mail.dk","yahoo.com","ofir.dk","stofanet.dk","hotmail.dk","privat.dk","msn.com","sol.dk","webspeed.dk","mail.tele.dk","jubii.dk","email.dk","forum.dk","youmail.dk","outlook.dk","get2net.dk","me.com","vip.cybercity.dk","tdcadsl.dk","pc.dk","post.tele.dk","os.dk","c.dk","outlook.com","icloud.com","live.com"]},c={suggClass:"jix-email-completion",domains:l[window.Stash.common.site]};function setupEmailField(e){r()(e).emailautocomplete(c),e.autofocus&&e.focus();const o=document.createElement("div"),t=document.createElement("div");o.className="jix-email-suggestion",o.appendChild(t);const i=e.closest(".input-group");i?i.parentNode.insertBefore(o,i.nextElementSibling):(e.closest(".form-inline")&&o.classList.add("jix-email-suggestion-inline"),e.parentNode.appendChild(o));const a={domains:l[window.Stash.common.site],suggested:function showSuggestion(i,n){if(!/\./.test(n.domain))return void hideSuggestion();const a=document.createElement("a"),l=n.address.replace(/^(.{15}).+$/,"$1…"),c="<strong>"+n.domain+"</strong>";a.innerHTML=l+"@"+c,a.addEventListener("click",(()=>{e.value=n.full,r()(e).data("yz_emailautocomplete").displaySuggestion(),hideSuggestion()}));for(;t.hasChildNodes();)t.removeChild(t.lastChild);t.innerHTML=JIX.Gettext.__x("Mente du {email}?",{email:"<span></span>"}),t.querySelector("span").replaceWith(a),r()(o).slideDown(),o.parentNode.classList.add("has-warning")},empty:hideSuggestion,distanceFunction:(e,o)=>0===o.indexOf(e)||"gmail.com"===o&&/^gmail\./.test(e)?0:n().sift3Distance(e,o)};function checkForSuggestion(){const o=function _objectSpread(e){for(var o=1;o<arguments.length;o++){var t=null!=arguments[o]?arguments[o]:{};o%2?ownKeys(Object(t),!0).forEach((function(o){_defineProperty(e,o,t[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))}))}return e}({},a);r()(e).mailcheck(o)}function hideSuggestion(){r()(o).slideUp(),o.parentNode.classList.remove("has-warning")}let s=!1;e.addEventListener("input",(()=>{hideSuggestion(),s||(s=!0,document.querySelector("body").addEventListener("mousemove",(()=>{checkForSuggestion(),s=!1}),{once:!0}))})),e.addEventListener("blur",(()=>{(function visible(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)})(o)||checkForSuggestion()}))}},20779:e=>{e.exports=bootbox},65311:e=>{e.exports=jQuery}},e=>{var o;o=70560,e(e.s=o)}]);
//# sourceMappingURL=login.e0ac019523e220555d23.bundle.js.map