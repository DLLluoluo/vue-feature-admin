<template>
  <div class="content-page">
    <h3>基于element UI的表格二次封装</h3>
    <div class="tab-content">
      <div class="ces-search">
        <elForm
          ref="refForm"
          :action="action"
          labelWidth="130px"
          :searchForm="searchForm"
          width="280px"
          :searchData="searchData"
          :searchHandle="searchHandle"
          :isHandle="true"
          :limit="limit"
          @uploadImg="uploadImg"
          @onExceedLimits="onExceedLimits"
          :imgList="searchData.picture"
          :rules="rules"
        ></elForm>
      </div>
    </div>
  </div>
</template>

<script>
import elForm from "@/components/Feature/input";
import { uploadFile, getMemberList } from "@/api/common";
export default {
  components: {
    elForm,
  },
  data() {
    let typeList = [
      { name: "批发", code: 1 },
      { name: "零售", code: 2 },
      { name: "餐饮", code: 3 },
    ];
    let statusList = [
      { label: "上线", value: 1 },
      { label: "待上线", value: 2 },
      { label: "下线", value: 3 },
    ];
    return {
      searchData: {
        projectName: "",
        introduce: "",
        Switch: false,
        type: "",
        status: 1,
        status1: 1,
        status2: [1, 2],
        date: "",
        time: "",
        dateTime: "",
        dateTimes: ["", ""],
        slider: 10,
        picture: "",
      },
      limit: 1,
      action: "/ImageServer/YmUpload_image",
      searchForm: [
        {
          label: "项目名称",
          prop: "projectName",
          type: "Input",
          placeholder: "请输入项目名称...",
          width: "320px",
        },
        {
          label: "项目描述",
          prop: "introduce",
          type: "Input",
          placeholder: "请输入项目描述...",
          width: "320px",
        },
        { label: "是否有营业", prop: "state", type: "Switch" },
        {
          label: "项目类型",
          prop: "type",
          type: "Select",
          placeholder: "请选择项目类型...",
          width: "320px",
          options: typeList,
          optionsLabel: "name",
          optionsValue: "code",
          change: this.typeChange,
        },
        {
          type: "RemoteSearch",
          label: "申请人",
          prop: "applyUser",
          placeholder: "请输入申请人",
          remoteSearchLabel: "nickname", //远程搜索list的label
          remoteSearchValue: "memberNo", //远程搜索list的value
          searchDataValue: "nickName", //外部搜索参数key名
          remoteSearchParamsKey: "nickName", //远程搜索list的api请求关键字
          remoteSearchApi: getMemberList, //远程搜索api
        },
        {
          label: "项目状态",
          prop: "status",
          type: "Radio",
          radios: statusList,
        },
        {
          label: "项目状态",
          prop: "status1",
          type: "RadioButton",
          radios: statusList,
        },
        {
          label: "项目状态",
          prop: "status2",
          type: "Checkbox",
          checkboxs: statusList,
        },
        {
          label: "日期",
          prop: "date",
          type: "Date",
          placeholder: "请选择日期...",
          width: "320px",
        },
        {
          label: "时间",
          prop: "time",
          type: "Time",
          placeholder: "请选择时间...",
          width: "320px",
        },
        {
          label: "日期时间",
          prop: "dateTime",
          type: "DateTime",
          placeholder: "请选择日期时间...",
          width: "320px",
        },
        {
          label: "日期范围",
          prop: "dateTimes",
          type: "datetimerange",
          placeholder: "请选择日期范围...",
          width: "320px",
        },
        { label: "进度", prop: "slider", type: "Slider" },
        { label: "照片", prop: "picture", type: "upload" },
      ],
      searchHandle: [
        //查询和重置按钮
        { label: "保存", type: "primary", size: "small", handle: this.save },
      ],
      rules: {
        projectName: [
          { required: true, message: "请输入项目名称...", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "请输入项目描述...", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择项目类型...", trigger: "change" },
        ],
        applyUser: [
          { required: true, message: "请选择申请人", trigger: "change" },
        ],
        state: [
          { required: true, message: "是否有营业...", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择项目状态...", trigger: "change" },
        ],
        status1: [
          { required: true, message: "请选择项目状态...", trigger: "change" },
        ],
        status2: [
          { required: true, message: "请选择项目状态...", trigger: "change" },
        ],
        date: [{ required: true, message: "请选择日期...", trigger: "change" }],
        time: [{ required: true, message: "请选择时间...", trigger: "change" }],
        dateTime: [
          { required: true, message: "请选择日期时间...", trigger: "change" },
        ],
        dateTimes: [
          { required: true, message: "请选择日期范围...", trigger: "change" },
        ],
      },
    };
  },
  mounted() {},
  props: ["imgList"],
  methods: {
    save() {
      console.log(this.searchData, "保存");
      console.log(this.$refs.refForm, "@111");
      this.$refs.refForm.$children[0].validate((valid) => {
        if (valid) {
          console.log("success submit!!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    uploadImg(file) {
      console.log(file);
      let imgUploadForm = new FormData();
      imgUploadForm.append("file", file.file);
      uploadFile(imgUploadForm).then((res) => {
        this.searchData.picture = res.fileUrl;
      });
    },
    onExceedLimits(file) {
      if (file.length >= 1) {
        this.$notify({
          title: "警告",
          message: "上传失败，一次只能上传1张图片哦~",
          type: "warning",
          duration: 2000,
        });
      }
    },
    typeChange(val) {
      console.log(val, "项目类型");
    },
  },
};
</script>

<style lang="scss" scoped>
.content-page {
  .tab-content {
    width: 100%;
    padding: 20px;
  }
}
</style>
