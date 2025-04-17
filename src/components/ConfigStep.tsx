
import React, { useState, useEffect } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Save } from "lucide-react";

export interface ConfigData {
  authority: string;
  template: string;
  dataSource: string;
}

export interface Process extends ConfigData {
  id: string;
  name: string;
}

interface ConfigStepProps {
  onNext: () => void;
  onConfigChange: (config: ConfigData) => void;
  config: ConfigData;
}

const ConfigStep: React.FC<ConfigStepProps> = ({ onNext, onConfigChange, config }) => {
  const [selectedConfig, setSelectedConfig] = useState<ConfigData>(config);
  const [savedProcesses, setSavedProcesses] = useState<Process[]>([]);
  const [newProcessName, setNewProcessName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Simulated data - in a real app, this would come from an API
  const authorities = [
    { id: "fda", name: "FDA (US)" },
    { id: "ema", name: "EMA (Europe)" },
    { id: "pmda", name: "PMDA (Japan)" },
    { id: "anvisa", name: "ANVISA (Brazil)" },
    { id: "nmpa", name: "NMPA (China)" },
  ];
  
  const templates = [
    { id: "template1", name: "UDI-DI Template" },
    { id: "template2", name: "Basic Device Information" },
    { id: "template3", name: "Full Device Details" },
    { id: "template4", name: "Package Labeling Template" },
  ];
  
  const dataSources = [
    { id: "source1", name: "Enterprise GUDID" },
    { id: "source2", name: "Master Device Registry" },
    { id: "source3", name: "Clinical Systems" },
    { id: "source4", name: "Legacy Product Database" },
  ];

  // Load saved processes from localStorage
  useEffect(() => {
    const savedProcessesJson = localStorage.getItem('udi-saved-processes');
    if (savedProcessesJson) {
      setSavedProcesses(JSON.parse(savedProcessesJson));
    }
  }, []);

  const handleChange = (field: keyof ConfigData, value: string) => {
    const updated = { ...selectedConfig, [field]: value };
    setSelectedConfig(updated);
    onConfigChange(updated);
  };

  const saveProcess = () => {
    if (!newProcessName.trim()) {
      toast.error("Please enter a process name");
      return;
    }

    const newProcess: Process = {
      ...selectedConfig,
      id: Date.now().toString(),
      name: newProcessName
    };

    const updatedProcesses = [...savedProcesses, newProcess];
    setSavedProcesses(updatedProcesses);
    localStorage.setItem('udi-saved-processes', JSON.stringify(updatedProcesses));
    setDialogOpen(false);
    setNewProcessName("");
    toast.success("Process saved successfully");
  };

  const loadProcess = (process: Process) => {
    setSelectedConfig(process);
    onConfigChange(process);
    toast.success(`Loaded process: ${process.name}`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Configure Download Parameters</CardTitle>
          <CardDescription>
            Select the regulatory authority and template options for your UDI data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="authority">Regulatory Authority</Label>
            <Select 
              value={selectedConfig.authority} 
              onValueChange={(value) => handleChange('authority', value)}
            >
              <SelectTrigger id="authority">
                <SelectValue placeholder="Select Authority" />
              </SelectTrigger>
              <SelectContent>
                {authorities.map(authority => (
                  <SelectItem key={authority.id} value={authority.id}>
                    {authority.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Excel Template</Label>
            <Select 
              value={selectedConfig.template} 
              onValueChange={(value) => handleChange('template', value)}
            >
              <SelectTrigger id="template">
                <SelectValue placeholder="Select Template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataSource">Data Source</Label>
            <Select 
              value={selectedConfig.dataSource} 
              onValueChange={(value) => handleChange('dataSource', value)}
            >
              <SelectTrigger id="dataSource">
                <SelectValue placeholder="Select Data Source" />
              </SelectTrigger>
              <SelectContent>
                {dataSources.map(source => (
                  <SelectItem key={source.id} value={source.id}>
                    {source.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {savedProcesses.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Saved Processes</h3>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                {savedProcesses.map(process => (
                  <Button 
                    key={process.id} 
                    variant="outline" 
                    className="justify-start text-left h-auto py-2"
                    onClick={() => loadProcess(process)}
                  >
                    <span className="truncate">{process.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save as Process
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Process Configuration</DialogTitle>
                <DialogDescription>
                  Enter a name to save your current configuration for future use
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="processName">Process Name</Label>
                <Input 
                  id="processName" 
                  value={newProcessName} 
                  onChange={(e) => setNewProcessName(e.target.value)} 
                  placeholder="Enter process name"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveProcess}>
                  Save Process
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button 
            onClick={onNext}
            disabled={!selectedConfig.authority || !selectedConfig.template || !selectedConfig.dataSource}
          >
            Next Step
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConfigStep;
