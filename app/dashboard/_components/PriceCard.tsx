import { Button } from "@/components/ui/button";
import { Check, Loader } from "lucide-react";

interface PriceCardProps {
  processPayment: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
}

const monthlyPlan = [
  { id: 1, content: "Free" },
  { id: 2, content: "Create Unlimited Courses" },
];
const PriceCard = ({ processPayment, loading }: PriceCardProps) => {
  return (

    <div className="flex flex-col items-center glass-card border-primary/20 rounded-3xl p-8 w-full max-w-sm text-center transition-all duration-300 hover:shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity">
        BEST VALUE
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10" />

      <h3 className="text-2xl font-bold text-foreground mb-1">Monthly Plan</h3>
      <p className="text-sm text-muted-foreground mb-4">Unlock payment ability</p>
      
      <div className="flex items-center gap-2 mb-2">
         <span className="text-base text-muted-foreground line-through">₹1999</span>
         <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-bold">50% OFF</span>
      </div>
      
      <p className="text-5xl font-extrabold text-primary my-2 tracking-tight">₹999<span className="text-lg text-muted-foreground font-normal">/mo</span></p>
      
      <div className="w-full mt-8 space-y-4 mb-8">
        {monthlyPlan.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 py-1 w-full justify-start text-left">
            <div className="p-1 rounded-full bg-green-500/10 text-green-500">
                <Check className="w-4 h-4 shrink-0" />
            </div>
            <p className="text-base text-foreground/80 font-medium">{item.content}</p>
          </div>
        ))}
      </div>
      
      <Button
        className="w-full py-6 text-lg font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all"
        onClick={processPayment}>
        {loading ? <Loader className="animate-spin" /> : "Get Started"}
      </Button>
      
      <p className="text-xs text-muted-foreground mt-4">Secure payment powered by Razorpay</p>
    </div>
  )}

export default PriceCard;
