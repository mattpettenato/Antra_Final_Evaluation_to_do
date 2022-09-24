const form = document.getElementById('form');
const input = document.getElementById('input');
// const addTodo = document.getElementById('add-todo');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const prePayload = new FormData(form);
  const payload = new URLSearchParams(prePayload)

  // console.log([...payload])

  fetch('http://localhost:3000/todos', {
    method: 'POST',
    body: payload
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    window.location.reload();
});



const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

var request = new XMLHttpRequest()

request.open('GET', 'http://localhost:3000/todos', true)

request.onload = function () {
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(todos => {
      const item = document.createElement('div')
      item.setAttribute('class', 'item')

      const h1 = document.createElement('h1')
      h1.textContent = todos.title

      const p = document.createElement('p')
      if (todos.completed === true) {
        p.textContent = 'Completed'
      } else {
        p.textContent = 'Not Completed'
      }

      container.appendChild(item)
      item.appendChild(h1)
      item.appendChild(p)

      const editButton = document.createElement('button')
      editButton.textContent = 'Edit'
      editButton.id= 'editButton'
      editButton.addEventListener('click', () => {
        const editForm = document.createElement('form')
        editForm.id = 'editForm'
        editForm.method = 'PUT'
        editForm.action = 'http://localhost:3000/todos/' + todos.id

        const editInput = document.createElement('input')
        editInput.id = 'editInput'
        editInput.name = 'title'
        editInput.type = 'text'
        editInput.value = todos.title

        const editSubmit = document.createElement('input')
        editSubmit.id = 'editSubmit'
        editSubmit.type = 'submit'
        editSubmit.value = 'Submit'

        editForm.appendChild(editInput)
        editForm.appendChild(editSubmit)
        item.appendChild(editForm)

        editForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const prePayload = new FormData(editForm);
          const payload = new URLSearchParams(prePayload)

          // console.log([...payload])

          fetch('http://localhost:3000/todos/' + todos.id, {
            method: 'PATCH',
            body: payload
          })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
            window.location.reload();
        })
      })
    

      // const editButton = document.createElement('button')
      // editButton.innerText = 'Edit'
      // editButton.id = 'mainButton'
      //   editButton.addEventListener('click', () => {
      //   let url = `http://localhost:3000/todos/${todos.id}`
      //   let options = {
      //     method: "PATCH"
      //   }
      //   fetch(url, options)
      //   .then(response => console.log(response.status))
      //   window.location.reload();
      // })
      item.appendChild(editButton)


      const button = document.createElement('button')
      button.innerText = 'Delete'
      button.id = 'mainButton'
        button.addEventListener('click', () => {
        let url = `http://localhost:3000/todos/${todos.id}`
        let options = {
          method: "DELETE"
        }
        fetch(url, options)
        .then(response => console.log(response.status))
        window.location.reload();
      })
      item.appendChild(button)
    })
  } else {
    console.log('error')
  }

}

request.send()
