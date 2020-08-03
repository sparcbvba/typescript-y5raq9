// Import stylesheets
import "./style.css";

class Game {
  _tiles: Tiles;

  constructor() {
    this._tiles = new Tiles("app");
  }
}

class Tiles {
  _canvas: string;
  _map: number[][];
  _tileGraphics = [];
  _settings = {
    x: 100,
    y: 100
  };

  constructor(canvas: string) {
    this._canvas = canvas;
    this._init();
  }
  // Our init function contains all our code and will be called via the onLoad attribute in the <body> tag of our HTML page.
  private _init() {
    // The two dimensional map array as it sounds is basically your world and what will be drawn.
    // Each number can represet a different graphic or possible enviroment interaction.
    // In this tutorial case we only have two possible tiles, zero which is blank and one which is filled.
    // Two Dimensional Array storing our isometric map layout. Each number represents a tile.
    //this._map = [[1, 0, 0, 0], [1, 0, 0, 1], [0, 0, 1, 1], [1, 0, 1, 1]];
    this._randomizeMap();

    // The next part grabs the canvas element id of 'main' within our page <body>.

    // Using two for loops we run through each of the array rows stored and their element values.
    // for (var i = 0; i < this._map.length; i++) {
    //   for (var j = 0; j < this._map[i].length; j++) {
    //     // Check if the value is a 1, represeting a graphic should be drawn.
    //     if (this._map[i][j] === 1) {
    //       // Draw a rectangle at i & j position * 20 pixels so that
    //       // our 20x20 pixel squares are correctly positioned.
    //       ctx.fillStyle = "#FF0000";
    //       ctx.fillRect(j * 20, i * 20, 20, 20);
    //     }
    //   }
    // }

    // Remove Event Listener and load images.
    this._loadImg();
  }

  private _randomizeMap() {
    this._map = [];
    for (var i = 0; i < this._settings.y; i++) {
      this._map[i] = new Array(10);
      for (var j = 0; j < this._settings.x; j++) {
        this._map[i][j] = Math.random() > 0.1 ? 1 : 0;
      }
    }
  }

  private _loadImg() {
    // Images to be loaded and used.
    // Tutorial Note: As water is loaded first it will be represented by a 0 on the map and land will be a 1.
    var tileGraphicsToLoad = [
        "https://jsiso.com/tutorials/images/water.png",
        "https://jsiso.com/tutorials/images/land.png"
      ],
      tileGraphicsLoaded = 0;
    const that = this;

    for (var i = 0; i < tileGraphicsToLoad.length; i++) {
      this._tileGraphics[i] = new Image();
      this._tileGraphics[i].src = tileGraphicsToLoad[i];
      console.log(this._tileGraphics[i].src);
      this._tileGraphics[i].onload = function() {
        // Once the image is loaded increment the loaded graphics count and check if all images are ready.
        tileGraphicsLoaded++;
        if (tileGraphicsLoaded === tileGraphicsToLoad.length) {
          that._drawMap();
        }
      };
    }
  }

  private _drawMap() {
    // create the canvas context
    var canvasElement: any = document.getElementById(this._canvas);
    var ctx = canvasElement.getContext("2d");

    // Set as your tile pixel sizes, alter if you are using larger tiles.
    var tileH = 25;
    var tileW = 52;

    // mapX and mapY are offsets to make sure we can position the map as we want.
    var mapX = this._settings.x * tileH;
    var mapY = tileH;

    canvasElement.width = mapX * 2.2;
    canvasElement.height = (tileH * this._settings.y) + tileH * 2;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

    var drawTile;

    // loop through our map and draw out the image represented by the number.
    for (var i = 0; i < this._map.length; i++) {
      for (var j = 0; j < this._map[i].length; j++) {
        drawTile = this._map[i][j];
        // Draw the represented image number, at the desired X & Y coordinates followed by the graphic width and height.
        ctx.drawImage(
          this._tileGraphics[drawTile],
          (i - j) * tileH + mapX,
          ((i + j) * tileH) / 2 + mapY
        );
      }
    }
  }
}

const game = new Game();
