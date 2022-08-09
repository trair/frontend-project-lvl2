#!/usr/bin/env node
import genDiff from '../src/index.js'
import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .version('1.0.0')  
  .description('Compares two configuration files and shows a difference.') 
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => genDiff(filepath1, filepath2, options.format))

program.parse();