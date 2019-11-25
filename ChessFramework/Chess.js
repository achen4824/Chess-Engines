
$('.gameCell').click(function(){
    var posX = 0, posY=0, posTempX=0, posTempY=0;
    $('#selector').css("display","block");
    var rect = this.getBoundingClientRect();
    $('#selector').css("top",(rect.top-8)+"px");
    $('#selector').css("left",(rect.left-8)+"px");
    console.log(rect.top-8,rect.left-8);
});

$(document).ready(function() {

});