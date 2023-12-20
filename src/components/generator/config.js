//输入型组件
export const inputComponents = [
  {
    _config_: {
      layout: 'colItem',
      label: '单行文本',
      tag: "el-input",
      tagIcon: "input",
      defaultValue: '',
      labelWidth: null,
      showLabel: true,
      required: true,
      regList: [{ required: true, message: 'age is required' }]
    },
    _slot_: {
      prepend: '',
      append: '',
    },
    placeholder: '请输入单行文本',
    maxlength: null,
    'prefix-icon': '',
    'suffix-icon': '',
    'show-word-limit': false,
    readonly: false,
    clearable: true,
    disabled: false,
    style: { width: '100%' },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '多行文本',
      tag: "el-input",
      tagIcon: "textarea",
      defaultValue: '',
      labelWidth: null,
      showLabel: true,
      required: true,
    },
    type: "textarea",
    placeholder: '请输入多行文本',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false,
    style: { width: '100%' },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '密码',
      tag: "el-input",
      tagIcon: "password",
      defaultValue: '',
      labelWidth: null,
      showLabel: true,
      required: true,
    },
    _slot_: {
      prepend: '',
      append: '',
    },
    type: "password",
    'show-password': true,
    placeholder: '请输入密码',
    style: { width: '100%' },
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    clearable: true,
    disabled: false,
  },
  {
    _config_: {
      layout: 'colItem',
      label: '计数器',
      tag: "el-input-number",
      tagIcon: "number",
      defaultValue: 0,
      labelWidth: null,
      showLabel: true,
      required: true,
    },
    placeholder: '计数器',
    disabled: false,
    min: undefined,
    max: undefined,
    step: 1,
    precision: undefined,
    'controls-position': '',
    'step-strictly': false,
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
      defaultValue: '',
      labelWidth: null,
      showLabel: true,
      required: true,
    },
    _slot_: {
      default: [
        {
          value: '1',
          label: '选项一',
        },
        {
          value: '2',
          label: '选项二',
        }, {
          label: '选项三',
          value: '3',
        }

      ]
    },
    placeholder: '请选择下拉选择',
    clearable: true,
    disabled: false,
    filterable: false,
    multiple: false,
    style: { width: '100%' },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '级联选择',
      tag: "el-cascader",
      tagIcon: "cascader",
      defaultValue: '',
      labelWidth: null,
      showLabel: true,
      required: true,
    },
    options: [
      {
        value: 'guide',
        label: 'Guide',
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines',
            children: [
              {
                value: 'consistency',
                label: 'Consistency',
              },
              {
                value: 'feedback',
                label: 'Feedback',
              },
              {
                value: 'efficiency',
                label: 'Efficiency',
              },
              {
                value: 'controllability',
                label: 'Controllability',
              },
            ],
          },
          {
            value: 'navigation',
            label: 'Navigation',
            children: [
              {
                value: 'side nav',
                label: 'Side Navigation',
              },
              {
                value: 'top nav',
                label: 'Top Navigation',
              },
            ],
          },
        ],
      },
    ],
    placeholder: '请选择级联选择',
    'show-all-levels': true,
    filterable: false,
    clearable: true,
    disabled: false,
    props: {
      checkStrictly: false,
      multiple: false,
    },
    style: { width: '100%' },
  },
  {
    _config_: {
      layout: 'colItem',
      label: '单选框组',
      tag: "el-radio-group",
      tagIcon: "radio",
      defaultValue: '',
      labelWidth: null,
      showLabel: true,
      required: true,
      optionType: '',
    },
    _slot_: {
      default: [
        {
          value: '1',
          label: '选项一',
        },
        {
          value: '2',
          label: '选项二',
        }, {
          label: '选项三',
          value: '3',
        }
      ]
    },
    border: false,
    size: 'large',
    disabled: false,
  },
  {
    _config_: {
      layout: 'colItem',
      label: '多选框组',
      tag: "el-checkbox-group",
      tagIcon: "checkbox",
      defaultValue: [],
      labelWidth: null,
      showLabel: true,
      required: true,
      optionType: '',
    },
    _slot_: {
      default: [
        {
          value: '1',
          label: '选项一',
        },
        {
          value: '2',
          label: '选项二',
        }, {
          label: '选项三',
          value: '3',
        }
      ]
    },
    border: false,
    disabled: false,
    size: 'large',
    min: undefined,
    max: undefined,
  },
  {
    _config_: {
      layout: 'colItem',
      label: '开关',
      tag: "el-switch",
      tagIcon: "switch",
      defaultValue: false,
      labelWidth: null,
      showLabel: true,
      required: true,
    },
    'active-text': '',
    'inactive-text': '',
    'active-value': true,
    'inactive-value': false,
    style: {
      '--el-switch-on-color': undefined,
      '--el-switch-off-color': undefined,
    },
    disabled: false,
  },
  {
    _config_: {
      layout: 'colItem',
      label: '滑块',
      tag: "el-slider",
      tagIcon: "slider",
      defaultValue: 0,
      labelWidth: null,
      showLabel: true,
      required: true,
    },
    min: 0,
    max: 100,
    step: 1,
    'show-stops': false,
    range: false,
    disabled: false,
  },
  {
    _config_: {
      layout: 'colItem',
      label: '时间选择',
      tag: "el-time-picker",
      tagIcon: "time",
      defaultValue: '',
      labelWidth: null,
      showLabel: true,
      required: true,
    },
    'disabled-hours': [0, 23],
    'disabled-minutes': [0, 59],
    'disabled-seconds': [0, 59],
    format: 'HH:mm:ss',
    clearable: false,
    disabled: false,
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
