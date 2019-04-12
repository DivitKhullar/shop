function deleteproduct(id)
  {
    $.post(
      'product/delete',
      {
          id: id
      },
      (data) => {
          if (data.success) {
              $.get('/product',(data)=>{
                  $('#productlist').empty();
                  for(let prod of data)
                  {
                      $('#productlist').append( 
              `<tr>
              <td>${prod.name}</td> <td>${prod.quantity}</td> <td>${prod.price}</td> <td>${prod.vendor.name}</td><td><input type='submit' value='Delete!' onclick='deleteElement(${prod.id})'></td>
              </tr>`
              )
                  }
              })
          } else {
            alert('Some error occurred')
          }
        }
      )
  } 

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
            <td>${pro.vendor.name}</td>
            <td> <input type='submit' value='Delete!' onclick="deleteproduct(${pro.id})"></button> </td>
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