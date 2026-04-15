
const fs = require('fs');
const path = 'd:/Abandon/rapper-matching-test/backend/data/questions.json';
const questions = JSON.parse(fs.readFileSync(path, 'utf8'));

// Identify key high-impact questions by ID
const impactMap = {
    1: { brotherhood: 10 },
    4: { career: 15 },
    5: { career: 15 },
    6: { emotion: 15 },
    11: { emotion: 15 },
    13: { brotherhood: 15 },
    14: { brotherhood: 10 },
    17: { brotherhood: 12 },
    19: { emotion: 15 },
    20: { career: 15 },
    22: { brotherhood: 10 }
};

questions.forEach(q => {
    if (impactMap[q.id]) {
        Object.entries(impactMap[q.id]).forEach(([dim, impact]) => {
            let opt = q.options.find(o => o.scores[dim] > 0);
            if (!opt) opt = q.options[0];
            opt.scores[dim] = impact;
        });
    }
});

fs.writeFileSync(path, JSON.stringify(questions, null, 2), 'utf8');
console.log('Successfully pumped question scores for Career, Emotion, and Brotherhood.');
