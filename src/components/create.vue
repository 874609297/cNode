<template>
    <div>
        <h5>发表新话题</h5>
        <group>
            <selector ref="defaultValueRef"  title="类别" :options="opt" v-model="defaultValue"></selector>
            <x-textarea placeholder="标题" :max=200 v-model="title"></x-textarea>
        </group>
        <mavon-editor v-model="content"></mavon-editor>
        <x-button type="primary" @click.native="addTopic">添加新话题</x-button>
    </div>
</template>

<script>
import{XTextarea,Group,XButton,Selector} from 'vux';
import {mavonEditor} from 'mavon-editor' ;
import 'mavon-editor/dist/css/index.css';
export default {
    name:'create',
    components:{
        XTextarea,
        Group,
        XButton,
        Selector,
        mavonEditor
    },
    data() {
        return {
            opt:[
                {key:'dev',value:'开发'},
                {key:'share',value:'分享'},
                {key:'job',value:'招聘'},
                {key:'ask',value:'问答'}
            ],
            defaultValue:'dev',
            title:'',
            content:'',
        }
    },
    methods: {
        addTopic:function(){
            var that=this;
            this.$http.post('/topics',{
                title:this.title,
                content:this.content,
                tab:'dev',
                accesstoken:this.$store.state.accesstoken
            }).then(function(res){
                // console.log(res.data);
               if(res.data.success){
                   that.$router.push('/topiclist/dev');
               }
            })
        }
    },
}
</script>