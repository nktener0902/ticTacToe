/**
 * 三目並べ
 */
var count = 0;
var playable = true;

function clickMe(e) {
    if (!playable) {
        document.getElementById("alert").textContent = "ゲームは終了しています";
        return 0;
    }
    var player;
    var nextplayer;
    if (e.textContent == "○" || e.textContent == "×") {
        document.getElementById("alert").textContent = "既に入力されています";
        return 0;
    } else {
        document.getElementById("alert").textContent = "";
    }
    if (count % 2 == 0) {
        player = "先攻";
        nextplayer = "後攻";
        e.textContent = "○";
    } else {
        player = "後攻";
        nextplayer = "先攻";
        e.textContent = "×";
    }

    // TODO 三つそろっているかを調べる
    var parent_tr = e.parentNode;
    var firstChild = parent_tr.firstElementChild;
    var xindex;
    xindex = Array.prototype.indexOf.call(parent_tr.children, e);
    var parent_table = parent_tr.parentNode;

    // 縦の列がそろっているかを調べる
    var matchX = true;
    for (var i = 0; i < parent_table.children.length; i++) {
        if (parent_table.children.item(i).children.item(xindex).textContent != e.textContent) {
            matchX = false;
        }
    }
    var win = false;
    if (matchX) {
        win = true;
    }

    // 横の列がそろっているかを調べる
    if (firstChild.textContent == e.textContent &&
        firstChild.nextElementSibling.textContent == e.textContent &&
        firstChild.nextElementSibling.nextElementSibling.textContent == e.textContent
    ) {
        win = true;
    }

    // 縦/横がそろっていた場合の処理（試合終了時の処理）
    if (win) {
        document.getElementById("message").textContent = player + " の勝ち";
        playable = false;
        document.getElementById("console").textContent = "ゲーム終了";
        return 0;
    }
    document.getElementById("console").textContent = nextplayer + "の番です";
    count++;
}
