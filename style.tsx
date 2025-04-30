import { StyleSheet } from "react-native";

export interface Theme {
  [key: string]: string;
}

export const darkTheme: Theme = {
  background: "#000",
  text: "#fff",
  text_faded: "#aaa",
  text_description: "#eee",
  border: "#777",
  border_faded: "#888",
  title: "#ccc",
  languageDropdown: "#666",
  languageDropdownSelected: "#444",
  listItemBackground: "#1c1c1e",
  alertOutBackground: "rgba(255,255,255,0.05)",
  alertBorderColor: "rgba(255,255,255,0.2)",
  alertCloseButton: "#1e1e1e",
  alertCloseDisabledButton: "#2b2b2b",
  alertCanceDisabledlText: "#888"
};

export const lightTheme: Theme = {
  background: "#fff",
  text: "#000",
  text_faded: "#555",
  text_description: "#111",
  border: "#bbb",
  border_faded: "#888",
  title: "#222",
  languageDropdown: "#ddd",
  languageDropdownSelected: "#ddd",
  listItemBackground: "#ddd",
  alertOutBackground: "rgba(0,0,0,0.15)",
  alertBorderColor: "rgba(0,0,0,0.1)",
  alertCloseButton: "#ccc",
  alertCloseDisabledButton: "#eee",
  alertCanceDisabledlText: "#aaa"
};

export const createColors = (theme: typeof lightTheme) => {
  return {
    background: theme.background,
    text: theme.text,
    text_faded: theme.text_faded,
  };
};

const textSize = 18;
const borderRadius = 10;


export const createStyles = (theme: typeof lightTheme) => StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      backgroundColor: theme.background
    },
    
    //LANGUAGE DROPDOWN
    languageDropdown: {
      alignSelf: "flex-end",
      margin: 0,
      height: 40,
      width: 150,
      backgroundColor: theme.languageDropdown,
      borderRadius: borderRadius,
      borderWidth: 0,
      paddingHorizontal: 8,
    },
    languageDropdownOpen: {
      alignSelf: "flex-end",
      margin: 0,
      height: 40,
      width: 150,
      backgroundColor: theme.languageDropdown,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 8,
    },
    languageDropdownContainer: {
      backgroundColor: theme.languageDropdown,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      marginLeft: 1,
      borderWidth: 0,
    },
    languageDropdownSearch: {
      borderWidth: 0,
    },
    languageDropdownPlaceholderStyle: {
      fontSize: textSize,
    },
    languageDropdownIconStyle: {
      width: 20,
      height: 20,
    },

    //ONBOARDING
    onboardingView: {
      padding: 20, 
      borderWidth: 1, 
      borderColor: '#ccc',
      borderRadius: borderRadius,
      position: 'relative',
      top: '35%',
    },
    onboardingTitle: {
      textAlign: 'center',
      fontSize: 24,
      marginBottom: 10,
      color: theme.title
    },
    onboardingInput: {
        flex: 9,
        color: theme.text,
        borderWidth: 2,
        padding: 8,
        borderRadius: borderRadius,
    },
    onboardingInputSend: {
      alignSelf: 'flex-start',
      alignItems: "center",
      justifyContent: "center",
      marginInlineStart: 10,
      color: theme.text,
      backgroundColor: "green",
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      borderRadius: borderRadius,
    },
    onboardingInputSendText:{
      fontSize: textSize,
      textAlign: "center",
    },

    //MAIN PAGE
    headerMainPage: {
      flexDirection: "row",
    },
    listTitle: {
      flex: 4,
      textAlign: "left",
      fontSize: 35,
      fontWeight: "bold",
      color: theme.title
    },
    settingsButton: {
      justifyContent: "center"
    },
    listContainer: {
      marginHorizontal: -10,
      paddingHorizontal: 10,
      marginBottom: 5,
      paddingBottom: 10
    },
    emptyListText: {
      color: theme.text,
      fontSize: textSize,
      textAlign: "center",
      paddingTop: 20
    },
    listItemTitle: {
      flex: 6,
      fontSize: 22,
      color: theme.text,
    },
    listItemDeleteImage: {
      width: 35,
      height: 35,
      resizeMode: "contain"
    },
    listItemEditButton: {
      
    },
    listItemEditImage: {
      width: 33,
      height: 33, 
      resizeMode: "contain"
    },
    listItemDescription: {
      fontSize: textSize,
      color: theme.text_description
    },
    listItemDueDate: {
      fontSize: textSize,
      color: theme.text_description
    },
    itemChecked: {
      backgroundColor: theme.listItemBackground,
      marginTop: 10,
      borderRadius: borderRadius,
    },
    itemUnchecked: {
      backgroundColor: theme.listItemBackground,
      marginTop: 10,
      borderRadius: borderRadius,
    },
    itemExpired: {
      backgroundColor: theme.listItemBackground,
      marginTop: 10,
      borderRadius: borderRadius,
    },
    bottomInputBar: {
      flexDirection: "row",
      marginVertical: 8,
      height: 45,
    },
    inputItem: {
      flex: 8,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: borderRadius,
      height: 45,
      paddingHorizontal: 10,
      color: theme.text,
    },
    inputItemButton: {
      marginStart: 10,
      borderRadius: 100,
      borderColor: theme.border,
      height: 45,
      width: 45,
      backgroundColor: "#2196F3",
      alignSelf: 'flex-start',
      alignItems: "center",
      justifyContent: "center",
    },
    inputItemButtonImage:{
      height: 35,
      width: 35,
      resizeMode: "contain",
    },
    text:{
      color: theme.text
    },

    //EDIT LIST
    editListApplyButton: {
      marginHorizontal: 80,
      marginTop: 20,
      borderColor: '#2196F3',
      borderWidth: 2,
      borderRadius: borderRadius,
    },
    
    editListApplyButtonText: {
      color: theme.text,
      fontSize: 24,
      fontWeight: "bold",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    editListDeleteButton: {
      marginHorizontal: 80,
      marginTop: 5,
      borderColor: 'red',
      borderWidth: 2,
      borderRadius: borderRadius,
    },
    editListDeleteButtonText: {
      color: theme.text,
      fontSize: 24,
      fontWeight: "bold",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },

    //ITEM PAGE
    editItemcontainer: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: theme.background
    },
    editItemLabel: {
      color: theme.text,
      fontSize: 20,
      marginVertical: 10,
    },
    editItemInput: {
      color: theme.text,
      height: 40,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: borderRadius,
      paddingLeft: 10,
      marginBottom: 15,
    },
    editItemTextArea: {
      height: 100,
      paddingVertical: 5,
      textAlignVertical: 'top',
    },
    editItemDateTimeButton: {
      flex: 4,
      height: 40,
      backgroundColor: theme.listItemBackground,
      paddingVertical: 5,
      textAlignVertical: 'top',
    },
    editItemDateTimeButtonText: {
      color: theme.text,
      fontSize: 18,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    editItemDeleteInlineButton: {
      marginInlineStart: 10,
      marginVertical: 8,
    },
    editItemApplyButton: {
      marginHorizontal: 80,
      marginTop: 20,
      borderColor: '#2196F3',
      borderWidth: 2,
      borderRadius: borderRadius,
    },

    editItemApplyButtonText: {
      color: theme.text,
      fontSize: 24,
      fontWeight: "bold",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },

    //ALERT BOX
    alertOverlay: {
      flex: 1,
      backgroundColor: theme.alertOutBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertBox: {
      width: '80%',
      backgroundColor: theme.background,
      padding: 20,
      borderRadius: borderRadius,
      borderWidth: 1,
      borderColor: theme.alertBorderColor,
      elevation: 5,
    },
    alertTitle: {
      color: theme.title,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    alertDescription: {
      color: theme.text,
      fontSize: 16,
    },
    alertCheckboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.background,
      paddingVertical: 10,
      paddingHorizontal: 0,
      marginLeft: 0,
    },
    alertCheckboxText: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "normal",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    alertButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    alertButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: borderRadius,
      marginLeft: 10,
    },
    alertCloseButton: {
      backgroundColor: theme.alertCloseButton,
    },
    alertCloseDisabledButton: {
      backgroundColor: theme.alertCloseDisabledButton,
    },
    alertConfirmButton: {
      backgroundColor: '#007bff',
    },
    alertCloseText: {
      color: theme.text,
    },
    alertCanceDisabledlText: {
      color: theme.alertCanceDisabledlText,
    },
    alertConfirmText: {
      color: 'white',
      fontWeight: 'bold',
    },

    //SETTINGS PAGE
    settingsTitle: {
      fontSize: 26,
      color: theme.title,
      marginBottom: 30
    },
    settingsText: {
      flex: 1,
      fontSize: textSize,
      color: theme.text,
      alignSelf: 'flex-start',
      alignItems: "center",
      justifyContent: "center",
    },
    settingsThemeButton: {
      marginInlineStart: 10
    },

  });
