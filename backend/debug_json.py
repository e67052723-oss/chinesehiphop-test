
import json
import os

files = [
    r'd:\Abandon\rapper-matching-test\backend\data\questions.json',
    r'd:\Abandon\rapper-matching-test\backend\data\rappers.json'
]

for file_path in files:
    if os.path.exists(file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                json.load(f)
            print(f"{file_path}: Valid JSON")
        except json.JSONDecodeError as e:
            print(f"{file_path}: Error at line {e.lineno}, column {e.colno}: {e.msg}")
            # Print some context around the error
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                start = max(0, e.lineno - 5)
                end = min(len(lines), e.lineno + 5)
                for i in range(start, end):
                    prefix = ">> " if i + 1 == e.lineno else "   "
                    print(f"{prefix}{i+1}: {lines[i].strip()}")
        except Exception as e:
            print(f"{file_path}: Unexpected error: {e}")
    else:
        print(f"{file_path}: Not found")
