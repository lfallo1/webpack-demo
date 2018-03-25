import utils from './utils.js';
import auth from './auth.js';

//load other modules & execute a couple functions
const x = 33;
const y = 89;
console.log('lance -> ' + utils.toUpper('lance'));
console.log(`multiplying ${x} * ${y} = ${utils.multiply(x,y)}`);
console.log(utils.greet('lance'));

console.log(auth.getUser());

//some es6 stuff
const arr = [1, 2, 3];
const iAmJavascriptES6 = () => console.log(...arr);
window.iAmJavascriptES6 = iAmJavascriptES6;

//dummy image functionality - loads import at runtime
let imageButton = document.getElementById("click-me-button");
imageButton.onclick = () => {
    imageButton.setAttribute('disabled', true);
    System.import('./image_viewer.js').then(imageViewer =>imageViewer.loadImage());
};