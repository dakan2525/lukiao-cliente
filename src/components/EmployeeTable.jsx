import React from 'react'
import EmployeeItem from './EmployeeItem'

const EmployeeTable = ({ empleados, validarEliminar, openModal }) => {
    return (
        <div className='table-responsive'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>RAZON SOCIAL</th>
                        <th>CEDULA</th>
                        <th>TELEFONO</th>
                        <th>PAIS</th>
                        <th>CIUDAD</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody className='table-group-divider'>
                    {empleados && empleados.map((empleado) => {
                        return (
                            <EmployeeItem empleado={empleado} validarEliminar={validarEliminar} openModal={openModal} />
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default EmployeeTable