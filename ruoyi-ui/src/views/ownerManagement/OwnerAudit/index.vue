<template >
    <div class="app-container">
        <!-- 车主管理 -->
        <div >
            <!-- 搜索 -->
            <div >       
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"  label-width="68px">
                <el-form-item label="车类id" prop="carTypeId">
                    <el-input
                    v-model="queryParams.carTypeId"
                    placeholder="请输入车类id"
                    clearable  
                    />
                </el-form-item>
                <el-form-item label="车牌" prop="carNumber">
                    <el-input
                    v-model="queryParams.carNumber"
                    placeholder="请输入车牌号码"
                    clearable
                    />
                </el-form-item>
                <el-form-item label="部门id" prop="deptId">
                    <el-input
                    v-model="queryParams.deptId"
                    placeholder="请输入部门id"
                    clearable
                    />
                </el-form-item>
                <el-form-item label="车位号" prop="prakingSpaceId">
                    <el-input
                    v-model="queryParams.prakingSpaceId"
                    placeholder="请输入车位号"
                    clearable
                    />
                </el-form-item>
                <el-form-item label="车主电话" prop="carOwnerPhone">
                    <el-input
                    v-model="queryParams.carOwnerPhone"
                    placeholder="请输入车主电话"
                    clearable
                    />
                </el-form-item>
                <el-form-item label="车主" prop="carOwnerName">
                    <el-input
                    v-model="queryParams.carOwnerName"
                    placeholder="请输入车主姓名"
                    clearable
                    />
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input
                    v-model="queryParams.address"
                    placeholder="请输入地址"
                    clearable
                    />
                </el-form-item>
                <el-form-item label="身份证" prop="idCard">
                    <el-input
                    v-model="queryParams.idCard"
                    placeholder="请输入身份证"
                    clearable
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="searchList">搜索</el-button> 
                    <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                </el-form-item>
                </el-form>
            </div>
            
            <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                @click="addOpen"
                v-hasPermi="['basic:basicCarOwner:add']"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="success"
                plain
                icon="el-icon-edit"
                size="mini"
      
                >车主导入</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini"
                >部门管理</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                type="warning"
                plain
                icon="el-icon-download"
                size="mini"
                >车位管理</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
            </el-row>
        </div>

        <!-- 列表 -->
        <div class="list">
            <el-table
            :data="tableData"
            height="250"
            style="width: 100%"
           >
                <el-table-column
                prop="areaCode"
                label="区域编号"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="areaName"
                label="区域名称"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="areaParking"
                label="区域车位"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="areaRemainPraking"
                label="区域余位"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="operate"
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="viewFun(scope.row)" type="text" size="small">余位校准</el-button>
                    <el-button @click="editFun(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteFun(scope.row)" type="text" size="small">删除</el-button>
                </template>

                </el-table-column>
        </el-table>
        </div>

        <!-- 新增编辑 -->
        <el-dialog title="添加区域" :visible.sync="dialogFormVisible" width="30%">
            <!-- 表单 -->
            <el-form ref="form" :rules="rules" :model="ruleForm" label-width="80px">
                <el-form-item label="区域编号" prop="areaCode">
                    <el-input v-model="ruleForm.areaCode"></el-input>
                </el-form-item>
                <el-form-item label="区域名称" prop="areaName">
                    <el-input v-model="ruleForm.areaName"></el-input>
                </el-form-item>
                <el-form-item label="区域车位" prop="areaParking">
                    <el-input v-model="ruleForm.areaParking"></el-input>
                </el-form-item>
                <el-form-item label="剩余车位" prop="areaRemainPraking">
                    <el-input v-model="ruleForm.areaRemainPraking"></el-input>
                </el-form-item>
              
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addArea" v-if="judge==='add'">确 定</el-button>
                <el-button type="primary" @click="editArea" v-if="judge==='edit'">确 定</el-button> -->
            </span>
        </el-dialog>

    </div>
</template>
<script>
import { listBasicCarOwner, getBasicCarOwner, delBasicCarOwner, addBasicCarOwner, updateBasicCarOwner } from "@/api/ownerManagement/basicCarType";
export default {
    data(){
        return{
             // 显示搜索条件
         showSearch: true,
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                carTypeId: null,
                carNumber: null,
                deptId: null,
                prakingSpaceId: null,
                carOwnerPhone: null,
                carOwnerName: null,
                address: null,
                idCard: null,
            },
            tableData:[],
            rules: {
            areaName: [
            { required: false, message: '请输入区域名称', trigger: 'blur' },
          ],
          areaParking: [
            { required: false, message: '请输入区域车位数', trigger: 'change' }
          ],
          areaRemainPraking: [
            { required: false, message: '请输入剩余车位数', trigger: 'change' }
          ],
        },
            dialogFormVisible:false,
            ruleForm:{
            },
        } 
    },
    created(){
    this.getList()
    },

    methods:{
    // 获取列表
    getList(){
        let params = {}
        if (this.serachForm) {
            params = Object.assign({}, params, { ...this.serachForm });
        }
        console.log("搜索",this.serachForm);
        console.log('par',params);
        listBasicCarOwner(params).then(res => {
                console.log('res',res)
                this.tableData = this.handleTree(res.data);
                console.log('this.tableData',this.tableData);
            }).catch(err => {
                // console.error('Error getting table list:', err);
            });
    },
    //查询
    searchList(){
        this.getList()
       
    },
    //重置
    resetQuery(){

    },
     //新建
     addOpen(){
        this.judge = 'add'
        this.open()
    },
    //打开对话框
    open(){
        this.ruleForm = {}; // 清空表单
        this.dialogFormVisible = true
    },




    },

}
</script>

<style lang="scss" scoped>
.set{
    display: flex;
    align-items: center; /* 垂直居中 */
    .addRegion{
        margin-right: 5px;
    }
    .serach{
        // margin-left: 50px;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        .serachinput{
            margin-right: 20px;
            width: 300px;
        }
    }
    
}
.list{
    margin-top: 20px;
}

</style>