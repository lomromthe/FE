let isCreate = true;
let blah = document.getElementById("blah");
let imgInp = document.getElementById("img")

function showProduct() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/admin_product",
        //xử lý khi thành công
        success: function (products) {

            // console.log(products)
            let str = '';
            console.log(products)
            for (const p of products) {

                str += `<tr>
                        <td>${p.idProduct}</td>
                        <td>${p.nameProduct}</td>
                        <td><img src="${p.img}" height="150" width="200"></td>
                         <td>${p.price}</td>
                         <td>${p.quantity}</td>
                          <td>${p.category.idCategory}</td>
                         <td>
                         <a type="button" class="btn btn-warning" onclick="showEdit(${p.idProduct})" data-toggle="modal" data-target="#myModal1">Edit</a>
                        <a type="button" class="btn btn-danger" onclick="showDelete(${p.idProduct})" >Delete</a>
                        </td>
                        </tr> `
            }


            document.getElementById("showProduct").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })
}

showProduct();

function showImg(e) {
    console.log("value: ", e.value)

    let file = imgInp.files;
    // blah.src = URL.createObjectURL(file[0])
}

function upImg(action, inputImgId) {
    let fileImg = document.getElementById(inputImgId).files;
    var formData = new FormData();
    formData.append("fileImg", fileImg[0]);
    $.ajax({
        contentType: false,
        processData: false,
        headers: {
            // 'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        type: "POST",
        data: formData,
        url: "http://localhost:8080/admin_product/upImg",
        success: function (img) {

            switch (action) {
                case "create":
                    create(img)
                    break;
                case "edit":
                    editUpdate(img);
                    break;
            }
        }
    });
}

// function showProductDetail(id){
//     $.ajax({
//         type: "GET",
//         headers: {
//             'Accept': 'application/json'
//         },
//         url: "http://localhost:8080/admin_product/image/" +id,
//         //xử lý khi thành công
//         success: function (getImage) {
//             let str = '';
//             str += `<div >
//               <p>Product : ${getImage[0].idproduct}</p>
//               <p>Name : ${getImage[0].name}</p>
//               <p>Price : ${getImage[0].price}</p>
//               <p>Quantity : ${getImage[0].quantity}</p>
//               <p>Category : ${getImage[0].idCategory}</p>
//                           </div>`
//
//             for (const a of getImage) {
//                 str += `<div >
//
//                 <div>
//                         <img src="${a.url}" class="d-block w-100" alt="...">
//                     </div>
//                     <div class="carousel-item">
//                         <img src="" class="d-block w-100" alt="...">
//                     </div>
//                     <div class="carousel-item">
//                         <img src="..." class="d-block w-100" alt="...">
//                     </div>
//
//                 </div>`
//             }
//             document.getElementById("showProductDetail").innerHTML = str;
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }


function findByNameLike() {
    let name = document.getElementById("text").value;
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/admin_product/search/" + name,
        success: function (products) {
            console.log(products)
            let str = '';
            for (const p of products) {
                str += `<tr>
                        <td>${p.idProduct}</td>
                        <td>${p.nameProduct}</td>
                         <td><img src="${p.img}" height="150" width="200"></td>
                        <td>${p.price}</td>
                        <td>${p.quantity}</td>
                        <td>${p.category.idCategory}</td>
                        <td>
<!--          <td><a href="#" class="view" title="View" data-toggle="tooltip"><i class="material-icons">&#xE417;</i></a></td>-->
          <a type="button" class="btn btn-warning" onclick="showEdit(${p.idProduct})" data-toggle="modal" data-target="#myModal1">Edit</a>
           <a  class="delete" title="Delete" data-toggle="tooltip" onclick="showDelete(${p.idProduct})"><i class="material-icons">Delete</i></a></td>
                         </tr>`

            }

            document.getElementById("showProduct").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })
}

showProduct();
// function showImage(){
//     $.ajax({
//         type: "GET",
//         headers: {
//             'Accept': 'application/json'
//         },
//         url: "http://localhost:8080/images",
//         //xử lý khi thành công
//         success: function (image) {
//             for (const i of image) {
//                 document.getElementById(i.product.name).setAttribute('src', i.url)
//             }
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }
// showImage();

function create(img) {
    let product = {
        // "": document.getElementById("").value,
        "nameProduct": $("#name").val(),
        "img": img,
        "price": $("#price").val(),
        "quantity": $("#quantity").val(),
        "category": {
            "idCategory": $("#idcategory").val(),
        }
    }
    console.log(product)

    if (!isCreate) {
        product.id = $("#id").val();
    }

    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/admin_product",
        data: JSON.stringify(product),
        //xử lý khi thành công
        success: function (data) {
            console.log(data)
            alert("Thành công");
            showProduct();
        },
        error: function (err) {
            alert("that bai")
            console.log(err)
        }
    })
}

function editUpdate(img) {
    let product = {
        "idProduct": document.getElementById("idEdit").value,
        "nameProduct": document.getElementById("nameEdit").value,
        "img": img,
        "price": document.getElementById("priceEdit").value,
        "quantity": document.getElementById("quantityEdit").value,
        "category": {
            "idCategory": $("#idCategoryEdit").val(),
        }
    }
    console.log("- ", product.img)

    $.ajax({
        type: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/admin_product",
        data: JSON.stringify(product),
        //xử lý khi thành công
        success: function (data) {
            console.log(data)
            alert("Thành công");
            showProduct();
        },
        error: function (err) {
            alert("That bai")
            console.log(err)
        }
    })
}

function clearEdit() {
    isCreate = true;
    document.getElementById("id").value = 0;
    $("#idedit").val("");
    $("#nameedit").val("");
    $("#imgedit").src;
    $("#priceedit").vaḷ("");
    $("#quantityedit").val("");
    $("#idcategoryedit").val("");

}


function showEdit(id) {
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8080/admin_product/" + id,
        //xử lý khi thành công
        success: function (product) {
            document.getElementById("idEdit").value = product.idProduct;
            document.getElementById("nameEdit").value = product.nameProduct;
            document.getElementById("priceEdit").value = product.price;
            document.getElementById("quantityEdit").value = product.quantity;
            document.getElementById("idCategoryEdit").value = product.category.idCategory;
            // <td><img src="${p.img}" height="150" width="200"></td>
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function showDelete(id) {
    $.ajax({
        url: "http://localhost:8080/admin_product/" + id,
        type: "Delete",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem("token")

        },
        success: function (product) {

            console.log(product);
            showProduct()
        },
        error: function (err) {
            // Xử lý lỗi nếu có
            console.error(err);
        }
    })
}

