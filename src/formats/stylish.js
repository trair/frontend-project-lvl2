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

const stylish = (obj) => {
  const iter = (node, num = 1) => {
    const {
      type,
      key,
      value,
      value1,
      value2,
      children,
    } = node;
    const result1 = `${genIndent(num)}- ${key}: ${makeString(value1, num)}`;
    const result2 = `${genIndent(num)}+ ${key}: ${makeString(value2, num)}`;
    switch (type) {
      case 'object': {
        const objectResult = children.flatMap((child) => iter(child, num + 1));
        return `${genIndent(num)}  ${key}: {\n${objectResult.join('\n')}\n${genIndent(num)}  }`;
      }
      case 'delete':
        return `${genIndent(num)}- ${key}: ${makeString(value, num)}`;
      case 'add':
        return `${genIndent(num)}+ ${key}: ${makeString(value, num)}`;
      case 'defferent':
        return (`${result1}\n${result2}`);
      case 'same':
        return `${genIndent(num)}  ${key}: ${makeString(value, num)}`;
      default:
        console.log('Error');
    }
    return node;
  };
  const result = obj.map((item) => iter(item));
  return `{\n${result.join('\n')}\n}`;
};
export default stylish;
