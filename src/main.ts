/*
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-05 23:16:29
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-12 21:13:40
 * @FilePath: \map\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
import pinia from '/@/stores/index';
import App from './App.vue';
import router from './router';
import { directive } from '/@/utils/directive';
import { i18n } from '/@/i18n/index';
import other from '/@/utils/other';
import ElementPlus from 'element-plus';

import 'element-plus/dist/index.css';
import '/@/theme/index.scss';
import mitt from 'mitt';
import VueGridLayout from 'vue-grid-layout';
import { getUpFileUrl, handleTree, parseTime, selectDictLabel } from '/@/utils/gfast';
import { useDict } from '/@/api/system/dict/data';
import { getItems, setItems, getOptionValue, isEmpty } from '/@/api/items';
// 分页组件
import pagination from '/@/components/pagination/index.vue';

// 大文件上传组件
// @ts-ignore
import uploader from 'vue-simple-uploader';
import 'vue-simple-uploader/dist/style.css';
import VueUeditorWrap from 'vue-ueditor-wrap';

const app = createApp(App);

directive(app);
other.elSvg(app);

app.component('pagination', pagination);
app.use(pinia).use(uploader).use(router).use(ElementPlus, { zIndex: 999999 }).use(i18n).use(VueGridLayout).use(VueUeditorWrap).mount('#app');

app.config.globalProperties.getUpFileUrl = getUpFileUrl;
app.config.globalProperties.handleTree = handleTree;
app.config.globalProperties.useDict = useDict;
app.config.globalProperties.selectDictLabel = selectDictLabel;

app.config.globalProperties.getItems = getItems;
app.config.globalProperties.setItems = setItems;
app.config.globalProperties.getOptionValue = getOptionValue;
app.config.globalProperties.isEmpty = isEmpty;
app.config.globalProperties.parseTime = parseTime;

const globalProperties = {
	mittBus: mitt(),
	i18n,
};

//必须合并vue默认的变量，否则有问题
app.config.globalProperties = Object.assign(app.config.globalProperties, globalProperties);
