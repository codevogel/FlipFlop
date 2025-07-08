import fs from 'fs';

interface Coord {
   x: number;
   y: number;
}

function partA(lines: string[]): number {
   let coords = lines.map(line => {
      const [x, y] = line.split(',').map(Number);
      return { x, y };
   });

   let totalSteps = deltaManhattan({ x: 0, y: 0 }, coords[0]);
   for (let i = 0; i < coords.length - 1; i++) {
      let coord = coords[i];
      let nextCoord = coords[i + 1];
      totalSteps += deltaManhattan(coord, nextCoord);
   }
   return totalSteps;
}

function partB(lines: string[]): number {
   let coords = lines.map(line => {
      const [x, y] = line.split(',').map(Number);
      return { x, y };
   });

   let totalSteps = deltaDiagonal({ x: 0, y: 0 }, coords[0]);
   for (let i = 0; i < coords.length - 1; i++) {
      let coord = coords[i];
      let nextCoord = coords[i + 1];

      totalSteps += deltaDiagonal(coord, nextCoord);

   }
   return totalSteps;
}

function partC(lines: string[]): number {
   let coords = lines.map(line => {
      const [x, y] = line.split(',').map(Number);
      return { x, y };
   });

   coords.sort((a, b) => deltaManhattan({ x: 0, y: 0 }, a) - deltaManhattan({ x: 0, y: 0 }, b));

   let totalSteps = deltaDiagonal({ x: 0, y: 0 }, coords[0]);
   for (let i = 0; i < coords.length - 1; i++) {
      let coord = coords[i];
      let nextCoord = coords[i + 1];
      totalSteps += deltaDiagonal(coord, nextCoord);
   }
   return totalSteps;
}

function deltaDiagonal(start: Coord, target: Coord): number {
   // allow diagonal movement
   let dx = Math.abs(target.x - start.x);
   let dy = Math.abs(target.y - start.y);
   return Math.max(dx, dy);
}

function deltaManhattan(a: Coord, b: Coord): number {
   return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

const fileContent = fs.readFileSync('./input.txt', 'utf-8');
const lines = fileContent.split('\n').filter(line => line.trim() !== '');

console.log('Part A:', partA(lines));
console.log('Part B:', partB(lines));
console.log('Part C:', partC(lines));
