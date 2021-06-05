import { Color, colorToString, mixColor } from './color';
import { Simulation } from './simulation';

export const enum Direction {
    NORTH,
    NORTH_EAST,
    EAST,
    SOUTH_EAST,
    SOUTH,
    SOUTH_WEST,
    WEST,
    NORTH_WEST,
}

const DIRECTIONS: Direction[] = [
    Direction.NORTH,
    Direction.NORTH_EAST,
    Direction.EAST,
    Direction.SOUTH_EAST,
    Direction.SOUTH,
    Direction.SOUTH_WEST,
    Direction.WEST,
    Direction.NORTH_WEST,
];

const DISTANCE_PER_DIRECTION = DIRECTIONS.map((dir, index) => index % 2 == 0 ? 1 : Math.SQRT2);

function getOffsetForDirection(direction: Direction): [number, number] {
    switch (direction) {
        case Direction.NORTH:
            return [0, -1];
        case Direction.NORTH_EAST:
            return [1, -1];
        case Direction.EAST:
            return [1, 0];
        case Direction.SOUTH_EAST:
            return [1, 1];
        case Direction.SOUTH:
            return [0, 1];
        case Direction.SOUTH_WEST:
            return [-1, 1];
        case Direction.WEST:
            return [-1, 0];
        case Direction.NORTH_WEST:
            return [-1, -1];
    }

    throw new Error(`Invalid direction: ${direction}`);
}

const SUSCEPTIBLE_COLOR: Color = { r: 1, g: 1, b: 1 };
const INFECTED_COLOR: Color = { r: 1, g: 0, b: 0 };
const RECOVERED_COLOR: Color = { r: 0, g: 0, b: 1 };
const DEAD_COLOR: Color = { r: 0, g: 0, b: 0 };

interface CellState {
    susceptible: number;
    infectious: number;
    recovered: number;
    dead: number;
}

export function infectInState(state: CellState, amount: number): void {
    state.susceptible -= amount;
    state.infectious += amount;
}

export function killInState(state: CellState, amount: number): void {
    state.infectious -= amount;
    state.dead += amount;
}

export function recoverInState(state: CellState, amount: number): void {
    state.infectious -= amount;
    state.recovered += amount;
}

export class Cell {
    // Visual state
    private readonly path: Path2D;
    private color: string = '#fff';

    // Simulation constants
    private neighbours: {[key in Direction]: Cell|null};

    // Simulation state
    private currentState: Readonly<CellState>;
    public nextState: CellState;

    constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly size: number,
        private readonly totalPopulation: number
    ) {
        this.path = new Path2D();
        this.path.rect(x * size, y * size, size, size);

        // All people are susceptible by default.
        this.currentState = {
            susceptible: totalPopulation,
            infectious: 0,
            recovered: 0,
            dead: 0,
        };

        this.nextState = {
            ...this.currentState,
        };

        // Initializing all neighbours to null by default.
        this.neighbours = {} as any;
        for (const dir of DIRECTIONS) {
            this.neighbours[dir] = null;
        }
    }

    initNeighbours(simulation: Simulation, x: number, y: number): void {
        for (const direction of DIRECTIONS) {
            const [offsetX, offsetY] = getOffsetForDirection(direction);

            if (simulation.areCoordsInside(x + offsetX, y + offsetY)) {
                this.neighbours[direction] = simulation.cells[x + offsetX][y + offsetY];
            }
        }
    }

    update(simulation: Simulation, x: number, y: number) {
        if (this.nextState.infectious > 0) {
            // Recoveries / death

            let probPerPerson = 1 - simulation.params.stayingInInfectionProbability;

            // Statistically, the 'probPerPerson' percentage of people should get removed,
            // but we can introduce some randomness.
            const randomness = simulation.params.internalFluctuations;
            probPerPerson = Math.max(0, Math.min(probPerPerson + (Math.random() * 2 - 1) * randomness, 1));

            const amountToRemove = Math.round(this.nextState.infectious * probPerPerson);
            const amountToRecover = Math.round(amountToRemove * simulation.params.recoveryProbability);
            recoverInState(this.nextState, amountToRecover);
            killInState(this.nextState, amountToRemove - amountToRecover);
        }

        if (this.nextState.infectious > 0 && this.nextState.susceptible > 0) {
            // Infecting within our own cell.

            // 1 - (1 - p)^i
            let probability = 1 - Math.pow(1 - simulation.params.internalInfectionProbability,
                this.nextState.infectious);

            // Statistically, the 'probability' percentage of people should get infected,
            // but we can introduce some randomness.
            const randomness = simulation.params.internalFluctuations;
            probability = Math.max(0, Math.min(probability + (Math.random() * 2 - 1) * randomness, 1));

            const amountToInfect = Math.round(this.nextState.susceptible * probability);
            infectInState(this.nextState, amountToInfect);
        }

        // Checking again since there might not be any more susceptible people
        // after the last step.
        if (this.nextState.susceptible > 0) {
            // There are still healthy people left.

            let alpha = 0;

            for (const direction of DIRECTIONS) {
                const [offsetX, offsetY] = getOffsetForDirection(direction);
    
                const neighbour = this.neighbours[direction];
                if (neighbour !== null) {
                    // Increasing based on the number of infections inversily proportional to the distance.
                    alpha += neighbour.currentState.infectious / DISTANCE_PER_DIRECTION[direction];
                }
            }

            // 1 - (1 - p)^i
            let probability = 1 - Math.pow(1 - simulation.params.externalInfectionProbability, alpha);
            if (Math.random() < probability) {
                infectInState(this.nextState, 1);
            }
        }

        // Integrity check
        const sumOfPeople = this.nextState.susceptible +
                            this.nextState.infectious +
                            this.nextState.recovered +
                            this.nextState.dead;

        if (sumOfPeople != this.totalPopulation) {
            console.error('Integrity check failed!');
        }
    }

    advanceCurrentState() {
        this.currentState = { ...this.nextState };
    }

    getX() { return this.x; }
    getY() { return this.y; }
    getSize() { return this.size; }
    getPath() { return this.path; }
    getColor() {
        const { infectious, recovered, dead } = this.currentState;

        let color = SUSCEPTIBLE_COLOR;
        color = mixColor(color, INFECTED_COLOR, infectious / this.totalPopulation);
        color = mixColor(color, RECOVERED_COLOR, recovered / this.totalPopulation);
        color = mixColor(color, DEAD_COLOR, dead / this.totalPopulation);
        return colorToString(color);
    }
}