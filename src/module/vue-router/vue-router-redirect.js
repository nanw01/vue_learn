import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = { template: '<router-view></router-view>' }
const Default = { template: '<div>default</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Baz = { template: '<div>baz</div>' }
const WithParams = { template: '<div>{{ $route.params.id }}</div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: Default
        },
        {
          path: 'foo',
          component: Foo
        },
        {
          path: 'bar',
          component: Bar
        },
        {
          path: 'baz',
          name: 'baz',
          component: Baz
        },
        {
          path: 'with-params/:id',
          component: WithParams
        },
        // relative redirect to a sibling route
        {
          path: 'relative-redirect',
          redirect: 'foo'
        }
      ]
    },
    // absolute redirect
    { path: '/absolute-redirect', redirect: '/bar' },
    // dynamic redirect, note that the target route `to` is available for the redirect function
    { path: '/dynamic-redirect/:id?',
      redirect: to => {
        const { hash, params, query } = to
        if (query.to === 'foo') {
          return { path: '/foo', query: null }
        }
        if (hash === '#baz') {
          return { name: 'baz', hash: '' }
        }
        if (params.id) {
          return '/with-params/:id'
        } else {
          return '/bar'
        }
      }
    },
    // named redirect
    {
      path: '/named-redirect',
      redirect: { name: 'baz' }
    },

    // redirect with params
    {
      path: '/redirect-with-params/:id',
      redirect: '/with-params/:id'
    },

    // catch all redirect
    {
      path: '*',
      redirect: '/'
    }
  ]
})

new Vue({
  router,
  data: {

  }
}).$mount('#app')
