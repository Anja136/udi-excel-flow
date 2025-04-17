
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
import { Save, Settings2 } from "lucide-react";

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
  const [selectedProcess, setSelectedProcess] = useState<string>("");
  const [showDetailConfig, setShowDetailConfig] = useState(true);
  
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

  // Effect to check if current config matches a saved process
  useEffect(() => {
    if (savedProcesses.length > 0) {
      const matchingProcess = savedProcesses.find(
        process => 
          process.authority === selectedConfig.authority && 
          process.template === selectedConfig.template && 
          process.dataSource === selectedConfig.dataSource
      );
      
      if (matchingProcess) {
        setSelectedProcess(matchingProcess.id);
      } else {
        setSelectedProcess("");
      }
    }
  }, [selectedConfig, savedProcesses]);

  const handleChange = (field: keyof ConfigData, value: string) => {
    // If a process was selected, deselect it when changing parameters
    if (selectedProcess) {
      setSelectedProcess("");
    }
    
    const updated = { ...selectedConfig, [field]: value };
    setSelectedConfig(updated);
    onConfigChange(updated);
  };

  const handleProcessSelect = (processId: string) => {
    if (processId === "configure") {
      setSelectedProcess("");
      setShowDetailConfig(true);
      return;
    }
    
    const selectedProc = savedProcesses.find(p => p.id === processId);
    if (selectedProc) {
      const { authority, template, dataSource } = selectedProc;
      const updatedConfig = { authority, template, dataSource };
      setSelectedConfig(updatedConfig);
      onConfigChange(updatedConfig);
      setSelectedProcess(processId);
      setShowDetailConfig(false);
    }
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
    setSelectedProcess(newProcess.id);
    setShowDetailConfig(false);
    toast.success("Process saved successfully");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Configure Download Parameters</CardTitle>
          <CardDescription>
            Select a saved process or configure new download parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Saved Processes Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="savedProcess">Saved Processes</Label>
            <Select 
              value={selectedProcess} 
              onValueChange={handleProcessSelect}
            >
              <SelectTrigger id="savedProcess">
                <SelectValue placeholder="Select a saved process" />
              </SelectTrigger>
              <SelectContent>
                {savedProcesses.map(process => (
                  <SelectItem key={process.id} value={process.id}>
                    {process.name}
                  </SelectItem>
                ))}
                {selectedProcess && (
                  <SelectItem value="configure">
                    Configure New Parameters
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Toggle to show configuration */}
          {selectedProcess && !showDetailConfig && (
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => setShowDetailConfig(true)}
                className="flex items-center gap-2"
              >
                <Settings2 className="h-4 w-4" />
                Configure Parameters
              </Button>
            </div>
          )}

          {/* Configuration Parameters */}
          {(showDetailConfig || !selectedProcess) && (
            <>
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
            </>
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
