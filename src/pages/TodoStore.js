import { types, destroy } from 'mobx-state-tree'
import { observable, computed } from 'mobx';

const Todo = types.model('Todo', {
    title: types.string,
    detail: types.string,
    read: false
}).actions(self => ({
    completedTodo(){
          self.read = true
          console.log(self.read)
    }
}))

const TodoStore = types.model('Todos', {

    todos: types.array(Todo)
})
.actions(self => ({
    addTodo(todo) {
            self.todos.push(todo)
    },
    removeTodo(todo){
        destroy(todo)
    }
}))
.views(self => ({
    get getTodos() { 
      return self.todos
    },
  }))
.create({
    todos: [{
        title: 'Yapılacak iş',
        detail: "Açıklama alanı olacak",
        read: false
    }]
})

export default TodoStore