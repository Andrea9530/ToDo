import React, { useState } from 'react';
import { View, Text, Modal, Pressable} from 'react-native';
import { CheckBox } from '@rneui/themed';
import { setSettingsKey, SettingsKey, styles } from './common';

/**Custom alert with otional checkbox/close button 
 * @param close The text on the close button
 * @param confirm The text on the confirm button
 * @param onClose Function to execute when close button is pressed
 * @param onConfirm Function to execute when confirm button is pressed
*/
const CustomAlert = ({ title, description, close, confirm, checkBoxText, checkboxKey, onClose, onConfirm }: 
  {title: string, description: string, close?: string, confirm: string, checkBoxText?: string, checkboxKey?: SettingsKey, onClose?: () => void, onConfirm: () => void}) => {
  const [doNotAskAgain, setDoNotAskAgain] = useState(false);
  return (
    <Modal
      transparent
      animationType="fade"
      onRequestClose={onClose}
      
    >
      <View style={styles.alertOverlay}>
        <View style={styles.alertBox}>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertDescription}>
            {description}
          </Text>
          {checkBoxText && checkboxKey &&
          <CheckBox
            containerStyle={styles.alertCheckboxContainer}
            title={checkBoxText}
            textStyle={styles.alertCheckboxText}
            checked={doNotAskAgain}
            onIconPress={() => setDoNotAskAgain(!doNotAskAgain)}
          />}

          <View style={styles.alertButtonsContainer}>
            {onClose &&
            <Pressable
              disabled={doNotAskAgain}
              
              style={doNotAskAgain ? [styles.alertButton, styles.alertCloseDisabledButton] : [styles.alertButton, styles.alertCloseButton]}
              onPress={onClose}
            >
              <Text style={doNotAskAgain ? styles.alertCanceDisabledlText : styles.alertCloseText}>{close}</Text>
            </Pressable>}
            <Pressable
              style={[styles.alertButton, styles.alertConfirmButton]}
              onPress={() => {
                checkboxKey && setSettingsKey(checkboxKey, !doNotAskAgain);
                onConfirm();
              }}
            >
              <Text style={styles.alertConfirmText}>{confirm}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

