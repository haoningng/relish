import  Form  from "./Form";
import useLogin from "../../hooks/users/useLogin";

export default function LoginForm() {
  const { email, password, isLoading, onChange, onSubmit } = useLogin();

  const config = [
    {
      labelText: "Email address",
      labelId: "email",
      placeholder: "Email",
      type: "email",
      value: email,
      required: true,
    },
    {
      labelText: "Password",
      labelId: "password",
      placeholder: "Password.",
      type: "password",
      value: password,
      required: true,
    },
  ];

  return (
    <Form
      config={config}
      isLoading={isLoading}
      btnText="Login"
      btnPosition='center'
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
