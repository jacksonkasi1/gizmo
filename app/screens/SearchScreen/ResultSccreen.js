import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FontFamily, FontSizes } from "../../config/font";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  filterOptions,
  productShowed,
} from "../../components/MockData/mockData";
import ResultFlatlist from "../../components/SearchComponent/ResultFlatlist";
import FilterHeader from "../../components/FilterHeader";
import { useState } from "react";
import Colors from "../../config/Colors";

const ResultSccreen = ({ navigation }) => {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(0);
  return (
    <View style={styles.container}>
      {/* result header */}
      <View style={{ alignSelf: "center" }}>
        <FilterHeader
          backButton={() => navigation.goBack()}
          headerName="Result"
          subHeader="28"
          rightbutton={true}
          filter={() => {
            setModal(true);
          }}
        />
      </View>
      {/* flalist of results */}
      <FlatList
        style={styles.flatlist}
        data={productShowed}
        renderItem={({ item }) => <ResultFlatlist data={item} />}
        keyExtractor={(item) => item.id}
      />
      {/* filter modal section */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModal(!modal);
        }}
      >
        <View style={styles.modalView}>
          {/* filter header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setModal(!modal)}
            >
              <AntDesign
                name="left"
                size={20}
                color={"#ef7e46"}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.headerName}>Filter</Text>
          </View>
          {/* options section */}
          {filterOptions.map((i) => {
            return (
              <View style={styles.filterView}>
                <Text style={styles.filterText}>{i.name}</Text>
                <TouchableOpacity onPress={() => setId(i?.id)} style={styles.filterButton}>
                  {id === i.id ? (
                    <Ionicons name="radio-button-on" size={24} color={Colors.third} />
                  ) : (
                    <Ionicons name="radio-button-off" size={24} color={Colors.third} />
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => setModal(!modal)}>
              <Text style={styles.textStyle}>Apply</Text>
            </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ResultSccreen;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  flatlist: {
    flex: 1,
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
  },
  button: {
    position:'absolute',
    bottom:20,
    borderRadius: 5,
    padding:10,
    width:windowWidth/1.2,
  backgroundColor:Colors.third
  },
  textStyle: {
    color:Colors.white,
    fontFamily:FontFamily.semiBold,
    fontSize:FontSizes.regular,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  header: {
    backgroundColor: "#fff",
    width: windowWidth / 1,
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 5,
    // margin: 10,
  },
  backButton: {
    height: 30,
    width: 30,
    marginTop: "3%",
    marginLeft: "3%",
    borderRadius: 100 / 2,
    elevation: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
  },
  headerName: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    width: "80%",
    marginTop: "3%",
    fontFamily: FontFamily.regular,
    // marginLeft: "2%",
    textAlign: "center",
  },
  filterView: {
    justifyContent: 'space-between',
    flexDirection: "row",
    marginTop:"3%"
  },
  filterText:{
    fontSize: FontSizes.small,
    color: Colors.darkGrey,
    width: "80%",
    marginTop: "2%",
    fontFamily: FontFamily.regular,
  },
  filterButton:{
    marginTop: "2%",
  }
});
