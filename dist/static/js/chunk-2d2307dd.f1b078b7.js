(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2307dd"],{ed08:function(e,n,r){"use strict";function t(e){return-1!==JSON.parse(sessionStorage.getItem("permissions")||"[]").indexOf(e)||!1}function i(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"id",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"parentId",t=[],i={},d=0;d<e.length;d++)i[e[d][n]]=e[d];for(var l=0;l<e.length;l++)i[e[l][r]]&&e[l][n]!==e[l][r]?(i[e[l][r]]["children"]||(i[e[l][r]]["children"]=[]),i[e[l][r]]["_level"]||(i[e[l][r]]["_level"]=1),e[l]["_level"]=i[e[l][r]]._level+1,i[e[l][r]]["children"].push(e[l])):t.push(e[l]);return t}r.r(n),r.d(n,"isAuth",function(){return t}),r.d(n,"treeDataTranslate",function(){return i})}}]);