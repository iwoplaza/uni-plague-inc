import { Cell, infectInState } from './cell';

const drawCellStroke = false;

interface IParams {
    readonly externalInfectionProbability: number;
    readonly internalInfectionProbability: number;
    readonly stayingInInfectionProbability: number;
    /**
     * Probability that someone will recover given they are infected.
     */
    readonly recoveryProbability: number;
    /**
     * 0 means statistically accurate
     * 1 means either everyone is getting infected at once, or no one is.
     */
    readonly internalFluctuations: number;
}

class Params implements IParams {
    get externalInfectionProbability() {
        return 0.001;
    }

    get internalInfectionProbability() {
        return 0.1;
    }

    get stayingInInfectionProbability() {
        return 0.9;
    }

    get recoveryProbability() {
        return 0.5;
    }

    get internalFluctuations() {
        return 0.3;
    }
}

export class Simulation {
    private ctx: CanvasRenderingContext2D;
    public readonly widthInCells: number;
    public readonly heightInCells: number;
    public cells: (Cell|null)[][];

    private paused: boolean = false;
    private updatesPerSecond: number = 1;
    private prevUpdateTime: number = 0;
    private day: number = 0;

    public readonly params: IParams = new Params();

    constructor(
        public readonly cellSize: number,
        private countryPath: Path2D,
        private canvas: HTMLCanvasElement,
    ) {
        this.widthInCells = Math.floor(canvas.width / cellSize);
        this.heightInCells = Math.floor(canvas.height / cellSize);
        this.cells = new Array(this.widthInCells);

        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        if (!this.ctx) {
            throw new Error('Could not get canvas context');
        }

        this.ctx.strokeStyle = '#000';
        this.ctx.fillStyle = '#fff';

        (window as any).simulation = this;
    }

    generateCells() {
        for (let x = 0; x < this.widthInCells; ++x) {
            this.cells[x] = new Array(this.heightInCells);

            for (let y = 0; y < this.heightInCells; ++y) {
                const xInPixels = x * this.cellSize;
                const yInPixels = y * this.cellSize;
        
                // Check if cell is in country path
                if (
                    this.ctx.isPointInPath(this.countryPath, xInPixels, yInPixels)
                    && this.ctx.isPointInPath(this.countryPath, xInPixels + this.cellSize, yInPixels)
                    && this.ctx.isPointInPath(this.countryPath, xInPixels, yInPixels + this.cellSize)
                    && this.ctx.isPointInPath(this.countryPath, xInPixels + this.cellSize, yInPixels + this.cellSize)
                ) {
                    this.cells[x][y] = new Cell(x, y, this.cellSize, 100);
                }
                else {
                    this.cells[x][y] = null;
                }
            }
        }

        // Initializing neighbours for all cells
        for (let x = 0; x < this.widthInCells; ++x) {
            for (let y = 0; y < this.heightInCells; ++y) {
                const cell = this.cells[x][y];

                if (cell !== null) {
                    cell.initNeighbours(this, x, y);
                }
            }
        }
    }

    update() {
        requestAnimationFrame(() => this.update());

        if (this.paused === true) {
            return;
        }

        const delta = Date.now() - this.prevUpdateTime;
        if (delta < 1000 / this.updatesPerSecond) {
            return;
        }

        this.prevUpdateTime = Date.now();
    
        /* Simulation logic goes here */
        // this.cells.forEach(cell => {
        //     if (cell === null) {
        //         return;
        //     }
    
        //     if (Math.random() > 0.9) cell.setColor('#ff0000');
        //     else cell.setColor('#fff');
        // });
        this.performStep();
    
        //canvasContext.stroke(countryPath);
        //canvasContext.fill(countryPath); 
    }

    infectCell(x: number, y: number) {
        if (this.areCoordsInside(x, y)) {
            const cell = this.cells[x][y];

            if (cell !== null) {
                infectInState(cell.nextState, 1);
            }
        }
    }

    private performStep() {
        for (let x = 0; x < this.widthInCells; ++x) {
            for (let y = 0; y < this.heightInCells; ++y) {
                const cell = this.cells[x][y];

                if (cell === null) {
                    continue;
                }

                cell.update(this, x, y);
    
            }
        }

        for (let x = 0; x < this.widthInCells; ++x) {
            for (let y = 0; y < this.heightInCells; ++y) {
                const cell = this.cells[x][y];

                if (cell === null) {
                    continue;
                }

                cell.advanceCurrentState();

                if (drawCellStroke) {
                    this.ctx.stroke(cell.getPath());
                }
        
                this.ctx.fillStyle = cell.getColor();
                this.ctx.fill(cell.getPath());
            }
        }

        this.day++;
    }

    public setUpdatesPerSecond(updatesPerSecond: number): void {
        this.updatesPerSecond = updatesPerSecond;
    }

    public areCoordsInside(x: number, y: number) {
        return x >= 0 && x < this.widthInCells &&
               y >= 0 && y < this.heightInCells;
    }
}