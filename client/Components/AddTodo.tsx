import {useState} from "react";
import {Button, Form, Input, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import {ENDPOINT, Todo} from "../src/App.tsx";
import {KeyedMutator} from "swr";

const AddTodo = ({mutate}: {mutate: KeyedMutator<Todo[]>}) => {
    const [open, setOpen] = useState(false)

    type form = {
        title: "ad";
        body: "ad";
    }

    const createTodo = async (values: {title: string, body: string}) => {
        const update = await fetch(`${ENDPOINT}/api/todos`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values),
        }).then(r => r.json())

        mutate(update)
        setOpen(false)
    }

    return (
        <>
            <Modal open={open} onCancel={() => setOpen(false)} title="Create todo" okButtonProps={{ disabled: true }}>
                <Form name="Form" onFinish={createTodo}>
                    <Form.Item<form>
                        label="Todo"
                        name="title"
                        rules={[{ required: true, message: 'Please input your todo title!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item<form>
                        label="Todo"
                        name="body"
                        rules={[{ required: true, message: 'Tell me more...!' }]}>
                        <TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add todo
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Button onClick={() => setOpen(true)}>Add todo</Button>
        </>
    );
};

export default AddTodo;