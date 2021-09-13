<template>
    <div v-if="userInfo">
        <card :header="{title:userInfo.loginname}" :footer="{title:userInfo.create_at}">
            <div slot="content" class="car_content">
                <p>
                    <img :src="userInfo.avatar_url" alt="">
                </p>
                <p>
                    用户积分:{{userInfo.score}}
                </p>
                <p>
                    <a href="/#/collect">{{collect.length}}个话题被收藏</a>
                </p>
                <p>
                    <a :href="'https://github.com/'+userInfo.githubUsername">@{{userInfo.githubUsername}}</a>
                </p>
            </div>
        </card>
        <card :header="{title:'最近发表的话题'}">
            <group slot="content">
                <cell v-for="(item,index) in userInfo.recent_topics" :key="index" :title="item.title" is-link :link="'/topics/'+item.id"></cell>
            </group>
        </card>
    </div>
</template>

<script>
import {Card,Group,Cell} from 'vux';
export default {
    name:'user',
    props:['loginname'],
    data() {
        return {
            userInfo:null,
            collect:[]
        }
    },
    components:{
        Card,
        Group,
        Cell
    },
    methods: {
        fectData:function(){
            var that=this;
            this.$http.get('/user/'+that.loginname).then(function(res){
                that.userInfo=res.data.data
            })
            this.$http.get('/topic_collect/' + that.loginname).then(function(res){
                that.collect=res.data.data
            })
        }
    },
    created() {
        this.fectData()
    },
}
</script>

<style lang="">
    .car_content p{
        padding: 20px;
        color: #ccc;
    }
    .cart_content img{
        width: 60px;
        height: 60px;
    }
</style>