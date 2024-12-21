<template>
  <div id="olMap">
    <!-- 添加自定义全屏按钮 -->
    <div class="custom-tool custom-reset"
         @click="searchMap"
         title="查询">
      <el-icon>
        <ele-Search />
      </el-icon>
    </div>
    <div class="custom-tool custom-search"
         @click="resetMap"
         title="恢复地图">
      <el-icon>
        <ele-RefreshLeft />
      </el-icon>
    </div>
    <div class="custom-tool custom-fullscreen"
         @click="toggleFullScreen">
      <el-icon>
        <ele-ScaleToOriginal v-if="isFullScreen" />
        <ele-FullScreen v-else />
      </el-icon>
    </div>
  </div>

  <!-- 使用 element-plus 的 popover -->
  <el-popover ref="popoverRef"
              :visible="popoverVisible"
              :virtual-ref="virtualRef"
              virtual-triggering
              trigger="hover"
              placement="top"
              :width="250"
              :show-after="500"
              popper-class="feature-popover"
			  :popper-style="{
              backgroundColor: 'rgba(0, 0, 255, 0.3)', // 设置背景色为蓝色透明度90%
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // 增加阴影效果
              padding: '10px',
              color: '#00ff00', // 设置字体颜色为绿色
              transition: 'all 0.3s ease', // 添加过渡动画效果
            }">
    <template #default>
      <div v-if="currentFeature">
        <div v-for="(value, key) in featureProperties"
             :key="key">
          <template v-if="key !== 'geometry' && key !== 'geom'&&value">
            <strong>{{ key }}：</strong> {{ value }}
          </template>
        </div>
      </div>
    </template>
  </el-popover>
  <operateDrawer ref="drawerRef" />
  <searchDrawer ref="seachRef"
                @search-change="searchChange" />
</template>

<script setup lang="ts">
import operateDrawer from './operateDrawer.vue';
import searchDrawer from './searchDrawer.vue';
import { onMounted, onBeforeUnmount, ref, reactive, nextTick } from 'vue';
import { NextLoading } from '/@/utils/loading';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { defaults as defaultInteractions } from 'ol/interaction/defaults';
import XYZ from 'ol/source/XYZ';
import { Fill, Stroke, Style } from 'ol/style';
import Overlay from 'ol/Overlay';
import * as turf from '@turf/turf';
import { MapBrowserEvent } from 'ol';
import { fromLonLat, toLonLat } from 'ol/proj';

onMounted(() => {
	NextLoading.done();
	initOl();
});
onBeforeUnmount(() => {
	if (map) {
		map.setTarget(null);
	}
});

let map: any = null;
let popup: any = null;
// 添加状态管理
const popoverVisible = ref(false);
const virtualRef = reactive({
	getBoundingClientRect: () => ({
		width: 0,
		height: 0,
		top: mousePosition.y,
		left: mousePosition.x,
		right: mousePosition.x,
		bottom: mousePosition.y,
	}),
});
const currentFeature = ref(null);
// Define an interface for feature properties
interface FeatureProperties {
	[key: string]: any; // Allow any key with any value
}
// Update the featureProperties ref type
const featureProperties = ref<FeatureProperties>({});
const mousePosition = reactive({ x: 0, y: 0 });
const popoverRef = ref();

// 在 script setup 顶部添加一个变量存储原始要素
let originalNodeFeatures: any[] = [];
let originalLineFeatures: any[] = [];

const selectedFeature = ref(null);

// 添加全屏状态控制
const isFullScreen = ref(false);

// 添加获取缩放比例的方法
const getScale = () => {
	const container = document.querySelector('.bg-container');
	if (container) {
		const style = getComputedStyle(container);
		const scaleX = parseFloat(style.getPropertyValue('--scaleX'));
		const scaleY = parseFloat(style.getPropertyValue('--scaleY'));
		return { scaleX, scaleY };
	}
	return { scaleX: 1, scaleY: 1 };
};

// 修改全屏切换方法
const toggleFullScreen = () => {
	isFullScreen.value = !isFullScreen.value;
	updateSizeMap();
};
const updateSizeMap = () => {
	const mapElement = document.getElementById('olMap');
	if (mapElement) {
		if (isFullScreen.value) {
			const { scaleX, scaleY } = getScale();
			mapElement.style.position = 'fixed';
			mapElement.style.top = '0';
			mapElement.style.left = '0';
			// 根据缩放比例计算实际需要的宽高
			mapElement.style.width = `${100 / scaleX}vw`;
			mapElement.style.height = `${100 / scaleY}vh`;
			mapElement.style.zIndex = '9999';
		} else {
			mapElement.style.position = 'relative';
			mapElement.style.width = '100%';
			mapElement.style.height = '100%';
			mapElement.style.zIndex = 'auto';
		}
		// 触发地图重新渲染
		nextTick(() => {
			map.updateSize();
		});
	}
};
const drawerRef = ref();
const openDrawer = () => {
	drawerRef.value.open(selectedFeature.value);
};
const vectorLayerNode = ref<VectorLayer | null>(null);
const vectorLayerLine = ref<VectorLayer | null>(null);
const initOl = () => {
	// WFS 数据源
	const vectorSource = new VectorSource({
		format: new GeoJSON({
			geometryName: 'geom',
		}),
		url:
			'/geoserver/taiwan/ows?' +
			'service=WFS&' +
			'version=2.0.0&' +
			'request=GetFeature&' +
			'typeName=taiwan:power_node&' +
			'outputFormat=application/json&' +
			'srsName=EPSG:4326',
	});

	// 监听数据加载完成事件
	vectorSource.once('featuresloadend', () => {
		// 保存原始要素
		originalNodeFeatures = vectorSource.getFeatures();
		console.log(originalNodeFeatures);
	});

	// WFS 图层
	vectorLayerNode.value = new VectorLayer({
		source: vectorSource,
		style: new Style({
			fill: new Fill({
				color: 'rgba(255, 0, 0, 0.4)',
			}),
			stroke: new Stroke({
				color: '#ff0000',
				width: 2,
			}),
		}),
	});

	// WFS 数据源
	const vectorSourceLine = new VectorSource({
		format: new GeoJSON({
			geometryName: 'geom',
		}),
		url:
			'/geoserver/taiwan/ows?' +
			'service=WFS&' +
			'version=2.0.0&' +
			'request=GetFeature&' +
			'typeName=taiwan:power_line&' +
			'outputFormat=application/json&' +
			'srsName=EPSG:4326',
	});
	vectorSourceLine.once('featuresloadend', () => {
		// 保存原始要素
		originalLineFeatures = vectorSourceLine.getFeatures();
		console.log(originalLineFeatures);
	});
	// WFS 图层
	vectorLayerLine.value = new VectorLayer({
		source: vectorSourceLine,
		style: new Style({
			stroke: new Stroke({
				color: 'blue',
				width: 3,
			}),
		}),
	});

	// 创建弹出层
	popup = new Overlay({
		element: document.getElementById('popup'),
		positioning: 'bottom-center',
		stopEvent: false,
		offset: [0, -10],
		className: 'custom-popup',
		zIndex: 9999999,
	});

	map = new Map({
		target: 'olMap',
		layers: [
			// 高德底图
			new TileLayer({
				source: new XYZ({
					url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
					// crossOrigin: 'anonymous',
					// tileLoadFunction: function (imageTile, src) {
					// 	// 使用滤镜 将白色修改为深色
					// 	const img = new Image();
					// 	// img.crossOrigin = ''
					// 	// 设置图片不从缓存取，从缓存取可能会出现跨域，导致加载失败
					// 	img.setAttribute('crossOrigin', 'anonymous');
					// 	img.onload = function () {
					// 		const canvas = document.createElement('canvas');
					// 		const w = img.width;
					// 		const h = img.height;
					// 		canvas.width = w;
					// 		canvas.height = h;
					// 		const context = canvas.getContext('2d');
					// 		context.filter = 'grayscale(98%) invert(100%) sepia(20%) hue-rotate(180deg) saturate(1600%) brightness(80%) contrast(90%)';
					// 		context.drawImage(img, 0, 0, w, h, 0, 0, w, h);
					// 		imageTile.getImage().src = canvas.toDataURL('image/png');
					// 	};
					// 	img.src = src;
					// },
				}),
			}),
			// 高德注记
			new TileLayer({
				source: new XYZ({
					url: 'https://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
				}),
			}),

			vectorLayerLine.value,
			vectorLayerNode.value, // WFS图层
		],
		view: new View({
			// 使用WMS的bbox围设初始视图
			center: [120.78931808471699, 23.621544837951505],
			zoom: 8,
			projection: 'EPSG:4326',
		}),
		interactions: defaultInteractions({
			doubleClickZoom: false, //屏蔽双击放大事件
		}),
		overlays: [popup], // 添加overlay到地图
	});

	// 修改点击事件处理
	// map.on('click', function (evt: MapBrowserEvent<MouseEvent>) {
	// 	const coordinate = evt.coordinate;

	// 	// 清除所有要素
	// 	vectorLayerNode.value.getSource().clear();
	// 	// 创建圆形
	// 	const point = turf.point([coordinate[0], coordinate[1]]);
	// 	const circle = turf.circle(point, 88, {
	// 		steps: 64,
	// 		units: 'meters',
	// 	});

	// 	const circleFeature = new GeoJSON().readFeature(circle);
	// 	circleFeature.setStyle(
	// 		new Style({
	// 			stroke: new Stroke({
	// 				color: 'green',
	// 				width: 2,
	// 			}),
	// 			fill: new Fill({
	// 				color: 'rgba(0,255,0,0.2)',
	// 			}),
	// 		})
	// 	);
	// 	// 重新添加原始要素并检查相交
	// 	originalNodeFeatures.forEach((feature) => {
	// 		vectorLayerNode.value.getSource().addFeature(feature);

	// 		// 将 OpenLayers Feature 转换为 GeoJSON 格式
	// 		const format = new GeoJSON();
	// 		const featureGeoJSON = format.writeFeatureObject(feature, {
	// 			featureProjection: 'EPSG:4326',
	// 		});

	// 		// 确保我们有正确的 GeoJSON 格式
	// 		if (featureGeoJSON.geometry && featureGeoJSON.geometry.type === 'MultiPolygon') {
	// 			try {
	// 				// 将 MultiPolygon 换为 Feature
	// 				const multiPolygonFeature = turf.multiPolygon(featureGeoJSON.geometry.coordinates);
	// 				// 现在可以使用 turf.intersect
	// 				const intersection = turf.intersect(multiPolygonFeature, circle);
	// 				if (intersection) {
	// 					// console.log('Found intersection:', intersection, '相交面积：', turf.area(intersection));
	// 					// 这里可以处��相交的结果
	// 					const intersectionFeature = new GeoJSON().readFeature(intersection);
	// 					intersectionFeature.setStyle(
	// 						new Style({
	// 							stroke: new Stroke({
	// 								color: 'yellow',
	// 								width: 2,
	// 							}),
	// 							fill: new Fill({
	// 								color: 'rgba(255,255,0,1)',
	// 							}),
	// 						})
	// 					);
	// 					vectorLayerNode.value.getSource().addFeature(intersectionFeature);
	// 				}
	// 			} catch (error) {
	// 				console.warn('Error checking intersection:', error);
	// 			}
	// 		}
	// 	});

	// 	vectorLayerNode.value.getSource().addFeature(circleFeature);
	// });

	// 修改鼠标移动事件处理
	map.on('pointermove', function (evt: MapBrowserEvent<MouseEvent>) {
		const pixel = evt.pixel;
		const features: any[] = [];
		map.forEachFeatureAtPixel(pixel, function (feature) {
			features.push(feature);
		});
		const feature = features[features.length - 1];
		// 更新鼠标位置
		const mapElement = document.getElementById('olMap');
		if (mapElement) {
			mousePosition.x = evt.originalEvent.clientX;
			mousePosition.y = evt.originalEvent.clientY;
		}

		if (feature) {
			// 更新当前要素和��性
			currentFeature.value = feature;
			const { flag, name, centroid_x, centroid_y, rating, voltage, plant_outp, plant_sour } = feature.getProperties();

			if (typeof flag !== 'undefined') {
				featureProperties.value = {
					名称: name,
					经度: centroid_x,
					纬度: centroid_y,
					电压等级: voltage,
				};
				if (flag === 1) {
					featureProperties.value['容量'] = rating;
				} else {
					featureProperties.value['装机容量'] = plant_outp;
					featureProperties.value['发电厂类型'] = plant_sour;
				}
			} else {
				featureProperties.value = {
					名称: name,
					电压等级: voltage,
				};
			}

			popoverVisible.value = true;
			// 设置鼠标样式
			if (mapElement) {
				mapElement.style.cursor = 'pointer';
			}
		} else {
			popoverVisible.value = false;
			currentFeature.value = null;
			featureProperties.value = {};

			// 重置鼠标样式
			if (mapElement) {
				mapElement.style.cursor = '';
			}
		}
	});

	// 添加地图移动事件处理，关闭popover
	map.on('movestart', () => {
		popoverVisible.value = false;
	});

	// 添加双击事件处理
	map.on('dblclick', function (evt: MapBrowserEvent<MouseEvent>) {
		const pixel = evt.pixel;
		const features: any[] = [];
		map.forEachFeatureAtPixel(pixel, function (feature) {
			features.push(feature);
		});

		if (features.length && typeof features[features.length - 1].getProperties().flag !== 'undefined') {
			// 阻止地图缩放
			evt.preventDefault();
			// 更新选中的要素和属性
			selectedFeature.value = features[features.length - 1];
			openDrawer();
			// 显示抽屉
		}
	});
};
const searchChange = (query: any) => {
	let filterFeatures: any[] = [];
	let paramsKey = [];
	if (query.searchType === 'node') {
		filterFeatures = originalNodeFeatures.filter((feature: any) => {
			let searchFlag = true;

			paramsKey = ['flag', 'addr_provi', 'name', 'name_zh', 'voltage'];
			if (query.flag === 1) {
				paramsKey.push('rating');
			} else {
				paramsKey.concat(['plant_outp', 'plant_sour']);
			}
			for (let i = 0; i < paramsKey.length; i++) {
				let featureValue = feature.get(paramsKey[i]);
				let searchValue = query[paramsKey[i]];
				if (searchValue === '') {
					continue;
				}
				// let finded = false;
				// switch (typeof featureValue) {
				// 	case 'number':
				// 		finded = featureValue == searchValue;
				// 		break;
				// 	case 'string':
				// 		finded = featureValue.includes(searchValue);
				// 		break;
				// }
				if (featureValue != searchValue) {
					searchFlag = false;
					break;
				}
			}
			return searchFlag;
		});
		vectorLayerNode.value.getSource().clear();
		filterFeatures.forEach((f: any) => {
			vectorLayerNode.value.getSource().addFeature(f);
		});
	} else {
		filterFeatures = originalLineFeatures.filter((feature: any) => {
			let searchFlag = true;
			paramsKey = ['name', 'voltage'];
			for (let i = 0; i < paramsKey.length; i++) {
				let featureValue = feature.get(paramsKey[i]);
				let searchValue = query[paramsKey[i]];
				if (searchValue === '') {
					continue;
				}
				if (featureValue != searchValue) {
					searchFlag = false;
					break;
				}
			}
			return searchFlag;
		});
		vectorLayerLine.value.getSource().clear();
		filterFeatures.forEach((f: any) => {
			vectorLayerLine.value.getSource().addFeature(f);
		});
	}
	console.log(filterFeatures);
};
const resetMap = () => {
	vectorLayerNode.value.getSource().clear();
	originalNodeFeatures.forEach((f: any) => {
		vectorLayerNode.value.getSource().addFeature(f);
	});
	vectorLayerLine.value.getSource().clear();
	originalLineFeatures.forEach((f: any) => {
		vectorLayerLine.value.getSource().addFeature(f);
	});
};
const seachRef = ref();
const searchMap = () => {
	seachRef.value.open();
};

// 推演相关
const step1Play = (name: string) => {
	// const
	// var coordinates = fromLonLat([longitude, latitude]);
	// 	map.getView().setCenter(coordinates);
	// 	map.getView().setZoom(16);
	// 获取feature的几何形状
	const feature = originalNodeFeatures.find((feature: any) => {
		return feature.get('name') === name;
	});
	console.log(feature);
	const geometry = feature.getGeometry();

	// 使用fit方法将视图聚焦到feature上
	// map.getView().fit(geometry, {
	// 	duration: 1000, // 动画持续时间，以毫秒为单位
	// 	maxZoom: 10,
	// });

	// setTimeout(() => {
	const coordinates = fromLonLat([119.306239, 26.075302]);
	console.log('coordinates', coordinates);
	map.getView().setCenter(coordinates);
	// }, 2000);
};

defineExpose({
	step1Play,
	updateSizeMap,
});
</script>

<style lang="scss" scoped>
#olMap {
	width: 100%;
	height: 100%;
	position: relative;
}

// 修改 popover 样式
:deep(.feature-popover) {
	max-height: 400px;
	overflow-y: auto;

	.el-popover__title {
		margin: 0;
		padding: 8px 0;
		font-size: 16px;
		border-bottom: 1px solid #eee;
	}
}

// 替换原有的全屏按钮样式
.custom-tool {
	position: absolute;
	top: 5px;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 4px;
	padding: 2px;
	cursor: pointer;
	z-index: 1;

	&:hover {
		background-color: rgba(0, 60, 136, 0.7);
		color: white;
	}

	i {
		font-size: 20px;
		padding: 5px;
	}
}
.custom-fullscreen {
	right: 10px;
}
.custom-search {
	right: 40px;
}
.custom-reset {
	right: 70px;
}
</style>
