import stylish from './stylish.js';
import plain from './plain.js';

const format = (tree, nameOfFormat) => {
  switch (nameOfFormat) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`format ${nameOfFormat} is not supported`);
  }
};
export default format;