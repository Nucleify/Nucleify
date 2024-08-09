import { Ref, ref } from 'vue'

import {
    ArticleInterface,
    ContactInterface,
    UserInterface,
    HandleDataInterface,
} from '@/types'

export default function handleData(): HandleDataInterface {
    const articleData: Ref<ArticleInterface> = ref<ArticleInterface>({
        title: '',
        description: '',
        category: '',
        created_at: '',
    })

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
        password: '',
        confirm_password: '',
    })

    return { articleData, contactData, userData }
}
