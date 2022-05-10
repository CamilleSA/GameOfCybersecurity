from dataclasses import dataclass
from flask import Flask
from secrets import token_hex
from enum import Enum

app = Flask(__name__)


class SessionStatus(str, Enum):
    STARTED = 'started'
    ENDED = 'ended'

@dataclass
class Session:
    token: str
    status: SessionStatus

sessions : list[Session] = []

@app.route("/startSession", methods=['POST'])
def start_session():
    session_token = token_hex(16)

    sessions.append(Session(token=session_token, status=SessionStatus.STARTED))

    return session_token, 200
