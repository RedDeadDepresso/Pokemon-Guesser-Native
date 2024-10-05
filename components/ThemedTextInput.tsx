import React, { forwardRef } from 'react';
import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export const ThemedTextInput = forwardRef<TextInput, ThemedTextInputProps>(
  ({ style, lightColor, darkColor, type = 'default', ...rest }, ref) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
      <TextInput
        ref={ref}
        style={[
          { color, ...styles.input },
          type === 'default' ? styles.default : undefined,
          type === 'title' ? styles.title : undefined,
          type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
          type === 'subtitle' ? styles.subtitle : undefined,
          type === 'link' ? styles.link : undefined,
          style,
        ]}
        {...rest}
      />
    );
  }
);

// Add a display name for debugging purposes (optional)
ThemedTextInput.displayName = 'ThemedTextInput';

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center'
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
