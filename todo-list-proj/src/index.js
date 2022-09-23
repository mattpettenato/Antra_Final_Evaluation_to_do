const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

var request = new XMLHttpRequest()

request.open('GET', 'http://localhost:3000/todos', true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(todos => {
      const item = document.createElement('div')
      item.setAttribute('class', 'item')

      const h1 = document.createElement('h1')
      h1.textContent = todos.title

      const p = document.createElement('p')
      
      p.textContent = `${todos.completed}...`

      container.appendChild(item)
      item.appendChild(h1)
      item.appendChild(p)

const someData = {
  // title: document.querySelector(todos.title).value
  title: "edited",
  completed: true
}


      const editButton = document.createElement('button')
      editButton.innerText = 'Edit Task'
      editButton.id = 'editTaskButton'
      editButton.addEventListener('click', () => {
        let url = `http://localhost:3000/todos/${todos.id}`
        let options = {
          method: "PUT",
          title: JSON.stringify(someData)
        }
      fetch(`http://localhost:3000/todos/${todos.id}`, {
      method: `PATCH`,
      body: JSON.stringify({
        title: "edited 223",
        completed: false
      }),
      headers: { 'Content-type': `application/json; charset=UTF-8` },
    }).then((response) => response.json())
    window.location.reload();
      })
      item.appendChild(editButton)


      const button = document.createElement('button')
      button.innerText = 'Delete To-Do?'
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
