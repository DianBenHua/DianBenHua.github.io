/*!
 * author: sakitam-fdd <smilefdd@gmail.com> 
 * ol5-wind v1.0.0-alpha.6
 * build-time: 2020-5-24 21:49
 * LICENSE: MIT
 * (c) 2017-2020 https://github.com/sakitam-fdd/wind-layer#readme
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('ol/extent'), require('ol/layer'), require('ol/proj'), require('ol/source/ImageCanvas'), require('ol/renderer/canvas/ImageLayer')) :
    typeof define === 'function' && define.amd ? define(['exports', 'ol/extent', 'ol/layer', 'ol/proj', 'ol/source/ImageCanvas', 'ol/renderer/canvas/ImageLayer'], factory) :
    (global = global || self, factory(global.OlWind = {}, global.ol.extent, global.ol.layer, global.ol.proj, global.ol.source.ImageCanvas, global.ol.renderer.canvas.ImageLayer));
}(this, (function (exports, extent, layer, proj, ImageCanvas, CanvasImageLayerRenderer) { 'use strict';

    ImageCanvas = ImageCanvas && ImageCanvas.hasOwnProperty('default') ? ImageCanvas['default'] : ImageCanvas;
    CanvasImageLayerRenderer = CanvasImageLayerRenderer && CanvasImageLayerRenderer.hasOwnProperty('default') ? CanvasImageLayerRenderer['default'] : CanvasImageLayerRenderer;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /*!
     * author: sakitam-fdd <smilefdd@gmail.com> 
     * wind-core v1.0.0-alpha.5
     * build-time: 2020-5-19 14:0
     * LICENSE: MIT
     * (c) 2017-2020 https://github.com/sakitam-fdd/wind-layer#readme
     */
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics$1 = function(d, b) {
        extendStatics$1 = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
        return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
        extendStatics$1(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __spreadArrays() {
        var arguments$1 = arguments;

        for (var s = 0, i = 0, il = arguments.length; i < il; i++) { s += arguments$1[i].length; }
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            { for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                { r[k] = a[j]; } }
        return r;
    }

    if (!Array.isArray) {
        // @ts-ignore
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) {
                var arguments$1 = arguments;

                if (target == null) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                var to = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments$1[index];
                    if (nextSource != null) { // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var symToStringTag = typeof Symbol !== 'undefined' ? Symbol.toStringTag : undefined;
    function baseGetTag(value) {
        if (value === null) {
            return value === undefined ? '[object Undefined]' : '[object Null]';
        }
        if (!(symToStringTag && symToStringTag in Object(value))) {
            return toString.call(value);
        }
        var isOwn = hasOwnProperty.call(value, symToStringTag);
        var tag = value[symToStringTag];
        var unmasked = false;
        try {
            value[symToStringTag] = undefined;
            unmasked = true;
        }
        catch (e) {
        }
        var result = Object.prototype.toString.call(value);
        if (unmasked) {
            if (isOwn) {
                value[symToStringTag] = tag;
            }
            else {
                delete value[symToStringTag];
            }
        }
        return result;
    }
    /**
     * 判断是否为函数
     * @param value
     * @returns {boolean}
     */
    function isFunction(value) {
        if (!isObject(value)) {
            return false;
        }
        var tag = baseGetTag(value);
        return tag === '[object Function]' || tag === '[object AsyncFunction]' ||
            tag === '[object GeneratorFunction]' || tag === '[object Proxy]';
    }
    /**
     * 判断是否为对象
     * @param value
     * @returns {boolean}
     */
    function isObject(value) {
        var type = typeof value;
        return value !== null && (type === 'object' || type === 'function');
    }
    /**
     * 判断是否为合法字符串
     * @param value
     * @returns {boolean}
     */
    function isString(value) {
        if (value == null) {
            return false;
        }
        return typeof value === 'string' || (value.constructor !== null && value.constructor === String);
    }
    /**
     * 判断是否为数字
     * @param value
     * @returns {boolean}
     */
    function isNumber(value) {
        return Object.prototype.toString.call(value) === '[object Number]' && !isNaN(value);
    }
    /**
     * check is array
     * @param arr
     */
    function isArray(arr) {
        return Array.isArray(arr);
    }
    /**
     * assign object
     * @param target
     * @param sources
     */
    function assign(target) {
        var arguments$1 = arguments;

        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments$1[_i];
        }
        return Object.assign.apply(Object, __spreadArrays([target], sources));
    }
    function warnLog(msg) {
        console.warn("wind-layer: " + msg);
    }
    /**
     * Get floored division
     * @param a
     * @param n
     * @returns {Number} returns remainder of floored division,
     * i.e., floor(a / n). Useful for consistent modulo of negative numbers.
     * See http://en.wikipedia.org/wiki/Modulo_operation.
     */
    function floorMod(a, n) {
        return a - n * Math.floor(a / n);
    }
    /**
     * 检查值是否合法
     * @param val
     * @returns {boolean}
     */
    function isValide(val) {
        return val !== undefined && val !== null && !isNaN(val);
    }
    /**
     * format gfs json to vector
     * @param data
     */
    function formatData(data) {
        var uComp;
        var vComp;
        {
            console.time('format-data');
        }
        data.forEach(function (record) {
            switch (record.header.parameterCategory + "," + record.header.parameterNumber) {
                case "1,2":
                case "2,2":
                    uComp = record;
                    break;
                case "1,3":
                case "2,3":
                    vComp = record;
                    break;
            }
        });
        // @ts-ignore
        if (!vComp || !uComp)
            { return; }
        var header = uComp.header;
        var vectorField = new Field({
            xmin: header.lo1,
            ymin: header.la2,
            xmax: header.lo2,
            ymax: header.la1,
            deltaX: header.dx,
            deltaY: header.dy,
            cols: header.nx,
            rows: header.ny,
            us: uComp.data,
            vs: vComp.data
        });
        {
            console.timeEnd('format-data');
        }
        return vectorField;
    }
    /**
     * create canvas
     * @param width
     * @param height
     * @param retina
     * @param Canvas
     * @returns {HTMLCanvasElement}
     */
    function createCanvas(width, height, retina, Canvas) {
        if (typeof document !== 'undefined') {
            var canvas = document.createElement('canvas');
            canvas.width = width * retina;
            canvas.height = height * retina;
            return canvas;
        }
        else {
            // create a new canvas instance in node.js
            // the canvas class needs to have a default constructor without any parameter
            return new Canvas(width * retina, height * retina);
        }
    }

    // from: https://sourcegraph.com/github.com/IHCantabria/Leaflet.CanvasLayer.Field/-/blob/src/Vector.js?utm_source=share
    var Vector = /** @class */ (function () {
        function Vector(u, v) {
            this.u = u;
            this.v = v;
            this.m = this.magnitude();
        }
        /**
         * the vector value
         * 向量值（流体强度）
         * @returns {Number}
         */
        Vector.prototype.magnitude = function () {
            // Math.pow(u, 2)
            // Math.pow(v, 2)
            return Math.sqrt(this.u * this.u + this.v * this.v);
        };
        /**
         * Angle in degrees (0 to 360º) --> Towards
         * 流体方向
         * N is 0º and E is 90º
         * @returns {Number}
         */
        Vector.prototype.directionTo = function () {
            var verticalAngle = Math.atan2(this.u, this.v);
            var inDegrees = verticalAngle * (180.0 / Math.PI);
            if (inDegrees < 0) {
                inDegrees += 360.0;
            }
            return inDegrees;
        };
        /**
         * Angle in degrees (0 to 360º) From x-->
         * N is 0º and E is 90º
         * @returns {Number}
         */
        Vector.prototype.directionFrom = function () {
            var a = this.directionTo();
            return (a + 180.0) % 360.0;
        };
        return Vector;
    }());

    var Field = /** @class */ (function () {
        function Field(params) {
            this.grid = [];
            this.xmin = params.xmin;
            this.xmax = params.xmax;
            this.ymin = Math.min(params.ymax, params.ymin);
            this.ymax = Math.max(params.ymax, params.ymin);
            this.cols = params.cols; // 列数
            this.rows = params.rows; // 行数
            this.us = params.us; //
            this.vs = params.vs;
            this.deltaX = params.deltaX; // x 方向增量
            this.deltaY = params.deltaY; // y方向增量
            this.isFields = true;
            var cols = Math.ceil((this.xmax - this.xmin) / params.deltaX); // 列
            var rows = Math.ceil((this.ymax - this.ymin) / params.deltaY); // 行
            if (cols !== this.cols || rows !== this.rows) {
                console.warn('The data grid not equal');
            }
            // Math.floor(ni * Δλ) >= 360;
            // lon lat 经度 纬度
            this.isContinuous = Math.floor(this.cols * params.deltaX) >= 360;
            this.wrappedX = 'wrappedX' in params ? params.wrappedX : this.xmax > 180; // [0, 360] --> [-180, 180];
            this.grid = this.buildGrid();
            this.range = this.calculateRange();
        }
        // from https://github.com/sakitam-fdd/wind-layer/blob/95368f9433/src/windy/windy.js#L110
        Field.prototype.buildGrid = function () {
            var grid = [];
            var p = 0;
            var _a = this, rows = _a.rows, cols = _a.cols, us = _a.us, vs = _a.vs;
            for (var j = 0; j < rows; j++) {
                var row = [];
                for (var i = 0; i < cols; i++, p++) {
                    var u = us[p];
                    var v = vs[p];
                    var valid = this.isValid(u) && this.isValid(v);
                    row[i] = valid ? new Vector(u, v) : null;
                }
                if (this.isContinuous) {
                    row.push(row[0]);
                }
                grid[j] = row;
            }
            return grid;
        };
        Field.prototype.release = function () {
            this.grid = [];
            this.columns = [];
        };
        /**
         * grib data extent
         * 格点数据范围
         */
        Field.prototype.extent = function () {
            return [
                this.xmin,
                this.ymin,
                this.xmax,
                this.ymax ];
        };
        /**
         * Bilinear interpolation for Vector
         * 针对向量进行双线性插值
         * https://en.wikipedia.org/wiki/Bilinear_interpolation
         * @param   {Number} x
         * @param   {Number} y
         * @param   {Number[]} g00
         * @param   {Number[]} g10
         * @param   {Number[]} g01
         * @param   {Number[]} g11
         * @returns {Vector}
         */
        Field.prototype.bilinearInterpolateVector = function (x, y, g00, g10, g01, g11) {
            var rx = 1 - x;
            var ry = 1 - y;
            var a = rx * ry;
            var b = x * ry;
            var c = rx * y;
            var d = x * y;
            var u = g00.u * a + g10.u * b + g01.u * c + g11.u * d;
            var v = g00.v * a + g10.v * b + g01.v * c + g11.v * d;
            return new Vector(u, v);
        };
        /**
         * calculate vector value range
         */
        Field.prototype.calculateRange = function () {
            if (!this.grid || !this.grid[0])
                { return; }
            var rows = this.grid.length;
            var cols = this.grid[0].length;
            // const vectors = [];
            var min;
            var max;
            // @from: https://stackoverflow.com/questions/13544476/how-to-find-max-and-min-in-array-using-minimum-comparisons
            for (var j = 0; j < rows; j++) {
                for (var i = 0; i < cols; i++) {
                    var vec = this.grid[j][i];
                    if (vec !== null) {
                        var val = vec.m || vec.magnitude();
                        // vectors.push();
                        if (min === undefined) {
                            min = val;
                        }
                        else if (max === undefined) {
                            max = val;
                            // update min max
                            // 1. Pick 2 elements(a, b), compare them. (say a > b)
                            min = Math.min(min, max);
                            max = Math.max(min, max);
                        }
                        else {
                            // 2. Update min by comparing (min, b)
                            // 3. Update max by comparing (max, a)
                            min = Math.min(val, min);
                            max = Math.max(val, max);
                        }
                    }
                }
            }
            return [min, max];
        };
        /**
         * 检查 uv是否合法
         * @param x
         * @private
         */
        Field.prototype.isValid = function (x) {
            return x !== null && x !== undefined;
        };
        Field.prototype.getWrappedLongitudes = function () {
            var xmin = this.xmin;
            var xmax = this.xmax;
            if (this.wrappedX) {
                if (this.isContinuous) {
                    xmin = -180;
                    xmax = 180;
                }
                else {
                    // not sure about this (just one particular case, but others...?)
                    xmax = this.xmax - 360;
                    xmin = this.xmin - 360;
                    /* eslint-disable no-console */
                    // console.warn(`are these xmin: ${xmin} & xmax: ${xmax} OK?`);
                    // TODO: Better throw an exception on no-controlled situations.
                    /* eslint-enable no-console */
                }
            }
            return [xmin, xmax];
        };
        Field.prototype.contains = function (lon, lat) {
            var _a = this.getWrappedLongitudes(), xmin = _a[0], xmax = _a[1];
            var longitudeIn = lon >= xmin && lon <= xmax;
            var latitudeIn = lat >= this.ymin && lat <= this.ymax;
            return longitudeIn && latitudeIn;
        };
        /**
         * 获取经纬度所在的位置索引
         * @param lon
         * @param lat
         */
        Field.prototype.getDecimalIndexes = function (lon, lat) {
            var i = floorMod(lon - this.xmin, 360) / this.deltaX; // calculate longitude index in wrapped range [0, 360)
            var j = (this.ymax - lat) / this.deltaY; // calculate latitude index in direction +90 to -90
            return [i, j];
        };
        /**
         * Nearest value at lon-lat coordinates
         * 线性插值
         * @param lon
         * @param lat
         */
        Field.prototype.valueAt = function (lon, lat) {
            if (!this.contains(lon, lat))
                { return null; }
            var indexes = this.getDecimalIndexes(lon, lat);
            var ii = Math.floor(indexes[0]);
            var jj = Math.floor(indexes[1]);
            var ci = this.clampColumnIndex(ii);
            var cj = this.clampRowIndex(jj);
            return this.valueAtIndexes(ci, cj);
        };
        /**
         * Get interpolated grid value lon-lat coordinates
         * 双线性插值
         * @param lon
         * @param lat
         */
        Field.prototype.interpolatedValueAt = function (lon, lat) {
            if (!this.contains(lon, lat))
                { return null; }
            var _a = this.getDecimalIndexes(lon, lat), i = _a[0], j = _a[1];
            return this.interpolatePoint(i, j);
        };
        Field.prototype.hasValueAt = function (lon, lat) {
            var value = this.valueAt(lon, lat);
            return value !== null;
        };
        /**
         * 基于向量的双线性插值
         * @param i
         * @param j
         */
        Field.prototype.interpolatePoint = function (i, j) {
            //         1      2           After converting λ and φ to fractional grid indexes i and j, we find the
            //        fi  i   ci          four points 'G' that enclose point (i, j). These points are at the four
            //         | =1.4 |           corners specified by the floor and ceiling of i and j. For example, given
            //      ---G--|---G--- fj 8   i = 1.4 and j = 8.3, the four surrounding grid points are (1, 8), (2, 8),
            //    j ___|_ .   |           (1, 9) and (2, 9).
            //  =8.3   |      |
            //      ---G------G--- cj 9   Note that for wrapped grids, the first column is duplicated as the last
            //         |      |           column, so the index ci can be used without taking a modulo.
            var indexes = this.getFourSurroundingIndexes(i, j);
            var fi = indexes[0], ci = indexes[1], fj = indexes[2], cj = indexes[3];
            var values = this.getFourSurroundingValues(fi, ci, fj, cj);
            if (values) {
                var g00 = values[0], g10 = values[1], g01 = values[2], g11 = values[3];
                // @ts-ignore
                return this.bilinearInterpolateVector(i - fi, j - fj, g00, g10, g01, g11);
            }
            return null;
        };
        /**
         * Check the column index is inside the field,
         * adjusting to min or max when needed
         * @private
         * @param   {Number} ii - index
         * @returns {Number} i - inside the allowed indexes
         */
        Field.prototype.clampColumnIndex = function (ii) {
            var i = ii;
            if (ii < 0) {
                i = 0;
            }
            var maxCol = this.cols - 1;
            if (ii > maxCol) {
                i = maxCol;
            }
            return i;
        };
        /**
         * Check the row index is inside the field,
         * adjusting to min or max when needed
         * @private
         * @param   {Number} jj index
         * @returns {Number} j - inside the allowed indexes
         */
        Field.prototype.clampRowIndex = function (jj) {
            var j = jj;
            if (jj < 0) {
                j = 0;
            }
            var maxRow = this.rows - 1;
            if (jj > maxRow) {
                j = maxRow;
            }
            return j;
        };
        /**
         * from: https://github.com/IHCantabria/Leaflet.CanvasLayer.Field/blob/master/src/Field.js#L252
         * 计算索引位置周围的数据
         * @private
         * @param   {Number} i - decimal index
         * @param   {Number} j - decimal index
         * @returns {Array} [fi, ci, fj, cj]
         */
        Field.prototype.getFourSurroundingIndexes = function (i, j) {
            var fi = Math.floor(i); // 左
            var ci = fi + 1; // 右
            // duplicate colum to simplify interpolation logic (wrapped value)
            if (this.isContinuous && ci >= this.cols) {
                ci = 0;
            }
            ci = this.clampColumnIndex(ci);
            var fj = this.clampRowIndex(Math.floor(j)); // 上 纬度方向索引（取整）
            var cj = this.clampRowIndex(fj + 1); // 下
            return [fi, ci, fj, cj];
        };
        /**
         * from https://github.com/IHCantabria/Leaflet.CanvasLayer.Field/blob/master/src/Field.js#L277
         * Get four surrounding values or null if not available,
         * from 4 integer indexes
         * @private
         * @param   {Number} fi
         * @param   {Number} ci
         * @param   {Number} fj
         * @param   {Number} cj
         * @returns {Array}
         */
        Field.prototype.getFourSurroundingValues = function (fi, ci, fj, cj) {
            var row;
            if ((row = this.grid[fj])) {
                var g00 = row[fi]; // << left
                var g10 = row[ci]; // right >>
                if (this.isValid(g00) &&
                    this.isValid(g10) &&
                    (row = this.grid[cj])) {
                    // lower row vv
                    var g01 = row[fi]; // << left
                    var g11 = row[ci]; // right >>
                    if (this.isValid(g01) && this.isValid(g11)) {
                        return [g00, g10, g01, g11]; // 4 values found!
                    }
                }
            }
            return null;
        };
        /**
         * Value for grid indexes
         * @param   {Number} i - column index (integer)
         * @param   {Number} j - row index (integer)
         * @returns {Vector|Number}
         */
        Field.prototype.valueAtIndexes = function (i, j) {
            return this.grid[j][i]; // <-- j,i !!
        };
        /**
         * Lon-Lat for grid indexes
         * @param   {Number} i - column index (integer)
         * @param   {Number} j - row index (integer)
         * @returns {Number[]} [lon, lat]
         */
        Field.prototype.lonLatAtIndexes = function (i, j) {
            var lon = this.longitudeAtX(i);
            var lat = this.latitudeAtY(j);
            return [lon, lat];
        };
        /**
         * Longitude for grid-index
         * @param   {Number} i - column index (integer)
         * @returns {Number} longitude at the center of the cell
         */
        Field.prototype.longitudeAtX = function (i) {
            var halfXPixel = this.deltaX / 2.0;
            var lon = this.xmin + halfXPixel + i * this.deltaX;
            if (this.wrappedX) {
                lon = lon > 180 ? lon - 360 : lon;
            }
            return lon;
        };
        /**
         * Latitude for grid-index
         * @param   {Number} j - row index (integer)
         * @returns {Number} latitude at the center of the cell
         */
        Field.prototype.latitudeAtY = function (j) {
            var halfYPixel = this.deltaY / 2.0;
            return this.ymax - halfYPixel - j * this.deltaY;
        };
        /**
         * 生成粒子位置
         * @param o
         * @param width
         * @param height
         * @param unproject
         */
        Field.prototype.randomize = function (o, width, height, unproject) {
            if (o === void 0) { o = {}; }
            var i = (Math.random() * (width || this.cols)) | 0;
            var j = (Math.random() * (height || this.rows)) | 0;
            var coords = unproject([i, j]);
            if (coords !== null) {
                o.x = coords[0];
                o.y = coords[1];
            }
            else {
                o.x = this.longitudeAtX(i);
                o.y = this.latitudeAtY(j);
            }
            return o;
        };
        /**
         * check is custom field
         */
        Field.prototype.checkFields = function () {
            return this.isFields;
        };
        Field.prototype.startBatchInterpolate = function (width, height, unproject) { };
        return Field;
    }());

    // 大量代码来自于 [webgl-utils](https://github.com/gfxfundamentals/webgl-fundamentals/blob/master/webgl/resources/webgl-utils.js)
    function getDevicePixelRatio() {
        return devicePixelRatio || 1;
    }
    /**
     * resize gl context
     * @link https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
     * @link https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-anti-patterns.html
     * @param canvas
     * @param pixelRatio
     * @returns {boolean}
     */
    function resizeCanvasSize(canvas, pixelRatio) {
        if (!canvas)
            { return false; }
        pixelRatio = pixelRatio || getDevicePixelRatio();
        if (!(canvas instanceof OffscreenCanvas)) {
            var width = canvas.clientWidth * pixelRatio;
            var height = canvas.clientHeight * pixelRatio;
            if (width <= 0 || height <= 0) {
                return false;
            }
            else if (canvas.width !== width ||
                canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                return true;
            }
        }
        return false;
    }
    /**
     * create shader and compile shader
     * @param gl
     * @param type
     * @param source
     * @returns {WebGLShader}
     */
    function createShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(shader);
            throw new Error(gl.getShaderInfoLog(shader) || '');
        }
        return shader;
    }
    /**
     * create program from vertex and frag
     * @param gl
     * @param vertexShaderSource
     * @param fragmentShaderSource
     * @returns {WebGLProgram}
     */
    function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
        // create the shader program
        var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        var program = gl.createProgram();
        if (program !== null) {
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                throw new Error(gl.getProgramInfoLog(program) || '');
            }
        }
        return program;
    }
    /**
     * clear scene
     * @param gl
     * @param color
     */
    function clearScene(gl, color) {
        var r = color[0], g = color[1], b = color[2], a = color[3];
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(r, g, b, a);
        gl.clearDepth(1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
    }
    //
    // // This is really just a guess. Though I can't really imagine using
    // // anything else? Maybe for some compression?
    // function getNormalizationForTypedArray(typedArray: any) {
    //   if (typedArray instanceof Int8Array)    { return true; }  // eslint-disable-line
    //   if (typedArray instanceof Uint8Array)   { return true; }  // eslint-disable-line
    //   return false;
    // }
    //
    // function isArrayBuffer(a) {
    //   return a.buffer && a.buffer instanceof ArrayBuffer;
    // }
    //
    // function allButIndices(name) {
    //   return name !== 'indices';
    // }
    //
    // function createMapping(obj) {
    //   const mapping = {};
    //   Object.keys(obj).filter(allButIndices).forEach(function(key) {
    //     mapping['a_' + key] = key;
    //   });
    //   return mapping;
    // }
    //
    // function getGLTypeForTypedArray(gl: WebGLRenderingContext, typedArray: any) {
    //   if (typedArray instanceof Int8Array)    { return gl.BYTE; }            // eslint-disable-line
    //   if (typedArray instanceof Uint8Array)   { return gl.UNSIGNED_BYTE; }   // eslint-disable-line
    //   if (typedArray instanceof Int16Array)   { return gl.SHORT; }           // eslint-disable-line
    //   if (typedArray instanceof Uint16Array)  { return gl.UNSIGNED_SHORT; }  // eslint-disable-line
    //   if (typedArray instanceof Int32Array)   { return gl.INT; }             // eslint-disable-line
    //   if (typedArray instanceof Uint32Array)  { return gl.UNSIGNED_INT; }    // eslint-disable-line
    //   if (typedArray instanceof Float32Array) { return gl.FLOAT; }           // eslint-disable-line
    //   throw 'unsupported typed array type';
    // }
    //
    // /**
    //  * instead createBuffer function
    //  * @param gl
    //  * @param array
    //  * @param type
    //  * @param drawType
    //  * @returns {AudioBuffer | WebGLBuffer}
    //  */
    // export function createBufferFromTypedArray(gl: WebGLRenderingContext, array, type: GLenum, drawType: GLenum) {
    //   type = type || gl.ARRAY_BUFFER;
    //   const buffer = gl.createBuffer();
    //   gl.bindBuffer(type, buffer);
    //   if (array) {
    //     gl.bufferData(type, array, drawType || gl.STATIC_DRAW);
    //   }
    //   return buffer;
    // }
    //
    // // Add `push` to a typed array. It just keeps a 'cursor'
    // // and allows use to `push` values into the array so we
    // // don't have to manually compute offsets
    // function augmentTypedArray(typedArray: Float32Array | ArrayLike<any>, numComponents: number) {
    //   let cursor = 0;
    //   typedArray.push = function() {
    //     for (let ii = 0; ii < arguments.length; ++ii) {
    //       const value = arguments[ii];
    //       if (value instanceof Array || (value.buffer && value.buffer instanceof ArrayBuffer)) {
    //         for (let jj = 0; jj < value.length; ++jj) {
    //           typedArray[cursor++] = value[jj];
    //         }
    //       } else {
    //         typedArray[cursor++] = value;
    //       }
    //     }
    //   };
    //   typedArray.reset = function(opt_index) {
    //     cursor = opt_index || 0;
    //   };
    //   typedArray.numComponents = numComponents;
    //   Object.defineProperty(typedArray, 'numElements', {
    //     get: function() {
    //       return this.length / this.numComponents | 0;
    //     },
    //   });
    //   return typedArray;
    // }
    //
    // function createAugmentedTypedArray(numComponents: number, numElements: number, opt_type: ArrayBufferConstructor) {
    //   const Type = opt_type || Float32Array;
    //   return augmentTypedArray(new Type(numComponents * numElements), numComponents);
    // }
    //
    // function guessNumComponentsFromName(name: string, length: number) {
    //   let numComponents;
    //   if (name.indexOf('coord') >= 0) {
    //     numComponents = 2;
    //   } else if (name.indexOf('color') >= 0) {
    //     numComponents = 4;
    //   } else {
    //     numComponents = 3;  // position, normals, indices ...
    //   }
    //
    //   if (length % numComponents > 0) {
    //     throw 'can not guess numComponents. You should specify it.';
    //   }
    //
    //   return numComponents;
    // }
    //
    // function makeTypedArray(array: any, name) {
    //   if (isArrayBuffer(array)) {
    //     return array;
    //   }
    //
    //   if (array.data && isArrayBuffer(array.data)) {
    //     return array.data;
    //   }
    //
    //   if (Array.isArray(array)) {
    //     array = {
    //       data: array,
    //     };
    //   }
    //
    //   if (!array.numComponents) {
    //     array.numComponents = guessNumComponentsFromName(name, array.length);
    //   }
    //
    //   let type = array.type;
    //   if (!type) {
    //     if (name === 'indices') {
    //       type = Uint16Array;
    //     }
    //   }
    //   const typedArray = createAugmentedTypedArray(array.numComponents, array.data.length / array.numComponents | 0, type);
    //   typedArray.push(array.data);
    //   return typedArray;
    // }
    //
    // function createAttribsFromArrays (gl: WebGLRenderingContext, arrays, opt_mapping) {
    //   const mapping = opt_mapping || createMapping(arrays);
    //   const attribs = {};
    //   Object.keys(mapping).forEach(function(attribName) {
    //     const bufferName = mapping[attribName];
    //     const origArray = arrays[bufferName];
    //     const array = makeTypedArray(origArray, bufferName);
    //     attribs[attribName] = {
    //       buffer: createBufferFromTypedArray(gl, array),
    //       numComponents: origArray.numComponents || array.numComponents || guessNumComponentsFromName(bufferName),
    //       type: getGLTypeForTypedArray(gl, array),
    //       normalize: getNormalizationForTypedArray(array),
    //     };
    //   });
    //   return attribs;
    // }
    //
    // /**
    //  * tries to get the number of elements from a set of arrays.
    //  */
    // function getNumElementsFromNonIndexedArrays(arrays) {
    //   const key = Object.keys(arrays)[0];
    //   const array = arrays[key];
    //   if (isArrayBuffer(array)) {
    //     return array.numElements;
    //   } else {
    //     return array.data.length / array.numComponents;
    //   }
    // }
    //
    // /**
    //  * 创建buffer
    //  * @param gl
    //  * @param arrays
    //  * @param opt_mapping
    //  * @returns {{attribs: *}}
    //  */
    // export function createBufferInfoFromArrays(gl: WebGLRenderingContext, arrays, opt_mapping) {
    //   const bufferInfo = {
    //     attribs: createAttribsFromArrays(gl, arrays, opt_mapping),
    //   };
    //   let indices = arrays.indices;
    //   if (indices) {
    //     indices = makeTypedArray(indices, 'indices');
    //     bufferInfo.indices = createBufferFromTypedArray(gl, indices, gl.ELEMENT_ARRAY_BUFFER);
    //     bufferInfo.numElements = indices.length;
    //   } else {
    //     bufferInfo.numElements = getNumElementsFromNonIndexedArrays(arrays);
    //   }
    //
    //   return bufferInfo;
    // }

    /**
     * Common utilities
     * @module glMatrix
     */
    var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
    if (!Math.hypot) { Math.hypot = function () {
      var arguments$1 = arguments;

      var y = 0,
          i = arguments.length;

      while (i--) {
        y += arguments$1[i] * arguments$1[i];
      }

      return Math.sqrt(y);
    }; }

    /**
     * 3x3 Matrix
     * @module mat3
     */

    /**
     * Creates a new identity mat3
     *
     * @returns {mat3} a new 3x3 matrix
     */

    function create() {
      var out = new ARRAY_TYPE(9);

      if (ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
      }

      out[0] = 1;
      out[4] = 1;
      out[8] = 1;
      return out;
    }
    /**
     * Generates a 2D projection matrix with the given bounds
     *
     * @param {mat3} out mat3 frustum matrix will be written into
     * @param {number} width Width of your gl context
     * @param {number} height Height of gl context
     * @returns {mat3} out
     */

    function projection(out, width, height) {
      out[0] = 2 / width;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = -2 / height;
      out[5] = 0;
      out[6] = -1;
      out[7] = 1;
      out[8] = 1;
      return out;
    }

    var Base = /** @class */ (function () {
        function Base(gl, vShader, fShader) {
            this.vertShader = '';
            this.fragShader = '';
            if (vShader)
                { this.vertShader = vShader; }
            if (fShader)
                { this.fragShader = fShader; }
            this.program = createProgram(gl, this.vertShader, this.fragShader);
            this.gl = gl;
            this.textureUnit = 0;
            this.uniformSetters = this.createUniformSetters();
            this.attribSetters = this.createAttributeSetters();
            this.transfromStack = []; // 矩阵变换调用栈
            this.projection = create();
        }
        Base.prototype.active = function () {
            this.gl.useProgram(this.program);
            return this;
        };
        Base.prototype.deactive = function () {
            this.gl.deleteProgram(this.program);
            return this;
        };
        /**
         * from webgl-utils
         * @param gl
         * @param type
         * @returns {GLenum|undefined}
         */
        Base.prototype.getBindPointForSamplerType = function (gl, type) {
            if (type === gl.SAMPLER_2D)
                { return gl.TEXTURE_2D; } // eslint-disable-line
            if (type === gl.SAMPLER_CUBE)
                { return gl.TEXTURE_CUBE_MAP; } // eslint-disable-line
            return undefined;
        };
        /**
         * from webgl-utils
         * @param program
         * @param uniformInfo
         * @returns {function(...[*]=)}
         */
        Base.prototype.createUniformSetter = function (program, uniformInfo) {
            var gl = this.gl;
            var location = gl.getUniformLocation(program, uniformInfo.name);
            var type = uniformInfo.type;
            // Check if this uniform is an array
            var isArray = (uniformInfo.size > 1 && uniformInfo.name.substr(-3) === '[0]');
            if (type === gl.FLOAT && isArray) {
                return function (v) {
                    gl.uniform1fv(location, v);
                };
            }
            if (type === gl.FLOAT) {
                return function (v) {
                    gl.uniform1f(location, v);
                };
            }
            if (type === gl.FLOAT_VEC2) {
                return function (v) {
                    gl.uniform2fv(location, v);
                };
            }
            if (type === gl.FLOAT_VEC3) {
                return function (v) {
                    gl.uniform3fv(location, v);
                };
            }
            if (type === gl.FLOAT_VEC4) {
                return function (v) {
                    gl.uniform4fv(location, v);
                };
            }
            if (type === gl.INT && isArray) {
                return function (v) {
                    gl.uniform1iv(location, v);
                };
            }
            if (type === gl.INT) {
                return function (v) {
                    gl.uniform1i(location, v);
                };
            }
            if (type === gl.INT_VEC2) {
                return function (v) {
                    gl.uniform2iv(location, v);
                };
            }
            if (type === gl.INT_VEC3) {
                return function (v) {
                    gl.uniform3iv(location, v);
                };
            }
            if (type === gl.INT_VEC4) {
                return function (v) {
                    gl.uniform4iv(location, v);
                };
            }
            if (type === gl.BOOL) {
                return function (v) {
                    gl.uniform1iv(location, v);
                };
            }
            if (type === gl.BOOL_VEC2) {
                return function (v) {
                    gl.uniform2iv(location, v);
                };
            }
            if (type === gl.BOOL_VEC3) {
                return function (v) {
                    gl.uniform3iv(location, v);
                };
            }
            if (type === gl.BOOL_VEC4) {
                return function (v) {
                    gl.uniform4iv(location, v);
                };
            }
            if (type === gl.FLOAT_MAT2) {
                return function (v) {
                    gl.uniformMatrix2fv(location, false, v);
                };
            }
            if (type === gl.FLOAT_MAT3) {
                return function (v) {
                    gl.uniformMatrix3fv(location, false, v);
                };
            }
            if (type === gl.FLOAT_MAT4) {
                return function (v) {
                    gl.uniformMatrix4fv(location, false, v);
                };
            }
            if ((type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) && isArray) {
                var units = [];
                for (var ii = 0; ii < uniformInfo.size; ++ii) {
                    units.push(this.textureUnit++);
                }
                return function (bindPoint, units) {
                    return function (textures) {
                        gl.uniform1iv(location, units);
                        textures.forEach(function (texture, index) {
                            gl.activeTexture(gl.TEXTURE0 + units[index]);
                            if (bindPoint !== undefined) {
                                gl.bindTexture(bindPoint, texture);
                            }
                        });
                    };
                }(this.getBindPointForSamplerType(gl, type), units);
            }
            if (type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) {
                return function (bindPoint, unit) {
                    return function (texture) {
                        gl.uniform1i(location, unit);
                        gl.activeTexture(gl.TEXTURE0 + unit);
                        if (bindPoint !== undefined) {
                            gl.bindTexture(bindPoint, texture);
                        }
                    };
                }(this.getBindPointForSamplerType(gl, type), this.textureUnit++);
            }
            throw ('unknown type: 0x' + type.toString(16)); // we should never get here.
        };
        /**
         * from webgl-utils
         * @returns {{}}
         */
        Base.prototype.createUniformSetters = function () {
            var gl = this.gl;
            this.textureUnit = 0;
            var uniformSetters = {};
            if (this.program !== null) {
                var numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
                for (var ii = 0; ii < numUniforms; ++ii) {
                    var uniformInfo = gl.getActiveUniform(this.program, ii);
                    if (!uniformInfo) {
                        break;
                    }
                    var name_1 = uniformInfo.name;
                    // remove the array suffix.
                    if (name_1.substr(-3) === '[0]') {
                        name_1 = name_1.substr(0, name_1.length - 3);
                    }
                    var setter = this.createUniformSetter(this.program, uniformInfo);
                    uniformSetters[name_1] = setter;
                }
            }
            return uniformSetters;
        };
        /**
         * from webgl-utils
         * @returns {function(...[*]=)}
         */
        Base.prototype.createAttribSetter = function (index) {
            var gl = this.gl;
            return function (b) {
                gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
                gl.enableVertexAttribArray(index);
                if (b.numComponents !== undefined || b.size !== undefined) {
                    gl.vertexAttribPointer(index, (b.numComponents || b.size), b.type || gl.FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
                }
            };
        };
        Base.prototype.createAttributeSetters = function () {
            var gl = this.gl;
            var attribSetters = {};
            if (this.program !== null) {
                var numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
                for (var ii = 0; ii < numAttribs; ++ii) {
                    var attribInfo = gl.getActiveAttrib(this.program, ii);
                    if (!attribInfo) {
                        break;
                    }
                    var index = gl.getAttribLocation(this.program, attribInfo.name);
                    attribSetters[attribInfo.name] = this.createAttribSetter(index);
                }
            }
            return attribSetters;
        };
        Base.prototype.setAttributes = function (attribs, setters) {
            if (setters) {
                setters = setters.attribSetters || setters;
            }
            else {
                setters = this.attribSetters;
            }
            Object.keys(attribs).forEach(function (name) {
                var setter = setters[name];
                if (setter) {
                    setter(attribs[name]);
                }
            });
            return this;
        };
        Base.prototype.setUniforms = function (values, setters) {
            if (setters) {
                setters = setters.uniformSetters || setters;
            }
            else {
                setters = this.uniformSetters;
            }
            Object.keys(values).forEach(function (name) {
                var setter = setters[name];
                if (setter) {
                    setter(values[name]);
                }
            });
            return this;
        };
        /**
         * 可以override，默认使用此种方式清空画布
         * @param color
         * @returns {Base}
         */
        Base.prototype.clear = function (color) {
            clearScene(this.gl, color);
            this.transfromStack = [];
            return this;
        };
        /**
         * 运行次数
         * TODO: 目前没有好的方式去绑定顶点数量的关系
         * @param count
         */
        Base.prototype.runTimes = function (count) {
            this.count = count || 0;
            return this;
        };
        /**
         * 更新视图投影
         * 默认应该被 override
         * @returns {Base}
         */
        Base.prototype.updateProjection = function () {
            var _a = this.gl.canvas, width = _a.width, height = _a.height;
            // 正交投影
            projection(this.projection, width, height);
            // 透视投影
            // mat4.perspective(this.projection, 80 / 180.0 * Math.PI, canvas.width / canvas.height, 0.1, 1000);
            return this;
        };
        Base.prototype.resize = function (flag) {
            resizeCanvasSize(this.gl.canvas);
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
            if (flag) {
                this.updateProjection();
            }
            return this;
        };
        Base.prototype.draw = function () {
            throw new Error('should override');
        };
        Base.prototype.translate = function () {
            throw new Error('should override');
        };
        Base.prototype.rotate = function () {
            throw new Error('should override');
        };
        Base.prototype.scale = function () {
            throw new Error('should override');
        };
        return Base;
    }());

    var RectFrag = "precision mediump float;\n#define GLSLIFY 1\n\n// 从顶点着色器中传入\nvarying vec4 v_color;\n\nvoid main() {\n  gl_FragColor = v_color;\n}\n"; // eslint-disable-line

    var RectVert = "#define GLSLIFY 1\nattribute vec2 a_position;\nattribute vec4 a_color;\n\n//uniform mat4 u_matrix;\nuniform vec2 u_resolution;\nvarying vec4 v_color;\nuniform float u_pointSize;\n\nvoid main() {\n  // convert the rectangle from pixels to 0.0 to 1.0\n  vec2 zeroToOne = a_position / u_resolution;\n\n  // convert from 0->1 to 0->2\n  vec2 zeroToTwo = zeroToOne * 2.0;\n\n  // convert from 0->2 to -1->+1 (clipspace)\n  vec2 clipSpace = zeroToTwo - 1.0;\n\n  // 未翻转Y轴\n  //  gl_Position = vec4(a_position, 0, 1);\n  // 翻转Y轴\n  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n  // Multiply the position by the matrix.\n//  gl_Position = u_matrix * vec4(a_position, 0.0, 1.0);\n  // 将颜色传递给片断着色器\n  v_color = a_color;\n\n  gl_PointSize = u_pointSize;\n}\n"; // eslint-disable-line

    var Rect = /** @class */ (function (_super) {
        __extends$1(Rect, _super);
        function Rect(gl, vShader, fShader) {
            var _this = _super.call(this, gl, vShader || RectVert, fShader || RectFrag) || this;
            _this.vertShader = RectVert;
            _this.fragShader = RectFrag;
            return _this;
        }
        Rect.prototype.updateProjection = function () {
            return this;
        };
        Rect.prototype.draw = function () {
            // draw
            var primitiveType = this.gl.POINTS;
            this.gl.drawArrays(primitiveType, 0, this.count);
            return this;
        };
        Rect.prototype.translate = function () {
            return this;
        };
        Rect.prototype.rotate = function () {
            return this;
        };
        Rect.prototype.scale = function () {
            return this;
        };
        return Rect;
    }(Base));

    var defaultOptions$1 = {
        globalAlpha: 0.9,
        lineWidth: 1,
        colorScale: '#fff',
        velocityScale: 1 / 25,
        // particleAge: 90, // 粒子在重新生成之前绘制的最大帧数
        maxAge: 90,
        // particleMultiplier: 1 / 300, // TODO: PATHS = Math.round(width * height * particleMultiplier);
        paths: 800,
        frameRate: 20,
        useCoordsDraw: true,
        gpet: true
    };
    function indexFor$1(m, min, max, colorScale) {
        return Math.max(0, Math.min((colorScale.length - 1), Math.round((m - min) / (max - min) * (colorScale.length - 1))));
    }
    var BaseLayer = /** @class */ (function () {
        function BaseLayer(ctx, options, field) {
            this.generated = false;
            this.ctx = ctx;
            if (!this.ctx) {
                throw new Error('ctx error');
            }
            this.animate = this.animate.bind(this);
            this.setOptions(options);
            if (field) {
                this.updateData(field);
            }
        }
        BaseLayer.prototype.setOptions = function (options) {
            this.options = Object.assign({}, defaultOptions$1, options);
            var _a = this.ctx.canvas, width = _a.width, height = _a.height;
            if (('particleAge' in options) && !('maxAge' in options) && isNumber(this.options.particleAge)) {
                // @ts-ignore
                this.options.maxAge = this.options.particleAge;
            }
            if (('particleMultiplier' in options) && !('paths' in options) && isNumber(this.options.particleMultiplier)) {
                // @ts-ignore
                this.options.paths = Math.round(width * height * this.options.particleMultiplier);
            }
            this.prerender();
        };
        BaseLayer.prototype.getOptions = function () {
            return this.options;
        };
        BaseLayer.prototype.updateData = function (field) {
            this.field = field;
        };
        BaseLayer.prototype.moveParticles = function () {
            var _a = this.ctx.canvas, width = _a.width, height = _a.height;
            var particles = this.particles;
            // 清空组
            var maxAge = this.options.maxAge;
            var optVelocityScale = isFunction(this.options.velocityScale)
                // @ts-ignore
                ? this.options.velocityScale()
                : this.options.velocityScale;
            var velocityScale = optVelocityScale;
            var i = 0;
            var len = particles.length;
            for (; i < len; i++) {
                var particle = particles[i];
                if (particle.age > maxAge) {
                    particle.age = 0;
                    // restart, on a random x,y
                    this.field.randomize(particle, width, height, this.unproject);
                }
                var x = particle.x;
                var y = particle.y;
                var vector = this.field.interpolatedValueAt(x, y);
                if (vector === null) {
                    particle.age = maxAge;
                }
                else {
                    var xt = x + vector.u * velocityScale;
                    var yt = y + vector.v * velocityScale;
                    if (this.field.hasValueAt(xt, yt)) {
                        // Path from (x,y) to (xt,yt) is visible, so add this particle to the appropriate draw bucket.
                        particle.xt = xt;
                        particle.yt = yt;
                        particle.m = vector.m;
                    }
                    else {
                        // Particle isn't visible, but it still moves through the field.
                        particle.x = xt;
                        particle.y = yt;
                        particle.age = maxAge;
                    }
                }
                particle.age++;
            }
        };
        BaseLayer.prototype.fadeIn = function () {
            var prev = this.ctx.globalCompositeOperation; // lighter
            this.ctx.globalCompositeOperation = 'destination-in';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.globalCompositeOperation = prev;
        };
        BaseLayer.prototype.drawParticles = function () {
            var _a;
            var particles = this.particles;
            this.fadeIn();
            this.ctx.globalAlpha = this.options.globalAlpha;
            this.ctx.fillStyle = "rgba(0, 0, 0, " + this.options.globalAlpha + ")";
            this.ctx.lineWidth = (isNumber(this.options.lineWidth) ? this.options.lineWidth : 1);
            this.ctx.strokeStyle = (isString(this.options.colorScale) ? this.options.colorScale : '#fff');
            var i = 0;
            var len = particles.length;
            if (this.field && len > 0) {
                var min = void 0;
                var max = void 0;
                // 如果配置了风速范围
                if (isValide(this.options.minVelocity) && isValide(this.options.maxVelocity)) {
                    min = this.options.minVelocity;
                    max = this.options.maxVelocity;
                }
                else { // 未配置风速范围取格点数据中的最大风速和最小风速
                    _a = this.field.range, min = _a[0], max = _a[1];
                }
                for (; i < len; i++) {
                    this[this.options.useCoordsDraw ? 'drawCoordsParticle' : 'drawPixelParticle'](particles[i], min, max);
                }
            }
        };
        /**
         * 用于绘制像素粒子
         * @param particle
         * @param min
         * @param max
         */
        BaseLayer.prototype.drawPixelParticle = function (particle, min, max) {
            // TODO 需要判断粒子是否超出视野
            // this.ctx.strokeStyle = color;
            var pointPrev = [particle.x, particle.y];
            // when xt isn't exit
            var pointNext = [particle.xt, particle.yt];
            if (pointNext && pointPrev && isValide(pointNext[0]) &&
                isValide(pointNext[1]) && isValide(pointPrev[0]) &&
                isValide(pointPrev[1])
                && particle.age <= this.options.maxAge) {
                this.ctx.beginPath();
                this.ctx.moveTo(pointPrev[0], pointPrev[1]);
                this.ctx.lineTo(pointNext[0], pointNext[1]);
                if (isFunction(this.options.colorScale)) {
                    // @ts-ignore
                    this.ctx.strokeStyle = this.options.colorScale(particle.m);
                }
                else if (Array.isArray(this.options.colorScale)) {
                    var colorIdx = indexFor$1(particle.m, min, max, this.options.colorScale);
                    this.ctx.strokeStyle = this.options.colorScale[colorIdx];
                }
                if (isFunction(this.options.lineWidth)) {
                    // @ts-ignore
                    this.ctx.lineWidth = this.options.lineWidth(particle.m);
                }
                particle.x = particle.xt;
                particle.y = particle.yt;
                this.ctx.stroke();
            }
        };
        /**
         * 用于绘制坐标粒子
         * @param particle
         * @param min
         * @param max
         */
        BaseLayer.prototype.drawCoordsParticle = function (particle, min, max) {
            // TODO 需要判断粒子是否超出视野
            // this.ctx.strokeStyle = color;
            var source = [particle.x, particle.y];
            // when xt isn't exit
            var target = [particle.xt, particle.yt];
            if (target && source && isValide(target[0]) &&
                isValide(target[1]) && isValide(source[0]) &&
                isValide(source[1]) &&
                this.intersectsCoordinate(target)
                && particle.age <= this.options.maxAge) {
                var pointPrev = this.project(source);
                var pointNext = this.project(target);
                if (pointPrev && pointNext) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(pointPrev[0], pointPrev[1]);
                    this.ctx.lineTo(pointNext[0], pointNext[1]);
                    particle.x = particle.xt;
                    particle.y = particle.yt;
                    if (isFunction(this.options.colorScale)) {
                        // @ts-ignore
                        this.ctx.strokeStyle = this.options.colorScale(particle.m);
                    }
                    else if (Array.isArray(this.options.colorScale)) {
                        var colorIdx = indexFor$1(particle.m, min, max, this.options.colorScale);
                        this.ctx.strokeStyle = this.options.colorScale[colorIdx];
                    }
                    if (isFunction(this.options.lineWidth)) {
                        // @ts-ignore
                        this.ctx.lineWidth = this.options.lineWidth(particle.m);
                    }
                    this.ctx.stroke();
                }
            }
        };
        BaseLayer.prototype.prepareParticlePaths = function () {
            var _a = this.ctx.canvas, width = _a.width, height = _a.height;
            var particleCount = typeof this.options.paths === 'function' ? this.options.paths(this) : this.options.paths;
            var particles = [];
            if (!this.field)
                { return []; }
            if ('startBatchInterpolate' in this.field) {
                this.field.startBatchInterpolate(width, height, this.unproject);
            }
            var i = 0;
            for (; i < particleCount; i++) {
                particles.push(this.field.randomize({
                    age: this.randomize()
                }, width, height, this.unproject));
            }
            return particles;
        };
        BaseLayer.prototype.randomize = function () {
            return Math.floor(Math.random() * this.options.maxAge); // 例如最大生成90帧插值粒子路径
        };
        // @ts-ignore
        BaseLayer.prototype.project = function () {
            var arguments$1 = arguments;

            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments$1[_i];
            }
            throw new Error('project must be overriden');
        };
        // @ts-ignore
        BaseLayer.prototype.unproject = function () {
            var arguments$1 = arguments;

            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments$1[_i];
            }
            throw new Error('unproject must be overriden');
        };
        BaseLayer.prototype.intersectsCoordinate = function (coordinates) {
            throw new Error('must be overriden');
        };
        BaseLayer.prototype.clearCanvas = function () {
            this.stop();
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.forceStop = false;
        };
        BaseLayer.prototype.start = function () {
            this.starting = true;
            this.forceStop = false;
            this._then = Date.now();
            this.animate();
        };
        BaseLayer.prototype.stop = function () {
            cancelAnimationFrame(this.animationLoop);
            this.starting = false;
            this.forceStop = true;
        };
        BaseLayer.prototype.animate = function () {
            if (this.animationLoop)
                { cancelAnimationFrame(this.animationLoop); }
            this.animationLoop = requestAnimationFrame(this.animate);
            var now = Date.now();
            var delta = now - this._then;
            if (delta > this.options.frameRate) {
                this._then = now - (delta % this.options.frameRate);
                this.render();
            }
        };
        /**
         * 渲染前处理
         */
        BaseLayer.prototype.prerender = function () {
            this.generated = false;
            this.particles = this.prepareParticlePaths();
            this.generated = true;
            if (!this.starting && !this.forceStop) {
                this.starting = true;
                this._then = Date.now();
                this.animate();
            }
        };
        /**
         * 开始渲染
         */
        BaseLayer.prototype.render = function () {
            this.moveParticles();
            this.drawParticles();
            this.postrender();
        };
        /**
         * each frame render end
         */
        BaseLayer.prototype.postrender = function () { };
        BaseLayer.Field = Field;
        return BaseLayer;
    }());

    var ViewHint = {
        ANIMATING: 0,
        INTERACTING: 1
    };
    function applyTransform(transform, coordinate) {
        var x = coordinate[0];
        var y = coordinate[1];
        coordinate[0] = transform[0] * x + transform[2] * y + transform[4];
        coordinate[1] = transform[1] * x + transform[3] * y + transform[5];
        return coordinate;
    }
    // @ts-ignore
    var WindLayerRender = /** @class */ (function (_super) {
        __extends(WindLayerRender, _super);
        function WindLayerRender(layer) {
            // @ts-ignore
            return _super.call(this, layer) || this;
        }
        WindLayerRender.create = function (mapRenderer, layer) {
            return new WindLayerRender(layer);
        };
        WindLayerRender.handles = function (layer) {
            return layer.getType() === 'WIND';
        };
        WindLayerRender.prototype.prepareFrame = function (frameState, layerState) {
            var layer = this.getLayer();
            var hints = frameState.viewHints;
            var renderedExtent = frameState.extent;
            if (layerState.extent !== undefined) {
                renderedExtent = extent.getIntersection(renderedExtent, layerState.extent);
            }
            if (!this.wind) { // 默认第一次先进入渲染创建风场实例
                return true;
            }
            if (layer.get('forceRender')) { // 强制渲染
                return true;
            }
            if (hints[ViewHint.ANIMATING] || hints[ViewHint.INTERACTING]) {
                return false;
            }
            if (!hints[ViewHint.ANIMATING] && !hints[ViewHint.INTERACTING] && !extent.isEmpty(renderedExtent)) {
                return true;
            }
            else {
                return !!this.wind;
            }
        };
        WindLayerRender.prototype.composeFrame = function (frameState, layerState, context) {
            var _this = this;
            this.preCompose(context, frameState);
            var layer = this.getLayer();
            var pixelRatio = frameState.pixelRatio;
            var size = frameState.size;
            var width = Math.round(size[0] * pixelRatio);
            var height = Math.round(size[1] * pixelRatio);
            var extent$1 = layerState.extent;
            var clipped = extent$1 !== undefined &&
                !extent.containsExtent(extent$1, frameState.extent) &&
                extent.intersects(extent$1, frameState.extent);
            if (clipped && extent$1 !== undefined) {
                this.clip(context, frameState, extent$1);
            }
            // for performance reasons, context.save / context.restore is not used
            // to save and restore the transformation matrix and the opacity.
            // see http://jsperf.com/context-save-restore-versus-variable
            var alpha = context.globalAlpha;
            context.globalAlpha = layerState.opacity;
            if (!this.innterCanvas || !this.innterCtx) {
                this.innterCanvas = createCanvas(size[0], size[1], pixelRatio);
                this.innterCtx = this.innterCanvas.getContext('2d');
            }
            else if (this.innterCanvas.width != width || this.innterCanvas.height != height) {
                this.innterCanvas.width = width;
                this.innterCanvas.height = height;
            }
            var opt = layer.getWindOptions();
            if (!this.wind && this.innterCtx) {
                var data = layer.getData();
                this.wind = new BaseLayer(this.innterCtx, opt, data);
                // @ts-ignore
                this.wind.project = this.getPixelFromCoordinateInternal.bind(this, frameState);
                // @ts-ignore
                this.wind.intersectsCoordinate = this.intersectsCoordinate.bind(this, frameState);
                this.wind.postrender = function () {
                    context.drawImage(_this.innterCanvas, 0, 0, +_this.innterCanvas.width, +_this.innterCanvas.height);
                    _this.changed();
                };
                this.wind.prerender();
            }
            if (this.wind) {
                if ('generateParticleOption' in opt) {
                    var flag = typeof opt.generateParticleOption === 'function' ? opt.generateParticleOption() : opt.generateParticleOption;
                    flag && this.wind.prerender();
                }
                this.wind.render();
                // this.wind.render = () => {
                //   if (this.innterCanvas.width != width || this.innterCanvas.height != height) {
                //     this.innterCanvas.width = width;
                //     this.innterCanvas.height = height;
                //   }
                //
                //
                //   render.apply(this.wind);
                // };
                // render.apply(this.wind);
            }
            context.globalAlpha = alpha;
            if (clipped) {
                context.restore();
            }
            this.postCompose(context, frameState, layerState);
        };
        WindLayerRender.prototype.getPixelFromCoordinateInternal = function (frameState, coordinate) {
            var viewState = frameState.viewState;
            var pixelRatio = frameState.pixelRatio;
            var viewCoordinate = proj.transform(coordinate, 'EPSG:4326', viewState.projection);
            if (!frameState) {
                return null;
            }
            else {
                var pixel = applyTransform(frameState.coordinateToPixelTransform, viewCoordinate.slice(0, 2));
                // FIXME: should do layer resolution
                // this.renderedResolution = frameState.viewState.resolution;
                // scaleCoordinate(pixel, frameState.viewState.resolution / this.renderedResolution);
                return [
                    pixel[0] * pixelRatio,
                    pixel[1] * pixelRatio
                ];
            }
        };
        WindLayerRender.prototype.intersectsCoordinate = function (frameState, coordinate) {
            var viewState = frameState.viewState;
            var viewCoordinate = proj.transform(coordinate, 'EPSG:4326', viewState.projection);
            return extent.containsCoordinate(frameState.extent, viewCoordinate.slice(0, 2));
        };
        return WindLayerRender;
    }(CanvasImageLayerRenderer));

    var _options = {
        windOptions: {}
    };
    var PerfWindLayer = /** @class */ (function (_super) {
        __extends(PerfWindLayer, _super);
        function PerfWindLayer(data, options) {
            var _this = this;
            var opt = assign({}, _options, options);
            _this = _super.call(this, opt) || this;
            _this.field = null;
            _this.options = opt;
            _this.type = 'WIND';
            _this.pickWindOptions();
            _this._map = opt.map || null;
            if (data) {
                _this.setData(data);
            }
            return _this;
        }
        PerfWindLayer.prototype.pickWindOptions = function () {
            var _this = this;
            Object.keys(defaultOptions$1).forEach(function (key) {
                if (key in _this.options) {
                    if (_this.options.windOptions === undefined) {
                        _this.options.windOptions = {};
                    }
                    // @ts-ignore
                    _this.options.windOptions[key] = _this.options[key];
                }
            });
        };
        /**
         * get wind layer data
         */
        PerfWindLayer.prototype.getData = function () {
            return this.field;
        };
        /**
         * set layer data
         * @param data
         * @returns {WindLayer}
         */
        PerfWindLayer.prototype.setData = function (data) {
            if (data && data.checkFields && data.checkFields()) {
                this.field = data;
            }
            else if (isArray(data)) {
                this.field = formatData(data);
            }
            else {
                console.error('Illegal data');
            }
            return this;
        };
        PerfWindLayer.prototype.updateParams = function (options) {
            if (options === void 0) { options = {}; }
            warnLog('will move to setWindOptions');
            this.setWindOptions(options);
            return this;
        };
        PerfWindLayer.prototype.getParams = function () {
            warnLog('will move to getWindOptions');
            return this.getWindOptions();
        };
        PerfWindLayer.prototype.setWindOptions = function (options) {
            var beforeOptions = this.options.windOptions || {};
            this.options = assign(this.options, {
                windOptions: assign(beforeOptions, options || {})
            });
        };
        PerfWindLayer.prototype.getWindOptions = function () {
            return this.options.windOptions || {};
        };
        PerfWindLayer.prototype.getSourceState = function () {
            return !!this.field ? 'ready' : undefined;
        };
        // @ts-ignore
        PerfWindLayer.prototype.getType = function () {
            return this.type;
        };
        PerfWindLayer.prototype.setMap = function (map) {
            _super.prototype.setMap.call(this, map);
        };
        return PerfWindLayer;
    }(layer.Image));

    // const G = typeof window === 'undefined' ? global : window;
    var _options$1 = {
        windOptions: {}
    };
    // @ts-ignore
    // const ol = G?.ol;
    //
    // if (!ol) {
    //   throw new Error('Before using this plugin, you must first introduce the openlayers <https://openlayers.org/>');
    // }
    var OlWind = /** @class */ (function (_super) {
        __extends(OlWind, _super);
        function OlWind(data, options) {
            if (options === void 0) { options = {}; }
            var _this = this;
            var opt = assign({}, _options$1, options);
            // @ts-ignore
            _this = _super.call(this, options) || this;
            _this.options = opt;
            /**
             * windy layer
             * @type {null}
             */
            _this.wind = null;
            _this.type = 'IMAGE';
            _this.start = _this.start.bind(_this);
            _this.stop = _this.stop.bind(_this);
            _this.pickWindOptions();
            var sourceOptions = {
                logo: options.logo,
                state: options.state,
                attributions: options.attributions,
                resolutions: options.resolutions,
                canvasFunction: _this.canvasFunction.bind(_this),
                // projection: (options.hasOwnProperty('projection') ? options.projection : 'EPSG:3857'),
                ratio: (options.hasOwnProperty('ratio') ? options.ratio : 1)
            };
            _this.setSource(new ImageCanvas(sourceOptions));
            if (data) {
                _this.setData(data);
            }
            return _this;
        }
        /**
         * append layer to map
         * @param map
         */
        OlWind.prototype.appendTo = function (map) {
            if (map) {
                this.setMap(map);
            }
            else {
                throw new Error('not map object');
            }
        };
        OlWind.prototype.start = function () {
            if (this.wind) {
                this.wind.start();
            }
        };
        OlWind.prototype.stop = function () {
            if (this.wind) {
                this.wind.stop();
            }
        };
        OlWind.prototype.canvasFunction = function (extent, resolution, pixelRatio, size, proj) {
            this.pixelRatio = pixelRatio;
            if (!this.canvas) {
                this.canvas = createCanvas(size[0], size[1], pixelRatio, null);
            }
            else {
                this.canvas.width = size[0];
                this.canvas.height = size[1];
            }
            if (this.canvas) {
                this.render(this.canvas);
            }
            return this.canvas;
        };
        OlWind.prototype.getContext = function () {
            if (this.canvas === null)
                { return; }
            return this.canvas.getContext('2d');
        };
        /**
         * render windy layer
         * @param canvas
         * @returns {BMapWind}
         */
        OlWind.prototype.render = function (canvas) {
            var _this = this;
            var map = this.getMap();
            if (!this.getData() || !map)
                { return this; }
            var opt = this.getWindOptions();
            if (canvas && !this.wind) {
                var data = this.getData();
                var ctx = this.getContext();
                if (ctx) {
                    this.wind = new BaseLayer(ctx, opt, data);
                    this.wind.project = this.project.bind(this);
                    this.wind.unproject = this.unproject.bind(this);
                    this.wind.intersectsCoordinate = this.intersectsCoordinate.bind(this);
                    this.wind.postrender = function () {
                        _this.changed();
                    };
                }
            }
            if (this.wind) {
                this.wind.prerender();
                this.wind.render();
            }
            return this;
        };
        OlWind.prototype.project = function (coordinate) {
            var map = this.getMap();
            var pixel = map.getPixelFromCoordinate(proj.transform(coordinate, 'EPSG:4326', this.viewProjection));
            return [
                pixel[0] * this.pixelRatio,
                pixel[1] * this.pixelRatio ];
        };
        OlWind.prototype.unproject = function (pixel) {
            var map = this.getMap();
            var coordinates = map.getCoordinateFromPixel(pixel);
            return proj.transform(coordinates, this.viewProjection, 'EPSG:4326');
        };
        OlWind.prototype.intersectsCoordinate = function (coordinate) {
            var map = this.getMap();
            if (!map)
                { return false; }
            var view = map.getView();
            var size = map.getSize();
            if (view && size) {
                var extent$1 = view.calculateExtent([
                    size[0] * this.pixelRatio,
                    size[1] * this.pixelRatio ]);
                return extent.containsCoordinate(extent$1, proj.transform(coordinate, 'EPSG:4326', this.viewProjection));
            }
            return false;
        };
        OlWind.prototype.pickWindOptions = function () {
            var _this = this;
            Object.keys(defaultOptions$1).forEach(function (key) {
                if (key in _this.options) {
                    if (_this.options.windOptions === undefined) {
                        _this.options.windOptions = {};
                    }
                    // @ts-ignore
                    _this.options.windOptions[key] = _this.options[key];
                }
            });
        };
        /**
         * get wind layer data
         */
        OlWind.prototype.getData = function () {
            return this.field;
        };
        /**
         * set layer data
         * @param data
         * @returns {BMapWind}
         */
        OlWind.prototype.setData = function (data) {
            if (data && data.checkFields && data.checkFields()) {
                this.field = data;
            }
            else if (isArray(data)) {
                this.field = formatData(data);
            }
            else {
                console.error('Illegal data');
            }
            var map = this.getMap();
            if (map && this.canvas && this.field) {
                this.render(this.canvas);
            }
            return this;
        };
        OlWind.prototype.updateParams = function (options) {
            if (options === void 0) { options = {}; }
            warnLog('will move to setWindOptions');
            this.setWindOptions(options);
            return this;
        };
        OlWind.prototype.getParams = function () {
            warnLog('will move to getWindOptions');
            return this.getWindOptions();
        };
        OlWind.prototype.setWindOptions = function (options) {
            var beforeOptions = this.options.windOptions || {};
            this.options = assign(this.options, {
                windOptions: assign(beforeOptions, options || {})
            });
            if (this.wind) {
                this.wind.setOptions(this.options.windOptions);
                this.wind.prerender();
            }
        };
        OlWind.prototype.getWindOptions = function () {
            return this.options.windOptions || {};
        };
        OlWind.prototype.getProjection = function () {
            var projection;
            var map = this.getMap();
            // tslint:disable-next-line: prefer-conditional-expression
            if (map) {
                projection = map.getView() && map.getView().getProjection();
            }
            else {
                projection = 'EPSG:3857';
            }
            return projection;
        };
        /**
         * set map
         * @param map
         */
        OlWind.prototype.setMap = function (map) {
            this.set('originMap', map);
            this.viewProjection = this.getProjection();
            return _super.prototype.setMap.call(this, map);
        };
        /**
         * get map
         */
        OlWind.prototype.getMap = function () {
            return this.get('originMap');
        };
        OlWind.prototype.getType = function () {
            return this.type;
        };
        return OlWind;
    }(layer.Image));
    var WindLayer = OlWind;

    exports.Field = Field;
    exports.PerfWindLayer = PerfWindLayer;
    exports.WindLayer = WindLayer;
    exports.WindLayerRender = WindLayerRender;
    exports.default = OlWind;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ol-wind.js.map
