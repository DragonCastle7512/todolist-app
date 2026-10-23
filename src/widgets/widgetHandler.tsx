import { getTodolist } from '@/utils/todoStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { TodoWidget } from './todoWidget';

const nameToWidget = {
  Todolist: TodoWidget,
};

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget =
    nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];

  const todoData = await getTodolist();
  const textSize = await AsyncStorage.getItem('@textSize');
  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
    case 'WIDGET_RESIZED':
      props.renderWidget(<Widget todo={todoData} textSize={Number(textSize)}/>);
      break;

    case 'WIDGET_DELETED':
      // Not needed for now
      break;

    case 'WIDGET_CLICK':
      // Not needed for now
      break;

    default:
      break;
  }
}