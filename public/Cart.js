$(() => {

    function refreshList() {
      $.get('/cartitem', (data) => {
        $('#cartlist').empty()
              
        for (let pro of data) {
          $('#cartlist').append(
            `<li> Quantity: ${pro.quantity}  </li>`
          )
        }
      })
    }
  
    refreshList()
  
    $('#cartinputbutton').click(() => {
      $.post(
        '/cartitem',
        {
          quantity: $('#cartquantity').val()         
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