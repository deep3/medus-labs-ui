export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Users',
    url: '/users/list',
    icon: 'icon-people',
    children: [
      {
        name: 'List',
        url: '/users/',
        icon: 'fa fa-chevron-right'
      },
      {
        name: 'Create',
        url: '/users/create',
        icon: 'fa fa-chevron-right'
      },
    ]
  },
  {
    name: 'Labs',
    url: '/labs/list',
    icon: 'icon-wrench',
    children: [
      {
        name: 'New Lab',
        url: '/labs/',
        icon: 'fa fa-chevron-right'
      },
      {
        name: 'Deployed Labs',
        url: '/labs/active',
        icon: 'fa fa-chevron-right'
      },
      {
        name: 'Deleted Labs',
        url: '/labs/deleted',
        icon: 'fa fa-chevron-right'
      },
    ]
  },
  {
    name: 'Accounts',
    url: '/accounts/list',
    icon: 'fa fa-user-circle',
    children: [
      {
        name: 'List',
        url: '/accounts/',
        icon: 'fa fa-chevron-right'
      },
      {
        name: 'Create',
        url: '/setup/',
        icon: 'fa fa-chevron-right'
      }
    ]
  },
  {
    name: 'Cleanup',
    url: '/cleanup/',
    icon: 'fa fa-trash',
    children: [
        {
          name: 'Delete All Data',
          url: '/cleanup',
          icon: 'fa fa-chevron-right'
        }
    ]
  }
];
