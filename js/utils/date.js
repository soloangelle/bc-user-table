// Funcion para transfromar un timestamp a una string fecha

export function transformTimestampToDate(dateTimestamp){
   /* //Debe recibir un valor en timestamp
    let date = new Date(dateTimestamp);

    //Debe devolver una fecha en formato string 01/05/2023
    let day = date.getDate();
    if(day < 10){
        day = "0" + day    
    }
    let month = date.getMonth() + 1;  // En caso que el mes sea menor a 10 se le pone un 0
    month = month < 10 ? "0" + month : month
    const year = date.getFullYear();
    
     return`${day}/${month}/${year}`;
    */

    //Forma 2
    const dateFormat = new Intl.DateTimeFormat("es-AR",{
        day:"2-digit",
        month:"2-digit",
        year: "numeric"
    })

    const date = dateFormat.format(dateTimestamp);

    return date;   

}
//Funcion para calcular la edad del usuario a partir del bonrnDate

export function calculateAge(dateTimestamp){
    /*const date = new Date(dateTimestamp);
    const dateNow = new Date();
    
    let edad  = dateNow.getFullYear() - date.getFullYear() ;

    if( dateNow.getMonth() < date.getMonth()) 
    {
        edad --;
        return edad;
    } 
    if(dateNow.getMonth() === date.getMonth() && dateNow.getDay() < date.getDay()){
        edad --;
        return edad;
    }
    return edad;*/

    const now = new Date().getTime();
    const diff = now - dateTimestamp;
    const age = parseInt(diff/1000/60/60/24/365.25);

    return age;
}