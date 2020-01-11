"use strict";

var TUG = TUG || {}

TUG.onTimer = function(){

}

TUG.init = function()
{
    setInterval( function() { TUG.WmTimer() }, 33 );

}

TUG.Sign = function( val )
{
    if( val == 0){
        return( 0 );
    }
    if( val < 0 ){
        return( -1 );
    }
    else{
        return( 1 );  
    }
}


TUG.WmTimer = function()
{
    TUG.onTimer();
}