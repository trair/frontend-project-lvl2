import _ from 'lodash';

const plainTypeOf = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `${value}`;
  }

  return value;
};

const plain = (diffTree) => {
  const buildString = (nodes, path = '') => nodes
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const buildPath = path ? `${path}.${node.key}` : node.key;
      switch (node.type) {
        case 'added':
          return `Property '${buildPath}' was added with value: ${plainTypeOf(node.value)}`;
        case 'deleted':
          return `Property '${buildPath}' was removed`;
        case 'changed':
          return `Property '${buildPath}' was updated. From ${plainTypeOf(node.valueBefore)} to ${plaintify(node.valueAfter)}`;
        case 'nested':
          return `${buildString(node.children, buildPath)}`;
        default:
          throw new Error(`This type does not exist: ${node.type}`);
      }
    }).join('\n');

  return buildString(diffTree);
};

export default plain;