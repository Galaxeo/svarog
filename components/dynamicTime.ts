export default function dynamicTimeSetter({
  setDynamic,
  currentDuration,
  setCurrentDuration,
  setShort,
  goal,
  comfort,
}: any) {

  // set a goal, after you set that goal, ask how it went. slowly bump up 5 minutes until goal is reached, use 25/5 as a baseline for how much break to give.
  // Long breaks should be set by the user, default 20-25 is enough. We can create presets for pomodoro timer later for people who don't know what to use.
  if (currentDuration >= goal) {
    setDynamic(false);
    return;
  }
  comfort == "easy" ? setCurrentDuration(currentDuration + 10) : comfort == "medium" ? setCurrentDuration(currentDuration + 5) : null;
  const shortBreak = Math.ceil(currentDuration / 5);
  setShort(shortBreak);
}
