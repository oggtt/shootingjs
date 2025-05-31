const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");

const imgBack = new Image();
const imgEnemy = new Image();
const imgShip = new Image();

imgBack.src = "back.png";
imgEnemy.src = "enemy.png";
imgShip.src = "ship.png";

let imgEnemyLoaded = true; // 敵の表示状態を管理

// 画像の描画
function drawScene() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); // キャンバスをクリア
    ctx.drawImage(imgBack, 0, 0, myCanvas.width, myCanvas.height);
    
    if (imgEnemyLoaded) {
        ctx.drawImage(imgEnemy, 250, 100);
    }

    ctx.drawImage(imgShip, 250, 300);
}

// 画像のロードが完了したら描画
imgBack.onload = drawScene;
imgShip.onload = drawScene;
imgEnemy.onload = drawScene;

// ビームを描画し、一定時間後に消去
function drawLaser(x, y) {
    ctx.strokeStyle = "yellow";  // ビームの色
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(275, 300);  // Shipの位置
    ctx.lineTo(x, y);      // クリックした位置まで線を引く
    ctx.stroke();

    // 200ミリ秒後にビームを消す
    setTimeout(() => {
        drawScene();
    }, 200);
}

// 敵を削除する関数
function func_del() {
    imgEnemyLoaded = false; // 敵の表示フラグをオフ
    drawScene(); // 背景を再描画して敵を削除
}

// クリックイベント
myCanvas.addEventListener("click", (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    // クリック位置が敵の範囲内なら削除
    if (imgEnemyLoaded && x >= 250 && x <= 250 + imgEnemy.width &&
        y >= 100 && y <= 100 + imgEnemy.height) {
        func_del();
    }

    // ビームを描画
    drawLaser(x, y);
}, false);