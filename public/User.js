$(() => {

    function refreshList() {
      $.get('/user', (data) => {
        $('#userlist').empty()
              
        for (let pro of data) {
          $('#userlist').append(
            `<li>Username: ${pro.username} || Email: ${pro.email}  </li>`
          )
        }
      })
    }
  
    refreshList()
  
    $('#inputbutton').click(() => {
      $.post(
        '/user',
        {
          username: $('#userinput').val(),
          email: $('#emailinput').val()        
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