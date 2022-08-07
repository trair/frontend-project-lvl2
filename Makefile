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