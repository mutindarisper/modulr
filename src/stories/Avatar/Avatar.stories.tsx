import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'


const meta = {
    title: 'Navigation/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A circular avatar component that can display an image or user initials, with customizable sizes and optional status indicators.',
            },
        },
    },
    argTypes: {
        profilePictureUrl: { control: 'text' },
        initials: { control: 'text' },
    },

    args:{
        initials: 'RM',
        profilePictureUrl: '',
        active: false,
    }
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Active: Story = {
    args:{
        active: true,
        initials: 'RM',
    }
}

export const withProfilePicture: Story = { 
    args: {
        profilePictureUrl: 'https://avatars.githubusercontent.com/u/78821329?v=4',
        active: true,
    }
}