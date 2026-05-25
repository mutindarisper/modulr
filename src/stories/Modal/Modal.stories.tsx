import  { useState } from 'react';
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
        showCloseIcon: true,
    }

}

export const WithButtons: Story = {
    args: {
        title: 'Delete Account',
        bodyText: 'Are you sure you want to delete your account? This action cannot be undone.',
        showCloseIcon: true,
        cancelButton: true,
        confirmButton: true,
        cancelButtonText: 'Keep Account',
        confirmButtonText: 'Yes, Delete it'
    }
}

export const Danger: Story = {
    args: {
        title: 'Delete Account',
        bodyText: 'Are you sure you want to delete your account? This action cannot be undone.',
        showCloseIcon: true,
        cancelButton: true,
        confirmButton: true,
        cancelButtonText: 'Keep Account',
        confirmButtonText: 'Yes, Delete it',
        variant: 'danger',
    }
}

export const Warning: Story = {
    args: {
        title: 'Unsaved Changes',
        bodyText: 'You have unsaved changes. Are you sure you want to leave?',
        showCloseIcon: true,
        cancelButton: true,
        confirmButton: true,
        cancelButtonText: 'Stay',
        confirmButtonText: 'Leave',
        variant: 'warning',
        icon: '⚠️',
    }
}

export const Info: Story = {
    args: {
        title: 'New Update Available',
        bodyText: 'A new version of the app is available. Update now to get the latest features.',
        showCloseIcon: true,
        confirmButton: true,
        confirmButtonText: 'Update Now',
        variant: 'info',
        icon: 'ℹ️',
    }
}

export const LoadingConfirm: Story = {
    args: {
        title: 'Delete Account',
        bodyText: 'Are you sure you want to delete your account? This action cannot be undone.',
        showCloseIcon: true,
        cancelButton: true,
        confirmButton: true,
        cancelButtonText: 'Keep Account',
        confirmButtonText: 'Deleting...',
        variant: 'danger',
        confirmLoading: true,
    }
}

export const Animated: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="flex flex-col items-center gap-4">
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="bg-neutral-950 text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
                >
                    Open Modal
                </button>
                <Modal
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onCancel={() => setIsOpen(false)}
                    onConfirm={() => setIsOpen(false)}
                />
            </div>
        );
    },
    args: {
        title: 'Delete Account',
        bodyText: 'Are you sure you want to delete your account? This action cannot be undone.',
        showCloseIcon: true,
        cancelButton: true,
        confirmButton: true,
        cancelButtonText: 'Keep Account',
        confirmButtonText: 'Yes, Delete it',
    },
}
