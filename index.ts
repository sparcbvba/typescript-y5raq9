// Import stylesheets
import "./style.css";

class Game {
  _tiles: Map;

  constructor() {
    this._tiles = new Map("app");
  }
}

class Tile {
  _ctx;
  _position = {
    x: 0,
    y: 0
  };
  _mapX: number;
  _mapY: number;
  _image: any;
  _width: number = 52;
  _height: number = 25;

  constructor(ctx, x, y, mapX, mapY, imageEl) {
    this._image = imageEl;
    this._ctx = ctx;
    this._mapX = mapX;
    this._mapY = mapY;
    this._position = {
      x: x,
      y: y
    };
  }

  render() {
    this._ctx.drawImage(
      this._image,
      (this._position.x - this._position.y) * this._height + this._mapX,
      ((this._position.x + this._position.y) * this._height) / 2 + this._mapY
    );
  }

  click() {
    console.log('tile clicked', this._mapX, this._mapY);
  }
}

class Map {
  _canvasElement: any;
  _ctx: any;
  _map: number[][];
  _tileGraphics: any[] = [];
  _settings = {
    x: 10,
    y: 10
  };
  _mapX: number;
  _mapY: number;
  _tiles: Tile[][] = [];

  constructor(canvas: string) {
    this._canvasElement = document.getElementById(canvas);
    this._ctx = this._canvasElement.getContext("2d");

    var tileH = 25;
    var tileW = 52;

    // mapX and mapY are offsets to make sure we can position the map as we want.
    this._mapX = this._settings.x * tileH;
    this._mapY = tileH;

    this._canvasElement.width = this._mapX * 2.2;
    this._canvasElement.height = tileH * this._settings.y + tileH * 2;

    this._init();
  }
  // Our init function contains all our code and will be called via the onLoad attribute in the <body> tag of our HTML page.
  private _init() {
    this._randomizeMap();
    this._loadImg();
  }

  private _randomizeMap() {
    this._map = [];
    for (var i = 0; i < this._settings.y; i++) {
      this._map[i] = new Array(10);
      for (var j = 0; j < this._settings.x; j++) {
        this._map[i][j] = Math.random() > 0.5 ? 1 : 0;
      }
    }
    console.log(this._map);
  }

  private _loadImg() {
    var tileGraphicsToLoad = [
        "https://jsiso.com/tutorials/images/water.png", // 0
        "https://jsiso.com/tutorials/images/land.png" // 1
      ],
      tileGraphicsLoaded = 0;
    const that = this;

    for (var i = 0; i < tileGraphicsToLoad.length; i++) {
      this._tileGraphics[i] = new Image();
      this._tileGraphics[i].src = tileGraphicsToLoad[i];
      this._tileGraphics[i].onload = function() {
        tileGraphicsLoaded++;
        if (tileGraphicsLoaded === tileGraphicsToLoad.length) {
          that._drawMap();
        }
      };
    }
  }

  private _drawMap() {
    // Set as your tile pixel sizes, alter if you are using larger tiles.

    this._ctx.fillStyle = "black";
    this._ctx.fillRect(0, 0, this._canvasElement.width, this._canvasElement.height);

    // loop through our map and draw out the image represented by the number.
    for (var i = 0; i < this._map.length; i++) {
      this._tiles[i] = [];
      for (var j = 0; j < this._map[i].length; j++) {
        // Draw the represented image number, at the desired X & Y coordinates followed by the graphic width and height.
        var tile = new Tile(this._ctx, i, j, this._mapX, this._mapY, this._tileGraphics[this._map[i][j]]);
        tile.render();
        this._tiles[i][j] = tile;
      }
    }

    this._canvasElement.addEventListener("click", (e: any) => {
      this.getCursorPosition(this._canvasElement, e);
    });
  }

  getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}
}

const game = new Game();
