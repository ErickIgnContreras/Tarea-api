
async function fetchUsers(){
  
  if(!askedAMinuteAgo()){
   
    document.getElementById("users-body").innerHTML = ""

    document.getElementById("users-spinner").hidden = false;
    const resolve = await fetch("https://reqres.in/api/users?delay=3");
    const users = await resolve.json();
    document.getElementById("users-spinner").hidden = true;
    users.data.map( (user) => {
        document.getElementById("users-body").innerHTML += `
        <tr>
        <th scope="row">${user.id}</th>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        <td>${user.email}</td>
        <td><img src="${user.avatar}"</td>
      </tr>
        `
    })
  }
  else{
    alert("Espere un momento por favor ");
  }
}

function askedAMinuteAgo(){

  if(localStorage.getItem("date")){

    const minActuales = new Date().getMinutes();
    const minLocalStorage = new Date(localStorage.getItem("date")).getMinutes();

    const diferenciaMinutos = minActuales- minLocalStorage;
    
    if(diferenciaMinutos <= 1 ){
      return true;
    }else {
      localStorage.setItem("date", new Date());
      return false;
    }

  }else{
    localStorage.setItem("date", new Date());
    return false;
  }
}