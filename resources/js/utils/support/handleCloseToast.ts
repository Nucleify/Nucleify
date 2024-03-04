export default function closeToast(): void {
    document.querySelectorAll('.p-toast-message').forEach((element) => {
        element.remove()
    })
}
