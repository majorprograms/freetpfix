window.rttr1011=window.rttr1011||{queue:[],rotators:{}},rttr1011.userAgent=navigator.userAgent,rttr1011.version="v16",rttr1011.domReady=function(t){var e=/^loaded|complete|^i|^c/.test(document.readyState);return e?t():setTimeout(function(){rttr1011.domReady(t)},10)},rttr1011.doAjax=function(t,e,r,n){var a=new window.XMLHttpRequest;a.open("GET",t,!0),a.timeout=5e3,a.onreadystatechange=function(){if(4===a.readyState)if(200===a.status&&a.responseText){var t=null;try{t=JSON.parse(a.responseText)}catch(r){t=null}t?e(null,t):e("broken response!")}else e(a.status)},r&&(a.ontimeout=r),n&&(a.onabort=n),a.send()},rttr1011.filter=function(t,e){for(var r=[],n=0;n<t.length;n++)e(t[n])&&r.push(t[n]);return r},rttr1011.ga={gaParams:{tid:"UA-110344692-1",v:1,ds:"web",z:parseInt((new Date).getTime()-100*Math.random()),cid:(new Date).getTime()+"-"+Math.random()}},rttr1011.ga.sendGA=function(t){rttr1011.ga.gaParams.z=parseInt((new Date).getTime()-100*Math.random());var e=[];e.push("tid="+rttr1011.ga.gaParams.tid),e.push("v="+rttr1011.ga.gaParams.v),e.push("ds="+rttr1011.ga.gaParams.ds),e.push("z="+rttr1011.ga.gaParams.z),e.push("cid="+rttr1011.ga.gaParams.cid),e=e.concat(t),rttr1011.doAjax("https://www.google-analytics.com/collect?"+e.join("&"),function(){})},rttr1011.ga.sendEvent=function(t,e,r){rttr1011.ga.sendGA(["t=event","ec="+t,"ea="+e,"el="+rttr1011.version+"_"+r])},rttr1011.ga.sendPageView=function(){rttr1011.ga.sendGA(["t=pageview"])},rttr1011.getWeightedItem=function(t,e){if(1===t.length)return t[0];for(var r=-1,n=-1,a=0;a<t.length;a++){var o=e?t[a].weight*Math.random():t[a].weight;o>r&&(r=o,n=a)}return t[n]},rttr1011.filterLowPriorityItems=function(t){for(var e=-1,r=0;r<t.length;r++){var n=t[r].priority;n>e&&(e=n)}return rttr1011.filter(t,function(t){return t.priority===e})},rttr1011.insert=function(t,e){rttr1011.domReady(function(){var r=document.createElement("div"),n=document.getElementById(t);r.innerHTML=e,n.parentNode.insertBefore(r,n.nextSibling)})},rttr1011.applyTargeting=function(t){var e;return e=rttr1011.filter(t,function(t){if(t.geo&&t.geo.include&&t.geo.include.length>0){if(t.geo.include.indexOf("CIS")!==-1)for(var e=["RU","UA","AZ","AM","BY","KZ","MD","TJ","TM","UZ","KG"],r=0;r<e.length;r++)t.geo.include.push(e[r]);return t.geo.include.indexOf(rttr1011.geo)!==-1}return!0}),e=rttr1011.filter(e,function(t){if(t.geo&&t.geo.exclude&&t.geo.exclude.length>0){if(t.geo.exclude.indexOf("CIS")!==-1)for(var e=["RU","UA","AZ","AM","BY","KZ","MD","TJ","TM","UZ","KG"],r=0;r<e.length;r++)t.geo.exclude.push(e[r]);return t.geo.exclude.indexOf(rttr1011.geo)===-1}return!0}),e=rttr1011.filter(e,function(t){if(t.userAgent&&t.userAgent.include&&t.userAgent.include.length>0){for(var e=0;e<t.userAgent.include.length;e++)if(new RegExp(t.userAgent.include[e],"i").test(rttr1011.userAgent))return!0;return!1}return!0}),e=rttr1011.filter(e,function(t){if(t.userAgent&&t.userAgent.exclude&&t.userAgent.exclude.length>0){for(var e=0;e<t.userAgent.exclude.length;e++)if(new RegExp(t.userAgent.exclude[e],"i").test(rttr1011.userAgent))return!1;return!0}return!0})},rttr1011.rotate=function(t,e){rttr1011.ga.sendEvent("rotator","start_rotate_offer",t.name);var r=rttr1011.applyTargeting(t.settings.offers);r=rttr1011.filterLowPriorityItems(r);var n=rttr1011.getWeightedItem(r,!0);if(n&&n.banners&&n.banners.length){rttr1011.ga.sendEvent("rotator","start_rotate_banner",t.name);var a=rttr1011.applyTargeting(n.banners),o=rttr1011.getWeightedItem(a,t.settings.blockBannerRotation);o?(rttr1011.ga.sendEvent("rotator","start_insert",t.name),rttr1011.insert(t.selector,t.template.replace(/\/?\{%imgLink%\}/,o.imgLink).replace(/\/?\{%link%\}/,o.link))):(rttr1011.ga.sendEvent("rotator","fallback",t.name),t.fallback())}else rttr1011.ga.sendEvent("rotator","fallback",t.name),t.fallback();e()},rttr1011.showRotator=function(t,e){if(rttr1011.ga.sendEvent("rotator","start_place",t.name),rttr1011.geo)rttr1011.rotate(t,e);else{rttr1011.ga.sendEvent("rotator","start_geo",t.name);var r="https:"===window.location.protocol?"https://":"http://";r+="jsengine.ru/geoproxy/ip",rttr1011.doAjax(r,function(r,n){!r&&n&&n.geo&&n.geo.country_code||(n={geo:{country_code:"RU"}}),rttr1011.ga.sendEvent("rotator","geo",t.name),rttr1011.geo=n.geo.country_code,rttr1011.rotate(t,e)},function(){rttr1011.ga.sendEvent("rotator","geo_timeout",t.name)},function(){rttr1011.ga.sendEvent("rotator","geo_abort",t.name)})}},rttr1011.show=function(){rttr1011.queue.length>0&&rttr1011.showRotator(rttr1011.queue.shift(),rttr1011.show)},rttr1011.ga.sendPageView(),rttr1011.show();