//输入型组件
export const inputComponents = [
  {
    _config_: {
      layout: 'colItem',
      label: '单行文本',
      tag: "el-input",
      tagIcon: "input",
      defaultValue: undefined,
    }
  },
  {
    _config_: {
      layout: 'colItem',
      label: '多行文本',
      tag: "el-input",
      tagIcon: "textarea",
      type: "textarea"
    },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '密码',
      tag: "el-input",
      tagIcon: "password",
      type: "password"
    },
    'show-password': true,
  },
  {
    _config_: {
      layout: 'colItem',
      label: '计数器',
      tag: "el-input-number",
      tagIcon: "number",
    },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '编辑器',
      tag: "el-input",
      tagIcon: "rich-text",
      type: "textarea"
    },
  },
]

//选择项组件
export const selectComponents = [
  {
    _config_: {
      layout: 'colItem',
      label: '下拉选择',
      tag: "el-select",
      tagIcon: "select",
    },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '级联选择',
      tag: "el-cascader",
      tagIcon: "cascader",
    },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '单选框组',
      tag: "el-radio-group",
      tagIcon: "radio",
    },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '多选框组',
      tag: "el-checkbox",
      tagIcon: "checkbox",
    },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '开关',
      tag: "el-switch",
      tagIcon: "switch",
    },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '滑块',
      tag: "el-slider",
      tagIcon: "slider",
    },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '时间选择',
      tag: "el-time-select",
      tagIcon: "time",
    },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '时间范围',
      tag: "el-time-picker",
      tagIcon: "time-range",
    },
    "is-range": true,
  },
  {
    _config_: {
      layout: 'colItem',
      label: '日期选择',
      tag: "el-date-picker",
      tagIcon: "date",
      type: "date"
    },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '日期范围',
      tag: "el-date-picker",
      tagIcon: "date-range",
      type: "datetimerange"
    },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '评分',
      tag: "el-rate",
      tagIcon: "rate",
    },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '颜色选择',
      tag: "el-color-picker",
      tagIcon: "color",
    },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '上传',
      tag: "el-upload",
      tagIcon: "upload",
    },
  }
]

//布局型组件
export const layoutComponents = [
  {
    _config_: {
      layout: 'rowItem',
      label: '行容器',
      tagIcon: "row",
    },
    type: 'default',
  },
  {
    _config_: {
      layout: 'colItem',
      label: '按钮',
      tag: "el-button",
      tagIcon: "button",
    }
  },
]

//表单属性
export const formConf = {
  formRef: 'elform',
  formModel: 'formData',
  size: 'default',
  labelPosition: 'right',
  labelWidth: 100,
  span: 24,
  disabled: false,
  gutter: 15,
}
