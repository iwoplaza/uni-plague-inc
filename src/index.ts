import './style/main.scss'
import config from './config';

const canvasWidth = 600;
const canvasHeight = 600;

const countryPath = new Path2D();
let transformMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix();
transformMatrix.e = -155.9; transformMatrix.f = -51.03718;
countryPath.addPath(
  new Path2D('M 183,142.16218 L 190,146.36218 L 194.8,149.36218 C 194.8,149.36218 201.4,157.91218 203.2,157.76218 C 205,157.61218 203.2,151.76218 203.2,151.76218 L 205,143.36218 L 208.6,137.36218 L 206.2,130.76218 C 206.2,130.76218 203.5,133.91218 200.2,132.56218 C 196.9,131.21218 193,127.16218 193,127.16218 L 187,131.36218 L 181,128.36218 L 181,116.36218 L 187,120.56218 L 193,122.36218 L 202,119.36218 L 212.8,118.76218 L 224.8,116.96218 L 236.2,114.56218 L 251.8,110.36218 L 262.6,107.96218 L 272.2,106.16218 L 284.8,104.36218 C 284.8,104.36218 292.15,104.36218 296.2,101.36218 C 300.25,98.362181 302.2,92.362183 302.2,92.362183 L 310,85.762183 L 319.6,79.162183 L 329.8,75.562183 L 343,74.362183 L 358,71.362183 L 371.2,68.962183 L 388,68.362183 L 400,65.362183 L 406,62.362183 L 416.2,59.362183 L 425.2,58.762183 L 442,68.362183 L 448.6,74.962183 C 448.6,74.962183 452.04664,79.463642 454,83.962183 C 454.60061,85.345381 450.4,83.362183 450.4,83.362183 L 447.7,77.062183 L 444.4,73.162183 L 435.4,66.262183 L 427,62.362183 L 427,71.362183 L 427.6,80.362183 L 429.4,89.362183 L 430,98.362183 L 436.6,104.36218 L 442,110.36218 L 453.4,112.16218 L 462.4,111.56218 L 476.8,108.56218 L 485.2,104.96218 C 485.2,104.96218 489.55,99.712183 493,99.562183 C 496.45,99.412183 499,104.36218 499,104.36218 L 526,107.36218 L 544,113.36218 L 570.4,117.56218 L 593.2,121.16218 L 607,123.56218 L 622,125.36218 L 640,125.36218 L 649,122.36218 L 658,122.36218 L 670,119.36218 L 677.95,119.51218 L 689.2,125.96218 L 694,134.36218 L 703,140.36218 L 707.5,145.61218 L 709,158.36218 L 709,170.36218 L 712.75,178.76218 L 713.2,193.16218 L 716.5,202.76218 L 718,217.76218 L 722.16391,228.56218 C 722.16391,228.56218 722.7658,234.81646 723.28956,238.60102 C 724.05095,244.10267 725.15125,240.88777 725.60556,246.42324 C 725.94239,250.52721 728.34948,250.75373 728.59375,254.73718 C 728.8375,258.71218 727.54638,261.61579 729.4,265.76218 C 731.10156,269.56843 734.8,276.56218 734.8,276.56218 L 731.2,284.96218 L 722.8,292.76218 C 722.8,292.76218 718,297.11218 713.8,298.76218 C 709.6,300.41218 709.9,302.96218 705.4,305.96218 C 700.9,308.96218 697,314.36218 697,314.36218 C 697,314.36218 688.3,318.71218 689.8,323.96218 C 691.3,329.21218 702.4,334.16218 702.4,334.16218 L 712.6,341.36218 L 715,353.36218 L 715,368.36218 L 714.2,383.26218 L 715.2,393.96218 L 714,408.36218 L 717,420.36218 L 723,432.36218 L 729,438.36218 L 735,450.36218 L 738,456.36218 L 744,461.16218 C 741.8,461.76223 740.2,463.44485 738,462.36218 L 732,471.36218 L 738,480.36218 L 747,486.36218 L 741,498.36218 L 734.4,499.56218 L 715.65,517.26218 L 696.3,537.36218 L 678.15,555.66218 L 659.4,577.56218 L 651,582.36218 L 658.8,594.96218 L 655.2,602.76218 L 657,618.36218 L 664.2,628.56218 L 663.6,641.16218 L 655.2,634.56218 L 645,633.36218 L 630,624.36218 L 615,621.36218 L 603,612.36218 L 594,606.36218 L 579,600.36218 L 567,591.36218 L 555,594.36218 L 543,603.36218 L 531,606.36218 L 522,600.36218 L 513,591.36218 L 501,594.36218 L 495,600.36218 L 489,615.36218 L 477,609.36218 L 465,612.36218 L 468,597.36218 L 465,588.36218 L 459,573.36218 L 453,567.36218 L 447,570.36218 L 438,579.36218 L 435,585.36218 L 429,585.36218 L 420,588.36218 L 413.25,577.36218 C 411.75,572.36218 411,563.36218 411,563.36218 L 402,554.36218 L 402,545.36218 L 390,533.36218 L 378,524.36218 L 366,518.36218 L 354,530.36218 L 345,518.36218 L 336,506.36218 L 342,497.36218 L 348,491.36218 L 339,485.36218 L 327,485.36218 L 309,482.36218 C 309,482.36218 299.25,473.36218 297,473.36218 C 294.75,473.36218 295.8722,476.02203 300,484.76218 C 301.91326,488.81329 300.75,490.16218 303.3,493.16218 C 305.61732,495.88844 303,500.36218 303,500.36218 L 297,499.16218 L 291,502.76218 C 291,502.76218 285.45,510.26218 282,509.36218 C 278.55,508.46218 274.2,499.76218 274.2,499.76218 L 271.2,491.36218 L 265.2,479.36218 L 257.4,471.56218 L 263.4,463.76218 C 263.4,463.76218 272.25,462.86218 273,458.36218 C 273.75,453.86218 268.8,449.36218 268.8,449.36218 L 264,443.36218 L 249,440.36218 L 231,437.36218 L 216,434.36218 L 207,419.36218 L 204,410.36218 L 193.2,407.36218 C 193.2,407.36218 190.5,409.16218 189.6,411.56218 C 188.7,413.96218 189,417.56218 189,417.56218 L 183,416.36218 C 183,416.36218 186.3,410.66218 187.8,406.16218 C 189.3,401.66218 189,398.36218 189,398.36218 C 189,398.36218 195.6,385.76218 195.6,385.76218 C 195.6,385.76218 197.25,378.71218 192,366.56218 C 189.375,360.48718 186.97503,354.18179 183.05629,349.02284 C 179.13756,343.8639 180.45003,339.78179 177.6,334.76218 C 178.94997,329.74257 180,323.36218 180,323.36218 L 189,311.36218 L 192,299.36218 L 189,293.36218 L 189,284.36218 L 183,275.36218 L 183.6,263.96218 L 189,254.36218 C 189,254.36218 186.45,251.21218 182.7,247.46218 C 178.95,243.71218 174,239.36218 174,239.36218 L 169.8,230.36218 L 161.4,221.96218 L 167.4,212.96218 C 167.4,212.96218 172.2,210.41218 177.6,202.76218 C 183,195.11218 187.2,184.76218 187.2,184.76218 L 189,173.36218 L 183,164.36218 L 183,142.16218 z '), 
  transformMatrix,
);

const drawCellStroke = false;
const cellSize = 5;
const cells = new Array(canvasHeight * canvasWidth / cellSize);

let day = 0;

class Cell {
  private readonly x: number;
  private readonly y: number;
  private readonly size: number;

  private readonly path: Path2D;

  private color: string = '#fff';

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.path = new Path2D();
    this.path.rect(x, y, size, size);
  }

  getX() { return this.x; }
  getY() { return this.y; }
  getSize() { return this.size; }
  getPath() { return this.path; }
  setColor(color: string) { this.color = color; }
  getColor() { return this.color; } // Should be based on properties
}

function generateCells(canvasContext: CanvasRenderingContext2D) {
  for(let i = 0; i < canvasHeight * canvasWidth / cellSize; i++) {
    const x = (i * cellSize) % canvasWidth;
    const y = Math.floor((i * cellSize) / canvasWidth) * cellSize;

    // Check if cell is in country path
    if(
      canvasContext.isPointInPath(countryPath, x, y)
      && canvasContext.isPointInPath(countryPath, x + cellSize, y)
      && canvasContext.isPointInPath(countryPath, x, y + cellSize)
      && canvasContext.isPointInPath(countryPath, x + cellSize, y + cellSize)
    ) {
      cells[i] = new Cell(x, y, cellSize);
    } else {
      cells[i] = null;
    }
  }
}

let simulationPaused = false;
let updatesPerSecond = 1;
let prevUpdateTime = 0;
function update(canvasContext: CanvasRenderingContext2D) {
  requestAnimationFrame(update.bind(null, canvasContext));
  if(simulationPaused === true) return;
  const delta = Date.now() - prevUpdateTime;
  if(delta < 1000 / updatesPerSecond) return;

  /* Simulation logic goes here */
  cells.forEach(cell => {
    if(cell === null) return;

    if(Math.random() > 0.9) cell.setColor('#ff0000');
    else cell.setColor('#fff');
  });

  //canvasContext.stroke(countryPath);
  //canvasContext.fill(countryPath);

  cells.forEach(cell => {
    if(cell === null) return;

    if(drawCellStroke) canvasContext.stroke(cell.getPath());

    canvasContext.fillStyle = cell.getColor();
    canvasContext.fill(cell.getPath());
  });

  day++;
  const dayCounter = document.getElementById('day-counter');
  if(dayCounter) dayCounter.innerText = day.toString();

  prevUpdateTime = Date.now();
}

window.onload = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if(!canvas) throw new Error('Canvas not initialized')

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const canvasContext = canvas.getContext('2d');
  if(!canvasContext) throw new Error('Could not get canvas context');

  canvasContext.strokeStyle = '#000';
  canvasContext.fillStyle = '#fff';

  // canvas.addEventListener('click', e => {
  //   const { clientX, clientY } = e;
  //   const { left, top } = canvas.getBoundingClientRect();

  //   const x = clientX - left;
  //   const y = clientY - top;
  // });

  const timeSpeed = document.getElementById('time-speed');
  const timeSpeedValue = document.getElementById('time-speed-value');

  if(timeSpeed !== null) {
    timeSpeed.addEventListener('input', (e: any) => {
      if(timeSpeedValue !== null) {
        timeSpeedValue.innerText = e.target.value;
      }

      updatesPerSecond = Number(e.target.value);
    });
  }

  generateCells(canvasContext);
  update(canvasContext);
};