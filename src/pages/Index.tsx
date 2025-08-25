import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">TSRTC Dashboard</h1>
          <p className="text-muted-foreground">Transport Management System</p>
        </div>

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
