
const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('d:/Abandon/rapper-matching-test/backend/data/questions.json', 'utf8'));

const dims = ['career', 'emotion', 'authenticity', 'greed', 'brotherhood'];
const maxScores = { career: 0, emotion: 0, authenticity: 0, greed: 0, brotherhood: 0 };
const counts = { career: 0, emotion: 0, authenticity: 0, greed: 0, brotherhood: 0 };

questions.forEach(q => {
    const qMax = { career: 0, emotion: 0, authenticity: 0, greed: 0, brotherhood: 0 };
    q.options.forEach(opt => {
        Object.entries(opt.scores).forEach(([dim, val]) => {
            if (val > qMax[dim]) qMax[dim] = val;
        });
    });
    dims.forEach(dim => {
        maxScores[dim] += qMax[dim];
        if (qMax[dim] > 0) counts[dim]++;
    });
});

console.log('Max Scores:', maxScores);
console.log('Question Counts per Dim:', counts);
