'use no memo';
import {
  FlexWidget,
  ListWidget,
  SvgWidget,
  TextWidget
} from 'react-native-android-widget';

interface TodoWidgetProps {
  todo?: Array<{ id: number; text: string }>;
  textSize?: number;
}

const SETTINGS_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#475569"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></g></svg>'
const ADD_ICON_SVG ='<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#475569"><path d="M450-450H220v-60h230v-230h60v230h230v60H510v230h-60v-230Z"/></svg>'

export function TodoWidget({ todo = [], textSize = 14 }: TodoWidgetProps) {
  const hasItems = todo && todo.length > 0;
  todo.sort((a, b) => a.id - b.id);

  return (
    <FlexWidget
      style={{
        flex: 1,
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'column',
      }}
    >
      <FlexWidget
        style={{
          width: 'match_parent',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: "#E2E8F0",
        }}
      >
        <TextWidget
          text="할 일 목록"
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#0F172A',
          }}
        />
        <FlexWidget style={{
          flexDirection: 'row',
        }}>
          <FlexWidget
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            clickAction="OPEN_URI" 
            clickActionData={{
              uri: 'todoapp://form/settingForm'
            }}
          >
            <SvgWidget svg={SETTINGS_ICON_SVG} style={{ width: 22, height: 22 }}/>
          </FlexWidget>
          <FlexWidget
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            clickAction="OPEN_URI" 
            clickActionData={{
              uri: 'todoapp://form/addForm'
            }}
          >
            <SvgWidget svg={ADD_ICON_SVG} style={{ width: 22, height: 22 }}/>
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>

      {!hasItems ? (
        <FlexWidget
          style={{
            flex: 1,
            width: 'match_parent',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}
        >
          <TextWidget
            text="등록된 목록이 없어요"
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#334155',
              marginBottom: 4,
            }}
          />
          <TextWidget
            text="새로운 할 일을 추가해보세요."
            style={{
              fontSize: 12,
              color: '#94A3B8',
            }}
          />
        </FlexWidget>
      ) : (
        <ListWidget
          style={{
            width: 'match_parent',
            height: 'match_parent',
            backgroundColor: '#ffffff'
          }}
        >
          {todo.map((item) => (
            <FlexWidget
              key={item.id}
              style={{
                width: 'match_parent',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: "#E2E8F0",
              }}
            >
              <FlexWidget
                style={{
                  width: Math.max(textSize - 5, 16),
                  height: Math.max(textSize - 5, 16),
                  borderRadius: 999,
                  borderWidth: 2,
                  borderColor: '#CBD5E1',
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                clickAction="REMOVE_TODO"
                clickActionData={{ id: item.id }}
              />
              <FlexWidget
                style={{                                                                                                                                     
                  width: 'match_parent',
                  paddingVertical: 20,
                  paddingHorizontal: 4,
                  justifyContent: 'center',
                }}                                                                                                                                           
                clickAction="OPEN_URI"                                                                                                                       
                clickActionData={{                                                                                                                           
                  uri: `todoapp://form/detail/${item.id}`,                                                                                                   
                  id: String(item.id),                                                                                                                       
                }}                                                                                                                                           
              > 
                <TextWidget
                  text={item.text}
                  style={{
                    fontSize: textSize || 14,
                    color: '#1E293B',
                  }}
                />
              </FlexWidget>
            </FlexWidget>
          ))}
        </ListWidget>
      )}
    </FlexWidget>
  );
}