(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d7aa865"],{"0a14":function(n,t,e){"use strict";e.r(t);var o=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("editor",{model:{value:n.content,callback:function(t){n.content=t},expression:"content"}})],1)},i=[],r=["onActivate","onAddUndo","onBeforeAddUndo","onBeforeExecCommand","onBeforeGetContent","onBeforeRenderUI","onBeforeSetContent","onBeforePaste","onBlur","onChange","onClearUndos","onClick","onContextMenu","onCopy","onCut","onDblclick","onDeactivate","onDirty","onDrag","onDragDrop","onDragEnd","onDragGesture","onDragOver","onDrop","onExecCommand","onFocus","onFocusIn","onFocusOut","onGetContent","onHide","onInit","onKeyDown","onKeyPress","onKeyUp","onLoadContent","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onNodeChange","onObjectResizeStart","onObjectResized","onObjectSelected","onPaste","onPostProcess","onPostRender","onPreProcess","onProgressState","onRedo","onRemove","onReset","onSaveContent","onSelectionChange","onSetAttrib","onSetContent","onShow","onSubmit","onUndo","onVisualAid"],s=function(n){return-1!==r.indexOf(n)},a=function(n,t,e){Object.keys(t).filter(s).forEach(function(o){var i=t[o];"function"===typeof i&&("onInit"===o?i(n,e):e.on(o.substring(2),function(n){return i(n,e)}))})},u=function(n,t){var e,o=n.$props.modelEvents?n.$props.modelEvents:null,i=Array.isArray(o)?o.join(" "):o;n.$watch("value",function(n,o){t&&"string"===typeof n&&n!==e&&n!==o&&(t.setContent(n),e=n)}),t.on(i||"change keyup undo redo",function(){e=t.getContent(),n.$emit("input",e)})},c=function(n,t,e){var o=t.$props.value?t.$props.value:"",i=t.$props.initialValue?t.$props.initialValue:"";e.setContent(o||i),t.$listeners.input&&u(t,e),a(n,t.$listeners,e)},l=0,p=function(n){var t=new Date,e=t.getTime(),o=Math.floor(1e9*Math.random());return l++,n+"_"+o+l+String(e)},d=function(n){return null!==n&&"textarea"===n.tagName.toLowerCase()},f=function(n){return"undefined"===typeof n||""===n?[]:Array.isArray(n)?n:n.split(" ")},h=function(n,t){return f(n).concat(f(t))},y=function(n,t,e,o){var i=t.createElement("script");i.type="application/javascript",i.id=n,i.addEventListener("load",o),i.src=e,t.head.appendChild(i)},v=function(){return{listeners:[],scriptId:p("tiny-script"),scriptLoaded:!1}},m=function(n,t,e,o){n.scriptLoaded?o():(n.listeners.push(o),t.getElementById(n.scriptId)||y(n.scriptId,t,e,function(){n.listeners.forEach(function(n){return n()}),n.scriptLoaded=!0}))},g=e("1f38"),b={apiKey:String,cloudChannel:String,id:String,init:Object,initialValue:String,inline:Boolean,modelEvents:[String,Array],plugins:[String,Array],tagName:String,toolbar:[String,Array],value:String,disabled:Boolean},$=Object.assign||function(n){for(var t,e=1,o=arguments.length;e<o;e++)for(var i in t=arguments[e],t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i]);return n},C=v(),S=function(n,t,e){return n(e||"div",{attrs:{id:t}})},w=function(n,t){return n("textarea",{attrs:{id:t},style:{visibility:"hidden"}})},O=function(n){return function(){var t=$({},n.$props.init,{readonly:n.$props.disabled,selector:"#"+n.elementId,plugins:h(n.$props.init&&n.$props.init.plugins,n.$props.plugins),toolbar:n.$props.toolbar||n.$props.init&&n.$props.init.toolbar,inline:n.inlineEditor,setup:function(t){n.editor=t,t.on("init",function(e){return c(e,n,t)}),n.$props.init&&"function"===typeof n.$props.init.setup&&n.$props.init.setup(t)}});d(n.element)&&(n.element.style.visibility=""),Object(g["a"])().init(t)}},E={props:b,created:function(){this.elementId=this.$props.id||p("tiny-vue"),this.inlineEditor=this.$props.init&&this.$props.init.inline||this.$props.inline},watch:{disabled:function(){this.editor.setMode(this.disabled?"readonly":"design")}},mounted:function(){if(this.element=this.$el,null!==Object(g["a"])())O(this)();else if(this.element){var n=this.element.ownerDocument,t=this.$props.cloudChannel?this.$props.cloudChannel:"stable",e=this.$props.apiKey?this.$props.apiKey:"",o="https://cloud.tinymce.com/"+t+"/tinymce.min.js?apiKey="+e;m(C,n,o,O(this))}},beforeDestroy:function(){null!==Object(g["a"])()&&Object(g["a"])().remove(this.editor)},render:function(n){return this.inlineEditor?S(n,this.elementId,this.$props.tagName):w(n,this.elementId)}},j=E,D=(e("d087"),{data:function(){return{content:"hello "}},components:{editor:j}}),A=D,I=(e("ca3a"),e("2877")),M=Object(I["a"])(A,o,i,!1,null,"8e964fea",null);M.options.__file="richtext.vue";t["default"]=M.exports},"163c":function(n,t,e){},"1f38":function(n,t,e){"use strict";(function(n){e.d(t,"a",function(){return i});var o=function(){return"undefined"!==typeof window?window:n},i=function(){var n=o();return n&&n.tinymce?n.tinymce:null}}).call(this,e("c8ba"))},ca3a:function(n,t,e){"use strict";var o=e("163c"),i=e.n(o);i.a}}]);