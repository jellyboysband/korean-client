export default class {
  constructor({
    apply,
    avatarUrl,
    brand,
    description,
    extraList,
    id,
    name,
    price,
    tagList,
  }) {
    this.apply = apply
    this.avatarUrl = avatarUrl
    this.brand = brand
    this.brandId = brand.id
    this.description = description
    this.extraList = extraList
    this.id = id
    this.name = name
    this.price = price
    this.tagList = tagList
  }
}
