import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkle,
  RefreshCw,
  BookmarkPlus,
  Bookmark,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

// Types for our tips
interface Tip {
  id: number;
  category: "nutrition" | "fitness" | "mindfulness" | "sleep";
  title: string;
  content: string;
  likes: number;
}

// Generate mockTips
const generateMockTips = (): Tip[] => {
  const nutritionTips = [
    {
      title: "Eat the Rainbow",
      content:
        "Try to include fruits and vegetables of different colors in your diet to ensure you're getting a variety of nutrients and antioxidants.",
    },
    {
      title: "Meal Prep Sundays",
      content:
        "Dedicate a few hours on Sunday to prep meals for the week. This helps control portions and reduces the temptation to order takeout.",
    },
    {
      title: "Protein First",
      content:
        "Start your meals with protein to help you feel fuller and reduce overall calorie intake in the meal.",
    },
    {
      title: "Healthy Snack Stations",
      content:
        "Create mini snack stations at home and work with pre-portioned healthy options like nuts, fruits, or yogurt.",
    },
    {
      title: "Mindful Eating",
      content:
        "Put away electronics while eating and focus on your food. This helps recognize fullness cues and enhances satisfaction.",
    },
    {
      title: "Hydration Habit",
      content:
        "Drink a glass of water before each meal to help with digestion and create a sense of fullness before eating.",
    },
    {
      title: "Veggie Boost",
      content:
        "Add extra vegetables to every meal - even breakfast! Try spinach in smoothies or adding shredded carrots to sauces.",
    },
  ];

  const fitnessTips = [
    {
      title: "Two-Minute Rule",
      content:
        "If an exercise takes less than two minutes to complete, do it right away without procrastinating.",
    },
    {
      title: "Walking Meetings",
      content:
        "Turn phone calls or audio meetings into walking meetings to add more movement to your day.",
    },
    {
      title: "Morning Micro-Workout",
      content:
        "Start your day with a 5-minute workout - even just a few pushups, squats, and jumping jacks can energize you.",
    },
    {
      title: "Exercise Snacking",
      content:
        "Break up exercise into 'snack-sized' portions throughout the day. Try 3-5 minutes of activity every hour.",
    },
    {
      title: "Active TV Time",
      content:
        "Do bodyweight exercises during commercial breaks or while watching your favorite shows.",
    },
    {
      title: "NEAT Boosters",
      content:
        "Increase Non-Exercise Activity Thermogenesis by taking stairs, parking farther away, or doing household chores more vigorously.",
    },
    {
      title: "Buddy System",
      content:
        "Find a workout buddy or join a fitness community to stay accountable and motivated.",
    },
  ];

  const mindfulnessTips = [
    {
      title: "60-Second Breath Focus",
      content:
        "Take 60 seconds several times a day to focus solely on your breathing, counting each inhale and exhale.",
    },
    {
      title: "Gratitude Journaling",
      content:
        "Write down three things you're grateful for each day to shift focus toward positive aspects of life.",
    },
    {
      title: "Sensory Reset",
      content:
        "When stressed, focus on naming 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
    },
    {
      title: "Screen-Free Meals",
      content:
        "Make at least one meal per day completely screen-free to practice mindful eating and present-moment awareness.",
    },
    {
      title: "Mindful Walking",
      content:
        "During a short walk, pay attention to each step, the sensations in your feet, and your surroundings.",
    },
  ];

  const sleepTips = [
    {
      title: "Consistent Sleep Schedule",
      content:
        "Go to bed and wake up at the same time every day, even on weekends, to regulate your body's internal clock.",
    },
    {
      title: "Electronics Curfew",
      content:
        "Stop using electronic devices at least 30-60 minutes before bedtime to reduce blue light exposure.",
    },
    {
      title: "Optimal Sleep Temperature",
      content:
        "Keep your bedroom between 60-67°F (15-19°C) for the most comfortable sleep environment.",
    },
    {
      title: "Progressive Muscle Relaxation",
      content:
        "Before bed, tense and then relax each muscle group from toes to head to release physical tension.",
    },
    {
      title: "Sleep-Friendly Bedtime Snacks",
      content:
        "If hungry before bed, choose small snacks containing tryptophan like a small banana with almond butter or a small glass of milk.",
    },
  ];

  // Combine all tips and assign IDs and categories
  let id = 1;
  const allTips: Tip[] = [
    ...nutritionTips.map((tip) => ({
      ...tip,
      id: id++,
      category: "nutrition" as const,
      likes: Math.floor(Math.random() * 50),
    })),
    ...fitnessTips.map((tip) => ({
      ...tip,
      id: id++,
      category: "fitness" as const,
      likes: Math.floor(Math.random() * 50),
    })),
    ...mindfulnessTips.map((tip) => ({
      ...tip,
      id: id++,
      category: "mindfulness" as const,
      likes: Math.floor(Math.random() * 50),
    })),
    ...sleepTips.map((tip) => ({
      ...tip,
      id: id++,
      category: "sleep" as const,
      likes: Math.floor(Math.random() * 50),
    })),
  ];

  return allTips;
};

const Tips: React.FC = () => {
  const allTips = generateMockTips();
  const [currentTip, setCurrentTip] = useState<Tip | null>(null);
  const [favorites, setFavorites] = useState<Tip[]>([]);
  const [likedTips, setLikedTips] = useState<number[]>([]);

  // Load saved favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteTips");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedLikes = localStorage.getItem("likedTips");
    if (savedLikes) {
      setLikedTips(JSON.parse(savedLikes));
    }

    // Set initial random tip
    getRandomTip();
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("favoriteTips", JSON.stringify(favorites));
  }, [favorites]);

  // Save liked tips to localStorage when they change
  useEffect(() => {
    localStorage.setItem("likedTips", JSON.stringify(likedTips));
  }, [likedTips]);

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * allTips.length);
    setCurrentTip(allTips[randomIndex]);
  };

  const toggleFavorite = (tip: Tip) => {
    const isFavorite = favorites.some((fav) => fav.id === tip.id);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id === tip.id));
    } else {
      setFavorites([...favorites, tip]);
    }
  };

  const likeTip = (tipId: number) => {
    if (!likedTips.includes(tipId)) {
      setLikedTips([...likedTips, tipId]);

      // Update the likes count in the current tip
      if (currentTip && currentTip.id === tipId) {
        setCurrentTip({
          ...currentTip,
          likes: currentTip.likes + 1,
        });
      }

      // Update likes in favorites if the tip is there
      setFavorites(
        favorites.map((tip) =>
          tip.id === tipId ? { ...tip, likes: tip.likes + 1 } : tip
        )
      );
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "nutrition":
        return "bg-health-green-500";
      case "fitness":
        return "bg-health-blue-500";
      case "mindfulness":
        return "bg-purple-500";
      case "sleep":
        return "bg-indigo-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "nutrition":
        return "🥗";
      case "fitness":
        return "💪";
      case "mindfulness":
        return "🧘";
      case "sleep":
        return "😴";
      default:
        return "✨";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center">
              <Sparkle className="h-6 w-6 mr-2 text-health-green-500" />
              Tips & Tricks
            </h1>

            <Tabs defaultValue="daily" className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="daily">Daily Tip</TabsTrigger>
                <TabsTrigger value="favorites">
                  Favorites ({favorites.length})
                </TabsTrigger>
                <TabsTrigger value="browse">Browse All</TabsTrigger>
              </TabsList>

              <TabsContent value="daily">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Sparkle className="h-5 w-5 mr-2 text-amber-500" />
                        Tip of the Day
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={getRandomTip}
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        New Tip
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentTip && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge
                              className={getCategoryColor(currentTip.category)}
                            >
                              {getCategoryIcon(currentTip.category)}{" "}
                              {currentTip.category}
                            </Badge>
                            <h3 className="text-xl font-medium mt-2">
                              {currentTip.title}
                            </h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => likeTip(currentTip.id)}
                              disabled={likedTips.includes(currentTip.id)}
                              className={
                                likedTips.includes(currentTip.id)
                                  ? "text-red-500"
                                  : ""
                              }
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {currentTip.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleFavorite(currentTip)}
                            >
                              {favorites.some(
                                (fav) => fav.id === currentTip.id
                              ) ? (
                                <Bookmark className="h-4 w-4 text-amber-500" />
                              ) : (
                                <BookmarkPlus className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-700">{currentTip.content}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Did You Know?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Consistently following small, healthy habits can lead to
                        significant improvements over time. Small 1%
                        improvements build up to major changes when practiced
                        consistently.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Tip Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-health-green-500">
                          🥗 Nutrition
                        </Badge>
                        <Badge className="bg-health-blue-500">💪 Fitness</Badge>
                        <Badge className="bg-purple-500">🧘 Mindfulness</Badge>
                        <Badge className="bg-indigo-500">😴 Sleep</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="favorites">
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favorites.map((tip) => (
                      <Card key={tip.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <Badge className={getCategoryColor(tip.category)}>
                                {getCategoryIcon(tip.category)} {tip.category}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleFavorite(tip)}
                              >
                                <Bookmark className="h-4 w-4 text-amber-500" />
                              </Button>
                            </div>
                            <h3 className="text-lg font-medium mb-2">
                              {tip.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {tip.content}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-2 px-4 flex justify-between items-center border-t">
                            <span className="text-xs text-gray-500">
                              Saved to favorites
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => likeTip(tip.id)}
                              disabled={likedTips.includes(tip.id)}
                              className={
                                likedTips.includes(tip.id) ? "text-red-500" : ""
                              }
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {tip.likes}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <BookmarkPlus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium mb-2">
                        No favorite tips yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Save tips you find helpful to access them quickly later
                      </p>
                      <Button onClick={() => getRandomTip()}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Get a Random Tip
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="browse">
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer">
                      All
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer bg-health-green-500 text-white"
                    >
                      Nutrition
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer bg-health-blue-500 text-white"
                    >
                      Fitness
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer bg-purple-500 text-white"
                    >
                      Mindfulness
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer bg-indigo-500 text-white"
                    >
                      Sleep
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {allTips.map((tip) => (
                    <Card key={tip.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <Badge className={getCategoryColor(tip.category)}>
                              {getCategoryIcon(tip.category)} {tip.category}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleFavorite(tip)}
                            >
                              {favorites.some((fav) => fav.id === tip.id) ? (
                                <Bookmark className="h-4 w-4 text-amber-500" />
                              ) : (
                                <BookmarkPlus className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <h3 className="text-lg font-medium mb-2">
                            {tip.title}
                          </h3>
                          <p className="text-sm text-gray-600">{tip.content}</p>
                        </div>
                        <div className="bg-gray-50 p-2 px-4 flex justify-end items-center border-t">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => likeTip(tip.id)}
                            disabled={likedTips.includes(tip.id)}
                            className={
                              likedTips.includes(tip.id) ? "text-red-500" : ""
                            }
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {tip.likes}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Tips;
