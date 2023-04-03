import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './styles.scss'
import BackspaceIcon from '@mui/icons-material/Backspace';

type Props = {}

const RequestDetail = (props: Props) => {
    const {id} = useParams()
  return (
    <div className='requestDetail'>RequestDetail n°{id} <Link to="/admin"><BackspaceIcon/></Link></div>
  )
}

export default RequestDetail