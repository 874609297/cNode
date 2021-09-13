<template>
  <div>
    <h6>测试actionsheet组件</h6>
    <actionsheet v-model="show" :menus="menus" show-cancel theme="android" @on-click-menu="myclick"></actionsheet>  
  </div>
</template>

<script>
import {Actionsheet} from 'vux';
export default {
  components:{
    Actionsheet
  },
  data:function(){
    return{
      show:true,
      menus:{
        menu1:'分享到朋友圈',
        menu2:'分享到微博'
      }
    }
  },
  methods: {
    myclick:function(menuKey, menuItem){
      console.log(menuKey);
      console.log(menuItem);
    }
  },
}
</script>

<style lang="">
  
</style>