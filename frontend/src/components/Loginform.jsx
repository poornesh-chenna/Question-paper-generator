import React from "react";
import styles from "../styles/login.module.css"
import Inputfield from "./Inputfield";
function Loginform(props)
{
    return  (
//         <div className={styles.logindetails}>
//         <h1 style={{color:"white",textAlign:"center",marginTop:"40px"}}>{props.heading}</h1>
//        <div className={styles.inputfields}>
//             <div style={{marginBottom:"30px"}}>
//                  <input type="text" placeholder="Enter your username : " className={styles.username} ></input>
//              </div>
//             <div>
//                   <input type="password" placeholder="Enter your password : " className={styles.username}></input>
//             </div>
//        </div>
//        <div >
//              <button className={styles.loginbutton} >Login</button>
//        </div>

//   </div>
     <div style={{width:"500px"}} className={styles.inputfields}>
        <div>{props.heading}</div>
        <div style={{margin:"25px"}}>
            <p style={{float:"left",marginBottom:"10px"}}>Enter username :</p>
            <Inputfield name="Enter username"></Inputfield>
        </div>
        <div>
           <p style={{float:"left",marginBottom:"10px"}}>Enter password:</p>
           <Inputfield name="Enter password" ></Inputfield>
        </div>
        <div >
             <button className={styles.loginbutton} >Login</button>
       </div>
     </div>
    );

}
export default Loginform;