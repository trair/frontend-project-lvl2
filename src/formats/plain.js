import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (data) => {
  const iter = (node, parent = '') => {
    const result = node
      .map((data) => {
        const newParents = [...parent, data.key];
        const joinNewParents = newParents.join('.');
        switch (type) {
          case 'nested':
            return `${iter(data.value, [...parent, data.key])}`;
          case 'deleted':
            return `Property '${joinNewParents }' was removed`;
          case 'unchanged':
            return null;
          case 'added':
            return `Property '${joinNewParents }' was added with value: ${stringify(data.value)}`;
          case 'changed':
            return `Property '${joinNewParents }' was updated. From ${stringify(data.value[0])} to ${stringify(data.value2[1])}`;
          default:
            throw new Error(`Error. Unknown type ${type}!`);
        }
      })
      .filter((element) => element !== null)
      .join('\n');
    return result;
  };
  return iter(data, []);
};
export default plain;
