export const menuItems = [
    {
        title: 'Tableau de bord',
        routerLink: '/',
        icon: 'fa-home',
        selected: false,
        expanded: false,
        order: 0
    },
    {
        title: 'Compte rendu d\'activité',
        routerLink: '/cra',
        icon: 'fa-calendar',
        selected: false,
        expanded: false,
        order: 200
    },
    {
        title: 'Paramètres',
        routerLink: '/settings',
        icon: 'fa-cog',
        selected: false,
        expanded: false,
        order: 300,
        subMenu: [
            {
                title: 'Projets',
                routerLink: '/settings/projects'
            },
            {
                title: 'Utilisateurs',
                routerLink: '/settings/users'
            }
        ]
    }
];
