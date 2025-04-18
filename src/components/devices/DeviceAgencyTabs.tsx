
import { TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";

interface DeviceAgencyTabsProps {
  selectedAgency: string;
  onAgencyChange: (value: string) => void;
  allAgencies: string[];
}

export const DeviceAgencyTabs = ({
  selectedAgency,
  onAgencyChange,
  allAgencies
}: DeviceAgencyTabsProps) => {
  return (
    <Tabs value={selectedAgency} onValueChange={onAgencyChange} className="mb-6">
      <TabsList className="flex flex-wrap">
        {allAgencies.map(agency => (
          <TabsTrigger key={agency} value={agency}>
            {agency}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
