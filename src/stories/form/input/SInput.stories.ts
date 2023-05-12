import type { Meta, StoryObj } from '@storybook/vue3';

import SInput from '@/components/form/input/SInput.vue';

const meta: Meta<typeof SInput> = {
  title: 'Design/Form/Input',
  component: SInput,
  tags: ['autodocs'],
  argTypes: {
    onFocusin: {
      action: 'Focusin Event'
    }
  }
};

export default meta;
type Story = StoryObj<typeof SInput>;

export const Default: Story = {
  render: (args) => ({
    components: { SInput },
    setup() {
      return { args };
    },
    template: `
      <div>
        <SInput v-bind="args" />
      </div>
    `
  }),
  args: {
    rules: {
      required: (value: string) => !!value || 'Required',
      min: (value: string) => value.length >= 8 || 'Min 8 characters'
    }
  }
};

export const Password: Story = {
  render: (args) => ({
    components: { SInput },
    setup() {
      return { args };
    },
    template: `
      <div>
        <SInput v-bind="args" />
      </div>
    `
  }),
  args: {
    ...Default.args,
    password: true,
    showIcon: true
  }
};
