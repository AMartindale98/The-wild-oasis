import BookingDetail from "../features/bookings/BookingDetail";

//jonas suggests a page should not fetch data or have side effects which is why the BookingDetail is kept separate and this page is so simple. not a hard rule but an organizational suggestion.

function Booking() {
  return <BookingDetail />;
}

export default Booking;
