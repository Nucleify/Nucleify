import { useToastService } from '../'
import { ApiErrorsInterface, UseApiErrorsServiceInterface } from '../../interfaces'


export default function useApiErrorsService(): UseApiErrorsServiceInterface {
    const { flashToast } = useToastService()

    function apiErrors(error: ApiErrorsInterface): void {
        switch (error.response.status) {
            case 500:
                flashToast(
                    error.response.data.error || 'HTTP 500: Internal Server Error',
                    'error'
                )
                break
            case 404:
                flashToast(
                    error.response.data.error || 'HTTP 404: Not Found',
                    'error'
                )
                break
            case 403:
            case 401:
                flashToast('Unauthorized access', 'error')
                break
            default:
                flashToast(error.response.data.errors, 'warn')
        }
    }

    return { apiErrors }
}
