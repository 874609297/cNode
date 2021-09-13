const mutations ={
    mutationsisShowMoreMeuns:function(state,playload){
        state.isShowMore=playload
    },
    //用户登录操作
    mutationsLogin:function(state){
        state.isLogin=true
    },
    //修改用户名
    mutationsLoginname:function(state,playload){
        state.loginname=playload
    },
    //修改accesstoken
    mutationsAccesstoken:function(state,playload){
        state.accesstoken=playload
    },
    //用户注销
    mutationsLogOut:function(state){
        state.isLogin=false;
        state.loginname='';
        state.accesstoken='';
    },
    mutationsAuthorId:function(state,playload){
        state.author_id=playload
    }
}

export default mutations;