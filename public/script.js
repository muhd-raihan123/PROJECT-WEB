import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { app } from './firebaseauth.js';

const db = getFirestore(app);

const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})

// Event creation
      document.addEventListener('DOMContentLoaded', function() {
        const eventForm = document.getElementById("eventForm");
        if (eventForm) {
          eventForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const title = document.getElementById("eventTitle").value;
            const description = document.getElementById("eventDesc").value;
            const slot1 = document.getElementById("slot1").value;
            const slot2 = document.getElementById("slot2").value;
            const slot3 = document.getElementById("slot3").value;

            if (!title || !description || !slot1) {
              alert("Please fill in event title, description, and at least the first slot.");
              return;
            }

            try {
              await addDoc(collection(db, "events"), {
                title,
                description,
                slots: [slot1, slot2, slot3].filter(Boolean),
                votes: [0, 0, 0]
              });
              alert("Event created successfully!");
              document.getElementById("eventForm").reset();
            } catch (err) {
              alert("Failed to create event: " + err.message);
            }
          });
        }
      });