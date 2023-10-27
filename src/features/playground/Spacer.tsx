import { View } from 'react-native';

interface SpacerProps {
  height?: number;
}

export const Spacer = ({ height }: SpacerProps) => (
  <View style={{ marginTop: 8, marginBottom: 8, height }} />
);
