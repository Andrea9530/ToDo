import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, TextInput, Pressable, KeyboardAvoidingView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from "react-native-element-dropdown";
import {availableLanguages} from "./translations/languages";
import { addList, colors, getSettingsDataString, setSettingsKey, styles, useGlobalStore, useLanguage} from "./common";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App";

const OnboardingPage = () => {
    type NavigationProps = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProps>();
    const [newListName, setNewListName] = useState<string>("")
    const [isInputError, setIsInputError] = useState<boolean>(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    let { language, loc } = useLanguage(getSettingsDataString("language"))

    const toggleRrerenderFlag = useGlobalStore((state) => state.toggleRerenderFlag);
    const rerenderFlag = useGlobalStore((state) => state.rerenderFlag);
    
        useEffect(() => {
        }, [rerenderFlag]);

    return(
    <SafeAreaView style={styles.container}>

        {/*Language selection*/}
        <View style={{marginTop: 20}}>
          <Dropdown
          style={isDropdownOpen ? styles.languageDropdownOpen : styles.languageDropdown}
          containerStyle={styles.languageDropdownContainer}
          inputSearchStyle={styles.languageDropdownSearch}
          activeColor="false"
          placeholderStyle={styles.languageDropdownPlaceholderStyle}
          iconStyle={styles.languageDropdownIconStyle}
          data={availableLanguages.sort((a, b) => a.language.localeCompare(b.language))}
          search
          maxHeight={300}
          labelField="language"
          valueField="code"
          placeholder={language.language}
          searchPlaceholder={loc.language_dropdown_search}
          onChange={item => {
              setSettingsKey("language", item.code);
              toggleRrerenderFlag()
          }}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setIsDropdownOpen(false)}
          />
        </View>

        {/*New list creation*/}
        <View style={styles.onboardingView}>
            <Text style={styles.onboardingTitle}>{loc.onboarding_no_lists}</Text>
            <View style={{flexDirection: "row"}}>
            <TextInput
            style={[styles.onboardingInput, {borderColor: isInputError ? "red" : "#ccc"}]}
            placeholder={loc.onboarding_placeholder}
            placeholderTextColor={colors.text_faded}
            onChangeText={(value) => {setNewListName(value)}}
            />
            <Pressable
            style={styles.onboardingInputSend}
            onPress={() => {
              if (addList(newListName)) {
                setIsInputError(false);
                navigation.reset({
                  index: 0,
                  routes: [{
                    name: 'Main',
                    params: {listName: newListName.trim()}
                  }]
                });
              } else {
                setIsInputError(true);
              }
            }}
            >
              <Text style={styles.onboardingInputSendText}>{loc.onboarding_go_button}</Text>
            </Pressable>
            </View>
        </View>
    </SafeAreaView>
    );

}
export default OnboardingPage