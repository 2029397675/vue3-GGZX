<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 20px 0">
      <div v-if="scene === 0">
        <el-button
          :disabled="!categoryStore.c3Id"
          type="primary"
          icon="Plus"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0" :data="attrArr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            prop="attrName"
            width="250px"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row }">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 5px"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250px">
            <template #default="{ row }">
              <el-button
                type="warning"
                size="default"
                icon="Edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-button type="danger" size="default" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              v-model="attrParams.attrName"
              placeholder="请输入属性名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          :disabled="attrParams.attrName.trim() === ''"
          type="primary"
          icon="Plus"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button @click="cancel">取消</el-button>
        <el-table
          border
          style="margin: 10px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            type="index"
            width="200px"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值">
            <template #default="{ row, $index }">
              <el-input
                v-if="row.flag"
                :ref="(elInput: any) => (inputArr[$index] = elInput)"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                @blur="toLook(row, $index)"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row, $index }">
              <el-button type="warning">编辑</el-button>
              <el-button
                type="danger"
                @click="attrParams.attrValueList.splice($index, 1)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
          @click="save"
        >
          保存
        </el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, reactive, nextTick } from 'vue'
import { reqAttr, reqAddOrUpdateAttr } from '@/api/product/attr'
import type {
  AttrResponseData,
  AttrData,
  AttrValue
} from '@/api/product/attr/type'
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'

const categoryStore = useCategoryStore()
const scene = ref<number>(1) //场景
const attrArr = ref<AttrData[]>([])
const attrParams = reactive<AttrData>({
  attrName: '', //新增的属性值名字
  attrValueList: [
    //新增的属性值数组
    // {
    //   valueName: ''
    // }
  ],
  categoryId: '', //三级分类id
  categoryLevel: 3 //三级分类级别
})

//监听仓库三级分类id的变化
watch(
  () => categoryStore.c3Id,
  async newValue => {
    attrArr.value = [] //清空属性数据数组
    if (
      newValue === '' ||
      newValue === null ||
      newValue === undefined ||
      newValue === 0
    ) //三级分类id为空或者undefined或者0时，不请求属性数据
    {
      return
    }
    getAttr() //请求属性数据
  }
)
//场景0
//请求属性数据
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id) //请求属性数据
  if (res.code === 200) {
    attrArr.value = res.data
  }
}
//添加属性按钮方法
const addAttr = () => {
  //清空数据
  Object.assign(attrParams, {
    attrName: '', //新增的属性值名字
    attrValueList: [
      //新增的属性值数组
      // {
      //   valueName: ''
      // }
    ],
    categoryId: categoryStore.c3Id, //三级分类id
    categoryLevel: 3 //三级分类级别
  })
  scene.value = 1
}
//更新属性按钮方法
const updateAttr = (row: AttrData) => {
  scene.value = 1
  //将已有的属性对象赋值给属性参数对象(需要进行深拷贝)
  Object.assign(attrParams, structuredClone(row)) //将已有的属性对象赋值给属性参数对象
}
//场景1
//取消按钮方法
const cancel = () => {
  scene.value = 0
}
//添加属性值按钮方法
const addAttrValue = () => {
  //点击添加属性值按钮的时候，向属性值数组中添加一个新的属性值对象
  attrParams.attrValueList.push({
    valueName: '', //属性值名字
    flag: true //标识符
  })
  nextTick(() => {
    //聚焦到对应的组件实例el-input
    inputArr.value[inputArr.value.length - 1].focus()
  })
}
//保存按钮方法
const save = async () => {
  //发送请求
  const res = await reqAddOrUpdateAttr(attrParams) //发送请求
  //添加|更新属性
  if (res.code === 200) {
    scene.value = 0
    ElMessage.success(attrParams.id ? '更新属性成功' : '添加属性成功') //添加|更新属性成功
    getAttr() //请求属性数据
  } else {
    ElMessage.error(attrParams.id ? '更新属性失败' : '添加属性失败') //添加|更新属性失败
  }
}
//将属性值名称改为可查看状态
const toLook = (row: AttrValue, index: number) => {
  //判断属性值名称是否为空
  if (row.valueName.trim() === '') {
    //删除掉对应属性值为空的数组
    attrParams.attrValueList.splice(index, 1)
    ElMessage.error('属性值名称不能为空') //属性值名称不能为空
    return
  }
  const repeat = attrParams.attrValueList.find(item => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    attrParams.attrValueList.splice(index, 1)
    ElMessage.error('属性值名称不能重复') //属性值名称不能重复
    return
  }

  row.flag = false //将标识符改为不可查看状态
}
//将属性值名称改为可编辑状态
const toEdit = (row: AttrValue, index: number) => {
  row.flag = true //将标识符改为可编辑状态
  nextTick(() => {
    inputArr.value[index].focus()
  })
}
//准备一个数组存储对应的组件实例el-input
const inputArr = ref<any[]>([])
</script>

<style lang="scss" scoped></style>
