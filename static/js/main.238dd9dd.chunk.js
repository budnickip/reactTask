(this.webpackJsonpzad3=this.webpackJsonpzad3||[]).push([[0],[,,,,,,,,,,,function(e,t,c){},function(e,t,c){},,,,function(e,t,c){},,function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){"use strict";c.r(t);var n=c(1),r=c.n(n),a=c(4),s=c.n(a),i=(c(11),c(2)),o=(c(12),c(5)),u=(c(16),c(0)),d=function(e){var t=Object(n.useState)([]),c=Object(i.a)(t,2),r=c[0],a=c[1],s=Object(n.useState)([]),d=Object(i.a)(s,2),j=d[0];d[1];Object(n.useEffect)((function(){var t=e.getCurrentDate(),c=b();fetch("https://api.nbp.pl/api/exchangerates/tables/a/".concat(c,"/").concat(t,"/")).then((function(e){return e.ok?e.json():Promise.reject(e)})).then((function(e){a(e)})).catch((function(e){console.error("B\u0142\u0105d pobrania API!")}))}),[]);var b=function(){var t=e.getCurrentDate(),c=+t.slice(5,7),n=1===c?12:--c<10?"0"+c:c;return(12===n?+t.slice(0,4)-1:+t.slice(0,4))+"-"+n+t.slice(7)};return Object(n.useEffect)((function(){j.length=0,j.push(["Dzie\u0144","EUR","USD","GBP"]),r.map((function(e){return{rates:e.rates.filter((function(e){return"EUR"===e.code||"USD"===e.code||"GBP"===e.code})),date:e.effectiveDate}})).forEach((function(e){j.push([e.date,e.rates[1].mid,e.rates[0].mid,e.rates[2].mid])}))}),[r]),Object(u.jsx)("div",{className:"chart",children:Object(u.jsx)(o.a,{width:"95%",height:"400px",chartType:"Line",loader:Object(u.jsx)("div",{children:"Loading Chart"}),data:j,options:{chart:{title:"Wykres \u015brednich kurs\xf3w walut",subtitle:"z ostatniego miesi\u0105ca"}},rootProps:{"data-testid":"3"}})})},j=(c(18),c(19),function(){return Object(u.jsx)("thead",{className:"table-header",children:Object(u.jsxs)("tr",{className:"table-header__row",children:[Object(u.jsx)("th",{className:"table-header__item",id:"currency-code",children:"Kod"}),Object(u.jsx)("th",{className:"table-header__item",id:"currency-bid",children:"Kupno"}),Object(u.jsx)("th",{className:"table-header__item",id:"currency-ask",children:"Sprzeda\u017c"})]})})}),b=(c(20),function(){return Object(u.jsxs)("div",{className:"lds-ring",children:[Object(u.jsx)("div",{}),Object(u.jsx)("div",{}),Object(u.jsx)("div",{}),Object(u.jsx)("div",{})]})}),l=(c(21),function(e){return Object(u.jsxs)("tr",{className:"table-body__row",children:[Object(u.jsx)("td",{className:"table-body__item",children:e.curr.code}),Object(u.jsx)("td",{className:"table-body__item",children:e.curr.bid}),Object(u.jsx)("td",{className:"table-body__item",children:e.curr.ask})]},e.curr.code)}),h=(c(22),function(e){return Object(u.jsx)("tbody",{className:"table-body",children:e.currencies?e.currencies.filter((function(e){return"USD"===e.code||"EUR"===e.code||"GBP"===e.code})).map((function(e){return Object(u.jsx)(l,{curr:e},e.code)})):Object(u.jsx)(b,{})})}),f=function(e){return Object(u.jsx)("div",{className:"table",children:Object(u.jsxs)("table",{children:[Object(u.jsx)(j,{}),Object(u.jsx)(h,{currencies:e.currencies})]})})},O=(c(23),function(e){return Object(u.jsxs)("div",{className:"header",children:[Object(u.jsx)("p",{className:"header__paragraph",children:e.lastUpdate}),Object(u.jsx)(f,{currencies:e.currencies})]})});var x=function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),c=t[0],r=t[1],a=Object(n.useState)(""),s=Object(i.a)(a,2),o=s[0],j=s[1];Object(n.useEffect)((function(){b(),setInterval((function(){b()}),1e4)}),[]);var b=function(){fetch("https://api.nbp.pl/api/exchangerates/tables/c/").then((function(e){return e.ok?e.json():Promise.reject(e)})).then((function(e){j(l),r(e[0].rates)})).catch((function(e){console.error("B\u0142\u0105d pobrania API!")}))},l=function(){var e=new Date,t=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),c=e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds();return"Ostatnia aktualizacja: ".concat(h()," @ ").concat(e.getHours(),":").concat(t,":").concat(c)},h=function(){var e=new Date,t=+e.getMonth()+1,c=e.getMonth()+1<10?"0"+t:t,n=e.getDate()<10?"0"+e.getDay():e.getDay();return"".concat(e.getFullYear(),"-").concat(c,"-").concat(n)};return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)(O,{lastUpdate:o,currencies:c}),Object(u.jsx)(d,{getCurrentDate:h})]})};s.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(x,{})}),document.getElementById("root"))}],[[24,1,2]]]);
//# sourceMappingURL=main.238dd9dd.chunk.js.map