<template>
  <div id="app">
    <div>
      <vm-back-top></vm-back-top>
      <x-header @on-click-title="routetoHome">
        cNode移动端社区
        <div slot="right" @click.prevent="showMore">
          <a href="" class="vux-header-more"></a>
          <badge v-if="badgeText" :text="badgeText"></badge>
        </div>
      </x-header>
          <actionsheet :menus=moreMenus v-model="isShowMore" @on-click-menu="handleclickMoreMenus"></actionsheet>
    </div>
    <router-view></router-view>
    
  </div>
</template>

<script>
import VmBackTop from 'vue-multiple-back-top'
import {XHeader,Actionsheet,Badge} from 'vux';
import {mapState,mapGetters,mapMutations} from 'vuex'
export default {
  name: 'app',
  data:function(){
    return{
    badgeText:''
    }
  },
  //组件创建完成后的回调函数 
  created() {
    let isLoin=window.localStorage.getItem("loginStaus");
    if(isLoin){
      this.mutationsLogin();
      this.mutationsLoginname(window.localStorage.getItem('loginname'));
      this.mutationsAccesstoken(window.localStorage.getItem('accesstoken'));
      this.mutationsAuthorId(window.localStorage.getItem('author_id'));
    }
    //采用定时操作获取未读消息个数
    if(this.isLoin){
      var that = this;
    this.getUnreadMsgCount()
    window.setInterval(function(){
      that.getUnreadMsgCount()
    },5*60*1000)   
    }
  },
  computed:{
    ...mapGetters(['moreMenus']),
    ...mapState(['topics','unLoginMoreMenus','loginMoreMenus','isLogin']),
    isShowMore:{
      get:function(){
        return this.$store.state.isShowMore;
      },
      set:function(nval){
        //触发 mutations 修改状态数据
        this.$store.commit('mutationsisShowMoreMeuns',nval)
      }
    }
  },
  components:{
    XHeader,
    Actionsheet,
    VmBackTop,
    Badge
  },
  methods: {
    ...mapMutations(['mutationsLogin','mutationsLoginname','mutationsAccesstoken','mutationsAuthorId']),
    //点击xheader 右侧显示菜单
    showMore:function(){
      //vuex中的状态数据不能被直接修改 只能使用mutations修改
      this.isShowMore=true;
    },
    handleclickMoreMenus:function(menuKey, menuItem){
      this.$router.push('/'+menuKey).catch(error => error)
    },
    //跳转主页
    routetoHome:function(){
      this.$router.push('/')
    },
    //获取服务器端未读消息个数
    getUnreadMsgCount:function(){
      var that =this;
      this.$http.get('/message/count/',{
        params:{
          accesstoken:this.$store.state.accesstoken
        }
      }).then(function(res){
        if(res.data.success){
          that.badgeText=res.data.data
        }
      })
    }
  },
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
