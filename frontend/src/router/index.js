import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import ActorList from '../views/ActorList.vue'
import ActorDetails from '../views/ActorDetails.vue'
import ActorRegistration  from '../views/ActorRegistration.vue'
import ActorEdit from '../views/ActorEdit.vue'

import CategoryList from '../views/CategoryList.vue'
import CategoryDetails from '../views/CategoryDetails.vue'
import CategoryRegistration  from '../views/CategoryRegistration.vue'
import CategoryEdit from '../views/CategoryEdit.vue'

import MahasiswaList from '../views/MahasiswaList.vue'
import MahasiswaDetails from '../views/MahasiswaDetails.vue'
import MahasiswaRegistration from '../views/MahasiswaRegistration.vue'
import MahasiswaEdit from '../views/MahasiswaEdit.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
   //Router Dashboard
  {
    path: '/',
    
    component: Dashboard
  },
    //Router About
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

// Router Actor
  
  //Router List Actor
   {
    path: '/actor',
    component: ActorList
  },
   //Router List Mahasiswa
   {
    path: '/mahasiswa/:page',
    component: MahasiswaList
  },

  {
    path: '/mahasiswa/details/:id',
    component: MahasiswaDetails
  },

  
  {
    path: '/mahasiswaregistration',
    component: MahasiswaRegistration
  },

  
  {
    path: '/mahasiswa/edit/:id',
    component: MahasiswaEdit
  },

 


  //Router Details Actor
  {
    path: '/actor/details/:id/:first_name',
    component: ActorDetails
  },
  //Router Registration Actor
  {
    path: '/actor/register-new-actor',
    component: ActorRegistration

  },
  
  //Router Edit Actor
  {
    path: '/actor/edit/:id/:first_name',
    component:ActorEdit
  },

// Router Category
  //Router List Actor
{
  path: '/category',
  component: CategoryList
},  
 //Router Details Category
 {
  path: '/category/details/:id/:name',
  component: CategoryDetails
},
//Router Registration Category
{
  path: '/category/register-new-category',
  component: CategoryRegistration

},

//Router Edit Category
{
  path: '/category/edit/:id/:name',
  component:CategoryEdit
},

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
