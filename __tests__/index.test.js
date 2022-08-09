import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixture__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const extensions = ['json', 'yml'];

const stylishResult = readFile('expected_stylish.txt');


test.each(extensions)('Compare files and output formats', (extensions) => {
  const file1 = getFixturePath(`file1.${extensions}`);
  const file2 = getFixturePath(`file2.${extensions}`);
  expect(genDiff(file1, file2)).toEqual(stylishResult);
  expect(genDiff(file1, file2, 'stylish')).toEqual(stylishResult);
});