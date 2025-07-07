import fs from 'fs';

function partA(lines: string[]): number {
   // Map each character to a height change
   const changes = lines[0].split('').map((char) => char === '^' ? 1 : -1);
   // Calculate the maximum height reached
   let height = 0;
   return Math.max(...changes.map(h => height += h));
}

function partB(lines: string[]): number {
   let changes = lines[0].split('').map((char) => char === '^' ? 1 : -1);
   let height = 0, scalar = 1;

   return Math.max(...changes.map((change, i) => {
      // If current change is same as previous one, increase scalar
      // Otherwise, reset scalar to 1
      if (i > 0)
         scalar = change === changes[i - 1] ? scalar + 1 : 1;
      // Return new height
      return height += change * scalar;
   }));
}

function partC(lines: string[]): number {
   let changes = lines[0].split('').map((char) => char === '^' ? 1 : -1);

   // Find consecutive changes
   let consecutiveChanges: number[] = [Math.sign(changes[0])];
   for (let i = 1; i < changes.length; i++) {
      // If current change is same as previous one, 
      if (changes[i] === changes[i - 1]) {
         // increment or decrement the last element based on sign of change
         consecutiveChanges.push(
            consecutiveChanges.pop()! + Math.sign(changes[i])
         );
      } else {
         // Otherwise, push a new change based on sign of current change
         consecutiveChanges.push(1 * Math.sign(changes[i]));
      }
   }

   // Find the maximum heights by taking the Fibonacci of each sequence length
   // and multiplying by the sign of the change
   let height = 0;
   return Math.max(...consecutiveChanges
      .map(change => height += fib(Math.abs(change)) * Math.sign(change)));
}

// Recursive Fibonacci function
function fib(n: number): number {
   if (n <= 1) return n;
   return fib(n - 1) + fib(n - 2);
}

// Read file and split by lines
const fileContent = fs.readFileSync('./input.txt', 'utf-8');
const lines = fileContent.split('\n');

console.log('Part A:', partA(lines));
console.log('Part B:', partB(lines));
console.log('Part C:', partC(lines));
