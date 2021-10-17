import capitalize from "./capitalize.js";
const configAlerts = {

    deleteAlert : {
        title: '¿ Estás seguro ?',
        text: "El cambio no podrá deshacerse",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    },

    modifyConfirm : ( target , action ) => {
        
        const config = {
            title: `${capitalize(action)}!`,
            text: `El ${target} ha sido ${action}.`,
            icon: 'success',
            confirmButtonColor: '#3085d6'
        }

        Swal.fire( config )
            .then(  result => location.reload() );
    },

    modifyError : ( target , action ) => {
        
        const config = {
            title: `${capitalize(action)}!`,
            text: `El ${target} no se ha podido ${action}.`,
            icon: 'error',
            confirmButtonColor: '#3085d6'
        }

        Swal.fire( config )
            .then(  result => location.reload() );
    }
}

export default configAlerts