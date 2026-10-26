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
  
  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_RESIZED':
      const [todoData, textSize] = await Promise.all([                                                                                               
        getTodolist(),                                                                                                                               
        AsyncStorage.getItem('@textSize'),                                                                                                           
      ]);
      props.renderWidget(<Widget todo={todoData} textSize={Number(textSize)}/>);
      break;
    case 'WIDGET_CLICK':
      const action = props.clickAction;
      if(action === 'REMOVE_TODO') {
        const todoId = props.clickActionData?.id;
        const [todoList, textSize] = await Promise.all([                                                                                      
          removeTodolist(Number(todoId), false),                                                             
          AsyncStorage.getItem('@textSize'),                                                                                                         
        ]);
        props.renderWidget(<Widget todo={todoList} textSize={Number(textSize)}/>);
      }
      break;
    default:
      break;
  }
}