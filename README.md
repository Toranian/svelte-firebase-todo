# Todo List Application in Svelte + Firebase
A simple Svelte application to get used to Firebase. Hoping to use more of both in the future for personal projects.

## About
I put this together on a weekend, and I put the focus into Svelte and Firebase, thus leaving much to be desired for the visuals. Here's what the application looks like:

### Login / Register
![image](https://github.com/Toranian/svelte-firebase-todo/assets/29820369/d9a60a31-6b0a-4648-82ce-2cf98df2c68b)

The login page also doubles as the register page using some sneaky boolean logic, reducing the amount of code that needed to be written. See `src/compoonents/Authenticate.svelte` for more details!

### Dashboard
![image](https://github.com/Toranian/svelte-firebase-todo/assets/29820369/aae36609-13ee-41e9-ba17-1ab7152ddde2)

The dashboard shows the todo list items that the user can create, update, or delete. The page also persists the user data by saving to Firebase. 
The user can also save before they exit, but I've programmed it such that it saves before logging the user out.



## Getting Started
First, clone or download the repository using the big green button in the upper right of the screen.

Open a terminal in the newly created directory, and type `npm install` to install all the necessary dependencies.

Next, type `npm run dev` and open the suggested url in the terminal. 

## Connecting to Firebase
Open a new project on Firebase, and create a new web based instance. Copy the values into the .env file in order to use Firebase effectively.



## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

