import { getStorage ,ref , getDownloadURL  } from "firebase/storage";

import DownloadIcon from "../../images/downloadIcon.js";
import style from "./dashboard.module.css";

export default function Posts(props) {
    return (
      <div className={style.dynamicPost}>
        <div className={style.postHeader}>{props.data.title}</div>
  
        <div className={style.postDesc}>{props.data.content}</div>
        <div className={style.postAuthor}>
          <span>Contributor : </span> {props.data.author}(
          {props.data.author_email})
        </div>
  
        <div className={style.downloadContainer}>
          {
          props.data.file_urls &&
          Object.keys(props.data.file_urls).map((key) => {
            return (
              <div className={style.downloadChip} key={key} onClick={
                () => {
  
  
                  const storage = getStorage(props.app);
                  getDownloadURL(ref(storage , props.data.file_urls[key])).then(url => {
                    window.open(url);
                  }).catch(error => {
                    console.log(error);
                  })
  
                }
              }>
                <span>{props.data.file_urls[key].slice(-1,-10)}</span>
                <DownloadIcon color="#a8a8a8" width="24" marginLeft="5px" />
              </div>
            );
          })
          
          }
        </div>
      </div>
    );
}
