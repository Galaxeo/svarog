# Dailies App

Used as a tool to help me study and retain more information

## Purpose

To incorporate two study tactics (Pomodoro and active recall) into one web app, as well as give access to statistics like what topics were learned in the past and how many hours of studying have been done.

## Todo

### Schedule:
1. [x] Basic login functionality (login through settings)
2. [x] Rest of settings page (login/logout, timer duration)
3. [ ] Adv. timer functionality (skip to next phase, restart current phase, stop, save to backend when completed phase)
4. [ ] Database functionality (loading and saving settings)
...

### Timer
- [x] Basic functionality (start, stop, resume)
- [x] Break implementation (immediately prep short break timer after each phase as well as long timer after every X sessions)
- [ ] Additional functionality (skip to next phase, restart current phase, ...)
- [ ] Different durations for timers (future update: help people increase duration of studying by automatically increasing session/total time)
- [ ] Styling

### Active recall 
After finishing study session, write down short notes about what learned, next couple of sessions can ask questions depending on how long it has been
- [ ] Input after each session is completed
- [ ] Questions asked the next day before starting each study session
- [ ] Amount of questions slowly going away depending on date/accuracy of questions
- [x] Possible GPT implementation to create AI generated questions based on notes

### Front-end
- [ ] Login functionality, send to backend
- [ ] Settings tab (login/logout, timer duration, )
- [ ] Statistics (calendar based, tracking time spent per day, how many sessions, questions/answers, topics learned)

### Backend/DB
- [x] Create DB tables: users, sessions, questions, etc.
- [ ] Answer accuracy for each user related to each session
- [ ] Login functionality
