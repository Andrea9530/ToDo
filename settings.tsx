import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Pressable } from "react-native";
import { setTheme, styles, useGlobalStore, getSettingsDataString, setSettingsKey, useLanguage } from "./common";
import { Dropdown } from "react-native-element-dropdown";
import { availableLanguages } from "./translations/languages";

const SettingsPage = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    let { language, loc } = useLanguage(getSettingsDataString("language"))
    const rerenderFlag = useGlobalStore((state) => state.rerenderFlag);

    useEffect(() => {
    }, [rerenderFlag]);

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.settingsTitle}>{loc.settingsTitle}</Text>
            <View>
                {/*LANGUAGE*/}
                <View style={{flexDirection: "row", marginBottom: 20}}>
                    <Text style={styles.settingsText}>{loc.settingsPageLanguage}</Text>
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
                        setSettingsKey("language", item["code"]);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    onBlur={() => setIsDropdownOpen(false)}
                    />
                </View>
                {/*THEME*/}
                <View style={{flexDirection: "row", marginBottom: 20}}>
                    <Text style={styles.settingsText}>{loc.settingsPageTheme}</Text>
                    <Pressable onPress={() => {setTheme("auto");}} style={styles.settingsThemeButton}><Text style={styles.settingsText}>Auto</Text></Pressable>
                    <Pressable onPress={() => {setTheme("light");}} style={styles.settingsThemeButton}><Text style={styles.settingsText}>Light</Text></Pressable>
                    <Pressable onPress={() => {setTheme("dark");}} style={styles.settingsThemeButton}><Text style={styles.settingsText}>Dark</Text></Pressable>
                </View>
                {/*RESET ALERT DISCARD CHANGES*/}
                <View style={{flexDirection: "row", marginBottom: 20}}>
                    <Text style={styles.settingsText}>{loc.settingsAlertChanges}</Text>
                    <Pressable onPress={() => {setSettingsKey("alertChangesNotSaved", true);}} style={styles.settingsThemeButton}><Text style={styles.settingsText}>Reset</Text></Pressable>
                </View>

                {/*RESET ALERT DELETE LIST*/}
                <View style={{flexDirection: "row", marginBottom: 20}}>
                    <Text style={styles.settingsText}>{loc.settingsAlertDelete}</Text>
                    <Pressable onPress={() => {setSettingsKey("alertListNotEmpty", true);}} style={styles.settingsThemeButton}><Text style={styles.settingsText}>Reset</Text></Pressable>
                </View>
                
                {/*APP VERSION*/}
                </View>
                <View style={{flex: 1}} />
                <View style={{flexDirection: "row", marginBottom: 10}}>
                <View style={{flex: 1}} />
                    <Text style={[styles.settingsText, {color: "gray", textAlign: "center", flex: 3}]}>{loc.settingsAppVersion}:  v0.1.0</Text>
                <View style={{flex: 1}} />
                </View>
        </SafeAreaView>
    );
}

export default  SettingsPage;