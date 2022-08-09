import fs from 'fs';
import path from 'path';
import compareData from './compareData.js';
import chooseParser from './parsers.js';
import format from './formatters/format.js';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFile = (file) => fs.readFileSync(getPath(file), 'utf-8');
const getFormat = (file) => file.split('.')[1];

const genDiff = (file1, file2, format = 'stylish') => {
  const readFile1 = readFile(file1);
  const readFile2 = readFile(file2);
  const obj1 = chooseParser(readFile1, getFormat(file1));
  const obj2 = chooseParser(readFile2, getFormat(file2));
  const tree = compareData(obj1, obj2);
  
  return format(tree, format);
};

export default genDiff;