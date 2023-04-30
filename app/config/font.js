import { Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export const FontFamily = {
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semiBold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
};

export const FontSizes = {
  regular: RFPercentage(2.6),
  large: RFPercentage(3.6),
  small: RFPercentage(2.2),
  smaller: RFPercentage(1.8),
};

export const ButtonSizes = {
  large: windowWidth / 1.2,
  small: windowWidth / 3.5,
  medium: windowWidth / 1.8,
};
export const Spaces = {
  large: RFPercentage(10),
  medium: RFPercentage(4),
  small: RFPercentage(2.5),
  smaller: RFPercentage(1),
  nLarge: RFPercentage(-10),
  nMedium: RFPercentage(-4),
  nSmall: RFPercentage(-2.5),
  nSmaller: RFPercentage(-1),
};
