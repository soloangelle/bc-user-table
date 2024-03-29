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

const tableHTML = document.getElementById("table-container");
//Obtener el body de la tabla
const tableBodyHTML = document.getElementById("table-body");
const totalHTML = document.getElementById('total');

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
       <button class="btn btn-primary btn-sm"><i class="fa-solid fa-pen"></i></button>
    </td>
</tr>`
  })

  totalHTML.innerHTML = `$ ${total}`;
}

renderUsers(users);

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
  users.splice(indice,1);

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






























































