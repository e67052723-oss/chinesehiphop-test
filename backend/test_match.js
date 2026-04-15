
const MAX_SCORES = {
    career: 47,
    emotion: 53,
    authenticity: 57,
    greed: 47,
    brotherhood: 45
};

const normalize = (score, max) => {
    if (score <= 0) return 1;
    return Math.min(10, 1 + (score / max) * 9);
};

// Simulate a user who matches PGone's profile
// PGone (expected): career 7, emotion 7, authenticity 7, greed 8, brotherhood 4
const userScores = {
    career: 33,      // 33/47 = 0.7 -> 1 + 6.3 = 7.3
    emotion: 35,     // 35/53 = 0.66 -> 1 + 5.9 = 6.9
    authenticity: 38, // 38/57 = 0.66 -> 1 + 6.0 = 7.0
    greed: 35,       // 35/47 = 0.74 -> 1 + 6.7 = 7.7
    brotherhood: 15  // 15/45 = 0.33 -> 1 + 3.0 = 4.0
};

const userProfile = {
    career: normalize(userScores.career, MAX_SCORES.career),
    emotion: normalize(userScores.emotion, MAX_SCORES.emotion),
    authenticity: normalize(userScores.authenticity, MAX_SCORES.authenticity),
    greed: normalize(userScores.greed, MAX_SCORES.greed),
    brotherhood: normalize(userScores.brotherhood, MAX_SCORES.brotherhood)
};

console.log('User Profile:', userProfile);

const pgOneExpected = { career: 7, emotion: 7, authenticity: 7, greed: 8, brotherhood: 4 };

let distance = 0;
['career', 'emotion', 'authenticity', 'greed', 'brotherhood'].forEach(dim => {
    distance += Math.pow(userProfile[dim] - pgOneExpected[dim], 2);
});

console.log('Distance:', distance);

const maxPossibleDistance = 405;
let matchPercentage = ((1 - Math.sqrt(distance / maxPossibleDistance)) * 100).toFixed(1);

console.log('Match Percentage:', matchPercentage);
