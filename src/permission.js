import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

async function extracted(to, next) {
  if (to.path === '/login') {
    // if is logged in, redirect to the home page
    next({ path: '/' })
    NProgress.done()
  } else {
    // determine whether the user has obtained his permission roles through getInfo
    const hasRoles = store.getters.roles && store.getters.roles.length > 0
    if (hasRoles) {
      next()
    } else {
      try {
        // get user info
        // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
        const { roles } = await store.dispatch('user/getInfo')

        // generate accessible routes map based on roles
        const accessRoutes = await store.dispatch('permission/generateRoutes',
          roles)

        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true })
      } catch (error) {
        // remove token and go to login page to re-login
        await store.dispatch('user/resetToken')
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  }
}
function getQueryParam(url){
  var url = decodeURI(url); //获取url中"?"符后的字串
  var theRequest =new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(url.indexOf('?')+1);
    console.info(str)
   let strs = str.split("&");
    for(var i = 0; i <strs.length; i++) {
      theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }
  }
  console.info(theRequest)
  return theRequest;
}
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  getQueryParam(to.fullPath)
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    await extracted(to, next)
  } else {
    /* has no token*/
    // get user info
    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
    console.info(to.fullPath)
    var param = getQueryParam(to.fullPath)
    if (param && param.username && param.password) {
      console.info('参数存在，开始登录，，，，，，')
      await store.dispatch('user/login',{username:param.username,password:param.password})
      await extracted(to,next)
    }

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
