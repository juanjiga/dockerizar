window.onload = function(){
    listaUser();
}

let listaUser = async ()=>{
    const peticion = await fetch("http://localhost:8088/user",
    {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }   
    });

    const listado = await peticion.json();

    let contenidoTabla = ""; 

    for(let dato of listado){
        let contenidoFila = `<tr>
        <td>${dato.id}</td>
        <td>${dato.name}</td>
        <td>${dato.phone}</td>
        <td>
        <i onClick="editarUser(${dato.id})" class="material-icons button edit">edit</i>
        <i onClick="borrarUser(${dato.id})" class="material-icons button delete">delete</i>
        </td>
        </tr>`

        contenidoTabla += contenidoFila;
    }

    document.querySelector("#tabla tbody").outerHTML = contenidoTabla;

}

let borrarUser = async (id)=>{
    const peticion = await fetch("http://localhost:8088/user/"+id,
    {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }   
    });

    listaUser();
}

let idEditar;

let editarUser = async (id)=>{

    mostrarFormulario();

    idEditar = id;

    const peticion = await fetch("http://localhost:8088/user/"+id,
    {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }   
    });

    const usuario = await peticion.json();

    document.getElementById("nombre").value=usuario.name;
    document.getElementById("telefono").value=usuario.phone;

    let btnModificar = document.getElementById("btnModificar");
}

btnModificar.addEventListener("click", evento =>{
    aplicarActualizacion(idEditar);
});

let aplicarActualizacion = async ()=>{
    let campos = {};
    campos.id = id;
    campos.name = document.getElementById("nombre").value;
    campos.phone = document.getElementById("telefono").value;

    const peticion = await fetch("http://localhost:8088/user/"+id,
    {
        method:'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(campos)
    });

    listaUser();
}

function mostrarFormulario(){
    let formulario = document.getElementById("formulario").style.visibility="visible";
}