const headerConfig = new Map<string, { title: string, icon?: string }>([
  ['categories-coffee', { title: 'Кофе', icon: 'coffee' }],
  ['categories-desserts', { title: 'Десерты', icon: 'desserts' }],
  ['categories-beverages', { title: 'Напитки', icon: 'beverages' }],
  ['categories-hookah', { title: 'Кальян', icon: 'hookah' }],
  ['categories-snacks', { title: 'Закуски', icon: 'snacks' }],
  ['categories-tea', { title: 'Чай', icon: 'tea' }],
  ['discount', { title: 'Дисконтная карта' }],
  ['login', { title: 'Авторизация' }],
  ['profile', { title: 'Профиль' }],
  ['rules', { title: 'Наши правила' }],
  ['stocks', { title: 'Акции' }]
])

export { headerConfig }
