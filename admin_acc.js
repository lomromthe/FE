function showAccount(){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/admin_account",
        //xử lý khi thành công
        success: function (accounts) {

            // console.log(accounts)
            let str = '';
            console.log(accounts)
            for (const p of accounts) {
                str += `<tr>
                         <td>${p.idAccount}</td>
                         <td>${p.address}</td>
                         <td>${p.fullname}</td>
                         <td>${p.username}</td>
                         <td>${p.password}</td>
                         <td>${p.phone}</td>
                         <td>
                        <a type="button" class="btn btn-danger" onclick="showDelete(${p.idAccount})" >Delete</a>
                        </td>
                        </tr> `
            }
            document.getElementById("showAccount").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })
}
showAccount();
function showDelete(id){
    $.ajax({
        type: "Delete",
        url: "http://localhost:8080/admin_account/"+id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")

        },
        success: function() {
            alert("Thành công")
            showAccount();
        },
        error: function(err) {
            // Xử lý lỗi nếu có
            console.error(err);
        }
    })
}