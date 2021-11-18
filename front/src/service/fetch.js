const registration = ({userName,firstName,lastName,email,userType,password}) => {

    fetch('http://localhost:5000/users',{
        method:'POST',
        body: JSON.stringify({userName,firstName,lastName,email,userType,password
            // title:'foo',
            // body:'bar,',
            // userId:1,
        }),
        headers:{
            'Content-type':'application/json; charst=UTF-8'
        },
    })
        .then((response ) => response.json())
        .then((json) => console.log(json))}

const getUsers = ()=>{
    return fetch(`http://localhost:5000/users`)
        .then(value => value.json())
}
const login = (email,password) => {
    fetch('http://localhost:5000/auth', {
        method: 'POST',
        body: JSON.stringify({
            email, password
            // title:'foo',
            // body:'bar,',
            // userId:1,
        }),
        headers: {
            'Content-type': 'application/json; charst=UTF-8',
        },
    })
        .then(value => value.json())
}
// const changeUser = (id,user) => {
//
//     fetch(`http://localhost:5000/users/${id}`,{
//         method:'PUT',
//         body: JSON.stringify(user
//             // title:'foo',
//             // body:'bar,',
//             // userId:1,
//         ),
//         headers:{
//             'Content-type':'application/json; charst=UTF-8',
//             // 'Authorization': 'Bearer ' + actionToken
//         },
//     })
//         .then((response ) => response.json())
//         .then((json) => console.log(json))}

function deleteUser(id){
    return fetch(`http://localhost:5000/users/${id}`,{
        method: `DELETE`,
    })
}

export {registration,getUsers,login,deleteUser}
