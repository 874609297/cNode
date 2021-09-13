<template>
    <div>
        <h5>用户登录</h5>
        <group>
            <x-input placeholder="AsseccToken" v-model="asseccToken"></x-input>
        </group>
        <x-button type="primary" @click.native="doLogin">登录</x-button>
        <toast type="text" v-model="isShow"> {{toastText}} </toast>
    </div>
</template>

<script>
import {XInput,Group,XButton,Toast} from 'vux';
import {mapMutations} from 'vuex';
export default {
    name:"login",
    components:{
        XInput,
        Group,
        XButton,
        Toast
    },
    data() {
        return {
            asseccToken:null,
            isShow:false,
            toastText:''
        }
    },
    methods: {
        ...mapMutations(['mutationsLogin','mutationsAccesstoken','mutationsAuthorId']),
        doLogin:function(){
            //用户登录操作
            let that=this;
            this.$http.post('/accesstoken',{accesstoken:this.asseccToken}).then(function(res){
                if(res&&res.data&&res.data.success==true){
                    that.mutationsLogin();
                    that.mutationsAccesstoken(that.asseccToken);
                    that.$router.push('/user/'+res.data.loginname);
                    that.mutationsAuthorId(res.data.id);
                    window.localStorage.setItem('loginStaus',true);
                    window.localStorage.setItem('accesstoken',that.asseccToken);
                    window.localStorage.setItem('loginname',res.data.loginname);
                    window.localStorage.setItem('author_id',res.data.id);
                }
            }).catch(function(error){
                // that.isShow=true;
                // that.toastText=error.res.data.error_msg
                // console.log(error.res);
            })
        }
    },
}
</script>