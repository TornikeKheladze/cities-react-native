import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const LoadingSpinner: React.FC<{isLoading: boolean}> = ({isLoading}) => {
  if (!isLoading) {
    return null;
  }
  return (
    <View style={[styles.blurContainer]}>
      <ActivityIndicator size={40} color="#3b82f6" />
    </View>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(156, 163, 175, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999999,
  },
});

export default LoadingSpinner;
