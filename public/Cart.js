$(()=>{
  refreshList();
  $("#login").click(()=>{
      $.post('/user',
      {
          username: $("#name").val(),
          email: $("#email").val()
      },
      (data)=>
      {
          setItem("userid",data.id);
          alert(`Welcome user: ${data.username}`);
          refreshList()
      })
  })
})
function refreshList(){
  $.post(
      '/cart',
      {
          userId: getItem("userid")
      },
      (data)=>{
          var sum=0;
          $('#Products').empty();
          for(let todo of data){
              var price=parseInt(todo.product.price);
              var quantity=parseInt(todo.quantity);
              sum+=(price*quantity);
              $('#Products').append( 
                  `<tr>
                  <td>${todo.product.name}</td> <td>${todo.product.price}</td> <td>${todo.quantity}</td> <td>${todo.product.vendor.name}</td><td><input type='submit' value='Delete!' onclick='deleteElement(${todo.id})'></td>
                  </tr>`
                  )
          }
          $('#Products').append(
              `<tr>
              <td><h3>Total:</h3></td><td> </td><td> </td><td> </td><td>${sum}</td>
              </tr>`
          )
      })
}
function deleteElement(id1)
{
  $.post(
      'cart/delete',
      {
          id: id1
      },
      (data) => {
          if (data.success) {
              refreshList();
          } else {
            alert('Some error occurred')
          }
        }
      )
    }