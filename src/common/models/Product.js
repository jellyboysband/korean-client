export default class {
  constructor({
    id,
    brandId,
    categoryIdList,
    extraList,
    apply,
    // avatarUrl,
    description,
    name,
  }) {
    this.id = id
    this.brandId = brandId
    this.categoryIdList = categoryIdList
    this.extraList = extraList
    this.apply = apply
    // this.avatarUrl = avatarUrl
    this.description = description
    this.name = name
  }
}
