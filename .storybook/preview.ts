import { Preview, setup } from '@storybook/vue3';
import awesomeIconInstall from '../src/plugins/awesomeIcon';

setup((app) => {
  awesomeIconInstall(app);
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;
