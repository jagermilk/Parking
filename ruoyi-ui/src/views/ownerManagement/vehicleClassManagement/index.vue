<template>
    <!-- 车类管理 -->
    <div class="app-container">
        <div class="set">
            <!-- 添加区域 -->
            <el-button type="success" class="add"  @click="open">新增</el-button>
        </div>
        <!-- 列表 -->
        <div class="list">
            <el-table
            :data="tableData"
            height="250"
            style="width: 100%"
           >
                <el-table-column
                prop="areaCcarTypeNameode"
                label="车类名称"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="basicType"
                label="基础类型"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="totalPrakingNum"
                label="总车位"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="remainPrakingNum"
                label="余位"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="operate"
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="editFun(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteFun(scope.row)" type="text" size="small">删除</el-button>
                </template>

                </el-table-column>
        </el-table>
        </div>
        <!-- 新增表单 -->
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
                <el-form-item label="父区域ID" prop="parentId">
                    <treeselect v-model="ruleForm.parentId" :show-count="true" :options="menuOptions"  :normalizer="normalizer" class="treeSelect" />
                </el-form-item>
                <el-form-item label="部门ID" prop="deptId">
                    <el-select v-model="ruleForm.deptId" filterable placeholder="请选择" style="width: 100%;"> 
                        <el-option
                        v-for="item in dept"
                        :key="item.deptId"
                        :label="item.deptName"
                        :value="item.deptId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addArea">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import {getBasicCarType } from '@/api/ownerManagement/vehicleClassManagement'
import { listMenu } from "@/api/system/menu";
import { listDept } from '@/api/system/dept'
import { number } from 'echarts';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
components: { Treeselect },
data(){
    return {
        tableData:[],
        dept:[],
          // 菜单树选项
        menuOptions: [],
        ruleForm:{
            areaName: '',
            areaParking: '',
            areaRemainPraking: '',
            parentId: 0,
            deptId: null,
            areaCode: '',
        },
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
        dialogFormVisible: false,
    }
},
created(){
    this.getList()
},
methods:{
    // 获取列表
    getList(){
        let params = {}
        getBasicCarType(params).then(res => {
                console.log('re11s',res);
                this.tableData = res.rows
            }).catch(err => {
                console.error('Error getting table list:', err);
            });
    },
    //查询
    searchList(){
        this.getList()
    },
    //打开对话框
    open(){
        this.getTreeselect()
        this.dialogFormVisible = true
        listDept().then(res => {
            this.dept=res.data
        // this.deptOptions = this.handleTree(response.data, "deptId");
      });
    },
    // 添加区域
  async addArea(){
        const valid = await this.$refs.form.validate()
        console.log('form',this.ruleForm);
      if (!valid) {
        console.log('error submit!!');
        return false;
      }
      try {
        console.log('this.ruleForm',this.ruleForm);
        let params=this.ruleForm
        await addBasicArea(params).then(res => {
          console.log('res',res);
        })
        this.dialogFormVisible = false
        this.getList()
      } catch (error) {
        console.error('Error adding area:', error);
      }
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
        console.log('node',node);
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.menuId,
        label: node.menuName,
        children: node.children,
      };
    },
    //  /** 查询菜单下拉树结构 */
    async getTreeselect() {
      await listMenu().then((response) => {
        console.log('response',response);
        this.menuOptions=[]
        const menu = { menuId: 0, menuName: '主类目', children: [] };
        menu.children = this.handleTree(response.data, 'menuId');
        this.menuOptions.push(menu);
      });
    },
    //编辑
    editFun(){
    },
    //删除
    deleteFun(data){
    delBasicArea(data.id).then(res=>{
        this.getList()
    }).catch(err => {
            console.error('Error getting table list:', err);
        });
    },
    //余位校准
    viewFun(){

    }

}
}
</script>
<style lang="scss" scoped>
.set{
    display: flex;
    align-items: center; /* 垂直居中 */
    .add{
        margin-right: 5px;
    }
    .serach{
        margin-left: 50px;
        display: flex;
        .serachinput{
            margin-right: 20px;
            width: 300px;
        }
    }
}
.list{
    margin-top: 20px;
}
.addform{
    width: 300px;
    .form{
    input{
        width: 300px !important;
    }
}
}
</style>