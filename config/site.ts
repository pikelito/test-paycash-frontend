export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Paycash',
  description: 'Test Miguel Mariño paycash',
  navItems: [
    {
      label: 'People',
      href: '/people',
    },
  ],
  navMenuItems: [],
  links: {
    githubFrontend: 'https://github.com/pikelito/test-paycash-frontend',
    githubBackend: 'https://github.com/pikelito/test-paycash-backend',
  },
};
