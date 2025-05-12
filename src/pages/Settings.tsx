
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { BellRing, Moon, Sun, Laptop, Shield, Mail, AlertTriangle } from "lucide-react";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  
  // Notifications settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskAssignments: true,
    leaveApprovals: true,
    systemUpdates: false
  });
  
  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: "30"
  });
  
  const handleSecurityChange = (key: keyof typeof securitySettings, value: any) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const saveSettings = (settingType: string) => {
    // Simulate API call
    setTimeout(() => {
      toast.success(`${settingType} settings saved successfully`);
    }, 500);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Customize your WorkNet360 experience
        </p>
      </div>
      
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how WorkNet360 looks for you
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme Preference</h3>
                
                <RadioGroup 
                  defaultValue={theme} 
                  onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem 
                      value="light" 
                      id="theme-light" 
                      className="sr-only" 
                    />
                    <Label
                      htmlFor="theme-light"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      data-state={theme === 'light' ? "checked" : "unchecked"}
                    >
                      <Sun className="mb-2 h-6 w-6" />
                      <span>Light</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem
                      value="dark"
                      id="theme-dark"
                      className="sr-only"
                    />
                    <Label
                      htmlFor="theme-dark"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      data-state={theme === 'dark' ? "checked" : "unchecked"}
                    >
                      <Moon className="mb-2 h-6 w-6" />
                      <span>Dark</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem
                      value="system"
                      id="theme-system"
                      className="sr-only"
                    />
                    <Label
                      htmlFor="theme-system"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      data-state={theme === 'system' ? "checked" : "unchecked"}
                    >
                      <Laptop className="mb-2 h-6 w-6" />
                      <span>System</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div className="pt-4">
                <Button 
                  onClick={() => saveSettings("Appearance")}
                  className="btn-gradient"
                >
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={() => handleNotificationChange('emailNotifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BellRing className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={() => handleNotificationChange('pushNotifications')}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="taskAssignments">Task Assignments</Label>
                    <Switch
                      id="taskAssignments"
                      checked={notificationSettings.taskAssignments}
                      onCheckedChange={() => handleNotificationChange('taskAssignments')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="leaveApprovals">Leave Approvals</Label>
                    <Switch
                      id="leaveApprovals"
                      checked={notificationSettings.leaveApprovals}
                      onCheckedChange={() => handleNotificationChange('leaveApprovals')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="systemUpdates">System Updates</Label>
                    <Switch
                      id="systemUpdates"
                      checked={notificationSettings.systemUpdates}
                      onCheckedChange={() => handleNotificationChange('systemUpdates')}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="pt-4">
                <Button 
                  onClick={() => saveSettings("Notification")}
                  className="btn-gradient"
                >
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security preferences
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="loginNotifications">Login Notifications</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts for new sign-ins
                    </p>
                  </div>
                  <Switch
                    id="loginNotifications"
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) => handleSecurityChange('loginNotifications', checked)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Session Settings</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <RadioGroup 
                    defaultValue={securitySettings.sessionTimeout} 
                    onValueChange={(value) => handleSecurityChange('sessionTimeout', value)}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="15" id="timeout-15" />
                      <Label htmlFor="timeout-15">15 minutes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="30" id="timeout-30" />
                      <Label htmlFor="timeout-30">30 minutes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="60" id="timeout-60" />
                      <Label htmlFor="timeout-60">60 minutes</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <Separator />
              
              <div className="pt-4">
                <Button 
                  onClick={() => saveSettings("Security")}
                  className="btn-gradient"
                >
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
