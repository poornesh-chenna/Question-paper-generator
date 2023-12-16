import React from 'react'
import styles from '../styles/login.module.css'
import Inputfield from './Inputfield'
function Loginform({ details, setdetails, onClick, heading, value }) {
  return (
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
    <div style={{ width: '500px' }} className={styles.inputfields}>
      <div>{heading}</div>
      <>
        <div style={{ margin: '25px' }}>
          <Inputfield
            // value={value.email}
            type="email"
            onChange={(e) =>
              setdetails((prev) => ({ ...prev, email: e.target.value }))
            }
            name="Enter Email"
          ></Inputfield>
        </div>
        <div style={{ margin: '25px' }}>
          <Inputfield
            // value={value.password}
            type="password"
            onChange={(e) =>
              setdetails((prev) => {
                return { ...prev, password: e.target.value }
              })
            }
            name="Enter password"
          ></Inputfield>
        </div>
        <div>
          <button onClick={onClick} className={styles.loginbutton}>
            Login
          </button>
        </div>
      </>
    </div>
  )
}
export default Loginform
