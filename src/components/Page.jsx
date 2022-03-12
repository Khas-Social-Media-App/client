import React from 'react';

import {useHeaderHeight} from '@react-navigation/elements';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const INPUT_SIZE = 150;
const INPUT_MARGIN_BOTTOM = 20;
const EXTRA_HEIGHT = INPUT_SIZE + INPUT_MARGIN_BOTTOM;

export const getKeyboardAwareProps = (style, disableScrollOnFocus) => ({
  contentContainerStyle: style,
  bounces: false,
  extraScrollHeight: 0,
  extraHeight: disableScrollOnFocus ? 0 : EXTRA_HEIGHT,
  enableOnAndroid: true,
  enableAutomaticScroll: true,
  keyboardOpeningTime: 0,
  scrollEnabled: true,
  keyboardShouldPersistTaps: 'handled',
});

const Page = ({
  scroll = false,
  disableScrollOnFocus = false,
  style,
  center = true,
  children,
}) => {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const Wrapper = scroll ? KeyboardAwareScrollView : KeyboardAvoidingView;
  const props = scroll
    ? getKeyboardAwareProps(
        [
          {
            minHeight: hp(100) - EXTRA_HEIGHT,
            // paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
          styles.scrollContainer,
          style,
        ],
        disableScrollOnFocus,
      )
    : {
        style: [
          {
            // paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
          styles.container,
          center && styles.center,
          style,
        ],
        bounces: false,
        behavior: Platform.OS === 'ios' ? 'padding' : 'height',
        contentContainerStyle: [style],
        keyboardVerticalOffset: headerHeight,
        onStartShouldSetResponder: Keyboard.dismiss,
      };

  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Page;

const styles = () =>
  StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: '#fff',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
