import type { Meta, StoryObj } from '@storybook/vue3'
import { Chart as AdChart } from './'

const meta: Meta<typeof AdChart> = {
  title: 'Organisms/Chart',
  component: AdChart,
  tags: ['autodocs'],
  args: {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Dataset 1',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Sample Chart',
        },
      },
    },
    plugins: [],
    width: 400,
    height: 300,
    canvasProps: {},
    dt: {},
    pt: {},
    ptOptions: {},
    direction: undefined,
    chartMethodType: 'annual',
    activityLogData: [],
    articleData: [],
    contactData: [],
    moneyData: [],
    userData: [],
    chartClass: '',
    example: true,
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['bar', 'pie', 'doughnut', 'line', 'polarArea', 'radar'],
    },
    chartMethodType: {
      control: 'select',
      options: ['annual', 'count'],
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Chart: Story = {}
