# Dailies App

Used as a tool to help me study and retain more information

## Purpose

To incorporate two study tactics (Pomodoro and active recall) into one web app, as well as give access to statistics like what topics were learned in the past and how many hours of studying have been done.

## Todo

### Timer
- [x] Basic functionality (start, stop, resume)
- [ ] Break implementation (immediately prep short break timer after each session as well as long timer after every X sessions)
- [ ] Different durations for timers

### Active recall 
After finishing session, write down short notes about what learned, next couple of sessions can ask questions depending on how long it has been
- [ ] Input after each session is completed
- [ ] Questions asked the next day before starting each study session
- [ ] Amount of questions slowly going away depending on date/accuracy of questions
- [ ] Possible GPT implementation to create AI generated questions based on notes

### DB
- [ ] Store information regarding each session (overall studying time, notes, questions)
- [ ] Answer accuracy for each user related to each session
- [ ] Login functionality (through google or github?)
