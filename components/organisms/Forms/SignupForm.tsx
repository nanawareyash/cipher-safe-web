import { useEffect, useRef, useState } from "react";

import Button from "@/atoms/Button/Button";
import Text from "@/atoms/Text/Text";

import InputField from "@/molecules/FormElements/InputField";

function SignUpForm() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showPassword1, setShowPassword1] = useState<Boolean>(false);
  const [showPassword2, setShowPassword2] = useState<Boolean>(false);

  const slider = useRef<HTMLDivElement>(null);

  // UseEffect used to scroll slide
  useEffect(() => {
    console.log(activeSlide);
    if (slider.current) {
      slider.current.scrollLeft = activeSlide * slider.current.clientWidth;
    }
  }, [activeSlide]);

  return (
    <div className="w-full sm:w-[70%] md:w-full xl:w-[70%] flex flex-col gap-4">
      {/* Form Slides */}
      <div className="flex overflow-hidden scroll-smooth" ref={slider}>
        {/* Name Form */}
        <div className="min-w-full flex flex-col justify-between gap-4 pt-10 px-1">
          <div className="flex flex-col gap-2 py-5">
            <Text variant="heading1" color="primary">
              Let's start with the basics!
            </Text>
            <Text variant="subHeading2">
              We'd love to know your name.
              <br /> What should we call you?
            </Text>
          </div>
          <InputField
            InputProps={{
              placeholder: "Amit Kumar",
              type: "text",
              onFocus: () => setActiveSlide(0),
            }}
            label="Your awesome name here!"
            startElement={<i className="bi bi-person-fill"></i>}
          />
        </div>

        {/* Email Form */}
        <div className="min-w-full flex flex-col justify-between gap-4 pt-10 px-1">
          <div className="flex flex-col gap-2 py-5">
            <Text variant="heading1" color="primary">
              Great! Now, how can we reach you?
            </Text>
            <Text variant="subHeading2">
              Give us your email, and we'll keep you in the loop.
            </Text>
          </div>
          <InputField
            InputProps={{
              placeholder: "username@gmail.com",
              type: "text",
              onFocus: () => setActiveSlide(1),
            }}
            label="Your email address"
            startElement={<i className="bi bi-envelope-fill"></i>}
          />
        </div>

        {/* Contact no. Form */}
        <div className="min-w-full flex flex-col justify-between gap-4 pt-10 px-1">
          <div className="flex flex-col gap-2 py-5">
            <Text variant="heading1" color="primary">
              Almost there! Mind sharing your digits?
            </Text>
            <Text variant="subHeading2">
              Your phone number will help us keep things personal.
            </Text>
          </div>
          <div className="flex justify-between gap-1">
            <InputField
              className="w-[38%] xs:w-[28%] md:w-[38%] xl:w-[28%]"
              InputProps={{
                placeholder: "+91",
                type: "text",
                defaultValue: "+91",
                onFocus: () => setActiveSlide(2),
              }}
              label="Code"
              startElement={<i className="bi bi-telephone-fill"></i>}
            />
            <InputField
              className="w-[60%] xs:w-[70%] md:w-[60%] xl:w-[70%]"
              InputProps={{
                placeholder: "9876543210",
                type: "text",
                onFocus: () => setActiveSlide(2),
              }}
              label="Your contact number"
            />
          </div>
        </div>

        {/* Password Form */}
        <div className="min-w-full flex flex-col justify-between gap-4 pt-10 px-1">
          <div className="flex flex-col gap-2 py-5">
            <Text variant="heading1" color="primary">
              Securing your account!
            </Text>
            <Text variant="subHeading2">
              Create a strong password. Mix it up for extra security.
            </Text>
          </div>
          <div className="flex flex-col gap-2">
            <InputField
              endElement={
                <Button
                  ButtonProps={{
                    onClick: () => setShowPassword1((prev) => !prev),
                    title: showPassword1 ? "Hide Password" : "Show Password",
                  }}
                  variant="solid"
                >
                  {showPassword1 ? (
                    <i className="bi bi-eye-slash-fill"></i>
                  ) : (
                    <i className="bi bi-eye-fill"></i>
                  )}
                </Button>
              }
              InputProps={{
                placeholder: "••••••••",
                type: showPassword1 ? "text" : "password",
                onFocus: () => setActiveSlide(3),
              }}
              label="Choose a strong password"
              startElement={<i className="bi bi-key-fill"></i>}
            />
            <InputField
              endElement={
                <Button
                  ButtonProps={{
                    onClick: () => setShowPassword2((prev) => !prev),
                    title: showPassword2 ? "Hide Password" : "Show Password",
                  }}
                  variant="solid"
                >
                  {showPassword2 ? (
                    <i className="bi bi-eye-slash-fill"></i>
                  ) : (
                    <i className="bi bi-eye-fill"></i>
                  )}
                </Button>
              }
              InputProps={{
                placeholder: "••••••••",
                type: showPassword2 ? "text" : "password",
                onFocus: () => setActiveSlide(3),
              }}
              label="Confirm your password"
              startElement={<i className="bi bi-key-fill"></i>}
            />
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div
        className={`flex mx-1 justify-between ${
          activeSlide > 0 ? "gap-4" : ""
        }`}
      >
        {/* Previous Button */}
        <Button
          ButtonProps={{
            className: `transition-all duration-300 ${
              activeSlide > 0
                ? "w-full opacity-100"
                : "w-[0%] p-[0px] opacity-0"
            }`,
            onClick: () =>
              setActiveSlide((prev) => (prev > 0 ? prev - 1 : prev)),
          }}
          variant="bordered"
          color="transparent"
          size="md"
        >
          Previous
        </Button>

        {/* Next Button */}
        <Button
          ButtonProps={{
            className: "w-full",
            onClick: () =>
              setActiveSlide((prev) => (prev < 3 ? prev + 1 : prev)),
          }}
          variant="solid"
          color="primary"
          size="md"
        >
          {activeSlide === 3 ? "Create" : "Next"}
        </Button>
      </div>
    </div>
  );
}

export default SignUpForm;
