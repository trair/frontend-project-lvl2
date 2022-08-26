import _ from 'lodash';

const genIndent = (num, str = ' ') => str.repeat(num * 4 - 2);

const makeString = (value, num = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const newKey = value[key];
    return `${genIndent(num + 1)}  ${key}: ${makeString(newKey, num + 1)}`;
  });
  return `{\n${result.join('\n')}\n  ${genIndent(num)}}`;
};

const stylish = (data) => {
  const iter = (node, num = 1) => {
    const {
      type,
      key,
      value,
      valueDeleted,
      valueAdded,
      children,
    } = node;
    const result1 = `${genIndent(num)}- ${key}: ${makeString(valueDeleted, num)}`;
    const result2 = `${genIndent(num)}+ ${key}: ${makeString(valueAdded, num)}`;
    switch (type) {
      case 'nested': {
        const objectResult = children.flatMap((child) => iter(child, num + 1));
        return `${genIndent(num)}  ${key}: {\n${objectResult.join('\n')}\n${genIndent(num)}  }`;
      }
      case 'deleted':
        return `${genIndent(num)}- ${key}: ${makeString(value, num)}`;
      case 'added':
        return `${genIndent(num)}+ ${key}: ${makeString(value, num)}`;
      case 'changed':
        return (`${result1}\n${result2}`);
      case 'unchanged':
        return `${genIndent(num)}  ${key}: ${makeString(value, num)}`;
      default:
        console.log('Error');
    }
    return node;
  };
  const result = data.map((item) => iter(item));
  return `{\n${result.join('\n')}\n}`;
};
export default stylish;
