import Slider from './slider-v4.js';
import {SliderController, SliderPrevious, SliderNext} from './plugins.js';

const images = ['https://p5.ssl.qhimg.com/t0119c74624763dd070.png',
  'https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg',
  'https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg',
  'https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg'];

const container = document.querySelector('.slider');
const slider = new Slider({container, images});
slider.registerSubComponents(SliderController, SliderPrevious, SliderNext);
slider.start();