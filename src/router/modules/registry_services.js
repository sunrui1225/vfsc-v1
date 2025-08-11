import Layout from '@/layout'

const registryServicesRouter = {
    path: '/registry-services',
    component: Layout,
    meta: {
        title: 'Registry Services',
        icon: 'registry-services'
    },
    children: [
        {
            path: 'register-search',
            component: () => import('@/views/registry-services/register-search.vue'),
            name: 'RegisterSearch',
            meta: { title: 'Register Search' }
        },
        {
            path: 'view-local-company/:id(\\d+)',
            component: () => import('@/views/registry-services/view-local-company.vue'),
            name: 'ViewLocalCompany',
            meta: { title: 'View Local Company', noCache: true, activeMenu: '/registry-services/register-search' },
            hidden: true
        },
        // {
        //     path: 'Register Role Search',
        //     component: () => import('@/views/registry-services/register-role-search.vue'),
        //     name: 'RegisterRoleSearch',
        //     meta: { title: 'Register Role Search' }
        // },
        {
            path: 'verify-document-code',
            component: () => import('@/views/registry-services/verify-document-code.vue'),
            name: 'VerifyDocumentCode',
            meta: { title: 'Verify Document Code' }
        }
    ]
}

export default registryServicesRouter