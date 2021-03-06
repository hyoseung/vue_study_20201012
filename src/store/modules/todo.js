import uniqid from 'uniqid';

const storage = {
  todoFetch() {
    // isComplete: true/false, text: '', date
    if (localStorage.getItem('todoInfo')) {
      return JSON.parse(localStorage.getItem('todoInfo'));
    } else {
      return [];
    }
  }
}

export default {
  namespaced: true,
  state: {
    todoInfo: storage.todoFetch()
  },
  getters: {
    getTodoInfo(state) {
      return state.todoInfo;
    }
  },
  mutations: {
    addTodoItem(state, payload) {
      let obj = { id: uniqid(), isComplete: false, text: payload, data: new Date() };
      state.todoInfo.push(obj);
      localStorage.setItem('todoInfo', JSON.stringify(state.todoInfo));
    },
    completeTodoItem(state, payload) {
      state.todoInfo[payload].isComplete = !state.todoInfo[payload].isComplete;
      localStorage.setItem('todoInfo', JSON.stringify(state.todoInfo));
    },
    removeTodoItem(state, payload) {
      state.todoInfo.splice(payload, 1);
      localStorage.setItem('todoInfo', JSON.stringify(state.todoInfo));

      // payload 값이 index가 아니라 todoInfo.id일 경우
      // let todoItem = state.todoInfo.find((todo) => {
      //   return todo.id === payload;
      // });
      // let index = state.todoInfo.indexOf(todoItem);
      // state.todoInfo.splice(index, 1);
      // localStorage.setItem('todoInfo', JSON.stringify(state.todoInfo));
    },
    removeAllTodo(state) {
      state.todoInfo = [];
      localStorage.removeItem('todoInfo');
    }
  }
}