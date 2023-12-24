var olContextMenu = {
	menuArray: null,
	feature: null,
	overlay: null,
	id: "contextmenu",
	className: "contextmenu",
	map: null,
	drawOverlay: null,
	plotEdit: null,
	init: function (menuArray, map, drawOverlay, plotEdit){
		this.menuArray = menuArray;
		this.map = map;
		this.drawOverlay = drawOverlay;
		this.plotEdit = plotEdit;
		
		// 创建右键菜单节点
		this.createElement();
		
		// 把右键菜单放在地图叠置层上
		this.createOverlay();
		
		// 地图上右键事件
		$(this.map.getViewport()).on("contextmenu", this.openContextMenu);
		
		// 鼠标离开右键菜单事件
		$("#"+this.id).on("mouseleave", this.closeContextMenu);
		
		// 绑定右键菜单对应操作事件
		this.bindMenuEvent();
	},
	/* 绑定右键菜单对应操作事件 */
	bindMenuEvent: function(){
		$(this.menuArray).each(function(i, menu){
			$("#"+menu.id).on("click", olContextMenu.operation[menu.id]);
		});
	},
	// 关闭右键菜单(附带结束编辑、设置鼠标样式为默认)
	closeContextMenu: function(e){
		// 隐藏右键菜单
		olContextMenu.overlay.setPosition(null);
		// 结束编辑
		olContextMenu.plotEdit.deactivate();
		// 设置鼠标样式为默认
		olContextMenu.map.getViewport().style.cursor = 'default';
	},
	/* 打开右键菜单 */
	openContextMenu: function(e){
		//屏蔽自带的右键事件
		e.preventDefault();
		
		// 这里xy-8是因为在同一位置点击、左键点击值([315,316] 正确)和右键点击值([323,324] 错误)差8
		var pixel = [e.clientX - 8, e.clientY - 8];
		olContextMenu.feature = map.forEachFeatureAtPixel(pixel, function(feature){
			return feature;
		});
		
		if(olContextMenu.feature){
			// 隐藏右键菜单的重命名
			olContextMenu.hideReName();
			// 如果是文字类型 显示右键菜单的重命名
			if(P.PlotTypes.TEXT == olContextMenu.feature.getGeometry().type){
				olContextMenu.showReName();
			}
			
			olContextMenu.map.getViewport().style.cursor = 'text';
			var coordinate = map.getEventCoordinate(event);
			olContextMenu.overlay.setPosition([coordinate[0], coordinate[1]]);
		}else{
			olContextMenu.overlay.setPosition(null);
		}
	},
	/* 隐藏重命名 */
	hideReName: function(){
		$("#"+this.id+" #rename").parent().hide();
	},
	/* 显示重命名 */
	showReName: function(){
		$("#"+this.id+" #rename").parent().show();
	},
	/* 把右键菜单放在地图叠置层上 */
	createOverlay: function(){
		this.overlay = new ol.Overlay({
			element: document.getElementById(this.id)
			//positioning: 'center-center'
		});
		this.map.addOverlay(this.overlay);
	},
	/* 创建右键菜单节点 */
	createElement: function(){
		var menuDiv = document.createElement("div"); 
		menuDiv.id = this.id;
		menuDiv.className = this.className;
		document.body.appendChild(menuDiv);
		
		var menuUl = document.createElement("ul");
		menuDiv.appendChild(menuUl);
		
		$(this.menuArray).each(function(i, menu){
			var menuLi = document.createElement("li");
			menuUl.appendChild(menuLi);
			
			var menuI = document.createElement("i"); 
			menuI.className = "fa " + menu.icon;
			menuLi.appendChild(menuI);
			
			var menuA = document.createElement("a"); 
			menuA.innerHTML = "&nbsp;&nbsp;" + menu.name;
			menuA.href = "javascript:void(0)";
			menuA.id = menu.id;
			menuLi.appendChild(menuA);
		});
	},
	/* 操作 */
	operation: {
		/* 重命名 */
		rename: function(){
			// 关闭右键菜单(附带结束编辑、设置鼠标样式为默认)
			olContextMenu.closeContextMenu();
			
			layer.prompt({title: '输入文字内容', formType: 0, maxlength: 10}, function(text, index){
				layer.close(index);
				setStyle.featureText(olContextMenu.feature, text, drawStrokeColor, drawFillColor);
			});
		},
		/* 删除 */
		del: function (){
			olContextMenu.drawOverlay.getSource().removeFeature(olContextMenu.feature);
			
			// 关闭右键菜单(附带结束编辑、设置鼠标样式为默认)
			olContextMenu.closeContextMenu();
		},
		/* 克隆 */
		clone: function (){
			var geometry = olContextMenu.feature.getGeometry();
			var newPoints = [];
			
			// 获取地图当前缩放级别
			var currZoom = parseInt(olContextMenu.map.getView().getZoom());
			var offestX = 15 / (1.5285 * Math.pow(2, (currZoom - 2)));
			// 把被克隆的几何对象的关键点都往右移一点
			$(geometry.points).each(function(i, point){
				newPoints.push([point[0] + offestX, point[1]]);
			});
			// 获取被克隆的几何对象的类型
			var type = geometry.type;
			// 创建一个新的几何对象
			var newFeature = new ol.Feature({
				geometry: new P.PlotFactory.createPlot(type, newPoints)
			});
			// 设置新的几何对象的样式(边框颜色、填充颜色) 为 被克隆的几何对象样式
			newFeature.setStyle(olContextMenu.feature.getStyle());
			olContextMenu.drawOverlay.getSource().addFeature(newFeature);
			
			// 关闭右键菜单(附带结束编辑、设置鼠标样式为默认)
			olContextMenu.closeContextMenu();
		},
		/* 修改填充颜色 */
		editFillColor: function(){
			
		}
	}
}