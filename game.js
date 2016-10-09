/**
* 三目並べ
*/
var count = 0;
var playable = true;

var clickMe = function(e) {
  if (!playable) {
    document.getElementById("alert").textContent = "ゲームは終了しています";
    return 0;
  }
  var player;
  var nextplayer;
  if (e.textContent == "○" || e.textContent == "×") {
    document.getElementById("alert").textContent = "既に入力されています";
    return 0;
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
  e.target.textContent = e.textContent;

  // 三つそろっているかを調べる
  var parent_tr = e.target.parentNode;
  var xindex = Array.prototype.indexOf.call(parent_tr.cells, e.target);
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
  if (parent_tr.cells[0].textContent == e.textContent &&
    parent_tr.cells[1].textContent == e.textContent &&
    parent_tr.cells[2].textContent == e.textContent
  ) {
    win = true;
  }

  // 斜めがそろっているかを調べる
  if (
    (parent_table.children.item(0).children.item(0).textContent == e.textContent &&
    parent_table.children.item(1).children.item(1).textContent == e.textContent &&
    parent_table.children.item(2).children.item(2).textContent == e.textContent )
    ||
    (parent_table.children.item(0).children.item(2).textContent == e.textContent &&
    parent_table.children.item(1).children.item(1).textContent == e.textContent &&
    parent_table.children.item(2).children.item(0).textContent == e.textContent )
  ){
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

var clickElements = document.getElementsByClassName("cell");
for (var i = 0; i < clickElements.length; i++) {
  clickElements[i].addEventListener('click', clickMe, false);
}
