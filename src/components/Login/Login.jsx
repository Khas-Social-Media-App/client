import React from 'react';
import {View, Text} from 'react-native';
import PageHoc from '../../layouts/PageHoc';

const Login = () => {
  return (
    <>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          backgroundColor: '#f2f',
        }}>
        Snwo Serkan is here
      </Text>
    </>
  );
};

export default PageHoc(Login, {scroll: true});
