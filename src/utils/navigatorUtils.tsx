import { router } from "@/app";
import { BackHandler } from "react-native";

export function routeBackOrExit() {
  router.canGoBack() ? router.back() : BackHandler.exitApp();
}