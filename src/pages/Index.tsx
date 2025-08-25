import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Mock data
  const buses = [
    { busNo: "TS07-1234", routeName: "Hyderabad-Warangal", routeNo: "101", firstBusTime: "05:00", lastBusTime: "23:00", routeDistance: 150, status: "Active" },
    { busNo: "TS07-5678", routeName: "Hyderabad-Khammam", routeNo: "102", firstBusTime: "05:30", lastBusTime: "22:30", routeDistance: 200, status: "Maintenance" },
    { busNo: "TS07-9012", routeName: "Warangal-Karimnagar", routeNo: "103", firstBusTime: "06:00", lastBusTime: "21:00", routeDistance: 120, status: "Active" },
  ];

  const employees = [
    { empId: "EMP001", name: "Rajesh Kumar", depotAssigned: "Hyderabad Central", phoneNo: "9876543210", designation: "Driver" },
    { empId: "EMP002", name: "Suresh Reddy", depotAssigned: "Warangal", phoneNo: "9876543211", designation: "Conductor" },
    { empId: "EMP003", name: "Ramesh Rao", depotAssigned: "Khammam", phoneNo: "9876543212", designation: "Driver" },
  ];

  const tickets = [
    { date: "2024-01-15", ticketsSold: 450, revenueEarned: 13500, busNo: "TS07-1234" },
    { date: "2024-01-15", ticketsSold: 320, revenueEarned: 9600, busNo: "TS07-5678" },
    { date: "2024-01-15", ticketsSold: 280, revenueEarned: 8400, busNo: "TS07-9012" },
  ];

  const assignments = [
    { empId: "EMP001", busNo: "TS07-1234", date: "2024-01-15", shift: "AM", trips: 3, distanceTraveled: 450 },
    { empId: "EMP002", busNo: "TS07-1234", date: "2024-01-15", shift: "PM", trips: 2, distanceTraveled: 300 },
    { empId: "EMP003", busNo: "TS07-5678", date: "2024-01-15", shift: "AM", trips: 2, distanceTraveled: 400 },
  ];

  const filterData = (data: any[], searchKey: string) => {
    if (!searchQuery) return data;
    return data.filter(item => 
      Object.values(item).some(value => 
        value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const handleQuestion = () => {
    if (!question.trim()) return;
    
    const q = question.toLowerCase();
    let result = "";

    // Bus-related queries
    if (q.includes("bus") || q.includes("route")) {
      if (q.includes("active")) {
        const activeBuses = buses.filter(b => b.status === "Active");
        result = `Active buses: ${activeBuses.map(b => b.busNo).join(", ")} (Total: ${activeBuses.length})`;
      } else if (q.includes("maintenance")) {
        const maintenanceBuses = buses.filter(b => b.status === "Maintenance");
        result = `Buses in maintenance: ${maintenanceBuses.map(b => b.busNo).join(", ")} (Total: ${maintenanceBuses.length})`;
      } else if (q.includes("total")) {
        result = `Total buses: ${buses.length} (Active: ${buses.filter(b => b.status === "Active").length}, Maintenance: ${buses.filter(b => b.status === "Maintenance").length})`;
      } else if (q.includes("hyderabad")) {
        const hyderabadRoutes = buses.filter(b => b.routeName.toLowerCase().includes("hyderabad"));
        result = `Hyderabad routes: ${hyderabadRoutes.map(b => `${b.busNo} (${b.routeName})`).join(", ")}`;
      } else if (q.includes("longest") || q.includes("maximum distance")) {
        const longest = buses.reduce((max, b) => b.routeDistance > max.routeDistance ? b : max);
        result = `Longest route: ${longest.routeName} (${longest.busNo}) - ${longest.routeDistance} km`;
      } else if (q.includes("shortest") || q.includes("minimum distance")) {
        const shortest = buses.reduce((min, b) => b.routeDistance < min.routeDistance ? b : min);
        result = `Shortest route: ${shortest.routeName} (${shortest.busNo}) - ${shortest.routeDistance} km`;
      } else if (q.includes("early") || q.includes("first")) {
        const earliest = buses.reduce((early, b) => b.firstBusTime < early.firstBusTime ? b : early);
        result = `Earliest bus service: ${earliest.routeName} (${earliest.busNo}) starts at ${earliest.firstBusTime}`;
      } else if (q.includes("late") || q.includes("last")) {
        const latest = buses.reduce((late, b) => b.lastBusTime > late.lastBusTime ? b : late);
        result = `Latest bus service: ${latest.routeName} (${latest.busNo}) ends at ${latest.lastBusTime}`;
      }
    }

    // Employee-related queries
    if (q.includes("employee") || q.includes("staff") || q.includes("driver") || q.includes("conductor")) {
      if (q.includes("driver")) {
        const drivers = employees.filter(e => e.designation === "Driver");
        result = `Drivers: ${drivers.map(d => `${d.name} (${d.empId})`).join(", ")} - Total: ${drivers.length}`;
      } else if (q.includes("conductor")) {
        const conductors = employees.filter(e => e.designation === "Conductor");
        result = `Conductors: ${conductors.map(c => `${c.name} (${c.empId})`).join(", ")} - Total: ${conductors.length}`;
      } else if (q.includes("total")) {
        result = `Total employees: ${employees.length} (Drivers: ${employees.filter(e => e.designation === "Driver").length}, Conductors: ${employees.filter(e => e.designation === "Conductor").length})`;
      } else if (q.includes("hyderabad")) {
        const hydEmp = employees.filter(e => e.depotAssigned.toLowerCase().includes("hyderabad"));
        result = `Hyderabad depot staff: ${hydEmp.map(e => `${e.name} (${e.designation})`).join(", ")}`;
      } else if (q.includes("warangal")) {
        const warEmp = employees.filter(e => e.depotAssigned.toLowerCase().includes("warangal"));
        result = `Warangal depot staff: ${warEmp.map(e => `${e.name} (${e.designation})`).join(", ")}`;
      } else if (q.includes("khammam")) {
        const khmEmp = employees.filter(e => e.depotAssigned.toLowerCase().includes("khammam"));
        result = `Khammam depot staff: ${khmEmp.map(e => `${e.name} (${e.designation})`).join(", ")}`;
      }
    }

    // Revenue/Ticket queries
    if (q.includes("revenue") || q.includes("ticket") || q.includes("income") || q.includes("earning")) {
      const totalRevenue = tickets.reduce((sum, t) => sum + t.revenueEarned, 0);
      const totalTickets = tickets.reduce((sum, t) => sum + t.ticketsSold, 0);
      
      if (q.includes("total")) {
        result = `Total revenue: ₹${totalRevenue.toLocaleString()}, Total tickets sold: ${totalTickets}`;
      } else if (q.includes("highest") || q.includes("maximum")) {
        const highest = tickets.reduce((max, t) => t.revenueEarned > max.revenueEarned ? t : max);
        result = `Highest revenue: Bus ${highest.busNo} - ₹${highest.revenueEarned.toLocaleString()} (${highest.ticketsSold} tickets)`;
      } else if (q.includes("lowest") || q.includes("minimum")) {
        const lowest = tickets.reduce((min, t) => t.revenueEarned < min.revenueEarned ? t : min);
        result = `Lowest revenue: Bus ${lowest.busNo} - ₹${lowest.revenueEarned.toLocaleString()} (${lowest.ticketsSold} tickets)`;
      } else if (q.includes("average")) {
        const avgRevenue = totalRevenue / tickets.length;
        const avgTickets = totalTickets / tickets.length;
        result = `Average per bus: ₹${Math.round(avgRevenue).toLocaleString()} revenue, ${Math.round(avgTickets)} tickets`;
      }
    }

    // Assignment queries
    if (q.includes("assignment") || q.includes("duty") || q.includes("shift") || q.includes("trip")) {
      if (q.includes("morning") || q.includes("am")) {
        const morningShifts = assignments.filter(a => a.shift === "AM");
        result = `Morning shifts: ${morningShifts.map(a => `${a.empId} on ${a.busNo} (${a.trips} trips)`).join(", ")}`;
      } else if (q.includes("evening") || q.includes("pm")) {
        const eveningShifts = assignments.filter(a => a.shift === "PM");
        result = `Evening shifts: ${eveningShifts.map(a => `${a.empId} on ${a.busNo} (${a.trips} trips)`).join(", ")}`;
      } else if (q.includes("most trips") || q.includes("maximum trips")) {
        const maxTrips = assignments.reduce((max, a) => a.trips > max.trips ? a : max);
        result = `Most trips: ${maxTrips.empId} on bus ${maxTrips.busNo} - ${maxTrips.trips} trips, ${maxTrips.distanceTraveled} km`;
      } else if (q.includes("total distance")) {
        const totalDistance = assignments.reduce((sum, a) => sum + a.distanceTraveled, 0);
        result = `Total distance covered: ${totalDistance} km across all assignments`;
      } else if (q.includes("total trips")) {
        const totalTrips = assignments.reduce((sum, a) => sum + a.trips, 0);
        result = `Total trips completed: ${totalTrips} trips today`;
      }
    }

    // Performance and Analytics
    if (q.includes("performance") || q.includes("efficiency")) {
      const totalDistance = assignments.reduce((sum, a) => sum + a.distanceTraveled, 0);
      const totalTrips = assignments.reduce((sum, a) => sum + a.trips, 0);
      const avgDistance = totalDistance / assignments.length;
      result = `Performance metrics: ${totalTrips} total trips, ${totalDistance} km total distance, ${Math.round(avgDistance)} km average per assignment`;
    }

    // Route-specific queries
    if (q.includes("route 101") || q.includes("101")) {
      const route101 = buses.find(b => b.routeNo === "101");
      if (route101) {
        result = `Route 101: ${route101.routeName}, Bus: ${route101.busNo}, Distance: ${route101.routeDistance}km, Timing: ${route101.firstBusTime}-${route101.lastBusTime}, Status: ${route101.status}`;
      }
    }

    // Date-specific queries
    if (q.includes("today") || q.includes("2024-01-15")) {
      const todayRevenue = tickets.reduce((sum, t) => sum + t.revenueEarned, 0);
      const todayTickets = tickets.reduce((sum, t) => sum + t.ticketsSold, 0);
      const todayTrips = assignments.reduce((sum, a) => sum + a.trips, 0);
      result = `Today's summary: ₹${todayRevenue.toLocaleString()} revenue, ${todayTickets} tickets sold, ${todayTrips} trips completed`;
    }

    // General status queries
    if (q.includes("status") || q.includes("summary") || q.includes("overview")) {
      const activeBuses = buses.filter(b => b.status === "Active").length;
      const totalRevenue = tickets.reduce((sum, t) => sum + t.revenueEarned, 0);
      const totalEmployees = employees.length;
      result = `TSRTC Status: ${activeBuses}/${buses.length} buses active, ${totalEmployees} staff members, ₹${totalRevenue.toLocaleString()} revenue today`;
    }

    // General search
    if (!result) {
      result = `I can help you with questions about:
• Bus status: "How many active buses?", "Which buses are in maintenance?"
• Routes: "What's the longest route?", "Show Hyderabad routes"
• Staff: "Who are the drivers?", "Which staff work at Warangal depot?"
• Revenue: "What's the total revenue?", "Which bus earned most?"
• Assignments: "Who's on morning shift?", "How many trips completed?"
• Performance: "What's today's summary?", "Show performance metrics"
• Specific: "Tell me about route 101", "What's the earliest bus?"`;
    }

    setAnswer(result);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">TSRTC Dashboard</h1>
          <p className="text-muted-foreground">Transport Management System</p>
        </div>

        {/* Question Interface */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ask Questions About Your Data</CardTitle>
            <CardDescription>Ask questions like "How many active buses?", "Total revenue?", "Who are the drivers?"</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center mb-4">
              <Input 
                placeholder="Ask a question about buses, employees, revenue, or assignments..." 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleQuestion()}
              />
              <Button onClick={handleQuestion}>Ask</Button>
            </div>
            {answer && (
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-2">Answer:</h4>
                <pre className="whitespace-pre-wrap text-sm">{answer}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data Search */}
        <div className="mb-6 flex gap-4 items-center">
          <Input 
            placeholder="Search across all data..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <Button variant="outline" onClick={() => setSearchQuery("")}>Clear</Button>
        </div>

        <Tabs defaultValue="buses" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="buses">Buses</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="buses">
            <Card>
              <CardHeader>
                <CardTitle>Bus Fleet Management</CardTitle>
                <CardDescription>Manage bus routes and schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bus No</TableHead>
                      <TableHead>Route Name</TableHead>
                      <TableHead>Route No</TableHead>
                      <TableHead>First Bus</TableHead>
                      <TableHead>Last Bus</TableHead>
                      <TableHead>Distance (km)</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterData(buses, "buses").map((bus, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{bus.busNo}</TableCell>
                        <TableCell>{bus.routeName}</TableCell>
                        <TableCell>{bus.routeNo}</TableCell>
                        <TableCell>{bus.firstBusTime}</TableCell>
                        <TableCell>{bus.lastBusTime}</TableCell>
                        <TableCell>{bus.routeDistance}</TableCell>
                        <TableCell>
                          <Badge variant={bus.status === "Active" ? "default" : "destructive"}>
                            {bus.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <CardTitle>Employee Management</CardTitle>
                <CardDescription>Staff details and depot assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Depot</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Designation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterData(employees, "employees").map((emp, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{emp.empId}</TableCell>
                        <TableCell>{emp.name}</TableCell>
                        <TableCell>{emp.depotAssigned}</TableCell>
                        <TableCell>{emp.phoneNo}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{emp.designation}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Ticket Sales</CardTitle>
                <CardDescription>Daily ticket sales and revenue tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Bus No</TableHead>
                      <TableHead>Tickets Sold</TableHead>
                      <TableHead>Revenue (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterData(tickets, "tickets").map((ticket, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{ticket.date}</TableCell>
                        <TableCell>{ticket.busNo}</TableCell>
                        <TableCell>{ticket.ticketsSold}</TableCell>
                        <TableCell>₹{ticket.revenueEarned.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle>Staff Assignments</CardTitle>
                <CardDescription>Daily duty assignments and trip tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Bus No</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Shift</TableHead>
                      <TableHead>Trips</TableHead>
                      <TableHead>Distance (km)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterData(assignments, "assignments").map((assignment, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{assignment.empId}</TableCell>
                        <TableCell>{assignment.busNo}</TableCell>
                        <TableCell>{assignment.date}</TableCell>
                        <TableCell>
                          <Badge variant={assignment.shift === "AM" ? "default" : "secondary"}>
                            {assignment.shift}
                          </Badge>
                        </TableCell>
                        <TableCell>{assignment.trips}</TableCell>
                        <TableCell>{assignment.distanceTraveled}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
