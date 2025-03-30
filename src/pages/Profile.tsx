import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Settings, Bell, BarChart4, Shield, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Profile = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const [calorieGoal, setCalorieGoal] = useState(2400);
  const [stepGoal, setStepGoal] = useState(10000);
  const [activeMinutesGoal, setActiveMinutesGoal] = useState(150);

  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    age: 32,
    gender: "Male",
    height: "5'11\" (180 cm)",
    weight: "165 lbs (75 kg)",
  });

  const handleUpdateGoals = () => {
    console.log("Updated Goals:", {
      calorieGoal,
      stepGoal,
      activeMinutesGoal,
    });
    setIsDialogOpen(false);
  };

  const handleUpdateProfile = () => {
    console.log("Updated Profile:", profile);
    setIsEditProfileOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                        <User className="h-12 w-12 text-gray-500" />
                      </div>
                      <h2 className="text-xl font-bold">{profile.fullName}</h2>
                      <p className="text-gray-500">{profile.email}</p>

                      <div className="mt-6 w-full">
                        <Button
                          className="w-full"
                          onClick={() => setIsEditProfileOpen(true)}
                        >
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                      <Settings className="h-5 w-5 text-gray-500" />
                      <span>General Settings</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                      <Bell className="h-5 w-5 text-gray-500" />
                      <span>Notifications</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                      <Shield className="h-5 w-5 text-gray-500" />
                      <span>Privacy & Security</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-500">
                            Full Name
                          </label>
                          <p className="font-medium">{profile.fullName}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Email</label>
                          <p className="font-medium">{profile.email}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Age</label>
                          <p className="font-medium">{profile.age}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">
                            Gender
                          </label>
                          <p className="font-medium">{profile.gender}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">
                            Height
                          </label>
                          <p className="font-medium">{profile.height}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">
                            Weight
                          </label>
                          <p className="font-medium">{profile.weight}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Health Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">
                          Daily Calorie Goal
                        </label>
                        <p className="font-medium">{calorieGoal} calories</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">
                          Daily Step Goal
                        </label>
                        <p className="font-medium">{stepGoal} steps</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">
                          Weekly Active Minutes Goal
                        </label>
                        <p className="font-medium">
                          {activeMinutesGoal} minutes
                        </p>
                      </div>
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(true)}
                        >
                          Update Goals
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>

      {/* Update Goals Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Health Goals</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">
                Daily Calorie Goal
              </label>
              <Input
                type="number"
                value={calorieGoal}
                onChange={(e) => setCalorieGoal(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Daily Step Goal</label>
              <Input
                type="number"
                value={stepGoal}
                onChange={(e) => setStepGoal(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">
                Weekly Active Minutes Goal
              </label>
              <Input
                type="number"
                value={activeMinutesGoal}
                onChange={(e) => setActiveMinutesGoal(Number(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateGoals}>Save Goals</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <Input
                type="text"
                value={profile.fullName}
                onChange={(e) =>
                  setProfile({ ...profile, fullName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Age</label>
              <Input
                type="number"
                value={profile.age}
                onChange={(e) =>
                  setProfile({ ...profile, age: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Gender</label>
              <Input
                type="text"
                value={profile.gender}
                onChange={(e) =>
                  setProfile({ ...profile, gender: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Height</label>
              <Input
                type="text"
                value={profile.height}
                onChange={(e) =>
                  setProfile({ ...profile, height: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Weight</label>
              <Input
                type="text"
                value={profile.weight}
                onChange={(e) =>
                  setProfile({ ...profile, weight: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditProfileOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateProfile}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
