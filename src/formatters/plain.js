import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (data) => {
  const iter = (node, key = '') => {
    const result = node.flatMap((item) => {
      const newKeys = [...key, item.key];

      switch (item.type) {
        case 'nested':
          return iter(item.children, newKeys);
        case 'deleted':
          return `Property '${newKeys.join('.')}' was removed`;
        case 'added':
          return `Property '${newKeys.join('.')}' was added with value: ${stringify(item.value)}`;
        case 'changed':
          return `Property '${newKeys.join('.')}' was updated. From ${stringify(item.valueInFirstFile)} to ${stringify(item.valueInSecondFile)}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown type ${item.type}`);
      }
    });

    return result.filter((item) => item !== null).join('\n');
  };
  return iter(data, []);
};
export default plain;
