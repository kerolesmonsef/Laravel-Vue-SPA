import axios from 'axios'
// import store from '../app.js'

export function login(credential, loginPath) {
    const promise = new Promise((success, fail) => {
        axios.post(loginPath, credential)
            .then(data => {
                success(data)
            })
            .catch((err) => {
                // fail(err)
                fail("Invalid Email Or Password")
            })

    })
    return promise
}


export function getLocalUser() {
    const user = localStorage.getItem('user');

    if (!user) {
        return null;
    }
    return JSON.parse(user);
}
