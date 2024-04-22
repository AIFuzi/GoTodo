import useSWR from "swr";
import AddTodo from "../Components/AddTodo.tsx";
import {List, Space} from "antd";
import './App.css'

export interface Todo {
    id: number,
    title: string,
    body: string,
    done: boolean
}
export const ENDPOINT = 'http://localhost:4000'

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {

  const {data, mutate} = useSWR<Todo[]>('api/todos', fetcher)

  return (
      <>
          <Space direction="vertical">
              <List>
                  {data?.map((todo) => {
                      return <List.Item key={todo.id}>{todo.title}</List.Item>
                  })}
              </List>
              <AddTodo mutate={mutate}/>
          </Space>
      </>

  )
}

export default App
