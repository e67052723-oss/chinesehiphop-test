
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

// Persona 1: Extreme Career & Authenticity (Should match KeyNG or similar)
const user1 = { career: 40, emotion: 10, authenticity: 50, greed: 20, brotherhood: 10 };
// Persona 2: Extreme Emotion & Soft (Should match Manto/Asen)
const user2 = { career: 10, emotion: 50, authenticity: 15, greed: 10, brotherhood: 20 };
// Persona 3: Extreme Brotherhood (Should match GAI/Dankou/Guangguang)
const user3 = { career: 20, emotion: 25, authenticity: 25, greed: 15, brotherhood: 40 };

const getMatch = (scores) => {
    const profile = {
        career: normalize(scores.career, MAX_SCORES.career),
        emotion: normalize(scores.emotion, MAX_SCORES.emotion),
        authenticity: normalize(scores.authenticity, MAX_SCORES.authenticity),
        greed: normalize(scores.greed, MAX_SCORES.greed),
        brotherhood: normalize(scores.brotherhood, MAX_SCORES.brotherhood)
    };
    
    // Simple mock of rappers (just a few for testing)
    const rappers = [
        { name: "杨和苏", expected: { career: 10, emotion: 3, authenticity: 9, greed: 5, brotherhood: 4 } },
        { name: "满舒克", expected: { career: 6, emotion: 10, authenticity: 4, greed: 7, brotherhood: 6 } },
        { name: "MC光光", expected: { career: 4, emotion: 7, authenticity: 8, greed: 3, brotherhood: 10 } },
        { name: "Asen", expected: { career: 6, emotion: 9, authenticity: 9, greed: 5, brotherhood: 7 } },
        { name: "GAI", expected: { career: 9, emotion: 7, authenticity: 8, greed: 7, brotherhood: 10 } }
    ];

    let best = null;
    let mindist = Infinity;
    rappers.forEach(r => {
        let d = 0;
        ['career', 'emotion', 'authenticity', 'greed', 'brotherhood'].forEach(dim => {
            d += Math.pow(profile[dim] - r.expected[dim], 2);
        });
        if (d < mindist) {
            mindist = d;
            best = r;
        }
    });

    const matchPct = (1 - Math.sqrt(mindist / 405)) * 100;
    return { name: best.name, pct: matchPct.toFixed(1) };
};

console.log('User 1 (Hardcore):', getMatch(user1));
console.log('User 2 (Melodic):', getMatch(user2));
console.log('User 3 (Brotherhood):', getMatch(user3));
