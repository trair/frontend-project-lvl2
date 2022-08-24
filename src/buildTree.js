import _ from 'lodash';

const buildTree = (data1, data2) => {
  const uniqKeys = _.uniq(_.keys(data1), _.keys(data2));
  const sortKeys = _.sortBy(uniqKeys);
  const result = sortKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        type: 'nested',
        key,
        children: compareData(value1, value2),
      };
    }
    if (!_.has(data2, key)) {
      return {
        type: 'deleted',
        key,
        value: value1,
      };
    }
    if (!_.has(data1, key)) {
      return {
        type: 'added',
        key,
        value: value2,
      };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'changed',
        key,
        value1,
        value2,
      };
    }
    return {
      type: 'unchanged',
      key,
      value: value1,
    };
  });
  return result;
};
export default buildTree;
