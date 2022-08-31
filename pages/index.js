import { initialize_fire } from "./_initialize_fire";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


import Image from "next/image";
import style from "./home.module.css";

import googleLogo from "../images/google_sign_in.svg";
import logo from "../images/logo.svg";

export default function Home() {
  {initialize_fire()}
  return (
    <div className={style.loginPage}>
      
      <Image className={style.logo} src={logo} alt="Logo"/>
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
      localStorage.setItem("OR_name", user.displayName);
      localStorage.setItem("OR_email", user.email);
      localStorage.setItem("OR_photo", user.photoURL);
      localStorage.setItem("OR_institute", user.email.split("@")[1].replace(/\./g, '_').replace(/\s+/g, '_'));
    }

    // send to dashboard
    window.location.href = "/dashboard";

    }
  })

}