import _ from 'lodash';

const genIndent = (depth, replacer = ' ', spacesCount = 4) => {
  const indentSize = depth * spacesCount;
  return replacer.repeat(indentSize - 1);
};

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

const iter = (tree, depth = 1) => {
  const result = tree.map((node) => {
    const indent = genIndent(depth);
    switch (node.type) {
      case 'nested': {
        const objectResult = node.children.flatMap((child) => iter(child, depth + 1));
        return `${genIndent(depth)}  ${node.key}: {\n${objectResult.join('\n')}\n${genIndent(depth)}  }`;
      }
      case 'deleted':
        return `${indent.slice(1)}- ${node.key}: ${makeString(node.value, depth)}`;
      case 'added':
        return `${indent.slice(1)}+ ${node.key}: ${makeString(node.value, depth)}`;
      case 'unchanged':
        return `${indent.slice(1)}  ${node.key}: ${makeString(node.value, depth)}`;
      case 'changed':
        return [
          `${indent.slice(1)}- ${node.key}: ${makeString(node.valueDeleted, depth)}`,
          `${indent.slice(1)}+ ${node.key}: ${makeString(node.valueAdded, depth)}`,
        ];
      default:
        throw new Error(`Error. Unknown type ${node.type}!`);
    }
  });

  return _.flatten(result).join('\n');
};

const stylish = (data) => `{\n${iter(data)}\n}`;
export default stylish;
