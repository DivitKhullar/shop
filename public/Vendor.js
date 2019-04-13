function deleteVendor(id)
  {
    $.post(
      'vendor/delete',
      {
          id: id
      },
      (data) => {
          if (data.success) {
              $.get('/vendor',(data)=>{
                  $('#vendorlist').empty();
                  for(let vendor of data)
                  {
                      $('#vendorlist').append( 
                        `<tr>
                        <td>${vendor.name}</td> 
                        <td><input type='submit' value='Delete!' onclick='deleteVendor(${vendor.id})'></td>
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
      $.get('/vendor', (data) => {
        $('#vendorlist').empty()
              
        for (let ven of data) {
          $('#vendorlist').append(
                 `<tr>
                  <td>${ven.name}</td> 
                  <td><input type='submit' value='Delete!' onclick='deleteVendor(${ven.id})'></td>
                  </tr>`            
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