import { Todo } from "@/types/todolist";
import { TodoWidget } from "@/widgets/todoWidget";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestWidgetUpdate } from "react-native-android-widget";
import { getTodolist } from "./todoStore";

interface ListInfo {
  todolist?: Todo[];
  textSize?: number;
}
export async function updateWidget(info: ListInfo) {
  const size: number = info.textSize || Number(await AsyncStorage.getItem('@textSize'));
  const todolist: Todo[] = info.todolist || await getTodolist();
  await requestWidgetUpdate({ widgetName: 'TodoChecker', renderWidget: () => <TodoWidget todo={todolist} textSize={size}/> });
}