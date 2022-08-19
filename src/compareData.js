import _ from 'lodash';

const compareData = (obj1, obj2) => {
  const uniqKeys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
  const sortKeys = _.sortBy(uniqKeys);
  const result = sortKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        type: 'nested',
        key,
        children: compareData(obj1[key], obj2[key]),
      };
    }
    if (!_.has(obj2, key)) {
      return {
        type: 'deleted',
        key,
        value: obj1[key],
      };
    }
    if (!_.has(obj1, key)) {
      return {
        type: 'added',
        key,
        value: obj2[key],
      };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
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
      value: obj1[key],
    };
  });
  return result;
};
export default compareData;
