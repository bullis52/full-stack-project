// noinspection JSVoidFunctionReturnValueUsed

import {changeUser, deleteUser, getUsers} from "../../service/fetch";
import {useEffect, useState} from "react";

export  function User({item}){
    let [users, setUsers] = useState([])
    let [checkUser,setCheckUser] = useState({})

    useEffect(() => {
        getUsers().then(value => setUsers([...value]))
    }, [checkUser])

    const DeleteUser = (id) => {
        deleteUser(id);
        setCheckUser(users.filter((item) => item.id !== id));
    }
    // const EditUser = (id)=>{
    //     changeUser(id)
    // }
    return(
        <div className={'container'}>
            <div className={'users usersValue'}>
                <p>{item.userName}</p>
                <p>{item.firstName}</p>
                <p>{item.lastName}</p>
                <p>{item.email}</p>
                <p>{item.userType}</p>
                <button className={'users-delete'} onClick={()=>DeleteUser(item.id)}>delete</button>
                {/*<button onClick={()=>EditUser(item.id)}>edit</button>*/}
            </div>
        </div>
    );
}
