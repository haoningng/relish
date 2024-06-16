import useResetPassword from "../../hooks/users/useResetPassword";
import Form from "./Form";

export default function PasswordResetForm() {
  const { email, isLoading, onChange, onSubmit } = useResetPassword();

  const config = [
    {
      labelText: "Email address",
      labelId: "email",
      placeholder: "Email",
      type: "email",
      onChange,
      value: email,
      required: true,
    },
  ];

  return (
    <Form
      config={config}
      isLoading={isLoading}
      btnText="Request password reset"
      btnPosition="center"
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
