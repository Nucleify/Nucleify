import axios from "axios";

export default async function fetchUser(): Promise< | undefined> {
    try {
        const response = await axios.get('/api/user')

        console.log(response)

        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error)
    }
}
