import utils from './utils.js';
import auth from './auth.js';
import './image_viewer.js';

//load other modules & execute a couple functions
const x = 33;
const y = 89;
console.log('captain justice -> ' + utils.toUpper('captain justice'));
console.log(`multiplying ${x} * ${y} = ${utils.multiply(x,y)}`);
console.log(utils.greet('lance'));

console.log(auth.getUser());

//some es6 stuff
const arr = [1, 2, 3];
const iAmJavascriptES6 = () => console.log(...arr);
window.iAmJavascriptES6 = iAmJavascriptES6;