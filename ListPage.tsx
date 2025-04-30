import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, View, FlatList, Text, TextInput, Image, Pressable } from "react-native";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { colors, styles, Task, getTheme, useGlobalStore, getList, addItemToList, getListNames, removeItemFromList, getSettingsDataString, useLanguage, getDueDateText} from "./common";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App";


function ListPage({}) {
type NavigationProps = StackNavigationProp<RootStackParamList>;
const navigation = useNavigation<NavigationProps>();
const route = useRoute<RouteProp<RootStackParamList, 'List'>>();
let { language, loc } = useLanguage(getSettingsDataString("language"))

//REFRESH LIST WHEN SCREEN IN FOCUS
useFocusEffect(
  useCallback(() => {
    refreshList();
  }, []));


const [listName, setListName] = useState(route.params.item);
const [isInputError, setIsInputError] = useState<boolean>(false)

const [items, setItems] = useState(getList(listName))
function refreshList(){
  setItems(getList(listName));
}
  
  //DUMMY DATA
  const [itemss, setItemss] = useState<Task[]>([
    {title: "Task 1", completed: false},
    {title: "Task 2", description: "Finish the second task.", completed: true, dueDate: "2025-03-06T12:00:00"},
    {title: "Task 3", description: "Submit the project proposal.", completed: false, dueDate: "2025-02-07T09:00:00"},
    {title: "Task 4", description: "Review the code for errors.", completed: true, dueDate: "2025-03-08T14:00:00"},
    {title: "Task 5", description: "Prepare the meeting agenda.", completed: false, dueDate: "2025-03-09T11:00:00"},
    {title: "Task 6", description: "Send out invitations for the event.", completed: false, dueDate: "2025-03-10T15:00:00"},
    {title: "Task 7", description: "Update the website content.", completed: true, dueDate: "2025-03-11T16:00:00"},
    {title: "Task 8", description: "Write the weekly report.", completed: false, dueDate: "2025-03-12T17:00:00"},
    {title: "Task 9", description: "Organize the team meeting.", completed: false, dueDate: "2025-03-13T18:00:00"},
    {title: "Task 10", description: "Test the new features.", completed: true, dueDate: "2025-03-14T19:00:00"},
    {title: "Task 11", description: "Create a new design mockup.", completed: false, dueDate: "2025-03-15T20:00:00"},
    {title: "Task 12", description: "Deploy the website to production.", completed: true, dueDate: "2025-03-16T21:00:00"},
    {title: "Task 13", description: "Prepare the financial report.", completed: false, dueDate: "2025-03-17T22:00:00"},
    {title: "Task 14", description: "Write a blog post.", completed: false, dueDate: "2025-03-18T23:00:00"},
    {title: "Task 15", description: "Complete the team performance review.", completed: true, dueDate: "2025-03-19T08:00:00"},
    {title: "Task 16", description: "Update the marketing strategy document.", completed: false, dueDate: "2025-03-20T09:00:00"},
    {title: "Task 17", description: "Plan the next sprint.", completed: true, dueDate: "2025-03-21T10:00:00"},
    {title: "Task 18", description: "Create a client presentation.", completed: false, dueDate: "2025-03-22T11:00:00"},
    {title: "Task 19", description: "Check email inbox for urgent requests.", completed: false, dueDate: "2025-03-23T12:00:00"},
    {title: "Task 20", description: "Review quarterly goals.", completed: true, dueDate: "2025-03-24T13:00:00"}
  ]);

  //DO NOT SET ITEMS IN RELEASE
  if(getList(listName).length == 0 && __DEV__)
    itemss.forEach((item) => addItemToList(listName, item))

  const [text, setText] = useState("");
  const rerenderFlag = useGlobalStore((state) => state.rerenderFlag);
      useEffect(() => {
      }, [rerenderFlag]);

return(
    <SafeAreaView style={styles.container}>
      <View style={styles.headerMainPage}>
        <Text style={styles.listTitle}>{listName}</Text>
        
        <Pressable onPress={() => {navigation.navigate("SettingsPage")}} style={styles.settingsButton}><Image source={getTheme() == "dark" ? require('./images/settingsIconWhite.png') : require('./images/settingsIconBlack.png')} style={{width: 35, height: 35, resizeMode: "contain"}}></Image></Pressable>
      </View>
            <FlatList 
            style={styles.listContainer}
            data={items}
            renderItem={({ item, index }) => <Pressable onPress={() => {listName}}>
                <View
                style={[
                  item.dueDate == undefined ? item.completed == true ? styles.itemChecked : styles.itemUnchecked
                  : item.completed == true ? styles.itemChecked : new Date(item.dueDate) < new Date() ? styles.itemExpired : styles.itemUnchecked
                ]}>
                  <View style={{paddingHorizontal: 10, paddingVertical: 6}}>
                    <View style={{ flexDirection: "row"}}>
                      <Text style={styles.listItemTitle}>{item.title}</Text>
                      <Pressable style={styles.listItemEditButton} onPress={() => {navigation.navigate("EditItem", {item, index, listName}); refreshList()}}>
                        <Image style={styles.listItemEditImage} source={getTheme() == "light" ? require('./images/editBlack.png') : require('./images/editWhite.png')}></Image>
                      </Pressable>
                      <Pressable onPress={() => {removeItemFromList(listName, index); refreshList()}}>
                        <Image style={styles.listItemDeleteImage} source={getTheme() == "light" ? require('./images/deleteBlack.png') : require('./images/deleteWhite.png')}></Image>
                      </Pressable>
                    </View>
                    
                    {item.description != undefined && <Text  style={styles.listItemDescription}>{item.description}</Text>}
                    {item.dueDate != undefined && <Text style={[styles.listItemDueDate, new Date(item.dueDate) < new Date() ? {color: "red"} : {}]}>{getDueDateText(item.dueDate, language["code"])}</Text>}
                  </View>
                </View>
                </Pressable>}
            ListEmptyComponent={<Text style={styles.emptyListText}>{loc.emptyList}</Text>}
            />
        <View style={styles.bottomInputBar}>
          <TextInput
              style={[styles.inputItem, isInputError ? {borderColor: "red"} : {}]}
              placeholder={loc.addItemTextPlaceholder}
              placeholderTextColor={colors.text}
              value={text}
              onChangeText={setText}
          />
          <Pressable style={styles.inputItemButton} onPress={() => {addItemToList(listName, {"title": text, "completed": false}) ? setIsInputError(false) : setIsInputError(true);  setText(""); refreshList()}}>
            <Image style={styles.inputItemButtonImage} source={require("./images/arrowUpWhite.png")} />
          </Pressable>
        </View>
    </SafeAreaView>
  );
};

export default ListPage;
