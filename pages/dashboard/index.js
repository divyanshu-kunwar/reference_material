import Image from "next/image";
import { useEffect, useState } from "react";

import logo from "../../images/logo.svg";
import style from "./dashboard.module.css";
import arrowIcon from "../../images/drop.svg";
import filterIcon from "../../images/filter.svg";
import closeIcon from "../../images/close.svg";

// storage reference
import { getStorage ,ref , uploadBytes  } from "firebase/storage";
import { initialize_fire } from "../_initialize_fire.js";
import Posts from "./Posts";

let sem = ["1st Semester", "2nd Semester",
"3rd Semester", "4th Semester","5th Semester","6th Semester",
"7th Semester","8th Semester","9th Semester","10th Semester",
"11th Semester","12th Semester","13th Semester","14th Semester",
"15th Semester","16th Semester",
];

let institute_data = {};

const semData = {
  options: [
    "1st Semester",
  ],
  selected: 0,
  title: "Select Semester",
};

const BranchData = {
  options: [
    "B.Tech. CSE",
  ],
  selected: 0,
  title: "Select Programme",
};

const subData = {
  options: ["CH103"],
  selected: 0,
  title: "Select Subject",
};

const sortData = {
  options: ["Title", "Date"],
  selected: 0,
  title: "Sort By",
};

let postData = {
  1: {
    title: "Pls Select Branch And Subjects to get started",
    description:
    "Default Description",
    author: "Welcome",
    author_email: "We are pleased to see you here",
    file_urls:{}
  },
  
};

let institute;
let author ;
let author_email;
let app;

export default function Dashboard() {
  const [activetab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [files , setFiles] = useState([]);
  const [selectedData, setSelectedData] = useState(semData);
  
  const [postState , setPostState] = useState(postData);
  
  useEffect(() => {
    fetchAllData()
    fetchPost(setPostState)
    app =  initialize_fire();
   } , []
  ) 

  return (

    // -----------------dashboard -------------------------
    <div className={style.dashboardPage}>

      {/* ----------------------------- Logo And Navbar ------------------- */}
      <Image src={logo} alt="logo" className={style.logo} />
      <div className={style.navbar}>
        <span
          className={activetab == 0 ? style.selectedTab : ""}
          onClick={() => setActiveTab(0)}
          >
          Explore
        </span>
        <span
          className={activetab == 1 ? style.selectedTab : ""}
          onClick={() => setActiveTab(1)}
        >
          Upload
        </span>
        <span
          className={activetab == 2 ? style.selectedTab : ""}
          onClick={() => setActiveTab(2)}
        >
          Community
        </span>
      </div>

      {/* ----------------------------- Filter Bar ------------------- */}
      <div
        className={style.filterBar}
        style={
          activetab == 0 || activetab == 1
            ? { display: "flex" }
            : { display: "none" }
        }
      >
        <div
          className={style.filterTabs}
          onClick={() => {
            setModalOpen(true);
            setSelectedData(BranchData);
          }}
        >
          <Image src={arrowIcon} alt="arrowIcon" />
          <span>{BranchData.options[BranchData.selected]}</span>
        </div>

        <div
          className={style.filterTabs}
          onClick={() => {
            setModalOpen(true);
            setSelectedData(semData);
          }}
        >
          <Image src={arrowIcon} alt="arrowIcon" />
          <span>{semData.options[semData.selected]}</span>
        </div>

        <div
          className={style.filterTabs}
          onClick={() => {
            setModalOpen(true);
            setSelectedData(subData);
          }}
        >
          <Image src={arrowIcon} alt="arrowIcon" />
          <span>{subData.options[subData.selected]}</span>
        </div>

        <div
          className={style.filterTabs}
          style={activetab == 0 ? { display: "flex" } : { display: "none" }}
          onClick={() => {
            setModalOpen(true);
            setSelectedData(sortData);
          }}
        >
          <Image src={filterIcon} alt="arrowIcon" />
          <span>Sort By {sortData.options[sortData.selected]}</span>
        </div>
      </div>

      {/* ----------------------------- Posts ------------------- */}
      <div
        className={style.contentGrid}
        style={activetab == 0 ? { display: "flex" } : { display: "none" }}
      >
        {Object.keys(postState).map((key) => {
          return <Posts key={key} data={postState[key]} app={app} />;
        })}
      </div>

      {/* ----------------------------- Upload ------------------- */}
      <div
        className={style.uploadSection}
        style={activetab == 1 ? { display: "flex" } : { display: "none" }}
      >
        <div className={style.inputContainer}>
          <label>Title</label>
          <input
            name="Title"
            id="form_title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className={style.inputContainer}>
          <label>Description</label>
          <textarea
            className={style.textbox}
            name="abc"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }
            }
          />
        </div>

        <div className={style.inputContainer}>
          {/* <label>Files</label> */}
          {/* pdf .txt and image input */}
          <input name="file_" id="form_upload" type="file" accept="image/*, application/pdf , text/plain"
           multiple  onChange={
            (e) => {
              // get length of files
              let files = e.target.files;
              let filesArr = [];
              for (let i = 0; i < files.length; i++) {
                filesArr.push(files[i]);
              }
              setFiles(filesArr);
              console.log(files);
              if(filesArr.length > 2){
                window.alert("You can upload max 2 files in one post");
                //clear input
                document.getElementById("form_upload").value = "";
              }
            }
          }/>
        </div>
      </div>
      <div
        className={style.btn_container}
        style={activetab == 1 ? { display: "flex" } : { display: "none" }}
      >
        <div className={style.form_btn}
        onClick={() => {
          uploadData(title , description , files , author , BranchData.options[BranchData.selected] 
            , semData.options[semData.selected] , subData.options[subData.selected]);
        }}
        >
          Submit
        </div>
      </div>

      {/* ----------------------------- Community ------------------- */}
      <div
        className={style.community}
        style={activetab == 2 ? { display: "flex" } : { display: "none" }}
      >
        This feature is under build ...
      </div>


      {/* ................................ selection modal box ....................................... */}
      {modalOpen && <ModalBox data={selectedData} closeModal={setModalOpen} setPostState={setPostState}/>}

    </div>
  
  );
}


function ModalBox(props) {
  return (
    <div className={style.selectionbox}>
      <div className={style.innerBox}>
        <div className={style.topBar}>
          <div className={style.selectionHeader}>{props.data.title}</div>
          <Image
            className={style.boxCloseBtn}
            src={closeIcon}
            alt="close"
            onClick={() => {
              props.closeModal();
            }}
          />
        </div>

        <div className={style.selectionContent}>
          {props.data.options.map((item, index) => {
            return (
              <div
                className={style.selectionItem}
                key={index}
                onClick={() => {
                  props.data.selected = index;
                  if(props.data.title == "Select Programme"){
                    setSemData(props.data);
                  }else if(props.data.title == "Select Semester"){
                    setSubData(props.data);
                  }else if(props.data.title == "Select Subject"){
                  }
                  fetchPost(props.setPostState);
                  props.closeModal();
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function uploadData(title , description , files , author , programme , semester , subject) {

  institute = localStorage.getItem("OR_institute");
  author = localStorage.getItem("OR_name");
  author_email = localStorage.getItem("OR_email");

       let app = initialize_fire();

      uploadFiles(app,  programme , semester, subject, files).then((url)=>{
      console.log(url);

        fetch("/api/new_post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
      
      
          body: JSON.stringify({
            title: title,
            description: description,
            author: author,
            author_email: author_email,
            programme: programme,
            semester: semester,
            subject: subject,
            files: url,
            institute: institute
          }),
        }).then((res) => {
          console.log(res.json().then((data) => {
            console.log(data);
          }
          ));
        }).catch((err) => {
          console.log(err);
        })
      })

}
    
async function uploadFiles(app, programme , semester , subject , file) {
  const storage = getStorage(app);
  // replace spacial character with underscore
  programme = programme.replace(/\s/g, "");
  //replace . with _
  programme = programme.replace(/\./g, "_");
  semester = semester.replace(/\s/g, "");
  semester = semester.replace(/\./g, "_");
  subject = subject.replace(/\s/g, "");
  subject = subject.replace(/\./g, "_");

  let file_urls = [];
  for (let i=0; i<file.length; i++){
        const reference = ref(storage , `${institute}/${programme}/${semester}/${new Date().getTime().toString()}/`);
        await uploadBytes(reference , file[i]).then((uploadres) => {
           file_urls.push(uploadres.metadata.fullPath);
        })
      }
   return file_urls;
        
}

function fetchPost(setPostState){

  institute = localStorage.getItem("OR_institute");
  author = localStorage.getItem("OR_name");
  author_email = localStorage.getItem("OR_email");

  let branch_ = BranchData.options[BranchData.selected]
  branch_ = branch_.replace(/\s+/g, '_').replace(/\//g, '_').replace(/\./g, '');
  let semester_ = semData.options[semData.selected]
  semester_ = semester_.replace(/\s+/g, '_').replace(/\//g, '_').replace(/\./g, '');
  let subject_ = subData.options[subData.selected]
  subject_ = subject_.replace(/\s+/g, '_').replace(/\//g, '_').replace(/\./g, '');
  let ref =  `${institute}/${branch_}/${semester_}/${subject_}/`;

  console.log(ref);

  fetch("/api/get_post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ref : ref
    }),
  }).then((res) => {
  res.json().then((data) => {
    if(data != "no data"){
      postData = data;
      setPostState(postData);
    }
    }
    );
  }).catch((err) => {
    console.log(err);
  }
  );
 
}

function fetchAllData(){

  institute = localStorage.getItem("OR_institute");
  author = localStorage.getItem("OR_name");
  author_email = localStorage.getItem("OR_email");


  fetch('api/get_catdata' , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      institute: institute
    })
  }).then((res) => {
    res.json().then((data) => {
      institute_data = data;
      initializeData();
    })
  }).catch((err) => {
    console.log(err);
  })

}

function initializeData(){
    BranchData.options = Object.keys(institute_data);
    BranchData.selected = 0;
    setSemData();
}

function setSemData(){
  semData.options = Object.keys(institute_data[BranchData.options[BranchData.selected]]);
  for(let i = 0; i<semData.options.length; i++){
    semData.options[i] = sem[semData.options[i]-1];
  }
  semData.selected = 0;
  setSubData();
}

function setSubData(){
  subData.options = [];
  Object.keys(institute_data[BranchData.options[BranchData.selected]][semData.selected+1]).forEach((key) => {
    subData.options.push(institute_data[BranchData.options[BranchData.selected]][semData.selected+1][key]);
  })
  console.log(subData.options);
  subData.selected = 0;
}