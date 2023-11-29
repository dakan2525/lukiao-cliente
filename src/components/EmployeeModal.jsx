import React from 'react';
import EmployeeInput from './EmployeeInput';

const EmployeeModal = ({ accion, titulo, nombre, apellido, razon_social, cedula, telefono, pais, ciudad, validar, setNombre, setApellido, setRazon_social, setCedula, setPais, setTelefono, setCiudad }) => {
    return (
        <div id='modalEmployees' className='modal fade' aria-hidden="true">
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{titulo}</label>
                        <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label='close'></button>
                    </div>
                    <div className='modal-body mx-5'>
                        <input type="hidden" id='id'></input>
                        <EmployeeInput icono="fa-regular fa-user" valor={nombre} setValor={setNombre} nombre="Nombre" />
                        <EmployeeInput icono="fa-solid fa-user" valor={apellido} setValor={setApellido} nombre="Apellido" />
                        <EmployeeInput icono="fa fa-building" valor={razon_social} setValor={setRazon_social} nombre="Razón solcial" />
                        {/* aqui valido accion ya que si es 2 es editar y segun mi pensar la Cedula es un campo que no se debe poder editar, por eso la API asi lo envie lo omite */}
                        {accion !== 2 && <EmployeeInput icono="fa-solid fa-address-card" valor={cedula} setValor={setCedula} nombre="Cedula" />}
                        <EmployeeInput icono="fa-solid fa-phone" valor={telefono} setValor={setTelefono} nombre="telefono" />
                        <EmployeeInput icono="fa-solid fa-globe" valor={pais} setValor={setPais} nombre="pais" />
                        <EmployeeInput icono="fa-solid fa-flag" valor={ciudad} setValor={setCiudad} nombre="ciudad" />
                        <div className='d-grid col-6 mx-auto mb-2'>
                            <button onClick={() => validar()} className='btn btn-success'>
                                <i className='fa-solid fa-floppy-disk'></i>
                            </button>
                        </div>
                        <div className='modal-footer'>
                            <button id='btnCerrar' type='button' className='btn btn-secondary' data-bs-dismiss="modal">Cerrar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeModal