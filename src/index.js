import fs from 'fs';
import path from 'path';
import compareData from './compareData.js';
import parse from './parsers.js';
import format from './formats/index.js';

const getPath = (file) => path.resolve(process.cwd(), file);
const readFile = (file) => fs.readFileSync(getPath(file), 'utf-8');
const getFormat = (file) => file.split('.')[1];

const genDiff = (file1, file2, nameOfFormat = 'stylish') => {
  const content1 = readFile(file1);
  const content2 = readFile(file2);
  const obj1 = parse(content1, getFormat(file1));
  const obj2 = parse(content2, getFormat(file2));
  const buildTree = compareData(obj1, obj2);
  return format(buildTree, nameOfFormat);
};
export default genDiff;
