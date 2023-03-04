//step_1 Use the D3 library to read in samples.json from the URL 

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(jsondata) {
  console.log(jsondata);
});

// Set up default graphs at starting screen
function init() {
  plotter("940")
}; 
function optionChanged(i) {
  plotter(i)
};

// Create drop downlist
// Important to read:
// Method copied from https://github.com/Payal-dh/Belly_Button-Challenge/blob/master/app.js

d3.json(url).then(function(jsondata) {
  let vals = Object.values(jsondata);
    // check all values console.log(values);

  samples=vals[2] //get all value from samples 3rd list
  for (let n = 0; n < samples.length; n++) {
    sample = samples[n];
    let dataset = d3.select("#selDataset").append("option").text(sample.id)
  };
});

// drawing h-bar-chart 
function plotter(sample_id) {
  d3.json(url).then(function(data) {
    let vals= Object.values(data);
    samples=vals[2];
//For Demographic info use
    metadata=vals[1];

    for (let n = 0; n < samples.length; n++) {
      
      sample=samples[n]
      
      if (sample.id == sample_id) {
        //extra data to variable
        let otu_ids = sample.otu_ids;
        let sample_values = sample.sample_values;
        let otu_labels = sample.otu_labels;
        //give value for x,y and lables
        let yticks = otu_ids.slice(0, 10).map(row => `OTU ${row}`).reverse();
        let xticks = sample_values.slice(0, 10).reverse();
        let labels = otu_labels.slice(0, 10).reverse();

        //Method copied from https://plotly.com/javascript/horizontal-bar-charts/
        //Method copied from https://github.com/Payal-dh/Belly_Button-Challenge/blob/master/app.js
        let trace1 = {
            type: 'bar',
            x: xticks,
            y: yticks,
            orientation: 'h', 
        };

        let trace1_list_format = [trace1] 

        var layout = {
            title: 'Top 10 OTUs found'
        };
        
        Plotly.newPlot('bar', trace1_list_format, layout);

        // bubble chart generation
        //Method copied from https://plotly.com/javascript/horizontal-bar-charts/
        //Method copied from https://github.com/Payal-dh/Belly_Button-Challenge/blob/master/app.js
        let xticksbub = otu_ids;
        let yticksbub = sample_values;
        let labelsbub = otu_labels;

        // plots data
        let trace2 = {
            x: xticksbub,
            y: yticksbub,
            mode: 'markers',
            marker: {
              color: xticksbub,  
              size: yticksbub,
            },
            
          };
          
        let trace2_list_format = [trace2];
        
        var layout = {
          title: 'All OTUs',
          height: 550,
          width: 1500
        };
        
        Plotly.newPlot('bubble', trace2_list_format, layout);
        
        // demographic chart
        function demographic_info_table(i) {
          return i.id == sample_id;
        }
        let demographic_info = metadata.filter(demographic_info_table);

        let result = demographic_info[0];

        // extra value from result

        let id = result.id;
        let ethnicity = result.ethnicity;
        let gender = result.gender;
        let age = result.age;
        let location = result.location;
        let bbtype = result.bbtype;
        let wfreq = result.wfreq;
        // create table
        let result_info = ` id: ${id} <br> ethnicity: ${ethnicity} <br> gender: ${gender} <br> age: ${age} <br> location: ${location} <br> bbtype: ${bbtype} <br> wfreq: ${wfreq}`
        d3.select("#sample-metadata").html(result_info); 
  }
  }
  })
}; 

init();