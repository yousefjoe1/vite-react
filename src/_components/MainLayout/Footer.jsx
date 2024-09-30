import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  const footerLinks = [
    {
      title: "COMPANY",
      items: ["About", "Features", "Works", "Career"],
    },
    {
      title: "HELP",
      items: [
        "Customer Support",
        "Delivery Details",
        "Terms & Conditions",
        "Privacy Policy",
      ],
    },
    {
      title: "FAQ",
      items: ["Account", "Manage Deliveries", "Orders", "Payments"],
    },
    {
      title: "RESOURCES",
      items: [
        "Free eBooks",
        "Development Tutorial",
        "How to - Blog",
        "Youtube Playlist",
      ],
    },
  ];

  return (
    <footer className="bg-[#F0F0F0] text-black relative pt-32 mt-24 sm:mt-32 md:mt-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="bg-black text-white rounded-2xl p-8 sm:p-10 mb-8 absolute top-0 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 -translate-y-1/2 max-w-[360px] sm:max-w-[1240px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 lg:mb-0 lg:max-w-[50%]">
              STAY UP TO DATE ABOUT OUR LATEST OFFERS
            </h2>
            <div className="flex flex-col gap-4 lg:w-[350px]">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-white text-black w-full p-2 rounded-full text-sm"
              />
              <button className="bg-white text-black hover:bg-gray-200 py-2 px-6 rounded-full w-full text-sm font-bold">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 border-t border-gray-300 pt-8">
          {/* Company Description and Social Icons */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">SHOP.CO</h3>
            <p className="mb-4">
              We have clothes that suits your style and which you&apos;re proud
              to wear. From women to men.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-600">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="hover:text-gray-600">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="hover:text-gray-600">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" className="hover:text-gray-600">
                <FaGithub className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((category, index) => (
            <div key={index}>
              <h4 className="font-bold mb-4">{category.title}</h4>
              <ul className="space-y-2">
                {category.items.map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright and Payment Methods */}
        <div className="border-t border-gray-300 mt-8 py-8 flex flex-col md:flex-row justify-between items-center">
          <p>Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%2053-BbkG2V1mXjtMcrW0xUyMuD6xto2EKt.png"
              alt="Payment methods"
              className="h-8"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
