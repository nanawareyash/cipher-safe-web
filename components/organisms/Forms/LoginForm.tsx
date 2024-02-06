import { useState } from "react";

import Link from "next/link";

import Button from "@/atoms/Button/Button";
import Text from "@/atoms/Text/Text";

import InputField from "@/molecules/FormElements/InputField";

function LoginForm() {
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  return (
    <div className="w-full sm:w-[70%] md:w-full xl:w-[70%] flex flex-col gap-4">
      {/* Title */}
      <Text variant="title" TextProps={{ className: "text-center" }}>
        Login
      </Text>

      {/* Form */}
      <div className="flex flex-col pt-10 gap-3">
        <InputField
          InputProps={{
            placeholder: "username@gmail.com",
            type: "email",
          }}
          label="Email"
          startElement={<i className="bi bi-envelope-fill"></i>}
        />
        <InputField
          endElement={
            <Button
              ButtonProps={{
                onClick: () => setShowPassword((prev) => !prev),
                title: showPassword ? "Hide Password" : "Show Password",
              }}
              variant="solid"
            >
              {showPassword ? (
                <i className="bi bi-eye-slash-fill"></i>
              ) : (
                <i className="bi bi-eye-fill"></i>
              )}
            </Button>
          }
          InputProps={{
            placeholder: "••••••••",
            type: showPassword ? "text" : "password",
          }}
          label="Password"
          startElement={<i className="bi bi-key-fill"></i>}
        />

        {/* Forgot Password */}
        <div>
          <Link className="rounded-md w-fit" href="/forgotpassword">
            <Text variant="label" color="hyperlink">
              Forgot Password?
            </Text>
          </Link>
        </div>

        <Button variant="solid" color="primary" size="md">
          Login
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
