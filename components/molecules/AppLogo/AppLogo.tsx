import Text from "@/atoms/Text/Text";

import Logo from "@/icons/Logo";

function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <Logo className="w-5 h-5 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-white dark:text-gray-200" />
      <Text variant="subHeading1" color="secondaryInverse">
        CipherSafe
      </Text>
    </div>
  );
}

export default AppLogo;
