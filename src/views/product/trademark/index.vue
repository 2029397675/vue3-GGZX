<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button type="primary" icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>
      <!-- 表格组件：用于展示已有的平台数据 -->
      <el-table class="el-table" border :data="trademarkArr">
        <el-table-column
          prop="date"
          label="序号"
          align="center"
          width="80"
          type="index"
        />
        <el-table-column label="品牌名称" width="180">
          <template #default="{ row }">{{ row.tmName }}</template>
        </el-table-column>
        <el-table-column label="品牌LOGO" width="180">
          <template #default="{ row }">
            <img
              :src="row.logoUrl"
              alt="图片无法显示"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark"
            ></el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="deleteTrademark"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件：用于分页展示数据 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        size="large"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @change="getHasTrademark"
      />
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog v-model="dialogFormVisible" title="添加品牌" width="500">
      <!-- 表单组件：用于进行添加或更新品牌 -->
      <el-form style="width: 80%">
        <el-form-item label="品牌名称" label-width="80px">
          <el-input placeholder="请您输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 对话框底部按钮 -->
      <template #footer>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
// 分页组件的参数
//1. 当前页码
const pageNo = ref<number>(1)
//2. 每页显示的条数
const limit = ref<number>(3)
//3. 品牌数据总数
const total = ref<number>(0)
//4. 存储获取的品牌数据
const trademarkArr = ref([])
// 请求品牌数据
const getHasTrademark = async () => {
  const res = await reqHasTrademark(pageNo.value, limit.value)
  if (res.code === 200) {
    total.value = res.data.total // 设置品牌数据总数
    trademarkArr.value = res.data.records
  }
}
// 页面加载时获取品牌数据
//1. 获取品牌数据
onMounted(() => {
  getHasTrademark()
})
// 对话框组件的参数
//1. 对话框是否显示
const dialogFormVisible = ref<boolean>(false)
// 添加品牌按钮的点击事件
const addTrademark = () => {
  dialogFormVisible.value = true
}
// 更新品牌按钮的点击事件
const updateTrademark = () => {
  dialogFormVisible.value = true
}
// 删除品牌按钮的点击事件
const deleteTrademark = () => {
  dialogFormVisible.value = true
}
// 对话框取消按钮的点击事件
const cancel = () => {
  dialogFormVisible.value = false
}
// 对话框确认按钮的点击事件
const confirm = () => {
  dialogFormVisible.value = false
}
</script>

<style lang="scss" scoped>
.el-table {
  margin: 10px 0;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
