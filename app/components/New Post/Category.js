import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "../../config/Colors";
import { FontSizes, Spaces } from "../../config/font";

const data = [
  { label: "Item 1", value: "item1" },
  { label: "Item 2", value: "item2" },
  { label: "Item 3", value: "item3" },
  { label: "Item 4", value: "item4" },
  { label: "Item 5", value: "item5" },
  { label: "Item 6", value: "item6" },
  { label: "Item 7", value: "item7" },
  { label: "Item 8", value: "item8" },
];
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Category= ({ handleSelect,tab }) => {
  const [selected, setSelected] = useState([]);
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
    );
  };

  return (
    <View
      style={{
        width: windowWidth / 1.1,
        alignSelf: "center",
        backgroundColor: Colors.white,
        borderRadius: 12,
        paddingLeft: selected.length > 0 ? 10 : 0,
        paddingRight: selected.length > 0 ? 10 : 0,
        paddingBottom: selected.length > 0 ? 10 : 0,
      }}
    >
      <Dropdown
      style={{
        height: 50,
        width: "100%",
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 12,
      }}
      placeholderStyle={{
        fontSize: FontSizes.small,
        color: Colors.placeholder,
      }}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      labelField="label"
      valueField="value"
      placeholder="Choose Product Category"
      value={selected}
    //   search={false}
    //   searchPlaceholder="Search..."
      onChange={(item) => {
        setSelected(item);
        handleSelect(item);
      }}
      renderRightIcon={() => (
        <AntDesign
          style={styles.icon}
          color="black"
          name="search1"
          size={20}
        />
      )}
      renderItem={renderItem}
      renderSelectedItem={(item, unSelect) => (
        <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
          <View style={styles.selectedStyle}>
            <Image source={require("../../../assets/images/tinyMobile.png")} />
            <Text style={styles.textSelectedStyle}>{item.label}</Text>
            <AntDesign color="black" name="close" size={17} />
          </View>
        </TouchableOpacity>
      )}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#FFFAF1",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: FontSizes.smaller,
    marginLeft: Spaces.smaller,
  },
});
