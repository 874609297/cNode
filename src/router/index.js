import Vue from 'vue'
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import login from '../components/login.vue';
import logout from '../components/logout.vue';
import center from '../components/center.vue';
import message from '../components/message.vue';
import TopicList from '../components/TopicList.vue';
import Topic from '../components/Topic.vue';
import User from '../components/User.vue';
import create from '../components/create.vue';
import Edit from '../components/Edit.vue';
Vue.use(VueRouter);

const routes=[
  //访问根路径时跳转到topiclist的路径 (路由重定向)
  {path:'/',redirect:'/topiclist/all'},
  {path:'/topiclist/:name',name:'topiclist',component:TopicList,props:true},
  {path:'/topics/:id',name:'topic',component:Topic,props:true},
  //登录操作的路由
  {path:'/user/:loginname',name:'User',component:User,props:true},
  {path:'/login',name:'login',component:login},
  {path:'/center',name:'center',component:center},
  {path:'/message',name:'message',component:message},
  {path:'/logout',name:'logout',component:logout},
  //发表新话题
  {path:'/create',name:'create',component:create},
  //编辑主题
  {path:'/topic/:id/edit',name:'edit',component:Edit,props:true}
];

const router =new VueRouter({
  routes:routes,
  mode:"hash"
})

export default router;