
const fs = require('fs');

const questions = JSON.parse(fs.readFileSync('d:/Abandon/rapper-matching-test/backend/data/questions.json', 'utf8'));
const rappers = JSON.parse(fs.readFileSync('d:/Abandon/rapper-matching-test/backend/data/rappers.json', 'utf8'));

const MAX_SCORES = {
    career: 47,
    emotion: 53,
    authenticity: 57,
    greed: 47,
    brotherhood: 45
};

const normalize = (score, max) => {
    if (score <= 0) return 1;
    const ratio = score / max;
    const boostedRatio = 1 / (1 + Math.exp(-10 * (ratio - 0.5)));
    const val = 1 + boostedRatio * 9;
    return Math.max(1, Math.min(10, val));
};

const getMatch = (scores) => {
    const profile = {
        career: normalize(scores.career, MAX_SCORES.career),
        emotion: normalize(scores.emotion, MAX_SCORES.emotion),
        authenticity: normalize(scores.authenticity, MAX_SCORES.authenticity),
        greed: normalize(scores.greed, MAX_SCORES.greed),
        brotherhood: normalize(scores.brotherhood, MAX_SCORES.brotherhood)
    };
    
    let best = null;
    let mindist = Infinity;
    rappers.forEach(r => {
        let d = 0;
        ['career', 'emotion', 'authenticity', 'greed', 'brotherhood'].forEach(dim => {
            d += Math.pow(profile[dim] - r.expected_scores[dim], 2);
        });
        if (d < mindist) {
            mindist = d;
            best = r;
        }
    });
    return best.name;
};

// Simulation: 1000 random runs
const results = {};
for (let i = 0; i < 1000; i++) {
    const userScores = { career: 0, emotion: 0, authenticity: 0, greed: 0, brotherhood: 0 };
    questions.forEach(q => {
        const opt = q.options[Math.floor(Math.random() * q.options.length)];
        Object.entries(opt.scores).forEach(([dim, val]) => {
            userScores[dim] += val;
        });
    });
    const winner = getMatch(userScores);
    results[winner] = (results[winner] || 0) + 1;
}

console.log('Result Distribution (1000 random runs):');
console.log(JSON.stringify(results, null, 2));
