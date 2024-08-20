import { App } from 'vue'

/**
 *  Components
 */
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import ColorPicker from 'primevue/colorpicker'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Dock from 'primevue/dock'
import Dropdown from 'primevue/dropdown'
import FloatLabel from 'primevue/floatlabel'
import Image from 'primevue/image'
import InlineMessage from 'primevue/inlinemessage'
import InputText from 'primevue/inputtext'
import Menu from 'primevue/menu'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import RadioButton from 'primevue/radiobutton'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'

/**
 *  Directives
 */
import Tooltip from 'primevue/tooltip'

/**
 *  Services
 */
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'

export default function registerPrimeVue(app: App<Element>): void {
    app.use(PrimeVue, { ripple: true })
        /**
         *  Components
         */
        .component('Avatar', Avatar)
        .component('Button', Button)
        .component('Calendar', Calendar)
        .component('Card', Card)
        .component('Chart', Chart)
        .component('ColorPicker', ColorPicker)
        .component('Column', Column)
        .component('DataTable', DataTable)
        .component('Dialog', Dialog)
        .component('Dock', Dock)
        .component('Dropdown', Dropdown)
        .component('FloatLabel', FloatLabel)
        .component('Image', Image)
        .component('InlineMessage', InlineMessage)
        .component('InputText', InputText)
        .component('Menu', Menu)
        .component('ProgressBar', ProgressBar)
        .component('ProgressSpinner', ProgressSpinner)
        .component('RadioButton', RadioButton)
        .component('Textarea', Textarea)
        .component('Toast', Toast)

        /**
         *  Services
         */
        .use(ToastService)

        /**
         *  Directives
         */
        .directive('tooltip', Tooltip)
}
