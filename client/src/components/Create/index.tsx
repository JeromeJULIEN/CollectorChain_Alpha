import React from 'react'
import "./styles.scss"

type Props = {}

const Create = (props: Props) => {
  return (
    <div className='create'>
        <div className="create__title">
            SUBMIT YOUR OBJECT
        </div>
        <div className="create__text">
        Please provide the requested informations
        </div>
        <div className="blueBackground">
            <div className="create__title--center">Picture of the object</div>
            <button className='create__button'>Select a file</button>
            <div className="create__title--center">Proof of ownership</div>
            <button className='create__button'>Select a file</button>
            <div className="create__title--center">Storage</div>
            <button className='create__button'>Select a storage</button>
            <div className="create__title--center">Number of Fractions</div>
            <button className='create__button'>Select a value</button>
            <button className='create__button create__button--big'>SUBMIT</button>
        </div>
    </div>
  )
}

export default Create