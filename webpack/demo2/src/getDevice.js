import $ from 'jquery/dist/jquery.min';

export function getDevice(q, fn) {
  var data = {};
  var url = `${window.location.protocol}//${window.location.host}` + '/inventory/managedObjects';
  data.fragmentType = 'c8y_IsDevice';
  data.pageSize = 2000;
  if (q){
    data.q = q;
  };
  $.ajax({
    type: 'get',
    url: url,
    async: false,
    headers: {
      Authorization: 'Basic ' + sessionStorage.getItem('_tcy8')
    },
    data: data,
    success: (res) => {
      fn(res.managedObjects);
    }
  })
}