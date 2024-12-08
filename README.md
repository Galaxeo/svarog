# Svarog

Used as a tool to help me study and retain more information

To build: eas build -p ios --profile development-simulator --local

## Purpose

To incorporate two study tactics (Pomodoro and active recall) into one web app, as well as give access to statistics like what topics were learned in the past and how many hours of studying have been done.

## Todo List

### Current Schedule:

**Currently working on active recall basic functionality: Saving questions and answers into DB**
Next up: Basic GPT implementation -> implementation with timer

1. [X] Basic login functionality (login through settings)
2. [X] Timer functionality (start, stop, resume)
3. [ ] Active recall basic functionality

### Timer

Basic Functionality:
- [X] Start, stop, resume
- [X] Break implementation (immediately prep short break timer after each phase as well as long timer after every X sessions)
- [ ] Active recall implementation (see active recall section)

Extra Features
- [ ] Additional functionality (skip to next phase, restart current phase, swipe controls(?), ...)
- [ ] Different durations for timers (future update: help people increase duration of studying by automatically increasing session/total time)
- [ ] Styling

### Active recall

After finishing study session, write down short notes about what learned, next couple of sessions can ask questions depending on how long it has been

Basic Functionality:
- [X] Input after each session is completed
- [ ] Saving questions and answers into DB 
- [ ] GPT implementation to generate study questions
- [ ] Implementation with timer (input form appears after completed sessions, questions asked after new sessions are started based on time/answer correctness)

Extra Features:
- [ ] Amount of questions slowly going away depending on date/accuracy of questions
- [ ] Styling

### Backend/DB

- [x] Create DB tables: users, sessions, questions, etc.
- [ ] Answer accuracy for each user related to each session
- [ ] Login functionality

### Other Extras 
- [ ] Statistics tab: how many hours studied, what topics learned, etc.

### Design Decisions

- Consider renaming sessions: is there a better name to not confuse overall study session vs individual pomodoros?
- How do we want to categorize sessions that last past midnight? Likely categorize on the day that started
