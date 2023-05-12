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

/** 기본 input 화면 */
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
  args: {}
};

/** 비밀번호 타입과 icon이 노출된 화면 */
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
    password: true,
    showIcon: true
  }
};

/** 유효성 체크가 추가된 화면 */
export const Validate: Story = {
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
    ...Password.args,
    rules: {
      required: (value: string) => !!value || 'Required',
      min: (value: string) => value.length >= 8 || 'Min 8 characters'
    }
  }
};
