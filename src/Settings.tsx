import useState from 'react';
import LoginForm from './components/LoginForm';
import { Button } from './components/ui/button';
function Settings() {
  return (
    <>
      <div className='settings blurBackground'>
        <h1 className='header'>Settings</h1>
        <input type="Email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <Button>Login</Button>
      </div>
    </>
  )
}
export default Settings;
