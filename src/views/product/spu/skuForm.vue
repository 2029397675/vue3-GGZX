<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="sku名称">
        <el-input placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input type="number" placeholder="价格(元)"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input type="number" placeholder="重量(克)"></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input placeholder="SKU描述" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item
            v-for="(item, index) in attrArr"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select style="width: 200px">
              <el-option
                v-for="(attrValue, index) in item.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="attrValue.id"
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
            <el-select style="width: 200px">
              <el-option
                v-for="saleAttrValue in item.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imgArr">
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
              <el-button type="warning" size="small">设置默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button type="default" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
//引入请求api
import { reqAttr } from '@/api/product/attr'
import { reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu'
import { ro } from 'element-plus/es/locale/index.mjs'
import { ref } from 'vue'
import { it } from 'vue-router/dist/index-BzEKChPW.js'

const emit = defineEmits(['changeScene'])
//取消按钮
const cancel = () => {
  emit('changeScene', { flag: 0, params: '' })
}

//平台属性数据
const attrArr = ref<any>([])
//销售属性数据
const saleArr = ref<any>([])
//照片墙数据
const imgArr = ref<any>([])

//初始化sku数据
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any
) => {
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
//对外进行暴露的子组件方法
defineExpose({
  initSkuData
})
</script>

<style lang="scss" scoped></style>
