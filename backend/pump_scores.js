
const fs = require('fs');
const path = 'd:/Abandon/rapper-matching-test/backend/data/questions.json';
const questions = JSON.parse(fs.readFileSync(path, 'utf8'));

// Identify key high-impact questions by ID
const impactMap = {
    3: { brotherhood: 8 },
    7: { greed: 8 },
    8: { greed: 10, authenticity: 8 },
    9: { authenticity: 12 },
    12: { greed: 10, authenticity: 10 },
    15: { greed: 15, authenticity: 12 },
    16: { authenticity: 15, brotherhood: -10 },
    19: { authenticity: 15, greed: 12 },
    21: { greed: 15, career: 10 }
};

questions.forEach(q => {
    if (impactMap[q.id]) {
        // Boost the first option that matches the dimensions for simplicitly
        // or just apply to the first option of the question
        Object.entries(impactMap[q.id]).forEach(([dim, impact]) => {
            // Find an option that already has this dimension or just pick option 1
            let opt = q.options.find(o => o.scores[dim] > 0);
            if (!opt) opt = q.options[0];
            opt.scores[dim] = impact;
        });
    }
});

fs.writeFileSync(path, JSON.stringify(questions, null, 2), 'utf8');
console.log('Successfully pumped question scores for high variance.');
