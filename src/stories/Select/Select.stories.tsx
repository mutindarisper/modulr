import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Select } from './Select';

const meta = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Dragonfruit', value: 'dragonfruit' },
  { label: 'Elderberry', value: 'elderberry' },
];

export const Default: Story = {
  args: {
    options: baseOptions,
    label: 'Select a fruit',
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: baseOptions,
    value: 'cherry',
    label: 'Select a fruit',
  },
};

export const WithLeadingIcon: Story = {
  args: {
    options: baseOptions,
    label: 'Select a fruit',
    leadingIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
};

export const WithCheckboxes: Story = {
  args: {
    options: baseOptions,
    label: 'Select fruits',
    multiple: true,
  },
};

export const WithCheckboxesPreselected: Story = {
  args: {
    options: baseOptions,
    value: ['apple', 'cherry'],
    label: 'Select fruits',
    multiple: true,
  },
};

export const Searchable: Story = {
  args: {
    options: [
      { label: 'Afghanistan', value: 'af' },
      { label: 'Albania', value: 'al' },
      { label: 'Algeria', value: 'dz' },
      { label: 'Brazil', value: 'br' },
      { label: 'Canada', value: 'ca' },
      { label: 'China', value: 'cn' },
      { label: 'Denmark', value: 'dk' },
      { label: 'Egypt', value: 'eg' },
      { label: 'France', value: 'fr' },
      { label: 'Germany', value: 'de' },
      { label: 'India', value: 'in' },
      { label: 'Japan', value: 'jp' },
      { label: 'Kenya', value: 'ke' },
      { label: 'Mexico', value: 'mx' },
      { label: 'Nigeria', value: 'ng' },
    ],
    label: 'Select a country',
    searchable: true,
  },
};

export const SearchableMulti: Story = {
  args: {
    options: [
      { label: 'TypeScript', value: 'ts' },
      { label: 'JavaScript', value: 'js' },
      { label: 'Python', value: 'py' },
      { label: 'Rust', value: 'rs' },
      { label: 'Go', value: 'go' },
      { label: 'Java', value: 'java' },
      { label: 'Kotlin', value: 'kt' },
      { label: 'Swift', value: 'swift' },
      { label: 'C++', value: 'cpp' },
      { label: 'Ruby', value: 'rb' },
    ],
    label: 'Select languages',
    searchable: true,
    multiple: true,
  },
};

export const WithGroupedOptions: Story = {
  args: {
    options: [
      {
        label: 'Fruits',
        value: 'fruits-group',
        children: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Cherry', value: 'cherry' },
        ],
      },
      {
        label: 'Vegetables',
        value: 'vegetables-group',
        children: [
          { label: 'Carrot', value: 'carrot' },
          { label: 'Broccoli', value: 'broccoli' },
          { label: 'Spinach', value: 'spinach' },
        ],
      },
      {
        label: 'Grains',
        value: 'grains-group',
        children: [
          { label: 'Rice', value: 'rice' },
          { label: 'Wheat', value: 'wheat' },
          { label: 'Oats', value: 'oats' },
        ],
      },
    ],
    label: 'Select a food',
  },
};

export const SearchableGrouped: Story = {
  args: {
    options: [
      {
        label: 'Frontend',
        value: 'frontend-group',
        children: [
          { label: 'React', value: 'react' },
          { label: 'Vue', value: 'vue' },
          { label: 'Angular', value: 'angular' },
          { label: 'Svelte', value: 'svelte' },
        ],
      },
      {
        label: 'Backend',
        value: 'backend-group',
        children: [
          { label: 'Node.js', value: 'node' },
          { label: 'Django', value: 'django' },
          { label: 'Rails', value: 'rails' },
          { label: 'Spring', value: 'spring' },
        ],
      },
      {
        label: 'Mobile',
        value: 'mobile-group',
        children: [
          { label: 'React Native', value: 'rn' },
          { label: 'Flutter', value: 'flutter' },
          { label: 'SwiftUI', value: 'swiftui' },
        ],
      },
    ],
    label: 'Select a framework',
    searchable: true,
  },
};
