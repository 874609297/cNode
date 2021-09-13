<template>
<div>
     <tab :ine-width="1">
        <tab-item @on-item-click="routeto" v-for="(item,index) in topics" :key="index" :selected="$route.path=='/topiclist/'+item.name" >{{item.desc}}</tab-item>
      </tab>
    <scroller @on-pulldown-loading="freshData" use-pulldown :pulldown-config="pulldownConfig" lock-x scrollbarY use-pullup :pullup-config="pullupConfig" height="-40" @on-pullup-loading="loadMore" ref="pullUp">
    <div>
        <group>
            <cell v-for="(item,index) in list" :key="index"  :is-link="true" :link="/topics/+item.id">
            <span slot="title" class="cell_title">
                <span class="author_avatar" slot="icon">
                    <img :src="item.author.avatar_url" alt="">
                </span>
                <span class="reply_cout">
                    {{item.reply_cout}} 
                </span>
                <span class="visit_count">
                    {{item.visit_count}}
                </span>
                <span v-if="item.top" class="top">
                    置顶
                </span>
                <span class="tab" v-if="$route.path=='/topiclist/all'">
                    {{getDescByTab(item.tab)}}
                </span>
                <span class="title">
                    {{item.title}}
                </span>
            </span>
            </cell>
        </group>
    </div>
    </scroller>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {Group,Cell,Scroller,Tab,TabItem} from 'vux';
export default {
    name:"topiclist",
    props:['name'],
    components:{
        Group,
        Cell,
        Scroller,
        Tab,
        TabItem
    },
    computed:{
        ...mapState(['topics'])
    },
    data:function(){
        return{
            list:[],
            //当前页
            page:1,
            //每一页多少条数据
            limit:15,
            pullupConfig:{
                content:"上拉加载更多",
                downContent:'松开进行加载',
                upContent:"上拉加载更多",
                loadingContent:"加载中"
            },
            pulldownConfig:{
                content:"下拉刷新",
                downContent:'松开进行加载',
                upContent:"下拉加载更多",
                loadingContent:"加载中"
            }
        }
    },
    watch:{
        $route:function(to,from){
            this.fectData()
        }
    },
    created() {
        this.fectData()
    },
    methods: {
        freshData:function(){
            var that=this;
            this.$http.get('/topics',{
                params:{
                    tab:this.name,
                    page:1,
                    limit:this.limit
                }
            }).then(function(res){
                if(res.data){
                    that.list=res.data.data
                    that.page=1
                   that.$refs.pullUp.donePulldown()
                }
            })
        },
         //点击时获取路由
    routeto(index){
      this.$router.push('/topiclist/'+this.topics[index].name).catch(error => error)
  },
        loadMore:function(){
            this.page=this.page+1
            //上拉刷新
            var that = this
            this.$http.get('/topics',{
            params:{
            tab:this.name,
            page:this.page,
            limit:this.limit
            }
            }).then(function(res){
            if(res.data.success){
            for(var i=0;i<res.data.data.length;i++){
                that.list.push(res.data.data[i])
                }
                //上拉刷新成功以后 手动结束上拉刷新过程
                //父组件中使用子组件 $ref 对象
                that.$refs.pullUp.donePullup()
            }
        });
        },
        fectData:function(){
            let that=this
            this.$http.get('/topics/',{params:{
                tab:this.name,
                page:this.page,
                limit:this.limit
            }}).then(function(res){
                if(res.data.success){
                    that.list=res.data.data;
                }
                // if(next){
                //     next()
                // }
            })
        },
        getDescByTab(tab){
            return this.$store.getters.getTopicDescByTab(tab);
        }
    }
}
</script>

<style lang="">
    .cell_title{
        font-size: .8rem;
    }
    .cell_title .reply_cout{
        color: #9e78c0;
    }
    .cell_title .visit_count{
        color: #b4b4b4;
    }
    .cell_title .top{
        background: #80bd01;
        padding: 2px 4px;
        border-radius: 3px;
        -webkit-border-radius:3px;
        -moz-border-radius:3px;
        -o-border-radius:3px;
        color: #ccc;
        font-size: 12px;
    }
    .cell_title .tab{
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    }
    .cell_title .author_avatar img{
    width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-right: 5px;
    }
</style>