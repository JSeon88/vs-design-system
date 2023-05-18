import type { Meta, StoryObj } from '@storybook/vue3';

import SCheckbox from '@/components/form/checkbox/SCheckbox.vue';

const meta: Meta<typeof SCheckbox> = {
  title: 'Design/Form/SCheckbox',
  component: SCheckbox,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof SCheckbox>;

/** 기본 checkbox 화면 */
export const Default: Story = {
  render: (args) => ({
    components: { SCheckbox },
    data() {
      return {
        checked: true
      };
    },
    setup() {
      return { args };
    },
    template: `
      <div>
        <SCheckbox v-model="checked" v-bind="args" />
      </div>
    `
  }),
  args: {
    label: 'check1'
  }
};
