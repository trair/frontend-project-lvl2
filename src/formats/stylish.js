import _ from 'lodash';

const genIndent = (depth, str = ' ') => str.repeat(depth * 4 - 2);

const makeString = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const newKey = value[key];
    return `${genIndent(depth + 1)}  ${key}: ${makeString(newKey, depth + 1)}`;
  });
  return `{\n${result.join('\n')}\n  ${genIndent(depth)}}`;
};

const stylish = (obj) => {
  const iter = (node, depth = 1) => {
    const {
      type,
      key,
      value,
      value1,
      value2,
      children,
    } = node;
    const result1 = `${genIndent(depth)}- ${key}: ${makeString(value1, depth)}`;
    const result2 = `${genIndent(depth)}+ ${key}: ${makeString(value2, depth)}`;
    switch (type) {
      case 'nested': {
        const objectResult = children.flatMap((child) => iter(child, depth + 1));
        return `${genIndent(depth)}  ${key}: {\n${objectResult.join('\n')}\n${genIndent(depth)}  }`;
      }
      case 'deleted':
        return `${genIndent(depth)}- ${key}: ${makeString(value, depth)}`;
      case 'added':
        return `${genIndent(depth)}+ ${key}: ${makeString(value, depth)}`;
      case 'changed':
        return (`${result1}\n${result2}`);
      case 'unchanged':
        return `${genIndent(depth)}  ${key}: ${makeString(value, depth)}`;
      default:
        console.log('Error');
    }
    return node;
  };
  const result = obj.map((item) => iter(item));
  return `{\n${result.join('\n')}\n}`;
};
export default stylish;
