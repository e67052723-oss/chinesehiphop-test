const fs = require('fs');
const rappers = JSON.parse(fs.readFileSync('frontend/src/data/rappers.json', 'utf8'));

function calculateResult(userScores, userAnswers) {
    let availableRappers = [...rappers];

    if (userAnswers[1] === 1) availableRappers = availableRappers.filter(r => !['r7', 'r4', 'r10'].includes(r.id));
    if (userAnswers[4] === 2) availableRappers = availableRappers.filter(r => !['r16', 'r11', 'r25', 'r14'].includes(r.id));
    if (userAnswers[4] === 3) availableRappers = availableRappers.filter(r => !['r7', 'r4', 'r13'].includes(r.id));
    if (userAnswers[6] !== 0) availableRappers = availableRappers.filter(r => r.id !== 'r2');
    if (userAnswers[14] === 1) availableRappers = availableRappers.filter(r => !['r16', 'r15'].includes(r.id));
    if (userAnswers[20] === 2) availableRappers = availableRappers.filter(r => !['r7', 'r10'].includes(r.id));

    const distances = availableRappers.map(rapper => {
        let distance = 0;
        Object.keys(userScores).forEach(key => {
            distance += Math.pow((userScores[key] || 0) - (rapper.expected_scores[key] || 0), 2);
        });
        let finalDistance = Math.sqrt(distance);
        if (userAnswers[2] === 1 && rapper.id === 'r23') finalDistance -= 30;
        if (userAnswers[3] === 1 && (rapper.id === 'r4' || rapper.id === 'r13')) finalDistance -= 30;
        if (userAnswers[14] === 1 && (rapper.id === 'r14' || rapper.id === 'r24')) finalDistance -= 30;
        return { ...rapper, distance: finalDistance };
    });

    distances.sort((a, b) => a.distance - b.distance);
    return distances[0];
}

console.log("Q1B Exclude:", !['r7', 'r4', 'r10'].includes(calculateResult({}, {1: 1}).id));
console.log("Q4D Exclude:", !['r7', 'r4', 'r13'].includes(calculateResult({}, {4: 3}).id));
console.log("Q20C Exclude:", !['r7', 'r10'].includes(calculateResult({}, {20: 2}).id));
console.log("Q2B Bonus Asen:", calculateResult({career:90, emotion:60, authenticity:100, greed:90, brotherhood:100}, {2: 1}).name === "Asen");
