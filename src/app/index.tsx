import { Todo } from "@/types/todolist";
import { getTodolist, removeTodolist } from "@/utils/todoStore";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const router = useRouter();
export default function Index() {
  const [todo, setTodo] = useState<Todo[]>([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        const todos = await getTodolist();
        if(active) setTodo(todos);
      })();

      return () => active = false;
    }, [])
  );

  const removeTodo = async (selectedId: number) => {
    setTodo(await removeTodolist(selectedId));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerMain}>
            <View>
              <Text style={styles.headerTitle}>할 일 목록</Text>
            </View>
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.iconButton}
                activeOpacity={0.7}
                onPress={() => router.push("/form/settingForm")}
                accessibilityLabel="설정"
              >
                <FontAwesomeFreeSolid name="gear" size={18} color="#475569" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                activeOpacity={0.7}
                onPress={() => router.push("/form/addFrom")}
                accessibilityLabel="할 일 추가"
              >
                <FontAwesomeFreeSolid name="plus" size={18} color="#475569" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {todo.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <FontAwesomeFreeSolid
                name="circle-check"
                size={36}
                color="#6366F1"
              />
            </View>
            <Text style={styles.emptyTitle}>등록된 목록이 없어요</Text>
            <Text style={styles.emptySubtitle}>
              새로운 할 일을 추가하고 오늘 하루를 계획해보세요.
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              activeOpacity={0.8}
              onPress={() => router.push("/form/addFrom")}
            >
              <FontAwesomeFreeSolid name="plus" size={14} color="#FFFFFF" />
              <Text style={styles.emptyButtonText}>추가하기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {todo.map((item) => (
              <View key={item.id} style={styles.todoCard}>
                <TouchableOpacity
                  onPress={() => removeTodo(item.id)}
                  style={styles.checkButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  activeOpacity={0.6}
                  accessibilityLabel="완료 처리"
                >
                  <View style={styles.checkInnerCircle} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.todoContent}
                  activeOpacity={0.7}
                  onPress={() =>
                    router.push({
                      pathname: "/form/detail/[id]",
                      params: { id: String(item.id) },
                    })
                  }
                >
                  <Text style={styles.todoText} numberOfLines={2}>
                    {item.text}
                  </Text>
                  <FontAwesomeFreeSolid
                    name="chevron-right"
                    size={12}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 73,
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  todoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  checkButton: {
    width: 20,
    height: 20,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  checkInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  todoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
        paddingVertical: 20,
  },
  todoText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#1E293B",
    lineHeight: 22,
    marginRight: 10,
  },
  emptyContainer: {
    flex: 1,
    marginTop: -16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
