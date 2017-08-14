import Vue from 'vue'
import VueRouter from 'vue-router'
import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'

Vue.use(VueBlu)
Vue.use(VueRouter)

const UserPosts = {
  template: ` <transition name="slide">
        <div>UserPosts : {{ $route.params }}</div>
        </transition>
        `
}

const UserHome = {
  template: `
    <div>HomePage : {{ $route.params }}</div>
    `
}

const UserProfile = {
  template: `
    <transition name="fade">
      <div>UserProfile : {{ $route.params }} </div>
    </transition>
    `
}

const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params }} </h2>
      <router-view></router-view>
    </div>
    `,
  watch: {

  }
}

const router = new VueRouter({
  routes: [
    {
      path: '/user/:username',

      component: User,
      children: [
        {
          path: '',
          component: UserHome

        },
        {
          // 当 /user/:id/profile 匹配成功,
          //   Userprofile 会被渲染在 User 的<router-view />中
          path: 'profile',
          name: 'profile_name',
          component: UserProfile
        },
        {
          // 当 /user/:id/profile 匹配成功,
          //   Userprofile 会被渲染在 User 的<router-view />中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
new Vue({
  router,
  methods: {
    router_to: function () {
      const address = '/user/alex/profile'
      console.log(address)
      // 字符串
      // router.push(address)
      // 对象
      // router.push({ path: address })
      // 命名的路由
      router.push(
        {
          name: 'profile_name',
          params: { userId: 123 }
        }
      )
    // 带查询参数，变成 /register?plan=private
    // router.push({ path: address, query: { plan: 'private' } })
    },
    router_back: function () {
      console.log('go()')
      router.go(-1)
    }
  }

}).$mount('#app')
