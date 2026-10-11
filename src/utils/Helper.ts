// 📁 src/utils/authHelpers.ts

/**
 * Validates an email address against the industry gold standard ruleset.
 * Strips out accidental whitespace paddings automatically.
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

/**
 * Generates a secure, cryptographically random 6-digit numeric OTP string.
 */
export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Calculates a strict future expiration timestamp from the current moment.
 * @param minutesToExpiry Number of minutes before the token expires (default 10)
 */
export const calculateOtpExpiry = (minutesToExpiry: number = 10): Date => {
  return new Date(Date.now() + minutesToExpiry * 60 * 1000);
};

/**
 * Sanity check utility to safely mask user emails for secure log printouts or alerts.
 * Example: "rlikhon.1info@gmail.com" -> "rl******o@gmail.com"
 */
export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 3) return `***@${domain}`;
  return `${localPart.substring(0, 2)}******${localPart.slice(-1)}@${domain}`;
};

export const isValidMobileNumber = (mobile: string): boolean => {
  if (!mobile) return false;
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobile);
};

export const isValidPassword = (password: string): boolean => {
  if (!password) return false;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordRegex.test(password);
};

export const isValidName = (name: string): boolean => {
  if (!name) return false;
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
};

export const isValidRole = (role: string): boolean => {
  return ["user", "deliveryBoy", "admin"].includes(role);
};

export const isValidOTPFormate = (otp: string): boolean => {
  if (!otp) return false;
  const otpRegex = /^[0-9]{6}$/;
  return otpRegex.test(otp);
};

// ==========================================
// 🚗 VEHICLE & BOOKING BUSINESS HELPERS
// ==========================================

/**
 * Formats pricing data cleanly to local currency structures (e.g., USD, BDT, etc.).
 * Example: 4500 -> "$4,500.00" or custom localization targets
 */
export const formatCurrency = (amount: number, locale = 'en-US', currency = 'USD'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Estimates logistics or ride-hailing fares based on distance and base structural fees.
 * Useful for the moving trucks and on-demand ride booking lines.
 */
export const calculateFare = (baseFare: number, perKmRate: number, distanceInKm: number): number => {
  return baseFare + (perKmRate * distanceInKm);
};


// ==========================================
// 🎨 UI & STRING UTILITIES
// ==========================================

/**
 * Capitalizes the first letter of any text string (e.g., matching category badges).
 * Example: "ride-hailing" -> "Ride-hailing"
 */
export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatTime = (time: Date): string => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
};

