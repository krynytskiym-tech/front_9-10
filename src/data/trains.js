export const trains = [
  {
    id: '1',
    number: '012М',
    from: 'Київ',
    to: 'Львів',
    depart: '2026-05-20T08:30',
    duration: '06:45',
    price: 850,
    wagons: [
      { id: 'w1', name: 'Вагон 1', type: 'Купе', rows: 8, cols: 4 },
      { id: 'w2', name: 'Вагон 2', type: 'Плацкарт', rows: 9, cols: 4 },
    ],
  },
  {
    id: '2',
    number: '045П',
    from: 'Одеса',
    to: 'Харків',
    depart: '2026-05-20T14:20',
    duration: '11:10',
    price: 980,
    wagons: [
      { id: 'w1', name: 'Вагон 1', type: 'Сидячий', rows: 7, cols: 4 },
      { id: 'w2', name: 'Вагон 2', type: 'Плацкарт', rows: 8, cols: 4 },
    ],
  },
  {
    id: '3',
    number: '101Т',
    from: 'Львів',
    to: 'Дніпро',
    depart: '2026-05-21T06:15',
    duration: '07:30',
    price: 770,
    wagons: [
      { id: 'w1', name: 'Вагон 1', type: 'Купе', rows: 8, cols: 4 },
      { id: 'w2', name: 'Вагон 2', type: 'Плацкарт', rows: 8, cols: 4 },
    ],
  },
]
