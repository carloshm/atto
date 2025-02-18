import * as canvas from "./canvas.js";
import * as hid from "./hid.js";

export var backgroundColour = canvas.colourScheme[canvas.COLOUR_NAMES.lightgrey];
export var foregroundColour = canvas.colourScheme[canvas.COLOUR_NAMES.black];

export var col = 0;
export var row = 0;
export var scrollDelta = 0;

export function background(colourName = "lightgrey") {
    backgroundColour = canvas.colourScheme[canvas.COLOUR_NAMES[colourName]];
}

export function foreground(colourName = "black") {
    foregroundColour = canvas.colourScheme[canvas.COLOUR_NAMES[colourName]];
}

export function setColours(background, foreground) {
    backgroundColour = background;
    foregroundColour = foreground;
}

export function scrollUp() {
    canvas.copyToBuffer();
    canvas.setColour(backgroundColour);
    canvas.clear();
    canvas.restoreFromBuffer(0, canvas.CHAR_HEIGHT);

    scrollDelta--;
}

export function scrollDown() {
    canvas.copyToBuffer();
    canvas.setColour(backgroundColour);
    canvas.clear();
    canvas.restoreFromBuffer(0, -canvas.CHAR_HEIGHT);

    scrollDelta++;
}

export function up() {
    row--;

    if (row < 0) {
        row = 0;

        scrollUp();
    }
}

export function down() {
    row++;

    if (row >= canvas.TERM_ROWS) {
        row = canvas.TERM_ROWS - 1;

        scrollDown();
    }
}

export function left(wrap = true) {
    col--;

    if (col < 0) {
        col = canvas.TERM_COLS - 1;

        if (wrap) {
            up();
        }
    }
}

export function right(wrap = true) {
    col++;

    if (col >= canvas.TERM_COLS) {
        col = 0;

        if (wrap) {
            down();
        }
    }
}

export function goto(newCol, newRow) {
    col = newCol;
    row = newRow;
}

export function clear() {
    canvas.setColour(backgroundColour);
    canvas.clear();
}

export function print(text, notifyHid = true, wrap = true) {
    text = String(text);

    for (var i = 0; i < text.length; i++) {
        switch (text[i]) {
            case "\n":
                down();
                // Don't break; continue to reset column
                
            case "\r":
                col = 0;
                break;

            case "\t":
                for (var j = 0; j < 4; j++) {right();}
                break;

            case "\v":
            case "\f":
                down();
                break;

            case "\b":
                left(wrap);
                break;

            default:
                canvas.setColour(backgroundColour);
                canvas.fillRect(col * canvas.CHAR_WIDTH, row * canvas.CHAR_HEIGHT, (col + 1) * canvas.CHAR_WIDTH, (row + 1) * canvas.CHAR_HEIGHT);
                canvas.setColour(foregroundColour);
                canvas.drawText(text[i], col * canvas.CHAR_WIDTH, row * canvas.CHAR_HEIGHT);
                right(wrap);
                break;
        }
    }

    if (notifyHid) {
        hid.log(text);
    }
}