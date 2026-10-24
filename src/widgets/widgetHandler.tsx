import { getTodolist, removeTodolist } from '@/utils/todoStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { TodoWidget } from './todoWidget';

const nameToWidget = {
  TodoChecker: TodoWidget,
};

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget =
    nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];

  const todoData = await getTodolist();
  const textSize = await AsyncStorage.getItem('@textSize');
  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_RESIZED':
      props.renderWidget(<Widget todo={todoData} textSize={Number(textSize)}/>);
      break;
    case 'WIDGET_CLICK':
      const action = props.clickAction;
      if(action === 'REMOVE_TODO') {
        const todoId = props.clickActionData?.id;
        await removeTodolist(Number(todoId));
      }
      break;
    default:
      break;
  }
}