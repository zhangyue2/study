// import _ from 'lodash';
import printMe from './print.js';
// import './style.css';

import { cube } from './math';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like me are in development mode!')
}

function component() {
  // var element = document.createElement('div');
  // var btn = document.createElement('button');
  // element.innerHTML = _.join(['Hello', 'webpck'], ' ');
  //
  // btn.innerHTML = 'Click me and check the console!';
  // btn.onclick = printMe;
  // element.appendChild(btn);

  var element = document.createElement('pre');
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n');

  return element;
}

document.body.appendChild(component())

// let element = component();
// document.body.appendChild(element);
//
// if(module.hot){
//   module.hot.accept('./print.js', function () {
//     console.log('Accepting the updated printMe module!');
//     document.body.removeChild(element);
//     element = component();
//     document.body.appendChild(element);
//   })
// }