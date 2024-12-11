<template>
  <div id="olMap"></div>

  <!-- 使用 element-plus 的 popover -->
  <el-popover ref="popoverRef"
              :visible="popoverVisible"
              :virtual-ref="virtualRef"
              virtual-triggering
              trigger="hover"
              placement="top"
              :width="300"
              popper-class="feature-popover">
    <template #default>
      <div v-if="currentFeature">
        <div v-for="(value, key) in featureProperties"
             :key="key">
          <template v-if="key !== 'geometry' && key !== 'geom'">
            <strong>{{ key }}:</strong> {{ value }}
          </template>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang='ts'>
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue';
import { NextLoading } from '/@/utils/loading';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import XYZ from 'ol/source/XYZ';
import { Fill, Stroke, Style, Circle as CircleStyle } from 'ol/style';
import TileWMS from 'ol/source/TileWMS';
import Overlay from 'ol/Overlay';
import { ElPopover } from 'element-plus';
import FullScreen from 'ol/control/FullScreen';

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
const featureProperties = ref({});
const mousePosition = reactive({ x: 0, y: 0 });

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
			'typeName=taiwan:node&' +
			'outputFormat=application/json&' +
			'srsName=EPSG:4326',
	});

	// WFS 图层
	const vectorLayer = new VectorLayer({
		source: vectorSource,
		style: new Style({
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
			'typeName=taiwan:line&' +
			'outputFormat=application/json&' +
			'srsName=EPSG:4326',
	});
	// WFS 图层
	const vectorLayerLine = new VectorLayer({
		source: vectorSourceLine,
		style: new Style({
			stroke: new Stroke({
				color: 'blue',
				width: 2,
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
				}),
			}),
			// 高德注记
			new TileLayer({
				source: new XYZ({
					url: 'https://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
				}),
			}),
			vectorLayerLine,
			vectorLayer, // WFS图层
		],
		view: new View({
			// 使用WMS的bbox范围来设置初始视图
			center: [120.78931808471699, 23.621544837951505],
			zoom: 8,
			projection: 'EPSG:4326',
		}),
		overlays: [popup], // 添加overlay到地图
	});

	// 修改鼠标移动事件处理
	map.on('pointermove', function (evt) {
		const pixel = evt.pixel;
		const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
			return feature;
		});

		// 更新鼠标位置
		const mapElement = document.getElementById('olMap');
		if (mapElement) {
			const rect = mapElement.getBoundingClientRect();
			mousePosition.x = evt.originalEvent.clientX;
			mousePosition.y = evt.originalEvent.clientY;
		}

		if (feature) {
			// 更新当前要素和属性
			currentFeature.value = feature;
			featureProperties.value = feature.getProperties();
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

	// 创建全屏控件
	const fullScreenControl = new FullScreen({
		// 可选：自定义全屏按钮的CSS类名
		className: 'ol-fullscreen',
		// 可选：自定义标签文本
		tipLabel: '全屏',
		// 可选：自定义标签文本（退出全屏时）
		// labelActive: '退出',
		// 可选：指定要全屏显示的目标元素（默认为地图容器）
		target: document.getElementById('map'),
	});

	// 将全屏控件添加到地图
	map.addControl(fullScreenControl);
};
</script>

<style lang='scss' scoped>
#olMap {
	width: 100%;
	height: 100%;
}

// 可以自定义 popover 样式
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

:deep(.ol-fullscreen) {
	top: 5px;
	right: 0.5em;
}

/* 全屏按钮悬停效果 */
.ol-fullscreen:hover {
	background-color: rgba(0, 60, 136, 0.7);
}

/* 全屏时按钮的样式 */
.ol-fullscreen.ol-full-screen-true {
	background-color: rgba(0, 60, 136, 0.4);
}
</style>
