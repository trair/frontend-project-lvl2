import _ from 'lodash';

const buildTree = (data1, data2) => {
  const dataKeys1 = Object.keys(data1);
  const dataKeys2 = Object.keys(data2);
  const sortKeys = _.sortBy(_.union(dataKeys1, dataKeys2));
  const result = sortKeys.map((key) => {
    if (_.isObject(value1) && _.isObject(value2)) {
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
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'changed',
        key,
        valueDeleted: data1[key],
        valueAdded: data2[key],
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
