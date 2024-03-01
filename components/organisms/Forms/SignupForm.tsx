import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

import Button from "@/atoms/Button/Button";
import Text from "@/atoms/Text/Text";

import InputField from "@/molecules/FormElements/InputField";

import { formDataToJson } from "@/utils/formattingTools";
import {
  validateContactNumber,
  validateCountryCode,
  validateEmail,
  validatePassword,
  validatePersonName,
} from "@/utils/validators";

function SignUpForm() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [contactNumber, setContactNumber] = useState<string>();
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);
  const [password1, setPassword1] = useState<string>();
  const [password1Error, setPassword1Error] = useState<boolean>();
  const [password2, setPassword2] = useState<string>();
  const [password2Error, setPassword2Error] = useState<boolean>();
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  const handleNextDisableState = useCallback(() => {
    if (
      (name && activeSlide === 0 && validatePersonName(name)) ||
      (email && activeSlide === 1 && validateEmail(email)) ||
      (countryCode &&
        contactNumber &&
        activeSlide === 2 &&
        validateCountryCode(countryCode) &&
        validateContactNumber(contactNumber)) ||
      (password1 &&
        password2 &&
        activeSlide === 3 &&
        validatePassword(password1) &&
        validatePassword(password2))
    ) {
      setNextButtonDisabled(false);
    } else {
      setNextButtonDisabled(true);
    }
  }, [
    activeSlide,
    name,
    email,
    countryCode,
    contactNumber,
    password1,
    password2,
  ]);

  const handleFormSubmit = () => {
    if (activeSlide === 3) {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const data = formDataToJson(formData);
      }
    } else {
      setActiveSlide((prev) => (prev < 3 ? prev + 1 : prev));
      handleNextDisableState();
    }
  };

  useEffect(() => {
    handleNextDisableState();
  }, [handleNextDisableState]);

  // UseEffect to compare password and current password
  useEffect(() => {
    if (password1 && password2) {
      if (password1 === password2) {
        setPassword1Error(false);
        setPassword2Error(false);
      } else {
        setPassword1Error(true);
        setPassword2Error(true);
      }
    } else {
      password1 ? setPassword1Error(true) : setPassword1Error(undefined);
      setPassword2Error(undefined);
    }
  }, [password2]);

  useEffect(() => {
    !password1 && setPassword1Error(undefined);
  }, [password1]);

  // UseEffect used to scroll slide
  useEffect(() => {
    if (slider.current) {
      slider.current.scrollLeft = activeSlide * slider.current.clientWidth;
    }
  }, [activeSlide]);

  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
        ref={formRef}
      >
        {/* Form Slides */}
        <div className="flex overflow-hidden scroll-smooth" ref={slider}>
          {/* Name Form */}
          <div className="min-w-full flex flex-col justify-between gap-4 px-1">
            <div className="flex flex-col gap-2 py-5">
              <Text variant="heading2" color="primary">
                Let's start with the basics!
              </Text>
              <Text variant="subHeading3">
                We'd love to know your name.
                <br /> What should we call you?
              </Text>
            </div>
            <InputField
              InputProps={{
                id: "name",
                name: "name",
                onFocus: () => setActiveSlide(0),
                onKeyUp: (event) => setName(event.currentTarget.value),
                placeholder: "Amit Kumar",
                type: "text",
              }}
              label="Your awesome name here!"
              startElement={<i className="bi bi-person-fill"></i>}
              validator={validatePersonName}
            />
          </div>

          {/* Email Form */}
          <div className="min-w-full flex flex-col justify-between gap-4 pt-10 px-1">
            <div className="flex flex-col gap-2 py-5">
              <Text variant="heading2" color="primary">
                Great! Now, how can we reach you?
              </Text>
              <Text variant="subHeading3">
                Give us your email, and we'll keep you in the loop.
              </Text>
            </div>
            <InputField
              InputProps={{
                id: "email",
                name: "email",
                onFocus: () => setActiveSlide(1),
                onKeyUp: (event) => setEmail(event.currentTarget.value),
                placeholder: "username@gmail.com",
                type: "text",
              }}
              label="Your email address"
              startElement={<i className="bi bi-envelope-fill"></i>}
              validator={validateEmail}
            />
          </div>

          {/* Contact no. Form */}
          <div className="min-w-full flex flex-col justify-between gap-4 pt-10 px-1">
            <div className="flex flex-col gap-2 py-5">
              <Text variant="heading2" color="primary">
                Almost there! Mind sharing your digits?
              </Text>
              <Text variant="subHeading3">
                Your phone number will help us keep things personal.
              </Text>
            </div>
            <div className="flex justify-between gap-1">
              <InputField
                className="w-[38%] xs:w-[28%] md:w-[38%] xl:w-[28%]"
                InputProps={{
                  defaultValue: "+91",
                  id: "country_code",
                  name: "country_code",
                  onFocus: () => setActiveSlide(2),
                  onKeyUp: (event) => setCountryCode(event.currentTarget.value),
                  placeholder: "+91",
                  type: "text",
                }}
                label="Code"
                showError={false}
                startElement={<i className="bi bi-telephone-fill"></i>}
                validator={validateCountryCode}
              />
              <InputField
                className="w-[60%] xs:w-[70%] md:w-[60%] xl:w-[70%]"
                InputProps={{
                  id: "contact_no",
                  name: "contact_no",
                  onFocus: () => setActiveSlide(2),
                  onKeyUp: (event) =>
                    setContactNumber(event.currentTarget.value),
                  placeholder: "9876543210",
                  type: "text",
                }}
                label="Your contact number"
                validator={validateContactNumber}
              />
            </div>
          </div>

          {/* Password Form */}
          <div className="min-w-full flex flex-col justify-between gap-4 pt-10 px-1">
            <div className="flex flex-col gap-2 py-5">
              <Text variant="heading2" color="primary">
                Securing your account!
              </Text>
              <Text variant="subHeading3">
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
                  id: "password",
                  name: "password",
                  onFocus: () => setActiveSlide(3),
                  onKeyUp: (event) => setPassword1(event.currentTarget.value),
                  placeholder: "••••••••",
                  type: showPassword1 ? "text" : "password",
                }}
                label="Choose a strong password"
                showError={password1Error}
                startElement={<i className="bi bi-key-fill"></i>}
                validator={validatePassword}
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
                  id: "confirm_password",
                  name: "confirm_password",
                  onFocus: () => setActiveSlide(3),
                  onKeyUp: (event) => setPassword2(event.currentTarget.value),
                  placeholder: "••••••••",
                  type: showPassword2 ? "text" : "password",
                }}
                label="Confirm your password"
                showError={password2Error}
                startElement={<i className="bi bi-key-fill"></i>}
                validator={validatePassword}
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
            color="transparent"
            size="md"
            variant="bordered"
          >
            Previous
          </Button>

          {/* Next Button */}
          <Button
            ButtonProps={{
              className: "w-full",
              onClick: () => handleFormSubmit(),
              type: "button",
              disabled: nextButtonDisabled,
            }}
            color="primary"
            size="md"
            variant="solid"
          >
            {activeSlide === 3 ? "Create" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
