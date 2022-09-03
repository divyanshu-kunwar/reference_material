import { getDatabase, ref, set , get } from "firebase/database";
import { initializeFire } from "./initialize_fire";


let institute_data = {};

export default function send_cat_data(req, res) {
    
    initializeFire();
    let institute = req.body.institute;
    const database = getDatabase();

    get(ref(database , `/insti_data/${institute}/`)).then((snapshot) => {
        if(snapshot.val()){
           
                    institute_data = snapshot.exportVal();
                    res.status(200).json(institute_data);
        }else{
            res.status(200).json("no data");
        }
    })

}