<template>
<indoor>
    <addbtn :btn="btn"></addbtn>
    <table class="list-table">
        <thead>
            <tr>
                <th>序号</th>
                <th>封面</th>
                <th>所属分类</th>
                <th>添加时间</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in list">
                <td>{{index+1}}</td>
                <td><img width="100" :src="Api.imgurl+item.cover" /></td>
                <td>{{item.docs[0].title}}</td>
                <td>{{$tool.formatDate(item.add_time)}}</td>
                <td>
                    <router-link :to="{ name:'caseEdit',params:{id:item._id} }">修改</router-link>
                    <button @click="del(item._id)">删除</button>
                </td>
            </tr>
        </tbody>
    </table>
    <loading v-show="loading" :loading="loading"></loading>
    <vue-tips v-if="tips" :tips.sync="tips"></vue-tips>
    <page ref="page" sub=10 v-if="rows>10" :rows.sync="rows"></page>
</indoor>
</template>

<script>
import addbtn from '../../commpents/meun/addbtn'
export default {
    components: {
        addbtn
    },
    data() {
        return {
            btn: [{
                type: 'link',
                url: {
                    name: 'caseadd'
                },
                name: '添加案例',
                class: 'btn-add-model'
            }],
            list: [],
            tips: '',
            rows: 0,
            loading: '',
            sort: ''
        }
    },
    watch: {
        '$route': function(to, from) {
            this.getData();
        }
    },
    created() {
        this.getData();
        let self = this;
        delete this.$root.uievent._events['delCase'];
        this.$root.uievent.$on('delCase', async function(deldata) {
            self.loading = "删除中";
            self.$store.commit('uiclose', {
                type: 'confirm'
            });
            let data = await this.$ajax.post(self.Api.caseDel, {
                data: deldata,
                token: this.$store.state.user.token
            });
            if (data.err_code == 200) {
                self.loading = "";
                self.tips = "删除成功";
                self.getData();
            } else {
                self.loading = "";
                self.tips = "删除失败，已经删除，或不存在";
            }
        })

    },
    methods: {
        async getData(page) {
            this.loading = "加载中…";
            let data = await this.$ajax.post(this.Api.caseList, {
                data: {
                    page: this.$route.query.page ? this.$route.query.page : 1,
                    num: 10
                },
                token: this.$store.state.user.token,
            });
            this.loading = false;
            let list = data.data;

            this.list = list.result;
            this.rows = list.count;
        },

        async del(id) {

        }
    },
    events: {}
};
</script>
