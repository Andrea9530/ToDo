import React, { useState } from "react";
import { View, Text, TextInput, BackHandler, Pressable } from "react-native";
import { RouteProp, useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import { getColors, getSettingsDataString, getStyles, removeList, useLanguage, getList, editListName } from "./common";
import CustomAlert from "./customAlert";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App";


function EditList() {
    type NavigationProps = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProps>();
    const route = useRoute<RouteProp<RootStackParamList, 'EditList'>>();
    const originalListName = JSON.stringify(route.params.item).replace(/\"/g, "")
    const [listName, setListName] = useState(route.params.item);
    const styles = getStyles();
    const colors = getColors();
    let { loc } = useLanguage(getSettingsDataString("language"))
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [alertEditOpen, setAlertEditOpen] = useState(false)
    const [alertDeleteOpen, setAlertDeleteOpen] = useState(false)
    const [alertChangeOpen, setAlertChangeOpen] = useState(false)
    const [alertEmptyNameOpen, setAlertEmptyNameOpen] = useState(false)

    //SHOW ALERT IF LIST HAS BEEN MODIFIED AND BACK KEY IS PRESSED
    useFocusEffect(
      React.useCallback(() => {
    
    const backAction = () => {
      if(originalListName != JSON.stringify(listName).replace(/\"/g, "") && getSettingsDataString("alertChangesNotSaved")){
        setAlertEditOpen(true)
      return true;
    }
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [listName]));
    
    return (
        <View style={styles.editItemcontainer}>

          {/*DELETE LIST ALERT*/}
          {alertDeleteOpen && getSettingsDataString("alertListNotEmpty") &&
          <CustomAlert
            title={loc.attention}
            description={loc.alertListNotEmpty}
            checkBoxText={loc.doNotAskAgain}
            checkboxKey="alertListNotEmpty"
            close={loc.cancel}
            confirm={loc.confirm}
            onClose={() => {setTimeout(() => {
              setAlertDeleteOpen(false)
            }, 100)}}
            onConfirm={() => {setTimeout(() => {
              setAlertDeleteOpen(false)
            }, 100);
            removeList(listName);
            navigation.goBack()}}
          />}

          {/*UNSAVED CHANGES ALERT*/}
          {alertEditOpen && getSettingsDataString("alertChangesNotSaved") &&
          <CustomAlert
            title={loc.attention}
            description={loc.alertExitEditingDescription}
            checkBoxText={loc.doNotAskAgain}
            checkboxKey="alertChangesNotSaved"
            close={loc.cancel}
            confirm={loc.confirm}
            onClose={() => {setTimeout(() => {
              setAlertEditOpen(false)
            }, 100)}}
            onConfirm={() => {setTimeout(() => {
              setAlertEditOpen(false)
            }, 100);navigation.goBack()}}
          />}

          {/*CHANGE NAME ALERT*/}
          {alertChangeOpen &&
          <CustomAlert
            title={loc.attention}
            description={loc.alertEditDescription}
            confirm={loc.ok}
            onConfirm={() => {setAlertChangeOpen(false)}}
          />}
          {/*NAME EMPTY ALERT*/}
          {alertEmptyNameOpen &&
          <CustomAlert
            title={loc.attention}
            description={loc.alertEmptyNameDescription}
            confirm={loc.ok}
            onConfirm={() => {setAlertEmptyNameOpen(false)}}
          />}
          <Text style={styles.editItemLabel}>{loc.title}</Text>
          <TextInput
            style={styles.editItemInput}
            value={listName}
            onChangeText={(newTitle) => setListName(newTitle)}
            placeholder={loc.editTaskTitlePlaceholder}
            placeholderTextColor={colors.text_faded}
          />

          <Pressable style={styles.editListDeleteButton} onPress={() => {
            if(getList(originalListName).length > 0 && getSettingsDataString("alertListNotEmpty")){
              setAlertDeleteOpen(true)
            }else{
              removeList(originalListName); navigation.goBack();
            }
            }} >
            <Text style={styles.editListDeleteButtonText}>{loc.editListDelete}</Text>
          </Pressable>
          <Pressable style={styles.editListApplyButton} onPress={() => {
            if(listName.trim() == ""){
              setAlertEmptyNameOpen(true)
            }else{
            editListName(originalListName, JSON.stringify(listName).replace(/\"/g, "")) ? navigation.goBack() : setAlertChangeOpen(true)}}}>
            <Text style={styles.editListApplyButtonText}>{loc.submit}</Text>
          </Pressable>
        </View>
      );
}
export default EditList;