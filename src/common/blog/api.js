import wretch from 'wretch'

import Category from '@/common/blog/models/Category'
import Post from '@/common/blog/models/Post'


// eslint-disable-next-line no-unused-vars
const request = wretch('/api')


export default {
  getCategoryList: () => [
    {
      id: 1,
      name: 'Красота',
      parentId: 0,
    },
    {
      id: 2,
      name: 'Здоровье',
      parentId: 0,
    },
    {
      id: 3,
      name: 'Косметика',
      parentId: 0,
    },
  ].map((category) => new Category(category)),
  // getCategoryList: () => request
  //   .url('/TODO')
  //   .get()
  //   .json()
  //   .then((response) => response.list.map((category) => new Category(category))),

  getPostList: () => [
    {
      id: 1,
      categoryId: 1,
      description: 'Развенчиваем пять мифов вместе с врачом-дерматокосметологом Викторей Бритько.',
      content: 'Миф № 1: пигмент забивает поры\nМолекулы пигмента могут проникнуть только в верхние слои кожи и поры забить не способны. Но если в составе крема есть некачественный силикон, препятствующий поступлению воздуха, он создаст на коже пленку, под которой – идеальная среда для размножения болезнетворных микроорганизмов. Именно из-за этого могут возникнуть высыпания.\nМиф № 2: тональный крем провоцирует раннее старение кожи\nНет! Многие тональные средства, содержащие СПФ-фильтр, напротив, защищают кожу от фотостарения. Кроме того, определенные компоненты в составе защищают от неблагоприятных факторов окружающей среды и препятствуют образованию свободных радикалов.',
      datetime: new Date(),
      name: 'Смени тон: 5 мифов о тональном креме',
      previewUrl: 'https://beautyhack.ru/assets/images/2019/12/foundation.jpg',
    },
    {
      id: 2,
      categoryId: 2,
      description: 'Даже в пасмурную погоду до земли доходит около 40% УФ-излучения, которое оказывает вредное воздействие на кожу',
      content: 'Кажется, что в холодное время года средства с SPF можно отложить до лета. Но на самом деле даже в пасмурную погоду до земли доходит около 40% УФ-излучения, которое оказывает вредное воздействие на кожу. Европейские женщины в любое время года и погоду выходят на улицу исключительно с защитными кремами или тональными средствами, и правильно делают: продукты с SPF – это отличная профилактика фотостарения и заболеваний кожи.',
      datetime: new Date(),
      name: 'Зачем бьюти-средства с SPF нужны в холодное время года',
      previewUrl: 'https://beautyhack.ru/assets/images/sun.jpg',
    },
  ].map((post) => new Post(post)),
  // getPostList: () => request
  //   .url('/TODO')
  //   .get()
  //   .json()
  //   .then((response) => response.list.map((post) => new Post(post))),
}
