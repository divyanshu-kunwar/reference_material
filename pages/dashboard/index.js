import Image from "next/image";
import { useState } from "react";

import logo from "../../images/logo.svg";
import style from "./dashboard.module.css";
import arrowIcon from "../../images/drop.svg";
import filterIcon from "../../images/filter.svg";
import DownloadIcon from "../../images/downloadIcon.js";
import closeIcon from "../../images/close.svg";



const semData = {
  options: [
    "1st Semester",
    "2nd Semester",
    "3rd Semester",
    "4th Semester",
    "5th Semester",
    "6th Semester",
    "7th Semester",
    "8th Semester",
  ],
  selected: 0,
  title: "Select Semester",
};

const BranchData = {
  options: [
    "B.Tech. CSE",
    "B.Tech. ECE",
    "B.Tech. EE",
    "B.Tech. ME",
    "B.Tech. CE",
    "B.Tech. FET",
  ],
  selected: 0,
  title: "Select Programme",
};

const subData = {
  options: ["MS102", "CH101", "PH101", "EE102"],
  selected: 0,
  title: "Select Subject",
};

const sortData = {
  options: ["Title", "Date"],
  selected: 0,
  title: "Sort By",
};

const postData = {
  1: {
    title: "Syllabus 2018",
    description:
      "Detailed syllabus for year 2018 . This course is taught by proffessor from dept. of applied sciences namely Dr. Somnath Paul , Dr. Bijoy Kumar Debnath and Dr. Jyotirekha Dutta.",
    author: "Divyanshu Kunwar",
    author_email: "csb21082@tezu.ernet.in",
    date: "01-01-2018",
    files: {
      1: {
        name: "Syllabus2014.pdf",
        url: "https://drive.google.com/file/d/1_Q-_Q-_Q-_Q-_Q-/view?usp=sharing",
      },
      2: {
        name: "Syllabus2018.pdf",
        url: "https://drive.google.com/file/d/1_Q-_Q-_Q-_Q-_Q-/view?usp=sharing",
      },
    },
  },

  2: {
    title: "Syllabus 2018",
    description:
      "Detailed syllabus for year 2018 . This course is taught by proffessor from dept. of applied sciences namely Dr. Somnath Paul , Dr. Bijoy Kumar Debnath and Dr. Jyotirekha Dutta.",
    author: "Divyanshu Kunwar",
    author_email: "csb21082@tezu.ernet.in",
    date: "01-01-2018",
    files: {
      1: {
        name: "Syllabus2014.pdf",
        url: "https://drive.google.com/file/d/1_Q-_Q-_Q-_Q-_Q-/view?usp=sharing",
      },
      2: {
        name: "Syllabus2018.pdf",
        url: "https://drive.google.com/file/d/1_Q-_Q-_Q-_Q-_Q-/view?usp=sharing",
      },
    },
  },

  3: {
    title: "Syllabus 2018",
    description:
      "Detailed syllabus for year 2018 . This course is taught by proffessor from dept. of applied sciences namely Dr. Somnath Paul , Dr. Bijoy Kumar Debnath and Dr. Jyotirekha Dutta.",
    author: "Divyanshu Kunwar",
    author_email: "csb21082@tezu.ernet.in",
    date: "01-01-2018",
    files: {
      1: {
        name: "Syllabus2014.pdf",
        url: "https://drive.google.com/file/d/1_Q-_Q-_Q-_Q-_Q-/view?usp=sharing",
      },
      2: {
        name: "Syllabus2018.pdf",
        url: "https://drive.google.com/file/d/1_Q-_Q-_Q-_Q-_Q-/view?usp=sharing",
      },
    },
  },

};

export default function Dashboard() {
  const [activetab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(true);
  const [title, setTitle] = useState(" ");

  const [selectedData, setSelectedData] = useState(semData);

  return (
    <div className={style.dashboardPage}>
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

      <div
        className={style.contentGrid}
        style={activetab == 0 ? { display: "flex" } : { display: "none" }}
      >
        {Object.keys(postData).map((key) => {
          return <Posts key={key} data={postData[key]} />;
        })}
      </div>

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
            defaultValue={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            contentEditable
          />
        </div>

        <div className={style.inputContainer}>
          <label>Description</label>
          <textarea
            className={style.textbox}
            name="abc"
            defaultValue={title}
            contentEditable
          />
        </div>

        <div className={style.inputContainer}>
          <label>Files</label>
          <input name="def" type="text" defaultValue={title} />
        </div>
      </div>

      <div
        className={style.btn_container}
        style={activetab == 1 ? { display: "flex" } : { display: "none" }}
      >
        <div className={style.form_btn}>Upload File</div>
        <div className={style.form_btn}>Submit</div>
      </div>

      <div
        className={style.community}
        style={activetab == 2 ? { display: "flex" } : { display: "none" }}
      >
        This feature is under build ...
      </div>

      {/* ................................ selection box ....................................... */}
      {modalOpen && <ModalBox data={selectedData} closeModal={setModalOpen} />}
    </div>
  );
}

function Posts(props) {
  return (
    <div className={style.dynamicPost}>
      <div className={style.postHeader}>{props.data.title}</div>

      <div className={style.postDesc}>{props.data.description}</div>
      <div className={style.postAuthor}>
        <span>Contributor : </span> {props.data.author}(
        {props.data.author_email})
      </div>

      <div className={style.downloadContainer}>
        {Object.keys(props.data.files).map((key) => {
          return (
            <div className={style.downloadChip} key={key} onClick={
              () => {
                window.open(props.data.files[key].url, "_blank");
              }
            }>
              <span>{props.data.files[key].name}</span>
              <DownloadIcon color="#a8a8a8" width="24" marginLeft="5px" />
            </div>
          );
        })}
      </div>
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

