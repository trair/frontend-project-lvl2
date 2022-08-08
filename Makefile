gendiff:
	node bin/gendiff.js
	
install:
	npm ci

publish:
	npm publish --dry-run

link:
	npm link

make lint:
	npx eslint .

json-diff:
	gendiff __fixtures__/file1.json __fixtures__/file2.json

yml-yaml-diff:
	gendiff __fixtures__/file1.yml __fixtures__/file2.yaml

json-yml-diff-first:
	gendiff __fixtures__/file1.json __fixtures__/file2.yaml

json-yml-diff-second:
	gendiff __fixtures__/file1.yml __fixtures__/file2.json

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage