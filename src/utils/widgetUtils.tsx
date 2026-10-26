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
  const [size, todolist] = await Promise.all([                                                                                                       
    info.textSize ? Promise.resolve(info.textSize) : AsyncStorage.getItem('@textSize').then((val) => Number(val) || 14),                                                                          
    info.todolist ? Promise.resolve(info.todolist) : getTodolist(),                                                                                                                               
  ]);
  await requestWidgetUpdate({ widgetName: 'TodoChecker', renderWidget: () => <TodoWidget todo={todolist} textSize={size}/> });
}