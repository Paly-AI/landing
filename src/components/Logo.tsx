import logo from "@/assets/paly-ai-logo-green-white.png";

export const Logo = () => {
  return (
    <div className="w-8 h-8 bg-[rgba(15,103,18,255)] rounded-lg flex items-center justify-center">
        <img src={logo} alt="Paly AI Logo" className="scale-[85%] bg-gradient-primary rounded-lg flex items-center justify-center" />
    </div>
  )
};