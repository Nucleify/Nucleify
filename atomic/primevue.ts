import { App } from 'vue'

/**
 *  Components
 */
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import Checkbox from 'primevue/checkbox'
import Chips from 'primevue/chips'
import ColorPicker from 'primevue/colorpicker'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import DeferredContent from 'primevue/deferredcontent'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Dock from 'primevue/dock'
import Dropdown from 'primevue/dropdown'
import FloatLabel from 'primevue/floatlabel'
import Image from 'primevue/image'
import InlineMessage from 'primevue/inlinemessage'
import InputMask from 'primevue/inputmask'
import InputText from 'primevue/inputtext'
import Knob from 'primevue/knob'
import Menu from 'primevue/menu'
import OverlayPanel from 'primevue/overlaypanel'
import Password from 'primevue/password'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import RadioButton from 'primevue/radiobutton'
import Rating from 'primevue/rating'
import SelectButton from 'primevue/selectbutton'
import Skeleton from 'primevue/skeleton'
import Slider from 'primevue/slider'
import Terminal from 'primevue/terminal'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import TriStateCheckbox from 'primevue/tristatecheckbox'

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
  app
    .use(PrimeVue, { ripple: true })
    /**
     *  Components
     */
    .component('Avatar', Avatar)
    .component('Badge', Badge)
    .component('Button', Button)
    .component('Calendar', Calendar)
    .component('Card', Card)
    .component('Chart', Chart)
    .component('Checkbox', Checkbox)
    .component('Chips', Chips)
    .component('ColorPicker', ColorPicker)
    .component('Column', Column)
    .component('DataTable', DataTable)
    .component('DeferredContent', DeferredContent)
    .component('Dialog', Dialog)
    .component('Divider', Divider)
    .component('Dock', Dock)
    .component('Dropdown', Dropdown)
    .component('FloatLabel', FloatLabel)
    .component('Image', Image)
    .component('InlineMessage', InlineMessage)
    .component('InputMask', InputMask)
    .component('InputText', InputText)
    .component('Knob', Knob)
    .component('Menu', Menu)
    .component('OverlayPanel', OverlayPanel)
    .component('Password', Password)
    .component('ProgressBar', ProgressBar)
    .component('ProgressSpinner', ProgressSpinner)
    .component('RadioButton', RadioButton)
    .component('Rating', Rating)
    .component('SelectButton', SelectButton)
    .component('Skeleton', Skeleton)
    .component('Slider', Slider)
    .component('Terminal', Terminal)
    .component('Textarea', Textarea)
    .component('Toast', Toast)
    .component('TriStateCheckbox', TriStateCheckbox)

    /**
     *  Services
     */
    .use(ToastService)

    /**
     *  Directives
     */
    .directive('tooltip', Tooltip)
}
