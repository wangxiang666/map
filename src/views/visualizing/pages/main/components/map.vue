<template>
  <div id="olMap"></div>

  <!-- 使用 element-plus 的 popover -->
  <el-popover ref="popoverRef"
              :visible="popoverVisible"
              :virtual-ref="virtualRef"
              virtual-triggering
              trigger="hover"
              placement="top"
              :width="150"
              :show-after="500"
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
import { onMounted, onBeforeUnmount, ref, reactive, nextTick } from 'vue';
import { NextLoading } from '/@/utils/loading';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import XYZ from 'ol/source/XYZ';
import { Fill, Stroke, Style } from 'ol/style';
import Overlay from 'ol/Overlay';
import { ElPopover } from 'element-plus';
import FullScreen from 'ol/control/FullScreen';
import * as turf from '@turf/turf';
import { MapBrowserEvent } from 'ol';

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
const popoverRef = ref()

// 在 script setup 顶部添加一个变量存储原始要素
let originalFeatures: any[] = [];

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

	// 监听数据加载完成事件
	vectorSource.once('featuresloadend', () => {
		// 保存原始要素
		originalFeatures = vectorSource.getFeatures();
	});

	// WFS 图层
	const vectorLayerNode = new VectorLayer({
		source: vectorSource,
		style: new Style({
			fill: new Fill({
				color: 'rgba(255, 0, 0, 0.4)'
			}),
			stroke: new Stroke({
				color: '#ff0000',
				width: 2
			})
		})
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
			vectorLayerNode, // WFS图层
		],
		view: new View({
			// 使用WMS的bbox围设置初始视图
			center: [120.78931808471699, 23.621544837951505],
			zoom: 8,
			projection: 'EPSG:4326',
		}),
			overlays: [popup], // 添加overlay到地图
	});

	// 修改全屏控件的创建和处理
	const fullScreenControl = new FullScreen({
		className: 'ol-fullscreen',
		tipLabel: '全屏',
		target: document.getElementById('map'),
	});
	// 监听全屏变化事件
	document.addEventListener('fullscreenchange', () => {
    // console.log('popoverRef',popoverRef.value.popperRef)
		// 获取当前全屏元素
    const fullscreenElement = document.fullscreenElement;
    if (fullscreenElement) {
      // 如果进入全屏，将 popover 重新挂载到全屏元素内
      const popover = document.querySelector('.el-popper');
      if (popover) {
        fullscreenElement.appendChild(popover);
      }
    }else{
      //如果退出全屏，将 popover 重新挂载到 body 内
      const popover = document.querySelector('.el-popper');
      if (popover) {
        document.body.appendChild(popover);
      }
    }
	});
	map.addControl(fullScreenControl);

	// 修改点击事件处理
	map.on('click', function(evt: MapBrowserEvent<MouseEvent>) {
		const coordinate = evt.coordinate;
		console.log('点击位置经纬度:', coordinate);

		// 清除所有要素
		vectorLayerNode.getSource().clear();
		// 创建圆形
		const point = turf.point([coordinate[0], coordinate[1]]);
		const circle = turf.circle(point, 10, { 
				steps: 64,
				units: 'kilometers'
		});

		const circleFeature = new GeoJSON().readFeature(circle);
    console.log(circle)
    circleFeature.setStyle(
        new Style({
          stroke: new Stroke({
            color: "green",
            width: 2
          }),
          fill: new Fill({
            color: "rgba(0,255,0,0.2)"
          })
        })
      );
		// 重新添加原始要素并检查相交
		originalFeatures.forEach(feature => {
			vectorLayerNode.getSource().addFeature(feature);
      
      // 将 OpenLayers Feature 转换为 GeoJSON 格式
      const format = new GeoJSON();
      const featureGeoJSON = format.writeFeatureObject(feature, {
        featureProjection: 'EPSG:4326'
      });
      
      // 确保我们有正确的 GeoJSON 格式
      if (featureGeoJSON.geometry && featureGeoJSON.geometry.type === 'MultiPolygon') {
        try {
          // 将 MultiPolygon 转换为 Feature
          const multiPolygonFeature = turf.multiPolygon(featureGeoJSON.geometry.coordinates);
          // 现在可以使用 turf.intersect
          const intersection = turf.intersect(multiPolygonFeature, circle);
          if (intersection) {
            console.log('Found intersection:', intersection,'相交面积：',turf.area(intersection));
            // 这里可以处理相交的结果
            const intersectionFeature = new GeoJSON().readFeature(intersection);
              intersectionFeature.setStyle(
                new Style({
                  stroke: new Stroke({
                    color: "yellow",
                    width: 2
                  }),
                  fill: new Fill({
                    color: "rgba(255,255,0,1)"
                  })
                })
              );
              vectorLayerNode.getSource().addFeature(intersectionFeature);
          }
        } catch (error) {
          // console.warn('Error checking intersection:', error);
        }
      }
		});

		vectorLayerNode.getSource().addFeature(circleFeature);
	});
  // 修改鼠标移动事件处理
	map.on('pointermove', function (evt: MapBrowserEvent<MouseEvent>) {
		const pixel = evt.pixel;
		const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
			return feature;
		});

		// 更新鼠标位置
		const mapElement = document.getElementById('olMap');
		if (mapElement) {
			mousePosition.x = evt.originalEvent.clientX;
			mousePosition.y = evt.originalEvent.clientY;
		}

		if (feature) {
      console.log('当前要素：', feature,feature.getProperties());
      const layer = feature.get('layer');
      // console.log('当前图层：', layer);
			// 更新当前要素和属性
			currentFeature.value = feature;
      const {name} = feature.getProperties();
			featureProperties.value = {
        '名称':name,
        '经度':evt.coordinate[0].toFixed(6),
        '纬度':evt.coordinate[1].toFixed(6),
      };

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
};
</script>

<style lang='scss' scoped>
#olMap {
	width: 100%;
	height: 100%;
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
