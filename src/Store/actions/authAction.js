function addUser(user){
    console.log("user from Action",user )
    return{
        type:"ADD_USER_TO_STORE",
        data:user
    }
}
function removeUser(){
    console.log("user from Action", )
    return{
        type:"REMOVE_USER",
        data:null
    }
}

export {addUser,removeUser}