import Image from "next/image";

// WhatsappButton Component
export default function WhatsAppButton() {
  //  UI/UX Design
  return (
    <a
      href="https://wa.me/923048438299"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-xl transition-all duration-300 animate-pulse [animation-duration:2s]"
    >
      <Image src="/whatsapp.png" width={100} height={100} alt="watsaplogo" className="w-12 h-12" />
    </a>
  );
}
