(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7dea0c04","chunk-cd264696"],{"09dd":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a-card",{attrs:{bordered:!1}},[s("result",{attrs:{"is-success":!0,description:t.description,title:t.title}},[s("template",{slot:"action"},[s("a-button",{attrs:{type:"primary"}},[t._v("返回列表")]),s("a-button",{staticStyle:{"margin-left":"8px"}},[t._v("查看项目")]),s("a-button",{staticStyle:{"margin-left":"8px"}},[t._v("打印")])],1),s("div",[s("div",{staticStyle:{"font-size":"16px",color:"rgba(0, 0, 0, 0.85)","font-weight":"500","margin-bottom":"20px"}},[t._v("项目名称")]),s("a-row",{staticStyle:{"margin-bottom":"16px"}},[s("a-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:6}},[s("span",{staticStyle:{color:"rgba(0, 0, 0, 0.85)"}},[t._v("项目 ID：")]),t._v("\n          20180724089\n        ")]),s("a-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:6}},[s("span",{staticStyle:{color:"rgba(0, 0, 0, 0.85)"}},[t._v("负责人：")]),t._v("\n          曲丽丽是谁？\n        ")]),s("a-col",{attrs:{xs:24,sm:24,md:24,lg:24,xl:12}},[s("span",{staticStyle:{color:"rgba(0, 0, 0, 0.85)"}},[t._v("生效时间：")]),t._v("\n          2016-12-12 ~ 2017-12-12\n        ")])],1),s("a-steps",{attrs:{current:1,direction:t.isMobile&&t.directionType.vertical||t.directionType.horizontal,progressDot:""}},[s("a-step",[s("span",{staticStyle:{"font-size":"14px"},attrs:{slot:"title"},slot:"title"},[t._v("创建项目")]),s("template",{slot:"description"},[s("div",{staticStyle:{fontSize:"12px",color:"rgba(0, 0, 0, 0.45)",position:"relative",left:"42px"},attrs:{slot:"description"},slot:"description"},[s("div",{staticStyle:{margin:"8px 0 4px"}},[t._v("曲丽丽\n                "),s("a-icon",{staticStyle:{"margin-left":"8px"},attrs:{type:"dingding-o"}})],1),s("div",[t._v("2016-12-12 12:32")])])])],2),s("a-step",{attrs:{title:"部门初审"}},[s("span",{staticStyle:{"font-size":"14px"},attrs:{slot:"title"},slot:"title"},[t._v("部门初审")]),s("template",{slot:"description"},[s("div",{staticStyle:{fontSize:"12px",color:"rgba(0, 0, 0, 0.45)",position:"relative",left:"42px"},attrs:{slot:"description"},slot:"description"},[s("div",{staticStyle:{margin:"8px 0 4px"}},[t._v("周毛毛\n                "),s("a-icon",{staticStyle:{"margin-left":"8px",color:"#00A0E9"},attrs:{type:"dingding-o"}})],1),s("div",[s("a",{attrs:{href:""}},[t._v("催一下")])])])])],2),s("a-step",{attrs:{title:"财务复核"}},[s("span",{staticStyle:{"font-size":"14px"},attrs:{slot:"title"},slot:"title"},[t._v("财务复核")])]),s("a-step",{attrs:{title:"完成"}},[s("span",{staticStyle:{"font-size":"14px"},attrs:{slot:"title"},slot:"title"},[t._v("完成")])])],1)],1)],2)],1)},a=[],n=s("9a3d"),l={horizontal:"horizontal",vertical:"vertical"},o={name:"Success",components:{Result:n["default"]},computed:{isMobile:function(){return this.$store.state.sys.isMobile}},data:function(){return{title:"提交成功",description:"提交结果页用于反馈一系列操作任务的处理结果，\n 如果仅是简单操作，使用 Message 全局提示反馈即可。\n 本文字区域可以展示简单的补充说明，如果有类似展示\n “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。",directionType:l}}},c=o,r=(s("83be"),s("2877")),p=Object(r["a"])(c,i,a,!1,null,"4dbd178b",null);p.options.__file="success.vue";e["default"]=p.exports},"4ba1":function(t,e,s){},"83be":function(t,e,s){"use strict";var i=s("a3d0"),a=s.n(i);a.a},"9a3d":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"result"},[s("div",[s("a-icon",{class:{icon:!0,success:t.isSuccess,error:!t.isSuccess},attrs:{type:t.isSuccess?"check-circle":"close-circle"}})],1),t.title?s("div",{staticClass:"title"},[t._v(t._s(t.title))]):t._e(),t.description?s("div",{staticClass:"description"},[t._v(t._s(t.description))]):t._e(),t.content?s("div",{staticClass:"content"},[t._t("default")],2):t._e(),s("div",{staticClass:"action"},[t._t("action")],2)])},a=[],n={name:"Result",props:{isSuccess:{type:Boolean,default:!1},title:{type:String,default:""},description:{type:String,default:""},content:{type:Boolean,default:!0}}},l=n,o=(s("9c7f"),s("2877")),c=Object(o["a"])(l,i,a,!1,null,"9e21edf4",null);c.options.__file="Result.vue";e["default"]=c.exports},"9c7f":function(t,e,s){"use strict";var i=s("4ba1"),a=s.n(i);a.a},a3d0:function(t,e,s){}}]);