(self.webpackChunkjix=self.webpackChunkjix||[]).push([[5264],{50813:(e,t,o)=>{"use strict";var r=o(65311),a=o.n(r),i=o(6082),n=o(62639);const s=window.Stash["widgets/map"];a()((()=>{s.forEach((({id:e,stash:t})=>{const o={container:e,style:t.style};let r;void 0!==t.zoom&&(o.zoom=t.zoom),void 0!==t.center&&(o.center=t.center);try{r=new i.ZP(o)}catch(s){return void(0,i.B8)(s,e)}const a=!t.center;new n.Z({}).addTo(r).setData(t.map_data,a)}))}))},62639:(e,t,o)=>{"use strict";o.d(t,{Z:()=>ClusteredJobs});var r=o(65311),a=o.n(r),i=o(922);var n=o(5939),s=o(34821);function ownKeys(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(o),!0).forEach((function(t){_defineProperty(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function _defineProperty(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}const c={type:"geojson",cluster:!0,clusterMaxZoom:15,clusterRadius:40,generateId:!0};function loadImage(e,t,o,{width:r,height:a}){return new Promise(((i,n)=>{const s=Math.ceil(window.devicePixelRatio||1),c=new Image(r*s,a*s);c.onload=()=>{e.addImage(t,c),i()},c.onerror=()=>n(),c.src=o}))}class ClusteredJobs{constructor(e){this._source_name="jobsearch",this._selected_feature_id=null}addTo(e){return this.map=e,this.map.on("load",(()=>this._init())),this}setData(e,t=!0){this.map.loaded()?this.map.getSource(this._source_name).setData(e):this._initialData=e,t&&this._fitToFeatures(e.features,{animate:!1})}selectFeature(e){this._selected_feature_id&&this._selected_feature_id!==e.id&&this.deselectFeature(),this.map.setFeatureState({source:this._source_name,id:e.id},{selected:!0}),this._selected_feature_id=e.id}deselectFeature(){this._selected_feature_id&&this.map.setFeatureState({source:this._source_name,id:this._selected_feature_id},{selected:!1}),this._selected_feature_id=null}showInfoWindow(e,t){const{type:o,objectId:r,tid:i}=e.properties;i?(this.selectFeature(e),t&&this.map.easeTo({center:t,offset:[0,-100]}),this._$container&&this._$container.data("object-id")===r||(this.hideInfoWindow(),this._$container=a()("<div>").addClass("jix-mapboxgl-bottomsheet mod-hidden").data("object-id",r).on("click",".close",(()=>{this.deselectFeature(),this.hideInfoWindow()})).appendTo(this.map.getContainer()),this._getInfoContent(o,r,i).then((e=>{this._$container&&this._$container.html(e).removeClass("mod-hidden")})).catch((e=>window.Sentry.captureException(e))))):this.hideInfoWindow()}hideInfoWindow(){if(!this._$container)return;const e=this._$container;this._$container=null,e.addClass("mod-hidden"),setTimeout((()=>e.remove()),1e3)}_init(){const e=this._initialData||null;this._initialData=null,this.map.addSource(this._source_name,_objectSpread(_objectSpread({},c),{},{data:e})),this._loadImages().then((()=>this._setupLayers())).catch((e=>window.Sentry.captureException(e)))}_fitToFeatures(e,t={}){if(1===e.length)this.map.easeTo(_objectSpread({zoom:14,center:e[0].geometry.coordinates},t));else if(e.length>1){const o=(0,n.t)(e),r=this._calculateFitPadding(e.length);this.map.fitBounds(o,_objectSpread({padding:r},t))}}_calculateFitPadding(e){const{width:t,height:o}=this.map.getCanvas().getBoundingClientRect(),r=t>o,a=Math.max(.2,.8-.05*e),i=Math.min(t,o)/2*a,n=Math.abs(t-o)/2,s=Math.round(r?i+n:i),c=Math.round(r?i:i+n);return{left:s,right:s,top:c,bottom:c}}_loadImages(){const e=window.Stash.common.site,t=[];return t.push(loadImage(this.map,"address",`/img/jobindex20/icons/map/map-address-marker-${e}.svg`,{width:35,height:35})),t.push(loadImage(this.map,"address-selected",`/img/jobindex20/icons/map/map-address-marker-selected-${e}.svg`,{width:35,height:35})),Promise.all(t)}_setupLayers(){const e=function getLayers(e){const t=1/Math.ceil(window.devicePixelRatio||1),o=["Noto Sans Regular"],r=["Noto Sans Bold"],a=["has","point_count"],isOfType=e=>["==",["get","type"],e],i={id:"job_address_title",type:"symbol",source:"jobsearch",filter:["all",["!",a],isOfType("address")],layout:{"text-field":"{title}","text-font":o,"text-size":10,"text-anchor":"top","text-offset":[0,.5]},paint:{"text-opacity":["step",["zoom"],0,14,.8],"text-color":"#000","text-halo-color":"#fff","text-halo-width":1}},n={id:"job_area_title",type:"symbol",source:"jobsearch",filter:["all",["!",a],isOfType("area")],layout:{"text-field":"{title}","text-font":o,"text-size":10,"text-anchor":"top","text-offset":[0,1.5]},paint:{"text-color":"#000","text-halo-color":"#fff","text-halo-width":2}},s={id:"job_area_circle",type:"circle",source:"jobsearch",filter:["all",["!",a],isOfType("area")],paint:{"circle-radius":15,"circle-color":["case",["boolean",["feature-state","selected"],!1],e.selected,["step",["get","typeid"],e.fallback,10,e.country,20,e.region,30,e.municipality,40,e.fallback,50,e.zipcode]]}},c={id:"job_area_count",type:"symbol",source:"jobsearch",filter:["all",["!",a],isOfType("area")],layout:{"text-allow-overlap":!0,"text-field":"{job_count}","text-font":r,"text-size":12},paint:{"text-color":"#fff"}},l={id:"job_address",type:"symbol",source:"jobsearch",filter:["all",["!",a],isOfType("address")],layout:{"text-field":["step",["get","job_count"],"",2,["get","job_count"],10,"+9"],"text-allow-overlap":!0,"text-font":r,"text-size":10,"text-offset":[0,-2.1],"icon-image":"address","icon-size":t,"icon-anchor":"bottom","icon-allow-overlap":!0},paint:{"icon-opacity":["case",["boolean",["feature-state","selected"],!1],0,1],"text-color":e.address_count}};return[i,n,s,c,{id:"job_address_selected",type:"symbol",source:"jobsearch",filter:["all",["!",a],isOfType("address")],layout:{"icon-image":"address-selected","icon-size":t,"icon-anchor":"bottom","icon-allow-overlap":!0},paint:{"icon-opacity":["case",["boolean",["feature-state","selected"],!1],1,0]}},l,{id:"clusters_circle",type:"circle",source:"jobsearch",filter:a,paint:{"circle-color":e.cluster,"circle-radius":["step",["get","point_count"],15,100,25]}},{id:"clusters_count",type:"symbol",source:"jobsearch",filter:a,layout:{"text-field":"{point_count_abbreviated}","text-font":r,"text-size":12,"text-allow-overlap":!1},paint:{"text-color":"#fff"}}]}((0,n.k)(this.map));for(let t of e)this.map.addLayer(t);this.map.on("click",(e=>{const t=this.map.queryRenderedFeatures(e.point);t.length&&t[0].properties.job_count||(this.deselectFeature(),this.hideInfoWindow())})),this.map.on("click","clusters_circle",(e=>{const t=e.features[0].properties.cluster_id;this.map.getSource(this._source_name).getClusterLeaves(t,Number.MAX_VALUE,0,((e,t)=>{e||this._fitToFeatures(t)}))}));for(let t of["job_address","job_area_circle"])this.map.on("click",t,(e=>this._handleFeatureClick(e)));for(let t of["clusters_circle","job_address","job_area_circle"])this.map.on("mouseenter",t,(e=>{const t=e.features[0].properties;(t.job_count||t.point_count)&&(this.map.getCanvas().style.cursor="pointer")})),this.map.on("mouseleave",t,(()=>{this.map.getCanvas().style.cursor=""}))}_handleFeatureClick(e){const t=e.features[0],o=t.geometry.coordinates.slice();for(;Math.abs(e.lngLat.lng-o[0])>180;)o[0]+=e.lngLat.lng>o[0]?360:-360;this.showInfoWindow(t,o),this.elementsManager=new s.Z,this.elementsManager.handleReload()}_getInfoContent(e,t,o){const r=(0,i.WU)("/jobsearch/map/info-window/{type}-{objectId}/{tid}",{type:e,objectId:t,tid:o});return a().ajax({url:r})}}},6082:(e,t,o)=>{"use strict";o.d(t,{ZP:()=>DefaultMap,B8:()=>handleWebGlError,T:()=>isWebGlError});var r=o(17082),a=o.n(r);const i=["airport-label","country_label","country_label-other","place-islands","place_label_city_big","place_label_city_town_medium","place_label_other","place_village_suburb","poi_major","poi_minor","poi_railway","road_major_label","water_label","waterway-label"];class DetectLanguage{constructor(){this._onStyleData=this._onStyleData.bind(this)}onAdd(e){return this.map=e,this.map.on("styledata",this._onStyleData),this._container=document.createElement("div"),this._container}onRemove(){this.map.off("styledata",this._onStyleData)}_onStyleData(){this.map.off("styledata",this._onStyleData);const e=document.documentElement.lang.substr(0,2);if(e){const t=["coalesce",["get","name:"+e],["get","name"]];for(let e of i)this.map.setLayoutProperty(e,"text-field",t)}}}function ownKeys(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function _defineProperty(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}class DefaultMap extends a().Map{constructor(e){const t={};for(let o of Object.keys(t))void 0!==e[o]&&(t[o]=e[o],delete e[o]);super(function _objectSpread(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(o),!0).forEach((function(t){_defineProperty(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({style:"/api/map/style/standard",dragRotate:!1},e)),this.touchZoomRotate.disableRotation(),this.addControl(new(a().NavigationControl)({showCompass:!1})),this.addControl(new(a().FullscreenControl)),this.addControl(new DetectLanguage),setTimeout((()=>{const e=this.getContainer().querySelector(".maplibregl-ctrl-attrib");e&&e.classList.contains("maplibregl-compact-show")&&(e.classList.remove("maplibregl-compact-show","mapboxgl-compact-show"),e.removeAttribute("open"))}),5e3)}}function isWebGlError(e){return/Failed to initialize WebGL/.test(e.message)}function handleWebGlError(e,t){if(!isWebGlError(e))throw e;{const e=document.createElement("div");e.textContent="WebGL not supported",e.style.textAlign="center",e.style.background="#ccc",document.getElementById(t).appendChild(e)}}},5939:(e,t,o)=>{"use strict";o.d(t,{k:()=>getMapColors,t:()=>featureBounds});var r=o(17082),a=o(39034),i=o(1449);function featureBounds(e){Array.isArray(e)&&(e=(0,i.uf)(e));const t=new r.LngLatBounds;return(0,a.pZ)(e,(e=>t.extend(e))),t}function getMapColors(e){const t=getComputedStyle(e.getContainer()),getCssColor=e=>t.getPropertyValue(`--${e}`);return{country:getCssColor("map-marker-country-color"),region:getCssColor("map-marker-region-color"),municipality:getCssColor("map-marker-municipality-color"),zipcode:getCssColor("map-marker-zipcode-color"),fallback:getCssColor("map-marker-fallback-color"),cluster:getCssColor("map-marker-cluster-color"),selected:getCssColor("map-marker-selected-color"),address_count:getCssColor("map-marker-address-count-color"),radius_circle:getCssColor("map-marker-radius-circle-color")}}},62705:(e,t,o)=>{var r=o(55639).Symbol;e.exports=r},44239:(e,t,o)=>{var r=o(62705),a=o(89607),i=o(2333),n=r?r.toStringTag:void 0;e.exports=function baseGetTag(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":n&&n in Object(e)?a(e):i(e)}},27561:(e,t,o)=>{var r=o(67990),a=/^\s+/;e.exports=function baseTrim(e){return e?e.slice(0,r(e)+1).replace(a,""):e}},31957:(e,t,o)=>{var r="object"==typeof o.g&&o.g&&o.g.Object===Object&&o.g;e.exports=r},89607:(e,t,o)=>{var r=o(62705),a=Object.prototype,i=a.hasOwnProperty,n=a.toString,s=r?r.toStringTag:void 0;e.exports=function getRawTag(e){var t=i.call(e,s),o=e[s];try{e[s]=void 0;var r=!0}catch(c){}var a=n.call(e);return r&&(t?e[s]=o:delete e[s]),a}},2333:e=>{var t=Object.prototype.toString;e.exports=function objectToString(e){return t.call(e)}},55639:(e,t,o)=>{var r=o(31957),a="object"==typeof self&&self&&self.Object===Object&&self,i=r||a||Function("return this")();e.exports=i},67990:e=>{var t=/\s/;e.exports=function trimmedEndIndex(e){for(var o=e.length;o--&&t.test(e.charAt(o)););return o}},23279:(e,t,o)=>{var r=o(13218),a=o(7771),i=o(14841),n=Math.max,s=Math.min;e.exports=function debounce(e,t,o){var c,l,d,u,p,h,f=0,m=!1,b=!1,_=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function invokeFunc(t){var o=c,r=l;return c=l=void 0,f=t,u=e.apply(r,o)}function leadingEdge(e){return f=e,p=setTimeout(timerExpired,t),m?invokeFunc(e):u}function shouldInvoke(e){var o=e-h;return void 0===h||o>=t||o<0||b&&e-f>=d}function timerExpired(){var e=a();if(shouldInvoke(e))return trailingEdge(e);p=setTimeout(timerExpired,function remainingWait(e){var o=t-(e-h);return b?s(o,d-(e-f)):o}(e))}function trailingEdge(e){return p=void 0,_&&c?invokeFunc(e):(c=l=void 0,u)}function debounced(){var e=a(),o=shouldInvoke(e);if(c=arguments,l=this,h=e,o){if(void 0===p)return leadingEdge(h);if(b)return clearTimeout(p),p=setTimeout(timerExpired,t),invokeFunc(h)}return void 0===p&&(p=setTimeout(timerExpired,t)),u}return t=i(t)||0,r(o)&&(m=!!o.leading,d=(b="maxWait"in o)?n(i(o.maxWait)||0,t):d,_="trailing"in o?!!o.trailing:_),debounced.cancel=function cancel(){void 0!==p&&clearTimeout(p),f=0,c=h=l=p=void 0},debounced.flush=function flush(){return void 0===p?u:trailingEdge(a())},debounced}},13218:e=>{e.exports=function isObject(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},37005:e=>{e.exports=function isObjectLike(e){return null!=e&&"object"==typeof e}},33448:(e,t,o)=>{var r=o(44239),a=o(37005);e.exports=function isSymbol(e){return"symbol"==typeof e||a(e)&&"[object Symbol]"==r(e)}},7771:(e,t,o)=>{var r=o(55639);e.exports=function(){return r.Date.now()}},14841:(e,t,o)=>{var r=o(27561),a=o(13218),i=o(33448),n=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,c=/^0o[0-7]+$/i,l=parseInt;e.exports=function toNumber(e){if("number"==typeof e)return e;if(i(e))return NaN;if(a(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=a(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=r(e);var o=s.test(e);return o||c.test(e)?l(e.slice(2),o?2:8):n.test(e)?NaN:+e}},20779:e=>{"use strict";e.exports=bootbox},65311:e=>{"use strict";e.exports=jQuery},17082:e=>{"use strict";e.exports=maplibregl}},e=>{e.O(0,[7444,9812,5032,4821],(()=>{return t=50813,e(e.s=t);var t}));e.O()}]);
//# sourceMappingURL=map.0905efa988c2900d90dd.bundle.js.map