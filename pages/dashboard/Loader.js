import style from './dashboard.module.css'
export default function Loader(props){
return (
    <div id="backdrop" className={style.backDrop} style={{display:props.display}}>
        {/* <div ></div> */}
        <div id="loader" className={style.loader}></div>
    </div>
)
}