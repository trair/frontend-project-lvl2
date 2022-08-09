import stylish from './stylish.js';
import plain from './plain.js';

const format = (file, format = 'stylish') => {
  switch (format) {
    case 'plain':
      return plain(file);
    case 'json':
      return JSON.stringify(file);
    case 'stylish':
      return stylish(file);
    default:
      throw new Error(`format ${nameOfFormat} is not supported`);
  }
};

export default format;