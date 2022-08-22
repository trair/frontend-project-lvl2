import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (file) => path.resolve(process.cwd(), '__fixtures__', file);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');

const stylishResult = readFile('stylishResult.txt');
const plainResult = readFile('plainResult.txt');
const jsonResult = readFile('jsonResult.txt');

const file1json = getFixturePath('file1.json');
const file2json = getFixturePath('file2.json');
const file1yaml = getFixturePath('file1.yaml');
const file2yml = getFixturePath('file2.yml');
const fileFormats = [['stylish', stylishResult], ['plain', plainResult], ['json', jsonResult]];

test('result is string', () => {
  expect(typeof genDiff(file1json, file2json, 'stylish')).toEqual('string');
});

test.each(fileFormats)('formater %s, file extension json', (format, expected) => {
  expect(genDiff(file1json, file2json, format)).toEqual(expected);
});

test.each(fileFormats)('formater %s, file extension yaml', (format, expected) => {
  expect(genDiff(file1yaml, file2yml, format)).toEqual(expected);
});
