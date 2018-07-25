import $ from 'jquery';
import './index.css';

// // 引入 ECharts 主模块
// var echarts = require('echarts/lib/echarts');
// // 引入柱状图
// require('echarts/lib/chart/bar');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
//
// // 基于准备好的dom，初始化echarts实例
// var myChart = echarts.init(document.getElementById('main'));
// // 绘制图表
// myChart.setOption({
//   title: {
//     text: 'ECharts 入门示例'
//   },
//   tooltip: {},
//   xAxis: {
//     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//   },
//   yAxis: {},
//   series: [{
//     name: '销量',
//     type: 'bar',
//     data: [5, 20, 36, 10, 10, 20]
//   }]
// });

var map = new AMap.Map('container');
var map = new AMap.Map('container', {
  zoom:11,//级别
  center: [116.397428, 39.90923],//中心点坐标
  viewMode:'3D'//使用3D视图
});

$(document).ready(function () {
  $("p").click(function () {
    $(this).hide();
  });
});