import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, View, FlatList, Text, TextInput, Image, Pressable } from "react-native";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { colors, styles, getTheme, useGlobalStore,  getListNames, getSettingsDataString, useLanguage, addList} from "./common";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App";

function MainPage({}) {
type NavigationProps = StackNavigationProp<RootStackParamList>;
const navigation = useNavigation<NavigationProps>();
const route = useRoute<RouteProp<RootStackParamList, 'Main'>>();
let { loc } = useLanguage(getSettingsDataString("language"))
const [isInputError, setIsInputError] = useState<boolean>(false)

//REFRESH LIST WHEN SCREEN IN FOCUS
useFocusEffect(
  useCallback(() => {
    refreshList();
  }, []));

  const [listNames, setListNames] = useState<string[]>(getListNames())
  function refreshList(){
    setListNames(getListNames());
  }
  const [text, setText] = useState("");

  const rerenderFlag = useGlobalStore((state) => state.rerenderFlag);
  
      useEffect(() => {
      }, [rerenderFlag]);

return(
    <SafeAreaView style={styles.container}>
      <View style={styles.headerMainPage}>
        <Text style={styles.listTitle}>{loc.listsPageTitle}</Text>
        <Pressable onPress={() => {navigation.navigate("SettingsPage")}} style={styles.settingsButton}><Image source={getTheme() == "dark" ? require('./images/settingsIconWhite.png') : require('./images/settingsIconBlack.png')} style={{width: 35, height: 35, resizeMode: "contain"}}></Image></Pressable>
      </View>
            <FlatList 
            style={styles.listContainer}
            data={listNames}
            renderItem={({ item }) => <Pressable onPress={() => {navigation.navigate("List", {item})}}>
                <View
                style={styles.itemUnchecked}>
                  <View style={{paddingHorizontal: 10, paddingVertical: 6}}>
                    <View style={{ flexDirection: "row"}}>
                      <Text style={styles.listItemTitle}>{item}</Text>
                      <Pressable onPress={() => {navigation.navigate("EditList", {item}); refreshList()}}>
                        <Image style={{width: 35, height: 35, resizeMode: "contain"}} source={getTheme() == "light" ? require('./images/editBlack.png') : require('./images/editWhite.png')}></Image>
                      </Pressable>
                    </View>
                  </View>
                </View>
                </Pressable>}
            ListEmptyComponent={<Text style={styles.emptyListText}>{loc.noList}</Text>}
            />
        <View style={styles.bottomInputBar}>
          <TextInput
              style={[styles.inputItem, isInputError ? {borderColor: "red"} : {}]}
              placeholder={loc.createListTextPlaceholder}
              placeholderTextColor={colors.text}
              value={text}
              onChangeText={setText}
          />
          <Pressable style={styles.inputItemButton} onPress={() => {addList(text) ? setIsInputError(false) : setIsInputError(true);  setText(""); refreshList()}}>
            <Image style={styles.inputItemButtonImage} source={require("./images/arrowUpWhite.png")} />
          </Pressable>
        </View>
    </SafeAreaView>
  );
};

export default MainPage;
