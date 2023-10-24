import { TextInput as PaperTextInput } from "react-native-paper";
import { TextInput as RNTextInput } from "react-native";
import { useState, useRef } from "react";

interface Props {
  placeholder?: string,
  text: string,
  onChangeText: (text: string) => void,
  onEndEditing: (text: string) => void
}

enum FocusBlur {
  Idle = 'idle',
  Focus = 'focus',
  Blur = 'blur'
}

export const TextInput = ({ placeholder, text, onEndEditing }: Props) => {
  const [editing, setEditing] = useState(false);
  const [valueSnapshot, setValueSnapshot] = useState('');
  const [value, setValue] = useState(text);
  const inputRef = useRef<RNTextInput>(null);
  const [blurringInProgress, _setBlurringInProgress] = useState(false);
  
  const setBlurringInProgress = () => {
    _setBlurringInProgress(true);
    setTimeout(() => {
      _setBlurringInProgress(false)
      setTimeout(() => onEndEditing(value), 10000);
    }, 100)
  }
  
  return (
    <PaperTextInput
      placeholder={placeholder}
      value={value}
      mode="outlined"
      ref={inputRef}
      outlineStyle={{ borderWidth: 0 }}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        fontSize: 20,
      }}
      onFocus={() => {
        setEditing(true);
        setValueSnapshot(value);
      }}
      onBlur={() => {
        setBlurringInProgress();
        setEditing(false);
      }}
      onChangeText={(text) => {
        setValue(text)
      }}
      onEndEditing={() => {
        // onEditEditing is never called on web
        console.log('onEndEditing')
      }}
      left={
        <PaperTextInput.Icon
          style={{ top: -8 }}
          icon={editing ? "close" : "pencil"}
          forceTextInputFocus={false}
          onPress={() => {
            console.log('onPress blockRefocus', blurringInProgress)
            if (blurringInProgress) {
              console.log('valueSnapshot', valueSnapshot)
              setValue(valueSnapshot);
            } else if (!blurringInProgress) {
              (inputRef as any).current.focus();
            }
          }}
        />
      }
    />
  );
};

TextInput.defaultProps = {
  onChangeText: () => {},
  onEndEditing: () => {},
};

export default TextInput;
