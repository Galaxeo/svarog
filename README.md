# Svarog

Used as a tool to help me study and retain more information

To build: eas build -p ios --profile development-simulator --local

## How to use:

Currently there is no onboarding, however the app is currently split into its core components as the integration of them all is still in development. You can choose to use the Pomodoro timer and change the duration of breaks and study durations as you please (dynamic duration WIP). After you finish studying, you can press the square "Stop" button, which will prompt a screen that allows you to copy paste your notes (physical notes to be implemented at a later date) and active recall questions will be generated to quiz you in a future date. On the bottom right with the clipboard button is an inbox of all of the active recall questions that are "due", which you can choose to answer. These questions are then graded, and based on your correctness and comfort, the question will be rescheduled to recalled at a later date.

## Purpose

To incorporate two study tactics (Pomodoro and active recall) into one web app, as well as give access to statistics like what topics were learned in the past and how many hours of studying have been done.

## Todo List
- Group questions together based off topic and how relevant these questions are to each other (tags (many - to - many)), think about reworking notes input
- Free timer
- Dynamic durations for pomodoro
- Statistics tab
- UI/UX Cleanup
- Notes processing and review question quality for math/repeated questions(?)

### Timer

Basic Functionality:
- [X] Start, stop, resume
- [X] Break implementation (immediately prep short break timer after each phase as well as long timer after every X sessions)

Extra Features
- [ ] Additional functionality (skip to next phase, restart current phase, swipe controls(?), ...)
- [ ] Different durations for timers (future update: help people increase duration of studying by automatically increasing session/total time)
- [ ] Styling

### Active recall

After finishing study session, write down short notes about what learned, next couple of sessions can ask questions depending on how long it has been

Basic Functionality:
- [X] Input after each session is completed
- [X] Saving questions and answers into DB 
- [X] GPT implementation to generate study questions
- [X] Implementation with timer (input form appears after completed sessions, questions asked after new sessions are started based on time/answer correctness)

Extra Features:
- [X] Amount of questions slowly going away depending on date/accuracy of questions
- [ ] Styling
- [ ] Allow people to enter their own custom questions
- [ ] Separate questions based on topic, + additional submissions per session

### Backend/DB

- [x] Create DB tables: users, sessions, questions, etc.
- [X] Answer accuracy for each user related to each session
- [X] Login functionality

### Other Extras 
- [ ] Statistics tab: how many hours studied, what topics learned, etc.
- [X] Zen mode: currently hides seconds, think about hiding timer
- [ ] Change of background during breaks(?)
- [ ] Freestyle: no pomodoro, just a stopwatch that keeps track of how long studying. Can also add easy toggle for breaks.
