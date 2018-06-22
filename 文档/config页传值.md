### 小部件config页传值
小部件的config页向主页面内传值依靠的是：在config页内"$scope.config"对象下的属性可以在主页面内通过"$scope.child.config"读取到。例如
```
// 在config页内
$scope.config.number = '1111';
// 那么可以在主页面内
var num = $scope.child.config.number
console.log(num) // 1111
```
config页内的"$scope.config"对象是内置的，千万不要给它赋值。`$scope.config = ''`会破坏这个传值的方式。

### 举个例子
#### 创建小部件
下面创建一个实时刷新警报信息的小部件
你可以在你的plugins文件下创建名为"alarmRealtime"的文件夹并在其下添加"cumulocity.json"文件或者运行

    c8y create:plugin alarmRealtime
然后在其下添加"alarmRealtime.module.js","alarmRealtime.config.js","alarmRealtime.controller.js"和views目录下"alarmRealtime.config.html"及"alarmRealtime.html"

完成后会有如下的结构
```
<根目录>
  ├── node_modules
  │      └── ...
  ├── plugins
  │      ├── alarmRealtime
  │      │       ├── views
  │      │       │     ├── alarmRealtime.html
  │      │       │     └── alarmRealtime.config.html
  │      │       ├── alarmRealtime.module.js
  │      │       ├── alarmRealtime.config.js
  │      │       ├── alarmRealtime.controller.js
  │      └       └── cumulocity.json
  └── cumulocity.json
```
#### 根目录下"cumulocity.json"
在根目录下的"cumulocity.json"文件的"imports"下添加
```
{
  ...,
  "imports": [
    ...,
    "cockpit/home",
    "core/dashboard2",
    "myapplication/alarmRealtime"
  ]
}
```
#### alarmRealtime目录下的"cumulocity.json"文件
```
{
  "name": "alarmRealtime",
  "description": "real time alarm list",
  "ngModules": [
    "myapp.alarmRealtime"
  ],
  "js": [
    "alarmRealtime.module.js",
    "alarmRealtime.config.js",
    "alarmRealtime.controller.js"
  ]
}
```
#### alarmRealtime.module.js
```
(function(){
  'use strict';

  angular.module('myapp.alarmRealtime',[]);
}());
```
#### alarmRealtime.config.js
```
(function(){
  'use strict';

  angular.module('myapp.alarmRealtime').config(configure);

  configure.$inject = [
    'c8yComponentsProvider',
    'gettext'
  ]

  function configure(c8yComponentsProvider,gettext){
    c8yComponentsProvider.add({
      name: 'alarmRealtime',
      nameDisplay: gettext('alarmRealtime'),
      description: gettext('real time alarm list'),
      templateUrl: ':::PLUGIN_PATH:::/views/alarmRealtime.html', // 小部件展示页面
      configTemplateUrl: ':::PLUGIN_PATH:::/views/alarmRealtime.config.html', //小部件的配置页面
      options: {
        noDeviceTarget: false //是否绑定设备，true不绑定
      }
    })
  }
}());
```
#### alarmRealtime.config.html
```
<div ng-controller="alarmRealtimeConfigCtrl">
  <form>
    <div class="form-group">
      <label for="username">用户名</label>
      <input type="text" class="form-control" id="username" placeholder="请输入用户名" ng-model="config.username" required="required"/>
    </div>
  </form>
</div>
```
#### alarmRealtime.controller.js
```
( function() {
'use strict';

angular
  .module('myapp.alarmRealtime')
  .controller('alarmRealtimeCtrl', alarmRealtimeCtrl)
  .controller('alarmRealtimeConfigCtrl', alarmRealtimeConfigCtrl)

alarmRealtimeCtrl.$inject = [
    '$scope',
    'c8yRealtime',
    'c8yAlarms'
]

function alarmRealtimeCtrl($scope, c8yRealtime, c8yAlarms) {
    $scope.deviceId = $scope.child.config.device.id;
    $scope.name = $scope.child.config.username; //这里我们通过$scope.child.config对象下的username获取到了数据
    $scope.alarms = [];
    var scopeId = $scope.$id;
    var channel = '/alarm/alarms/' + $scope.deviceId

    function onRealtimeAlarms() {
        console.log(scopeId)
        c8yAlarms.list({
            source: $scope.deviceId
        }).then(function(alarms) {
            _.forEach(alarms, function(alarm) {
                $scope.alarms.push(alarm);
            });
        })
    }

    function onDestroy() {
        c8yRealtime.stop(scopeId, channel);
    }

    c8yRealtime.addListener(scopeId, channel, c8yRealtime.realtimeActions().UPDATE, onRealtimeAlarms);
    c8yRealtime.start(scopeId, channel);
    $scope.$on('$destroy', onDestroy);
}

alarmRealtimeConfigCtrl.$inject = [
    '$scope',
    '$log'
]

function alarmRealtimeConfigCtrl($scope, $log) {
    if ($scope.config.username == undefined) {
        $scope.config.username = ''; //这里可以给定默认值
    }
}
}());
```
#### alarmRealtime.html
```
<div ng-controller="alarmRealtimeCtrl" class="panel">
  <div class="panel-heading" style="text-align: center;">
    <span class="panel-title">{{name}}</span>
  </div>
  <div class="panel-body">
    <p>{{deviceId}}</p>
    <table class="table">
      <caption>device alarms</caption>
      <thead>
        <tr>
          <th>count</th>
          <th>creationTime</th>
          <th>time</th>
          <th>sourceId</th>
          <th>sourceName</th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="alarm in alarms">
          <td>{{alarm.count}}</td>
          <td>{{alarm.creationTime}}</td>
          <td>{{alarm.time}}</td>
          <td>{{alarm.source.id}}</td>
          <td>{{alarm.source.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```
