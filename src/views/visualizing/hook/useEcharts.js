/*
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-17 23:33:20
 * @LastEditors: 王翔
 * @LastEditTime: 2024-12-18 14:22:38
 * @FilePath: /es-big-screen/Users/wangxiang/ownSystem/map/src/views/visualizing/hook/useEcharts.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/hooks/useECharts.js
import {
  ref
} from 'vue';
import * as echarts from 'echarts';

export function useECharts(chartData) {
  const {stepChart, xData, yData, Xname, Yname} = chartData
  console.log('useECharts',xData, yData, Xname, Yname);
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
          show: true,
          trigger: 'axis',
          // 格式化 tooltip 显示的内容
          // formatter: function (params) {
          //     // params 是一个数组，包含了所有系列的数据信息
          //     // 这里我们只取第一个系列的数据
          //     var result = params[0].name + '<br/>';
          //     result += 'X轴: ' + params[0].value[0] + '<br/>';
          //     result += 'Y轴: ' + params[0].value[1] + '<br/>';
          //     return result;
          // }
        },
        xAxis: [{
          type: 'category',
          name: Xname,
          nameLocation: 'middle',
          nameGap: 25,
          nameTextStyle: {
            color: "#fff", // Y轴名称颜色设置
            fontSize: 14,
          },
          axisLine: {
            lineStyle: {
              color: 'white' // x轴颜色
            }
          },
          axisLabel: {
            textStyle: {
              color: 'white' // x轴文字颜色
            }
          },
          data: xData
        }],
        yAxis: [{
          type: 'value',
          name: Yname,
          nameLocation: 'middle',
          nameTextStyle: {
            color: "#fff", // Y轴名称颜色设置
            fontSize: 14,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'white' // x轴颜色
            }
          },
          axisLabel: {
            textStyle: {
              color: 'white' // x轴文字颜色
            }
          }
        }],
        series: [{
          type: 'line',
          data: yData,
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
  const resetChart = ()=>{
    if(chartInstance.value){
      chartInstance.value.dispose();
    }
  }
  return {
    initChart,
    resetChart
  };
}