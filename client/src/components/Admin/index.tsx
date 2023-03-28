import React from 'react'
import "./styles.scss"

interface AdminProps {
    isAdmin : boolean
}

const Admin = (props: AdminProps) => {
  return (
    <>
    {props.isAdmin === true ? <div className='admin'>Admin</div> : <div className='admin'>You're not the admin</div> }
    </>
    
  )
}

export default Admin