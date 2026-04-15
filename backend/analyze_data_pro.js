
const fs = require('fs');
const path = 'd:/Abandon/rapper-matching-test/backend/data/questions.json';
const questions = JSON.parse(fs.readFileSync(path, 'utf8'));

const dims = ['career', 'emotion', 'authenticity', 'greed', 'brotherhood'];
const maxPossible = { career: 0, emotion: 0, authenticity: 0, greed: 0, brotherhood: 0 };
const minPossible = { career: 0, emotion: 0, authenticity: 0, greed: 0, brotherhood: 0 };

questions.forEach(q => {
    dims.forEach(dim => {
        let qMax = -Infinity;
        let qMin = Infinity;
        q.options.forEach(opt => {
            const score = opt.scores[dim] || 0;
            if (score > qMax) qMax = score;
            if (score < qMin) qMin = score;
        });
        if (qMax !== -Infinity) maxPossible[dim] += qMax;
        if (qMin !== Infinity) minPossible[dim] += qMin;
    });
});

console.log('--- Current Data Stats ---');
console.log('Max Potential Scores:', maxPossible);
console.log('Min Potential Scores:', minPossible);
console.log('Range:', dims.map(d => `${d}: ${minPossible[d]} to ${maxPossible[d]}`).join(', '));
