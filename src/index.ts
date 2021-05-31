import './style/main.scss'
import config from './config';

function renderCanvas(canvas: HTMLCanvasElement) {
  const canvasContext = canvas.getContext('2d');
  canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
  config.countries.forEach(country => { canvasContext?.stroke(country.svgPath); canvasContext?.fill(country.svgPath); });

  requestAnimationFrame(renderCanvas.bind(null, canvas));
}

window.onload = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if(!canvas) throw new Error('Canvas not initialized')

  canvas.width = 1000;
  canvas.height = 684;

  const canvasContext = canvas.getContext('2d');
  if(!canvasContext) throw new Error('Could not get canvas context');

  canvasContext.strokeStyle = '#000';
  canvasContext.fillStyle = '#fff';

  canvas.addEventListener('mousemove', e => {
    const text = document.getElementById('hovering');
    if(!text) return;

    const { clientX, clientY } = e;
    const { left, top } = canvas.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;
    
    const hoveredCountry = config.countries.find(country => canvasContext.isPointInPath(country.svgPath, x, y));
    if(hoveredCountry) {
      text.innerText = hoveredCountry.name;
    } else {
      text.innerText = 'none';
    }
  });

  let zoomedIn = false;
  let zoomTranslateX = 0;
  let zoomTranslateY = 0;
  canvas.addEventListener('click', e => {
    const { clientX, clientY } = e;
    const { left, top } = canvas.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    if(zoomedIn) {
      canvasContext.translate(zoomTranslateX, zoomTranslateY);
      canvasContext.scale(0.25, 0.25);
      canvasContext.translate(-zoomTranslateX, -zoomTranslateY)

      zoomTranslateX = 0;
      zoomTranslateY = 0;
      zoomedIn = false;
    } else {
      zoomTranslateX = x;
      zoomTranslateY = y;
      zoomedIn = true;

      canvasContext.translate(zoomTranslateX, zoomTranslateY);
      canvasContext.scale(4, 4);
      canvasContext.translate(-zoomTranslateX, -zoomTranslateY)
    }
  });

  requestAnimationFrame(renderCanvas.bind(null, canvas));
};