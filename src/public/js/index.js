var contador;
function rate(item){
    contador = item.id[0]; //captura el primer caracter del id
    let nombre  = item.id.substring(1); //captura todos los caracteres excepto el primero
    
    for(let i=1; i<=5; i++)
    {
        if(i <= contador) { //Añade la clase con los estilos a las estrellas en el rango seleccionado
            document.getElementById(i + nombre + "-icon").classList.add("paint-stars");
        }
        else {  //Remueve la clase con los estilos a las estrellas que no estan en el rango seleccionado
            document.getElementById(i + nombre + "-icon").classList.remove("paint-stars");
        }
    }
    document.getElementById(nombre+"-btn").click();
}

function check(cal,id){
    for(let i=1; i<=5; i++){
        
        if(i<=cal){
            
            document.getElementById(i+"star"+id+"-icon").classList.add("paint-stars");
        }
        else{
            
            document.getElementById(i+"star"+id+"-icon").classList.remove("paint-stars");
        }
    }
}