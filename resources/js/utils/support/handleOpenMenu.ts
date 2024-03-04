import Menu from 'primevue/menu'


export default function openMenu(menu: Menu, event: MouseEvent): void {
    menu.toggle(event)
}
