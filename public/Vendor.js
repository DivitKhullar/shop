$(() => {

    function refreshList() {
      $.get('/vendor', (data) => {
        $('#vendorlist').empty()
              
        for (let ven of data) {
          $('#vendorlist').append(
            `<li> ${ven.name} </li>`
          )
        }
      })
    }
  
    refreshList()
  
    $('#vendorinputbutton').click(() => {
      $.post(
        '/vendor',
        {
          name: $('#vendorname').val()         
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