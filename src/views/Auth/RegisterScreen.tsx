import { Alert, StyleSheet, View, Text } from "react-native";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Spinner } from "@ui-kitten/components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Space from "../../components/Space";
import firebaseConfig from "../../config/firebase";
import { AuthNavProps } from "../../types/navigations/AuthNavigation";

type FormData = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("This is required."),
  name: yup.string().required("This is required."),
  password: yup.string().required("This is required.").min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirmation: yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const RegisterScreen = ({navigation}: AuthNavProps<"Register">) => {
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
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((data) => {
        setLoading(false);
        navigation.goBack();
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert("Opps", err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Space />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Email"
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
            placeholder="Name"
          />
        )}
        name="name"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.name && (
        <Text style={styles.textError}>{errors.name.message}</Text>
      )}
      <Space />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Password"
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
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Password Confirmation"
            secureTextEntry
          />
        )}
        name="passwordConfirmation"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.passwordConfirmation && (
        <Text style={styles.textError}>{errors.passwordConfirmation.message}</Text>
      )}
      <Space />
      {loading ? (
        <View style={{ alignItems: "center" }}>
          <Spinner />
        </View>
      ) : (
        <Button onPress={handleSubmit(onSubmit)}>Register</Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerSignUp: {
    alignItems: "center",
  },
  signUpText: {
    color: "blue",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  textError: {
    color: "red",
  },
});

export default RegisterScreen;
