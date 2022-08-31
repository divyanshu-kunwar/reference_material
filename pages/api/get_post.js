import { getDatabase, ref, set , get } from "firebase/database";
import { initializeApp } from "firebase/app";

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


export default function sendPost(req, res) {
  console.log("1");
  
  initializeFire();
  const database = getDatabase();
  let postData;



  get(ref(database , `/postData/${req.body.ref}`)).then((snapshot) => {
      if(snapshot.val()){
          postData = snapshot.exportVal();
          console.log(postData);
          res.status(200).json(postData);
      }else{
          res.status(500).json("no data");
      }
  }).catch((error) => {
    console.log(error);
    res.status(500).json("No data");
  })
  return ;
}