import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (obj) => {
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
      case 'object': {
        const objectResult = children.flatMap((child) => iter(child, `${parent}${key}.`));
        return objectResult.join('\n');
      }
      case 'delete':
        return `Property '${parent}${key}' was removed`;
      case 'add':
        return `Property '${parent}${key}' was added with value: ${stringify(value)}`;
      case 'defferent':
        return `Property '${parent}${key}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
      case 'same':
        return null;
      default:
        console.log('Error');
    }
    return node;
  };
  const result = obj.map((item) => iter(item));
  return `${result.join('\n')}`;
};
export default plain;
