import './style/main.scss';
import { PATH_DATA } from './config';
import { Simulation } from './simulation';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, Legend, Filler } from 'chart.js';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Legend, Filler);

const canvasWidth = 600;
const canvasHeight = 600;

window.onload = () => {
    /* RENDERING CHARTS, #TODO */
    const days = [0] as number[];
    const datasets = [
        {
            label: 'Suspectible',
            data: [0] as number[],
            borderColor: 'rgb(255, 0, 0)',
            backgroundColor: 'rgb(255, 0, 0)',
            fill: true,
            
        }, 
        {
            label: 'Infectious',
            data: [0] as number[],
            borderColor: 'rgb(0, 255, 0)',
            backgroundColor: 'rgb(0, 255, 0)',
            fill: true,
        },
        {
            label: 'Recovered',
            data: [0] as number[],
            borderColor: 'rgb(0, 0, 255)',
            backgroundColor: 'rgb(0, 0, 255)',
            fill: true,
        },
    ];

    const chart = new Chart('chart', {
        type: 'line',
        data: {
            labels: days,
            datasets,
        },
        options: {
            color: '#ffffff',
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    fullSize: true,
                },
            },
            scales: {
                x: { 
                    display: true, 
                    title: {
                        display: true,
                        text: 'Day', 
                        color: '#fff',
                    },
                    ticks: {
                        color: '#fff',
                    },
                },
                y: { 
                    display: true,  
                    title: {
                        display: true,
                        text: 'SIR', 
                        color: '#fff',
                    },
                    ticks: {
                        color: '#fff',
                    },
                },
            },
        },
    });

    const pushDay = (day: number, S: number, I: number, R: number) => {
        days.push(day);
        datasets[0].data.push(S);
        datasets[1].data.push(I);
        datasets[2].data.push(R);
        chart.update();
    }

    // Logic here
    pushDay(1, 100, 0, 0);
    pushDay(2, 100, 100, 0);
    pushDay(3, 100, 100, 100);
    pushDay(4, 10000, 0, 0);

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