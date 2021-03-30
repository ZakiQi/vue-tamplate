module.exports = {
  trailingComma: 'all',
  // 缩进
  tabWidth: 2,
  // 末尾分号
  semi: false,
  // 单引号
  singleQuote: true,
  jsxBracketSameLine: false,
  // 尽可能使用尾随逗号（包括函数参数)
  trailingComma: 'none',
  extends: [
    //继承 vue 的标准特性
    "plugin:vue/essential",
    "eslint:recommended",
    //避免与 prettier 冲突
    "plugin:prettier/recommended",
  ]
}
