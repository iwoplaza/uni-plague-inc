import './style/main.scss';
import { PATH_DATA } from './config';
import { Simulation } from './simulation';

const canvasWidth = 600;
const canvasHeight = 600;

window.onload = () => {
    // Initializing canvas
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas)
        throw new Error('Canvas not initialized');

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Preparing the country path
    const countryPath = new Path2D();
    let transformMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix();
    transformMatrix.e = -155.9;
    transformMatrix.f = -51.03718;
    countryPath.addPath(new Path2D(PATH_DATA), transformMatrix);

    // Creating the simulation space
    const simulation = new Simulation(5, countryPath, canvas);
    simulation.generateCells();
    simulation.update();

    canvas.addEventListener('click', e => {
      const { clientX, clientY } = e;
      const { left, top } = canvas.getBoundingClientRect();

      const xInPixels = clientX - left;
      const yInPixels = clientY - top;

      const x = Math.floor(xInPixels / simulation.cellSize);
      const y = Math.floor(yInPixels / simulation.cellSize);

      simulation.infectCell(x, y);
    });

    const timeSpeed = document.getElementById('time-speed');
    const timeSpeedValue = document.getElementById('time-speed-value');

    if (timeSpeed !== null) {
        timeSpeed.addEventListener('input', (e: any) => {
            if (timeSpeedValue !== null) {
                timeSpeedValue.innerText = e.target.value;
            }

            simulation.setUpdatesPerSecond(Number(e.target.value));
        });
    }
};