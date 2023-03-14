tsc main.ts --outDir build
browserify ./build/main.js --outfile ./build/bundle.js