import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Tupas',
          route: '/dashboard',
          children: [
            { label: 'Tupa-C4', route: '/dashboard/tupa-04' },
            { label: 'Tupa-C5', route: '/dashboard/tupa-05' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/view-grid.svg',
          label: 'Generales',
          route: '/dashboard',
          children: [
            { label: 'Requisitos Andjuntos', route: '/dashboard/requisitos' },
            { label: 'Documento Resolutivo', route: '/dashboard/documentos' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Auth',
          route: '/auth',
          children: [
            { label: 'Sign up', route: '/auth/sign-up' },
            { label: 'Sign in', route: '/auth/sign-in' },
            { label: 'Forgot Password', route: '/auth/forgot-password' },
            { label: 'New Password', route: '/auth/new-password' },
            { label: 'Two Steps', route: '/auth/two-steps' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/shield-exclamation.svg',
          label: 'Erros',
          route: '/errors',
          children: [
            { label: '404', route: '/errors/404' },
            { label: '500', route: '/errors/500' },
          ],
        },
      ],
    },
    // {
    //   group: 'Collaboration',
    //   separator: true,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/download.svg',
    //       label: 'Download',
    //       route: '/download',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/gift.svg',
    //       label: 'Gift Card',
    //       route: '/gift',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/users.svg',
    //       label: 'Users',
    //       route: '/users',
    //     },
    //   ],
    // },
    // {
    //   group: 'Config',
    //   separator: false,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/cog.svg',
    //       label: 'Settings',
    //       route: '/settings',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/bell.svg',
    //       label: 'Notifications',
    //       route: '/gift',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/folder.svg',
    //       label: 'Folders',
    //       route: '/folders',
    //       children: [
    //         { label: 'Current Files', route: '/folders/current-files' },
    //         { label: 'Downloads', route: '/folders/download' },
    //         { label: 'Trash', route: '/folders/trash' },
    //       ],
    //     },
    //   ],
    // },
  ];
}
