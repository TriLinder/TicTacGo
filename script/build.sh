tsc -p tsconfig.json --outDir build
browserify ./build/main.js --outfile ./build/bundle.js