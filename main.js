"use strict";

const CHRHEIGHT  = 9;
const CHRWIDTH   = 8;
const FONT       = "８px monospace";                           //　使用フォント
const FONTSTYLE  = "#ffffff";
const HEIGHT     = 120;
const WIDTH      = 128;
const MAP_WIDTH  = 32;
const MAP_HEIGHT = 32;
const SCR_WIDTH  = 8;
const SCR_HEIGHT = 8;
const SMOOTH     = 0;
const START_X    = 15;
const START_Y    = 17;
const TILEROW    = 4;
const TILECOLUMN = 4;
const TILESIZE   = 8;
const WINDSTYLE  = "rgba( 0, 0, 0, 0.75 )";

const gKey = new Uint8Array( 0x100 )

let   gAngle = 0;                                               //　プレイヤーの向き
let   gFrame = 0;                                               //　内部カウンタ
let   gImgMap;                                                  //　マップ画像
let   gImgPlayer;                                               //　プレイヤー画像
let   gHeight;                                                  //　実画面の高さ
let   gWidth;                                                   //　実画面の幅
let   gMoveX = 0;                                               //　移動量
let   gMoveY = 0;                                               //　移動量
let   gPlayerX = START_X * TILESIZE + TILESIZE / 2;             //　プレイヤー開始位置X
let   gPlayerY = START_Y * TILESIZE + TILESIZE / 2;             //　プレイヤー開始位置Y
let   gScreen;                                                  //　仮想画面



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

    let     mx = Math.floor( gPlayerX / TILESIZE );         //　プレイヤーのタイル座標X
    let     my = Math.floor( gPlayerY / TILESIZE );         //　プレイヤーのタイル座標Y

    for ( let dy = -SCR_HEIGHT; dy <= SCR_WIDTH; dy++){
        let    ty = my + dy;                                //　タイル座標
        let    py = ( ty + MAP_HEIGHT) % MAP_HEIGHT;        //　ループ後タイル座標Y
        for ( let dx = -SCR_WIDTH; dx <= SCR_WIDTH; dx++){
            let   tx = mx + dx                              //　タイル座標
            let    px = ( tx + MAP_WIDTH ) % MAP_WIDTH;     //　ループ後タイル座標X
            DrawTile( g, 
                     // x                                * TILESIZE, 
                     // ( tx + 8 - gPlayerX / TILESIZE ) * TILESIZE, 
                     //  ( tx + 8 ) * TILESIZE - gPlayerX,
                     //   tx * TILESIZE + 8 * TILESIZE - gPlayerX,
                        tx * TILESIZE + WIDTH / 2 - gPlayerX,

                     // y                                * TILESIZE, 
                     // ( ty + 7 - gPlayerY / TILESIZE ) * TILESIZE, 
                     //   ( ty + 7 ) * TILESIZE - gPlayerY,
                     //   ty * TILESIZE + 7 * TILESIZE - gPlayerY,
                        ty * TILESIZE + HEIGHT / 2 - gPlayerY,

                      gMAP[ py * MAP_WIDTH + px ] );
        }
    }


    //　プレイヤーの描画
    g.drawImage(gImgPlayer,
                ( gFrame >> 4 & 1 ) * CHRWIDTH, gAngle * CHRHEIGHT, CHRWIDTH, CHRHEIGHT, 
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
    g.drawImage( gImgMap, ix, iy, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE );
}

//　フィールド進行処理
function TickField()
{
    if( gMoveX !=0 || gMoveY !=0 ){}                //移動中の場合
    else if( gKey[ 37 ] ) { gAngle = 1;  gMoveX = -TILESIZE; }
    else if( gKey[ 38 ] ) { gAngle = 3;  gMoveY = -TILESIZE; }
    else if( gKey[ 39 ] ) { gAngle = 2;  gMoveX =  TILESIZE; }
    else if( gKey[ 40 ] ) { gAngle = 0;  gMoveY =  TILESIZE; }

    //　移動後のタイル座標判定
    let     mx = Math.floor( ( gPlayerX + gMoveX ) / TILESIZE ); //　タイル座標X
    let     my = Math.floor( ( gPlayerY + gMoveY ) / TILESIZE ); //　タイル座標Y
    mx += MAP_WIDTH;
    mx %= MAP_WIDTH;
    my += MAP_HEIGHT;
    my %= MAP_HEIGHT;
    let     m = gMAP[ my * MAP_WIDTH + mx ];                     //　タイル番号
    if( m < 3 ) {
        gMoveX = 0;
        gMoveY = 0;
    }                                               // 侵入不可地形の場合


    gPlayerX += Math.sign( gMoveX );                // プレイヤー座標移動X
    gPlayerY += Math.sign( gMoveY );                // プレイヤー座標移動Y
    gMoveX   -= Math.sign( gMoveX );                // 移動量消費X
    gMoveY   -= Math.sign( gMoveY );                // 移動量消費Y

    //　マップループ処理
    gPlayerX += MAP_WIDTH * TILESIZE;
    gPlayerX %= MAP_WIDTH * TILESIZE;
    gPlayerY += MAP_HEIGHT * TILESIZE;
    gPlayerY %= MAP_HEIGHT * TILESIZE;
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
    TickField();

}

// 　キー入力のイベント
window.onkeydown = function( ev )
{
    let     c = ev.keyCode;

    gKey[ c ] = 1;

}

//　キー入力(UP)イベント
window.onkeyup = function( ev )
{
    gKey[ ev.keyCode ] = 0;
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