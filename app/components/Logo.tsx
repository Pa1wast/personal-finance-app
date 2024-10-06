import Image from "next/image";
import logoLarge from "../../public/images/logo-large.svg";
import logoSmall from "../../public/images/logo-small.svg";

export default function Logo({ isMinimized }) {
  return (
    <div>
      <Image
        src={isMinimized ? logoSmall : logoLarge}
        alt="Logo"
        className="ml-6 mt-8 hidden lg:block"
      />
    </div>
  );
}
