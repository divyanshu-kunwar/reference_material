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



let institute_data = {};

export default function send_cat_data(req, res) {
    initializeFire();
    let institute = req.body.institute;
    const database = getDatabase();

    get(ref(database , `/insti_data/${institute}/`)).then((snapshot) => {
        if(snapshot.val()){
           
                    institute_data = snapshot.exportVal();
                    console.log(institute_data);
                    res.status(200).json(institute_data);
        }else{
            res.status(200).json("no data");
        }
    })


}