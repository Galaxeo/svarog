import { createClient } from "@supabase/supabase-js";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import key from "../key.json"
const supabase = createClient(key.supabaseUrl, key.supabaseKey)

function LoginForm() {
    // want to login with google
    // const login = async (email, password) => {
    //     const { user, session, error } = await supabase.auth.signIn({
    //         provider: 'google'
    //     })
    //     if (error) {
    //         console.log(error)
    //     }
    // }
    
    return (
        <div className="loginForm blurBackground">
            <input type="Email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <Button>Login</Button>
        </div>
    )
}
export default LoginForm;