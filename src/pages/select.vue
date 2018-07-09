<template>
  <div class="select-container">
    <div class="select-content">
      <div class="select-title">分类</div>
      <div class="select-body">
        <el-checkbox-group v-model="newCheckedCategories">
          <el-checkbox label="默认分类">
            <div class="prefix-span">
              <svg height="16px" width="16px">
                <use xlink:href="#chooseIcon1" fill="#e2e2e2" stroke="#e2e2e2" class="use-style"></use>
              </svg>
            </div>
            <div class="select-name">默认分类</div>
            <span class="select-number">个</span>
          </el-checkbox>
          <el-checkbox label="企业">
            <div class="prefix-span">
              <svg height="16px" width="16px">
                <use xlink:href="#chooseIcon2" fill="#e2e2e2" stroke="#e2e2e2" class="use-style"></use>
              </svg>
            </div>
            <div class="select-name">企业</div>
            <span class="select-number">个</span>
          </el-checkbox>
          <el-checkbox label="个人">
            <div class="prefix-span">
              <svg height="16px" width="16px">
                <use xlink:href="#chooseIcon3" fill="#e2e2e2" stroke="#e2e2e2" class="use-style"></use>
              </svg>
            </div>
            <div class="select-name">个人</div>
            <span class="select-number">个</span>
          </el-checkbox>
          <el-checkbox label="法人">
            <div class="prefix-span">
              <svg height="16px" width="16px">
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
        <el-checkbox-group v-model="newCheckedTag">
          <el-checkbox label="待检查">
            <div class="prefix-span">
              <span class="color-block"></span>
            </div>
            <div class="select-name">待检查</div>
            <span class="select-number">个</span>
          </el-checkbox>
          <el-checkbox label="不合格">
            <div class="prefix-span">
              <span class="color-block"></span>
            </div>
            <div class="select-name">不合格</div>
            <span class="select-number">个</span>
          </el-checkbox>
          <el-checkbox label="合格">
            <div class="prefix-span">
              <span class="color-block"></span>
            </div>
            <div class="select-name">合格</div>
            <span class="select-number">个</span>
          </el-checkbox>
          <el-checkbox label="待核查">
            <div class="prefix-span">
              <span class="color-block"></span>
            </div>
            <div class="select-name">待核查</div>
            <span class="select-number">个</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="footer-btn-group">
      <el-button round class="orange-btn" @click="confirmSelect">确认</el-button>
      <el-button round @click="cancelSelect">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCheckedCategories: [],
      newCheckedTag: [],
      checkedCategories: [],
      checkedTag: [],

    };
  },
  mounted() {
    if(this.$router.currentRoute.params.checkedCategories){
      this.newCheckedCategories = this.$router.currentRoute.params.checkedCategories
      this.checkedCategories = this.$router.currentRoute.params.checkedCategories
    }
    if(this.$router.currentRoute.params.checkedTag){
      this.newCheckedTag = this.$router.currentRoute.params.checkedTag;
      this.checkedTag = this.$router.currentRoute.params.checkedTag;
    }
  },
  methods: {
    confirmSelect() {
      alert(this.newCheckedCategories,this.newCheckedTag);
      this.$router.push({
        name: 'adminMobile',
        params: {
          checkedCategories: this.newCheckedCategories,
          checkedTag:this.newCheckedTag
        }
      })
    },
    cancelSelect() {
      this.$router.push({
        name: 'adminMobile',
        params: {
          checkedCategories: this.checkedCategories,
          checkedTag:this.checkedTag
        }
      })
    }
  }
}
</script>

<style>

</style>
