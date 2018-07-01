<template>
  <div class="select-container">
    <div class="select-content">
      <div class="select-title">分类</div>
      <div class="select-body">
        <el-checkbox-group v-model="checkedCategories">
          <el-checkbox label="category1">
            <div class="prefix-span">
              <svg height="25px" width="25px">
                <use xlink:href="#chooseIcon1" fill="#e2e2e2" stroke="#e2e2e2" class="use-style"></use>
              </svg>
            </div>
            <div class="select-name">默认分类</div>
            <span class="select-number">个</span>
          </el-checkbox>
          <el-checkbox label="category2">
            <div class="prefix-span">
              <svg height="25px" width="25px">
                <use xlink:href="#chooseIcon2" fill="#e2e2e2" stroke="#e2e2e2" class="use-style"></use>
              </svg>
            </div>
            <div class="select-name">企业</div>
            <span class="select-number">个</span>
          </el-checkbox>
          <el-checkbox label="category3">
            <div class="prefix-span">
              <svg height="25px" width="25px">
                <use xlink:href="#chooseIcon3" fill="#e2e2e2" stroke="#e2e2e2" class="use-style"></use>
              </svg>
            </div>
            <div class="select-name">个人</div>
            <span class="select-number">个</span>
          </el-checkbox>
          <el-checkbox label="category4">
            <div class="prefix-span">
              <svg height="25px" width="25px">
                <use xlink:href="#chooseIcon3" fill="#e2e2e2" stroke="#e2e2e2" class="use-style"></use>
              </svg>
            </div>
            <div class="select-name">法人</div>
            <span class="select-number">个</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="select-content">
      <div class="select-title">颜色</div>
      <div class="select-body">
        <el-checkbox-group v-model="checkedTag">
          <el-checkbox label="tag1">
            <div class="prefix-span">
              <span class="color-block"></span>
            </div>
            <div class="select-name">待检查</div>
            <span class="select-number">个</span>
          </el-checkbox>
          <el-checkbox label="tag2">
            <div class="prefix-span">
              <span class="color-block"></span>
            </div>
            <div class="select-name">不合格</div>
            <span class="select-number">个</span>
          </el-checkbox>
          <el-checkbox label="tag3">
            <div class="prefix-span">
              <span class="color-block"></span>
            </div>
            <div class="select-name">合格</div>
            <span class="select-number">个</span>
          </el-checkbox>
          <el-checkbox label="tag4">
            <div class="prefix-span">
              <span class="color-block"></span>
            </div>
            <div class="select-name">待核查</div>
            <span class="select-number">个</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedCategories: ['category3', 'category2'],
      checkedTag: ['tag1', 'tag2']
    };
  },
}
</script>

<style>

</style>
