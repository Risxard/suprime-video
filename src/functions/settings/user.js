export function changeName(newName) {
    const usersString = localStorage.getItem('users');
  
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    const targetUserToken = currentUser.userToken;
  
    if (usersString) {
      const localUsers = JSON.parse(usersString);
  
      console.log(targetUserToken)
  
      const targetUser = localUsers.find(user => user.userToken === targetUserToken);
    
      if (targetUser && newName.length > 6) {
        targetUser.name = newName;
    
        console.log("Usuário alterado:", targetUser);
        localStorage.setItem('users', JSON.stringify(localUsers));
      } else {
        console.log("Usuário não encontrado");
      }
    } else {
      console.log("Nenhum dado de usuário encontrado no localStorage");
    }
  }