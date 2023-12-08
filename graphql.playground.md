# Products queries and mutations

mutation createProduct {
createProduct(input: {
name: "Oranges",
price: 1.55,
status: ACTIVE,
imageIds:[2,3]
}) {
id
name
price
status
images {
id
url
}
}
}

query findAllProducts{
products {
id
name
price
status
}
}

query findProductById{
product (id:16){
id
name
price
status
images {
id
url
}
}
}

mutation updateProduct {
updateProduct(id: 16, input:{imageIds:[2,3,4]} ) {
id
name
price
status
images {
id
url
priority
}
}
}

mutation deleteProduct {
deleteProduct(id: 15) {
id
name
price
status
images {
id
url
}
}
}

# Images queries and mutations

query findAllIMages {
images {
id
url
priority
}
}

query findImageById {
image (id:1){
id
url
priority
}
}

mutation createImage {
createImage(input: {
url: "https://media.istockphoto.com/id/1387721011/photo/close-up-of-woman-eating-omega-3-rich-salad.jpg?s=2048x2048&w=is&k=20&c=X9InlZ_f9FhVyHv8YLbx2HhFgbmYpe8VnPJdHhBQjkQ=",
priority: 100
}) {
id
url
priority
}
}

mutation updateImage {
updateImage(id: 8, input: {
priority:100
}) {
url
priority
}
}

mutation deleteImage {
deleteImage(id: 9) {
id
url
priority
product{
id
name
price
status
}
}
}
