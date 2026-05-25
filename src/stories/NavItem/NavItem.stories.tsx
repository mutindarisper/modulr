import type { Meta, StoryObj } from '@storybook/react';
import { NavItem } from './NavItem';
import git_icon from "./assets/github.svg";


const meta = {
    title: 'Navigation/NavItem',
    component: NavItem,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A navigation link item with support for active/disabled states, leading/trailing icons, and a floating badge.',
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        href: { control: 'text' },
        active: { control: 'boolean' },
        disabled: { control: 'boolean' },
        target: {
            control: 'select',
            options: ['self', '_blank', 'parent', 'top'],
        },
        leadingIcon: { control: false },
        trailingIcon: { control: false },
        badge: { control: false },
    },
    args: {
        label: 'Home',
        href: '/',
    }
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {}

 export const Active: Story = {
    args: {
        active: true,
    }
}

export const Disabled: Story = {
    args: {
        disabled: true,
    }
}

export const WithLeadingIcon: Story = {
    args: {
        active: true,
        label: 'My GitHub',
        target: "_blank",
        leadingIcon: <img src={git_icon} alt="GitHub" className="w-4 h-4 invert" />,
    }
}

export const WithBadge: Story = {
    args: {
        active: true,
        label: 'Alerts',
        badge: <span >4</span>,
    }
}
export const WithTrailingIcon: Story = {
    args: {
        active: true,
        target: "_blank",
        href: 'https://rispermutinda.org',
        label: 'Book a Demo',
        trailingIcon: <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#ffffff"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>,
    }
}