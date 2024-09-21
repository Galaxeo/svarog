import useState from 'react';
import LoginForm from './components/LoginForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from './components/ui/button';
import { faX } from '@fortawesome/free-solid-svg-icons';
function Settings() {
  return (
    <>
      <div className='settings blurBackground'>
        <h1 className='header'>Settings</h1>
        <LoginForm />
        <FontAwesomeIcon className='closeSettings' icon={faX} />
      </div>
    </>
  )
}
export default Settings;
