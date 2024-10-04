import { registerApplication, start } from 'single-spa';

registerApplication(
  'app1',
  () => import('sub-app1/App'),
  location => location.pathname.startsWith('/sub-app1')
);

registerApplication(
  'app2',
  () => import('sub-app2/App'),
  location => location.pathname.startsWith('/sub-app2')
);

start();