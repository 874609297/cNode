<template>
    <div>
        <div style="margin-top:10px;">
            <button-tab v-model="selector">
                <button-tab-item>
                    未读消息
                </button-tab-item>
                <button-tab-item>
                    以读消息
                </button-tab-item>
            </button-tab>
        </div>
        <group v-if="selector==0">
            <cell v-for="(item,index) in hasNotReadMsgs" :key="index">
                <span slot="title">
                    <a :href="'/#/user/'+item.author.loginname"> {{item.author.loginname}} </a>回复了您的
                    <a :href="'/#/topic/'+item.topic.id"> {{item.topic.title}} </a> 话题
                </span>
            </cell>
        </group>
        <group v-if="selector==1">
            <cell v-for="(item,index) in hasReadMsgs" :key="index">
                <span slot="title">
                    <a :href="'/#/user/'+item.author.loginname"> {{item.author.loginname}} </a>回复了您的
                    <a :href="'/#/topic/'+item.topic.id"> {{item.topic.title}} </a> 话题
                </span>
            </cell>
        </group>
    </div>
</template>]

<script>
import {ButtonTab,ButtonTabItem,Group,Cell} from 'vux'
export default {
    name:"message",
    components:{
        ButtonTab,
        ButtonTabItem,
        Group,
        Cell
    },
    data() {
        return {
            selector:0,
            hasReadMsgs:null,
            hasNotReadMsgs:null
        }
    },
    created() {
        //ajax获取消息数据
        var that = this;
        this.$http.get('/messages',{
            params:{
                accesstoken:this.$store.state.accesstoken
            }
        }).then(function(res){
            if(res.data){
                that.hasReadMsgs=res.data.has_read_messages;
                that.hasNotReadMsgs=res.data.hasnot_read_messages;
            }
        })
    },
}
</script>