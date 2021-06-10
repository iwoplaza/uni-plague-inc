import './style/main.scss';
import { PATH_DATA } from './config';
import { Simulation } from './simulation';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, Legend, Filler } from 'chart.js';
import { CellState } from './cell';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Legend, Filler);

const canvasWidth = 600;
const canvasHeight = 600;

window.onload = () => {
    /* RENDERING CHARTS, #TODO */
    const days = [0] as number[];
    const datasets = [
        {
            label: 'Infectious',
            data: [] as number[],
            backgroundColor: 'rgb(40, 255, 100)',
            border: false,
            fill: true,
            radius: 0,
        },
        {
            label: 'Suspectible',
            data: [] as number[],
            backgroundColor: 'rgb(255, 255, 255)',
            border: false,
            fill: true,
            radius: 0,
        }, 
        {
            label: 'Recovered',
            data: [] as number[],
            backgroundColor: 'rgb(60, 120, 255)',
            fill: true,
            border: false,
            radius: 0,
        },
    ];

    const chart = new Chart('chart', {
        type: 'line',
        data: {
            labels: days,
            datasets,
        },
        options: {
            animation: {
                duration: 0
            },
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
                    stacked: true,
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

    const MAX_VALUES = 100;

    const pushDay = (day: number, S: number, I: number, R: number) => {
        days.push(day);

        datasets[0].data.push(I);
        datasets[1].data.push(S);
        datasets[2].data.push(R);

        chart.update();
    }

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
    const simulation = new Simulation(5, countryPath, canvas, () => {
        // On each step
        const summary: CellState = simulation.getSummaryOfStates();
        pushDay(simulation.getDay(), summary.susceptible, summary.infectious, summary.recovered + summary.dead);
    });
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