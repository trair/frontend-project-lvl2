import _ from 'lodash';

const buildTree = (data1, data2) => {
  const uniqKeys = _.uniq(_.keys(data1), _.keys(data2));
  const sortKeys = _.sortBy(uniqKeys);
  const result = sortKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        type: 'nested',
        key,
        children: buildTree(data1[key], data2[key]),
      };
    }
    if (!_.has(data2, key)) {
      return {
        type: 'deleted',
        key,
        value1: data1[key],
      };
    }
    if (!_.has(data1, key)) {
      return {
        type: 'added',
        key,
        value2: data2[key],
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        type: 'changed',
        key,
        value1: data1[key],
        value2: data2[key],
      };
    }
    return {
      type: 'unchanged',
      key,
      value1: data1[key],
    };
  });
  return result;
};
export default buildTree;
