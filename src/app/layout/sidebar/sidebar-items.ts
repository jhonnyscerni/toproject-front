import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: '-- Main',
    moduleName: '',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    role: ['All'],
    submenu: [],
  },
  // Admin Modules
  {
    path: '/admin/dashboard/main',
    title: 'Dashboard',
    moduleName: 'dashboard',
    iconType: 'material-icons-two-tone',
    icon: 'home',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [],
  },
  {
    path: '/admin/usuarios',
    title: 'Usuários',
    moduleName: 'user',
    iconType: 'material-icons-two-tone',
    icon: 'face',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [],
  },

  {
    path: '/admin/grupos',
    title: 'Grupos',
    moduleName: 'grupos',
    iconType: 'material-icons-two-tone',
    icon: 'group',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [],
  },
  {
    path: '/admin/permissoes',
    title: 'Permissões',
    moduleName: 'permissoes',
    iconType: 'material-icons-two-tone',
    icon: 'lock_open',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [],
  },


  // User Modules
  {
    path: '/user/dashboard',
    title: 'Dashboard',
    moduleName: 'dashboard',
    iconType: 'material-icons-two-tone',
    icon: 'home',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['User'],
    submenu: [],
  },

  // Patient Modules
  {
    path: '/patient/dashboard',
    title: 'Dashboard',
    moduleName: 'dashboard',
    iconType: 'material-icons-two-tone',
    icon: 'home',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Patient'],
    submenu: [],
  },
  // Common Modules
  {
    path: '',
    title: 'Extra Pages',
    moduleName: 'extra-pages',
    iconType: 'material-icons-two-tone',
    icon: 'description',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['Admin'],
    submenu: [
      {
        path: '/extra-pages/blank',
        title: 'Blank Page',
        moduleName: 'extra-pages',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },
  {
    path: '/authentication/signin',
    title: 'Logout',
    moduleName: 'logout',
    iconType: 'material-icons-two-tone',
    icon: 'power_settings_new',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['All'],
    submenu: [],
  },
];
