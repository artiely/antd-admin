(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-768eb4e8","chunk-2826869d","chunk-7d3cef0b","chunk-2d22fd30"],{"235c":function(t,e,a){},"45b7":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-list",{attrs:{itemLayout:"horizontal",dataSource:t.data},scopedSlots:t._u([{key:"renderItem",fn:function(e,i){return a("a-list-item",{key:i},[a("a-list-item-meta",[a("a",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))]),a("span",{attrs:{slot:"description"},slot:"description"},[a("span",{staticClass:"security-list-description"},[t._v(t._s(e.description))]),e.value?a("span",[t._v(":")]):t._e(),a("span",{staticClass:"security-list-value"},[t._v(t._s(e.value))])])]),e.actions?[a("a",{attrs:{slot:"actions"},on:{click:e.actions.callback},slot:"actions"},[t._v(t._s(e.actions.title))])]:t._e()],2)}}])})},s=[],o={data:function(){var t=this;return{data:[{title:"账户密码",description:"当前密码强度",value:"强",actions:{title:"修改",callback:function(){t.$message.info("This is a normal message")}}},{title:"密保手机",description:"已绑定手机",value:"138****8293",actions:{title:"修改",callback:function(){t.$message.success("This is a message of success")}}},{title:"密保问题",description:"未设置密保问题，密保问题可有效保护账户安全",value:"",actions:{title:"设置",callback:function(){t.$message.error("This is a message of error")}}},{title:"备用邮箱",description:"已绑定邮箱",value:"ant***sign.com",actions:{title:"修改",callback:function(){t.$message.warning("This is message of warning")}}},{title:"MFA 设备",description:"未绑定 MFA 设备，绑定后，可以进行二次确认",value:"",actions:{title:"绑定",callback:function(){t.$message.info("This is a normal message")}}}]}}},n=o,r=(a("c14e"),a("2877")),l=Object(r["a"])(n,i,s,!1,null,"28477ab0",null);l.options.__file="security.vue";e["default"]=l.exports},"6dee":function(t,e,a){"use strict";var i=a("235c"),s=a.n(i);s.a},"71e8":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"account-settings-info-view"},[a("a-row",{attrs:{gutter:16}},[a("a-col",{attrs:{md:24,lg:16}},[a("a-form",{attrs:{layout:"vertical"}},[a("a-form-item",{attrs:{label:"昵称"}},[a("a-input",{attrs:{placeholder:"给自己起个名字"}})],1),a("a-form-item",{attrs:{label:"Bio"}},[a("a-textarea",{attrs:{rows:"4",placeholder:"You are not alone."}})],1),a("a-form-item",{attrs:{label:"电子邮件",required:!1}},[a("a-input",{attrs:{placeholder:"exp@admin.com"}})],1),a("a-form-item",{attrs:{label:"加密方式",required:!1}},[a("a-select",{attrs:{defaultValue:"aes-256-cfb"}},[a("a-select-option",{attrs:{value:"aes-256-cfb"}},[t._v("aes-256-cfb")]),a("a-select-option",{attrs:{value:"aes-128-cfb"}},[t._v("aes-128-cfb")]),a("a-select-option",{attrs:{value:"chacha20"}},[t._v("chacha20")])],1)],1),a("a-form-item",{attrs:{label:"连接密码",required:!1}},[a("a-input",{attrs:{placeholder:"h3gSbecd"}})],1),a("a-form-item",{attrs:{label:"登陆密码",required:!1}},[a("a-input",{attrs:{placeholder:"密码"}})],1),a("a-form-item",[a("a-button",{attrs:{type:"primary"}},[t._v("提交")]),a("a-button",{staticStyle:{"margin-left":"8px"}},[t._v("保存")])],1)],1)],1),a("a-col",{style:{minHeight:"180px"},attrs:{md:24,lg:8}},[a("div",{staticClass:"ant-upload-preview",on:{click:function(e){t.$refs.modal.edit(1)}}},[a("a-icon",{staticClass:"upload-icon",attrs:{type:"cloud-upload-o"}}),a("div",{staticClass:"mask"},[a("a-icon",{attrs:{type:"plus"}})],1),a("img",{attrs:{src:t.option.img}})],1)])],1),a("avatar-upload",{ref:"modal"})],1)},s=[],o=a("44c2"),n={components:{avatarUpload:o["default"]},data:function(){return{preview:{},option:{img:a("a74c"),info:!0,size:1,outputType:"jpeg",canScale:!1,autoCrop:!0,autoCropWidth:180,autoCropHeight:180,fixedBox:!0,fixed:!0,fixedNumber:[1,1]}}},methods:{}},r=n,l=(a("6dee"),a("2877")),c=Object(l["a"])(r,i,s,!1,null,"775c4d60",null);c.options.__file="base-settings.vue";e["default"]=c.exports},"80ed":function(t,e,a){},b843:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-card",{attrs:{bordered:!1}},[a("a-tabs",{attrs:{defaultActiveKey:"1",tabPosition:t.tabPosition}},[a("a-tab-pane",{key:"1",attrs:{tab:"基本设置"}},[a("base-setting")],1),a("a-tab-pane",{key:"2",attrs:{tab:"安全设置"}},[a("security")],1),a("a-tab-pane",{key:"3",attrs:{tab:"个性化"}},[a("custom")],1),a("a-tab-pane",{key:"4",attrs:{tab:"账户绑定"}},[t._v("账户绑定")]),a("a-tab-pane",{key:"5",attrs:{tab:"新消息通知"}},[t._v("新消息通知")])],1)],1)],1)},s=[],o=a("71e8"),n=a("ea53"),r=a("45b7"),l={components:{baseSetting:o["default"],custom:n["default"],security:r["default"]},data:function(){return{tabPosition:"left",preview:{},option:{img:"/avatar2.jpg",info:!0,size:1,outputType:"jpeg",canScale:!1,autoCrop:!0,autoCropWidth:180,autoCropHeight:180,fixedBox:!0,fixed:!0,fixedNumber:[1,1]}}},computed:{isMobile:function(){return this.$store.state.sys.isMobile}},watch:{isMobile:{handler:function(t){this.tabPosition=t?"top":"left"}}}},c=l,u=a("2877"),d=Object(u["a"])(c,i,s,!1,null,null,null);d.options.__file="user.vue";e["default"]=d.exports},c14e:function(t,e,a){"use strict";var i=a("80ed"),s=a.n(i);s.a},ea53:function(t,e,a){"use strict";a.r(e);var i,s,o=[{key:"薄暮",color:"#F5222D"},{key:"火山",color:"#FA541C"},{key:"日暮",color:"#FAAD14"},{key:"明青",color:"#13C2C2"},{key:"极光绿",color:"#52C41A"},{key:"拂晓蓝（默认）",color:"#1890FF"},{key:"极客蓝",color:"#2F54EB"},{key:"酱紫",color:"#722ED1"}],n={methods:{colorFilter:function(t){var e=o.filter(function(e){return e.color===t})[0];return e&&e.key},onChange:function(t){this.$store.commit("sys/changeMenuTheme")}},render:function(){var t=arguments[0];return t("a-list",{attrs:{itemLayout:"horizontal"}},[t("a-list-item",[t("a-list-item-meta",[t("a",{slot:"title"},["风格配色"]),t("span",{slot:"description"},["整体风格配色设置"])]),t("div",{slot:"actions"},[t("a-switch",{attrs:{checkedChildren:"暗色",unCheckedChildren:"白色",defaultChecked:"dark"===this.navTheme},on:{change:this.onChange}})])]),t("a-list-item",[t("a-list-item-meta",[t("a",{slot:"title"},["主题色"]),t("span",{slot:"description"},["页面风格配色： ",this.colorFilter(this.primaryColor)])])])])}},r=n,l=a("2877"),c=Object(l["a"])(r,i,s,!1,null,null,null);c.options.__file="custom.vue";e["default"]=c.exports}}]);