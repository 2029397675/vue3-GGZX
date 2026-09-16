<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        v-model="SpuParams.spuName"
        placeholder="请输入SPU名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId">
        <el-option
          v-for="item in allTrademark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        v-model="SpuParams.description"
        type="textarea"
        placeholder="请输入SPU描述"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        v-model:file-list="imgList as UploadUserFile[]"
        action="api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handleUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          style="width: 100%; height: 100%"
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="saleAttrIdAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '无'
        "
        style="width: 200px"
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        :disabled="!saleAttrIdAndValueName"
        style="margin-left: 10px"
        type="primary"
        icon="Plus"
        @click="addSaleAttr"
      >
        添加属性
      </el-button>
      <!-- tanle展示销售属性与属性值 -->
      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
        <el-table-column label="属性值">
          <template #default="{ row }">
            <el-tag
              v-for="tag in row.spuSaleAttrValueList"
              :key="tag.id"
              closable
              :type="tag.type"
              style="margin-left: 5px"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>

            <el-button
              style="margin-left: 5px"
              type="success"
              size="small"
              icon="Plus"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #default="{ row, $index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ElMessage, type UploadUserFile } from 'element-plus' //导入上传组件的类型
import { ref, computed } from 'vue'
import {
  reqAllSaleAttr,
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr
} from '@/api/product/spu'
import type {
  SpuData,
  AllTrademark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  Trademark,
  SpuImage,
  SaleAttr,
  HasSaleAttr
} from '@/api/product/spu/type'

//父组件的自定义事件
const emit = defineEmits(['changeScene'])
//点击取消按钮
const cancel = () => {
  emit('changeScene', 0)
}
//控制对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
//对话框中预览图片的URL
const dialogImageUrl = ref<string>('123') //图片URL
//存放数据
const allTrademark = ref<Trademark[]>([])
const imgList = ref<SpuImage[]>([])
const saleAttr = ref<SaleAttr[]>([])
const allSaleAttr = ref<HasSaleAttr[]>([])
//存储已有的SPU对象
const SpuParams = ref<SpuData>({
  category3Id: '', //分类三级ID
  spuName: '', //SPU名称
  description: '', //SPU描述
  tmId: '', //品牌ID
  spuImageList: [], //商品图片列表
  spuSaleAttrList: [] //商品销售属性列表
})
//收集还未选择属性的id和name
const saleAttrIdAndValueName = ref<string>('')
//子组件方法
const initHasSpuData = async (spu: SpuData) => {
  //存储已有的SPU对象，以便在模版中展示
  SpuParams.value = spu
  //spu即为父组件传递过来的已有的SPU对象（不完整）
  //获取全部品牌的数据
  const res: AllTrademark = await reqAllTradeMark()
  allTrademark.value = res.data
  //获取某个SPU下商品图片的数据
  const res1: SpuHasImg = await reqSpuImageList(spu.id as number)
  imgList.value = res1.data.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  })
  //获取已有SPU下商品销售属性的数据
  const res2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  saleAttr.value = res2.data
  //获取全部的销售属性
  const res3: HasSaleAttrResponseData = await reqAllSaleAttr()
  allSaleAttr.value = res3.data
}
//照片墙点击预览按钮事件
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url

  dialogVisible.value = true
}
//照片墙点击删除按钮事件
const handleRemove = (file: any) => {}
//照片墙上传图片前的事件
const handleUpload = (file: any) => {
  if (file.type == 'image/jpeg' || file.type == 'image/png') {
    return true
  } else {
    ElMessage({
      type: 'error',
      message: '上传的文件格式只能是jpeg或png'
    })
    return false
  }
}
//计算出当前SPU还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  //全部的销售属性：颜色、尺寸、版本0
  let unSelectAttr = allSaleAttr.value.filter(item => {
    return saleAttr.value.every(saleItem => {
      return item.name != saleItem.saleAttrName
    })
  })
  return unSelectAttr
})
//添加销售属性的方法
const addSaleAttr = () => {
  //结构成服务器需要的格式
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId: Number(baseSaleAttrId),
    saleAttrName: saleAttrName,
    spuSaleAttrValueList: []
  }
  //追加到数组中
  saleAttr.value.push(newSaleAttr)
  //清空输入框
  saleAttrIdAndValueName.value = ''
}

defineExpose({ initHasSpuData })
</script>

<style lang="scss" scoped></style>
