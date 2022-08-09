import yaml from 'js-yaml';

export default (file, extension) => {
  switch (extension) {
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