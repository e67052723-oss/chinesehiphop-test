
const fs = require('fs');
const path = 'd:/Abandon/rapper-matching-test/backend/data/rappers.json';
const rappers = JSON.parse(fs.readFileSync(path, 'utf8'));

const namesToDelete = ['法老', 'Asen', 'GAI', '高天佐', '翁杰'];

const filteredRappers = rappers.filter(r => !namesToDelete.includes(r.name));

fs.writeFileSync(path, JSON.stringify(filteredRappers, null, 4), 'utf8');
console.log(`Deleted ${rappers.length - filteredRappers.length} rappers.`);
