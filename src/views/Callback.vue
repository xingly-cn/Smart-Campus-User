<template>
  <div class="home">
    <div style="background: #eee; padding: 20px;opacity:.8">
      

         <div id="loginDiv">
             
                <form action="" id="form">
                    <h1 style="text-align: center;color: aliceblue; margin-bottom:50px">意见反馈</h1>
                    <div>
                        <Input v-model="title" type="text"  placeholder="标题"></Input>
                        <p style="margin-top:25px"></p>
                        <Input v-model="content" type="textarea" :autosize="{minRows: 2,maxRows: 10}" placeholder="您的宝贵意见"></Input>
                    </div>
        
                    <div style="text-align: center;margin-top: 30px;">
                         <Button size="large" type="info" @click="submit">提交</Button>
                         <Button size="large" type="error" @click="clear" style="margin-left:20px">重置</Button>
                    </div>
                 </form>
            </div>

          
    </div>
  </div>
</template>

<script>
import * as good from "@/api/good";
export default {
  mounted() {},
  data() {
    return {
        title: '',
        content: ''
    };
  },
  methods: {
      clear() {
          this.title = ''
          this.content = ''
      },
      submit() {
          good.addBack({title:this.title,content:this.content}).then(res => {
              this.$Message.success('反馈' + res.message);
          })
      }
  },
};
</script>

<style>
.home {
  /* background-color: aqua; */
  width: 50%;
  min-width: 500px;
  max-width: 1500px;
  margin: 0 auto;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 16px;
}

.flex {
  display: flex;
  align-items: center;
}

.flex-end {
  display: flex;
  justify-content: flex-end;
}
        #form {
            width: 70%;
        }
         
        #loginDiv {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 500px;
            background-color: rgba(75, 81, 95, 0.3);
            border-radius: 5px;
        }
         
        .button {
            border-color: cornsilk;
            background-color: rgba(100, 149, 237, .7);
            color: aliceblue;
            border-style: hidden;
            border-radius: 5px;
            width: 100px;
            height: 31px;
            font-size: 16px;
        }

</style>