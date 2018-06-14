## angular生命周期
### angular模块
#### 配置块
AngularJS模块加载阶段，提供者可以在其注册和配置的过程中对模块进行配置。

	angular.module('myapp').config(function(){
		// ...
	})
configFunction(函数)：AngularJS在模块加载时会执行这个函数。
#### 运行块
运行块在注入器创建之后立即执行，是所有angularJS应用中第一个被执行的方法。运行块通常用来注册全局的事件。

例如，在run()块中设置路由监听，每次路由变化时都来验证用户的权限。

	angular.module('myapp').run(function($rootScope,AuthService){
		$rootScope.$on('$routeChangeStart', function(evt, next, current) {
			// 如果用户未登录
			if (!AuthService.userLoggedIn()) {
				if (next.templateUrl === "login.html") {
					// 已经转向登录路由因此无需重定向
				} else {
					$location.path('/login');
				}
			}
		});
	});
run()中的函数会在AngularJS在注入器创建后执行这个函数

	<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <title>angularjs生命周期</title>
	  <script src="http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
	</head>
	<body>
	  <div ng-app="app" ng-controller="ctrl">
	    <p>hello {{data}}</p>
	    <input type="text" ng-model="data">
	  </div>
	
	  <script type="text/javascript">
	    angular.module('app',[]);
	    angular.module('app')
	      .config(function(){
	        console.log('config函数')
	      })
	      .run(function(){
	        console.log('run函数')
	      })
	      .controller('ctrl', function($scope){
	        console.log('controller函数')
	        $scope.data = 'world'
	      })
	  </script>
	</body>
	</html>
运行上列代码会发现

	config函数
	run函数
	controller函数
### angularJS生命周期
#### 1.编译(compile)
在编译阶段，AngularJS会遍历整个HTML文档并根据JavaScript中的指令定义来处理页面上声明的指令。

编译函数负责对模板DOM进行转换。
#### 2.链接(link)
链接函数负责将作用域和DOM进行链接。
### $scope
#### 1.创建
在创建控制器或指令时，AngularJS会用 $injector 创建一个新的作用域，并在这个新建的控制器或指令运行时将作用域传递进去。
#### 2.链接
当Angular开始运行时，所有的 $scope 对象都会附加或者链接到视图中。所有创建 $scope 对
象的函数也会将自身附加到视图中。这些作用域将会注册当Angular应用上下文中发生变化时需要运行的函数。

这些函数被称为 $watch 函数，Angular通过这些函数获知何时启动事件循环。
#### 3.更新
当事件循环运行时，它通常执行在顶层 $scope 对象上（被称作 $rootScope ），每个子作用域都执行自己的脏值检测。每个监控函数都会检查变化。如果检测到任意变化， $scope 对象就会触发指定的回调函数。
#### 4.销毁
当一个 $scope 在视图中不再需要时，这个作用域将会清理和销毁自己。
尽管永远不会需要清理作用域（因为Angular会为你处理），但是知道是谁创建了这个作用域还是有用的，因为你可以使用这个 $scope 上叫做 $destory() 的方法来清理这个作用域。

onInit postLink onChanges onDestroy
