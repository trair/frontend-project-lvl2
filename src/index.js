import fs from 'fs';
import path from 'path';
import compareData from './compareData.js';
import parse from './parsers.js';
import format from './formats/index.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
const getFormat = (filename) => filename.split('.')[1];

const genDiff = (filepath1, filepath2, nameOfFormat = 'stylish') => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);
  const obj1 = parse(content1, getFormat(filepath1));
  const obj2 = parse(content2, getFormat(filepath2));
  const tree = compareData(obj1, obj2);
  return format(tree, nameOfFormat);
};
export default genDiff;
