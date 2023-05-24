<script>
// @ts-nocheck

  import "../app.css";
  import {onMount} from 'svelte';
  import {auth, db} from '../lib/firebase/firebase';
  import {getDoc, doc, setDoc} from 'firebase/firestore';
  import {authStore} from '../store/store';

  // These routes are the only ones that do not require the user to be logged in.
  const nonAuthRoutes = ['/', 'product']

  // On every page load, we should be checking to see what the user data is. If it doesn't exist,
  // we should create it.
  onMount(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      const currentPath = window.location.pathname;

      // Protects paths from being accessed by non logged in users
      if (!user && !nonAuthRoutes.includes(currentPath)) {
        window.location.href = "/";
        return;
      }

      // If the user is logged in, show them the dashboard
      if (user && currentPath === '/') {
        window.location.href = '/dashboard';
        return;
      }

      // If the user is not logged in, then we should skip the rest of the code
      if (!user) {
        return;
      }

      // Define the document and the current state of the document
      let dataToSetToStore;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // If we don't have information on the user, save the current information
      if (!docSnap.exists()) {
        const userRef = doc(db, 'users', user.uid);
        dataToSetToStore = {
            email: user.email,
            todos: []
        }
        await setDoc(
          userRef, dataToSetToStore, {merge: true}
        ) 
      }

      // Document does exist, so set the current users information to the stored data
      else {
        const userData = docSnap.data();
        dataToSetToStore = userData;
      }

      // Update the user data
      authStore.update(curr => {
        return {
          ...curr, // Keep extra data just to be safe
          user,
          data: dataToSetToStore,
          loading: false
        }
      })
      
    })
  })

</script>

<div>
  <slot />
</div>
