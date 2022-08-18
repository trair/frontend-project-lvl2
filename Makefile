gendiff:
	node bin/gendiff.js
	
install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest --coverage

test-coverage:
	npx jest --bail --coverage --coverageProvider=v8

