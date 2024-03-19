import {
    ActivityLogInterface,
    ChartMethodType,
    ChartType,
    ContactInterface,
    UserInterface,
} from '../../interfaces'
import { ChartOptions } from 'chart.js'

export default function useChart() {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(
        document.documentElement
    )

    function setChartData(
        chartMethodType: ChartMethodType,
        activityLogData?: ActivityLogInterface[],
        contactData?: ContactInterface[],
        userData?: UserInterface[]
    ) {
        try {
            const labels: string[] = []
            const backgroundColors: string[] = []
            const hoverBackgroundColors: string[] = []
            const labelsAndColors: {
                label: string
                color: string
            }[] = [
                { label: 'Users', color: '--gray-500' },
                { label: 'Contacts', color: '--primary-color' },
            ]

            switch (chartMethodType) {
                case 'annual':
                    try {
                        const documentStyle: CSSStyleDeclaration =
                            getComputedStyle(document.documentElement)
                        const months: string[] = [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ]

                        const activityLogDataByMonth = new Array(12).fill(0)
                        const contactDataByMonth = new Array(12).fill(0)
                        const userDataByMonth = new Array(12).fill(0)

                        activityLogData?.forEach(
                            (activityLog: ActivityLogInterface) => {
                                const monthIndex: number = new Date(
                                    activityLog.created_at
                                ).getMonth()
                                activityLogDataByMonth[monthIndex]++
                            }
                        )

                        contactData?.forEach(
                            (contact: ContactInterface): void => {
                                if (contact.created_at) {
                                    const monthIndex: number = new Date(
                                        contact.created_at
                                    ).getMonth()
                                    contactDataByMonth[monthIndex]++
                                }
                            }
                        )

                        userData?.forEach((user: UserInterface): void => {
                            if (user.created_at) {
                                const monthIndex: number = new Date(
                                    user.created_at
                                ).getMonth()
                                userDataByMonth[monthIndex]++
                            }
                        })

                        const datasets = []

                        if (
                            activityLogDataByMonth.some(
                                (count): boolean => count > 0
                            )
                        ) {
                            datasets.push({
                                label: 'Activities',
                                backgroundColor:
                                    documentStyle.getPropertyValue(
                                        '--primary-color'
                                    ),
                                borderColor:
                                    documentStyle.getPropertyValue(
                                        '--primary-color'
                                    ),
                                data: activityLogDataByMonth,
                            })
                        }

                        if (
                            contactDataByMonth.some(
                                (count): boolean => count > 0
                            )
                        ) {
                            datasets.push({
                                label: 'Contacts',
                                backgroundColor:
                                    documentStyle.getPropertyValue(
                                        '--primary-color'
                                    ),
                                borderColor:
                                    documentStyle.getPropertyValue(
                                        '--primary-color'
                                    ),
                                data: contactDataByMonth,
                            })
                        }

                        if (
                            userDataByMonth.some((count): boolean => count > 0)
                        ) {
                            datasets.push({
                                label: 'Users',
                                backgroundColor:
                                    documentStyle.getPropertyValue(
                                        '--gray-500'
                                    ),
                                borderColor:
                                    documentStyle.getPropertyValue(
                                        '--gray-500'
                                    ),
                                data: userDataByMonth,
                            })
                        }

                        return {
                            labels: months,
                            datasets,
                        }
                    } catch (error) {
                        console.error('Error processing chart data:', error)
                        return null
                    }
                case 'count':
                    labelsAndColors.forEach(
                        ({
                            label,
                            color,
                        }: {
                            label: string
                            color: string
                        }): void => {
                            if (
                                (label === 'Contacts' && contactData) ||
                                (label === 'Users' && userData)
                            ) {
                                labels.push(label)
                                backgroundColors.push(
                                    documentStyle.getPropertyValue(color)
                                )
                                hoverBackgroundColors.push(
                                    documentStyle.getPropertyValue(color)
                                )
                            }
                        }
                    )

                    return {
                        labels: labels,
                        datasets: [
                            {
                                data: [userData?.length, contactData?.length],
                                backgroundColor: backgroundColors,
                                hoverBackgroundColor: hoverBackgroundColors,
                            },
                        ],
                    }
            }
        } catch (error) {
            console.error('Error processing chart data:', error)
            return null
        }
    }

    function setChartOptions(chartType: ChartType) {
        const textColor: string = documentStyle.getPropertyValue('--text-color')
        const textColorSecondary: string = documentStyle.getPropertyValue(
            '--text-color-secondary'
        )
        const surfaceBorder: string =
            documentStyle.getPropertyValue('--surface-border')

        const options: ChartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
        }

        switch (chartType) {
            case 'pie':
            case 'doughnut':
                break
            default:
                options.scales = {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 500,
                            },
                        },
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary,
                        },
                        grid: {
                            color: surfaceBorder,
                        },
                    },
                }
                break
        }

        return options
    }

    return { setChartData, setChartOptions }
}
