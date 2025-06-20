import fs from 'fs/promises';
import path from 'path';
import { qns } from './index.js';

const currentDir = path.dirname(new URL(import.meta.url).pathname);
const questionsDir = path.join(currentDir, '..');
const outputDir = path.join(currentDir, '../json');

// Create output directory if it doesn't exist
if (!(await fs.stat(outputDir).catch(() => null))) {
    await fs.mkdir(outputDir, { recursive: true });
}

// Process each question file from q1.ts to q12.ts
for (const q of qns) {
    try {
        // Import the solution
        const [answer, solution] = q.data;
        
        // Create JSON object
        const jsonData = {
            answer,
            solution
        };
        
        // Write to JSON file
        const outputFile = path.join(outputDir, `q${qns.indexOf(q) + 1}.json`);
        await fs.writeFile(outputFile, JSON.stringify(jsonData, null, 2));
        console.log(`Generated ${outputFile}`);
    } catch (error) {
        console.error(`Error processing q${qns.indexOf(q) + 1}.ts:`, error);
    }
}
