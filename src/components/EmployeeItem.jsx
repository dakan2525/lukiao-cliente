import React from 'react'

const EmployeeItem = ({ empleado, openModal, validarEliminar }) => {
    return (
        <tr key={empleado.id}>
            <td>{empleado.id}</td>
            <td>{empleado.nombre}</td>
            <td>{empleado.apellido}</td>
            <td>{empleado.razon_social}</td>
            <td>{empleado.cedula}</td>
            <td>{empleado.telefono}</td>
            <td>{empleado.pais}</td>
            <td>{empleado.ciudad}</td>
            <td>
                <button onClick={() => openModal(2, empleado.id, empleado.nombre, empleado.apellido, empleado.razon_social, empleado.cedula, empleado.telefono, empleado.pais, empleado.ciudad)} className='btn btn-warning p-1' data-bs-toggle='modal' data-bs-target='#modalEmployees'>
                    <i className='fa-solid fa-edit'></i>
                </button>
                &nbsp;
                <button onClick={() => validarEliminar(empleado.id, empleado.nombre)} className='btn btn-danger p-1'>
                    <i className='fa-solid fa-trash'></i>
                </button>
            </td>
        </tr>
    )
}

export default EmployeeItem