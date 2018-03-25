import './styles/image_viewer.css';
import small from '../assets/small.jpg'
import big from '../assets/big.jpg'

export const loadImage = () => {
    let img1 = document.createElement('img');
    img1.className = "my-image";
    img1.src = big;

    let img2 = document.createElement('img');
    img2.className = "my-image";
    img2.src = small;

    document.body.appendChild(img1);
    document.body.appendChild(img2);
}

