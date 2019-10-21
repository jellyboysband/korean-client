export default class {
  constructor({
    id,
    name,
    description,
    apply,
    price,
    avatarUrl,
    brand,
    tags,
  }) {
    this.id = id
    this.brandId = brand.id
    this.name = name
    this.description = description
    this.apply = apply
    this.price = price
    this.avatarUrl = avatarUrl
    this.brand = brand
    this.tags = tags
  }
}
