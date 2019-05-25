const fs = require('fs');
const sass = require('node-sass');

const files = ['summary', 'bookmarks'];
const fromPath = './src/app/lazy/home/demo-components';
const toPath = './src/app/lazy/home/scripts/templates';

/**
 * @param {string} toFile The file to output
 * @param {string} contents The contents of the file
 */
function writeTypescript(toFile, contents) {
    const formatted = contents
        .replace(/\r/g, '')
        .split('\n')
        .map(line => line.replace(/'/g, '\\\''))
        .map((line, indx, arr) => {
            const postfix = indx === arr.length - 1 ? '' : ',';
            return `    '${line}'${postfix}`;
        });

    const lines = [
        '// This file was generated by running "npm run templates"',
        'export const lines = [',
        ...formatted,
        '];',
        ''
    ];

    fs.writeFileSync(toFile, lines.join('\n'));
}

files.forEach(name => {
    ['html', 'scss'].forEach(ext => {
        const fromFile = `${fromPath}/${name}/${name}.component.${ext}`;
        const toFile = `${toPath}/${name}.component.${ext}.ts`;

        console.log(`copying from ${fromFile} to ${toFile}`);

        writeTypescript(toFile, fs.readFileSync(fromFile, {encoding: 'utf8'}));

        if (ext === 'scss') {
            const toCss = `${toPath}/${name}.component.css.ts`;

            console.log(`SASS compiling ${toCss}`);

            const result = sass.renderSync({file: fromFile, outputStyle: 'expanded', sourceMap: false});
            writeTypescript(toCss, result.css.toString('utf8'));
        }
    });
});
