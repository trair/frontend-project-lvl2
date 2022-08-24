import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (data) => {
  const iter = (node, parent = '') => {
    const {
      type,
      key,
      value,
      value1,
      value2,
      children,
    } = node;
    switch (type) {
      case 'nested': {
        const objectResult = children.flatMap((child) => iter(child, `${parent}${key}.`));
        return objectResult.join('\n');
      }
      case 'deleted':
        return `Property '${parent}${key}' was removed`;
      case 'unchanged':
        break;
      case 'added':
        return `Property '${parent}${key}' was added with value: ${stringify(value)}`;
      case 'changed':
        return `Property '${parent}${key}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
      default:
        throw new Error(`Error. Unknown type ${type}!`);
    }
    return null;
  };
  const result = data.map((item) => iter(item));
  return `${result.join('\n')}`;
};
export default plain;
