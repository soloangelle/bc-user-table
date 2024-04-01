const users = [{
  fullname: 'John Doe',
  age: 30,
  email: 'admin@admin.com',
  id: '1',
  active: true,
  password: 'admin',
  bornDate: 725846400000,
  location: 'La Luna',
  image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/7/71/Mk8iconyoshi.png?width=1280',
  role: 'ADMIN_ROLE'
},
{
  fullname: 'Jane Doe',
  age: 25,
  email: 'jane.doe@example.com',
  id: '2',
  active: false,
  password: 'password456',
  bornDate: new Date('1998-05-05').getTime(),
  location: 'Mendoza',
  image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/f/f5/Mk8icondaisy.png?width=1280',
  role: 'CLIENT_ROLE'
},
{
  fullname: 'Alice Johnson',
  age: 35,
  email: 'alice.johnson@example.com',
  id: '3',
  active: true,
  password: 'password789',
  bornDate: new Date('1988-08-08').getTime(),
  location: 'Mendoza',
  image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/1/1d/Mk8icontoadette.png?width=325'
},
{
  fullname: 'Michael Smith',
  age: 40,
  email: 'michael.smith@example.com',
  id: '4',
  active: false,
  password: 'password101',
  bornDate: new Date('1983-04-10').getTime(),
  location: 'San Luis',
  image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/d/d1/Mk8iconrosalina.png?width=1280'
},
{
  fullname: 'Emily Johnson',
  age: 28,
  email: 'emily.johnson@example.com',
  id: '5',
  active: true,
  password: 'password202',
  bornDate: new Date('1995-02-15').getTime(),
  location: 'Córdoba',
  image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/5/59/Mk8iconpeach.png?width=325'
},
{
  fullname: 'Daniel Lee',
  age: 34,
  email: 'daniel.lee@example.com',
  id: '6',
  active: false,
  password: 'password303',
  bornDate: new Date('1989-07-07').getTime(),
  location: 'Buenos Aires',
  image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/b/bf/Mk8iconmario.png?width=325'
},
];

let isEditing;

const tableHTML = document.getElementById("table-container");
//Obtener el body de la tabla
const tableBodyHTML = document.getElementById("table-body");
const totalHTML = document.getElementById('total');
//Obtener el formulario del HTML
const userFormHTML = document.querySelector('#user-form');

let userButtonsEdit;
renderUsers(users);




userFormHTML.addEventListener("submit", (evento) => {

  evento.preventDefault(); // Prevenir el comportamiento que tiene por defecto un formulario de enviarse y recargar a página
  const el = evento.target.elements;

  if(el["password-repeat"].value !== el.password.value){
    Swal.fire("Error", "Las constraseñas no coinciden", "warning")
    return
  }
  const nuevoUsuario = {
    id: crypto.randomUUID(),
    fullname: el.fullname.value,
    email: el.email.value,
    password: el.password.value,
    location: el.location.value,
    image: el.image.value,
    bornDate: new Date(el.bornDate.value).getTime(),// transformo en un timestamp
    active: el.active.checked,
    // age: +el.age.value,  // esto se transforma en numero o valueAsNumber
  }
  
    //Debo establcer un condicional para saber si tengo que pushear o agregar un elemento al array (Un nuevo user) o si estoy editanto y tengo que buscsar un nuevo usuario y reemplazarlo
    if(isEditing){
      // Buscar el usuario y reemplazarlo
      const userIndex = users.findIndex(user => {
        return user.id === isEditing;
      })

      users[userIndex] = nuevoUsuario;
    }
    else{
      //Agregar el usuario ya que es un usar nuevo
      users.push(nuevoUsuario);
    }    

    renderUsers(users);
  //Limpiamos los input del formulario
 userFormHTML.reset(); 

 //Hacemos foco en el primer input del formulario
 el.fullname.focus();

})


function renderUsers(arrayUsers) {
  //Cada vez que llamamos a la funcion , primer limpiamos el bady de la tabla y volvemosa pintar
  tableBodyHTML.innerHTML = '';
  let total = 0;
  arrayUsers.forEach((user, index) => {

    total += user.age;
    tableBodyHTML.innerHTML += `<tr>
    <td class="user-image">
        <img src="${user.image}" alt="${user.fullname} avatar">
    </td>
    <td class="user-name">${user.fullname}</td>
    <td class="user-email">${user.email}</td>
    <td class="user-location">${user.location}</td>
    <td class="user-actions">
       <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')"><i class="fa-solid fa-trash-can"></i></button>
       <button class="btn btn-primary btn-sm" data-edit="${user.id}"><i class="fa-solid fa-pen"></i></button>
    </td>
</tr>`
  })

  totalHTML.innerHTML = `$ ${total}`;
  // Una vez que pintamos la tabla obtenemos todos los botones con el atributo data-edit y se los asignamos a la variable userButtonsEdit
  updateEditButtons();
  
}

function updateEditButtons(){ 
  userButtonsEdit = document.querySelectorAll('button[data-edit]');
  
  userButtonsEdit.forEach((btn) => {
    
    btn.addEventListener('click', (evt) =>{

      const id = evt.currentTarget.dataset.edit; //El botón que se clicleo el edit
      
      //Buscar el usuario y obtenerlo
      //Rellenar el formulario
      completeUserForm(id);

    })
  })
}

function completeUserForm(idUser){

  isEditing = idUser;

  console.log(`Complete FORM ${idUser}`);  
  //Buscar el usuarui y obtenerlo
  const user = users.find((usr) =>{
     if(usr.id === idUser){
      return true;
     }
    
  })
  // Considero el caso de no haber obtenido un usuario y corto la funcion pero ademas aviso al usuario
  if(!user){
    alert("No se encontró el usuario")
    return
  }
  // Rellenar el formulario
  const el = userFormHTML.elements;

  el.fullname.value = user.fullname;
  el.email.value = user.email;
  el.password.value = user.password;
  el["password-repeat"].value = user.password;
  el.location.value = user.location;
  el.image.value = user.image;  
  el.active.checked = user.active;
  el.bornDate.valueAsNumber = user.bornDate;
  //Obtenfo el botón submit del formulario para cambiar sus estilos y el texto del botón
  const btnSubmitHTML = userFormHTML.querySelector("button[type='submit']");
  const formContainerHTML = document.querySelector(".user-form-container");

  formContainerHTML.classList.add("form-edit");

  btnSubmitHTML.classList.remove('btn-primary');
  btnSubmitHTML.classList.add('btn-success');

  btnSubmitHTML.innerHTML = "Eitar";

}

//Funcion para eliminar usuario
function deleteUser(idUser) {

  //Deberia buscar el indce de ese elemento en el array
  const indice = users.findIndex((usr) => {
    //Voy a checkear cuando el idIser que es la persona que quiero borrar coincida con el id de mi usr
    if (idUser === usr.id) {
      return true;
    }
  })
  // Contemplar si el usuario no existia
  if (indice === -1) {
    Swal.fire({
      title: "Error al borrar",
      text: "No se pudo borrar el usuario",
      icon: "error",
      timer: 1500,
    })
    //alert("El usuario no se encontró");
    return  // es para romper, salir de la funcion
  }
  //Deberia eliminar ese elemento del array
  users.splice(indice, 1);

  //Volver a pintar la tabla
  renderUsers(users);

  console.log(`Borrar usuario ${idUser}`);
}

function inputSearch(evt) {
  //Tenemos que tomar lo que la persona ha escrito en el input
  //Luego deberiamos recorrer el array y filtrar por todos aquellos usuarios cuyo nombre coincidan con la búsqueda
  //Deeríamos pintar nuevamente la tabla con los resultados de la búsqueda

  const search = evt.target.value.toLowerCase();

  const filteredUsers = users.filter((usr) => {
    //Filter para devolver un usuario yo tengo que asegurarme de retornar un true bajo cierta condicion
    if (usr.fullname.toLocaleLowerCase().includes(search)) {
      return true;
    }
    return false;
  })
  renderUsers(filteredUsers);
}

function sortAsc() {

  const collator = new Intl.Collator(undefined, { sensitivity: 'base' })

  users.sort((a, b) => {

    // #Metodo 2
    return collator.compare(a.fullname, b.fullname)

    // #Metodo1
    // if(a.fullname.toLowerCase() > b.fullname.toLowerCase()){
    //   return 1;
    // }
    // if(a.fullname.toLowerCase() < b.fullname.toLowerCase()){
    //   return -1;
    // }
    // return 0;
  })

  renderUsers(users);

}

function sortDesc() {

  const collator = new Intl.Collator(undefined, { sensitivity: 'base' })

  users.sort((a, b) => {

    // #Metodo 2
    return collator.compare(b.fullname, a.fullname);

    // #Metodo 1
    //   if(a.fullname.toLowerCase() < b.fullname.toLowerCase()){
    //     return 1;
    //   }
    //   if(a.fullname.toLowerCase() > b.fullname.toLowerCase()){
    //     return -1;
    //   }
    //   return 0;    
  })
  renderUsers(users);
}






























































