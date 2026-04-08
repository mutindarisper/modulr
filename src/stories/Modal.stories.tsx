import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Modal } from './Modal';


const meta = {
    title: 'Overlays/Modal',
    component : Modal,
    parameters: {
        layout: 'centered',

    },

    args: {
        onClose: fn(),
        onConfirm: fn(),
        onCancel: fn()
    },
}satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: 'Delete Account',
        bodyText: 'Are you sure you want to delete your account? This action cannot be undone.',
        closeIcon: true,
    }

}

export const WithButtons: Story = {
    args: {
        title: 'Delete Account',
        bodyText: 'Are you sure you want to delete your account? This action cannot be undone.',
        closeIcon: true,
        cancelButton: true,
        confirmButton: true,
        cancelButtonText: 'Keep Account',
        confirmButtonText: 'Yes, Delete it'
    }
}
