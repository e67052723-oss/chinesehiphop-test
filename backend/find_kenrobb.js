
const fs = require('fs');

const questions = JSON.parse(fs.readFileSync('d:/Abandon/rapper-matching-test/backend/data/questions.json', 'utf8'));
const rappers = JSON.parse(fs.readFileSync('d:/Abandon/rapper-matching-test/backend/data/rappers.json', 'utf8'));

const kenRobb = rappers.find(r => r.name === 'KenRobb');
console.log('KenRobb Profile:', kenRobb.expected_scores);

// Find "KenRobb-like" options in each question
// KenRobb likes High Authenticity/Greed, Low Career/Emotion/Brotherhood
questions.forEach(q => {
    console.log(`\nQ${q.id}: ${q.text}`);
    q.options.forEach((opt, idx) => {
        const s = opt.scores;
        // Calculate a "KenRobb matching score" for this option
        // We want (A high) + (G high) - (C, E, B)
        const krScore = (s.authenticity || 0) + (s.greed || 0) - (s.career || 0) - (s.emotion || 0) - (s.brotherhood || 0);
        console.log(`  Option ${idx + 1}: [KR score: ${krScore.toFixed(1)}] ${opt.text} (${JSON.stringify(s)})`);
    });
});
