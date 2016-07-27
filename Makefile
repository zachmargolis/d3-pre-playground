bundle.js: main.js node_modules/.bin/browserify
	node_modules/.bin/browserify main.js -o bundle.js

index-pre.html: index.html bundle.js node_modules/.bin/d3-pre
	cp index.html index-pre.html
	node_modules/.bin/d3-pre index-pre.html

node_modules/.bin/%: package.json
	npm install
	touch node_modules/.bin/*

server:
	python -m SimpleHTTPServer

.PHONY: clean
clean:
	rm bundle.js index-pre.html
