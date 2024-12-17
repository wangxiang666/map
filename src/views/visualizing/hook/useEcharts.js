/*
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-17 23:33:20
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-17 23:34:15
 * @FilePath: \map\src\views\visualizing\hook\useEcharts.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/hooks/useECharts.js
import { ref } from 'vue';
import * as echarts from 'echarts';

export function useECharts(stepChart, xData, yData, Xname, Yname) {
    const chartInstance = ref(null);

    const initChart = () => {
        if (stepChart.value) {
            chartInstance.value = echarts.init(stepChart.value);
            const options = {
                // title: {
                //     text: title,
                //     left: 'center',
                // },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'value',
                    name: Xname,
                    nameLocation: 'middle',
                    nameGap: 25,
                },
                yAxis: {
                    type: 'value',
                    name: Yname,
                    nameLocation: 'middle',
                    nameGap: 25,
                },
                series: [{
                    type: 'line',
                    data: xData.map((x, index) => [x, yData[index]]),
                    smooth: true,
                    lineStyle: {
                        color: '#00aaff',
                        width: 2,
                    },
                    itemStyle: {
                        color: '#00aaff',
                    },
                }],
            };
            chartInstance.value.setOption(options);
        }
    };

    return {
        initChart
    };
}