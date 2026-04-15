
const fs = require('fs');

const rappers = JSON.parse(fs.readFileSync('d:/Abandon/rapper-matching-test/backend/data/rappers.json', 'utf8'));

console.log('--- Rapper Distance Matrix (Raw) ---');
for (let i = 0; i < rappers.length; i++) {
    for (let j = i + 1; j < rappers.length; j++) {
        const r1 = rappers[i];
        const r2 = rappers[j];
        let d = 0;
        ['career', 'emotion', 'authenticity', 'greed', 'brotherhood'].forEach(dim => {
            d += Math.pow(r1.expected_scores[dim] - r2.expected_scores[dim], 2);
        });
        const dist = Math.sqrt(d).toFixed(2);
        if (dist < 3) {
            console.log(`Too similar: ${r1.name} vs ${r2.name} (Dist: ${dist})`);
        }
    }
}
