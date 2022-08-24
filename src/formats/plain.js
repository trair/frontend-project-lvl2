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
      .map((item) => {
        const newParents = [...parent, item.key];
        const joinNewParents = newParents.join('.');
        switch (item.type) {
          case 'nested':
            return `${iter(item.value, [...parent, item.key])}`;
          case 'deleted':
            return `Property '${joinNewParents}' was removed`;
          case 'unchanged':
            return null;
          case 'added':
            return `Property '${joinNewParents}' was added with value: ${stringify(item.value)}`;
          case 'changed':
            return `Property '${joinNewParents}' was updated. From ${stringify(item.value[0])} to ${stringify(item.value2[1])}`;
          default:
            throw new Error(`Error. Unknown type ${item.type}!`);
        }
      })
      .filter((element) => element !== null)
      .join('\n');
    return result;
  };
  return iter(data, []);
};
export default plain;
