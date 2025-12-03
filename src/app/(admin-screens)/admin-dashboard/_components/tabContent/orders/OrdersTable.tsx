import OrderTableRow from "./OrderTableRow";

export default function OrdersTable() {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-[#E5E7EB]">
      <table className="w-full min-w-[900px] text-left">
        <thead>
          <tr className="border-b text-[#0A0A0A] font-medium text-base border-[#E5E7EB]">
            {[
              "Order",
              "Customer",
              "Boat",
              "Rental Period",
              "Amount",
              "Status",
              "Payment",
              "Actions",
            ].map((head) => (
              <th
                key={head}
                className="py-3 px-4 text-sm font-semibold text-[#4B5563]"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <OrderTableRow
            orderId="ORD-2025-001"
            orderDate="10/15/2025"
            //
            customerName="Emma Wilson"
            customerEmail="emma@example.com"
            //
            boatImageUrl=""
            boatName="Luxury Yacht Paradise"
            boatType="Yacht"
            //
            rentalPeriod="Oct 20 - Oct 22"
            rentalPeriodInDays="3 days"
            //
            amount="$1633.50"
            amountPerDay="$450/day"
            //
            status="Confirmed"
            //
            paymentStatus="Paid"
            //
            action={() => console.log("View")}
          />
        </tbody>
      </table>
    </div>
  );
}
