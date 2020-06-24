import {canvas, ctx} from './canvas';
import {displayArea} from 'src/constants';
const pixelRatio = window.devicePixelRatio || 1;


const font = 'monospace';
const lineHeight = 1.2;

let calculatedFontSize = window.innerWidth / displayArea.width;
let cellWidth = calculatedFontSize * pixelRatio;
let cellHeight = calculatedFontSize * lineHeight * pixelRatio;
let fontSize = calculatedFontSize * pixelRatio;

canvas.style.cssText = `width: ${calculatedFontSize * displayArea.width}; height: ${
    calculatedFontSize * lineHeight * displayArea.height
}`;
canvas.width = cellWidth * displayArea.width;
canvas.height = cellHeight * displayArea.height;

ctx.font = `normal ${fontSize}px ${font}`;
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

const drawBackground = (color, position, alpha = 1) => {
    if (color === 'transparent') return;

    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(
        position.x * cellWidth,
        position.y * cellHeight,
        cellWidth,
        cellHeight
    );
};

const drawChar = (char, color, position, alpha = 1) => {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillText(
        char,
        position.x * cellWidth + cellWidth / 2,
        position.y * cellHeight + cellHeight / 2
    );
};

export const drawCell = (entity, options = {}) => {
    const {
        appearance: {char, background, color},
        position,
    } = entity;
    const { fg, bg, x, y, fgA = 1, bgA = 1 } = options;

    const bgColor = bg ? bg : background;
    const charColor = fg ? fg : color;
    const pos = x && y ? {x, y} : position;

    drawBackground(bgColor, pos, bgA);
    drawChar(char, charColor, pos, fgA);
};

export const clearCanvas = () =>
    ctx.clearRect(0, 0, canvas.width, canvas.height);

export const clearCell = (x, y) => {
    ctx.clearRect(x, y, cellWidth, cellHeight);
};

export const pxToCell = (event) => {
    const bounds = canvas.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const colPos = Math.trunc((relativeX / cellWidth) * pixelRatio);
    const rowPos = Math.trunc((relativeY / cellHeight) * pixelRatio);

    return [colPos, rowPos];
};

export const onClick = (handler) => {
    canvas.addEventListener('click', (event) => {
        const cell = pxToCell(event);
        handler(cell[0], cell[1]);
    });
};

export const onMouseMove = (handler) => {
    canvas.addEventListener('mousemove', (ev) => {
        const cell = pxToCell(ev);
        handler(cell[0], cell[1]);
    });
};