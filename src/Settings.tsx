import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from './components/ui/button';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { createClient } from '@supabase/supabase-js';
import key from './key.json';

const supabase = createClient(key.supabaseUrl, key.supabaseKey);

function LoginForm({setSession} : {setSession: (session: any) => void}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    console.log('login');
    const { data, error } = await supabase.auth.signInWithPassword({email,password});

    if (error) {
      console.error('error', error);
    } else {
      setSession(data.session);
    }
  }

  return (
    <>
      <input type="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="Password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </>
  )
}
function Settings({setSession , session, setSettings} : {setSession: (session: any) => void, session: any, setSettings : (settings: boolean) => void}) {
  return (
    <>
      <div className='settings blurBackground'>
        <h1 className='header'>Settings</h1>
        {session ? (
          <>
            <h2>Logged in as {session.user.email}</h2>
            <Button className='signOutButton' variant="destructive" onClick={() => {supabase.auth.signOut()}}>Sign Out</Button>
          </>
        ) : (
          <LoginForm setSession={setSession} />
        )}
        <Button className="closeSettings" onClick={() => {setSettings(false)}}>
          <FontAwesomeIcon icon={faX} onClick={() => {setSettings(false)}}/>
        </Button>
      </div>
    </>
  )
}
export default Settings;
