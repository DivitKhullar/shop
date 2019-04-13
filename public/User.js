
$(()=>{
  $("#login").click(()=>{
      $.post('/user',
      {
          username: $("#name").val(),
          email: $("#email").val()
      },
      (data)=>
      {
          sessionStorage.setItem("userid",data.id);
          alert(`Welcome user: ${data.username}`);
          refreshList()
      })
  })
  
})
function refreshList()
  {
      $.get('/product',(data)=>{
          $('#Products').empty();
          for(let todo of data){
              $('#Products').append( 
                  `<tr>
                  <td>${todo.name}</td> <td>${todo.price}</td> <td>${todo.quantity}</td> <td>${todo.vendor.name}</td><td><input type='submit' value='Add' onclick='AddElement(${todo.id})'></td>
                  </tr>`
                  )
          }
      })
  }
  function AddElement(productId)
  {
      
      $.post(
          'cart/add',
          {
              userId:sessionStorage.getItem("userid"),
              productId: productId
          },
          (data) => {
              if (data.success) {
                  alert("Product added to cart");
                    
              } else {
                alert('Some error occurred')
              }
            }
          )
  }