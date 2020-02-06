export default class Post {
  constructor({
    id,
    categoryId,
    description,
    content,
    datetime,
    name,
    previewUrl,
  }) {
    this.id = id
    this.categoryId = categoryId
    this.description = description
    this.content = content
    this.datetime = datetime
    this.name = name
    this.previewUrl = previewUrl
  }
}
