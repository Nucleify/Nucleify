import { Ref, ref } from 'vue'

import { ContactInterface, UserInterface, HandleDataInterface } from '@/types'

export default function handleData(): HandleDataInterface {
    const contactData: Ref<ContactInterface> = ref<ContactInterface>({
        first_name: '',
        last_name: '',
        email: '',
        personal_phone: '',
        work_phone: '',
        address: '',
        birthday: '',
        contact_groups: '',
        role: '',
    })

    const userData: Ref<UserInterface> = ref<UserInterface>({
        name: '',
        email: '',
        role: '',
    })

    return { contactData, userData }
}
