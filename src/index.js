import fs from 'fs';
import path from 'path';
import compareData from './compareData.js';
import chooseParser from './parsers.js';
import format from './formats/index.js';

const getAbsolutePath = (file) => path.resolve(process.cwd(), '__fixtures__', file);
const readFile = (file) => fs.readFileSync(getAbsolutePath(file), 'utf-8');
const getFormat = (file) => file.split('.')[1];

const genDiff = (file1, file2, nameOfFormat = 'stylish') => {
  const content1 = readFile(file1);
  const content2 = readFile(file2);
  const obj1 = chooseParser(content1, getFormat(file1));
  const obj2 = chooseParser(content2, getFormat(file2));
  const tree = compareData(obj1, obj2);
  return format(tree, nameOfFormat);
};
export default genDiff;
