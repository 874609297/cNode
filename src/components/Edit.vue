<template>
    <div>
        <h5>编辑话题</h5>
        <group>
            <x-textarea placeholder="标题" :max=200 v-model="topic.title"></x-textarea>
        </group>
         <mavon-editor v-model="topic.content"></mavon-editor>
        <x-button type="primary" @click.native="editTopic">修改话题</x-button>
    </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor' ;
import 'mavon-editor/dist/css/index.css';
import{XTextarea,Group,XButton,Selector} from 'vux'
export default {
    name:'Edit',
    props:['id'],
    components:{
        XTextarea,
        Group,
        XButton,
        Selector,
        mavonEditor
    },
    data() {
        return {
            topic:{
                title:'',
                content:''
            }
        }
    },
    methods: {
        //修改话题
        editTopic:function(){
            var that = this;
            this.$http.post('/topics/update',{
                topic_id:this.topic.id,
                title:this.topic.title,
                content:this.topic.content,
                accesstoken:this.$store.state.accesstoken,
                tab:'dev'
            }).then(function(res){
                console.log(res);
                that.$router.go(-1);
            })
        },
        fechData:function(){
            var that = this;
            this.$http.get('/topic/'+this.id).then(function(res){
                that.topic=res.data.data
            })
        }
    },
    created() {
        this.fechData()
    },
}
</script>