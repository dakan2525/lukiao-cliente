import React from 'react'

const EmployeeInput = ({ icono, valor, setValor, nombre }) => {
    return (
        <div className='input-group mb-3 w-100'>
            <span className='input-group-text'> <i className={icono}></i></span>
            <input type='text' id='nombre' required className='form-control flex-grow-1' title={`Campo para escribir el ${nombre}`} placeholder={nombre} value={valor} onChange={(e) => { setValor(e.target.value) }}></input>
        </div >
    )
}

export default EmployeeInput