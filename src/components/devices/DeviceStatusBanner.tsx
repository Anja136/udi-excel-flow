
interface DeviceStatusBannerProps {
  status: string | null;
  selectedAgency: string;
}

export const DeviceStatusBanner = ({ status, selectedAgency }: DeviceStatusBannerProps) => {
  if (!status) return null;

  return (
    <div className="mb-6 px-4 py-3 bg-blue-50 border border-blue-200 rounded-md">
      <p className="text-blue-700">
        Showing devices with status: <strong>{status}</strong>
        {selectedAgency !== "All Devices" && (
          <span> for agency: <strong>{selectedAgency}</strong></span>
        )}
      </p>
    </div>
  );
};
