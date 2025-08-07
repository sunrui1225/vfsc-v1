const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  userId: state => state.user.userId,
  name: state => state.user.name,
  realName: state => state.user.realName,
  mobile: state => state.user.mobile,
  roleType: state => state.user.roleType,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  unreadMsg: state => state.user.unreadMsg,
  permission_routes: state => state.permission.routes,
  index: state => state.permission.indexPath,
  siteData: state => state.settings.siteData,
  routes: state => state.permission.routes
}
export default getters
