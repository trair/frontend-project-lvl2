import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const chooseStyle = (file, format = 'stylish') => {
  switch (format) {
    case 'plain':
      return plain(file);
    case 'json':
      return json(file);
    case 'stylish':
      return stylish(file);
    default:
      throw new Error('Error in switch. Try agagin!')
  }
};

export default chooseStyle;