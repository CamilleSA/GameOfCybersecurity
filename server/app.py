from dataclasses import dataclass
from unittest import result
from flask import Flask, request, jsonify
from enum import Enum
from datetime import datetime
from pathlib import Path
import json
import os

app = Flask(__name__)

RESULTS_FILE = Path(os.environ.get('RESULTS_FILE', 'results.json'))

if not RESULTS_FILE.is_file():
    with RESULTS_FILE.open('w') as file:
        json.dump({}, file)

@app.route("/addScore", methods=['POST'])
def add_score():
    username = request.json.get('username', None)
    difficulty = request.json.get('difficulty', None)
    score = request.json.get('score', None)

    if username is None:
        return "Missing username", 400
    if difficulty is None:
        return "Missing difficulty", 400
    if score is None:
        return "Missing score", 400

    with open(RESULTS_FILE, 'r+') as f:
        results = json.load(f)
        if username not in results:
            results[username] = [{"difficulty": difficulty, "score": score, "date": str(datetime.now())}]
        else:
            results[username].append({"difficulty": difficulty, "score": score, "date": str(datetime.now())})
        f.seek(0)
        f.truncate()
        json.dump(results, f)

    return jsonify(results[username]), 200