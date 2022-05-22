from dataclasses import dataclass
from unittest import result
from flask import Flask, request, jsonify
from flask_cors import CORS
from enum import Enum
from datetime import datetime
from pathlib import Path
import json
import os

app = Flask(__name__)
CORS(app)

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

    with RESULTS_FILE.open('r+') as f:
        results = json.load(f)
        if username not in results:
            results[username] = [{"difficulty": difficulty, "score": score, "date": str(datetime.now())}]
        else:
            results[username].append({"difficulty": difficulty, "score": score, "date": str(datetime.now())})
        f.seek(0)
        f.truncate()
        json.dump(results, f)

    return jsonify({"username": username, "results": results[username]}), 200

@app.route("/getLeaderboard", methods=['GET'])
def getLeaderboard():
    difficulty = request.args.get('difficulty', 1)

    return jsonify([]), 200