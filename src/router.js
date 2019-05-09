const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/table',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/table.vue'], resolve)
    },
    {
        path: '/card',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/card.vue'], resolve)
    },
    {
        path: '/care',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/care_s.vue'], resolve)
    },
    {
        path: '*',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/404.vue'], resolve)
    }
];
export default routers;