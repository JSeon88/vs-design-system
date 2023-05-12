import type { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default (app: ReturnType<typeof createApp>) => {
  const icons = [faEye, faEyeSlash];
  icons.forEach((icon) => library.add(icon));
  app.component('font-awesome-icon', FontAwesomeIcon);

  return Promise.resolve();
};
