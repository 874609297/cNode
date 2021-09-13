<template>
    <div v-if="topic">
        <article class="weui-article">
            <h1>{{topic.title}}
                <x-button :link="'/topic/'+topic.id+'/edit'" :mini="true" type="primary" v-if="topic.author_id==$store.state.author_id">编辑</x-button>
                <x-button @click.native="collect" v-if="topic.is_collect==false" :mini='true'  type="primary">收藏</x-button>
                <x-button @click.native="noCollect" v-else :mini='true'  type="default">取消收藏</x-button>
            </h1>
            <section>
                <span>作者<a :href="'/#/user/'+topic.author.loginname"> {{topic.author.loginname}}</a> </span>
                <span> {{topic.visit_count}}次浏览</span><span><a :href="'/#/topiclist/'+topic.tab">来自{{getDescByTab(topic.tab)}}</a></span>
            </section>
            <hr>
            <section  v-html="topic.content"></section>
        </article>
        <group>
            <cell-box v-for="(item,index) in topic.replies" :key="index">
               <flexbox>
                <flexbox-item :span="1/10">
                <img :src="item.author.avatar_url" alt="" style="width:30px;height:30px;">
                </flexbox-item>
                <flexbox-item>
                    <section>
                        <div>
                            <a :href="'/#/user/'+item.author.loginname">{{item.author.loginname}}</a>
                            {{index+1}}楼
                        </div>
                        <div v-html="item.content"></div>
                    </section>
                </flexbox-item>
                <flexbox-item :span="1/4">
                <span>
                    <wechat-emotion>强</wechat-emotion>
                    {{item.ups.length}} 
                </span>
                <span v-if="isLogin">回复</span>
                </flexbox-item>
                </flexbox> 
            </cell-box>
        </group>
        <group>
            <x-textarea placeholder="评论内容" v-model="content"></x-textarea>
            <x-button  @click.native="addreply(1)" type="primary">回复</x-button>
        </group>
    </div>
</template>

<script>
import {CellBox,Group,Flexbox,FlexboxItem,WechatEmotion,XTextarea,XButton} from 'vux';
import {mapState} from 'vuex';
export default {
    name:'topic',
    props:['id'],
    data:function(){
        return{
           topic:null,
           content:''
        }
    },
    computed:{
        ...mapState(['isLogin'])
    },
    components:{
        CellBox,
        Group,
        Flexbox,
        FlexboxItem,
        WechatEmotion,
        XTextarea,
        XButton
    },
    watch:{
        $route:function(to,from){
            this.fectData(to.params.id)
        }
    },
    created() {
        this.fectData()
    },
    methods: {
        fectData:function(next){
            let that=this
            this.$http.get('/topic/' + this.$route.params.id,{
                params:{
                    accesstoken:that.$store.state.accesstoken
                }
            }).then(function(res){
                if(res.data.success){
                    that.topic=res.data.data;
                }
                if(next){
                    next()
                }
            })
        },
        //过滤标题
         getDescByTab(tab){
            return this.$store.getters.getTopicDescByTab(tab);
        },
        //回复主题
        addreply:function(replyTab){
            //若replyTab为1 则回复主话题
            var that =this;
            this.$http.post('/topic/'+this.topic.id+'/replies',{
                accesstoken:this.$store.state.accesstoken,
                content:this.content
            }).then(function(res){
                // console.log(res.data);
                if(res.data&&res.data.success){
                    // var reply={
                    //     "id":res.data.reply_id,
                    //     "author":{
                    //         "loginname":that.store.state.loginname
                    //     }
                    // }
                }
            })
        },
        //收藏功能
        collect:function(){
            var that =this;
            this.$http.post('/topic_collect/collect',{
                accesstoken:that.$store.state.accesstoken,
                topic_id:that.topic.id
            }).then(function(res){
                if(res.data&&res.data.success){
                    that.topic.is_collect=true
                }
            })
        },
        //取消收藏
        noCollect:function(){
            var that =this;
            this.$http.post('/topic_collect/de_collect',{
                accesstoken:that.$store.state.accesstoken,
                topic_id:that.topic.id
            }).then(function(res){
                if(res.data&&res.data.success){
                    that.topic.is_collect=false
                }
            })
        }
    },
}
</script>

<style lang="less">
    @import '~vux/src/styles/weui/weui.less';
</style>