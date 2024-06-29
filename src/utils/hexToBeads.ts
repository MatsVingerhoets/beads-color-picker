import colors from "./colors.json"

// from https://stackoverflow.com/a/5624139
function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return {
    r: 0, g: 0, b: 0
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}

// Distance between 2 colors (in RGB)
// https://stackoverflow.com/questions/23990802/find-nearest-color-from-a-colors-list
function distance(a: { r: number, g: number, b: number }, b: { r: number, g: number, b: number }) {
  return Math.sqrt(Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2));
}

// return nearest color from array
export function nearestColor(colorHex: string) {
  var lowest = Number.POSITIVE_INFINITY;
  var tmp;
  let index = 0;
  colors.forEach((el, i) => {
    tmp = distance(hexToRgb(colorHex), hexToRgb(el.hex))
    if (tmp < lowest) {
      lowest = tmp;
      index = i;
    };

  })
  return colors[index];
}
