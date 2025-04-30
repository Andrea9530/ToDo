import React, { useState } from "react";
import { View, Text, TextInput, BackHandler, Pressable } from "react-native";
import { RouteProp, useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker'
import { getColors, getSettingsDataString, getStyles, getTheme, Task, updateItemFromList, useLanguage } from "./common";
import CustomAlert from "./customAlert";
import { Image } from "@rneui/base";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App";



function EditItem() {
    type NavigationProps = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProps>();
    const route = useRoute<RouteProp<RootStackParamList, 'EditItem'>>();

    const task: Task = route.params.item
    const index: number = route.params.index
    const listName = route.params.listName
    
    const styles = getStyles();
    const colors = getColors();
    let { language, loc } = useLanguage(getSettingsDataString("language"))
    const [alertEditOpen, setAlertEditOpen] = useState(false);
    const [alertEmptyTitleOpen, setAlertEmptyTitleOpen] = useState(false);
    const [dateOpen, setDateOpen] = useState(false)
    const [timeOpen, setTimeOpen] = useState(false)
    const [item, setItem] = useState<Task>({title: task.title,
                                            description: task.description,
                                            completed: task.completed,
                                            dueDate: task.dueDate
                                            });
    const [date, setDate] = useState<Date>(new Date(item.dueDate ?? new Date()))


    const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const timeOptions: Intl.DateTimeFormatOptions = { year: undefined, hour: '2-digit', minute: '2-digit'};
    const originalItem = route.params.item;
    
    //SHOW ALERT IF ITEM HAS BEEN MODIFIED AND BACK KEY IS PRESSED
    useFocusEffect(
      React.useCallback(() => {
    const backAction = () => {
      if((JSON.stringify(originalItem) != JSON.stringify(item)) && getSettingsDataString("alertChangesNotSaved")){
      setAlertEditOpen(true)
      return true;
    }
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [item]));
    
    return (
        <View style={styles.editItemcontainer}>
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
          {/*TITLE EMPTY ALERT*/}
          {alertEmptyTitleOpen &&
          <CustomAlert
            title={loc.attention}
            description={loc.alertEmptyTitleDescription}
            confirm={loc.ok}
            onConfirm={() => {setAlertEmptyTitleOpen(false)}}
          />}
          <Text style={styles.editItemLabel}>{loc.title}</Text>
          <TextInput
            style={styles.editItemInput}
            value={item.title}
            onChangeText={(newTitle) => setItem(prevItem => ({...prevItem, title: newTitle}))}
            placeholder={loc.editTaskTitlePlaceholder}
            placeholderTextColor={colors.text_faded}
          />

          <Text style={styles.editItemLabel}>{loc.description}</Text>
          <TextInput
            style={[styles.editItemInput, styles.editItemTextArea]}
            value={item.description}
            onChangeText={(newDescription) => setItem(prevItem => ({...prevItem, description: newDescription}))}
            placeholder={loc.editTaskDecriptionPlaceholder}
            placeholderTextColor={colors.text_faded}
            multiline
          />
          <View style={{flexDirection: "row"}}>
            <Text style={styles.editItemLabel}>{loc.dueDate}</Text>
            <Pressable style={styles.editItemDeleteInlineButton} onPress={() => setItem(prevItem => {const { dueDate, ...rest } = prevItem;return rest;})}>
              <Image style={{width: 35, height: 35, resizeMode: "contain"}} source={getTheme() == "light" ? require('./images/deleteBlack.png') : require('./images/deleteWhite.png')} ></Image>
            </Pressable>
          </View>
          <View style={{flexDirection: "row"}}>
            <Pressable style={styles.editItemDateTimeButton} onPress={() => setDateOpen(true)}><Text style={styles.editItemDateTimeButtonText}>{item.dueDate ? new Date(item.dueDate).toLocaleDateString(language["code"], dateOptions) : loc.selectDateTitle}</Text></Pressable>
            <View style={{marginHorizontal: 10}}></View>
            <Pressable style={styles.editItemDateTimeButton} onPress={() => setTimeOpen(true)}><Text style={styles.editItemDateTimeButtonText}>{item.dueDate ? new Date(item.dueDate).toLocaleTimeString(language["code"], timeOptions) : loc.selectTimeTitle}</Text></Pressable>
            
          </View>
          <DatePicker
            modal
            mode="date"
            theme={getTheme()}
            open={dateOpen}
            title={loc.selectDateTitle}
            confirmText={loc.confirm}
            cancelText={loc.cancel}
            locale={language["code"]}
            date={date < new Date() ? new Date() : date}
            minimumDate={
              item.dueDate === undefined ? undefined : 
              (new Date(item.dueDate).toDateString() <= new Date().toDateString() ? 
                new Date() : undefined)
            }
            
            onConfirm={(newDate) => {
              setDateOpen(false);
              if(item.dueDate !== undefined){
                const oldDate = new Date(item.dueDate);
                newDate.setHours(oldDate.getHours())
                newDate.setMinutes(oldDate.getMinutes())
              }
              
              {setItem(prevItem => ({...prevItem, dueDate: newDate.toString()}))}
            }}
            onCancel={() => {
              setDateOpen(false)
            }}
          />
          <DatePicker
            modal
            mode="time"
            open={timeOpen}
            title={loc.selectTimeTitle}
            confirmText={loc.confirm}
            cancelText={loc.cancel}
            is24hourSource="locale"
            locale={language["code"]}
            date={date}
            minimumDate={
              item.dueDate === undefined ? undefined : 
              (new Date(item.dueDate).setHours(0,0,0,0) === new Date().setHours(0,0,0,0) ? 
                new Date() : undefined)
            }
            onConfirm={(newDate) => {
              setTimeOpen(false);
              if(item.dueDate !== undefined){
                const oldDate = new Date(item.dueDate);
                newDate.setFullYear(oldDate.getFullYear());
                newDate.setMonth(oldDate.getMonth());
                newDate.setDate(oldDate.getDate());
              }
              {setItem(prevItem => ({...prevItem, dueDate: newDate.toString()}))}
            }}
            onCancel={() => {
              setTimeOpen(false)
            }}
          />
          
          <Pressable style={styles.editItemApplyButton} onPress={() => {
            if(item.title.trim() == ""){
              setAlertEmptyTitleOpen(true);
            }else{
            updateItemFromList(listName, index, item);navigation.goBack()}}}>
            <Text style={styles.editItemApplyButtonText}>{loc.submit}</Text>
          </Pressable>
        </View>
      );
}
export default EditItem;