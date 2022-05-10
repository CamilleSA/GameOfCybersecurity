import json
from pathlib import Path
from dataclasses import dataclass, asdict
from typing import Any

class Reader():
    def __init__(self, path, model) -> None:
        self.path = Path(path)
        self.model = model

        if self.path.is_file() == False:
            raise Exception(f"Questions file not found : {path}")

    def read(self) -> Any:
        with self.path.open('r') as file:
            return [self.model(**item) for item in json.load(file)]

    def write(self, data) -> None:
        with self.path.open('w') as file:
            return json.dump([asdict(item) for item in data], file)

@dataclass
class Question:
    title: str
    image: str
    answers: list[str]
    good_answer: int
    difficulty: int
    details: str


class QuestionsReader(Reader):
    def __init__(self) -> None:
        super().__init__('questions.json', Question)

@dataclass
class Result:
    username: str
    score: int

class ResultsReader(Reader):
    def __init__(self) -> None:
        super().__init__('results.json', Result)
