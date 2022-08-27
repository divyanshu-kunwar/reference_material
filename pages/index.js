import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


import Image from "next/image";
import style from "./home.module.css";

import googleLogo from "../images/google_sign_in.svg";
import logo from "../images/logo.svg";

export default function Home() {
  return (
    <div className={style.loginPage}>
      
      <Image className={style.logo} src={logo} alt="Logo"/>
     {initializeFire()}
      <Image className={style.google}  src={googleLogo} alt="Google"
      onClick={googleAuth}
      />

      <div className={style.bottom_bar}>
        <span>To see a full list of all the registered institutes listed </span>
        <span className={style.bottom_link}> click here.</span>
      </div>
   </div>
  )
}

function initializeFire(){
const firebaseConfig = {
  apiKey: "AIzaSyDUL4AJNEmD3wCo1dfxJXxpV_aVomUyfI8",
  authDomain: "reference-material-1b31c.firebaseapp.com",
  projectId: "reference-material-1b31c",
  storageBucket: "reference-material-1b31c.appspot.com",
  messagingSenderId: "379322752873",
  appId: "1:379322752873:web:dbcc2d7e1c52f34ddb67f8",
  measurementId: "G-406G8RFC9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
}

let user = {};
let signedIn = false;

function googleAuth(){
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
  .then((result) => {

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    user = result.user;
    console.log("user name" , user.displayName , " user email " , user.email , " user photo " , user.photoURL);
    signedIn = true;

  }).catch((error) => {
    const errorMessage = error.message;
    window.alert("OOPs! some error occured : " + errorMessage);
  })
  .finally(() => {
    if(signedIn){
    if(user.email.split("@")[1] !== "tezu.ac.in" && user.email){
      window.alert("Please "+ user.displayName + " login with a Tezu email");
    }else{
      localStorage.setItem("OR_user", JSON.stringify({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      }));
    }
  }
  })

}