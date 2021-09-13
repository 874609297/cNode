<template>
    <div>
    </div>
</template>]

<script>
export default {
    name:"center",
    computed:{
        loginname:function(){
            return window.localStorage.getItem('loginname');
        }
    },
    created() {
        this.$router.replace('/user/'+this.loginname)
        console.log(this.loginname);
    },
}
</script>