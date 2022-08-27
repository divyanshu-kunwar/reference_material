import Image from "next/image";
import style from "./home.module.css";

import googleLogo from "../images/google_sign_in.svg";
import logo from "../images/logo.svg";

export default function Home() {
    
  return (
   <div className={style.loginPage}>
      
      <Image className={style.logo} src={logo} alt="Logo"/>
      <Image className={style.google}  src={googleLogo} alt="Google"/>

      <div className={style.bottom_bar}>
        <span>To see a full list of all the registered institutes listed </span>
        <span className={style.bottom_link}> click here.</span>
      </div>
   </div>
  )
}
