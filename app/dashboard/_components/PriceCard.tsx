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
    <div className="flex flex-col items-center bg-gradient-to-t from-gray-100 via-gray-50 to-white hover:shadow-xl border border-gray-300 rounded-3xl p-8 w-96 text-center transition-all duration-300">
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">Monthly Plan</h3>
      <p className="text-3xl font-bold text-gray-900 mt-2">₹1999</p>
      <p className="text-base text-red-600 line-through">50% off</p>
      <p className="text-4xl font-extrabold text-primary my-3">₹999</p>
      <div className="w-full mt-5 space-y-4">
        {monthlyPlan.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 py-2 w-full justify-start">
            <Check className="text-green-500 w-5 h-5 shrink-0" />
            <p className="text-lg text-gray-700 font-medium">{item.content}</p>
          </div>
        ))}
      </div>
      <Button
        variant="destructive"
        className="mt-6 w-full py-3 text-xl font-medium rounded-xl"
        onClick={processPayment}>
        {loading ? <Loader className="animate-spin" /> : "Buy Plan"}
      </Button>
    </div>
  );
};

export default PriceCard;
