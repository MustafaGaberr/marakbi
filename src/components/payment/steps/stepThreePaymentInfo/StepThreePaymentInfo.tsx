"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { customerApi } from "@/lib/api";
import useFormStep from "@/hooks/useFormStep";

export default function StepThreePaymentInfo() {
  const router = useRouter();
  const { setStep } = useFormStep();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [bookingData, setBookingData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    // تحميل بيانات الحجز من localStorage
    // Check for pending booking data first (from login redirect)
    let savedBooking = localStorage.getItem('pending_booking_data');
    if (savedBooking) {
      // Move pending booking to active booking
      localStorage.setItem('booking_data', savedBooking);
      localStorage.removeItem('pending_booking_data');
    } else {
      savedBooking = localStorage.getItem('booking_data');
    }

    if (savedBooking) {
      setBookingData(JSON.parse(savedBooking));
    } else {
      // لو مفيش بيانات حجز، رجع للصفحة الأولى
      setStep(1);
    }
  }, [setStep]);

  const handleConfirmPayment = async () => {
    if (!bookingData) return;

    setError("");
    setProcessing(true);

    try {
      // إنشاء Order
      const orderData = {
        boat_id: bookingData.boat_id,
        start_date: new Date().toISOString(), // TODO: استخدام التاريخ المحدد من المستخدم
        end_date: new Date(Date.now() + 3600000).toISOString(), // TODO: حساب نهاية الحجز
        rental_type: bookingData.rental_type,
        guest_count: bookingData.guest_count,
        payment_method: paymentMethod,
        platform: 'web' as const, // Platform identifier for web application
        voyage_type: 'Private' as const // TODO: يمكن جعلها ديناميكية
      };

      const response = await customerApi.createOrder(orderData);

      if (response.success && response.data) {
        // لو الدفع بالكارد، redirect للـ payment_url
        if (paymentMethod === 'card' && response.data.payment_data?.payment_url) {
          window.location.href = response.data.payment_data.payment_url;
        } else {
          // لو كاش، رح على صفحة my-bookings
          localStorage.removeItem('booking_data');
          alert('Booking created successfully! Payment will be collected in cash.');
          router.push('/my-bookings');
        }
      } else {
        setError(response.error || "Failed to create order");
      }
    } catch (err) {
      console.error("Order creation error:", err);
      setError("An error occurred while processing your order");
    } finally {
      setProcessing(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

      {/* Booking Summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Booking Summary</h3>
        <p className="text-sm text-gray-600">Boat: {bookingData.boat_name}</p>
        <p className="text-sm text-gray-600">Guests: {bookingData.guest_count}</p>
        <p className="text-sm text-gray-600">
          Rental Type: {bookingData.rental_type === 'hourly' ? 'Per Hour' : 'Per Day'}
        </p>
        {bookingData.hours && (
          <p className="text-sm text-gray-600">
            Duration: {bookingData.hours} hour{bookingData.hours > 1 ? 's' : ''}
          </p>
        )}
        {bookingData.days && (
          <p className="text-sm text-gray-600">
            Duration: {bookingData.days} day{bookingData.days > 1 ? 's' : ''}
          </p>
        )}

        <div className="mt-3 pt-3 border-t border-gray-300 space-y-1">
          {bookingData.base_price && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Base Price:</span>
              <span className="font-medium">{bookingData.base_price.toFixed(0)} EGP</span>
            </div>
          )}
          {bookingData.service_fee && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service Fee:</span>
              <span className="font-medium">{bookingData.service_fee.toFixed(0)} EGP</span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-300">
            <span>Total:</span>
            <span className="text-sky-900">
              {bookingData.total_price?.toFixed(0) || bookingData.base_price?.toFixed(0)} EGP
            </span>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4 mb-6">
        <div
          onClick={() => setPaymentMethod('card')}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-sky-900 bg-sky-50' : 'border-gray-200 hover:border-gray-300'
            }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-sky-900 bg-sky-900' : 'border-gray-300'
              }`}>
              {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
            </div>
            <div>
              <p className="font-semibold">Pay by Card</p>
              <p className="text-sm text-gray-600">Secure online payment via Fawaterak</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => setPaymentMethod('cash')}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-sky-900 bg-sky-50' : 'border-gray-200 hover:border-gray-300'
            }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cash' ? 'border-sky-900 bg-sky-900' : 'border-gray-300'
              }`}>
              {paymentMethod === 'cash' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
            </div>
            <div>
              <p className="font-semibold">Pay in Cash</p>
              <p className="text-sm text-gray-600">Pay when you receive the service</p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => setStep(2)}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleConfirmPayment}
          disabled={processing}
          className="flex-1 px-6 py-3 bg-sky-900 text-white rounded-lg hover:bg-sky-800 transition-colors disabled:opacity-50"
        >
          {processing ? "Processing..." : `Confirm & ${paymentMethod === 'card' ? 'Pay' : 'Book'}`}
        </button>
      </div>
    </div>
  );
}
