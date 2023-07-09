import Language from './_Language'

let lang = new Language(
  'Japanese',
  [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  ['日', '月', '火', '水', '木', '金', '土']
)

lang.yearSuffix = '年'
lang.ymd = true

export default lang
