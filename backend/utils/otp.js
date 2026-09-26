// Generates a 6-digit OTP. Wire this up to a real email/SMS provider for production;
// for the hackathon it's logged to the server console so you can test the flow end to end.
export const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

export const sendOtp = async (email, otp) => {
  console.log(`[OTP] ${email} -> ${otp} (valid for 10 minutes)`);
  // TODO: integrate nodemailer / an SMS provider here.
  return true;
};
