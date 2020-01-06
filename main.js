"use strict";

const CHRHEIGHT  = 9;                                           //　キャラの高さ
const CHRWIDTH   = 8;                                           //　キャラの幅
const FONT       = "10px monospace";                            //　使用フォント
const FONTSTYLE  = "#ffffff";                                   //　文字色
const HEIGHT     = 120;                                         //　仮装画面サイズ　高さ
const WIDTH      = 128;                                         //　仮装画面サイズ　幅
const INTERVAL   = 33;                                          //　フレーム呼び出し間隔　
const MAP_WIDTH  = 32;                                          //　マップ高さ                                       
const MAP_HEIGHT = 32;                                          //　マップ幅
const SCR_WIDTH  = 8;
const SCR_HEIGHT = 8;
const SCROLL     = 1;                                           //　スクロール速度
const SMOOTH     = 0;
const START_HP   = 20;
const START_X    = 15;
const START_Y    = 17;
const TILEROW    = 4;
const TILECOLUMN = 4;
const TILESIZE   = 8;
const WINDSTYLE  = "rgba( 0, 0, 0, 0.75 )";

const gKey = new Uint8Array( 0x100 )

let   gAngle  = 0;                                              //　プレイヤーの向き
let   gEx     = 0;                                              //　経験値
let   gHP     = START_HP;                                       //　初期HP
let   gMHP    = START_HP;                                       //　最大HP 
let   gLv     = 1;                                              //　プレイヤーレベル
let   gCursor = 0;                                              //　カーソル位置
let   gEnemyType;                                               //　敵種別
let   gFrame  = 0;                                              //　内部カウンタ
let   gImgMap;                                                  //　マップ画像
let   gImgPlayer;                                               //　プレイヤー画像
let   gImgMonster;                                              //　モンスター画像
let   gHeight;                                                  //　実画面の高さ
let   gWidth;                                                   //　実画面の幅
let   gMessage1 = null;                                         //　メッセージ１行目
let   gMessage2 = null;                                         //　メッセージ２行目
let   gMoveX    = 0;                                            //　移動量
let   gMoveY    = 0;                                            //　移動量
let   gItem     = 0;                                            //　所持アイテム 
let   gPhase    = 0;                                            //　戦闘フェーズ
let   gPlayerX  = START_X * TILESIZE + TILESIZE / 2;            //　プレイヤー開始位置X
let   gPlayerY  = START_Y * TILESIZE + TILESIZE / 2;            //　プレイヤー開始位置Y
let   gScreen;                                                  //　仮想画面



const gFileMap      = "img/map.png";
const gFileMonster  = "img/monster.png"
const gFilePlayer   = "img/player.png";

const gEncounter = [ 0, 0, 0, 1, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0 ];

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

//　戦闘行動処理
function Action()
{
    gPhase++;                                           // フェーズ経過

    if( gPhase == 3 ){
        SetMessage( "敵の攻撃！", "999のダメージ" );
        return;
    }

    if( gCursor == 0 ){                                 //　戦う選択時
        SetMessage( "あなたの攻撃", "333のダメージ" );
    return;
    }

    SetMessage( "あなたは逃げ出した", null );

}

//　経験値加算
function AddExp( val )
{
    gEx += val;                                         //　経験値加算
    while( gLv * ( gLv + 1 ) * 2 <= gEx ){              //　必要経験値条件分岐
        gLv++;
        gMHP += 4 + Math.floor( Math.random() * 3 );
    }
}

//　戦闘画面描画処理
function DrawFight( g )
{
    g.fillStyle = "#000000";                            //　背景色
    g.fillRect( 0, 0, WIDTH, HEIGHT );                  //　画面全体を矩形描画

    let     w = gImgMonster.width / 4
    let     h = gImgMonster.height;

    g.drawImage( gImgMonster, gEnemyType * w, 0, w, h,  Math.floor( WIDTH / 2 - w / 2 ), Math.floor( HEIGHT / 2 - h / 2 ), w, h );  //　

    DrawMessage( g );                                   //　メッセージ描画
    DrawStatus( g );                                    //　ステータス描画

    if( gPhase == 2){                                   //　戦闘フェーズがコマンド選択中の場合
        g.fillText( "➡︎", 6, 96 + 14 * gCursor );
    }
} 

//　フィールド描画処理
function DrawMap( g )
{

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

    //　ステータスウィンドウ
    g.fillStyle = WINDSTYLE;                            //　ウインドウのいろ
    g.fillRect( 2, 2, 44, 37 );                         //　矩形描画

    DrawMessage( g );                                   //　メッセージ描画
    DrawStatus( g );                                    //　ステータス描画



}

function DrawMain()
{
    const  g = gScreen.getContext( "2d" );

    if( gPhase == 0 ){
        DrawMap( g );                                   //　フィールド画面描画
    }else{
        DrawFight( g );
    }
    /*
    g.fillStyle = WINDSTYLE;                            //　ウインドウのいろ
    g.fillRect( 20, 3, 105, 15 );                       //　矩形描画

    g.font   = FONT;
    g.fillStyle = FONTSTYLE;
    g.fillText( "x=" + gPlayerX + " y=" + gPlayerY + " m=" + gMAP[ my * MAP_WIDTH + mx ], 22, 15 ); 
    */
}

//　メッセージ描画
function DrawMessage( g )
{
    if( !gMessage1 ){                                   //　メッセージが存在しない場合の処理
        return;
    }

    g.fillStyle = WINDSTYLE;                            //　ウインドウのいろ
    g.fillRect( 4, 84, 120, 30 );                       //　矩形描画

    g.font   = FONT;
    g.fillStyle = FONTSTYLE;

    g.fillText( gMessage1, 6, 96 );
    if( gMessage2 ){
    g.fillText( gMessage2, 6, 110 );

    
}
}

//　ステータス描画
function DrawStatus ( g ){
    g.font   = FONT;
    g.fillStyle = FONTSTYLE;
    g.fillText( "Lv " + gLv, 4, 13 );
    g.fillText( "HP " + gHP, 4, 25 );
    g.fillText( " /" + gMHP, 30, 25 )
    g.fillText( "Ex " + gEx, 4, 37 );
}

function DrawTile ( g, x, y, idx )
{
    const       ix = ( idx % TILECOLUMN ) * TILESIZE;
    const       iy = Math.floor( idx / TILECOLUMN ) * TILESIZE;
    g.drawImage( gImgMap, ix, iy, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE );
}

function LoadImage(){
    gImgMap        = new Image(); gImgMap.src = gFileMap;
    gImgMonster    = new Image(); gImgMonster.src = gFileMonster;       //　モンスター画像読み込み
    gImgPlayer     = new Image(); gImgPlayer.src = gFilePlayer;
}



// function SetMessage ( v1, v2 = null)                 IE対応してない
function SetMessage ( v1, v2 ){
    gMessage1 = v1;
    gMessage2 = v2;
}


function Sign( val )
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


//　フィールド進行処理
function TickField()
{
    if( gMoveX !=0 || gMoveY !=0 || gMessage1 ){}                             //移動中またはメッセージ表示中の場合
    else if( gKey[ 37 ] ) { gAngle = 1;  gMoveX = -TILESIZE; }
    else if( gKey[ 38 ] ) { gAngle = 3;  gMoveY = -TILESIZE; }
    else if( gKey[ 39 ] ) { gAngle = 2;  gMoveX =  TILESIZE; }
    else if( gKey[ 40 ] ) { gAngle = 0;  gMoveY =  TILESIZE; }

    //　移動後のタイル座標判定
    let     mx = Math.floor( ( gPlayerX + gMoveX ) / TILESIZE );              //　タイル座標X
    let     my = Math.floor( ( gPlayerY + gMoveY ) / TILESIZE );              //　タイル座標Y
    mx += MAP_WIDTH;
    mx %= MAP_WIDTH;
    my += MAP_HEIGHT;
    my %= MAP_HEIGHT;
    let     m = gMAP[ my * MAP_WIDTH + mx ];                     //　タイル番号
    if( m < 3 ) {
        gMoveX = 0;
        gMoveY = 0;
    }                                                               // 侵入不可地形の場合

    if( Math.abs( gMoveX ) + Math.abs( gMoveY ) == SCROLL ){        //　マス目移動が終わる直前
    if( m == 8 || m == 9 ){                                         //　城
        gHP = gMHP;                                                 //　HP全回復の処理
        SetMessage( "魔王を倒して！", null );   
    }

    if( m == 10 || m == 11 ){                                       //　街
        SetMessage( "西の果てにも", "村があります" );
    }

    if( m == 12 ){                                                  //　村
        SetMessage( "カギは", "洞窟にあります" );
    }

    if( m == 13 ){                                       　　　　　　　//　洞窟
        gItem = 1;                                                  //カギ入手
        SetMessage( "カギを手に入れた", null );
    }

    if( m == 14 ){                                                  //　扉
        if( gItem == 0 ){
        gPlayerY -= TILESIZE;                                       //　ひとマス上で移動
        SetMessage( "カギが必要です", null );
        }else{
        SetMessage( "扉が開いた", null );
    }                 　　　　　　　
}

    if( m == 15 ){                                     　　　　　　　  //　ボス
        SetMessage( "魔王を倒し", "世界に平和が訪れた"  );
    }

    if( Math.random() * 4 < gEncounter[ m ]) {                       //　ランダムエンカウント
        gPhase = 1;                                                  //　敵出現フェイズ
        gEnemyType = 1;                                               //　敵種別
        SetMessage( "敵が現れた！", null );
    }

}

    gPlayerX += Sign( gMoveX ) * SCROLL;       // プレイヤー座標移動X
    gPlayerY += Sign( gMoveY ) * SCROLL;       // プレイヤー座標移動Y
    gMoveX   -= Sign( gMoveX ) * SCROLL;       // 移動量消費X
    gMoveY   -= Sign( gMoveY ) * SCROLL;       // 移動量消費Y

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

// 　キー入力(Down)イベント
window.onkeydown = function( ev )
{
    let     c = ev.keyCode;

    if( gKey[ c ] != 0){               //　既に押下中の場合（キーリピート）
        return;
    }
    gKey[ c ] = 1;

    if( gPhase == 1){                  //　敵が現れた場合
        gPhase = 2;                    //　戦闘コマンド選択フェーズ
        SetMessage( "　　　戦う", "　　　逃げる" );
        return;
    }

    if( gPhase == 2 ){
        if( c == 13 || c == 90 ){
            Action();                   //　戦闘行動処理
        }else{
        gCursor = 1 - gCursor;          //　カーソル移動
        }
    return;
    }   

    if( gPhase == 3){
        Action();
        return;
    }

    if( gPhase == 4 ){
        gPhase = 0;
        gHP -= 5;
        AddExp( gEnemyType + 1 );
    }


    gMessage1 = null;

}

//　キー入力(UP)イベント
window.onkeyup = function( ev )
{
    gKey[ ev.keyCode ] = 0;

}


window.onload = function()
{

    LoadImage();

    gScreen        = document.createElement( "canvas" );
    gScreen.width  = WIDTH;
    gScreen.height = HEIGHT;


    WmSize();
    window.addEventListener( "resize", function() { WmSize() });
    setInterval( function() { WmTimer() }, INTERVAL);   //３３秒間隔で関数を呼び出すよう指示 30.3fps
}