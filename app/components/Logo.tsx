import Image from "next/image";
import logo from "../../public/images/logo-large.svg";

export default function Logo({ className }: { className: string }) {
  return (
    <div>
      <Image src={logo} alt="Logo" className={className} />
    </div>
  );
}
