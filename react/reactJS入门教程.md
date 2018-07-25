```
var names = ['Jack','Tom','Alice'];
React.render(
  <div>
  {
    names.map(function(name){
      return <div>Hello, {name}!</div>
      })
  }
  </div>,
  document.getElementById('root');
  );

var arr = [
  <h1>Hello World!</h1>,
  <h2>React is perfect!</h2>
];

React.render(
  <div>*{arr}*</div>,
  document.getElementById('root');
  );

//react组件
var Greet = React.createClass({
  render: function(){
    return <h1>Hello {this.props.name}</h1>;
  }
  });

  React.render(
    <Greet name="Jack" />,
    document.getElementById('root');
    );

var InputState = React.createClass({
  getInitialState: function(){
    return {enable: false};
  },
  handleClick: function(event){
    this.setState({enable: !this.state.enable});
  },
  render: function(){
    return (
      <p>
        <input type="text" disabled={this.state.enable} />
        <button onclick={this.handleClick}>Change State</button>
      </p>
      );
  }
  });
  React.render(
    <InputState />,
    document.getElementById('root');
    )

  /**组件的生命周期分成3个状态
  * Mount：已插入真实DOM
  * Updating：正在被重新渲染
  * Unmounting：已移出真实DOM
  react为每个状态都提供了两种处理函数，will函数在进入状态之前调用，did函数在进入状态之后调用，三种状态共计5种处理函数。
  componentWillMount()
  componentDidMount()
  componentWillUpdate(object nextProps,object nextState)
  componentDidUpdate(object prevProps,object prevState)
  componentWillUnmount()
  此外，React还提供两种特殊状态的处理函数。
  componentWillReceiveProps(object nextProps): 已加载组件收到新的参数时调用
  shouldComponentUpdate(object nextProps,object nextState): 组件判断是否重新渲染时调用
   下面来看一个例子
   var Hello = React.createClass({
     getInitialState: function(){
       return {
         opacity: 1.0
       };
     },
     componentDidMount: function(){
       this.timer = setInterval(function(){
         var opacity = this.state.opacity;
         opacity -= .05;
         if(opacity < 0.1){
           opacity = 1.0;
         }
         this.setState({
           opacity: opacity
           });
         }.bind(this), 100);
     },
     render: function(){
       return (
         <div style={{opacity: this.state.opacity}}>
          Hello {this.props.name}
         </div>
         );
     }
     });

     React.render(
       <Hello name="world"/>,
       document.body
       )


组件的嵌套
var Search = React.createClass({
  render (){
    return (
      <div>
        {this.props.searchType}:<input type="text"/>
        <button>Search</button>
      </div>
      );
  }
  });
  var Page = React.createClass({
    render(){
      return (
        <div>
          <h1>Welcome!</h1>
          <Search searchType="Title" />
          <Search searchType="Content"/>
        </div>
        );
    }
    });

    React.render(
      <Page/>,
      document.body
      )
```
