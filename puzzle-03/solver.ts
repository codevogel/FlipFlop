import fs from 'fs';

interface RGB {
   r: number;
   g: number;
   b: number;
}

function getLabel(rgb: RGB): string {
   // if two values are equal, return 'special'
   if (rgb.r === rgb.g || rgb.g === rgb.b || rgb.r === rgb.b) {
      return 'special';
   }

   // Find which color has the maximum value
   const max = Math.max(rgb.r, rgb.g, rgb.b);
   if (max === rgb.r) {
      return 'red';
   } else if (max === rgb.g) {
      return 'green';
   } else {
      return 'blue';
   }
}

function lineToRGB(line: string): RGB {
   const [r, g, b] = line.trim().split(',').map(Number);
   return { r, g, b };
}

function toLabelMap(rgbs: RGB[]): Map<string, number> {
   let labelMap = new Map<string, number>();
   rgbs.forEach(rgb => {
      const label = getLabel(rgb);
      labelMap.set(label, (labelMap.get(label) || 0) + 1);
   })
   return labelMap;
}

function partA(lines: string[]): RGB | null {
   let rgbs = lines.map(line => lineToRGB(line));

   let rgbMap = new Map<RGB, number>();

   rgbs.forEach(rgb => {
      rgbMap.set(rgb, (rgbMap.get(rgb) || 0) + 1);
   });

   let maxCount = 0;
   let maxKey: RGB | null = null;
   for (let [key, count] of rgbMap.entries()) {
      if (count > maxCount) {
         maxCount = count;
         maxKey = key;
      }
   }
   return maxKey;
}

function partB(lines: string[]): number {
   let rgbs = lines.map(line => lineToRGB(line));
   let labelMap = toLabelMap(rgbs);
   return labelMap.get('green') || 0;
}

function partC(lines: string[]): number {
   let rgbs = lines.map(line => lineToRGB(line));
   let labelMap = toLabelMap(rgbs);
   return (labelMap.get('red') || 0) * 5
      + (labelMap.get('green') || 0) * 2
      + (labelMap.get('blue') || 0) * 4
      + (labelMap.get('special') || 0) * 10;
}

const fileContent = fs.readFileSync('./input.txt', 'utf-8');
const lines = fileContent.split('\n').filter(line => line.trim() !== '');

console.log('Part A:', partA(lines));
console.log('Part B:', partB(lines));
console.log('Part C:', partC(lines));
