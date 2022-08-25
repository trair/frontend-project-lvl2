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

const stylish = (data) => {
  const iter = (node, depth = 1) => {
    const result = node.flatMap((item) => {
      const result1 = `${genIndent(depth)}- ${item.key}: ${makeString(item.valueDeleted, depth)}`;
      const result2 = `${genIndent(depth)}+ ${item.key}: ${makeString(item.valueAdded, depth)}`;
      switch (item.type) {
        case 'nested': {
          const objectResult = item.children.flatMap((child) => iter(child, depth + 1));
          return `${genIndent(depth)}  ${item.key}: {\n${objectResult.join('\n')}\n${genIndent(depth)}  }`;
        }
        case 'deleted':
          return `${genIndent(depth)}- ${item.key}: ${makeString(item.value, depth)}`;
        case 'added':
          return `${genIndent(depth)}+ ${item.key}: ${makeString(item.value, depth)}`;
        case 'changed':
          return (`${result1}\n${result2}`);
        case 'unchanged':
          return `${genIndent(depth)}  ${item.key}: ${makeString(item.value, depth)}`;
        default:
          throw new Error(`Error. Unknown type ${item.type}!`);
      }
    });

    return result.join('\n');
  };
  const result = data.map((item) => iter(item));
  return `{\n${result.join('\n')}\n}`;
};
export default stylish;
