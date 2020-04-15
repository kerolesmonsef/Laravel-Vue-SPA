import axios from 'axios'

export function login(credential) {
    const promise = new Promise((success, fail) => {
        axios.post('/api/auth/login', credential)
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
