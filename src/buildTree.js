import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortKeys = _.sortBy(_.union(keys1, keys2));
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
        value: data1[key],
      };
    }
    if (!_.has(data1, key)) {
      return {
        type: 'added',
        key,
        value: data2[key],
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        type: 'changed',
        key,
        valueInFirstFile: data1[key],
        valueInSecondFile: data2[key],
      };
    }
    return {
      type: 'unchanged',
      key,
      value: data1[key],
    };
  });
  return result;
};
export default buildTree;
