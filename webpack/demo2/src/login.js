import $ from 'jquery/dist/jquery.min';

let url = `${window.location.protocol}//${window.location.host}`;

export function login(fn) {
  var name = $('#username').val(), password = $('#password').val();
  if (!name) {
    alert('请输入用户名');
  };
  if (!password) {
    alert('请输入密码');
  };
  var cipher = window.btoa(name + ':' + password);
  $.ajax({
    type: 'get',
    headers: {
      UseXBasic: true,
      Authorization: 'Basic ' + cipher
    },
    url: url + '/user/currentUser?auth',
    success: function(data) {
      sessionStorage.setItem('_tcy8', cipher);
      fn(data);
    },
    error: function(data) {
      alert('用户名或密码错误，请重新输入');
    }
  });
}