
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";

const Settings = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    browser: true,
    desktop: false,
  });
  const [timeZone, setTimeZone] = useState("UTC");
  const [language, setLanguage] = useState("en");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveGeneralSettings = () => {
    toast.success("General settings saved successfully");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    // Password change logic would go here
    toast.success("Password changed successfully");
    
    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="container py-6 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="mb-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your account and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <Select 
                  value={timeZone} 
                  onValueChange={setTimeZone}
                >
                  <SelectTrigger id="timezone" className="w-full">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                    <SelectItem value="MST">MST (Mountain Standard Time)</SelectItem>
                    <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={language} 
                  onValueChange={setLanguage}
                >
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneralSettings} className="shadow-md">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Control how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={notifications.email}
                  onCheckedChange={() => handleNotificationChange('email')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                </div>
                <Switch 
                  id="sms-notifications" 
                  checked={notifications.sms}
                  onCheckedChange={() => handleNotificationChange('sms')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="browser-notifications">Browser Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                </div>
                <Switch 
                  id="browser-notifications" 
                  checked={notifications.browser}
                  onCheckedChange={() => handleNotificationChange('browser')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications on your desktop</p>
                </div>
                <Switch 
                  id="desktop-notifications" 
                  checked={notifications.desktop}
                  onCheckedChange={() => handleNotificationChange('desktop')}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast.success("Notification settings saved")} className="shadow-md">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password" 
                  />
                </div>
                
                <Button type="submit" className="shadow-md mt-4">
                  Change Password
                </Button>
              </form>
              
              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="flex items-center gap-2">
                  <Label htmlFor="theme">Toggle between light and dark mode:</Label>
                  <ThemeToggle />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
