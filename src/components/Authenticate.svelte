<script>
    import { authHandlers } from "../store/store";

    let email = '';
    let password = '';
    let confirmPass = '';
    let error = false;
    let register = false;
    let authenticating = false;

    /**
     * Create a user account or log in a user.
    */
    async function handleAuthenticate() {

        // If we are already trying to authenticate the user, we shouldn't be trying to 
        // do it twice.
        if (authenticating) {
            return;
        }

        if (!email || !password || (register && !confirmPass)) {
            error = true;
            return;
        }
        
        authenticating = true;
        
        // Try to create/signup the account
        try {
            if (!register) {
                authHandlers.login(email, password);
            } else {
                await authHandlers.signup(email, password);
            }
        } catch (err) {
            console.log("There was an auth error")
            error = true;
        }
        
    }

    /**
     * Toggle the register value
    */
    function handleRegister() {
        register = !register;
    }
</script>



<div class="authContainer">
    <form action="">
        <h1 class="text-3xl bold">{register ? "Register" : "Login"}</h1>

        <!-- Determine if passwords match -->
        {#if register && confirmPass !== password}
            <p>Passwords do not match.</p>
        {/if}


        {#if error}
            <p class="error">The information you have entered is incorrect.</p>
        {/if}


        <!-- Email and password input forms -->
        <label>
            <input bind:value={email} type="email" placeholder="Email">
        </label>
        <label>
            <input bind:value={password} type="password" placeholder="Password">
        </label>

        <!-- Verify the user's password if they are creating an account -->
        {#if register}
            <label>
                <input bind:value={confirmPass} type="password" placeholder="Confirm Password">
            </label>
        {/if}

        <!-- Submit button -->
        <button type="submit" on:click={handleAuthenticate}>
            {#if authenticating}
            Loading...
            {:else}
            Submit 
            {/if}
        </button>
    </form>
    
    <!-- Optionally allow the user to register if they don't have an account yet. -->
    <div>
        <p>Or</p>
        {#if register}
            <div>
                <p on:click={handleRegister} on:keydown={() => {}} >Login</p>
            </div>
        {:else}        
            <div>
                <p on:click={handleRegister} on:keydown={() => {}}>Register</p>
            </div>
        {/if}
        
    </div>
</div>

<style>
    .authContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    form input {
        border: 2px solid black;
        border-radius: 4px;
        padding: 5px 15px;
        width: 100%;
    }

    form button {
        border: 2px solid black;
        color: black;
        border-radius: 4px;
        padding: 5px 15px;
        font-size: 0.9rem;
        transition-duration: 200ms;
    }
    form button:hover {
        background-color: black;
        color: white;
        font-weight: medium;
    }
</style>