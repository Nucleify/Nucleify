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

    const exampleColors = {
        activityItemColors: { primary: '#FFB600', hover: '#E7A60B' },
        articleItemColors: { primary: '#1187C7', hover: '#0F79B2' },
        contactItemColors: { primary: '#10B981', hover: '#10A674' },
        userItemColors: { primary: '#64748B', hover: '#566479' },
    }

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

            const colors = example
                ? exampleColors
                : {
                      activityItemColors,
                      articleItemColors,
                      contactItemColors,
                      userItemColors,
                  }

            if (example) {
                for (let i = 0; i < 12; i++) {
                    articleDataByMonth[i] = Math.floor(Math.random() * 100)
                    contactDataByMonth[i] = Math.floor(Math.random() * 100)
                    userDataByMonth[i] = Math.floor(Math.random() * 100)
                }
            } else {
                activityLogData?.forEach(
                    (activityLog: ActivityLogInterface): void => {
                        const monthIndex: number = new Date(
                            activityLog.created_at
                        ).getMonth()
                        activityLogDataByMonth[monthIndex]++
                    }
                )

                articleData?.forEach((article: ArticleInterface): void => {
                    const monthIndex: number = new Date(
                        article.created_at
                    ).getMonth()
                    articleDataByMonth[monthIndex]++
                })

                contactData?.forEach((contact: ContactInterface): void => {
                    if (contact.created_at) {
                        const monthIndex: number = new Date(
                            contact.created_at
                        ).getMonth()
                        contactDataByMonth[monthIndex]++
                    }
                })

                userData?.forEach((user: UserInterface): void => {
                    if (user.created_at) {
                        const monthIndex: number = new Date(
                            user.created_at
                        ).getMonth()
                        userDataByMonth[monthIndex]++
                    }
                })
            }

            switch (chartMethodType) {
                case 'annual':
                    const dataTypes = [
                        {
                            label: 'Activities',
                            data: activityLogDataByMonth,
                            colors: colors.activityItemColors,
                        },
                        {
                            label: 'Articles',
                            data: articleDataByMonth,
                            colors: colors.articleItemColors,
                        },
                        {
                            label: 'Contacts',
                            data: contactDataByMonth,
                            colors: colors.contactItemColors,
                        },
                        {
                            label: 'Users',
                            data: userDataByMonth,
                            colors: colors.userItemColors,
                        },
                    ]

                    const datasets = dataTypes
                        .map((dataType) => ({
                            label: dataType.label,
                            backgroundColor: dataType.colors.primary,
                            borderColor: dataType.colors.primary,
                            hoverBackgroundColor: dataType.colors.hover,
                            data: dataType.data,
                        }))
                        .filter((dataset) =>
                            dataset.data.some((count) => count > 0)
                        )

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

                    const totalArticles: number = articleDataByMonth.reduce(
                        (sum: number, value: number) => sum + value,
                        0
                    )
                    const totalContacts: number = contactDataByMonth.reduce(
                        (sum: number, value: number) => sum + value,
                        0
                    )
                    const totalUsers: number = userDataByMonth.reduce(
                        (sum: number, value: number) => sum + value,
                        0
                    )

                    return {
                        labels,
                        datasets: [
                            {
                                data: [
                                    totalArticles,
                                    totalContacts,
                                    totalUsers,
                                ],
                                backgroundColor: [
                                    colors.articleItemColors.primary,
                                    colors.contactItemColors.primary,
                                    colors.userItemColors.primary,
                                ],
                                hoverBackgroundColor: [
                                    colors.articleItemColors.hover,
                                    colors.contactItemColors.hover,
                                    colors.userItemColors.hover,
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

    function setChartOptions(
        chartType: ChartType,
        direction?: string
    ): ChartOptions {
        const textColor: string = documentStyle.getPropertyValue('--text-color')
        const textColorSecondary: string = documentStyle.getPropertyValue(
            '--text-color-secondary'
        )
        const surfaceBorder: string =
            documentStyle.getPropertyValue('--surface-border')

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
