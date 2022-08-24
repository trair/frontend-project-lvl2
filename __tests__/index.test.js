import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (file) => path.resolve(process.cwd(), '__fixtures__', file);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');

const cases = [
  ['file1.json', 'file2.json', 'stylishResult.txt', 'stylish'],
  ['file1.yml', 'file2.yml', 'stylishResult.txt', 'stylish'],
  ['file1.json', 'file2.json', 'plainResult.txt', 'plain'],
  ['file1.yml', 'file2.yml', 'plainResult.txt', 'plain'],
  ['file1.json', 'file2.json', 'jsonResult.txt', 'json'],
  ['file1.yml', 'file2.yml', 'jsonResult.txt', 'json'],
];

test.each(cases)('Compare %s and %s to expect %s in "$s" style', (firstArgument, secondArgument, expectedResult, format) => {
  const filepath1 = getFixturePath(firstArgument);
  const filepath2 = getFixturePath(secondArgument);
  const getResult = readFile(expectedResult);
  const result = genDiff(filepath1, filepath2, format);
  expect(result).toEqual(getResult);
});