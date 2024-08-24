import Link from "next/link";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "../constants/icons";
function Footer() {
  return (
    <footer className="bg-gray-900 z-50  text-gray-400 py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2024 Pretest Inc.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link
            href="#"
            className="hover:text-gray-300 transition-color flex items-centers"
            prefetch={false}
          >
            <FacebookIcon className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href="#"
            className="hover:text-gray-300 transition-colors flex items-center"
            prefetch={false}
          >
            <TwitterIcon className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="#"
            className="hover:text-gray-300 transition-colors flex items-center"
            prefetch={false}
          >
            <InstagramIcon className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
