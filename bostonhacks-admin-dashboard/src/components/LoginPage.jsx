export default function LoginPage () {
    return (
        <div>
            <center><p>Welcome to BostonHacks!</p></center>
            <label for="user">Username:</label>
            <input type="text" id="user" name="user"></input>
            <label for="pass">Password:</label>
            <input type="text" id="pass" name="pass"></input><br></br>
            <center><button class="button"> Login </button></center>      
        </div>
    )
}

