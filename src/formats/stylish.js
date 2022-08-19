import _ from 'lodash';

const genIndent = (numer, str = ' ') => str.repeat(numer * 4 - 2);

const makeString = (value, numer = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const newKey = value[key];
    return `${genIndent(numer + 1)}  ${key}: ${makeString(newKey, numer + 1)}`;
  });
  return `{\n${result.join('\n')}\n  ${genIndent(numer)}}`;
};

const stylish = (obj) => {
  const iter = (node, numer = 1) => {
    const {
      type,
      key,
      value,
      value1,
      value2,
      children,
    } = node;
    const result1 = `${genIndent(numer)}- ${key}: ${makeString(value1, numer)}`;
    const result2 = `${genIndent(numer)}+ ${key}: ${makeString(value2, numer)}`;
    switch (type) {
      case 'object': {
        const objectResult = children.flatMap((child) => iter(child, numer + 1));
        return `${genIndent(numer)}  ${key}: {\n${objectResult.join('\n')}\n${genIndent(numer)}  }`;
      }
      case 'delete':
        return `${genIndent(numer)}- ${key}: ${makeString(value, numer)}`;
      case 'add':
        return `${genIndent(numer)}+ ${key}: ${makeString(value, numer)}`;
      case 'defferent':
        return (`${result1}\n${result2}`);
      case 'same':
        return `${genIndent(numer)}  ${key}: ${makeString(value, numer)}`;
      default:
        console.log('Error');
    }
    return node;
  };
  const result = obj.map((item) => iter(item));
  return `{\n${result.join('\n')}\n}`;
};
export default stylish;
