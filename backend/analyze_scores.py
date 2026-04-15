
import json
import os

path = r'd:\Abandon\rapper-matching-test\backend\data\questions.json'
if os.path.exists(path):
    with open(path, 'r', encoding='utf-8') as f:
        qs = json.load(f)
    max_scores = {'career': 0, 'emotion': 0, 'authenticity': 0, 'greed': 0, 'brotherhood': 0}
    count = {'career': 0, 'emotion': 0, 'authenticity': 0, 'greed': 0, 'brotherhood': 0}
    
    for q in qs:
        # Find max positive score per dimension in each question
        temp_max = {'career': 0, 'emotion': 0, 'authenticity': 0, 'greed': 0, 'brotherhood': 0}
        for opt in q['options']:
            for dim, val in opt['scores'].items():
                if val > temp_max.get(dim, 0):
                    temp_max[dim] = val
        
        for dim, val in temp_max.items():
            max_scores[dim] += val
            if val > 0:
                count[dim] += 1
                
    print(f"Max Possible Scores: {max_scores}")
    print(f"Question counts per dimension: {count}")
else:
    print(f"File not found: {path}")
