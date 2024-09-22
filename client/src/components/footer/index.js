
import { useRouter } from "next/navigation";
import { IoReturnUpBackSharp } from "react-icons/io5";

const Footer = () => {
    const router = useRouter();
    return (
        <div className='sticky bottom-0 p-4'>
           <IoReturnUpBackSharp
             onClick={() => router.push('/home')}
           className="hover:cursor-pointer" color={'#ce9c53'} size={30} />
        </div>
    );
}

export default Footer;
