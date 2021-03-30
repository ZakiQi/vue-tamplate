import Vue from 'vue'
// element-ui 按需加载
// 导入自己需要的组件
import { 
  Pagination,
  Dialog,
  Dropdown,
  Menu,
  Input,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Upload,
  Progress,
  Footer,
  Loading,
  Message
} from 'element-ui'

const elementPlugin = [
  Pagination,  Dialog,  Dropdown,  Menu,  Input,  Radio,  RadioGroup,  RadioButton,  Checkbox,  Switch,  Select,  Option,  OptionGroup,  Button,  TableColumn,  DatePicker,  TimeSelect,  TimePicker,  Popover,  Tooltip,  Form,  FormItem,  Tabs,  TabPane,  Tag,  Tree,  Alert,  Upload,  Progress,  Footer,  Loading
]

elementPlugin.forEach(e => {
  Vue.use(e)
})

Vue.prototype.$message = Message
