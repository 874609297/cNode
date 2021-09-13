//状态管理
import vue from 'vue';
import vuex from 'vuex';
import mutations from './mutations.js';
import actions from './actions.js';
vue.use(vuex);

const store =new vuex.Store({
    //状态数据
    state:{
          //主题信息
    topics:[
        {name:'all',desc:'全部'},
        {name:'good',desc:'精华'},
        {name:'share',desc:'分享'},
        {name:'ask',desc:'问答'},
        {name:'job',desc:'招聘'},
        {name:'dev',desc:'测试'}
      ],
      //登录用户名
      loginname:'',
      //未登陆的更多菜单
      unLoginMoreMenus:{login:'登录'},
      //登陆后的更多菜单
      loginMoreMenus:{center:'个人中心',create:'发表新话题',message:'消息通知',logout:'退出'},
      //右侧是否显示
      isShowMore:false,
      //是否登录
      isLogin:false,
      //accesstoken码
      accesstoken:'',
      //登录用户id
      author_id:''
    },
    //状态属性的计算属性
    getters:{
      moreMenus:function(state){
        if(state.isLogin){
          return state.loginMoreMenus;
        }else{
          return state.unLoginMoreMenus;
        }
      },
      getTopicDescByTab:function(state){
        return function (tab){
          for(var index=0;index<state.topics.length;index++){
            if(state.topics[index].name==tab){
              return state.topics[index].desc
            }
          }
        }
      }
    },
    //模块化引入mutations 和 actions
    mutations,
    actions
});

export default store;