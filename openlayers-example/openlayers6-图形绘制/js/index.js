var map, plotDraw, plotEdit, drawOverlay, drawStyle;
// 绘制几何对象的边框颜色、填充颜色
var drawStrokeColor = "red", drawFillColor = "rgba(0,0,0,0)";

$(document).ready(function (){
    var TiandiMap_vec = new ol.layer.Tile({
        title: "天地图矢量图层",
        source: new ol.source.XYZ({
            url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=e83d04f3e04272b8d9e91615e309fe36",
            wrapX: false,
			crossOrigin: "Anonymous"
        })
    });
    var TiandiMap_cva = new ol.layer.Tile({
        title: "天地图矢量注记图层",
        source: new ol.source.XYZ({
            url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=e83d04f3e04272b8d9e91615e309fe36",
            wrapX: false,
			crossOrigin: "Anonymous"
        })
    })

    // 实例化Map对象加载地图
    map = new ol.Map({
        // 地图容器div的ID
        target: 'mapDiv',
        // 地图容器中加载的图层
        layers: [TiandiMap_vec, TiandiMap_cva],
        // 地图视图设置
        view: new ol.View({
            // 地图初始中心点
            center: [104.066677, 30.657483],
            // 地图初始显示级别
            zoom: 10,
			maxZoom: 20,
            projection: "EPSG:4326"
        }),
		// 比例尺控件
		controls: ol.control.defaults().extend([new ol.control.ScaleLine({
			units: "metric"//设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
		})])
    });
	
	// 初始化标绘绘制工具，添加绘制结束事件响应
    plotDraw = new P.PlotDraw(map);
    plotDraw.on(P.Event.PlotDrawEvent.DRAW_END, onDrawEnd, false, this);

    // 初始化标绘编辑工具
    plotEdit = new P.PlotEdit(map);

	// 初始化显示图层
	initVector();
	
	/* 加载几何对象的关键点数据到图层上 */
	olPointdata.load();
	
	// 初始化右键菜单
	olContextMenu.init([
		{name: "修改", id: "rename", icon: 'fa-files-o'},
		{name: "删除", id: "del", icon: 'fa-trash'},
		{name: "克隆", id: "clone", icon: 'fa-plus'}
	], map, drawOverlay, plotEdit);
	
    map.on('click', function(e) {
        if (plotDraw.isDrawing()) {
            return;
        }
        var feature = map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
            return feature;
        });
		
        if (feature) {
            plotEdit.activate(feature); // 开始编辑
        } else {
            plotEdit.deactivate();// 结束编辑
        }
    });
	
	// 初始化拾色器
	$('.strokeColor, .fillColor, #editFillColor').paigusu({color : '#18dbbe'},function(event,obj){
		var className = $(event).attr("class");
		if(className == "strokeColor"){
			// 绘制几何对象的边框颜色
			drawStrokeColor = '#' + obj.hex;
		}else if(className == "fillColor"){
			// 绘制几何对象的填充颜色
			drawFillColor = '#' + obj.hex;
		}
		$(event).css('background-color','#' + obj.hex)
	});
});

/* 初始化显示图层 */
function initVector(){
    drawOverlay = new ol.layer.Vector({
        source: new ol.source.Vector()
    });
    drawOverlay.setMap(map);
}

// 指定标绘类型，开始绘制。
function activate(type) {
    plotEdit.deactivate();
    plotDraw.activate(type);
};

// 绘制结束后，添加到FeatureOverlay显示。
function onDrawEnd(event) {
    var feature = event.feature;
	
	// 如果绘制类型为文字
	if(P.PlotTypes.TEXT == feature.getGeometry().type){
		layer.prompt({
			title: '输入文字内容', 
			formType: 0, 
			btn2: function() {// 取消按钮
				drawOverlay.getSource().removeFeature(feature);
				// 关闭右键菜单(附带结束编辑、设置鼠标样式为默认)
				olContextMenu.closeContextMenu();
			}
		}, function(text, index){
			layer.close(index);
			// 设置几何对象-文字样式
			setStyle.featureText(feature, text, drawStrokeColor, drawFillColor);
			
			// 关闭右键菜单(附带结束编辑、设置鼠标样式为默认)
			olContextMenu.closeContextMenu();
		});
	}else{
		// 设置几何对象样式
		setStyle.feature(feature, drawStrokeColor, drawFillColor);
	}
	
    drawOverlay.getSource().addFeature(feature);
    // 开始编辑
    plotEdit.activate(feature);
}

var olPointdata = {
	/* 加载几何对象的关键点等数据到图层上 */
	load: function(){
		// 从缓存中读取几何对象的关键点数据、填充颜色、边框颜色
		var pointsData = $.cookie("pointsData");
		if(pointsData){
			// 解析几何对象的关键点数据、填充颜色、边框颜色
			pointsData = JSON.parse(pointsData)
			$(pointsData).each(function(i, data){
				// 几何对象类型
				var type = Object.keys(data)[0];
				// 几何对象填充颜色
				var fillColor = data["fillColor"];
				// 几何对象边框颜色
				var strokeColor = data["strokeColor"];
				
				var feature = new ol.Feature({
					geometry: new P.PlotFactory.createPlot(type, data[type])
				});
				
				// 如果绘制类型为文字
				if(P.PlotTypes.TEXT == feature.getGeometry().type){
					var textContent = data["textContent"];
					// 设置几何对象-文字样式
					setStyle.featureText(feature, textContent, strokeColor, fillColor);
				}else{
					// 设置几何对象样式
					setStyle.feature(feature, strokeColor, fillColor);
				}
				
				drawOverlay.getSource().addFeature(feature);
			});
		}
	},
	/* 获取图层上所有几何对象的关键点等数据 */
	get: function() {
		var pointsData = [];
		var features = drawOverlay.getSource().getFeatures();
		$(features).each(function (i, feature){
			var geometry = feature.getGeometry();
			
			var fillColor = null, strokeColor = null, textContent = null;
			// 如果绘制类型为文字
			if(P.PlotTypes.TEXT == feature.getGeometry().type){
				fillColor = feature.getStyle().getText().getFill().getColor();
				strokeColor = feature.getStyle().getText().getStroke().getColor();
				textContent = feature.getStyle().getText().getText();
			}else{
				// 获取几何对象填充颜色
				fillColor = feature.getStyle().getFill().getColor();
				// 获取几何对象边框颜色
				strokeColor = feature.getStyle().getStroke().getColor();
			}
			
			// 获取几何对象类型
			var type = geometry.type;
			// 记录对象的关键点数据、填充颜色、边框颜色、文字内容
			pointsData.push({[type]: geometry.points, "fillColor": fillColor, "strokeColor":　strokeColor, "textContent": textContent});
		});
		return pointsData;
	},
	/* 显示关键点数据 */
	showPoints: function(){
		var pointsData = this.get();
		
		layer.alert(JSON.stringify(pointsData));
	},
	/* 把图层上所有几何对象的关键点等数据保存到缓存 */
	save: function(){
		var pointsData = this.get();
		
		// 把几何对象的关键点数据、填充颜色、边框颜色、文字内容写入缓存
		$.cookie("pointsData", JSON.stringify(pointsData));
		console.log(JSON.stringify(pointsData));
		layer.msg("保存成功");
	}
};

var setStyle = {
	/* 设置几何对象样式 */
	feature: function (feature, strokeColor, fillColor){
		// 几何图形边框颜色
		var stroke = new ol.style.Stroke({
			color: strokeColor,
			width: 2
		});
		// 几何图形填充颜色
		var fill = new ol.style.Fill({
			color: fillColor
		});
		// 几何图形点的样式
		var image = new ol.style.Circle({
			fill: fill,
			stroke: stroke,
			radius: 10
		});
		drawStyle = new ol.style.Style({
			image: image,
			fill: fill,
			stroke: stroke
		});
		feature.setStyle(drawStyle);
	},
	/* 设置几何对象-文字样式 */
	featureText: function (feature, textContent, strokeColor, fillColor){
		drawStyle =  new ol.style.Style({
			text: new ol.style.Text({
				textAlign: 'center',
				textBaseline: 'middle',
				font: 'normal 18px 微软雅黑',
				text: textContent,
				fill: new ol.style.Fill({ color: fillColor }),
				stroke: new ol.style.Stroke({ color: strokeColor, width: 5 })
			})
		});
		feature.setStyle(drawStyle);
	}
};

var operation = {
	/* 清空地图 */
	clearMap: function (){
		drawOverlay.getSource().clear();
		layer.msg("清空地图成功");
	},
	/* 删除上一个图形 */
	delLast: function (){
		var source = drawOverlay.getSource();
		var features = source.getFeatures();
		var featuresLength = features.length;
		
		if(featuresLength > 0){
			source.removeFeature(features[featuresLength-1]);
			layer.msg("删除最后一个图形成功");
		}else{
			layer.msg("没有可以删除的几何对象");
		}
	},
	/* 删除指定类型的几何对象 */
	deleteGraph: function (_obj, type){
		var source = drawOverlay.getSource();
		var features = source.getFeatures();
		
		var isDelete = false;
		$(features).each(function (i, feature){
			if(type === feature.getGeometry().type){
				source.removeFeature(feature);
				isDelete = true;
			}
		});
		
		var typeText = $(_obj).text();
		layer.msg(isDelete?"删除指定类型["+ typeText +"]成功" : "没有找到你想删除的类型["+ typeText +"]");
	},
	/* 导出图片 */
	exportImg: function (){
		map.once('rendercomplete', function () {
			var mapCanvas = document.createElement('canvas');
			var size = map.getSize();
			mapCanvas.width = size[0];
			mapCanvas.height = size[1];
			var mapContext = mapCanvas.getContext('2d');
			Array.prototype.forEach.call(
				document.querySelectorAll('.ol-layer canvas'),
				function (canvas) {
					if (canvas.width > 0) {
						var opacity = canvas.parentNode.style.opacity;
						mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
						var transform = canvas.style.transform;
						var matrix = transform
							.match(/^matrix\(([^\(]*)\)$/)[1]
							.split(',')
							.map(Number);
						CanvasRenderingContext2D.prototype.setTransform.apply(
							mapContext,
							matrix
						);
						mapContext.drawImage(canvas, 0, 0);
					}
				}
			);
			if (navigator.msSaveBlob) {
				navigator.msSaveBlob(mapCanvas.msToBlob(), 'map.png');
			} else {
				var link = document.getElementById('image-download');
				link.href = mapCanvas.toDataURL();
				link.click();
			}
		});
		map.renderSync();
	}
};

