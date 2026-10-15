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
            <el-button
              :type="row.isSale == 1 ? 'info' : 'success'"
              size="small"
              :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
              @click="updateSale(row)"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="edit"
            ></el-button>
            <el-button
              type="info"
              size="small"
              icon="InfoFilled"
              @click="findSku(row)"
            ></el-button>
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
      <!-- 抽屉组件 展示商品详情 -->
      <el-drawer v-model="drawer" direction="rtl">
        <template #header>
          <h4>查看商品详情</h4>
        </template>
        <template #default>
          <div>
            <el-row>
              <el-col :span="6">名称</el-col>
              <el-col :span="18">{{ skuInfo.skuName }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">描述</el-col>
              <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">价格</el-col>
              <el-col :span="18">{{ skuInfo.price }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">平台属性</el-col>
              <el-col :span="18">
                <el-tag v-for="item in skuInfo.skuAttrValueList" :key="item.id">
                  {{ item.valueName }}
                </el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">销售属性</el-col>
              <el-col :span="18">
                <el-tag
                  v-for="item in skuInfo.skuSaleAttrValueList"
                  :key="item.id"
                >
                  {{ item.saleAttrValueName }}
                </el-tag>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">商品图片</el-col>
              <el-col :span="18">
                <el-carousel :interval="4000" type="card" height="200px">
                  <el-carousel-item
                    v-for="item in skuInfo.skuImageList"
                    :key="item.id"
                  >
                    <img :src="item.imgUrl" alt="" />
                  </el-carousel-item>
                </el-carousel>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  reqCancelSaleSku,
  reqSaveSaleSku,
  reqSkuList,
  reqSkuInfo
} from '@/api/product/sku'
import type {
  SkuData,
  SkuInfoData,
  SkuResponseData
} from '@/api/product/sku/type' //引入接口类型
import { ElMessage } from 'element-plus'

//分页器当前页码
const pageNo = ref<number>(1)
//分页器每页显示条数
const pageSize = ref<number>(10)
//分页器总条数
const total = ref<number>(0)
//SKU列表数据
const skuArr = ref<SkuData[]>([])
//抽屉组件是否显示
const drawer = ref<boolean>(false)
const skuInfo = ref<SkuData>({})
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
//更新sku状态
const updateSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    await reqCancelSaleSku(row.id as number)
    ElMessage.success('下架成功')
  } else {
    await reqSaveSaleSku(row.id as number)
    ElMessage.success('上架成功')
  }
  getHasSku(pageNo.value) //更新后重新获取数据
}
//编辑sku
const edit = () => {
  ElMessage.success('程序正在研发中')
}
//查看商品详情
const findSku = async (row: SkuData) => {
  //控制抽屉组件显示
  drawer.value = true
  //获取商品详情的数据
  const res: SkuInfoData = await reqSkuInfo(row.id as number)
  if (res.code === 200) {
    skuInfo.value = res.data
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin: 10px 0;
  .el-tag {
    margin: 0 5px;
    margin-bottom: 5px;
  }
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
