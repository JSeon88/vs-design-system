import type { createApp } from 'vue';
import awesomeIcon from './awesomeIcon';

export default async (app: ReturnType<typeof createApp>) => {
  await awesomeIcon(app);
};
