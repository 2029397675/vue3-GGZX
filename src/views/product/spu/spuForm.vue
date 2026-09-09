<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select>
        <el-option label="品牌1" value="1"></el-option>
        <el-option label="品牌2" value="2"></el-option>
        <el-option label="品牌3" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
        <el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select style="width: 200px">
        <el-option label="品牌1" value="1"></el-option>
        <el-option label="品牌2" value="2"></el-option>
        <el-option label="品牌3" value="3"></el-option>
      </el-select>
      <el-button style="margin-left: 10px" type="primary" icon="Plus">
        添加销售属性
      </el-button>
      <!-- tanle展示销售属性与属性值 -->
      <el-table border style="margin: 10px 0">
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="属性名"></el-table-column>
        <el-table-column label="属性值"></el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
//父组件的自定义事件
const emit = defineEmits(['changeScene'])
//点击取消按钮
const cancel = () => {
  emit('changeScene', 0)
}
</script>

<style lang="scss" scoped></style>
