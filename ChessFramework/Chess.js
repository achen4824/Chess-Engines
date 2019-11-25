

$('.gameCell').mousedown(function(event){
     //get mouse position
    var currentMousePos = { x: -1, y: -1 };
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;

    var offsetX=0, offsetY=0;
    $('#selector').css("display","block");
    var rect = this.getBoundingClientRect();
    $('#selector').css("top",(rect.top-8)+"px");
    $('#selector').css("left",(rect.left-8)+"px");

    offsetY  = (rect.bottom-rect.top)/2+8;
    offsetX  = (rect.right-rect.left)/2+8;

    $('#selector').mousemove(function(currEvent){
        $('#selector').css("top",(currEvent.pageY - offsetY)+"px");
        $('#selector').css("left",(currEvent.pageX - offsetX)+"px");
    }).mouseup(function(currEvent){
        $('#selector').off("mousemove");
        $(document).off("mousemove");

        //snap to box
        $('#selector').css("top",(currEvent.pageY-(currEvent.pageY%48))+"px");
        $('#selector').css("left",(currEvent.pageX-(currEvent.pageX%48))+"px");
    });
});



$(document).ready(function() {

});