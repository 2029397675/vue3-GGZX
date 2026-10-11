<template>
  <div>
    <el-card>
      <el-table border style="margin: 10px 0" :data="skuArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="150px"
        ></el-table-column>
        <el-table-column
          label="名称"
          width="200px"
          show-overflow-tooltip
          prop="skuName"
        ></el-table-column>
        <el-table-column
          label="描述"
          width="200px"
          show-overflow-tooltip
          prop="skuDesc"
        ></el-table-column>
        <el-table-column label="图片" width="200px">
          <template #default="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="重量"
          width="200px"
          prop="weight"
        ></el-table-column>
        <el-table-column
          label="价格"
          width="200px"
          prop="price"
        ></el-table-column>
        <el-table-column label="操作" width="210px" fixed="right">
          <template #default="{ row }">
            <el-button type="info" size="small" icon="Bottom"></el-button>
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-button type="info" size="small" icon="InfoFilled"></el-button>
            <el-button type="danger" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 200, 300, 40]"
        :background="true"
        layout="prev, pager, next, jumper,sizes,total"
        :total="total"
        @current-change="getHasSku"
        @size-change="getHasSku"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqSkuList } from '@/api/product/sku'
import type { SkuData, SkuResponseData } from '@/api/product/sku/type' //引入接口类型

//分页器当前页码
const pageNo = ref<number>(1)
//分页器每页显示条数
const pageSize = ref<number>(10)
//分页器总条数
const total = ref<number>(0)
//SKU列表数据
const skuArr = ref<SkuData[]>([])
//组件挂载后获取数据
onMounted(() => {
  getHasSku()
})
//获取sku列表
const getHasSku = async (pager = 1) => {
  pageNo.value = pager

  const res: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (res.code === 200) {
    skuArr.value = res.data.records
    total.value = res.data.total
  }
}
</script>

<style lang="scss" scoped></style>
