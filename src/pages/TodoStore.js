import { types, destroy } from 'mobx-state-tree'
import { observable, computed } from 'mobx';

const Todo = types.model('Todo', {
    title: types.string,
    detail: types.string,
    read: false
}).actions(self => ({
    complete(){
        self.read = true
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
    },
    completedTodo(todo){
        todo.read = true
        console.warn(todo.title)
        console.warn(todo.detail)
        console.warn(todo.read)
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