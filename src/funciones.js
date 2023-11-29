import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//importamos los componentes para usar sweetalert2 y solicitamos 3 valores para hacer modificable la alerta
export function show_alerta(mesaje,icono,foco='') {
    onfocus(foco);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: mesaje,
        icon: icono,
    });
 
    //buscamos el componente con el if suministrado y le hacemos focus()
    function onfocus(foco){
        if (foco !== '') {
            document.getElementById(foco).focus();
        }
    }

}