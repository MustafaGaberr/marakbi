import React from "react";

interface OrderTableRowProps {
  orderId: string;
  orderDate: string;
  //
  customerName: string;
  customerEmail: string;
  //
  boatImageUrl: string;
  boatName: string;
  boatType: string;
  //
  rentalPeriod: string;
  rentalPeriodInDays: string;
  //
  amount: string;
  amountPerDay: string;
  //
  status: "Confirmed" | "Pending" | "In progress" | "Cancelled" | "Completed";
  paymentStatus: "Paid" | "Pending" | "Refunded";
  action?: () => void;
}

export default function OrderTableRow({
  orderId,
  orderDate,
  customerName,
  customerEmail,
  boatName,
  boatType,
  rentalPeriod,
  rentalPeriodInDays,
  amount,
  amountPerDay,
  status,
  paymentStatus,
  action,
}: OrderTableRowProps) {
  return (
    <tr className="border-b border-[#E5E7EB] hover:bg-gray-50 transition">
      <td className="py-3 px-4 text-sm">
        <p className="text-[15.09px] font-medium text-[#0A0A0A]">{orderId}</p>
        <p className="text-[13px] font-normal text-[#717182]">{orderDate}</p>
      </td>
      <td className="py-3 px-4 text-sm">
        <p className="text-[15.09px] font-normal text-[#0A0A0A]">
          {customerName}
        </p>
        <p className="text-[13px] font-normal text-[#717182]">
          {customerEmail}
        </p>
      </td>
      <td className="py-3 px-4 flex gap-2 text-sm">
        <div className="bg-slate-400 rounded-[8.62px] h-[42px] w-[42px]"></div>
        <div>
          <p className="text-[15.09px] font-normal text-[#0A0A0A]">
            {boatName}
          </p>
          <p className="text-[13px] font-normal text-[#717182]">{boatType}</p>
        </div>
      </td>
      <td className="py-3 px-4 text-sm">
        <p className="text-[15.09px] font-normal text-[#0A0A0A]">
          {rentalPeriod}
        </p>
        <p className="text-[13px] font-normal text-[#717182]">
          {rentalPeriodInDays}
        </p>
      </td>
      <td className="py-3 px-4 text-sm">
        <p className="text-[15.09px] font-normal text-[#0A0A0A]">
          {amount}
        </p>
        <p className="text-[13px] font-normal text-[#717182]">
          {amountPerDay}
        </p>
      </td>
      <td className="py-3 px-4 text-sm">{status}</td>
      <td className="py-3 px-4 text-sm">{paymentStatus}</td>
      <td
        className="py-3 px-4 text-sm text-blue-600 cursor-pointer font-medium"
        onClick={action}
      >
        View
      </td>
    </tr>
  );
}
