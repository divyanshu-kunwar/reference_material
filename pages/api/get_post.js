import { getDatabase, ref, set , get } from "firebase/database";
import { initializeFire } from "./initialize_fire";


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