import { Todo } from "@/types/todolist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getNextId } from "./idGenerator";
import { updateWidget } from "./widgetUtils";

const TODOLIST_KEY = '@todolist';

export async function getTodolist(): Promise<Todo[]> {
  const item: string | null = await AsyncStorage.getItem(TODOLIST_KEY);
  const todolist: Todo[] = item
    ? JSON.parse(item)
    : [];
  return todolist;
}

export async function saveTodolist(text: string): Promise<void> {
  const id = await getNextId();
  const todolist = await getTodolist();
  const newTodo = [...todolist, { id, text }];
  await AsyncStorage.setItem(TODOLIST_KEY, JSON.stringify(newTodo));
  updateWidget({todolist: newTodo});
  return;
}

export async function editTodolist(id: number, text: string): Promise<void> {
  const todolist = (await getTodolist()).filter(todo => todo.id !== id);
  const editTodo = [...todolist, { id, text }];
  await AsyncStorage.setItem(TODOLIST_KEY, JSON.stringify(editTodo));
  updateWidget({todolist: editTodo});
  return;
}

export async function removeTodolist(id: number): Promise<Todo[]> {
  const todolist = (await getTodolist()).filter(todo => todo.id !== id);
  await AsyncStorage.setItem(TODOLIST_KEY, JSON.stringify(todolist));
  updateWidget({todolist})
  return todolist;
}