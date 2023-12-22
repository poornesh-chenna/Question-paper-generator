import React from 'react'
import styles from '../styles/login.module.css'
import Inputfield from './Inputfield'
function Loginform({ details, setdetails, onClick, heading, value }) {
  return (
    <div style={{ width: '500px' }} className={styles.inputfields}>
      <h2>{heading}</h2>
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
