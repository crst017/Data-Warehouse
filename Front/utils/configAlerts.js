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

    deleteConfirm : ( text ) => {
        
        const config = {
            title: 'Eliminado!',
            text: `El ${text} ha sido eliminado.`,
            icon: 'success',
            confirmButtonColor: '#3085d6'
        }
        
        return config
    }
}

export default configAlerts