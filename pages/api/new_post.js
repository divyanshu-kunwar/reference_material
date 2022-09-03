// firebase admin
import { getDatabase, ref, set , get } from "firebase/database";
import { initializeFire } from "./initialize_fire";


export default function uploadData(req, res) {
    initializeFire();
    let data ={
        title : req.body.title,
        content : req.body.description,
        author : req.body.author,
        author_email : req.body.author_email,
        file_urls : req.body.files
    }

    let institute = req.body.institute;
    let programme = req.body.programme;
    programme = programme.replace(/\s+/g, '_').replace(/\//g, '_').replace(/\./g, '');
    let semester = req.body.semester;
    semester = semester.replace(/\s+/g, '_').replace(/\//g, '_').replace(/\./g, '');
    let subject = req.body.subject;
    subject = subject.replace(/\s+/g, '_').replace(/\//g, '_').replace(/\./g, '');

    let postNo = 0;

    const database = getDatabase();

    get(ref(database , `/postData/${institute}/${programme}/${semester}/${subject}/`)).then((snapshot) => {
        if(snapshot.val()){
            postNo = Object.keys(snapshot.val()).length;
        }
        
        set(ref(database , `/postData/${institute}/${programme}/${semester}/${subject}/${postNo}/`), data).then(() => {
            res.status(200).json("success");
        }).catch((error) => {
            res.status(500).json(error);
        });

    }).catch((error) => {
        res.status(500).json(error);
    })
}