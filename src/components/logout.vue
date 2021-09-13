<template>
    <div>
        <msg v-if="isShowMsg" :buttons="buttons" icon="warn" title="操作失败" description="未登录的用户，请先登录"></msg>
    </div>
</template>]

<script>
import {Msg} from 'vux';
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            isShowMsg:false,
            buttons:[
                {
                    type:'primary',
                    text:'跳转到登录页面',
                    link:'/login'
                }
            ]
        }
    },
    name:"logout",
    components:{
        Msg
    },
    created() {
        if(false==this.$store.state.isLogin){
            this.isShowMsg=true
            return
        }
        this.mutationsLogOut()
        window.localStorage.clear();
        this.$router.push('/topiclist/all');
    },
    methods: {
        ...mapMutations(['mutationsLogOut'])
    },
}
</script>