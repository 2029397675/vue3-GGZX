<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene"></Category>
    <el-card style="margin: 20px 0">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addSPU"
        >
          添加SPU
        </el-button>
        <!-- 展示已有的SPU数据 -->
        <el-table :data="records" style="margin: 10px 0" border>
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="100px"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
              ></el-button>
              <el-button
                type="warning"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu"
              ></el-button>
              <el-button
                type="info"
                size="small"
                icon="View"
                title="查看SPU"
              ></el-button>
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                title="删除SPU"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="getHasSpu"
          @size-change="changeSize"
        />
      </div>
      <!-- 添加|修改SPU -->
      <SpuForm v-show="scene == 1" @change-scene="changeScene"></SpuForm>
      <!-- 添加SKU的子组件 -->
      <SkuForm v-show="scene == 2"></SkuForm>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqHasSpu } from '@/api/product/spu'
import type { HasSpuResponseData, Records } from '@/api/product/spu/type'
//引入子组件
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'

const categoryStore = useCategoryStore()

//监听仓库三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    //保证三级分类id不为空
    if (!categoryStore.c3Id) return
    getHasSpu()
  }
)
//获取某三级分类id下的SPU列表
const getHasSpu = async (pager = 1) => {
  //修改分页器默认页码
  pageNo.value = pager
  //发送请求
  const res: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id
  )
  if (res.code === 200) {
    records.value = res.data.records
    total.value = res.data.total
  }
}
//场景的数据
const scene = ref<number>(0)
// #region 场景0（显示已有的SPU数据）

//存储已有的SPU列表
const records = ref<Records>([])
//存储已有的SPU的总数
const total = ref<number>(0)
//分页器默认页码
const pageNo = ref<number>(1)
//分页器默认每页条数
const pageSize = ref<number>(3)
//分页器每页条数变化时触发
const changeSize = () => {
  getHasSpu()
}
//添加新的SPU按钮事件
const addSPU = () => {
  //修改场景为添加SPU
  scene.value = 1
}
//子组件SpuForm绑定自定义事件
const changeScene = (num: number) => {
  //子组件SpuForm点击取消转换为场景0
  scene.value = num
}
//修改已有的SPU按钮事件
const updateSpu = () => {
  //修改场景为修改SPU
  scene.value = 1
}
// #endregion
// #region 场景1（添加|修改SPU）

// #endregion
// #region 场景2（添加SKU）
// #endregion
</script>

<style lang="scss" scoped></style>
