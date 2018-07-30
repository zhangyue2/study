import $ from 'jquery/dist/jquery.min';
import './iconfont/iconfont.css';
import './index.css';
import {login} from "./login";
import {getDevice} from "./getDevice";
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

$(document).ready(function () {
  if (sessionStorage.getItem('_tcy8')) {
    getContent();
  } else {
    $('#login').show();
    $('#loading').hide();
    $('#content').hide();
  }

  let url = `${window.location.protocol}//${window.location.host}`;

  $('.input-group').on('blur', '.form-control', function () {
    var _this = $(this);
    if (!_this.val()) {
      _this.css({
        borderColor: 'red'
      });
      _this.prev().css({
        backgroundColor: 'red',
        color: '#fff',
        borderColor: 'red'
      })
    } else {
      _this.css({
        borderColor: '#E5E7E7'
      });
      _this.prev().css({
        backgroundColor: '#E5E7E7',
        color: '#333',
        borderColor: '#E5E7E7'
      })
    }
  });

  $('.btn').click(function () {
    login((data) => {
      getContent();
    });
  });

  $('#password').keypress(function (e) {
    if (e.keyCode === 13) {
      login((data) => {
        getContent();
      });
    }
  });

  function getContent() {
    $('#login').hide();
    $('#loading').show();
    $.getScript('https://webapi.amap.com/maps?v=1.4.8&key=450aacc9d861f105dcd645d385c0a313&plugin=AMap.MarkerClusterer', function () {
      $('#loading').hide();
      $('#content').show();
      var markers = [];
      var map = new AMap.Map("map", {
        resizeEnable: true,
        expandZoomRange: true,
        zoom: 12,
        zooms: [3, 20],
        mapStyle: 'amap://styles/darkblue'
      });
      //默认样式
      const hai = new AMap.MarkerClusterer(map, markers, {gridSize: 80});
      // 右上饼图
      var topChart = echarts.init(document.getElementById('right-top'), 'dark');
      //右下饼图
      var bottomChart = echarts.init(document.getElementById('right-bottom'), 'dark');

      topChart.showLoading();
      bottomChart.showLoading();
      getDevice('', (res) => {
        var len = res.length;
        getDevice('$filter=(c8y_Availability.status eq \'AVAILABLE\')', (ableRes) => { // 获取可用设备
          topChart.hideLoading();
          topChart.setOption({
            title: {
              text: '可用设备',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            backgroundColor: 'rgba(0,0,0,0)',
            legend: {
              orient: 'vertical',
              x: 'left',
              data: ['可用设备', '不可用设备']
            },
            series: [
              {
                name: '设备总量',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [
                  {value: ableRes.length, name: '可用设备'},
                  {value: len - ableRes.length, name: '不可用设备'}
                ]
              }
            ]
          });
        });
        getDevice('$filter=(c8y_Connection.status eq \'CONNECTED\')', (conRes) => { // 获取在线设备
          bottomChart.hideLoading();
          bottomChart.setOption({
            title: {
              text: '设备',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            backgroundColor: 'rgba(0,0,0,0)',
            legend: {
              orient: 'vertical',
              x: 'left',
              data: ['在线设备', '不在线设备']
            },
            series: [
              {
                name: '设备',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [
                  {value: conRes.length, name: '在线设备'},
                  {value: len - conRes.length, name: '不在线设备'}
                ]
              }
            ]
          });
        });
        for (let i = 0; i < len; i++) {
          if (res[i].c8y_Position) {
            var gps = [res[i].c8y_Position.lng, res[i].c8y_Position.lat];
            AMap.convertFrom(gps, 'gps', function (status, result) {
              if (result.info === 'ok') {
                hai.addMarker(new AMap.Marker({
                  position: [result.locations[0].P, result.locations[0].O],
                  content: '<a href="' + url + '/apps/devicemanagement/index.html#/device/' + res[i].id + '/info" style="display: block; background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></a>',
                  offset: new AMap.Pixel(-15, -15)
                }))
              }
            })
          }
        }
      });
    });

  }
});
