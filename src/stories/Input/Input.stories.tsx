import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Input } from './Input'

const meta = {
    title: 'Forms/Input',
    component : Input,
    parameters: {
        layout: 'centered',

    },

    args: {
        onChange: fn()
    },


}satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args : {
        placeholder: 'Search...'

    }
}

export const WithLeftIcon: Story = {
    args: {
        placeholder: 'Search with icon',
        iconLeft: (
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5a5a5a"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
        )
    }
}

export const WithRightIcon: Story = {
    args: {
        placeholder: 'Search with icon',
        iconRight: (
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5a5a5a"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        )
    }
}
export const WithHelperText: Story = {
    args: {
        label: 'Enter Password',
        type: 'password',
        placeholder: '*************',
        helperText: '8 characters minimum'
    }
}

export const WithErrorMessage: Story = {
    args: {
        label: 'Enter Password',
        type: 'password',
        placeholder: '*************',
        error: 'password must contain special character'
    }
}

export const WithSuccessMessage: Story = {
    args: {
        label: 'Enter Password',
        type: 'password',
        placeholder: '*************',
        success: 'strong password'
    }
}

export const WithCharacterCount: Story = {
    args: {
        label: 'Bio',
        placeholder: 'Tell us about yourself...',
        maxLength: 100,
        helperText: 'Keep it short and sweet'
    }
}

export const Loading: Story = {
    args: {
        label: 'Username',
        placeholder: 'Checking availability...',
        loading: true,
    }
}

export const FloatingLabel: Story = {
    args: {
        label: 'Email address',
        placeholder: 'you@example.com',
        type: 'text',
    }
}