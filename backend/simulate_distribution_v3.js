
const fs = require('fs');

const questions = JSON.parse(fs.readFileSync('d:/Abandon/rapper-matching-test/backend/data/questions.json', 'utf8'));
const rappers = JSON.parse(fs.readFileSync('d:/Abandon/rapper-matching-test/backend/data/rappers.json', 'utf8'));

const MAX_SCORES = {
    career: 83,
    emotion: 91,
    authenticity: 110,
    greed: 106,
    brotherhood: 79
};

const normalize = (score, max) => {
    if (score <= 0) return 5;
    const baseline = max * 0.8;
    const val = (score / baseline) * 100;
    return Math.max(1, Math.min(100, val));
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
            const uVal = profile[dim];
            const rVal = r.expected_scores[dim] || 50;
            d += Math.pow(uVal - rVal, 2);
        });
        if (d < mindist) {
            mindist = d;
            best = r;
        }
    });
    return best.name;
};

const results = {};
for (let i = 0; i < 2000; i++) {
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

console.log('Result Distribution (2000 random runs):');
const sorted = Object.entries(results).sort((a,b) => b[1] - a[1]);
sorted.forEach(([name, count]) => {
    console.log(`${name}: ${count} (${((count/2000)*100).toFixed(1)}%)`);
});
