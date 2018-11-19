"use strict";
exports.__esModule = true;
var math = require("mathjs");
var seedrandom_1 = require("seedrandom");
var MapGenerator = /** @class */ (function () {
    function MapGenerator(width, height, wallsPercent, seed, map) {
        if (wallsPercent === void 0) { wallsPercent = 45; }
        if (seed === void 0) { seed = Math.random().toString(); }
        this.width = width;
        this.height = height;
        this.wallsPercent = wallsPercent;
        this.seed = seed;
        this.rng = seedrandom_1["default"](this.seed);
        this.Map = map || math.zeros(width, height);
    }
    /**
     * generateMap
     */
    MapGenerator.prototype.generateMap = function () {
        this.randomFillMap();
        for (var iterations = 0; iterations < 4; iterations++) {
            this.smoothMap();
        }
    };
    /**
     * randomFillMap
     */
    MapGenerator.prototype.randomFillMap = function () {
        for (var column = 0; column < this.width; column++) {
            for (var row = 0; row < this.height; row++) {
                if (row === 0 || row === (this.height - 1) || column === 0 || column === (this.width - 1)) {
                    this.Map.valueOf()[column][row] = 1;
                }
                else {
                    this.Map.valueOf()[column][row] = this.randomPercent();
                }
            }
        }
    };
    /**
     * smoothMap
     */
    MapGenerator.prototype.smoothMap = function () {
        var r = 0;
        for (var column = 0; column < this.width; column++) {
            for (var row = 0; row < this.height; row++) {
                var neighbourWallCount = this.getSurroundingWallCount(column, row);
                if (neighbourWallCount > 4) {
                    this.Map.valueOf()[column][row] = 1;
                }
                else if (neighbourWallCount < 4) { // You can change it to <= 4 for the cave to look like man made
                    this.Map.valueOf()[column][row] = 0;
                }
            }
        }
    };
    /**
     * getSurroundingWallCount
     */
    MapGenerator.prototype.getSurroundingWallCount = function (gridX, gridY) {
        var wallCount = 0;
        for (var neighbourX = gridX - 1; neighbourX <= gridX + 1; neighbourX++) {
            for (var neighbourY = gridY - 1; neighbourY <= gridY + 1; neighbourY++) {
                if (neighbourX > 0 && neighbourX < this.width && neighbourY > 0 && neighbourY < this.height) {
                    if (neighbourX !== gridX || neighbourY !== gridY) {
                        wallCount += this.Map.valueOf()[neighbourX][neighbourY];
                    }
                }
                else {
                    wallCount++;
                }
            }
        }
        return wallCount;
    };
    MapGenerator.prototype.mapToString = function () {
        var returnString = [
            'Width:',
            this.width,
            '\tHeight:',
            this.height,
            '\t% Walls:',
            this.wallsPercent,
            '\n'
        ].join(' ');
        var mapSymbols = [];
        mapSymbols.push('.');
        mapSymbols.push('#');
        mapSymbols.push('+');
        for (var row = 0; row < this.height; row++) {
            for (var column = 0; column < this.width; column++) {
                returnString += mapSymbols[this.Map.valueOf()[column][row]];
            }
            returnString += '\n';
        }
        return returnString;
    };
    MapGenerator.prototype.randomPercent = function () {
        return this.wallsPercent >= Math.floor(this.rng() * 100) ? 1 : 0;
    };
    return MapGenerator;
}());
exports["default"] = MapGenerator;
var map = new MapGenerator(100, 25, 45, "vignes");
map.generateMap();
console.log(map.mapToString());
