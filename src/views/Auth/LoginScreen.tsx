import { Alert, StyleSheet, View } from "react-native";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Space from "../../components/Space";
import firebaseConfig from "../../config/firebase";
import { AuthNavProps } from "../../types/navigations/AuthNavigation";
import { UserContext } from "../../context/UserContext";
import { ThemeContext } from "../../context/ThemeContext";

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("This is required."),
  password: yup.string().required("This is required."),
});

interface ILoginScreen extends AuthNavProps<'Login'> {}

const LoginScreen = ({navigation}: ILoginScreen) => {
  const themeContext = React.useContext(ThemeContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {backgroundColor: themeContext.theme === 'light' ? 'white' : '#212B47'},
      headerTitleStyle: {color: themeContext.theme === 'light' ? 'black' : 'white'}
    });
  })

  const {dispatch } = React.useContext(UserContext);

  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((data) => {
        setLoading(false);
        dispatch({type: 'LOGIN', payload: {uid: data.user!.uid}});
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert("Opps", err.message);
      });
  };

  const signUp = () => {
    navigation.navigate('Register');
  }

  return (
    <Layout style={styles.container}>    
      <Space />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="email"
            keyboardType="email-address"
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.email && (
        <Text style={styles.textError}>{errors.email.message}</Text>
      )}
      <Space />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="password"
            secureTextEntry
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.password && (
        <Text style={styles.textError}>{errors.password.message}</Text>
      )}
      <Space />
      {loading ? (
        <View style={{ alignItems: "center" }}>
          <Spinner />
        </View>
      ) : (
        <Button onPress={handleSubmit(onSubmit)}>Login</Button>
      )}
      <Space />
      <View style={styles.containerSignUp}>
        <Text>
          Click here to <Text onPress={signUp} style={styles.signUpText}>Sign Up</Text>
        </Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  containerSignUp: {
    alignItems: "center",
  },
  signUpText: {
    color: "#5771BD",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  textError: {
    color: "red",
  },
});

export default LoginScreen;
