import fs from 'fs';

function partA(lines: string[]): number {
   // Get total of half the length of each line
   return lines.reduce((acc, line) => acc + (line.length / 2), 0);
}

function partB(lines: string[]): number {
   return lines
      // First get lengths
      .map(line => line.length / 2)
      // Then get total of even lengths
      .reduce((acc, length) => acc + (length % 2 === 0 ? length : 0));
}

function partC(lines: string[]): number {
   // Get total of half the length of each line, but only if the line does not contain 'e' 
   return lines.reduce((acc, line) => acc + (line.includes('e') ? 0 : line.length / 2), 0);
}

// Read file and split by lines
const fileContent = fs.readFileSync('./input.txt', 'utf-8');
const lines = fileContent.split('\n');

console.log('Part A:', partA(lines));
console.log('Part B:', partB(lines));
console.log('Part C:', partC(lines));
