import { App } from 'vue'

/**
 *  Components
 */
import Accordion from 'primevue/accordion'
import AccordionContent from 'primevue/accordioncontent'
import AccordionHeader from 'primevue/accordionheader'
import AccordionPanel from 'primevue/accordionpanel'
import AutoComplete from 'primevue/autocomplete'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import BlockUI from 'primevue/blockui'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import Chart from 'primevue/chart'
import Checkbox from 'primevue/checkbox'
import ColorPicker from 'primevue/colorpicker'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import DeferredContent from 'primevue/deferredcontent'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Dock from 'primevue/dock'
import Fieldset from 'primevue/fieldset'
import FileUpload from 'primevue/fileupload'
import FloatLabel from 'primevue/floatlabel'
import Galleria from 'primevue/galleria'
import Image from 'primevue/image'
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import InputOtp from 'primevue/inputotp'
import InputText from 'primevue/inputtext'
import Knob from 'primevue/knob'
import Menu from 'primevue/menu'
import MeterGroup from 'primevue/metergroup'
import MultiSelect from 'primevue/multiselect'
import OrganizationChart from 'primevue/organizationchart'
import Popover from 'primevue/popover'
import Password from 'primevue/password'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import RadioButton from 'primevue/radiobutton'
import Rating from 'primevue/rating'
import ScrollTop from 'primevue/scrolltop'
import Select from 'primevue/select'
import SelectButton from 'primevue/selectbutton'
import Skeleton from 'primevue/skeleton'
import Slider from 'primevue/slider'
import SpeedDial from 'primevue/speeddial'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Tag from 'primevue/tag'
import Terminal from 'primevue/terminal'
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

/**
 *  Preset
 */
import { DataManagerPreset } from './primevue_preset'

export default function registerPrimeVue(app: App<Element>): void {
  app
    .use(PrimeVue, {
      theme: {
        preset: DataManagerPreset,
        options: {
          darkModeSelector: true,
        },
      },
      ripple: true,
    })
    /**
     *  Components
     */
    .component('Accordion', Accordion)
    .component('AccordionHeader', AccordionHeader)
    .component('AccordionContent', AccordionContent)
    .component('AccordionPanel', AccordionPanel)
    .component('AutoComplete', AutoComplete)
    .component('Avatar', Avatar)
    .component('Badge', Badge)
    .component('BlockUI', BlockUI)
    .component('Button', Button)
    .component('Card', Card)
    .component('Carousel', Carousel)
    .component('Chart', Chart)
    .component('Checkbox', Checkbox)
    .component('ColorPicker', ColorPicker)
    .component('Column', Column)
    .component('DatePicker', DatePicker)
    .component('DataTable', DataTable)
    .component('DeferredContent', DeferredContent)
    .component('Dialog', Dialog)
    .component('Divider', Divider)
    .component('Dock', Dock)
    .component('Fieldset', Fieldset)
    .component('FileUpload', FileUpload)
    .component('FloatLabel', FloatLabel)
    .component('Galleria', Galleria)
    .component('Image', Image)
    .component('InputMask', InputMask)
    .component('InputNumber', InputNumber)
    .component('InputOtp', InputOtp)
    .component('InputText', InputText)
    .component('Knob', Knob)
    .component('Menu', Menu)
    .component('MeterGroup', MeterGroup)
    .component('MultiSelect', MultiSelect)
    .component('OrganizationChart', OrganizationChart)
    .component('Popover', Popover)
    .component('Password', Password)
    .component('ProgressBar', ProgressBar)
    .component('ProgressSpinner', ProgressSpinner)
    .component('RadioButton', RadioButton)
    .component('Rating', Rating)
    .component('ScrollTop', ScrollTop)
    .component('Select', Select)
    .component('SelectButton', SelectButton)
    .component('Skeleton', Skeleton)
    .component('Slider', Slider)
    .component('SpeedDial', SpeedDial)
    .component('Tabs', Tabs)
    .component('TabList', TabList)
    .component('Tab', Tab)
    .component('TabPanels', TabPanels)
    .component('TabPanel', TabPanel)
    .component('Tag', Tag)
    .component('Terminal', Terminal)
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
