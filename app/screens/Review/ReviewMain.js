import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../components/CustomHeader";
import { RFPercentage } from "react-native-responsive-fontsize";
import Screen from "../../components/Screen";
import ProfileData from "../../components/ProfileData";
import { FontFamily, FontSizes, Spaces } from "../../config/font";
import Colors from "../../config/Colors";
import ProductView from "../../components/ProductView";
import { ProgressBar } from "react-native-paper";
import ReviewDetails from "../../components/ReviewDetails";
import LikeSavepost from "../../components/LikeSavepost";

const product = {
  id: 1,
  image: require("../../../assets/images/photo1.png"),
  name: "APPLE iPhone 13 Pro (Silver, 128 GB)",
  star: "9.1",
  reviews: "2,987",
  originalPrice: "52369",
  discountedPrice: "45678",
};
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const scoreList = [
  {
    id: 0,
    name: "Overall",
    score: 9.5,
    image: null,
    details:
      "The iPhone 13 Pro has a 2532x1170 resolution with 460 pixels per inch, while the iPhone 13 Pro Max has a 2778x1284 resolution with 458 pixels per inch. Both iPhones feature 1200 nits max brightness for HDR, along with True Tone to match the color temperature of the display to the ambient light, Wide Color for rich, vivid hues, and Haptic Touch for feedback The front-facing True Depth camera system has been updated and the Face ID notch is now smaller, taking up less overall space. Like last year's models, the iPhone 13 Pro and 13 Pro Max feature a Ceramic Shield cover glass that is infused with nano-ceramic crystals for better protection from drops. IP68 water and dust resistance is included, and the new iPhones can hold up to submersion in 6 meters of water for up to 30 minutes. #iphone13pro",
  },
  {
    id: 1,
    name: "Display",
    score: 9.5,
    image: require("../../../assets/images/rvw_display.png"),
    details:
      "The iPhone 13 Pro display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.06 inches diagonally (actual viewable area is less).The Super Retina and Super Retina XDR .iPhone 13 Pro can already shoot superb-looking video with rich colors and tons of detail, thanks to its 4K resolution and 6.1-inch Super Retina XDR displays using OLED technology with a resolution of 2532 x 1170 pixels. This equals 460 pixels per inch. The iPhone 13 Pro, however, features a max",
  },
  {
    id: 2,
    name: "Front Camera",
    score: 6,
    image: require("../../../assets/images/rvw_display.png"),
    details:
      "The iPhone 13 Pro display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.06 inches diagonally (actual viewable area is less).The Super Retina and Super Retina XDR .iPhone 13 Pro can already shoot superb-looking video with rich colors and tons of detail, thanks to its 4K resolution and 6.1-inch Super Retina XDR displays using OLED technology with a resolution of 2532 x 1170 pixels. This equals 460 pixels per inch. The iPhone 13 Pro, however, features a max",
  },
  {
    id: 3,
    name: "Back Camera",
    image: require("../../../assets/images/rvw_back.png"),
    score: 7,
    details:
      "The iPhone 13 Pro display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.06 inches diagonally (actual viewable area is less).The Super Retina and Super Retina XDR .iPhone 13 Pro can already shoot superb-looking video with rich colors and tons of detail, thanks to its 4K resolution and 6.1-inch Super Retina XDR displays using OLED technology with a resolution of 2532 x 1170 pixels. This equals 460 pixels per inch. The iPhone 13 Pro, however, features a max",
  },
  {
    id: 4,
    name: "Speaker",
    score: 8,
    image: require("../../../assets/images/rvw_back.png"),
    details:
      "The iPhone 13 Pro display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.06 inches diagonally (actual viewable area is less).The Super Retina and Super Retina XDR .iPhone 13 Pro can already shoot superb-looking video with rich colors and tons of detail, thanks to its 4K resolution and 6.1-inch Super Retina XDR displays using OLED technology with a resolution of 2532 x 1170 pixels. This equals 460 pixels per inch. The iPhone 13 Pro, however, features a max",
  },
  {
    id: 5,
    name: "Battery Performance",
    score: 9.8,
    image: require("../../../assets/images/rvw_back.png"),
    details:
      "The iPhone 13 Pro display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.06 inches diagonally (actual viewable area is less).The Super Retina and Super Retina XDR .iPhone 13 Pro can already shoot superb-looking video with rich colors and tons of detail, thanks to its 4K resolution and 6.1-inch Super Retina XDR displays using OLED technology with a resolution of 2532 x 1170 pixels. This equals 460 pixels per inch. The iPhone 13 Pro, however, features a max",
  },
];
export default function ReviewMain({ route, navigation }) {
  const [visible, setVisible] = useState(false);
  const { image, data, title, subtitle } = route.params;
  return (
    <Screen style={{ flex: 1, backgroundColor: "#fff" }}>
      <CustomHeader
        backButton={() =>
          navigation.navigate("BottomTab", { screen: "HomeScreen" })
        }
        headerName={"APPle Iphone 13Pro"}
        rightbutton={true}
      />
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* profile header */}
        <View
          style={{
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProfileData
            image={image}
            title={title}
            subtitle={subtitle}
            navigation={navigation}
            followers={true}
            width="100%"
            noBottomModal={true}
          />
          {/* status */}
          <Text
            style={{
              fontFamily: FontFamily.regular,
              fontSize: FontSizes.regular,
            }}
          >
            Apple iPhone 13 Pro Review |The Best iPhone Yet!
          </Text>
          <ImageBackground
            style={{
              width: "100%",
              height: windowHeight / 1.7,
              marginVertical: Spaces.small,
            }}
            imageStyle={{
              borderWidth: 1,
              borderRadius: Spaces.small,
            }}
            source={require("../../../assets/images/rvw_img.png")}
          >
            <View
              style={{
                width: RFPercentage(8),
                height: RFPercentage(4),
                flexDirection: "row",
                marginLeft: RFPercentage(1),
                marginTop: RFPercentage(1),
                borderRadius: RFPercentage(1),
                backgroundColor: "rgba(0,0,0,.4)",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 99,
              }}
            >
              <Image
                style={{ width: RFPercentage(2), height: RFPercentage(2) }}
                source={require("../../../assets/images/eyeicon.png")}
              />
              <Text
                style={{
                  fontSize: RFPercentage(1.5),
                  fontWeight: "600",
                  color: Colors.purewhite,
                  marginLeft: RFPercentage(0.5),
                  zIndex: 999,
                }}
              >
                2.6M
              </Text>
            </View>
          </ImageBackground>
          {/* Product in this review */}
          <View style={{ width: "90%" }}>
            <Text
              style={{
                fontSize: FontSizes.small,
                fontFamily: FontFamily.medium,
                textAlign: "left",
              }}
            >
              Product in this review
            </Text>
            <ProductView i={product} />
          </View>
          {/* Score Card */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              borderWidth: 1.5,
              borderColor: Colors.lightPlaceHolder,
              borderRadius: Spaces.smaller,
              padding: RFPercentage(1.7),
              marginVertical: Spaces.small,
            }}
          >
            <View>
              <Text
                style={{
                  textAlign: "left",
                  fontFamily: FontFamily.semiBold,
                  color: Colors.placeholder,
                  fontSize: FontSizes.regular,
                }}
              >
                Overall Score:
              </Text>
            </View>
            <View
              style={{
                width: 2,
                height: RFPercentage(9),
                backgroundColor: Colors.lightPlaceHolder,
                position: "absolute",
                left: windowWidth / 1.7,
              }}
            />
            <View>
              <Text
                style={{
                  textAlign: "center",
                  backgroundColor:
                    9.8 > 5 && 9.8 < 8
                      ? Colors.darkYellow
                      : 9.8 < 6
                      ? Colors.red
                      : Colors.green,
                  width: Spaces.large,
                  fontFamily: FontFamily.semiBold,
                  color: Colors.placeholder,
                  fontSize: FontSizes.regular,
                  textAlignVertical: "center",
                  color: Colors.purewhite,
                  borderRadius: RFPercentage(1),
                  paddingVertical: 2,
                }}
              >
                9.8
              </Text>
            </View>
          </View>

          {/* Score List */}
          <View
            style={{
              width: "100%",
              marginVertical: Spaces.small,
            }}
          >
            {scoreList.map((itm, indx) => (
              <View
                key={`score_${indx}`}
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  marginVertical: Spaces.smaller,
                }}
              >
                <Text
                  style={{
                    color: Colors.placeholder,
                    fontFamily: FontFamily.regular,
                  }}
                >
                  {itm.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color:
                        itm.score > 5 && itm.score < 8
                          ? Colors.darkYellow
                          : itm.score < 6
                          ? Colors.red
                          : Colors.green,
                      fontFamily: FontFamily.medium,
                    }}
                  >
                    {itm.score}
                  </Text>
                  <ProgressBar
                    style={{
                      width: RFPercentage(10),
                      height: RFPercentage(1),
                      marginLeft: Spaces.smaller,
                    }}
                    progress={itm.score / 10}
                    color={
                      itm.score > 5 && itm.score < 8
                        ? Colors.darkYellow
                        : itm.score < 6
                        ? Colors.red
                        : Colors.green
                    }
                  />
                </View>
              </View>
            ))}
          </View>

          {/* View All */}
          {visible ? (
            <Text
              onPress={() => {
                setVisible(!visible);
              }}
              style={{
                fontFamily: FontFamily.semiBold,
                color: Colors.primary,
              }}
            >
              View all &#x2227;
            </Text>
          ) : (
            <Text
              onPress={() => {
                setVisible(!visible);
              }}
              style={{
                fontFamily: FontFamily.semiBold,
                color: Colors.primary,
                marginBottom: windowHeight / 7,
              }}
            >
              View all &#x2228;
            </Text>
          )}
          {/* View all score details */}
          {visible && <ReviewDetails data={scoreList} />}
        </View>
      </ScrollView>
      {/* Fixed bottom */}
      <View
        style={{
          position: "absolute",
          height: windowHeight / 8,
          width: windowWidth,
          elevation: 5,
          shadowColor: Colors.black,
          borderTopRightRadius: Spaces.medium,
          borderTopLeftRadius: Spaces.medium,
          bottom: 0,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "90%",
            position: "absolute",
            bottom: 0,
            backgroundColor: Colors.purewhite,
            borderTopRightRadius: Spaces.medium,
            borderTopLeftRadius: Spaces.medium,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              justifyContent: "center",
            }}
          >
            <LikeSavepost
              data={scoreList}
              likes={9}
              dislikes={10}
              rvw={true}
              navigation={navigation}
              add={120}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}
