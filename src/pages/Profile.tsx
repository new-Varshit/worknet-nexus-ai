
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { User } from "@/contexts/AuthContext";

const Profile = () => {
  const { user, isLoading } = useAuth();
  const [profileData, setProfileData] = useState<Partial<User> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        department: user.department || "",
        position: user.position || "",
        avatar: user.avatar || ""
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container py-6 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6">My Profile</h1>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="employment">Employment Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card className="bg-card shadow-lg border-0">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="h-24 w-24 border-2 border-primary/20">
                <AvatarImage src={user?.avatar || ""} />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <CardTitle className="text-2xl">{user?.name}</CardTitle>
                <CardDescription>{user?.position || "Position not set"}</CardDescription>
                <CardDescription>{user?.email}</CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(!isEditing)}
                className="ml-auto shadow-sm"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      value={profileData?.name || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={isEditing ? "bg-background" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={profileData?.email || ""}
                      onChange={handleChange}
                      disabled
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input 
                      id="department"
                      name="department"
                      placeholder="Your department"
                      value={profileData?.department || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={isEditing ? "bg-background" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input 
                      id="position"
                      name="position"
                      placeholder="Your position"
                      value={profileData?.position || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={isEditing ? "bg-background" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Profile Image URL</Label>
                    <Input 
                      id="avatar"
                      name="avatar"
                      placeholder="Profile image URL"
                      value={profileData?.avatar || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={isEditing ? "bg-background" : ""}
                    />
                  </div>
                </div>

                {isEditing && (
                  <CardFooter className="flex justify-end px-0">
                    <Button type="submit" className="shadow-md">Save Changes</Button>
                  </CardFooter>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employment" className="space-y-6">
          <Card className="bg-card shadow-lg border-0">
            <CardHeader>
              <CardTitle>Employment Information</CardTitle>
              <CardDescription>Your employment details and history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Employee ID</Label>
                    <p className="text-sm p-2 bg-muted rounded-md">{user?.id || "EMP-" + Math.floor(Math.random() * 10000)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Join Date</Label>
                    <p className="text-sm p-2 bg-muted rounded-md">April 15, 2023</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Employment Status</Label>
                    <p className="text-sm p-2 bg-muted rounded-md">Full-time</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Reporting Manager</Label>
                    <p className="text-sm p-2 bg-muted rounded-md">Sarah Johnson</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card className="bg-card shadow-lg border-0">
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Your uploaded documents and certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4 flex items-center justify-between bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13v-1h6v1"/><path d="M11 18h2"/><path d="M12 12v6"/></svg>
                    </div>
                    <div>
                      <p className="font-medium">Resume.pdf</p>
                      <p className="text-xs text-muted-foreground">Uploaded on April 20, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
                
                <div className="border rounded-lg p-4 flex items-center justify-between bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13v-1h6v1"/><path d="M11 18h2"/><path d="M12 12v6"/></svg>
                    </div>
                    <div>
                      <p className="font-medium">ID_Proof.jpg</p>
                      <p className="text-xs text-muted-foreground">Uploaded on May 5, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
