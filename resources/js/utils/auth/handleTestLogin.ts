import axios from 'axios'

export default function testLogin(role: string): void {
    let credentials: { email: string; password: string }

    switch (role) {
        case 'user':
            credentials = {
                email: 'test_user@datamanager.com',
                password: 'test_user123',
            }
            break
        case 'admin':
            credentials = {
                email: 'test_admin@datamanager.com',
                password: 'test_admin123',
            }
            break
        default:
            console.error('Invalid role:', role)
            return
    }

    axios
        .post('/login', credentials)
        .then(() => {
            location.href = '/home'
        })
        .catch((error) => {
            console.error('Error during login:', error)
        })
}
