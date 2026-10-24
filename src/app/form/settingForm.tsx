import { routeBackOrExit } from "@/utils/navigatorUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingForm() {
  const [textSize, setTextSize] = useState<number>(18);
  useEffect(() => {
    (async () => {
      const size = await AsyncStorage.getItem('@textSize') || 18;
      setTextSize(Number(size));
    })();
  }, []);

  const handleSubmit = async () => {
    await AsyncStorage.setItem('@textSize', String(textSize))
    routeBackOrExit();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
            <Text style={styles.headerTitle}>환경 설정</Text>
            <View style={styles.headerRightSpacer} />
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <View style={styles.iconCircle}>
                  <FontAwesomeFreeSolid name="font" size={16} color="#4F46E5" />
                </View>
                <Text style={styles.cardTitle}>글자 크기</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{Math.round(textSize)}px</Text>
              </View>
            </View>

            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={12}
                maximumValue={48}
                step={1}
                value={textSize}
                onValueChange={(val) => {if(val) setTextSize(val)}}
                minimumTrackTintColor="#4F46E5"
                maximumTrackTintColor="#E2E8F0"
                thumbTintColor="#4F46E5"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabelText}>작게 (12px)</Text>
                <Text style={styles.sliderLabelText}>크게 (48px)</Text>
              </View>
            </View>

            <View style={styles.previewSection}>
              <Text style={styles.previewLabel}>미리보기</Text>
              <View style={styles.previewBox}>
                <View style={[styles.previewCheckCircle, {width: textSize, height: textSize}]} />
                <Text
                  style={[styles.previewText, { fontSize: textSize }]}
                  numberOfLines={2}
                >
                  오늘의 할 일
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <FontAwesomeFreeSolid name="check" size={14} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>설정 저장하기</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  badge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4F46E5",
  },
  sliderContainer: {
    marginBottom: 24,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  sliderLabelText: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500",
  },
  previewSection: {
    marginBottom: 24,
  },
  previewLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 8,
  },
  previewBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    minHeight: 64,
  },
  previewCheckCircle: {
    minWidth: 18,
    minHeight: 18,
    maxWidth: 36,
    maxHeight: 36,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    marginRight: 12,
  },
  previewText: {
    flex: 1,
    color: "#1E293B",
    fontWeight: "500",
  },
  saveButton: {
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
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
