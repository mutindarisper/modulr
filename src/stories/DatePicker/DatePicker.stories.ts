import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './DatePicker'

const meta = {
  title: 'Forms/DatePicker',
  component: DatePicker,

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A calendar date picker supporting single date selection and date range selection, with year navigation.',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range'],
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {
    mode: 'single',
  },
}

export const Range: Story = {
  args: {
    mode: 'range',
  },
}
