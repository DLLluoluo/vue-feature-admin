<template>
  <div>
    <el-form
      class="form"
      ref="refForm"
      :model="searchData"
      :rules="rules"
      :size="size"
      :label-width="labelWidth"
      :hide-required-asterisk="isShowRequired"
      :width="width"
    >
      <el-form-item
        v-for="item in searchForm"
        :label="item.label"
        :key="item.prop"
        :prop="item.prop"
        class="formItem"
      >
        <!-- 输入框 -->
        <el-input
          v-if="item.type === 'Input'"
          v-model="searchData[item.prop]"
          size="mini"
          :style="{ width: item.width }"
          :placeholder="item.placeholder"
        ></el-input>
        <!-- 下拉框 -->
        <el-select
          v-if="item.type === 'Select'"
          v-model="searchData[item.prop]"
          size="mini"
          @change="item.change ? item.change(searchData[item.prop]) : null"
          :style="{ width: item.width }"
        >
          <el-option
            v-for="op in item.options"
            :label="op[item.optionsLabel] || op.label"
            :value="op[item.optionsValue] || op.value"
            :key="op[item.optionsValue] || op.value"
          ></el-option>
        </el-select>
        <!-- 远程搜索框 -->
        <el-autocomplete
          :disabled="item.disabled"
          v-if="item.type === 'RemoteSearch'"
          v-model="searchData[item.prop]"
          :fetch-suggestions="
            (queryString, cb) => {
              querySearchAsync(
                queryString,
                cb,
                item.remoteSearchApi,
                item.remoteSearchParamsKey,
                item.searchDataValue
              );
            }
          "
          :value-key="item.remoteSearchLabel"
          :placeholder="item.placeholder"
          @select="
            (i) => {
              handleRemoteSelect(
                i,
                item.remoteSearchValue,
                item.searchDataValue
              );
            }
          "
        ></el-autocomplete>
        <!-- 单选 -->
        <el-radio-group
          v-if="item.type === 'Radio'"
          v-model="searchData[item.prop]"
        >
          <el-radio
            v-for="ra in item.radios"
            :label="ra.value"
            :key="ra.value"
            >{{ ra.label }}</el-radio
          >
        </el-radio-group>
        <!-- 单选按钮 -->
        <el-radio-group
          v-if="item.type === 'RadioButton'"
          v-model="searchData[item.prop]"
          @change="item.change && item.change(searchData[item.prop])"
        >
          <el-radio-button
            v-for="ra in item.radios"
            :label="ra.value"
            :key="ra.value"
            >{{ ra.label }}</el-radio-button
          >
        </el-radio-group>
        <!-- 复选框 -->
        <el-checkbox-group
          v-if="item.type === 'Checkbox'"
          v-model="searchData[item.prop]"
        >
          <el-checkbox
            v-for="ch in item.checkboxs"
            :label="ch.value"
            :key="ch.value"
            >{{ ch.label }}</el-checkbox
          >
        </el-checkbox-group>
        <!-- 日期 -->
        <el-date-picker
          v-if="item.type === 'Date'"
          v-model="searchData[item.prop]"
        ></el-date-picker>
        <!-- 时间 -->
        <el-time-select
          v-if="item.type === 'Time'"
          v-model="searchData[item.prop]"
        ></el-time-select>
        <!-- 日期时间 -->
        <el-date-picker
          v-if="item.type === 'DateTime'"
          type="datetime"
          value-format=""
          v-model="searchData[item.prop]"
          :disabled="item.disable && item.disable(searchData[item.prop])"
        ></el-date-picker>
        <!-- 日期时间范围 -->
        <el-date-picker
          clearable
          value-format="yyyy-MM-dd HH:mm:ss"
          v-if="item.type === 'datetimerange'"
          type="datetimerange"
          v-model="searchData[item.prop]"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="
            (val) => {
              handleDateRangeDefault(val, item.prop);
            }
          "
        ></el-date-picker>
        <!-- 滑块 -->
        <el-slider
          v-if="item.type === 'Slider'"
          v-model="searchData[item.prop]"
        ></el-slider>
        <!-- 开关 -->
        <el-switch
          v-if="item.type === 'Switch'"
          v-model="searchData[item.prop]"
        ></el-switch>
        <!-- 上传照片 -->
        <el-upload
          v-if="item.type === 'upload'"
          ref="upload"
          :multiple="true"
          :action="action"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-exceed="onExceedLimit"
          :http-request="handleSuccess"
          :file-list="fileList"
          accept=".JPG, .png, .GIF"
          :limit="limit"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <!-- 按钮 -->
      <div v-if="isHandle">
        <el-form-item v-for="(item, index) in searchHandle" :key="index">
          <el-button
            :type="item.type"
            :size="item.size || size"
            @click="item.handle()"
            >{{ item.label }}</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    isHandle: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: "80px",
    },
    width: {
      type: String,
      default: "200px",
    },
    size: {
      type: String,
      default: "mini",
    },
    rules: {
      type: Object,
      default: function () {
        return {};
      },
    },
    searchForm: {
      type: Array,
      default: [],
    },
    searchHandle: {
      type: Array,
      default: () => [],
    },
    searchData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    limit: {
      type: Number,
    },
    action: String,
    imgList: String,
    isShowRequired: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    console.log(this.imgList);
  },
  watch: {
    imgList: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
        this.fileList = [];
        this.fileList.push({ url: this.imgList });
      },
      deep: true,
    },
  },
  data() {
    return {
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    // 远程搜索框————
    querySearchAsync(
      queryString = "",
      cb,
      remoteSearchApi,
      paramsKey,
      searchDataValue
    ) {
      // console.log(queryString, "关键字");
      if (queryString === "") {
        this.searchData[searchDataValue] = ""; //搜索关键字为空需要传递给后台的搜索值也为''
      }
      if (queryString !== undefined) {
        //值为undefined时不触发请求
        let results;
        remoteSearchApi({
          [paramsKey]: queryString,
        }).then((res) => {
          results = res.data;
          cb(results);
        });
      }
    },
    handleRemoteSelect(item, remoteSearchValue, searchDataValue) {
      this.searchData[searchDataValue] = item[remoteSearchValue]; //选中后赋值给需要传递给后台的搜索值
    },
    //处理范围选框默认值
    handleDateRangeDefault(val, prop) {
      if (!val) {
        this.$nextTick(() => {
          this.searchData[prop] = ["", ""];
        });
      }
    },
    handleSuccess(file) {
      this.$emit("uploadImg", file);
    },
    onExceedLimit(file) {
      this.$emit("onExceedLimits", file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  padding: 0 20px;
}
</style>
