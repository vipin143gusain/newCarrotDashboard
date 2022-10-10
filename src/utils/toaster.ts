import { toast } from 'react-toastify';

export const notify = (type:"success"|"error",message:string)=>{

    console.log(type)

    if(type==="success"){
        toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

    }else {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }


}