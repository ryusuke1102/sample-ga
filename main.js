"use strict";

const CHRHEIGHT  = 9;
const CHRWIDTH   = 8;
const FONT       = "８px monospace"; //　使用フォント
const FONTSTYLE  = "#ffffff";
const HEIGHT     = 120;
const WIDTH      = 128;
const MAP_WIDTH  = 32;
const MAP_HEIGHT = 32;
const SMOOTH     = 0;
const START_X    = 15;
const START_Y    = 17;
const TILEROW    = 4;
const TILECOLUMN = 4;
const TILESIZE   = 8;
const WINDSTYLE  = "rgba( 0, 0, 0, 0.75 )";



let   gScreen;
let   gFrame = 0;
let   gImgMap;                             //　マップ
let   gImgPlayer;                          //プレイヤー
let   gWidth;
let   gHeight;
let   gPlayerX = START_X * TILESIZE;
let   gPlayerY = START_Y * TILESIZE;


const gFileMap = "img/map.png";
const gFilePlayer = "img/player.png";

const gMAP = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 3, 6, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 3, 6, 6, 7, 7, 7, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 6, 3, 0, 0, 0, 3, 3, 0, 6, 6, 6, 0, 0, 0,
    0, 0, 3, 3, 6, 6, 6, 7, 7, 2, 2, 2, 7, 7, 2, 2, 2, 7, 7, 6, 3, 3, 3, 6, 6, 3, 6,13, 6, 0, 0, 0,
    0, 3, 3,10,11, 3, 3, 6, 7, 7, 2, 2, 2, 2, 2, 2, 1, 1, 7, 6, 6, 6, 6, 6, 3, 0, 6, 6, 6, 0, 0, 0,
    0, 0, 3, 3, 3, 0, 3, 3, 3, 7, 7, 2, 2, 2, 2, 7, 7, 1, 1, 6, 6, 6, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 7, 7, 7, 7, 2, 7, 6, 3, 1, 3, 6, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 7, 2, 7, 6, 3, 1, 3, 3, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 0, 3, 3, 3, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 3,12, 3, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 7, 7, 6, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 6, 6, 6, 6, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 6, 6, 3, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 5, 3, 3, 3, 6, 6, 6, 3, 3, 3, 1, 1, 1, 1, 1, 3, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 8, 9, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 3, 3, 3, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0,
    7,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0,
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7,
]

function DrawMain()
{
    const  g = gScreen.getContext( "2d" );

    let     mx = Math.floor( gPlayerX / TILESIZE );
    let     my = Math.floor( gPlayerY / TILESIZE );

    for ( let dy = -7; dy <= 8; dy++){
        let     y = dy + 7;
        let    ty = my + dy;                                //　タイル座標
        let    py = ( ty + MAP_HEIGHT) % MAP_HEIGHT;        //　ループ後タイル座標Y
        for ( let dx = -8; dx <= 8; dx++){
            let    x = dx + 8;
            let   tx = mx + dx                              //　タイル座標
            let    px = ( tx + MAP_WIDTH ) % MAP_WIDTH;     //　ループ後タイル座標X
            DrawTile( g, 
                      x * TILESIZE - TILESIZE / 2, y * TILESIZE, 
                      gMAP[ py * MAP_WIDTH + px ] )
        }
    }

    g.fillStyle = "#ff0000"
    g.fillRect( 0, HEIGHT / 2 - 1, WIDTH, 2 );
    g.fillRect( WIDTH / 2 -1, 0, 2, HEIGHT );

    g.drawImage(gImgPlayer,
                CHRWIDTH, 0, CHRWIDTH, CHRHEIGHT, 
                WIDTH / 2 - CHRWIDTH / 2, HEIGHT / 2 - CHRHEIGHT + TILESIZE / 2, CHRWIDTH, CHRHEIGHT );

    g.fillStyle = WINDSTYLE;
    g.fillRect( 20, 103, 105, 15 );


    g.font   = FONT;
    g.fillStyle = FONTSTYLE;
    g.fillText( "x=" + gPlayerX + " y=" + gPlayerY + " m=" + gMAP[ my * MAP_WIDTH + mx ], 25, 115 ); 
}

function DrawTile ( g, x, y, idx )
{
    const       ix = ( idx % TILECOLUMN ) * TILESIZE;
    const       iy = Math.floor( idx / TILECOLUMN ) * TILESIZE;
    g.drawImage( gImgMap, ix, iy, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE )

}

function WmPaint()
{

    DrawMain();
    const ca  = document.getElementById( "main" );
    const g  = ca.getContext( "2d" );
    
    g.drawImage( gScreen, 0 ,0, gScreen.width, gScreen.height, 0,0, gWidth, gHeight );
    
}

function WmSize(){
    const ca  = document.getElementById( "main" );
    ca.width  = window.innerWidth;
    ca.height = window.innerHeight;

    const g  = ca.getContext( "2d" );
    g.imageSmoothingEnabled = g.msImageSmoothingEnabled = SMOOTH;      //　補間処理

    //　実画面サイズ計測。ドットのアスペクト比を維持したままでの最大サイズを計測する
    gWidth  = ca.width;
    gHeight = ca.height;
    if( gWidth / WIDTH < gHeight / HEIGHT){
        gHeight = gWidth * HEIGHT / WIDTH;
    }else{
        gWidth = gHeight * WIDTH / HEIGHT;
    }
}

function WmTimer ()
{
    gFrame++;
    WmPaint();
}

// 　キー入力のイベント
window.onkeydown = function( ev )
{
    let     c = ev.keyCode;

    if( c == 37 )   gPlayerX--;
    if( c == 38 )   gPlayerY--;
    if( c == 39 )   gPlayerX++;
    if( c == 40 )   gPlayerY++;

    //　マップループ処理
    gPlayerX += MAP_WIDTH * TILESIZE;
    gPlayerX %= MAP_WIDTH * TILESIZE;
    gPlayerY += MAP_HEIGHT * TILESIZE;
    gPlayerY %= MAP_HEIGHT * TILESIZE;

}


window.onload = function()
{
    gImgMap        = new Image(); gImgMap.src = gFileMap;
    gImgPlayer     = new Image(); gImgPlayer.src = gFilePlayer;

    gScreen        = document.createElement( "canvas" );
    gScreen.width  = WIDTH;
    gScreen.height = HEIGHT;


    WmSize();
    window.addEventListener( "resize", function() { WmSize() });
    setInterval( function() { WmTimer() }, 33);   //３３秒間隔で関数を呼び出すよう指示 30.3fps
}