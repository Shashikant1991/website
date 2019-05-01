const fs = require('fs');
const sass = require('node-sass');

const files = ['summary', 'skills', 'experience', 'contact', 'menu'];
const fromPath = './src/app/lazy/home/demo-components';
const toPath = './src/app/lazy/home/scripts/templates';

files.forEach(name => {
    ['html', 'scss'].forEach(ext => {
        const from = `${fromPath}/${name}/${name}.component.${ext}`;
        const toSass = `${toPath}/${name}.component.${ext}.template`;

        console.log(`copying from ${from} to ${toSass}`);

        fs.copyFileSync(from, toSass);

        if (ext === 'scss') {
            const toCss = `${toPath}/${name}.component.css.template`;

            console.log(`SASS compiling ${toCss}`);

            const result = sass.renderSync({file: from, outputStyle: 'expanded', sourceMap: false});
            fs.writeFileSync(toCss, result.css.toString('utf8'), {encoding: 'utf8'});
        }
    });
});
