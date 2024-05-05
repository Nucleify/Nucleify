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
    const documentStyle: CSSStyleDeclaration = getComputedStyle(
        document.documentElement
    )
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

    function setChartData(
        chartMethodType: ChartMethodType,
        activityLogData?: ActivityLogInterface[],
        articleData?: ArticleInterface[],
        contactData?: ContactInterface[],
        userData?: UserInterface[]
    ) {
        try {
            const labels: string[] = []
            const chartLabels: {
                label: LabelItemType
            }[] = [
                { label: 'Articles' },
                { label: 'Contacts' },
                { label: 'Users' },
            ]

            switch (chartMethodType) {
                case 'annual':
                    try {
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

                        const activityLogDataByMonth: number[] = new Array(
                            12
                        ).fill(0)
                        const articleDataByMonth: number[] = new Array(12).fill(
                            0
                        )
                        const contactDataByMonth: number[] = new Array(12).fill(
                            0
                        )
                        const userDataByMonth: number[] = new Array(12).fill(0)

                        activityLogData?.forEach(
                            (activityLog: ActivityLogInterface): void => {
                                const monthIndex: number = new Date(
                                    activityLog.created_at
                                ).getMonth()
                                activityLogDataByMonth[monthIndex]++
                            }
                        )

                        articleData?.forEach(
                            (article: ArticleInterface): void => {
                                const monthIndex: number = new Date(
                                    article.created_at
                                ).getMonth()
                                articleDataByMonth[monthIndex]++
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

                        const dataTypes: ChartDataInterface = [
                            {
                                label: 'Activities',
                                data: activityLogDataByMonth,
                                colors: activityItemColors,
                            },
                            {
                                label: 'Articles',
                                data: articleDataByMonth,
                                colors: articleItemColors,
                            },
                            {
                                label: 'Contacts',
                                data: contactDataByMonth,
                                colors: contactItemColors,
                            },
                            {
                                label: 'Users',
                                data: userDataByMonth,
                                colors: userItemColors,
                            },
                        ]

                        const datasets: any[] = []

                        for (const dataType of dataTypes) {
                            if (
                                dataType.data.some(
                                    (count): boolean => count > 0
                                )
                            ) {
                                datasets.push({
                                    label: dataType.label,
                                    backgroundColor: dataType.colors.primary,
                                    borderColor: dataType.colors.primary,
                                    hoverBackgroundColor: dataType.colors.hover,
                                    data: dataType.data,
                                })
                            }
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
                    chartLabels.forEach(
                        ({ label }: { label: LabelItemType }): void => {
                            if (
                                (label === 'Articles' && articleData) ||
                                (label === 'Contacts' && contactData) ||
                                (label === 'Users' && userData)
                            ) {
                                labels.push(label)
                            }
                        }
                    )

                    return {
                        labels: labels,
                        datasets: [
                            {
                                data: [
                                    articleData?.length,
                                    contactData?.length,
                                    userData?.length,
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

        let options: ChartOptions

        if (chartType === 'pie') {
            options = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            }
        } else {
            options = {
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
