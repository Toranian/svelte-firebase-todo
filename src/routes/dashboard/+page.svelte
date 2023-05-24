<script>
    import { doc, getDoc, setDoc } from "firebase/firestore";
    import {auth, db} from "../../lib/firebase/firebase";
    import { authHandlers, authStore } from "../../store/store";
    let todoList = [''];
    let currTodo = '';
    let error = false;

    // Subscribe to the store to make sure that we get the current data
    authStore.subscribe(curr => {
        // @ts-ignore
        todoList = curr.data.todos;
        console.log(`Todo list: ${todoList}`)
    })

    /**
     * Add a todo to the list
    */
    function addTodo() {
        let error = false;
        if (!currTodo) {
            error = true;
        }
        todoList = [...todoList, currTodo];
        console.log(todoList);
    }


    /**
     * Edit a todo when pressing a button.
     * @param {number} index
    */
    function editTodo(index) {
        let newTodoList = todoList.filter((val, i) => {
            return i !== index;
        })
        currTodo = todoList[index];
        todoList = newTodoList;
    }

    /**
     * Delete a todo list element 
     * @param {number} index
    */
    function deleteTodo(index) {
        let newTodoList = todoList.filter((val, i) => {
            return i !== index;
        })
        todoList = newTodoList;
    }

    /**
     * Save the todos to Firebase
    */
    async function saveTodos() {
        try {
            
            // @ts-ignore
            const userRef = doc(db, 'users', $authStore.user.uid );
            await setDoc(userRef, 
            {
                todos: todoList,
            },
            {merge: true} 
            )
        } catch (err) {
            console.log("There was an error saving your information.");
        }
    }

    /**
     * Log the current user out
    */
    async function logout() {
        await saveTodos();
        authHandlers.logout();
    }

</script>

<!-- We should only render the page if the user is fully logged in. -->;
{#if !$authStore.loading}
    

<div class='mainContainer'>
    <div style='max-width: 500px'>
        <div>
            <h1 class="text-3xl bold">Todo List</h1>
        </div>

        <!-- Show the todo list -->
        <main>
            {#if todoList.length === 1 && todoList[0] === ''}
                <h1>Add an item!</h1>
                {todoList.filter((val) => {return val == ''})}
            {:else}
                {#each todoList as todo, index }
                    <div class="todo">
                        <p>
                            {index+1}. {todo}
                        </p>
                        <button on:click={() => {editTodo(index)}} >Edit</button>
                        <button on:click={() => {deleteTodo(index)}} class="text-red-500 hover:font-bold duration-150">Delete</button>
                    </div>
                {/each}
            {/if}
        </main>

        <!-- Input for a new todo -->
        <div class="enterTodo">
            <input bind:value={currTodo} type="text" placeholder="Enter todo"/>
            <button on:click={addTodo} class="bg-blue-400 border-b-2 border-white hover:bg-blue-500 duration-200 p-1 px-2 rounded-md">Add</button>
        </div>
        
        <!-- Logout and save functionality -->
        <h1 on:click={() => logout()} on:keydown={() => {}} class="text-red-500">Logout</h1>
        <h1 on:click={() => saveTodos()} on:keydown={() => {}} class="text-green-500">Save</h1>
    </div>
</div>
{/if}

<style>
    .mainContainer {
        display: flex;
        flex-direction: center;
        align-items: left;
        justify-content: center;
        flex: 1;
    }
    .todo {
        border: 2px solid black;
        border-radius: 4px;
        padding: 5px 15px;
        width: 100%;
        margin: 15px 0px;
    }

    input {
        border: 2px solid black;
        color: black;
        border-radius: 4px;
        padding: 5px 15px;
        font-size: 0.9rem;
        transition-duration: 200ms;
    }
</style>