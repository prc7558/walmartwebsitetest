import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChartData } from "@/hooks/useChartData";
import { OrderData } from "@/lib/types";
import { DEFAULT_CURRENCY_FORMAT } from "@/lib/constants";

interface DataVisualizationsProps {
  data: OrderData[];
}

export default function DataVisualizations({ data }: DataVisualizationsProps) {
  // categoryPeriod removed as it's no longer needed
  const [salesTrendPeriod, setSalesTrendPeriod] = useState("month");
  
  const categoryChartRef = useRef<HTMLCanvasElement>(null);
  const salesTrendChartRef = useRef<HTMLCanvasElement>(null);
  const segmentChartRef = useRef<HTMLCanvasElement>(null);
  const shipModeChartRef = useRef<HTMLCanvasElement>(null);
  const countriesChartRef = useRef<HTMLCanvasElement>(null);
  const subCategoryChartRef = useRef<HTMLCanvasElement>(null);

  const categoryChartInstance = useRef<Chart | null>(null);
  const salesTrendChartInstance = useRef<Chart | null>(null);
  const segmentChartInstance = useRef<Chart | null>(null);
  const shipModeChartInstance = useRef<Chart | null>(null);
  const countriesChartInstance = useRef<Chart | null>(null);
  const subCategoryChartInstance = useRef<Chart | null>(null);
  
  const {
    categoryChartData,
    salesTrendChartData,
    segmentChartData,
    shipModeChartData,
    topCountriesData,
    allCountriesData,
    subCategoryChartData
  } = useChartData(data, salesTrendPeriod);
  
  // Initialize and update category chart
  useEffect(() => {
    if (categoryChartRef.current) {
      const ctx = categoryChartRef.current.getContext('2d');
      
      if (ctx) {
        if (categoryChartInstance.current) {
          categoryChartInstance.current.destroy();
        }
        
        categoryChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: categoryChartData.labels,
            datasets: [{
              label: 'Sales',
              data: categoryChartData.values,
              backgroundColor: ['#0078d4', '#2b88d8', '#57a2e6'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return '$' + value.toLocaleString();
                  }
                }
              }
            }
          }
        });
      }
    }
    
    return () => {
      if (categoryChartInstance.current) {
        categoryChartInstance.current.destroy();
      }
    };
  }, [categoryChartData]);
  
  // Initialize and update sales trend chart
  useEffect(() => {
    if (salesTrendChartRef.current) {
      const ctx = salesTrendChartRef.current.getContext('2d');
      
      if (ctx) {
        if (salesTrendChartInstance.current) {
          salesTrendChartInstance.current.destroy();
        }
        
        salesTrendChartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: salesTrendChartData.labels,
            datasets: [{
              label: 'Sales',
              data: salesTrendChartData.values,
              borderColor: '#0078d4',
              backgroundColor: 'rgba(0, 120, 212, 0.1)',
              borderWidth: 2,
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return '$' + value.toLocaleString();
                  }
                }
              }
            }
          }
        });
      }
    }
    
    return () => {
      if (salesTrendChartInstance.current) {
        salesTrendChartInstance.current.destroy();
      }
    };
  }, [salesTrendChartData]);
  
  // Initialize and update segment chart
  useEffect(() => {
    if (segmentChartRef.current) {
      const ctx = segmentChartRef.current.getContext('2d');
      
      if (ctx) {
        if (segmentChartInstance.current) {
          segmentChartInstance.current.destroy();
        }
        
        segmentChartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: segmentChartData.labels,
            datasets: [{
              data: segmentChartData.values,
              backgroundColor: ['#0078d4', '#2b88d8', '#57a2e6'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return context.label + ': ' + context.parsed + '%';
                  }
                }
              }
            }
          }
        });
      }
    }
    
    return () => {
      if (segmentChartInstance.current) {
        segmentChartInstance.current.destroy();
      }
    };
  }, [segmentChartData]);
  
  // Initialize and update ship mode chart
  useEffect(() => {
    if (shipModeChartRef.current) {
      const ctx = shipModeChartRef.current.getContext('2d');
      
      if (ctx) {
        if (shipModeChartInstance.current) {
          shipModeChartInstance.current.destroy();
        }
        
        shipModeChartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: shipModeChartData.labels,
            datasets: [{
              data: shipModeChartData.values,
              backgroundColor: ['#0078d4', '#2b88d8', '#57a2e6', '#83bdee'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return context.label + ': ' + context.parsed + '%';
                  }
                }
              }
            }
          }
        });
      }
    }
    
    return () => {
      if (shipModeChartInstance.current) {
        shipModeChartInstance.current.destroy();
      }
    };
  }, [shipModeChartData]);
  
  // Initialize and update countries chart
  useEffect(() => {
    if (countriesChartRef.current) {
      const ctx = countriesChartRef.current.getContext('2d');
      
      if (ctx) {
        if (countriesChartInstance.current) {
          countriesChartInstance.current.destroy();
        }
        
        // Generate gradient colors for the pie chart (15 countries)
        const colors = Array.from({ length: 15 }, (_, i) => {
          const hue = (210 + i * 25) % 360; // Base blue color with variations
          return `hsl(${hue}, 75%, 60%)`;
        });
        
        countriesChartInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: allCountriesData.slice(0, 15).map(country => country.name),
            datasets: [{
              data: allCountriesData.slice(0, 15).map(country => country.value),
              backgroundColor: colors,
              borderWidth: 1,
              borderColor: '#fff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  boxWidth: 12,
                  font: {
                    size: 10
                  }
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const value = context.parsed;
                    return `${context.label}: ${formatCurrency(value)} (${allCountriesData[context.dataIndex].percentage}%)`;
                  }
                }
              }
            }
          }
        });
      }
    }
    
    return () => {
      if (countriesChartInstance.current) {
        countriesChartInstance.current.destroy();
      }
    };
  }, [allCountriesData]);
  
  // Initialize and update subcategory chart
  useEffect(() => {
    if (subCategoryChartRef.current) {
      const ctx = subCategoryChartRef.current.getContext('2d');
      
      if (ctx) {
        if (subCategoryChartInstance.current) {
          subCategoryChartInstance.current.destroy();
        }
        
        // Generate gradient colors for the bar chart
        const colors = Array.from({ length: subCategoryChartData.labels.length }, (_, i) => {
          const hue = (210 + i * 10) % 360; // Base blue color with variations
          return `hsl(${hue}, 75%, 60%)`;
        });
        
        subCategoryChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: subCategoryChartData.labels,
            datasets: [{
              label: 'Sales',
              data: subCategoryChartData.values,
              backgroundColor: colors,
              borderWidth: 0
            }]
          },
          options: {
            indexAxis: 'y', // Horizontal bar chart
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return '$' + (value as number).toLocaleString();
                  }
                }
              },
              y: {
                ticks: {
                  font: {
                    size: 10
                  }
                }
              }
            }
          }
        });
      }
    }
    
    return () => {
      if (subCategoryChartInstance.current) {
        subCategoryChartInstance.current.destroy();
      }
    };
  }, [subCategoryChartData]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', DEFAULT_CURRENCY_FORMAT).format(value);
  };
  
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales by Category Chart */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-foreground">Sales by Category</h3>
            </div>
            <div className="h-64">
              <canvas ref={categoryChartRef}></canvas>
            </div>
          </CardContent>
        </Card>

        {/* Sales Trend Chart */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-foreground">Sales Trend</h3>
              <div className="text-sm">
                <Select value={salesTrendPeriod} onValueChange={setSalesTrendPeriod}>
                  <SelectTrigger className="border border-input rounded p-1 text-xs w-32">
                    <SelectValue placeholder="Monthly" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Weekly</SelectItem>
                    <SelectItem value="month">Monthly</SelectItem>
                    <SelectItem value="quarter">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="h-64">
              <canvas ref={salesTrendChartRef}></canvas>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Top Countries */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Top Countries by Sales</h3>
            <div className="space-y-3">
              {topCountriesData.map((country, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-28 mr-3 text-sm">{country.name}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-primary h-4 rounded-full" 
                      style={{ width: `${country.percentage}%` }}
                    ></div>
                  </div>
                  <div className="ml-3 text-sm font-medium">{formatCurrency(country.value)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Segment Performance */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Segment Performance</h3>
            <div className="h-48">
              <canvas ref={segmentChartRef}></canvas>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {segmentChartData.labels.map((label, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="font-semibold">{segmentChartData.values[index]}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ship Mode Analysis */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Ship Mode Analysis</h3>
            <div className="h-48">
              <canvas ref={shipModeChartRef}></canvas>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {shipModeChartData.labels.map((label, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="font-semibold">{shipModeChartData.values[index]}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Countries Pie Chart */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4">All Countries by Sales</h3>
            <div className="h-80">
              <canvas ref={countriesChartRef}></canvas>
            </div>
          </CardContent>
        </Card>

        {/* Sub-Categories Bar Chart */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Sales by Sub-Category</h3>
            <div className="h-80">
              <canvas ref={subCategoryChartRef}></canvas>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
