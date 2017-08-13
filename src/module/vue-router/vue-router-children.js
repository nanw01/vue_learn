import Vue from 'vue'
import VueRouter from 'vue-router'
import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'

Vue.use(VueBlu)
Vue.use(VueRouter)

const UserPosts = {
  template: `
        <div>UserPosts : {{ $route.params }}</div>
        `
}

const UserHome = {
  template: `
    <div>HomePage : {{ $route.params }}</div>
    `
}

const UserProfile = {
  template: `
    <div>UserProfile : {{ $route.params }} </div>
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
      console.log('router.push("/user/alex/profile")')
      router.push('/user/alex/profile')
    },
    router_back: function () {
      console.log('go()')
      router.go(-1)
    }
  }

}).$mount('#app')
