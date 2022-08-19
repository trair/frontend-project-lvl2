import _ from 'lodash';

const compareData = (data1, data2) => {
  const uniqKeys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]);
  const sortKeys = _.sortBy(uniqKeys);
  const result = sortKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data1[key];

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        type: 'nested',
        key,
        children: compareData(data1[key], data2[key]),
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
        value1,
        value2,
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
export default compareData;
