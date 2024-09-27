import Image from 'next/image';
import logo from '../../public/images/logo-large.svg';

export default function Logo() {
  return (
    <div>
      <Image src={logo} alt="Logo" />
    </div>
  );
}
