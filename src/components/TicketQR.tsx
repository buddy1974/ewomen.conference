import { QRCodeSVG } from "qrcode.react";

interface TicketQRProps {
  reference: string;
  size?: number;
}

/**
 * Renders a QR code whose value is `EW2026-{reference}`.
 * Staff scanners at check-in strip the prefix to obtain the bare reference.
 */
const TicketQR = ({ reference, size = 200 }: TicketQRProps) => {
  const value = `EW2026-${reference.toUpperCase()}`;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
        <QRCodeSVG
          value={value}
          size={size}
          bgColor="#ffffff"
          fgColor="#1a001f"
          level="M"
          includeMargin={false}
        />
      </div>
      <p className="text-xs text-gray-400 font-mono tracking-widest">{value}</p>
    </div>
  );
};

export default TicketQR;
