import axios from "axios"

export default function login(credentials: { email: string; password: string }): void {
    axios
        .post('/login', credentials)
        .then(() => {
            window.location.href = '/home'
        })
        .catch((error) => {
            console.error('Error during login:', error)
        })
}
