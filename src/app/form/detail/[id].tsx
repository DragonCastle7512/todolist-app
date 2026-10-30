import { routeBackOrExit } from "@/utils/navigatorUtils";
import { editTodolist, getTodolist } from "@/utils/todoStore";
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailForm() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [text, setText] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const selectedTodo = (await getTodolist()).filter(todo => todo.id === Number(id));
      setText(selectedTodo[0].text);
    })();
  }, []);

  const handleSubmit = async () => {
    await editTodolist(Number(id), text); 
    routeBackOrExit();
  };

  const isSubmittable = text.trim().length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerMain}>
              <TouchableOpacity
                style={styles.backButton}
                activeOpacity={0.7}
                onPress={() => routeBackOrExit()}
                accessibilityLabel="뒤로 가기"
              >
                <FontAwesomeFreeSolid name="arrow-left" size={16} color="#334155" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>할 일 수정</Text>
              <View style={styles.headerRightSpacer} />
            </View>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.card}>
              <Text style={styles.inputLabel}>제목</Text>
              <TextInput
                style={[
                  styles.input,
                  isFocused && styles.inputFocused,
                ]}
                placeholder="해야할 일을 입력해주세요"
                placeholderTextColor="#94A3B8"
                value={text}
                onChangeText={setText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoCapitalize="none"
                returnKeyType="done"
                multiline
                scrollEnabled={false}
                onSubmitEditing={handleSubmit}
              />

              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    !isSubmittable && styles.submitButtonDisabled,
                  ]}
                  activeOpacity={0.8}
                  disabled={!isSubmittable}
                  onPress={handleSubmit}
                >
                  <FontAwesomeFreeSolid
                    name="check"
                    size={14}
                    color={isSubmittable ? "#FFFFFF" : "#94A3B8"}
                  />
                  <Text
                    style={[
                      styles.submitButtonText,
                      !isSubmittable && styles.submitButtonTextDisabled,
                    ]}
                  >
                    수정 완료
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  activeOpacity={0.7}
                  onPress={() => routeBackOrExit()}
                >
                  <Text style={styles.cancelButtonText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'white',
    padding: 16,
  },
  headerMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  headerRightSpacer: {
    width: 40,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 20,
    paddingTop: 0,
    borderWidth: 1,
    borderTopColor: 'white',
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  input: {
    textAlignVertical: 'top',
    backgroundColor: "#F8FAFC",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#0F172A",
    marginBottom: 20,
  },
  inputFocused: {
    borderColor: "#4F46E5",
    backgroundColor: "#FFFFFF",
  },
  buttonGroup: {
    gap: 10,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#4F46E5",
    height: 50,
    borderRadius: 12,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: "#E2E8F0",
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  submitButtonTextDisabled: {
    color: "#94A3B8",
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
    height: 48,
    borderRadius: 12,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748B",
  },
});
