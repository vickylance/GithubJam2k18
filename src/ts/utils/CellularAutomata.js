"use strict";
exports.__esModule = true;
var math = require("mathjs");
var MapGenerator = /** @class */ (function () {
    function MapGenerator(mapWidth, mapHeight, percentWalls, map) {
        if (percentWalls === void 0) { percentWalls = 40; }
        this.rand = Math.random();
        this.MapWidth = mapWidth;
        this.MapHeight = mapHeight;
        this.PercentAreWalls = percentWalls;
        this.Map = map || math.zeros(mapWidth, mapHeight);
    }
    MapGenerator.prototype.MapHandler = function () {
        this.MapWidth = 40;
        this.MapHeight = 21;
        this.PercentAreWalls = 40;
        this.RandomFillMap();
    };
    MapGenerator.prototype.MakeCaverns = function () {
        // By initilizing column in the outter loop, its only created ONCE
        for (var column = 0, row = 0; row <= this.MapHeight - 1; row++) {
            for (column = 0; column <= this.MapWidth - 1; column++) {
                this.Map.valueOf()[column][row] = this.PlaceWallLogic(column, row);
            }
        }
    };
    MapGenerator.prototype.PlaceWallLogic = function (x, y) {
        var numWalls = this.GetAdjacentWalls(x, y, 1, 1);
        if (this.Map.valueOf()[x][y] === 1) {
            if (numWalls >= 4) {
                return 1;
            }
            if (numWalls < 2) {
                return 0;
            }
        }
        else {
            if (numWalls >= 5) {
                return 1;
            }
        }
        return 0;
    };
    MapGenerator.prototype.GetAdjacentWalls = function (x, y, scopeX, scopeY) {
        var startX = x - scopeX;
        var startY = y - scopeY;
        var endX = x + scopeX;
        var endY = y + scopeY;
        var iX = startX;
        var iY = startY;
        var wallCounter = 0;
        for (iY = startY; iY <= endY; iY++) {
            for (iX = startX; iX <= endX; iX++) {
                if (!(iX === x && iY === y)) {
                    if (this.IsWall(iX, iY)) {
                        wallCounter += 1;
                    }
                }
            }
        }
        return wallCounter;
    };
    MapGenerator.prototype.IsWall = function (x, y) {
        // Consider out-of-bound a wall
        if (this.IsOutOfBounds(x, y)) {
            return true;
        }
        return this.Map.valueOf()[x][y] === 1 ? true : false;
    };
    MapGenerator.prototype.IsOutOfBounds = function (x, y) {
        if (x < 0 || y < 0) {
            return true;
        }
        else if (x > this.MapWidth - 1 || y > this.MapHeight - 1) {
            return true;
        }
        return false;
    };
    MapGenerator.prototype.PrintMap = function () {
        console.log(this.MapToString());
    };
    MapGenerator.prototype.BlankMap = function () {
        for (var column = 0, row = 0; row < this.MapHeight; row++) {
            for (column = 0; column < this.MapWidth; column++) {
                this.Map.valueOf()[column][row] = 0;
            }
        }
    };
    MapGenerator.prototype.RandomFillMap = function () {
        var mapMiddle = 0; // Temp variable
        for (var column = 0, row = 0; row < this.MapHeight; row++) {
            for (column = 0; column < this.MapWidth; column++) {
                // If coordinants lie on the the edge of the map (creates a border)
                if (column === 0) {
                    this.Map.valueOf()[column][row] = 1;
                }
                else if (row === 0) {
                    this.Map.valueOf()[column][row] = 1;
                }
                else if (column === this.MapWidth - 1) {
                    this.Map.valueOf()[column][row] = 1;
                }
                else if (row === this.MapHeight - 1) {
                    this.Map.valueOf()[column][row] = 1;
                }
                // Else, fill with a wall a random percent of the time
                else {
                    mapMiddle = this.MapHeight / 2;
                    this.Map.valueOf()[column][row] =
                        row === mapMiddle ? 0 : this.RandomPercent(this.PercentAreWalls);
                }
            }
        }
    };
    MapGenerator.prototype.RandomPercent = function (percent) {
        return percent >= Math.floor(Math.random() * 100) ? 1 : 0;
    };
    MapGenerator.prototype.MapToString = function () {
        var returnString = [
            'Width:',
            this.MapWidth,
            '\tHeight:',
            this.MapHeight,
            '\t% Walls:',
            this.PercentAreWalls,
            '\n'
        ].join(' ');
        var mapSymbols = [];
        mapSymbols.push('.');
        mapSymbols.push('#');
        mapSymbols.push('+');
        for (var column = 0, row = 0; row < this.MapHeight; row++) {
            for (column = 0; column < this.MapWidth; column++) {
                returnString += mapSymbols[this.Map.valueOf()[column][row]];
            }
            returnString += '\n';
        }
        return returnString;
    };
    return MapGenerator;
}());
exports["default"] = MapGenerator;
var mapGenerator = new MapGenerator(100, 25, 35);
mapGenerator.RandomFillMap();
// mapGenerator.BlankMap();
mapGenerator.MakeCaverns();
console.log(mapGenerator.Map.valueOf());
// mapGenerator.PrintMap();
