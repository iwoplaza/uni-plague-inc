export interface Color {
    r: number;
    g: number;
    b: number;
}

export function mixColor(a: Color, b: Color, t: number) {
    return {
        r: a.r + (b.r - a.r) * t,
        g: a.g + (b.g - a.g) * t,
        b: a.b + (b.b - a.b) * t,
    };
}

export function colorToString(col: Color): string {
    return `rgb(${Math.floor(col.r * 255)}, ${Math.floor(col.g * 255)}, ${Math.floor(col.b * 255)})`;
}