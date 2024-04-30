
let boton = document.getElementById("btnGuardar");

boton.addEventListener("click", evento=>{
    registrarTicket();
});

let registrarTicket = async()=>{

let campos = {}

campos.idClient = document.getElementById("cliente").value;
campos.idFly = document.getElementById("vuelo").value;

const peticion = await fetch('http://localhost:8090/agenciaviajes/ticket',
{
    method:'POST',
    headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(campos)
});
}