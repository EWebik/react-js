export const esNombre = (value)=>{
    return !/[^A-Za-z\s\,]/.test(value);
}
  
export const esCorreo = (value)=>{
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value);
}
