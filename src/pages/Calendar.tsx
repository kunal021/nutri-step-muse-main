import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  MoreVertical,
  Check,
  Pencil,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type EventCategory = "exercise" | "nutrition" | "health";

interface Event {
  id: number;
  date: Date;
  title: string;
  category: EventCategory;
  completed: boolean;
}

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      date: new Date(),
      title: "Morning Run",
      category: "exercise",
      completed: false,
    },
    {
      id: 2,
      date: new Date(),
      title: "Meal Prep",
      category: "nutrition",
      completed: true,
    },
    {
      id: 3,
      date: new Date(),
      title: "Doctor Appointment",
      category: "health",
      completed: false,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventCategory, setNewEventCategory] =
    useState<EventCategory>("exercise");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const toggleEventCompletion = (id: number) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, completed: !event.completed } : event
      )
    );
  };

  const addOrUpdateEvent = () => {
    if (newEventTitle.trim() === "") return;

    if (editingEvent) {
      // Update existing event
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id
            ? { ...event, title: newEventTitle, category: newEventCategory }
            : event
        )
      );
    } else {
      // Add new event
      const newEvent: Event = {
        id: events.length + 1,
        date: date,
        title: newEventTitle,
        category: newEventCategory,
        completed: false,
      };

      setEvents([...events, newEvent]);
    }

    setNewEventTitle("");
    setNewEventCategory("exercise");
    setEditingEvent(null);
    setIsDialogOpen(false);
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const openEditDialog = (event: Event) => {
    setEditingEvent(event);
    setNewEventTitle(event.title);
    setNewEventCategory(event.category);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Calendar</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5 text-health-blue-500" />
                    Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">
                    Events for{" "}
                    {date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </CardTitle>
                  <Button size="sm" onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.filter(
                      (event) =>
                        event.date.toDateString() === date.toDateString()
                    ).length > 0 ? (
                      events
                        .filter(
                          (event) =>
                            event.date.toDateString() === date.toDateString()
                        )
                        .map((event) => (
                          <div
                            key={event.id}
                            className="flex items-center justify-between p-3 rounded-lg border"
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-3 h-3 rounded-full mr-3 ${
                                  event.category === "exercise"
                                    ? "bg-health-blue-500"
                                    : event.category === "nutrition"
                                    ? "bg-health-green-500"
                                    : "bg-amber-500"
                                }`}
                              ></div>
                              <span
                                className={
                                  event.completed
                                    ? "line-through text-gray-500"
                                    : ""
                                }
                              >
                                {event.title}
                              </span>
                            </div>

                            {/* Desktop view buttons */}
                            <div className="hidden md:flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleEventCompletion(event.id)}
                              >
                                {event.completed ? "Undo" : "Complete"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(event)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deleteEvent(event.id)}
                              >
                                Delete
                              </Button>
                            </div>

                            {/* Mobile view popover */}
                            <div className="md:hidden">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-40 p-0">
                                  <div className="flex flex-col">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="justify-start rounded-none h-10"
                                      onClick={() =>
                                        toggleEventCompletion(event.id)
                                      }
                                    >
                                      <Check className="h-4 w-4 mr-2" />
                                      {event.completed ? "Undo" : "Complete"}
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="justify-start rounded-none h-10"
                                      onClick={() => openEditDialog(event)}
                                    >
                                      <Pencil className="h-4 w-4 mr-2" />
                                      Edit
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="justify-start rounded-none h-10 text-red-500 hover:text-red-600 hover:bg-red-50"
                                      onClick={() => deleteEvent(event.id)}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </Button>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No events for this day</p>
                        <p className="text-sm mt-1">
                          Click 'Add Event' to create a new event
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>

      {/* Add/Edit Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? "Edit Event" : "Add New Event"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
            <Select
              onValueChange={(value) =>
                setNewEventCategory(value as EventCategory)
              }
              value={newEventCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exercise">Exercise</SelectItem>
                <SelectItem value="nutrition">Nutrition</SelectItem>
                <SelectItem value="health">Health</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addOrUpdateEvent}>
              {editingEvent ? "Update Event" : "Add Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
