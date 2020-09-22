function addUser(user){
    return{
        type:"ADD_USER_TO_STORE",
        data:user
    }
}
function removeUser(){
    return{
        type:"REMOVE_USER",
        data:null
    }
}

export {addUser,removeUser}