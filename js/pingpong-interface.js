// var pingpong = require('./pingpong.js').pingpong;
var pingpong = require('./../js/pingpong.js').pingpong;

$(document).ready(function(){
  $('#pingpong').submit(function(event){
    event.preventDefault();
    var goal = $('#goal').val();
    var output = pingpong(goal);
    output.forEach(function(element){
      $('#solution').append("<li>" + element + "</li>");
    });
  });
});
