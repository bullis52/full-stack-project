import {useEffect, useState} from "react";
import {changeUser, getUsers, login, registration} from "../../service/fetch";
import {User} from "./User";

export function Users() {
    let [users, setUsers] = useState([])
    let [userName, setUserName] = useState('userName')
    let [firstName, setFirstName] = useState('firstName')
    let [lastName, setLastName] = useState('lastName')
    let [email, setEmail] = useState('email')
    let [type, setType] = useState('type')
    let [password, setPassword] = useState('password')
    let userForSave = {}
    const onSubmitForm = (e) => {
        e.preventDefault()
        let tempUser = {userName,firstName, lastName, email, type, password}
        setUserName({...tempUser})
        setFirstName({...tempUser})
        setLastName({...tempUser})
        setEmail({...tempUser})
        setType({...tempUser})
        setPassword({...tempUser})
        registration(tempUser)
    }
    const onSubmitFormLogin = (e) =>{
        e.preventDefault()
        setEmail({email})
        setPassword({password})
        login(email,password)
    }

    let onInputChangeUserName = (e) => {
        let userName = e.target.value
        setUserName(userName)
        userForSave.userName = userName
    }
    let onInputChangeFirstName = (e) => {
        let firstName = e.target.value
        setFirstName(firstName)
        userForSave.firstName = firstName
    }
    let onInputChangeLastName = (e) => {
        let lastName = e.target.value
        setLastName(lastName)
        userForSave.lastName = lastName
    }
    let onInputChangeEmail = (e) => {
        let email = e.target.value
        setEmail(email)
        userForSave.email = email
    }
    let onInputChangeType = (e) => {
        let type = e.target.value
        setType(type)
        userForSave.type = type
    }
    let onInputChangePassword = (e) => {
        let password = e.target.value
        setPassword(password)
        userForSave.password = password
    }

    useEffect(() => {
        getUsers().then(value => setUsers([...value]))
    }, [users])

    let [info, setInfo] = useState('hide')
    let [formHS, setFormHS] = useState('hideform')
    let [loginForm,setLoginForm] = useState('hide-login-form')

    return (
        <div>
            <div className={formHS}>
                <form onSubmit={onSubmitForm} className={'formStyle'}>
                    <input type="text" name={'userName'} placeholder={userName} onInput={onInputChangeUserName}/>
                    <input type="text" name={'firstName'} placeholder={firstName}
                           onInput={onInputChangeFirstName}/>
                    <input type="text" name={'lastName'} placeholder={lastName} onInput={onInputChangeLastName}/>
                    <input type="email" name={'email'} placeholder={email} onInput={onInputChangeEmail}/>
                    <input type="text" name={'type'} placeholder={type} onInput={onInputChangeType}/>
                    <input type="password" name={'password'} placeholder={password}
                           onInput={onInputChangePassword}/>
                    <button className={'form-button'} onClick={() => {
                        if (info === 'hide') {
                            setInfo('show')
                        }
                    }}>new user
                    </button>
                </form>
                <button className={'close-popup'} onClick={()=>{
                    if (formHS === 'showform') {
                        setFormHS('hideform')
                    }
                }}>
                    X
                </button>
            </div>
            <div className={loginForm}>
                <form onSubmit={onSubmitFormLogin} className={'formStyle'}>
                    <input type="email" name={'email'} placeholder={email} onInput={onInputChangeEmail}/>
                    <input type="password" name={'password'} placeholder={password} onInput={onInputChangePassword}/>
                    <button className={'form-button'} onClick={() => {
                        if (info === 'hide') {
                            setInfo('show')
                        }
                    }}>login
                    </button>
                </form>
                <button className={'close-popup'} onClick={()=>{
                    if (loginForm === 'show-login-form') {
                        setLoginForm('hide-login-form')
                    }
                }}>
                    X
                </button>
            </div>

            <button className={'showButton'} onClick={() => {
                if (formHS === 'hideform') {
                    setFormHS('showform')
                }
                if (formHS === 'showform') {
                    setFormHS('hideform')
                }
            }}>create user
            </button>
            <button className={'showButton login'} onClick={() => {
                if (loginForm === 'hide-login-form') {
                    setLoginForm('show-login-form')
                }
                if (loginForm === 'show-login-form') {
                    setLoginForm('hide-login-form')
                }
            }}>Login
            </button>
            <div className={'users usersQuotes container'}>
                <p>userName</p>
                <p>firstName</p>
                <p>lastName</p>
                <p>email</p>
                <p>userType</p>
            </div>
            {
                users.map(value => <User item={value} key={value.id}/>)
            }
        </div>
    );
}
