import Language from './_Language'

let lang = new Language(
  'Korean',
  [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  ['일', '월', '화', '수', '목', '금', '토']
)
lang.yearSuffix = '년'
lang.ymd = true

export default lang
