(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-e79510d6"],{"29f2":function(a,e,s){},7781:function(a,e,s){"use strict";s.r(e),s("cadf"),s("551c"),s("097d");var t=s("7f1a"),r=s.n(t),n=[{year:"1951 年",sales:38},{year:"1952 年",sales:52},{year:"1956 年",sales:61},{year:"1957 年",sales:145},{year:"1958 年",sales:48},{year:"1959 年",sales:38},{year:"1960 年",sales:38},{year:"1962 年",sales:38},{year:"1963 年",sales:100},{year:"1964 年",sales:38},{year:"1965 年",sales:38},{year:"1966 年",sales:38}],i={props:{id:String},data:function(){return{chart:null,timer:null}},mounted:function(){var a=this;this.chart=new r.a.Chart({container:this.id,forceFit:!0,height:300}),this.chart.source(n),this.chart.scale("sales",{tickInterval:20}),this.chart.interval().position("year*sales"),this.chart.render(),this.$nextTick(function(){a.chart.forceFit()})}},c=(s("8faa"),s("2877")),l=Object(c.a)(i,function(){var a=this,e=a.$createElement;return(a._self._c||e)("div",{attrs:{id:a.id}})},[],!1,null,null,null);l.options.__file="bar.vue",e.default=l.exports},"8faa":function(a,e,s){"use strict";var t=s("29f2");s.n(t).a}}]);