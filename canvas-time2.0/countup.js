var WINDOW_WIDTH = 1224;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2016,11,24,18,46,50);
var curShowTimeSeconds = 0

window.onload = function(){

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds()
    setInterval(
        function(){
            render(context);
            update();
        }
        ,
        50
    );
}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = curTime.getTime() - endTime.getTime();
    ret = Math.round( ret/1000 )

    return ret >= 0 ? ret : 0;
}

function update(){
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 )
    var nextSeconds = nextShowTimeSeconds % 60

    var curHours = parseInt( curShowTimeSeconds / 3600);
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 )
    var curSeconds = curShowTimeSeconds % 60 

    if(nextSeconds != curSeconds){

        curShowTimeSeconds = nextShowTimeSeconds;
    }   
}

function render( cxt ){

    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    var years = parseInt(curShowTimeSeconds/3600/24/30/12)
    var months = parseInt(curShowTimeSeconds/3600/24/30%12)
    var days = parseInt( curShowTimeSeconds/3600/24%30)
    var hours = parseInt( curShowTimeSeconds / 3600%24);
    var minutes = parseInt( (curShowTimeSeconds - years*12*30*24*3600 -months *30*24*3600-days*24*3600 - hours * 3600)/60)
    var seconds = curShowTimeSeconds % 60


    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(years/10) , cxt )
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(years%10) , cxt )

    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(months/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(months%10) , cxt);

    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(days/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(days%10) , cxt);

    renderDigit( MARGIN_LEFT + 108*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 117*(RADIUS+1) , MARGIN_TOP , parseInt(hours/10) , cxt);
    renderDigit( MARGIN_LEFT + 132*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt);

    renderDigit( MARGIN_LEFT + 147*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 156*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 171*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);

    renderDigit( MARGIN_LEFT + 186*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 195*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 210*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

}

function renderDigit( x , y , num , cxt ){

    cxt.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath()

                cxt.fill()
            }
}

