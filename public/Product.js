$(() => {

  function refreshList() {
    $.get('/product', (data) => {
      $('#productlist').empty()
            
      for (let pro of data) {
        console.log(pro)
        $('#productlist').append(
          `<tr> 
          <td>${pro.name}</td>
            <td>${pro.quantity}</td>
            <td>${pro.price}</td>
            <td>${pro.vendorId}</td>
            <td><button id = "ProductDelete" type="button">Delete!</button></td>
            </tr>`
          )
      }
    })
  }

  function refreshVendor(){
    $.get('/vendor', (vendordata) => {
      $('#productvendorid').empty()

      for(let v of vendordata){
        $('#productvendorid').append(` <option value = ${v.id}>${v.name}</option>`)
      }
    })
  }

  refreshList()
  refreshVendor()

  $('#inputbutton').click(() => {
    $.post(
      '/product',
      {
        name: $('#productinput').val(),
        quantity: $('#quantityinput').val(),
        price: $('#priceinput').val(),
        vendorId: $('#productvendorid').val()
      },
      (data) => {
        if (data.success) {
          refreshList()
        } else {
          alert('Some error occurred')
        }
      }
    )
  })
})