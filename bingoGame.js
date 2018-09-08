window.addEventListener('load', eventWindowLoaded, false);	
function eventWindowLoaded() {

	canvasApp();
	
}

function canvasSupport () {
  	return Modernizr.canvas;
}


function canvasApp() {
	window.addEventListener("mousedown", mouseDownFunction, false);

	if (!canvasSupport()) {
			 return;
  	}
  	else {
	    var theCanvas = document.getElementById('canvas');
	    var context = theCanvas.getContext('2d');
	    var resetCanvas = document.getElementById('resetButton');
	    var resetContext = resetCanvas.getContext('2d');
	}

	var tileArray = [];

	const tileHeight = theCanvas.height / 5;
 	const tileWidth = theCanvas.width / 5;

	initBoard();
	drawResetButton();
	gameLoop();

	function gameLoop() {
		drawBoard();

		window.setTimeout(gameLoop, 1);
	}

	function initBoard() {
		for (var yCount = 0; yCount < 5; yCount++) {
			for (var xCount = 0; xCount < 5; xCount++) {
				var newTileX = xCount * tileWidth + (tileWidth / 2);
				var newTileY = yCount * tileHeight + (tileHeight / 2);
				var newTile = new Tile(newTileX, newTileY, "Insert Text Here");
				tileArray.push(newTile);
			}
		}
	}

	function drawResetButton() {
		resetContext.beginPath();

		resetContext.fillStyle = "black";
		resetContext.font = "20pt Arial";

		resetContext.fillText("Reset", 110, 60);
	}

 	function drawBoard() {
 		context.beginPath();
 		//context.lineWidth = 5;
 		context.clearRect(0, 0, theCanvas.width, theCanvas.height);

 		// context.strokeStyle = "black";
 		// context.rect(4, 4, theCanvas.width - 2, theCanvas.height - 2);
 		// context.stroke();

 		context.lineWidth = 1;

		for (var tileIndex = 0; tileIndex < 25; tileIndex++) {
			context.fillStyle = 'rgb(128, 128, 128)';
			var tileX = tileArray[tileIndex].xCenter - (tileWidth / 2);
			var tileY = tileArray[tileIndex].yCenter - (tileHeight / 2);
			if (tileArray[tileIndex].marked) {
				context.fillRect(tileX, tileY, tileWidth, tileHeight);
			}
			context.rect(tileX, tileY, tileWidth, tileHeight);
			context.stroke();

			context.save();

			context.fillStyle = "black";
 			context.font = "10pt Arial";

			context.fillText(tileArray[tileIndex].text, tileArray[tileIndex].xCenter - tileWidth / 4.5, tileArray[tileIndex].yCenter);
			
			context.restore();
		}
	}

 	function getRandomColor() {
 		var i = getRandomInt(0, 6);

 		switch (i) {
 			case 0 :
 				return 'rgb(0, 0, 0)';

 			case 1 :
 				return 'rgb(255, 255, 255)';

 			case 2 :
 				return 'rgb(255, 0, 0)';

 			case 3 :
 				return 'rgb(0, 255, 0)';

 			case 4 :
 				return 'rgb(0, 0, 255)';

 			case 5 :
 				return 'rgb(255, 0, 255)';

 			case 6 :
 				return 'rgb(0, 255, 255)';
 		}
 	}

	function mouseDownFunction(e) {
		// var point = new Vector3(e.pageX, e.pageY, 0.0);
		// for (var count = 0; count < polygonList.length; count++) {
		// 	if (pointInPolygon(polygonList[count].vert, polygonList[count].sides, point)) {
		// 		polygonList.splice(count, 1);
		// 		playerScore++;
		// 		return;
		// 	}
		// }
		var gameRect = theCanvas.getBoundingClientRect();
		var resetRect = resetCanvas.getBoundingClientRect();

		if (e.clientX > gameRect.right || e.clientX < gameRect.left || e.clientY > gameRect.bottom || e.clientY < gameRect.top) {
			if (e.clientX < resetRect.right && e.clientX > resetRect.left && e.clientY > resetRect.top && e.clientY < resetRect.bottom) {
				resetButtonClicked();
			}
		}
		else {
			markTile(e.clientX - gameRect.left, e.clientY - gameRect.top);
		}
	}

	function resetButtonClicked() {
		for (var index = 0; index < 25; index++) {
			tileArray[index].marked = false;
		}
	}

	function markTile(xPos, yPos) {
		if (xPos < 0 || xPos > theCanvas.width || yPos < 0 || yPos > theCanvas.height) {
			return;
		}

		var tileIndexX = Math.floor(xPos / tileWidth);
		var tileIndexY = Math.floor(yPos / tileHeight);

		var pickedTile = tileArray[tileIndexY * 5 + tileIndexX];

		pickedTile.marked = !pickedTile.marked;
	}
}

class Tile {
 	constructor(xCenter, yCenter, text) {
 		this.xCenter = xCenter;
 		this.yCenter = yCenter;
 		this.text = text;
 		this.marked = false;
 	}
}
