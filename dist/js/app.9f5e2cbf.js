(function(e){function t(t){for(var n,c,o=t[0],l=t[1],s=t[2],d=0,f=[];d<o.length;d++)c=o[d],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&f.push(a[c][0]),a[c]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);u&&u(t);while(f.length)f.shift()();return i.push.apply(i,s||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,o=1;o<r.length;o++){var l=r[o];0!==a[l]&&(n=!1)}n&&(i.splice(t--,1),e=c(c.s=r[0]))}return e}var n={},a={app:0},i=[];function c(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.m=e,c.c=n,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(r,n,function(t){return e[t]}.bind(null,n));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var s=0;s<o.length;s++)t(o[s]);var u=l;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=r("b85c"),i=(r("e9c4"),r("4e827"),r("caad"),r("2f62")),c=r("068b");n["a"].use(i["a"]);var o={strict:!0,state:{testData:"Test",referencedFile:void 0},mutations:{changeTestData:function(e,t){e.testData=t},openFile:function(e,t){e.referencedFile=t},setActiveBuildingId:function(e,t){e.referencedFile&&(e.referencedFile.activeBuildingId=t)},setActivePhaseId:function(e,t){e.referencedFile&&(e.referencedFile.activePhaseId=t)}},getters:{capitalizedTestData:function(e){return e.testData.toUpperCase()},activeBuilding:function(e){if(e.referencedFile){var t=e.referencedFile,r="building "+t.activeBuildingId;return t.buildingData[r]}},activeProgramUnsorted:function(e){if(e.referencedFile){var t=e.referencedFile,r="phase "+t.activePhaseId+" | building "+t.activeBuildingId,n=JSON.parse(JSON.stringify(t.allProgramData[r]));return n.sort((function(e,t){return e.id-t.id})),n}},getColorKey:function(e){if(e.referencedFile){var t=e.referencedFile;return t.colorKey}},getColorScale:function(e){if(e.referencedFile){var t,r=e.referencedFile,n=c["e"],i=[],o=[],l=Object(a["a"])(r.colorKey);try{for(l.s();!(t=l.n()).done;){var s=t.value;i.includes(s.department)||(i.push(s.Department),o.push(s.HexColor))}}catch(O){l.e(O)}finally{l.f()}var u,d=Object(a["a"])(n);try{for(d.s();!(u=d.n()).done;){var f=u.value;o.push(f)}}catch(O){d.e(O)}finally{d.f()}var v,p=[],h="phase "+r.activePhaseId+" | building "+r.activeBuildingId,m=r.allProgramData[h],b=Object(a["a"])(m);try{for(b.s();!(v=b.n()).done;){var g=v.value;p.includes(g.department)||p.push(g.department)}}catch(O){b.e(O)}finally{b.f()}p.sort();for(var y=0,w=p;y<w.length;y++){var x=w[y];i.push(x)}var k=c["d"]().domain(i).range(o);return k}},getActiveLevelsByElevation:function(e){if(e.referencedFile){var t=e.referencedFile,r="building "+t.activeBuildingId,n=JSON.parse(JSON.stringify(t.levelData[r])),a=[];for(var i in n)if("meta"!=i){var c=n[i];c.id=i,a.push(c)}return a.sort(o),a}function o(e,t){var r=e.elevation,n=t.elevation,a=0;return r>n?a=1:r<n&&(a=-1),a}},activeProgram:function(e){if(e.referencedFile){var t=e.referencedFile,r="phase "+t.activePhaseId+" | building "+t.activeBuildingId;return t.allProgramData[r]}}}},l=new i["a"].Store(o),s=r("f309");n["a"].use(s["a"]);var u=new s["a"]({}),d=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-app-bar",{attrs:{app:"",color:"grey darken-2",dark:"",dense:""},scopedSlots:e._u([{key:"extension",fn:function(){return[r("v-tabs",{attrs:{"show-arrows":""},model:{value:e.selectedTab,callback:function(t){e.selectedTab=t},expression:"selectedTab"}},e._l(e.tabs,(function(t,n){return r("v-tab",{key:n},[e._v(" "+e._s(t))])})),1)]},proxy:!0}])},[r("div",{staticClass:"d-flex align-center my-0 py-0"},[r("h2",{staticClass:"roboto-mono my-0 py-0"},[e._v("Planning Blocks")])])]),r("v-main",[0==e.selectedTab?r("plan-select-tab"):e._e(),1==e.selectedTab?r("block-creation-tab"):e._e(),2==e.selectedTab?r("block-validation-tab"):e._e()],1)],1)},f=[],v=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[e.referencedFile?r("div",[r("v-row",[r("v-col",[r("h3",[e._v("Create a Block for Each Program Element in Plan")])])],1),r("v-row",[r("v-col",[r("p",[e._v(" This operation will create "+e._s(e.numberOfBlocks)+" program blocks, distributed across "+e._s(e.numberOfGroups)+" groups and "+e._s(e.numberOfTypes)+" types of program. ")])])],1),r("v-row",[r("v-col",[r("v-btn",{directives:[{name:"blur",rawName:"v-blur"}],attrs:{elevation:"4",outlined:"",rounded:"",large:"",dark:"",color:"#A80051"},on:{click:function(t){return e.createButtonClicked()}}},[e._v("Build Blocks")])],1)],1),r("v-row",[r("v-col")],1),r("v-row",[r("v-col")],1),r("v-row",[r("v-col")],1),r("v-row",[r("v-col")],1),r("v-row",[r("v-col")],1)],1):r("div",[r("v-row",[r("v-col",[r("h2",{staticClass:"red--text"},[e._v(' Use the "Select Plan" Tab to Load Programming Data ')])])],1)],1)])},p=[],h=r("1da1"),m=r("5530"),b=(r("96cf"),r("ac1f"),r("5319"),window.WSM),g=window.FormIt,y={name:"BlockCreationTab",beforeMount:function(){},beforeDestroy:function(){},computed:Object(m["a"])(Object(m["a"])(Object(m["a"])({},Object(i["c"])(["referencedFile"])),Object(i["b"])(["getActiveLevelsByElevation","activeProgram","getColorKey"])),{},{numberOfBlocks:function(){var e,t=0,r=Object(a["a"])(this.activeProgram);try{for(r.s();!(e=r.n()).done;){var n=e.value;t+=n.quantity}}catch(i){r.e(i)}finally{r.f()}return t},numberOfGroups:function(){var e,t=0,r=[],n=Object(a["a"])(this.activeProgram);try{for(n.s();!(e=n.n()).done;){var i=e.value;r.includes(i.group)||(r.push(i.group),t+=1)}}catch(c){n.e(c)}finally{n.f()}return t},numberOfTypes:function(){var e,t=0,r=[],n=Object(a["a"])(this.activeProgram);try{for(n.s();!(e=n.n()).done;){var i=e.value;r.includes(i.department)||(r.push(i.department),t+=1)}}catch(c){n.e(c)}finally{n.f()}return t},structuredProgramData:function(){var e,t={},r=Object(a["a"])(this.activeProgram);try{for(r.s();!(e=r.n()).done;){var n=e.value;n.department in t||(t[n.department]=[])}}catch(f){r.e(f)}finally{r.f()}var i,c={},o=Object(a["a"])(this.activeProgram);try{for(o.s();!(i=o.n()).done;){var l=i.value;l.group in c||(c[l.group]=JSON.parse(JSON.stringify(t)))}}catch(f){o.e(f)}finally{o.f()}var s,u=Object(a["a"])(this.activeProgram);try{for(u.s();!(s=u.n()).done;){var d=s.value;c[d.group][d.department].push(d)}}catch(f){u.e(f)}finally{u.f()}return c}}),data:function(){return{}},methods:{createButtonClicked:function(){var e=this;e.getInSketchMaterials().then((function(t){e.makeMissingMaterials(e,t)}))},getInSketchMaterials:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(){var t,r,n,i,c,o,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t={},e.next=3,g.MaterialProvider.GetMaterials(g.LibraryType.SKETCH);case 3:r=e.sent,n=Object(a["a"])(r),e.prev=5,n.s();case 7:if((i=n.n()).done){e.next=16;break}return c=i.value,e.next=11,g.MaterialProvider.GetMaterialName(g.LibraryType.SKETCH,c);case 11:o=e.sent,console.log("name",o,"material",c),1==o.Result&&(l={name:o,id:c},t[o]=l);case 14:e.next=7;break;case 16:e.next=21;break;case 18:e.prev=18,e.t0=e["catch"](5),n.e(e.t0);case 21:return e.prev=21,n.f(),e.finish(21);case 24:return e.abrupt("return",t);case 25:case"end":return e.stop()}}),e,null,[[5,18,21,24]])})));function t(){return e.apply(this,arguments)}return t}(),makeMissingMaterials:function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(t,r){var n,i,c,o,l,s,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=Object(a["a"])(t.getColorKey),e.prev=1,n.s();case 3:if((i=n.n()).done){e.next=24;break}if(c=i.value,o=c.Department,l=c.HexColor,s=t.hexToRgb(l),console.log("rgb conversion results",s,o),!s||o in r){e.next=22;break}return console.log("running material creation loop",c),e.next=13,b.Color(s.r,s.g,s.b,255);case 13:return u=e.sent,console.log("wsm color",u),e.next=17,g.MaterialProvider.MaterialData(u);case 17:return d=e.sent,d.MaterialName=o,console.log("new formit material",d),e.next=22,g.MaterialProvider.CreateMaterial(g.LibraryType.SKETCH,d);case 22:e.next=3;break;case 24:e.next=29;break;case 26:e.prev=26,e.t0=e["catch"](1),n.e(e.t0);case 29:return e.prev=29,n.f(),e.finish(29);case 32:case"end":return e.stop()}}),e,null,[[1,26,29,32]])})));function t(t,r){return e.apply(this,arguments)}return t}(),hexToRgb:function(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(t,(function(e,t,r,n){return t+t+r+r+n+n}));var r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}}},w=y,x=r("2877"),k=r("6544"),O=r.n(k),P=r("8336"),B=r("62ad"),j=r("a523"),F=r("0fd9"),S=Object(x["a"])(w,v,p,!1,null,null,null),C=S.exports;O()(S,{VBtn:P["a"],VCol:B["a"],VContainer:j["a"],VRow:F["a"]});var _=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[r("v-row",[r("v-col")],1),r("v-row",[r("v-col")],1)],1)},T=[],D={name:"BlockValidationTab"},I=D,M=Object(x["a"])(I,_,T,!1,null,null,null),E=M.exports;O()(M,{VCol:B["a"],VContainer:j["a"],VRow:F["a"]});var N=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[r("v-row",[r("v-col",[r("h3",[e._v("Select Existing Space Planner .json File")])])],1),r("v-row",[r("v-col",[r("v-btn",{directives:[{name:"blur",rawName:"v-blur"}],staticClass:"mb-3",attrs:{large:"",rounded:"",dark:"",color:"#988600"},on:{click:function(t){return e.openFile()}}},[e._v("Open JSON File")])],1)],1),e.referencedFile?r("div",[r("v-row",[r("v-col",{staticClass:"mt-0 pt-0"},[r("h5",{staticClass:"mt-0 pt-0",staticStyle:{color:"#988600"}},[e._v(" File Imported Successfully! ")])])],1),r("v-row",[r("v-col",[r("h1",{staticClass:"roboto-mono"},[e._v(e._s(e.projectName))])])],1),r("hr",{staticClass:"mb-6"}),r("v-row",[r("v-col",[r("h3",[e._v("Select Building and Phase as Basis for Planning Blocks")])])],1),r("v-row",{},[r("v-col",[r("v-select",{staticClass:"ma-0 pa-0 mt-3",attrs:{color:"#988600","item-color":"#988600",label:"Select Building",items:e.buildingSelectOptions,value:e.activeBuildingId},on:{input:function(t){return e.setActiveBuildingId(t)}}})],1)],1),r("v-row",[r("v-col",[r("v-select",{staticClass:"ma-0 pa-0",attrs:{color:"#988600","item-color":"#988600",label:"Select Phase",items:e.phaseSelectOptions,value:e.activePhaseId},on:{input:function(t){return e.setActivePhaseId(t)}}})],1)],1),r("v-row",[r("v-col",[r("circle-packing-diagram")],1)],1)],1):e._e(),r("v-row",[r("v-col")],1),r("input",{staticStyle:{display:"none"},attrs:{id:"file-input",type:"file",name:"name"}})],1)},V=[],A=(r("b0c0"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pa-6 elevation-4"},[r("svg",{staticClass:"bubbleDiagram w-100 col ma-0 pa-0",staticStyle:{height:"500px"},attrs:{id:"d3-bubble-diagram-canvas"}})])}),R=[],U=(r("a9e3"),r("a15b"),r("fb6a"),r("d3b7"),r("ddb0"),{name:"CirclePackingDiagram",mounted:function(){this.drawUpdateDepartmentBubbles(this.structureData(this.activeProgramUnsorted)),window.addEventListener("resize",this.resize)},beforeDestroy:function(){window.removeEventListener("resize",this.resize)},watch:{activeProgramUnsorted:{handler:function(){this.drawUpdateDepartmentBubbles(this.structuredData)},deep:!0}},computed:Object(m["a"])({structuredData:function(){var e=this.structureData(this.activeProgramUnsorted);return e},activeBuildingName:function(){return this.activeBuilding.name}},Object(i["b"])(["activeProgramUnsorted","activeBuilding","getColorScale"])),methods:{resize:function(){this.drawUpdateDepartmentBubbles(this.structuredData)},drawUpdateDepartmentBubbles:function(e){var t=this.getColorScale,r=c["f"]("#d3-bubble-diagram-canvas"),n=Number(r.style("width").replace("px","")),a=Number(r.style("height").replace("px",""));r.style("font","10px sans-serif").attr("text-anchor","middle");var i=function(e){return c["c"]().size([n,a]).padding(3)(c["b"](e).sum((function(e){return e.value})).sort((function(e,t){return t.value-e.value})))},o=i(e),l=r.join("g"),s=l.selectAll("circle").data(o.descendants().slice(1)).join((function(e){return e.append("circle").attr("r",3).attr("cx",n/2).attr("cy",a/2).attr("start-x",(function(e){return e.x})).attr("start-y",(function(e){return e.y})).style("opacity",0)})).attr("fill",(function(e){return 0!=e.height?"white":t(e.data.dept)})).attr("stroke",(function(e){return 0!=e.height?"#000":null})).attr("stroke-dasharray",(function(e){return 2==e.height?"3,4,3,4":"none"})).classed("circle-selected",!1).on("click",(function(){var e=c["f"](this).classed("circle-selected");e?c["f"](this).classed("circle-selected",!1).selectAll("title").remove():c["f"](this).classed("circle-selected",!0).append("title").text((function(e){return e.data.name})),console.log("clicked","selected",e),c["f"](this).transition().duration(200).attr("stroke-width",e?1:3).attr("stroke",(function(t){return e&&0!=t.height?"#000":e?null:"#000"})).attr("stroke-dasharray",(function(t){return e&&2==t.height?"2,4,2,4":"none"}))}));s.transition().duration(200).ease(c["a"]).attr("r",(function(e){return e.r})).attr("cx",(function(e){return e.x})).attr("cy",(function(e){return e.y})).style("opacity",1)},structureData:function(e){var t,r={name:this.activeBuildingName,children:[],keys:{},indexer:0},n=Object(a["a"])(e);try{for(n.s();!(t=n.n()).done;){var i=t.value,c=i.quantity,o=0,l="",s="";if(""!=i.group?(o=3,l=i.group+" | group",s=i.department+" | department"):""!=i.department?(o=2,l=i.department+" | department"):o=1,1==o){var u=0;while(u<c)u++,r.children.push({name:i.name,value:i.area,dept:i.department}),r.indexer++}else if(2==o){l in r.keys||(r.keys[l]=r.indexer,r.indexer++,r.children.push({name:i.department,indexer:0,children:[]}));var d=r.keys[l],f=0;while(f<c)f++,r.children[d].children.push({name:i.name,value:i.area,dept:i.department}),r.children[d].indexer++}else if(3==o){l in r.keys||(r.keys[l]=r.indexer,r.indexer++,r.children.push({name:i.group,indexer:0,children:[],keys:{}}));var v=r.keys[l];if(""==i.department){var p=0;while(p<c)p++,r.children[v].children.push({name:i.name,value:i.area,dept:i.department}),r.children[v].indexer++}else{s in r.children[v].keys||(r.children[v].keys[s]=r.children[v].indexer,r.children[v].indexer++,r.children[v].children.push({name:i.department,indexer:0,children:[]}));var h=r.children[v].keys[s],m=r.children[v].children[h],b=0;while(b<c)b++,m.children.push({name:i.name,value:i.area,dept:i.department}),m.indexer++}}}}catch(g){n.e(g)}finally{n.f()}return r}}}),$=U,J=Object(x["a"])($,A,R,!1,null,null,null),L=J.exports,K={components:{circlePackingDiagram:L},name:"PlanSelectTab",mounted:function(){var e=document.getElementById("file-input");e.addEventListener("change",r,!1);var t=this;function r(){var e=this.files;t.activateOpenedFile(e)}},beforeDestroy:function(){},computed:Object(m["a"])(Object(m["a"])({},Object(i["c"])(["referencedFile"])),{},{activeBuildingId:function(){return this.referencedFile?this.referencedFile.activeBuildingId:void 0},activePhaseId:function(){return this.referencedFile?this.referencedFile.activePhaseId:void 0},projectName:function(){return this.referencedFile?this.referencedFile.projectName:void 0},buildingSelectOptions:function(){var e=[],t=this.referencedFile.buildingData;if(this.referencedFile)for(var r in t){var n=t[r],a={text:n.name,value:n.id};e.push(a)}return e},phaseSelectOptions:function(){var e=[],t=this.referencedFile.phaseData;if(this.referencedFile)for(var r in t){var n=t[r],a={text:n.name,value:n.id};e.push(a)}return console.log("phase select options",e),e}}),data:function(){return{}},methods:{openFile:function(){console.log("open file method was called"),document.getElementById("file-input").click()},activateOpenedFile:function(e){var t=this;console.log("activate opened file called",e[0]);var r=new FileReader;r.addEventListener("load",(function(){var e=JSON.parse(r.result);t.$store.commit("openFile",e)})),r.readAsText(e[0])},setActiveBuildingId:function(e){this.$store.commit("setActiveBuildingId",e)},setActivePhaseId:function(e){this.$store.commit("setActivePhaseId",e)}}},z=K,H=r("b974"),G=Object(x["a"])(z,N,V,!1,null,null,null),q=G.exports;O()(G,{VBtn:P["a"],VCol:B["a"],VContainer:j["a"],VRow:F["a"],VSelect:H["a"]});var W={name:"App",components:{BlockCreationTab:C,BlockValidationTab:E,PlanSelectTab:q},data:function(){return{tabs:["Select Plan","Create","validate"],selectedTab:0}}},Q=W,X=(r("034f"),r("7496")),Y=r("40dc"),Z=r("f6c4"),ee=r("71a3"),te=r("fe57"),re=Object(x["a"])(Q,d,f,!1,null,null,null),ne=re.exports;O()(re,{VApp:X["a"],VAppBar:Y["a"],VMain:Z["a"],VTab:ee["a"],VTabs:te["a"]}),n["a"].config.productionTip=!1,n["a"].directive("blur",{inserted:function(e){e.onfocus=function(e){return e.target.blur()}}}),new n["a"]({vuetify:u,store:l,render:function(e){return e(ne)}}).$mount("#app")},"85ec":function(e,t,r){}});
//# sourceMappingURL=app.9f5e2cbf.js.map