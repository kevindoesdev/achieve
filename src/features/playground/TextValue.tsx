import { View } from 'react-native';
import { Text } from 'react-native-paper';

export interface TextValueProps {
  label: string;
  value?: string;
  labelWidth?: number;
}

export const TextValue = ({ label, value, labelWidth }: TextValueProps) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ minWidth: labelWidth }} variant="labelLarge">
        {`${label}: `}
      </Text>
      <Text variant="bodyMedium">
        {value || (
          <Text style={{ fontStyle: 'italic', color: 'grey' }}>(empty)</Text>
        )}
      </Text>
    </View>
  );
};
