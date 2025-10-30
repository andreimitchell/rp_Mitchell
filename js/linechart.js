// Code for generating a Chart.js line chart

async function getDataNQ() {
    const response = await fetch('data/nqdata.csv'); // .. move up one folder not working with github index is in root already
    const data = await response.text()                      // CSV to TEXT format


    const xDays = [];      // x-axis label = days (1-7)
    const yRFbunionAngle = [];      // y-axis right foot bunion angles
    const yLFbunionAngle = [];    // y-axis left foot bunion angles
    const yRFbof = [];       // y-axis right Ball of Foot to Beginning of Arch Distance 
    const yLFbof = [];       // y-axis left  Ball of Foot to Beginning of Arch Distance 
    const yRFmp = [];       // y-axis right foot Midpoint of the Ball to Beginning of Arch to the Middle of the Arch Distance
    const yLFmp = [];       // y-axis left foot Midpoint of the Ball to Beginning of Arch to the Middle of the Arch Distance
    // \n - new line character
    // split('\n) - will seperate the table into an arrya of individual rows
    // slice(start, end) - return a new array starting at index "start" up to and including "end"

    const table = data.split('\n').slice(1);    // split by line and remove first row
    console.log(table);


    table.forEach(row => {
        const columns = row.split(',');
        const day = parseFloat(columns[0]);        // assigns day value
        xDays.push(day);                                    // push each day into array for day

        const RFangle = parseFloat(columns[1]);        // Convert angle to float
        yRFbunionAngle.push(RFangle);                             

        const LFangle = parseFloat(columns[2]);        // Convert angle to float
        yLFbunionAngle.push(LFangle);                             

        const RFbof = parseFloat(columns[3]);        // Convert measurement to float
        yRFbof.push(RFbof);                            

        const LFbof = parseFloat(columns[4]);        // Convert measurement to float
        yLFbof.push(LFbof);                        

        const RFmp = parseFloat(columns[5]);        // Convert measurement to float
        yRFmp.push(RFmp);                          

        const LFmp = parseFloat(columns[6]);        // Convert measurement to float
        yLFmp.push(LFmp);                      

        console.log(RFangle, LFangle, RFbof, LFbof, RFmp, LFmp);

    });


    return { xDays, yRFbunionAngle, yLFbunionAngle, yRFbof, yLFbof, yRFmp, yLFmp }         // use { for object}
}

async function createChartNQ() {
    const data = await getDataNQ(); // createChart will wait for getData() to process csv
    const NQlineChart = document.getElementById('NQlineChart');
    const angleNQlineChart = document.getElementById('angleNQlineChart');
    const degreeSymbol = String.fromCharCode(176); // degree symbol, 176 for ascii
    const myChartAngle = new Chart(angleNQlineChart, {  // Construct the chart    
        type: 'line',
        data: {                         // Define data
            labels: data.xDays,        // x-axis labels
            datasets: [                 // Each object describes one dataset of y-values
                //  including display properties.  To add more datasets, 
                //  place a comma after the closing curly brace of the last
                //  data set object and add another dataset object. 
                { // referring to label for days
                    label: `Right Foot Bunion Angle`,     // Dataset label for legend
                    data: data.yRFbunionAngle,    
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',    // Color for data marker
                    borderColor: 'rgba(255, 0, 0, 1)',      // Color for data marker border
                    borderWidth: 1   // Data marker border width
                },

                { // referring to label for days
                    label: `Left Foot Bunion Angle`,     // Dataset label for legend
                    data: data.yLFbunionAngle,    
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',    // Color for data marker
                    borderColor: 'rgba(0, 0, 255, 1)',      // Color for data marker border
                    borderWidth: 1   // Data marker border width
                }


            ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Day',     // x-axis title
                        font: {                   // font properties
                            family: 'Inter',
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties
                       min: 0,                     // starting value    
                        font: { // can change font familt if we want
                            family: 'Inter',
                            size: 14
                        }, 
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,
                        text: `Bunion Angle (${degreeSymbol})`,     // y-axis title
                        font: {
                            family: 'Inter',
                            size: 14
                        },
                    },
                    ticks: {
                        min: 0,
                        maxTicksLimit: data.yRFbunionAngle.length / 10,        // Actual value can be set dynamically
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Effects on Bunion Angle Wearing Nike Quest 6 Shoes',
                    font: {
                        weight: 400,
                        family: 'Inter',
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom',
                }
            }
        }
    })
    const myChartnonAngle = new Chart(NQlineChart, {  // Construct the chart    
        type: 'line',
        data: {                         // Define data
            labels: data.xDays,        // x-axis labels
            datasets: [                 // Each object describes one dataset of y-values
                //  including display properties.  To add more datasets, 
                //  place a comma after the closing curly brace of the last
                //  data set object and add another dataset object. 
    

                { // referring to label for days
                    label: `Right Foot Ball of Foot to Beginning of Arch Distance`,     // Dataset label for legend
                    data: data.yRFbof,    
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(119, 0, 255, 0.2)',    // Color for data marker
                    borderColor: 'rgba(119, 0, 255,  1)',      // Color for data marker border
                    borderWidth: 1   // Data marker border width
                },

                 { // referring to label for days
                    label: `Left Foot Ball of Foot to Beginning of Arch Distance`,     // Dataset label for legend
                    data: data.yLFbof,    
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(187, 22, 74, 0.2)',    // Color for data marker
                    borderColor: 'rgba(187, 22, 74, 1)',      // Color for data marker border
                    borderWidth: 1   // Data marker border width
                },

                 { // referring to label for days
                    label: `Right Foot Midpoint of the Ball to Beginning of Arch to the Middle of the Arch Distance`,     // Dataset label for legend
                    data: data.yRFmp,    
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(255, 119, 0, 0.2)',    // Color for data marker
                    borderColor: 'rgba(255, 119, 0, 1)',      // Color for data marker border
                    borderWidth: 1   // Data marker border width
                },

                 { // referring to label for days
                    label: `Left Foot Midpoint of the Ball to Beginning of Arch to the Middle of the Arch Distance`,     // Dataset label for legend
                    data: data.yLFmp,    
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(32, 187, 76, 0.2)',    // Color for data marker
                    borderColor: 'rgba(22, 187, 121, 1)',      // Color for data marker border
                    borderWidth: 1   // Data marker border width
                }


            ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Day',     // x-axis title
                        font: {                   // font properties
                            family: 'Inter',
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties
                       min: 0,                     // starting value    
                        font: { // can change font familt if we want
                            family: 'Inter',
                            size: 14
                        }, 
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,
                        text: `Measurement Distance (inches)`,     // y-axis title
                        font: {
                            family: 'Inter',
                            size: 14
                        },
                    },
                    ticks: {
                        min: 0,
                        maxTicksLimit: data.yRFbunionAngle.length / 10,        // Actual value can be set dynamically
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Distance Measurements Wearing Nike Quest 6 Shoes',
                    font: {
                        weight: 400,
                        family: 'Inter',
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom',
                }
            }
        }
    });
}

createChartNQ();


async function getDataES() {
    const response = await fetch('data/esdata.csv'); // .. move up one folder not working with github index is in root already
    const data = await response.text()                      // CSV to TEXT format


    const xDays = [];      // x-axis label = days (1-7)
    const yRFbunionAngle = [];      // y-axis right foot bunion angles
    const yLFbunionAngle = [];    // y-axis left foot bunion angles
    const yRFbof = [];       // y-axis right Ball of Foot to Beginning of Arch Distance 
    const yLFbof = [];       // y-axis left  Ball of Foot to Beginning of Arch Distance 
    const yRFmp = [];       // y-axis right foot Midpoint of the Ball to Beginning of Arch to the Middle of the Arch Distance
    const yLFmp = [];       // y-axis left foot Midpoint of the Ball to Beginning of Arch to the Middle of the Arch Distance
    // \n - new line character
    // split('\n) - will seperate the table into an arrya of individual rows
    // slice(start, end) - return a new array starting at index "start" up to and including "end"

    const table = data.split('\n').slice(1);    // split by line and remove first row
    console.log(table);


    table.forEach(row => {
        const columns = row.split(',');
        const day = parseFloat(columns[0]);        // assigns day value
        xDays.push(day);                                    // push each day into array for day

        const RFangle = parseFloat(columns[1]);        // Convert angle to float
        yRFbunionAngle.push(RFangle);                             

        const LFangle = parseFloat(columns[2]);        // Convert angle to float
        yLFbunionAngle.push(LFangle);                             

        const RFbof = parseFloat(columns[3]);        // Convert measurement to float
        yRFbof.push(RFbof);                            

        const LFbof = parseFloat(columns[4]);        // Convert measurement to float
        yLFbof.push(LFbof);                        

        const RFmp = parseFloat(columns[5]);        // Convert measurement to float
        yRFmp.push(RFmp);                          

        const LFmp = parseFloat(columns[6]);        // Convert measurement to float
        yLFmp.push(LFmp);                      

        console.log(RFangle, LFangle, RFbof, LFbof, RFmp, LFmp);

    });


    return { xDays, yRFbunionAngle, yLFbunionAngle, yRFbof, yLFbof, yRFmp, yLFmp }         // use { for object}
}

async function createChartES() {
    const data = await getDataES(); // createChart will wait for getData() to process csv
    const ESlineChart = document.getElementById('ESlineChart');
    const angleESlineChart = document.getElementById('angleESlineChart');
    const degreeSymbol = String.fromCharCode(176); // degree symbol, 176 for ascii
    const myChartAngle = new Chart(angleESlineChart, {  // Construct the chart    
        type: 'line',
        data: {                         // Define data
            labels: data.xDays,        // x-axis labels
            datasets: [                 // Each object describes one dataset of y-values
                //  including display properties.  To add more datasets, 
                //  place a comma after the closing curly brace of the last
                //  data set object and add another dataset object. 
                { // referring to label for days
                    label: `Right Foot Bunion Angle`,     // Dataset label for legend
                    data: data.yRFbunionAngle,    
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',    // Color for data marker
                    borderColor: 'rgba(255, 0, 0, 1)',      // Color for data marker border
                    borderWidth: 1   // Data marker border width
                },

                { // referring to label for days
                    label: `Left Foot Bunion Angle`,     // Dataset label for legend
                    data: data.yLFbunionAngle,    
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',    // Color for data marker
                    borderColor: 'rgba(0, 0, 255, 1)',      // Color for data marker border
                    borderWidth: 1   // Data marker border width
                }


            ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Day',     // x-axis title
                        font: {                   // font properties
                            family: 'Inter',
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties
                       min: 0,                     // starting value    
                        font: { // can change font familt if we 
                            family: 'Inter',
                            size: 14
                        }, 
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,
                        text: `Bunion Angle (${degreeSymbol})`,     // y-axis title
                        font: {
                            family: 'Inter',
                            size: 14
                        },
                    },
                    ticks: {
                        min: 0,
                        maxTicksLimit: data.yRFbunionAngle.length / 10,        // Actual value can be set dynamically
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Effects on Bunion Angle Wearing Engineered Shoes',
                    font: {
                        weight: 400,
                        family: 'Inter',
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom',
                }
            }
        }
    })
    const myChartnonAngle = new Chart(ESlineChart, {  // Construct the chart    
        type: 'line',
        data: {                         // Define data
            labels: data.xDays,        // x-axis labels
            datasets: [                 // Each object describes one dataset of y-values
                //  including display properties.  To add more datasets, 
                //  place a comma after the closing curly brace of the last
                //  data set object and add another dataset object. 
    

                { // referring to label for days
                    label: `Right Foot Ball of Foot to Beginning of Arch Distance`,     // Dataset label for legend
                    data: data.yRFbof,    
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(119, 0, 255, 0.2)',    // Color for data marker
                    borderColor: 'rgba(119, 0, 255,  1)',      // Color for data marker border
                    borderWidth: 1   // Data marker border width
                },

                 { // referring to label for days
                    label: `Left Foot Ball of Foot to Beginning of Arch Distance`,     // Dataset label for legend
                    data: data.yLFbof,    
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(187, 22, 74, 0.2)',    // Color for data marker
                    borderColor: 'rgba(187, 22, 74, 1)',      // Color for data marker border
                    borderWidth: 1   // Data marker border width
                },

                 { // referring to label for days
                    label: `Right Foot Midpoint of the Ball to Beginning of Arch to the Middle of the Arch Distance`,     // Dataset label for legend
                    data: data.yRFmp,    
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(255, 119, 0, 0.2)',    // Color for data marker
                    borderColor: 'rgba(255, 119, 0, 1)',      // Color for data marker border
                    borderWidth: 1   // Data marker border width
                },

                 { // referring to label for days
                    label: `Left Foot Midpoint of the Ball to Beginning of Arch to the Middle of the Arch Distance`,     // Dataset label for legend
                    data: data.yLFmp,    
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(32, 187, 76, 0.2)',    // Color for data marker
                    borderColor: 'rgba(22, 187, 121, 1)',      // Color for data marker border
                    borderWidth: 1   // Data marker border width
                }


            ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Day',     // x-axis title
                        font: {                   // font properties
                            family: 'Inter',
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties
                       min: 0,                     // starting value    
                        font: { // can change font familt if we want
                            family: 'Inter',
                            size: 14
                        }, 
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,
                        text: `Measurement Distance (inches)`,     // y-axis title
                        font: {
                            family: 'Inter',
                            size: 14
                        },
                    },
                    ticks: {
                        min: 0,
                        maxTicksLimit: data.yRFbunionAngle.length / 10,        // Actual value can be set dynamically
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Distance Measurements Wearing Engineered Shoes',
                    font: {
                        weight: 400,
                        family: 'Inter',
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom',
                }
            }
        }
    });
}

createChartES();