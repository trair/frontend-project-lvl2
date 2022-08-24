import _ from 'lodash';

const buildTree = (data1, data2) => {
  const uniqKeys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]);
  const sortKeys = _.sortBy(uniqKeys);
  const result = sortKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        type: 'object',
        key,
        children: buildTree(value1, value2),
      };
    }
    if (!_.has(data2, key)) {
      return {
        type: 'delete',
        key,
        value: value1,
      };
    }
    if (!_.has(data1, key)) {
      return {
        type: 'add',
        key,
        value: value2,
      };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'defferent',
        key,
        value1,
        value2,
      };
    }
    return {
      type: 'same',
      key,
      value: value1,
    };
  });
  return result;
};
export default buildTree;
