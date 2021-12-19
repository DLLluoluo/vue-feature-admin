/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const featureRouter = {
  path: '/feature',
  component: Layout,
  redirect: '/feature/table-package',
  name: 'Feature',
  meta: {
    title: 'Feature',
    icon: 'el-icon-video-camera-solid'
  },
  children: [
    {
      path: 'table-package',
      component: () => import('@/views/feature/table-package/index'),
      name: 'Package-table',
      meta: { title: 'Package Table' }
    },
    {
      path: 'input-package',
      component: () => import('@/views/feature/input-package/index'),
      name: 'Package-input',
      meta: { title: 'Package Input' }
    },
  ]
}
export default featureRouter