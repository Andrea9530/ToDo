import { Appearance } from "react-native";
import { createStyles, lightTheme, darkTheme, createColors } from "./style";
import { useMemo } from "react";
import { MMKV } from 'react-native-mmkv';
import { LanguageCodes, availableLanguages, supportedLanguages}  from "./translations/languages";
import en from "./translations/en.json";
import it from "./translations/it.json";
import { create } from 'zustand';

type supportedThemes = "light" | "dark"

/**Specifies task structure and attributes*/
export type Task = {
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: string;
}

/**Specifies MetaData attributes */
interface MetaData {
  metaVersion: number;
  storageVersion: number;
  settingsVersion: number;
}
type MetaKey = keyof MetaData;

/**Specifies Settings attributes */
interface Settings {
  language: supportedLanguages["code"];
  theme: "auto" | "light" | "dark";
  alertChangesNotSaved: boolean;
  alertListNotEmpty: boolean
}
export type SettingsKey = keyof Settings;





const settingsStorage: MMKV = new MMKV({id: "settings"});
const listsStorage: MMKV = new MMKV({id: "lists"});
const listNamesStorage: MMKV = new MMKV({id: "list_names"});
const Temm : MMKV = new MMKV({id: "Temm"});
const Test : MMKV = new MMKV({id: "Test"});
const Tr : MMKV = new MMKV({id: "Temm"});
const metaStorage: MMKV = new MMKV({id: "meta"});

const APP_STORAGE_VERSION = 1
const APP_SETTINGS_VERSION = 1
const APP_META_VERSION = 1


export let colorScheme = getTheme() == "dark" ? darkTheme : lightTheme;
export let styles = getStyles();
export let colors = getColors();

const metaVersions: MetaData = {
  metaVersion: APP_META_VERSION,
  settingsVersion: APP_SETTINGS_VERSION,
  storageVersion: APP_STORAGE_VERSION
};
//DATA INITIALIZATION
setMeta(metaVersions)
setSettings()
setSettingsKey("theme", "auto")
checkVersion()



//AUTOMATIC RERENDER
interface GlobalState {
    rerenderFlag: boolean;
    toggleRerenderFlag: () => void;
    updatedLanguage: boolean;
    reloadLanguage: () => void;
  }
  
  export const useGlobalStore = create<GlobalState>((set) => ({
    rerenderFlag: false,
    toggleRerenderFlag: () => set((state) => ({ rerenderFlag: !state.rerenderFlag })),
    updatedLanguage: false,
    reloadLanguage: () => set((state) => ({ updatedLanguage: !state.updatedLanguage })),
  }));

/**Sets the desired theme and updates the UI*/
export function setTheme(value: "auto" | "light" | "dark"): void{
    const storage = new MMKV({id: "settings"});
    storage.set("theme", value);
    styles = getStyles();
    colors = getColors();
    useGlobalStore.getState().toggleRerenderFlag();
    return
}

/**Returns the current theme*/
export function getTheme(): supportedThemes{
    const theme = settingsStorage.getString("theme")
    if(theme == "light" || theme == "dark")
        return theme;
    return Appearance.getColorScheme() ?? "light";
}

/**Returns the styling code in the current theme */
export function getStyles(){
    colorScheme = getTheme() == "dark" ? darkTheme : lightTheme;
    return createStyles(colorScheme);
}

/**Returns some color definitions in the current theme */
export function getColors(){
    colorScheme = getTheme() == "dark" ? darkTheme : lightTheme;
    return createColors(colorScheme);
  }


  //META CONTROL
    /** Updates the metadata
     * @param newMeta The data to set, leave empty to initialize.
    */
    function setMeta(newMeta?: MetaData): boolean {
      const raw = metaStorage.getString("meta");
      const parsed: Record<string, any> = raw ? JSON.parse(raw) : {};
      if(newMeta){
        const metaData = JSON.stringify(newMeta);
        metaStorage.set("meta", metaData);
        return true;
      }
      if (Object.keys(parsed).length === 0) {
        const data = {
          metaVersion: APP_META_VERSION,
          settingsVersion: APP_SETTINGS_VERSION,
          storageVersion: APP_STORAGE_VERSION
        };
        const metaData = JSON.stringify(data);
        metaStorage.set("meta", metaData);
        return true;
      }
      return true;
    }
    /** Updates the value of a specific meta key */
    function setMetaKey(key: MetaKey, value: string): boolean {
      const raw = metaStorage.getString("meta");
      const parsed: Record<string, any> = raw ? JSON.parse(raw) : {};
      let data = parsed;
      data[key] = value;
      const metaData = JSON.stringify(data);
      metaStorage.set("meta", metaData);
      return true;
    }

    /** Retrieves the value of a specific meta key and returns it as a string */
    function getMetaDataString(key: string): string{
      const raw = metaStorage.getString("meta");
      const parsed: Record<string, any> = raw ? JSON.parse(raw) : "";
      return parsed[key].toString();
    }

    /** Retrieves the value of a specific meta key and returns it as a number */
    function getMetaDataNumber(key: MetaKey): number{
      const raw = metaStorage.getString("meta");
      const parsed: Record<string, any> = raw ? JSON.parse(raw) : "";
      return Number(parsed[key]);
    }

  //SETTINGS CONTROL
  
    /** Updates the settings
     * @param newSettings The data to set, leave empty to initialize.
    */
  export function setSettings(newSettings?: Settings): boolean {
    const raw = settingsStorage.getString("settings");
    const parsed: Record<string, any> = raw ? JSON.parse(raw) : {};
    if(newSettings){
      const settings = JSON.stringify(newSettings);
      settingsStorage.set("settings", settings);
      return true;
    }
    if (Object.keys(parsed).length === 0 || Object.keys(parsed) === undefined) {
      const languages = availableLanguages.map((lang) => lang.code);
      const localeLanguage = "en";
      const finalLanguage = languages.includes(localeLanguage) ? localeLanguage as supportedLanguages["code"] : "en";
      const data: Settings = {
        language: finalLanguage,
        theme: "auto",
        alertChangesNotSaved: true,
        alertListNotEmpty: true
      };
      const settingsData = JSON.stringify(data);
      settingsStorage.set("settings", settingsData);
      return true;
    }
    return true;
  }

  /** Updates the value of a specific settings key */
  export function setSettingsKey<K extends SettingsKey>(key: K, value: Settings[K]): boolean {
    const raw = settingsStorage.getString("settings");
    const parsed: Record<string, any> = raw ? JSON.parse(raw) : {};
    let data = parsed;
    data[key] = value;
    const settingsData = JSON.stringify(data);
    settingsStorage.set("settings", settingsData);
    return true;
  }

  //CUSTOM FUNCTIONS DEFINED BASED ON THE KEY TO UPDATE
  export function getSettingsDataString(key: "language"): supportedLanguages["code"];
  export function getSettingsDataString(key: "alertChangesNotSaved"): boolean;
  export function getSettingsDataString(key: "alertListNotEmpty"): boolean;
  export function getSettingsDataString(key: Exclude<SettingsKey, "language" | "alertChangesNotSaved" | "alertListNotEmpty">): string;
  
  /** Retrieves the value of a specific settings key and returns it as a string */
  export function getSettingsDataString(key: SettingsKey): string | boolean{
    const raw = settingsStorage.getString("settings");
    
    const parsed: Record<string, any> = raw ? JSON.parse(raw) : "";
    if(key == "language"){
      return parsed[key].toString() as supportedLanguages["code"]
    }
    if(key == "alertChangesNotSaved"){
      return JSON.parse(parsed[key].toString()) as boolean
    }
    if(key == "alertListNotEmpty"){
      return JSON.parse(parsed[key].toString()) as boolean
    }
    return parsed[key].toString();
  }
  

  //VERSION AND MIGRATION
  function getStorageVersion(): number{
    return getMetaDataNumber("storageVersion")
  }
  function getMetaVersion(): number{
    return getMetaDataNumber("metaVersion")
  }
  function getSettingsVersion(): number{
    return getMetaDataNumber("settingsVersion")
  }
  /**Checks the meta/settings/storage version against the current app-supported version and upgrades if necessary */
  function checkVersion(){
    if(APP_META_VERSION > getMetaVersion()){
      migrateMetaVersion(getMetaVersion())
    }
    if(APP_SETTINGS_VERSION > getSettingsVersion()){
      migrateSettingsVersion(getSettingsVersion())
    }
    if(APP_STORAGE_VERSION > getStorageVersion()){
      migrateStorageVersion(getStorageVersion())
    }
  }

  /** Incrementally upgrades the meta data to the app's version */
  function migrateMetaVersion(metaVersion: number){
    do{
    switch(metaVersion){
      case 1:
        {
          //UPGRADE LOGIC
        }
      break;
    }
    metaVersion++;
    setMetaKey("metaVersion", metaVersion.toString())
  }while(APP_META_VERSION > metaVersion);
  }

  /** Incrementally upgrades the settings data to the app's version */
  function migrateSettingsVersion(settingsVersion: number){
    do{
    switch(settingsVersion){
      case 1:
        {
          //UPGRADE LOGIC
        }
      break;
    }
    settingsVersion++;
    setMetaKey("settingsVersion", settingsVersion.toString())
  }while(APP_SETTINGS_VERSION > settingsVersion);
  }

  /** Incrementally upgrades the storage data to the app's version */
  function migrateStorageVersion(storageVersion: number){
    do{
      switch(storageVersion){
        case 1:
          {
            //UPGRADE LOGIC
          }
        break;
      }
      storageVersion++;
      setMetaKey("storageVersion", storageVersion.toString())
    }while(APP_STORAGE_VERSION > storageVersion);
  }


//LISTS

/**Used to retieve an array containing the names of the lists present in storage */
export  function getListNames(): string[] {
    const raw = listNamesStorage.getString("list_names");
    const parsed: string[] = raw ? JSON.parse(raw) : [];
    return parsed;
  }

/**Sets the array containing the list's names to the new value
 * @param names An array containing the names of all the lists
 */
export  function setListNames(names: string[]) {
    listNamesStorage.set('list_names', JSON.stringify(names));
  }
  
  /** Adds a new list by name
   * @returns True on success, false on failure
   */
  export function addList(name: string): boolean {
    if(name.trim() == "")
      return false
    const names = getListNames();
    if (names.includes(name)) return false;
  
    names.push(name);
    setListNames(names);
    listsStorage.set(name, JSON.stringify([]));
    return true;
  }
  
  /**
   * Removes a list by name.
   * @returns True on success, false on failure
   */
  export function removeList(name: string): boolean {
    const names = getListNames();
    if (!names.includes(name)) return false;
    
    const updated = names.filter(n => n !== name);
    setListNames(updated);
    listsStorage.delete(name);
    return true;
  }

  /**Changes the name of a list
   * @returns True on success, false on failure
   */
  export function editListName(oldName: string, newName: string): boolean{
    let names = getListNames();
    if(oldName == newName) return true
    if (!names.includes(oldName)) return false;
    if (names.includes(newName)) return false;

    addList(newName);
    setList(newName, getList(oldName));
    names = names.filter(item => item != oldName);
    removeList(oldName);
    return true;

  }
  
  /** Gets all items from a list.
   * @returns An array of type {@link Task}
   */
  export function getList(name: string): Task[] {
    const raw = listsStorage.getString(name);
    return raw ? JSON.parse(raw) : [];
  }
  /** Sets all items in a list.
   * @param name The name of the list
   * @param items An array of {@link Task} corresponding to the desired data
   * @returns True on success, false on failure
   */
  export function setList(name: string, items: Task[]): boolean {
    const raw = listsStorage.getString(name);
    items.forEach(item => addItemToList(name, item));
    return true;
  }
  
  /**Adds an item to a list.
   * @param name The name of the list
   * @param item The item to add, of type {@link Task}
   * @returns True on success, false on failure
   */
  export function addItemToList(name: string, item: Task): boolean {
    if(item.title.trim() == "")
      return false
    if(item.description?.trim() == "")
      item.description = undefined
    const items = getList(name);
    items.push(item);
    listsStorage.set(name, JSON.stringify(items));
    return true;
  }

  /**Updates the selected item with the new data
   * @param name The name of the list
   * @param index The index in the list of the item to update
   * @param newItem The data for the new item, of type {@link Task}
   * @returns True on success, false on failure
   */
  export function updateItemFromList(name: string, index: number, newItem: Task): boolean {
    const items = getList(name);
    if(newItem.title.trim() == "")
      return false
    if(index < 0 || index > items.length)
      return false
    if(newItem.description?.trim() == "")
      newItem.description = undefined
    items[index] = newItem;
    listsStorage.set(name, JSON.stringify(items));
    return true;
  }
  
  /**Removes an item from a list at a specific index.
   * @param name The name of the list
   * @param index The index in the list of the item to update
   * @returns True on success, false on failure
   */
  export function removeItemFromList(name: string, index: number): boolean {
    const items = getList(name);
    if (index < 0 || index >= items.length) return false;
  
    items.splice(index, 1);
    listsStorage.set(name, JSON.stringify(items));
    return true;
  }


  let currentLanguage: supportedLanguages["code"] = "en";
  let currentTranslations: typeof en = en;
  
  /**Updates the current language
   * @param language A language code present in {@link supportedLanguages}, if not defaults to english
  */
  export function setCurrentLanguage(language: supportedLanguages["code"]) {
    currentLanguage = language;
    const tempLanguage = availableLanguages.find(lang => lang.code === language);
    const languageObj = tempLanguage ? tempLanguage : { code: "en", language: "English" };
    
    const languageMap = {
      en,
      it,
    };

    currentTranslations = languageMap[languageObj.code as LanguageCodes]  || en;
  }
  
  /**Helper to get the current translation strings
   * @returns An array containing the translation data, accessible by key
  */
  export function getCurrentTranslations() {
    return currentTranslations;
  }
  
  /**Updates the current language
   * @param selectedLanguage A language code present in {@link supportedLanguages}, if not defaults to english
  */
  export function useLanguage(selectedLanguage: supportedLanguages["code"]) {
    const language = availableLanguages.find(lang => lang.code === selectedLanguage) as supportedLanguages;
    
    const languageMap: Record<string, typeof en> = useMemo(() => {
      const map = {
        en,
        it,
      };
      map.toString = function() {
        return JSON.stringify(this);
      };
      return map;
    }, []);
    
    const loc = useMemo(() => {
      const translations = languageMap[language.code] || en;
      currentLanguage = language.code;
      currentTranslations = translations;
      return translations;
    }, [language.code, languageMap]);
    
    return { language, languageMap, loc };
  }

  /**Returns the due date formatted in a user friendly, localized string 
   * @param date The date to transform
   * @param locale A language code present in {@link supportedLanguages}, if not defaults to english
  */
  export function getDueDateText(date: string, locale: supportedLanguages["code"]): string{
    const dueDate = new Date(date);
    dueDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);


    const timeDifference = dueDate.getTime() - today.getTime();
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
    let result;
    const dateOptions: Intl.DateTimeFormatOptions = { hour: undefined, minute: undefined, second: undefined};
    const loc = getCurrentTranslations();
    switch(dayDifference){
      case -1:
        result = loc.yesterday;
      break;
      case 0:
        result = loc.today;
      break;
      case 1:
        result = loc.tomorrow;
      break;
      default:
        result = loc.The + " " + new Date(date).toLocaleDateString(locale, dateOptions);
      break;
    }
    
    const timeOptions: Intl.DateTimeFormatOptions = { year: undefined, hour: '2-digit', minute: '2-digit'};
    result = result + " " + loc.at + " " + new Date(date).toLocaleTimeString(locale, timeOptions)
    return result;
  }


