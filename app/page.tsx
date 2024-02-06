"use client";

import { useState } from "react";

import Button from "@/atoms/Button/Button";
import Text from "@/atoms/Text/Text";

import LoginForm from "@/organisms/Forms/LoginForm";
import SignUpForm from "@/organisms/Forms/SignupForm";

import AppLogo from "@/molecules/AppLogo/AppLogo";

import WelcomeSlider from "@/templates/WelcomeSlider";

export default function Home() {
  const [activeForm, setActiveForm] = useState("LOGIN");
  const [getStarted, toggleGetStarted] = useState(false);

  const slidingTransition = getStarted
    ? "-translate-x-[100%] md:translate-x-0"
    : "";

  return (
    <div className="w-screen h-svh flex overflow-hidden">
      {/* Left Section */}
      <div
        className={`from-blue-700 dark:from-slate-950 to-sky-500 dark:to-blue-950 bg-gradient-to-br h-[100%] flex flex-col min-w-[100%] md:min-w-[60%] transition-all duration-500 ${slidingTransition}`}
      >
        {/* Logo */}
        <div className="p-5 flex">
          <AppLogo />
        </div>

        {/* Slider */}
        <div className="flex grow justify-center mx-2 xl:mx-20">
          <WelcomeSlider />
        </div>

        {/* Get Started Button */}
        <div className="flex px-2 justify-end border-t-[1.5px] dark:border-t-gray-400 focus:border-0 md:hidden">
          <Button
            ButtonProps={{
              className: "w-full flex justify-center gap-2 py-4",
              onClick: () => toggleGetStarted(true),
            }}
            size="md"
            variant="solid"
            color="transparentInverse"
          >
            <span>Get Started</span>
            <span>
              <i className="bi bi-chevron-right"></i>
            </span>
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div
        className={`bg-white dark:bg-slate-950 h-[100%] overflow-hidden flex flex-col min-w-[100%] md:min-w-[40%] transition-all
        duration-500 ${slidingTransition}`}
      >
        <div className="flex flex-col justify-center my-5 mx-5 lg:mx-10 gap-3 grow items-center">
          {/* Forms */}
          {activeForm === "SIGNUP" ? <SignUpForm /> : <LoginForm />}

          {/* Form toggle */}
          <div className="mt-3 flex flex-col w-full items-center">
            <div className="bg-gray-400 w-[50%] h-[1px]"></div>
            <Text
              variant="paragraph"
              TextProps={{
                className: "bg-white dark:bg-slate-950 px-3 -translate-y-1/2",
              }}
            >
              OR
            </Text>
          </div>
          <Text variant="paragraph">
            {activeForm === "SIGNUP"
              ? "Already have a account?"
              : "Don't have a account?"}
          </Text>
          <Button
            ButtonProps={{
              onClick: () =>
                setActiveForm(activeForm === "SIGNUP" ? "LOGIN" : "SIGNUP"),
            }}
            variant="solid"
          >
            <Text color="hyperlink">
              {activeForm === "SIGNUP" ? "Login" : "Sign Up"}
            </Text>
          </Button>
        </div>

        {/* Back Button */}
        <div className="flex px-2 justify-start border-t-[1.5px] dark:border-t-gray-400 focus:border-0 md:hidden">
          <Button
            ButtonProps={{
              className: "w-full flex justify-center gap-2 py-4",
              onClick: () => toggleGetStarted(false),
            }}
            size="md"
            variant="solid"
          >
            <span>
              <i className="bi bi-chevron-left"></i>
            </span>
            <span>Back</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
