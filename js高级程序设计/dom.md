function contains(refNode, otherNode){
  if(typeof refNode.contains == "function" && (!client.engine.webkit || client.engine.webkit >= 522)){
    return refNode.contains(otherNode);
  }else if(typeof refNode.compareDocumentPosition == "function"){
    return !!(refNode.compareDocumentPosition(otherNode)&16);
  }else{
    var node = otherNode.parentNode;
    do{
      if(node === refNode){
        return true;
      }else{
        node = node.parentNode;
      }
    }while(node !== null);
    return false;
  }
}
componentWillMount 在渲染前调用，在客户端也在服务端。
componentDidMount 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout,setInterval或者发送AJAX请求等操作（防止异步操作阻塞UI）。
componentWillReceiveProps 在组件接收到一个新的prop（更新后）时被调用。这个方法在初始化render时不会被调用。
shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不会被调用。可以在你确认不需要更新组件时使用。
componentWillUpdate 在组件接收到新的props或者state但还没用render时被调用，初始化时不会被调用
componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。
componentWillUnmount在组件从DOM中移除时立刻被调用。
var Button = React.createClass({
  getInitialState: function(){
    return {
      data: 0
    };
  },
  setNewNumber: function(){
    this.setState({data: this.state.data+1});
  },
  render:function(){
    return (
      <div>
        <button onClick={this.setNewNumber}>INCREMENT</button>
        <Content myNumber = {this.state.data}></Content>
      </div>
      );
  }
  })

var Content = React.createClass({
  componentWillMount(){
    console.log('Component WILL MOUNT');
  },
  componentDidMount(){
    console.log('Component DID MOUNT');
  },
  componentWillReceiveProps(newProps){
    console.log('Component WILL RECEIVE PROPS')
  },
  shouldComponentUpdate(newProps, newState){
    return true;
  },
  componentWillUpdate(nextProps, nextState){
    console.log('Component WILL UPDATE')
  },
  componentDidUpdate(prevProps, prevState){
    console.log('Component DID UPDATE')
  },
  componentWillUnmount(){
    console.log('Component WILL UNMOUNT')
  },
  render(){
    return (
      <div>
        <h3>{this.props.myNumber}</h3>
      </div>
    );
  }
});
React.render(
  <div>
    <Button />
  </div>,
  document.getElementById('root');
);

var UserGist = React.createClass({
  getInitialState(){
    return {
      username: '',
      lastGistUrl: ''
    };
  },
  componentDidMount(){
    this.serverRequest = $.get(this.props.source, result => {
      var lastGist = result[0];
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      });
    });
  },
  componentWillUnmount(){
    this.serverRequest.abort();
  },
  render(){
    return (
      <div>
        {this.state.username} 用户最新的Gist共享地址：
        <a href={this.state.lastGistUrl}>{this.state.lastGistUrl}</a>
      </div>
    );
  }
});
ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.getElementById('root')
)
var HelloMessage = React.createClass({
  getInitialState(){
    return {value: 'Hello World'};
  },
  handleChange(event){
    this.setState({value: event.target.value});
  },
  render(){
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <h4>{value}</h4>
      </div>
    );
  }
});
ReactDOM.render(
  <HelloMessage />,
  document.getElementById('root')
)
CSSStyleDeclaration getPropertyValue
