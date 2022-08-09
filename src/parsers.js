import yaml from 'js-yaml';

export default (file, format) => {
  switch (format) {
    case '.yml':
      return yaml.load(file);
    case '.yaml':
      return yaml.load(file);
    case '.json':
      return JSON.parse(file);
    default:
      throw new Error(`Sorry, this  format .${format} does not support`);
  }
};