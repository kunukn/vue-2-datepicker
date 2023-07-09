import Language from './_Language'

let lang = new Language(
  'Lithuanian',
  [
    'Sausis',
    'Vasaris',
    'Kovas',
    'Balandis',
    'Gegužė',
    'Birželis',
    'Liepa',
    'Rugpjūtis',
    'Rugsėjis',
    'Spalis',
    'Lapkritis',
    'Gruodis',
  ],
  [
    'Sau',
    'Vas',
    'Kov',
    'Bal',
    'Geg',
    'Bir',
    'Lie',
    'Rugp',
    'Rugs',
    'Spa',
    'Lap',
    'Gru',
  ],
  ['Sek', 'Pir', 'Ant', 'Tre', 'Ket', 'Pen', 'Šeš'],
)

lang.ymd = true

export default lang
