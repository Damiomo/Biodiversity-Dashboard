url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

const optionChanged = async option => {
  let { names, metadata, samples } = await d3.json(url);

  if (option == undefined) {
    option = names[0];

    names.forEach(name => {
      d3.select('select').append('option').text(name);
    });
  };

  let meta = metadata.find(obj => obj.id == option);

  d3.select('#sample-metadata').html('');
  Object.entries(meta).forEach(([key, val]) => {
    d3.select('#sample-metadata').append('h5').text(`${key.toUpperCase()}: ${val}`);
  });

  let {otu_ids, sample_values, otu_labels} = samples.find(obj=>obj.id==option);

  var data = [
    {
      x: sample_values.slice(0,10).reverse(),
      y: otu_ids.slice(0,10).reverse().map(x=>`OTU ${x}`),
      text: otu_labels.slice(0,10).reverse(),
      type: 'bar',
      orientation: 'h'
    }
  ];
  
  let layout = {
    'title': 'Top 10 Bacteria Cultures Found',
    xaxis: {
      title: 'Number of Bacteria'
    }
  }
  
  Plotly.newPlot('bar', data, layout);

  var trace1 = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      size: sample_values,
      color: otu_ids,
      colorscale: 'Earth'
    }
  };

  layout = {
    title: 'Bacteria Cultures Per Sample',
    xaxis: {
      title: 'OTU ID'
    },
    yaxis: {
      title: 'Number of Bacteria'
    }
  }
  
  var data = [trace1];
  
  Plotly.newPlot('bubble', data, layout)
}

const init = optionChanged;

init();