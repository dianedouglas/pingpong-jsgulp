!function n(r,o,e){function i(u,p){if(!o[u]){if(!r[u]){var f="function"==typeof require&&require;if(!p&&f)return f(u,!0);if(t)return t(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var s=o[u]={exports:{}};r[u][0].call(s.exports,function(n){var o=r[u][1][n];return i(o?o:n)},s,s.exports,n,r,o,e)}return o[u].exports}for(var t="function"==typeof require&&require,u=0;u<e.length;u++)i(e[u]);return i}({1:[function(n,r,o){o.pingpong=function(n){for(var r=[],o=1;n>=o;o++)o%15==0?r.push("ping-pong"):o%3===0?r.push("ping"):o%5===0?r.push("pong"):r.push(o);return r}},{}],2:[function(n,r,o){var e=n("./../js/pingpong.js").pingpong;$(document).ready(function(){$("#pingpong").submit(function(n){n.preventDefault();var r=$("#goal").val(),o=e(r);o.forEach(function(n){$("#solution").append("<li>"+n+"</li>")})})}),$(document).ready(function(){$("#signup").submit(function(n){n.preventDefault();var r=$("#email").val();$("#signup").hide(),$("#solution").prepend("<p>Thank you, "+r+" has been added to our list!</p>")})})},{"./../js/pingpong.js":1}]},{},[2]);