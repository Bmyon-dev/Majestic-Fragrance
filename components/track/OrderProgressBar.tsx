import { Check } from "lucide-react";
import { OrderStatus, ORDER_STATUS_SEQUENCE, ORDER_STATUS_LABELS } from "@/data/order-types";

export function OrderProgressBar({ status }: { status: OrderStatus }) {
  if (status === "cancelled") {
    return (
      <div className="rounded-xl border border-red-400/30 bg-red-400/5 px-4 py-3 text-center text-sm text-red-300">
        This order was cancelled. Contact us on WhatsApp if you have questions.
      </div>
    );
  }

  const currentIndex = ORDER_STATUS_SEQUENCE.indexOf(status);

  return (
    <div className="flex flex-col gap-0">
      {ORDER_STATUS_SEQUENCE.map((s, i) => {
        const isDone = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isLast = i === ORDER_STATUS_SEQUENCE.length - 1;

        return (
          <div key={s} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isDone || isCurrent
                    ? "border-gold bg-gradient-to-br from-purple to-magenta text-white"
                    : "border-white/15 text-text-faint"
                }`}
              >
                {isDone ? <Check size={14} /> : <span className="text-xs">{i + 1}</span>}
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 ${
                    isDone ? "bg-gold" : "bg-white/10"
                  }`}
                  style={{ minHeight: "2.5rem" }}
                />
              )}
            </div>
            <div className="pb-10">
              <p
                className={`font-medium ${
                  isCurrent
                    ? "text-gradient-gold"
                    : isDone
                    ? "text-text-primary"
                    : "text-text-faint"
                }`}
              >
                {ORDER_STATUS_LABELS[s]}
              </p>
              {isCurrent && (
                <p className="text-xs text-text-muted mt-1">Current status</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
