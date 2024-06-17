<template >
    <div class="app-container">
        <!-- 车主管理 -->
        <div class="set">
            <!-- 添加区域 -->
            <!-- 搜索 -->
            <div >
                <!-- <el-input v-model="serachData" placeholder="请输区域名称进行搜索" class='serachinput'></el-input> -->
                <el-form ref="form" :rules="rules" :model="ruleForm" label-width="80px" class="serach">
                
                    <el-form-item label="车牌" prop="carNumber">
                        <el-input v-model="serachForm.carNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="车主" prop="carOwnerName">
                        <el-input v-model="serachForm.carOwnerName"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="carTypeId">
                        <el-input v-model="serachForm.carTypeId"></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="deptId">
                        <el-input v-model="serachForm.deptId"></el-input>
                    </el-form-item>
                    <el-form-item label="车位号" prop="parkingSpaceId">
                        <el-input v-model="serachForm.parkingSpaceId"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="serachForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="accreditStatus">
                        <el-input v-model="serachForm.accreditStatus"></el-input>
                    </el-form-item>
                    <el-form-item label="余额" prop="balance">
                        <el-input v-model="serachForm.balance"></el-input>
                    </el-form-item>
                    <el-form-item  >
                        <el-button type="primary" >搜索</el-button>
                        <el-button type="primary" >重置</el-button>
                    </el-form-item>     
            </el-form>
            </div>
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
    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData:[],
            serachForm:{
                carTypeId:'',
                carNumber:'',
                deptId:'',
                parkingNum:'',
                parkingSpaceId:'',
                carOwnerPhone:'',
                carOwnerName:'',
                balance:'',
                accreditStatus:'',
                address:'',  
            },
            dialogFormVisible:false,
            ruleForm:{
            },
        } 
    }
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