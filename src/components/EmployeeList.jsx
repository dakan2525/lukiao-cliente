import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { show_alerta } from '../funciones';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EmployeeTable from './EmployeeTable';
import EmployeeModal from './EmployeeModal';

const EmployeeList = () => {

    //para ser totalmente franco tengo un inconveniente que no he podido solucionar y es que cuando se edita un empleado la lista de empleados no alcanza a cargar, creo que es por la naturaleza de axios, si en el momento que pruebe esto funciona bien encontre el bug, de lo contrario espero que este codigo sea buena justificacion, tengo mas proyectos con react y Astro en mi portafolio

    //se que son muchos useState pero los considere asi por la maleabilidad, pero tambien podria idearse con un objeto y usar metodos y (...) para su actualizacion segun se requiera
    const [empleados, setEmpleados] = useState([]);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [razon_social, setRazon_social] = useState('');
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [pais, setPais] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [accion, setAccion] = useState(1);
    const [titulo, setTitulo] = useState('');
    const url = `http://127.0.0.1:8000/api/empleados/${id}`;

    //es ka funcion que se encarga de hacer un GET y traer la info con la que se llena la tabla principal
    const getEmployees = async () => {
        const respuesta = await axios.get(url);
        setEmpleados(respuesta.data.empleados);
        return respuesta.data.empleados;
    }

    //este useEffect solo se ejecuta al inicio de la vida del app y funciona para hagamos la primera solicitd 
    useEffect(() => {
        getEmployees();
    }, []);


    // abre el modal dependiendo de la OP que se reciba o mejor dicho dependiendo si se quiere crear o editar
    //tambien aplica un focus al primer campo Nombre, de estos formularios
    //con un solo modal estamos Crendo y editando
    const openModal = (op, id, nombre, apellido, razon_social, cedula, telefono, pais, ciudad) => {
        setId('');
        setNombre('');
        setApellido('');
        setRazon_social('');
        setCedula('');
        setTelefono('');
        setPais('');
        setCiudad('');
        setAccion(op);
        if (op === 1) {
            setTitulo('Registrar Empleado');
        } else if (op === 2) {
            setTitulo('Editar Empleado');
            setId(id);
            setNombre(nombre);
            setApellido(apellido);
            setRazon_social(razon_social);
            setCedula(cedula);
            setTelefono(telefono);
            setPais(pais);
            setCiudad(ciudad);
        }
        window.setTimeout(function () {
            document.getElementById('nombre').focus();
        }, 500);
    }

    //funcion que valida los campos actualmente esta quitando los espacios basios y validando que los campos esten diligenciados, se le pueden agregar mas con regex
    //tambiien crea un objeto que dependiendo de la accion tiene los parametrso y metodo para hacer una solicitud POST o PUT
    const validar = () => {
        var parametros;
        var metodo;
        if (nombre.trim() === '') {
            show_alerta('Escribe el nombre del producto', 'warning');
        } else if (apellido.trim() === '') {
            show_alerta('Escriba los Apellidos del Producto', 'warning');
        } else if (razon_social.trim() === '') {
            show_alerta('Ingrese la Razón Social del Proveedor', 'warning');
        } else if (cedula === '') {
            show_alerta('Ingresa la Cédula o RUC del Proveedor', 'warning');
        } else if (telefono === '') {
            show_alerta('Ingrese el número de teléfono', 'warning');
        } else if (pais.trim() === '') {
            show_alerta('Seleccione un país', 'warning');
        } else if (ciudad.trim() === '') {
            show_alerta('Ingrese una Ciudad', 'warning');
        } else {
            if (accion === 1) {
                parametros = {
                    nombre: nombre.trim(),
                    apellido: apellido.trim(),
                    razon_social: razon_social.trim(),
                    cedula: cedula,
                    telefono: telefono,
                    pais: pais.trim(),
                    ciudad: ciudad.trim()
                };
                metodo = 'POST';
            } else {
                parametros = {
                    id: id,
                    nombre: nombre.trim(),
                    apellido: apellido.trim(),
                    razon_social: razon_social.trim(),
                    telefono: telefono,
                    pais: pais.trim(),
                    ciudad: ciudad.trim()
                };
                metodo = 'PUT';
            }

            enviarSolicitud(metodo, parametros);
        }
    }

    //esta es una funcion que maneja las solicitudes de POST y PUT dependiendo si existe el valor ID del estado
    const enviarSolicitud = async (metodo, parametros) => {
        try {
            const respuesta = await axios({ method: metodo, url: url, data: parametros });
            var tipo = respuesta.data.tipo;
            var msj = respuesta.data.message;
            show_alerta(msj, tipo);
            if (tipo === 'success') {
                document.getElementById('btnCerrar').click();
                setEmpleados(respuesta.data.empleados);
                return getEmployees();

            }
        } catch (error) {
            show_alerta('Error en la solicitud', 'error');
            console.log(error);
        }
    }
    //funcion para validar y mandar modal y confirmar si desea eliminar empleado
    const validarEliminar = async (id, nombre) => {
        const Myswal = withReactContent(Swal);
        Myswal.fire({
            title: "¿Estas seguro?",
            text: `Una vez eliminado ${nombre} no podras recuperarlo!`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No, cancelar"
        }).then((resul) => {
            if (resul.isConfirmed) {
                eliminar(id);
            } else {
                show_alerta('El empleado no fue eliminado', 'info');
            }
        })
    }

    //funcion para eliminar un empleado sin validacion 
    const eliminar = async (id) => {
        const respuesta = await axios.delete(`http://127.0.0.1:8000/api/empleados/${id}`);
        setEmpleados(respuesta.data.empleados);
        return getEmployees();

    }

    return (
        <div className='App'>
            <div className="container-fluid">
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#modalEmployees">
                                Añadir
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        {/* crea la tabla y dentro de este componente tiene un hijo que crea los item necesarios segun el arreglo de empleados */}
                        {<EmployeeTable empleados={empleados} validarEliminar={validarEliminar} openModal={openModal} />}
                    </div>
                </div>
            </div>
            {/* este es el componente de modal cuenta un componente hijo para hacer cada input*/}
            <EmployeeModal titulo={titulo} nombre={nombre} apellido={apellido} razon_social={razon_social} cedula={cedula} telefono={telefono} pais={pais} ciudad={ciudad} validar={validar} setNombre={setNombre} setApellido={setApellido} setRazon_social={setRazon_social} setCedula={setCedula} setPais={setPais} setTelefono={setTelefono} setCiudad={setCiudad} accion={accion} />

        </div >
    )
}

export default EmployeeList