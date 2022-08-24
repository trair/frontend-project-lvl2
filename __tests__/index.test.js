import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['file1.json', 'file2.json', 'stylishResult.txt', 'stylish'],
  ['file1.yaml', 'file2.yml', 'stylishResult.txt', 'stylish'],
  ['file1.json', 'file2.json', 'plainResult.txt', 'plain'],
  ['file1.yaml', 'file2.yml', 'plainResult.txt', 'plain'],
  ['file1.json', 'file2.json', 'jsonResult.txt', 'json'],
  ['file1.yaml', 'file2.yml', 'jsonResult.txt', 'json'],
];

test.each(cases)('Compare %s and %s to expect %s in "$s" style', (firstArgument, secondArgument, expectedResult, format) => {
  const filepath1 = getFixturePath(firstArgument);
  const filepath2 = getFixturePath(secondArgument);
  const getResult = readFile(expectedResult);
  const result = genDiff(filepath1, filepath2, format);
  expect(result).toEqual(getResult);
});
