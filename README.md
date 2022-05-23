# Game of Cybersecurity [EPITECH PROJET] [DOCUMENTATION]

>The project consists in developing an online game, with an open-source code, based on a traditional board game, with the objective of improving the level of maturity of the players in cybersecurity.


<a href="https://img.shields.io/badge/MADE%20WITH-REACTJS-blue" alt="ReactJS">
        <img src="https://img.shields.io/badge/MADE%20WITH-REACTJS-blue" /></a>
<a href="https://img.shields.io/badge/MADE%20WITH-FLASK-red" alt="Flask">
        <img src="https://img.shields.io/badge/MADE%20WITH-FLASK-red" /></a>

## Video
<p align="center">
  <img src="https://github.com/CamilleSA/GameOfCybersecurity/blob/main/assets/GOC.gif" />
</p>

>Within a time limit, you will have to answer a series of questions on the theme of cybersecurity. Each correct answer gives you extra time. To answer the questions, you must drag and drop the card on one of the sides. At the end of the timer, your score is computed.
Have fun !




# Home
**You can play with a username or by being anonymous.**
<p align="center">
  <img width="800px" src="https://github.com/CamilleSA/GameOfCybersecurity/blob/main/assets/Username.png" />
</p>

# Quiz
**You can choose the type of quiz :**

**Beginner: your use of the Internet is limited to reading emails, social networks and some research.**

**Advanced : You use the Internet at work, for your administrative procedures, you are subscribed to third party services.**

<p align="center">
  <img width="800px" src="https://github.com/CamilleSA/GameOfCybersecurity/blob/main/assets/ChooseQuiz.png" />
</p>

# Game
**To answer the quiz you have the possibility to swipe right, left, top, bottom or you can press the buttons corresponding to the choices.**

### Buttons
<p align="center">
  <img width="800px" src="https://github.com/CamilleSA/GameOfCybersecurity/blob/main/assets/Game.png" />
</p>

### Swipe
<p align="center">
  <img width="800px" src="https://github.com/CamilleSA/GameOfCybersecurity/blob/main/assets/Swipe.png" />
</p>

# Details Board
**In this table, you can find the questions with the correct detailed answers with your answers.**
<p align="center">
  <img width="800px" src="https://github.com/CamilleSA/GameOfCybersecurity/blob/main/assets/Details.png" />
</p>

# LeaderBoard
**At the end of your game you can see your place in the ranking with your score among the different players depending on the difficulty.**

<p align="center">
  <img width="800px" src="https://github.com/CamilleSA/GameOfCybersecurity/blob/main/assets/LeaderBoard.png" />
</p>

# Technical Part
# Installation / Execution with Docker
<p align="center">
  <img width="200px" src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png"/>
</p>

* **Install Docker**
```sh
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

* **Build the project**
```sh
$ sudo docker-compose build
```

* **Run the project**
```sh
$ sudo docker-compose up
```
> **Navigate in http://localhost:3000/ for client && http://localhost:5000/ for server**

# Installation / Execution ReactJS
<p align="center">
  <img width="200px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
</p>

**Download Packages**

```sh
npm install
```
**Start && Watch**

```sh
npm start
```
>Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

# Web client structure

```
/
├─ public/                       # Public files (HTML, Favicon, .JSON)
├─ src/
     ├─ Components/              # Components
     ├─ Assets/                  # Assets (Logo, Video, Images)
     |
     ├─ Pages/                   # Pages
     │    ├─ Home.js             # Page Home
     │    ├─ ChooseQuiz.js       # Page ChooseQuiz
     │    ├─ QuizMajor.js        # Page QuizMajor
     │    ├─ QuizMinor.js        # Page QuizMinor
     │    ├─ ScoreMajor.js       # Page ScoreMajor
     │    └─ ScoreMinor.js       # Page ScoreMinor
     |
     ├─ App.js                   # Routes of App
     │
     ├─ style/                   # CSS files 
     |
     ├─ Dockerfile
     └─ package.json             # File Package (Dependencies)

```

# Installation / Execution Flask
<p align="center">
  <img width="200px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Python_logo_and_wordmark.svg/2560px-Python_logo_and_wordmark.svg.png" />
</p>

**Download Packages**

```sh
pip install -r requirements.txt
```

**Run Server**

```sh
flask run
```

> **Navigate in http://localhost:5000/**

# Server Routes
* post :
    * add score (``/addScore``) :
        * request :
        ```json
        {
            "username": "username",
            "difficulty": "difficulty",
            "score": "score"
        }
        ```
        * response :
            * 200 : success 
            * 400 : missing arguments
* get :
    * get leaderboard (``/getLeaderboard``) :
        * request :
        ```json
        {
            "difficulty": "difficulty"
        }
        ```
        * response :
            * 400 : missing arguments
            * 200 : success 
            ```json
                [{
                    "username": "username",
                    "score": "score",
                    "date": "date"
                }]
            ```

# UML FrontEnd
<p align="center">
  <img width="800px" src="https://github.com/CamilleSA/GameOfCybersecurity/blob/main/assets/UMLGameCyber.png" />
</p>

# Norme Commit

  ### [ADD] -- if you add files, features, and so on
  ### [FIX] -- if you were working on a bug or any form of default that you corrected 
  ### [DEL] -- if you removed files, features, assets, and so on
  ### [UP] -- if you change something without adding any features or content
