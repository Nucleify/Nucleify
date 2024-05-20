import { ChartOptions } from 'chart.js'
import {
    ActivityLogInterface,
    ArticleInterface,
    ChartMethodType,
    ChartType,
    ChartDataInterface,
    ColorItemColorsInterface,
    ContactInterface,
    LabelItemType,
    UserInterface,
} from '@/types'
import { useColors } from '@/utils'

export default function useChart() {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement)
    const {
        activityItemColors,
        articleItemColors,
        contactItemColors,
        userItemColors,
    }: {
        activityItemColors: ColorItemColorsInterface
        articleItemColors: ColorItemColorsInterface
        contactItemColors: ColorItemColorsInterface
        userItemColors: ColorItemColorsInterface
    } = useColors()

    const months: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const chartLabels: { label: LabelItemType }[] = [
        { label: 'Articles' },
        { label: 'Contacts' },
        { label: 'Users' },
    ]

    function setChartData(
        chartMethodType: ChartMethodType,
        activityLogData?: ActivityLogInterface[],
        articleData?: ArticleInterface[],
        contactData?: ContactInterface[],
        userData?: UserInterface[],
        example?: boolean
    ): ChartDataInterface | null {
        try {
            const labels: string[] = []
            const activityLogDataByMonth: number[] = new Array(12).fill(0)
            const articleDataByMonth: number[] = new Array(12).fill(0)
            const contactDataByMonth: number[] = new Array(12).fill(0)
            const userDataByMonth: number[] = new Array(12).fill(0)

            switch (chartMethodType) {
                case 'annual':
                    if (!example) {
                        activityLogData?.forEach((activityLog: ActivityLogInterface): void => {
                            const monthIndex: number = new Date(activityLog.created_at).getMonth()
                            activityLogDataByMonth[monthIndex]++
                        })

                        articleData?.forEach((article: ArticleInterface): void => {
                            const monthIndex: number = new Date(article.created_at).getMonth()
                            articleDataByMonth[monthIndex]++
                        })

                        contactData?.forEach((contact: ContactInterface): void => {
                            if (contact.created_at) {
                                const monthIndex: number = new Date(contact.created_at).getMonth()
                                contactDataByMonth[monthIndex]++
                            }
                        })

                        userData?.forEach((user: UserInterface): void => {
                            if (user.created_at) {
                                const monthIndex: number = new Date(user.created_at).getMonth()
                                userDataByMonth[monthIndex]++
                            }
                        })
                    } else {
                        for (let i = 0; i < 12; i++) {
                            articleDataByMonth[i] = Math.floor(Math.random() * 100)
                            contactDataByMonth[i] = Math.floor(Math.random() * 100)
                            userDataByMonth[i] = Math.floor(Math.random() * 100)
                        }
                    }


                    const dataTypes = [
                        { label: 'Activities', data: activityLogDataByMonth, colors: activityItemColors },
                        { label: 'Articles', data: articleDataByMonth, colors: articleItemColors },
                        { label: 'Contacts', data: contactDataByMonth, colors: contactItemColors },
                        { label: 'Users', data: userDataByMonth, colors: userItemColors },
                    ]

                    const datasets = dataTypes
                        .map(dataType => ({
                            label: dataType.label,
                            backgroundColor: dataType.colors.primary,
                            borderColor: dataType.colors.primary,
                            hoverBackgroundColor: dataType.colors.hover,
                            data: dataType.data,
                        }))
                        .filter(dataset => dataset.data.some(count => count > 0))

                    return { labels: months, datasets }

                case 'count':
                    chartLabels.forEach(({ label }): void => {
                        if (
                            (label === 'Articles' && articleData) ||
                            (label === 'Contacts' && contactData) ||
                            (label === 'Users' && userData)
                        ) {
                            labels.push(label)
                        }
                    })

                    if (example) {
                        articleData = new Array(Math.floor(Math.random() * 100))
                        contactData = new Array(Math.floor(Math.random() * 100))
                        userData = new Array(Math.floor(Math.random() * 100))
                    }

                    return {
                        labels,
                        datasets: [
                            {
                                data: [
                                    articleData?.length ?? 0,
                                    contactData?.length ?? 0,
                                    userData?.length ?? 0,
                                ],
                                backgroundColor: [
                                    articleItemColors.primary,
                                    contactItemColors.primary,
                                    userItemColors.primary,
                                ],
                                hoverBackgroundColor: [
                                    articleItemColors.hover,
                                    contactItemColors.hover,
                                    userItemColors.hover,
                                ],
                            },
                        ],
                    }

                default:
                    return null
            }
        } catch (error) {
            console.error('Error processing chart data:', error)
            return null
        }
    }

    function setChartOptions(chartType: ChartType, direction?: string): ChartOptions {
        const textColor: string = documentStyle.getPropertyValue('--text-color')
        const textColorSecondary: string  = documentStyle.getPropertyValue('--text-color-secondary')
        const surfaceBorder: string  = documentStyle.getPropertyValue('--surface-border')

        let options: ChartOptions = {
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

        if (chartType === 'pie' || chartType === 'doughnut') {
            options.plugins.legend.display = false
        } else if (direction === 'horizontal') {
            options.indexAxis = 'y'
        }

        if (chartType !== 'pie' && chartType !== 'doughnut') {
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
        }

        return options
    }

    return { setChartData, setChartOptions }
}
