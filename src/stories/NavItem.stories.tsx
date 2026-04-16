import type { Meta, StoryObj } from '@storybook/react';
import { NavItem } from './NavItem';


const meta = {
    title: 'Navigation/NavItem',
    component : NavItem,
    parameters: {
        layout: 'centered',
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