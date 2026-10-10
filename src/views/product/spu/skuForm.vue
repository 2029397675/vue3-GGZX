<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="sku名称">
        <el-input v-model="skuParams.skuName" placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          v-model="skuParams.price"
          type="number"
          placeholder="价格(元)"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input
          v-model="skuParams.weight"
          type="number"
          placeholder="重量(克)"
        ></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input
          v-model="skuParams.skuDesc"
          placeholder="SKU描述"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item
            v-for="(item, index) in attrArr"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select v-model="item.attrIdAndValueId" style="width: 200px">
              <el-option
                v-for="(attrValue, index) in item.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${item.id}:${attrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item
            v-for="item in saleArr"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select v-model="item.saleIdAndValueId" style="width: 200px">
              <el-option
                v-for="saleAttrValue in item.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :value="`${item.id}:${saleAttrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table ref="table" border :data="imgArr">
          <el-table-column
            type="selection"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column label="图片">
            <template #default="{ row, $index }">
              <img
                :src="row.imgUrl"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row, $index }">
              <el-button type="warning" size="small" @click="handler(row)">
                设置默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="default" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
//引入请求api
import { reqAttr } from '@/api/product/attr'
import {
  reqAddSku,
  reqSpuHasSaleAttr,
  reqSpuImageList
} from '@/api/product/spu'
import type { SkuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'

const emit = defineEmits(['changeScene'])
//取消按钮
const cancel = () => {
  emit('changeScene', { flag: 0, params: '' })
}
//保存按钮
const save = async () => {
  //整理参数
  // 平台属性
  skuParams.skuAttrValueList = attrArr.value.reduce((acc: any, cur: any) => {
    if (cur.attrIdAndValueId) {
      let [attrId, valueId] = cur.attrIdAndValueId.split(':')
      acc.push({
        attrId,
        valueId
      })
    }
    return acc
  }, [])
  //销售属性
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (acc: any, cur: any) => {
      if (cur.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = cur.saleIdAndValueId.split(':')
        acc.push({
          saleAttrId,
          saleAttrValueId
        })
      }
      return acc
    },
    []
  )
  //照片墙
  //发请求
  const res = await reqAddSku(skuParams)

  //成功
  if (res.code === 200) {
    ElMessage.success('添加SKU成功')
    //返回给父组件
    emit('changeScene', { flag: 1, params: '' })
  } else {
    //失败
    ElMessage.error('添加SKU失败')
  }
}
//获取table组件实例
const table = ref<any>()

//平台属性数据
const attrArr = ref<any>([])
//销售属性数据
const saleArr = ref<any>([])
//照片墙数据
const imgArr = ref<any>([])
//收集SKU的数据
const skuParams = reactive<SkuData>({
  //父组件传递过来的数据
  category3Id: '',
  spuID: '',
  tmId: '',
  //v-model收集的数据
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: ''
})

//初始化sku数据
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any
) => {
  //收集数据
  skuParams.category3Id = spu.category3Id
  skuParams.spuID = spu.id
  skuParams.tmId = spu.tmId

  //获取平台属性
  const res = await reqAttr(c1Id, c2Id, spu.category3Id)
  attrArr.value = res.data
  //获取对应的销售属性
  const res1 = await reqSpuHasSaleAttr(spu.id)
  saleArr.value = res1.data
  //获取照片墙的数据
  const res2 = await reqSpuImageList(spu.id)
  imgArr.value = res2.data
}
//设置默认图片的方法回调
const handler = (row: any) => {
  //表格复选框选中
  table.value.clearSelection()
  table.value.toggleRowSelection(row, true)

  skuParams.skuDefaultImg = row.imgUrl
}
//对外进行暴露的子组件方法
defineExpose({
  initSkuData
})
</script>

<style lang="scss" scoped></style>
