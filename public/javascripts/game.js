/**
* 三目並べ
*/
var count = 0;
var playable = true;

var clickMe = function(e) {
  if (!playable) {
    document.getElementById("alert").textContent = "This game has already been over.";
    return 0;
  }
  var player;
  var nextplayer;
  if (e.textContent == "○" || e.textContent == "×") {
    document.getElementById("alert").textContent = "It's not a blank cell.";
    return 0;
  }
  if (count % 2 == 0) {
    player = "First player";
    nextplayer = "Second player";
    e.textContent = "○";
  } else {
    player = "Second player";
    nextplayer = "First player";
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
    document.getElementById("message").textContent = player + " won!";
    var button_element = document.createElement('button');
    button_element.type = "button";
    button_element.classList.add('btn');
    button_element.classList.add('btn-lg');
    button_element.classList.add('btn-primary');
    button_element.textContent = 'Next game';
    playable = false;
    document.getElementById("console").textContent = "Game over";
    addButton(parent_table);
    return 0;
  }
  if (count == 8){
    document.getElementById("message").textContent = "Draw!";
    // Button to go to next game.
    addButton(parent_table);
    playable = false;
    document.getElementById("console").textContent = "Game over";
    return 0;
  }else{
    document.getElementById("console").textContent = "Next is " + nextplayer + ".";
    count++;
  }
}

var clickElements = document.getElementsByClassName("cell");
for (var i = 0; i < clickElements.length; i++) {
  clickElements[i].addEventListener('click', clickMe, false);
}

// Button to go to next game.
function addButton(parent_table){
  var button_element = document.createElement('button');
  button_element.type = "button";
  button_element.id = "nextButton";
  button_element.classList.add('btn');
  button_element.classList.add('btn-lg');
  button_element.classList.add('btn-primary');
  button_element.textContent = 'Next game';
  button_element.addEventListener('click', function(){
    count = 0;
    playable = true;
    document.getElementById("console").textContent = "Next is First player.";
    document.getElementById("message").textContent = "";
    document.getElementById("alert").textContent = "";
    var removeButton = document.getElementById("nextButton");
    removeButton.parentNode.removeChild(removeButton);
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
        parent_table.children.item(i).children.item(j).textContent = "";
      }
    }
  }, false);
  document.getElementById("message").parentNode.appendChild(button_element);
}

var logout_button = document.getElementById('logout_button');
logout_button.addEventListener('click',
  function(){
    location.href = '/logout';
  }, false);
