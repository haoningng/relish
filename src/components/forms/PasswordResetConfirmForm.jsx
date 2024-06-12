import useResetPasswordConfirm from "../../hooks/users/useResetPasswordConfirm";
import Form from "./Form";

export default function PasswordResetConfirmForm({ uid, token }) {
  const { new_password, re_new_password, isLoading, onChange, onSubmit } =
    useResetPasswordConfirm(uid, token);

  const config = [
    {
      labelText: "New password",
      labelId: "new_password",
      placeholder: "Enter New Password.",
      type: "password",
      onChange,
      value: new_password,
      required: true,
    },
    {
      labelText: "Confirm new password",
      labelId: "re_new_password",
      placeholder: "Enter Confirmation Password.",
      type: "password",
      onChange,
      value: re_new_password,
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
