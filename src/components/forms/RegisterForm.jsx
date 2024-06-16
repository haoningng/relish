import  Form  from "./Form";
import useRegister from "../../hooks/users/useRegister";

export default function RegisterForm() {
  const {
    username,
    email,
    password,
    re_password,
    isLoading,
    onChange,
    onSubmit,
  } = useRegister();

  const config = [
    {
      labelText: "username",
      labelId: "username",
      placeholder: "Name",
      type: "text",
      value: username,
      required: true,
    },
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
    {
      labelText: "Confirm password",
      placeholder: "Re Enter Password",
      labelId: "re_password",
      type: "password",
      value: re_password,
      required: true,
    },
  ];

  return (
    <>
      <Form
        config={config}
        isLoading={isLoading}
        btnText="Sign up"
        btnPosition='center'
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </>
  );
}
