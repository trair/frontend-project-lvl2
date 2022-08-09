import yaml from 'js-yaml';

const chooseParser = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`format ${format} is not supported`);
  }
};
export default chooseParser;