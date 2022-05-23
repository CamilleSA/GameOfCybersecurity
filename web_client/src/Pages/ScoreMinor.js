import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap'; 

const ScoreMinor = () => {
    const [score, setScore] = useState([]);
    const username = sessionStorage.getItem('username');

    useEffect( () => {
        const myHeaders = new Headers();
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Content-Type", "application/json; charset=UTF-8");
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch(`http://localhost:5000/getLeaderboard?difficulty=0`, requestOptions)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setScore(response);
        }).catch (function(error) {
            console.log(error);
        })
    }, [])
    
    return (
        <div>
            <div className="">
                <img src={require("../Assets/logo.png")} style={{width:'20%'}} alt="Logo"/>
            </div>
            <div style={{marginTop: '5%'}}>
            <h1>Beginner Leaderboard</h1><br/>
            <div style={{padding: '5px 45px 15px 45px'}}>
                <Table striped bordered hover style={{border: '2px solid #01d976', color: 'white', boxShadow: '0px 0px 20px 0px rgba(1,217,118, 0.8)'}}>
                <thead style={{border: '2px solid #01d976'}}>
                  <tr style={{border: '2px solid #01d976'}}>
                  <th style={{border: '2px solid #01d976'}} width='10%'>Place</th>
                    <th style={{border: '2px solid #01d976'}} width='20%'>Username</th>
                    <th style={{border: '2px solid #01d976'}} width='10%'>Difficulty</th>
                    <th style={{border: '2px solid #01d976'}} width='10%'>Score</th>
                    <th style={{border: '2px solid #01d976'}} width='10%'>Date</th>
                    
                  </tr>
                </thead>
                <tbody style={{border: '2px solid #01d976'}}>
                { score
                .sort((a, b) => {
                  return b.score - a.score;
                })
                .map((scores, index) => (
                  <tr  key={index} style={{border: '2px solid #01d976', color: 'white'}}>
                    <td style={{border: '2px solid #01d976', color: (username === scores.username ? '#01d976' : 'white'), backgroundColor: (index ? "" : "red"), fontWeight: (username === scores.username ? "bold" : "")}}>{index ? index : "Winner"}</td>
                    <td style={{border: '2px solid #01d976', color: (username === scores.username ? '#01d976' : 'white'), backgroundColor: (index ? "" : "red"), fontWeight: (username === scores.username ? "bold" : "")}}>{scores.username}</td>
                    <td style={{border: '2px solid #01d976', color: (username === scores.username ? '#01d976' : 'white'), backgroundColor: (index ? "" : "red"), fontWeight: (username === scores.username ? "bold" : "")}}>{scores.score ? "Beginner Quiz" : "Advanced Quiz"}</td>
                    <td style={{border: '2px solid #01d976', color: (username === scores.username ? '#01d976' : 'white'), backgroundColor: (index ? "" : "red"), fontWeight: (username === scores.username ? "bold" : "")}}>{scores.score}</td>
                    <td style={{border: '2px solid #01d976', color: (username === scores.username ? '#01d976' : 'white'), backgroundColor: (index ? "" : "red"), fontWeight: (username === scores.username ? "bold" : "")}}>{scores.date}</td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Button href='/choose-quiz' style={{backgroundColor: '#01d976', borderColor: '#01d976', fontWeight: 'bold'}} className='rounded-pill col-md-2 button-user'>Play Again</Button><br/><br/>
            </div>

        </div>
    );
};

export default ScoreMinor;