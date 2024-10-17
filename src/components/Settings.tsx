import { useState } from 'react';
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from './ui/button';
// import { Input } from './ui/input';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { createClient } from '@supabase/supabase-js';
import { Slider } from './ui/slider';
import key from '../key.json';

const supabase = createClient(key.supabaseUrl, key.supabaseKey);

function LoginForm({ setSession }: { setSession: (session: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    console.log('login');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('error', error);
    } else {
      setSession(data.session);
    }
  }

  return (
    <>
      <input className='loginInput' type="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className='loginInput' type="Password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </>
  )
}

interface SettingsProps {
  session: any;
  setSession: (session: any) => void;
  setSettings: (settings: boolean) => void;
  duration: number;
  setDuration: (duration: number) => void;
  shortBreak: number;
  setShort: (breakTime: number) => void;
  longBreak: number;
  setLong: (breakTime: number) => void;
  shortToLong: number;
  setShortToLong: (shortToLong: number) => void;
}
function Settings({ session, setSession, setSettings, duration, setDuration, shortBreak, setShort, longBreak, setLong, shortToLong, setShortToLong }: SettingsProps) {
  function handleShortToLong(e: any) {
    // TODO: possibly think about limiting the number of breaks, max 6-8, min 1?
    const re = /^[0-9\b]+$/;
    if (re.test(e.target.value) || e.target.value === '') {
      setShortToLong(parseInt(e.target.value));
    } else {
      // leave it as is
      // TODO: Test this, does this still work when a letter is entered?
      toast("Please enter a number", {
        duration: 5000,
      });
    }
  }
  return (
    <>
      <div className='settings blurBackground'>
        <h1 className='header'>Settings</h1>
        {/* TODO: Style sliders and headers */}
        <div className='sliderCont'>
          <div>
            <h2>Study Duration: {duration}</h2>
            <Slider min={10} max={60} defaultValue={[duration]} step={5} onValueChange={(value) => setDuration(value[0])} />
          </div>
          <div>
            <h2>Short Break Duration: {shortBreak}</h2>
            <Slider min={5} max={60} defaultValue={[shortBreak]} step={5} onValueChange={(value) => setShort(value[0])} />
          </div>
          <div>
            <h2>Long Break Duration: {longBreak}</h2>
            <Slider min={10} max={60} defaultValue={[longBreak]} step={5} onValueChange={(value) => setLong(value[0])} />
          </div>
          <div>
            <h2>How many breaks before long break?</h2>
            <input className='shortLongInput' type="number" value={shortToLong} defaultValue={shortToLong} onChange={(e) => handleShortToLong(e)} />
          </div>
        </div>
        <div className='loginCont'>
          {session ? (
            <>
              <h2>Logged in as {session.user.email}</h2>
              <Button className='signOutButton' variant="destructive" onClick={() => { supabase.auth.signOut() }}>Sign Out</Button>
            </>
          ) : (
            <LoginForm setSession={setSession} />
          )}
        </div>
        {/* TODO: Think about how to handle shortLongChange when it is 0. If blank, reset to previous? Maybe have a save button */}
        <Button className="closeSettings" onClick={() => { setSettings(false) }}>
          <FontAwesomeIcon icon={faX} onClick={() => { setSettings(false) }} />
        </Button>
      </div>
    </>
  )
}
export default Settings;
